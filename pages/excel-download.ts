import * as Excel from 'exceljs';

let output = { row: -1, column: -1 }

export async function writeExcel(input, replaceText, change, fileLocation) {

    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(fileLocation);
    const worksheet = await workbook.getWorksheet('Sheet1');
    readExcel(worksheet, input);
    const cell = await worksheet?.getCell(output.row + change.rowChange, output.column + change.colChange);
    cell!.value = replaceText;
    await workbook.xlsx.writeFile(fileLocation)
};

export async function readExcel(worksheet, input) {
    worksheet?.eachRow(async (row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === input) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
};

//writeExcel("Banana", "Danana", {rowChange: 0, colChange: 2}, "Users/AJ/downloads/download.xlsx");

