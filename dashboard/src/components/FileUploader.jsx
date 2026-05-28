import { useState, useRef } from 'react';
import { parseFile } from '../utils/parseFile';

export default function FileUploader({ onDataLoaded, onError }) {
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  async function handleFile(file) {
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    if (!['csv', 'xlsx', 'xls'].includes(ext)) {
      onError(`不支持的文件格式 ".${ext}"，请上传 CSV 或 Excel 文件`);
      return;
    }

    setLoading(true);
    try {
      const result = await parseFile(file);
      if (result.data.length === 0) {
        onError('文件中没有数据');
      } else {
        onError('');
        onDataLoaded({ ...result, fileName: file.name });
      }
    } catch (err) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer ${
        dragOver
          ? 'border-blue-400 bg-blue-50'
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
      }`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {loading ? (
        <div className="py-8">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-gray-500">正在解析文件...</p>
        </div>
      ) : (
        <>
          <svg className="mx-auto w-12 h-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <p className="text-gray-600 font-medium">拖拽文件到此处，或点击选择文件</p>
          <p className="text-gray-400 text-sm mt-1">支持 CSV、Excel（.xlsx / .xls）</p>
        </>
      )}
    </div>
  );
}
