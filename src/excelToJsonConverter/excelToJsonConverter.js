const { DateTime } = require("luxon");
const uploadDataToElastic = require("../uploadDataToElastic/uploadDataToElastic")



const dateFormat = (dateString, timeString) => {
    if (!dateString || !timeString) {
        return {
            "@date": null,
            "weekday": null,
            "time": null,
            "weekOfYear": null
        }
    }

    const date = DateTime.fromFormat(`${dateString} ${timeString}`, "dd.mm.yyyy hh:mm:ss", { locale: "de" });
    
    return {
        "@date": date.toISO(),
        "weekday": date.toFormat("cccc"),
        "time": date.toFormat('HH:mm:ss'),
        "weekOfYear": date.toFormat('W')
    }
}



async function mapTenantData(tenant,bathName, purchaseData, entryData) {
    await purchaseData.forEach(async (item, idx)=>{
        let correctItem = {
            tenant, 
            bathName,
            purchaseNumber: item["Bestellnummer"],
            productID: item["Produkt ID"],
            ticketID: item["Ticket ID"],
            productName: item["Produktname"],
            productType: item["Produktart"],
            entityID: item["EntitätsID"],
            entityTitle: item["Entitätstitel"],
            booking: dateFormat(item["gebucht am"], item["gebucht um"]),
            startDate: item["gültig von"],
            endDate: item["gültig bis"],
            startTime: item["Uhrzeit von"],
            endTime: item["Uhrzeit von"],
            dipkoID: item["Dipko ID"],
            firstName: item["Vorname"],
            lastName: item["Nachname"],
            email: item["Email"],
            plz: item["PLZ"],
            city: item["Stadt"],
            country: item["Land"],
            price: item["Einzelpreis"],
            priceTax: item["Einzelpreis UmsSt"],
            paymentStatus: item["Bezahlstatus"],
            paymentMethod: item["Bezahlverfahren"],
            payedPrice: item["Bezahlter Einzelpreis €"],
            individualOffer: item["individuelle Angebote"],
            news: item["Newsletter"],
            marketing: item["Marktforschung"],
            sex: item["Anrede"],
            invalidatedBy: item["invalidiert von"],
            invalidatedAt: item["invalidiert am"],
        }
        const entryDataForPurchase = entryData.filter( p => p["Ticket ID"] === correctItem.ticketID)
        
        correctItem['entryData'] = entryDataForPurchase.map((item)=> ({
            "checkIn": dateFormat(item["Checkin am"], item["Checkin um"]),
            "checkOut": dateFormat(item["Checkout am"], item["Checkout um"]),
            "unconsumed": item["Entwertung widerrufen"] === "TRUE"
        }))

        // console.log(`Uploading ${tenant} for ${bathName}, ${correctItem.productID}`);
        await uploadDataToElastic(correctItem)
        const precent = (idx + 1) / purchaseData.length * 100 
        process.stdout.write(`${precent.toFixed(2)}% Uploading ${tenant} for ${bathName}, ${correctItem.productID}\r`);
    });
    
}


module.exports = {
    mapTenantData
  }; 