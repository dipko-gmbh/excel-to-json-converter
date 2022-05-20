const fs = require('fs').promises
const xlsx = require('xlsx');

const convertExcelToObject = (path) => {
        // Read the file using pathname
        const file = xlsx.readFile(path);
        // Grab the sheet info from the file
        const sheetNames = file.SheetNames;
        const totalSheets = sheetNames.length;
        // Variable to store our data 
        let parsedData = [];
        // Loop through sheets
        for (let i = 0; i < totalSheets; i++) {
            // Convert to json using xlsx
            const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);
            // Skip header row which is the colum names
            tempData.shift();
            // Add the sheet's json to our data array
            parsedData.push(...tempData);
        }
    
    return parsedData;
}


const funcFromGerigi = (tenant, bathName, purchaseData, entryData) => {
    console.log('tenant:', tenant);
    console.log('bathName:', bathName);
    console.log('purchaseData:', purchaseData[0]);
    console.log('entryData:', entryData[0]);
}



const fileWalker = async (excel_folder_path) => {
    try {
        const tenants = await fs.readdir(excel_folder_path)

        await tenants.forEach(async tenant => {
            console.log('tenant:', tenant);

            try {
                const path = excel_folder_path + '/' + tenant
                const stat = await fs.lstat(path)
                
                if (!stat.isDirectory()) return;

                const files = await fs.readdir(path)

                files
                    .filter(f => f.endsWith('.xlsx') && !f.startsWith('Zugangsdaten_fuer_'))
                    .map(f => {
                        console.log('f:', f);
                        const purchaseData = convertExcelToObject(`${excel_folder_path}/${tenant}/${f}`);
                        const entryData = convertExcelToObject(`${excel_folder_path}/${tenant}/Zugangsdaten_fuer_${f}`);

                        mapTenantData(tenant, f, purchaseData, entryData)
                    }
                )
            } catch (error) {
                console.error('error', error)
            }
        })
    } catch (error) {
        console.error('error', error)

    }


}

module.exports = fileWalker;