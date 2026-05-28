import { useMemo } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const PIE_COLORS = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

export default function ChartPanel({ columns, data, chartType, xColumn, yColumn, onChartTypeChange, onXColumnChange, onYColumnChange }) {
  const numericColumns = useMemo(() => {
    if (!columns || data.length === 0) return [];
    return columns.filter(col => {
      const sample = data.slice(0, 10).map(r => r[col]).filter(v => v !== null && v !== undefined && v !== '');
      if (sample.length === 0) return false;
      return sample.every(v => !isNaN(Number(v)));
    });
  }, [columns, data]);

  const stringColumns = useMemo(() => {
    if (!columns) return [];
    return columns.filter(col => !numericColumns.includes(col));
  }, [columns, numericColumns]);

  if (!columns || columns.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center text-gray-400">
        暂无数据，请先上传文件
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <div className="px-4 py-3 border-b bg-gray-50">
        <h2 className="font-medium text-gray-700">图表</h2>
      </div>
      <div className="p-4 space-y-4">
        {/* Controls */}
        <div className="flex flex-wrap gap-3 items-end">
          {/* Chart type */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">图表类型</label>
            <div className="flex gap-1">
              {[
                { key: 'bar', label: '柱状图' },
                { key: 'line', label: '折线图' },
                { key: 'pie', label: '饼图' },
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => onChartTypeChange(t.key)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                    chartType === t.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* X axis */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              {chartType === 'pie' ? '标签列' : 'X 轴'}
            </label>
            <select
              value={xColumn}
              onChange={(e) => onXColumnChange(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {stringColumns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
              {stringColumns.length === 0 && <option value="">--</option>}
            </select>
          </div>

          {/* Y axis */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              {chartType === 'pie' ? '数值列' : 'Y 轴'}
            </label>
            <select
              value={yColumn}
              onChange={(e) => onYColumnChange(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {numericColumns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
              {numericColumns.length === 0 && <option value="">--</option>}
            </select>
          </div>
        </div>

        {/* Chart */}
        {xColumn && yColumn && data.length > 0 ? (
          <div className="w-full" style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xColumn} tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={yColumn} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : chartType === 'line' ? (
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xColumn} tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey={yColumn} stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              ) : (
                <PieChart>
                  <Pie
                    data={data}
                    dataKey={yColumn}
                    nameKey={xColumn}
                    cx="50%"
                    cy="50%"
                    outerRadius={140}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            请选择 X 轴和 Y 轴对应的列来生成图表
          </div>
        )}
      </div>
    </div>
  );
}
