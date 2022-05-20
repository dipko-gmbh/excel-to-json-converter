const mapTenantData = require('./excelToJsonConverter/excelToJsonConverter')
const fileWalker = require('./fileWalker/fileWalker');
const EXCEL_FOLDER_PATH = './excelData'

fileWalker(EXCEL_FOLDER_PATH)
