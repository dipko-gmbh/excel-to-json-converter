const mapTenantData = require('./excelToJsonConverter/excelToJsonConverter')
const fileWalker = require('./fileWalker/fileWalker');
// const EXCEL_FOLDER_PATH = './excelData'
const EXCEL_FOLDER_PATH = './test'

fileWalker(EXCEL_FOLDER_PATH)
