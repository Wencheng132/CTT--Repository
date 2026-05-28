import { computeStats } from '../utils/statistics';

export default function StatisticsPanel({ columns, data }) {
  if (!columns || columns.length === 0 || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center text-gray-400">
        暂无数据，请先上传文件
      </div>
    );
  }

  const stats = computeStats(data, columns);

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <div className="px-4 py-3 border-b bg-gray-50">
        <h2 className="font-medium text-gray-700">统计分析</h2>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {columns.map(col => {
          const s = stats[col];
          if (!s || s.count === 0) return null;

          return (
            <div key={col} className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2 truncate" title={col}>{col}</h3>
              {s.type === 'number' ? (
                <div className="space-y-1 text-sm">
                  <StatRow label="总数" value={s.count} />
                  <StatRow label="总和" value={s.sum} />
                  <StatRow label="均值" value={s.mean} />
                  <StatRow label="中位数" value={s.median} />
                  <StatRow label="最小值" value={s.min} />
                  <StatRow label="最大值" value={s.max} />
                  <StatRow label="标准差" value={s.stdDev} />
                </div>
              ) : s.type === 'string' ? (
                <div className="space-y-1 text-sm">
                  <StatRow label="总数" value={s.count} />
                  <StatRow label="唯一值" value={s.uniqueCount} />
                  <StatRow label="最常见" value={s.mostCommon} />
                  <StatRow label="空值" value={s.emptyCount} />
                </div>
              ) : (
                <p className="text-sm text-gray-400">该列无有效数据</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-800 font-medium">{value}</span>
    </div>
  );
}
