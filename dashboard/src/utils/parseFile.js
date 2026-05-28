import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export function parseFile(file) {
  const ext = file.name.split('.').pop().toLowerCase();

  if (ext === 'csv') {
    return parseCSV(file);
  }
  if (ext === 'xlsx' || ext === 'xls') {
    return parseExcel(file);
  }
  throw new Error('不支持的文件格式，请上传 CSV 或 Excel 文件（.csv / .xlsx / .xls）');
}

function parseCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete(results) {
        if (results.errors.length > 0 && results.data.length === 0) {
          reject(new Error('CSV 解析失败，请检查文件格式'));
          return;
        }
        const columns = results.meta.fields || [];
        if (columns.length === 0) {
          reject(new Error('未找到列标题，请检查文件'));
          return;
        }
        resolve({ columns, data: results.data });
      },
      error(err) {
        reject(new Error(`CSV 解析失败: ${err.message}`));
      },
    });
  });
}

function parseExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buffer = e.target.result;
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) {
          reject(new Error('Excel 文件中没有工作表'));
          return;
        }
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (rows.length === 0) {
          resolve({ columns: [], data: [] });
          return;
        }

        const headers = rows[0].map((h, i) => (h != null ? String(h) : `列${i + 1}`));
        const data = rows.slice(1).map((row) => {
          const obj = {};
          headers.forEach((col, i) => {
            obj[col] = row[i] ?? '';
          });
          return obj;
        });

        resolve({ columns: headers, data });
      } catch (err) {
        reject(new Error('Excel 解析失败，请检查文件格式'));
      }
    };
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsArrayBuffer(file);
  });
}
