const fs = require("fs");
const xlsx = require("xlsx");
const path = require('path');
const luxon = require("luxon");

function generateJSONFile(data) {
    try {
        fs.writeFileSync('data.json', JSON.stringify(data))
    } catch (err) {
        console.error(err)
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
            bookingDate: DateTime.fromFormat(`${item["gebucht am"]} ${item["gebucht um"]}`, "dd.mm.yyyy hh:mm:ss", { locale: "de" }).toISO(),
            bookignTime: item["gebucht um"],
            startDate: item["gültig von"],
            endDate: item["gültig bis"],
            startTime: item["Uhrzeit von"],
            endTime: item["Uhrzeit von"],
            disabledTicket: item["invalidiert von"],
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
            sex: item["Anrede"]
            
        }

        const entryDataForPurchase = purchaseData.filter( p => p["Ticket ID"] === correctItem.ticketID)
        correctItem['purchase'] = entryDataForPurchase
    });
    console.log(mappedData)

}


module.exports = {
    mapTenantData
  }; 