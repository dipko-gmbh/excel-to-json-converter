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

function convertExcelFileToJsonUsingXlsx() {
    // Read the file using pathname
    const file = xlsx.readFile('./excelData/feucht_daten_010121-200522/Sauna.xlsx');
    // Grab the sheet info from the file
    const sheetNames = file.SheetNames;
    const totalSheets = sheetNames.length;
    // Variable to store our data 
    let parsedData = [];
    let resultData = [];
    // Loop through sheets
    for (let i = 0; i < totalSheets; i++) {
        // Convert to json using xlsx
        const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);
        // Skip header row which is the colum names
        tempData.shift()
        tempData.forEach(item=>{
            const correctItem = {
                purchaseNumber: item["Bestellnummer"],
                productID: item["Produkt ID"],
                ticketID: item["Ticket ID"],
                productName: item["Produktname"],
                productType: item["Produktart"],
                entityID: item["EntitätsID"],
                entityTitle: item["Entitätstitel"],
                bookingDate: item["gebucht am"],
                bookignTime: item["gebucht um"],
                startDate: item["gültig von"],
                endDate: item["gültig bis"],
                startTime: item["Uhrzeit von"],
                endTime: item["Uhrzeit von"],
                disabledTicket: item["invalidiert von"],
                dipkoID: item["Dipko ID"],
                firstName: item["Vorname"],
                secondName: item["Nachname"],
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

            resultData.push(correctItem)
        });
    }
    // parsedData.map(item=>{
    //     return {
    //         purchaseNumber: item["Bestellnummer"],
    //         productID: item["Produkt ID"],
    //         ticketID: item["Ticket ID"],
    //         productName: item["Produktname"],
    //         productType: item["Produktart"],
    //         entityID: item["EntitätsID"],
    //         entityTitle: item["Entitätstitel"],
    //         bookingDate: item["gebucht am"],
    //         bookignTime: item["gebucht um"],
    //         startDate: item["gültig von"],
    //         endDate: item["gültig bis"],
    //         startTime: item["gültig von"],
    //         endTime: item["gültig von"],
    //         disabledTicket: item["invalidiert von"],
    //         startDate: item["Dipko ID"],
    //         firstName: item["Vorname"],
    //         secondName: item["Nachname"],
    //         email: item["Email"],
    //         plz: item["PLZ"],
    //         city: item["Stadt"],
    //         country: item["Land"],
    //         price: item["Einzelpreis"],
    //         priceTax: item["Einzelpreis UmsSt"],
    //         paymentStatus: item["Bezahlstatus"],
    //         paymentMethod: item["Bezahlverfahren"],
    //         payedPrice: item["Bezahlter Einzelpreis €"],
    //         individualOffer: item["individuelle Angebote"],
    //         news: item["Newsletter"],
    //         marketing: item["Marktforschung"],
    //         sex: item["Anrede"],
    //     }
    // })

 // call a function to save the data in a json file
 generateJSONFile(resultData);
}

convertExcelFileToJsonUsingXlsx()