export default function DataPreview({ columns, data }) {
  if (!columns || columns.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center text-gray-400">
        暂无数据，请先上传文件
      </div>
    );
  }

  const previewRows = data.slice(0, 50);

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <div className="px-4 py-3 border-b bg-gray-50">
        <h2 className="font-medium text-gray-700">
          数据预览
          <span className="text-gray-400 text-sm font-normal ml-2">
            显示 {previewRows.length} / {data.length} 行
          </span>
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-4 py-2 text-gray-500 font-medium text-xs w-12">#</th>
              {columns.map(col => (
                <th key={col} className="text-left px-4 py-2 text-gray-500 font-medium text-xs whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewRows.map((row, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-400 text-xs">{i + 1}</td>
                {columns.map(col => (
                  <td key={col} className="px-4 py-2 text-gray-700 whitespace-nowrap max-w-60 truncate">
                    {row[col] != null ? String(row[col]) : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
