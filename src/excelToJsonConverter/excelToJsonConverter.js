const fs = require("fs");
const xlsx = require("xlsx");
const path = require('path');
const luxon = require("luxon");
const uploadDataToElastic = require("../uploadDataToElastic/uploadDataToElastic")



const dateFormat = (date, time) =>{
    const date = DateTime.fromFormat(`${date} ${time}`, "dd.mm.yyyy hh:mm:ss", { locale: "de" });
    
    return {
        "@date": date.toISO(),
        "weekday": date.toFormat("cccc"),
        "time": date.toFormat('hh:mm:ss'),
        "weekOfYear": date.toFormat('W')
    }
}



function mapTenantData(tenant,bathName, purchaseData, entryData) {
    let resultPurchaseData = [];
    let resultEntryData = [];
    // Loop through sheets
    const mappedData = purchaseData.map(item=>{
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

        console.log(`Uploading ${tenant} for ${bathName}`);
        uploadDataToElastic(correctItem)
    });
    
}


module.exports = {
    mapTenantData
  }; 