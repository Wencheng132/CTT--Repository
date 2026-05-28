import { useState, useCallback } from 'react';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import DataPreview from './components/DataPreview';
import ChartPanel from './components/ChartPanel';
import StatisticsPanel from './components/StatisticsPanel';

export default function App() {
  const [fileData, setFileData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');

  function handleDataLoaded({ data, columns: cols, fileName: name }) {
    setFileData(data);
    setColumns(cols);
    setFileName(name);
    setError('');

    // 自动选择：第一个文本列作为X轴，第一个数值列作为Y轴
    const textCols = cols.filter(c => {
      const sample = data.slice(0, 10).map(r => r[c]).filter(v => v != null && v !== '');
      return sample.length === 0 || sample.some(v => isNaN(Number(v)));
    });
    const numCols = cols.filter(c => !textCols.includes(c));

    setXColumn(textCols[0] || cols[0] || '');
    setYColumn(numCols[0] || cols[0] || '');
    setChartType('bar');
  }

  const handleError = useCallback((msg) => setError(msg), []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <Header />

        {fileName ? (
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-medium">{fileName}</span>
            <span className="text-blue-400">({fileData.length} 行, {columns.length} 列)</span>
            <button
              onClick={() => { setFileData([]); setColumns([]); setFileName(''); }}
              className="ml-auto text-blue-500 hover:text-blue-700"
            >
              ✕
            </button>
          </div>
        ) : (
          <FileUploader onDataLoaded={handleDataLoaded} onError={handleError} />
        )}

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            {error}
            <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">✕</button>
          </div>
        )}

        {fileData.length > 0 && (
          <>
            <DataPreview columns={columns} data={fileData} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ChartPanel
                  columns={columns}
                  data={fileData}
                  chartType={chartType}
                  xColumn={xColumn}
                  yColumn={yColumn}
                  onChartTypeChange={setChartType}
                  onXColumnChange={setXColumn}
                  onYColumnChange={setYColumn}
                />
              </div>
              <div className="lg:col-span-1">
                <StatisticsPanel columns={columns} data={fileData} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
