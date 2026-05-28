import { useState } from 'react';

export default function TodoForm({ initial, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [priority, setPriority] = useState(initial?.priority ?? 0);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description: description.trim(), priority });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-4 mb-4 space-y-3">
      <h3 className="font-medium text-gray-700">
        {initial ? '编辑任务' : '新建任务'}
      </h3>

      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="任务标题"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
        autoFocus
      />

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="任务描述（可选）"
        rows={2}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">优先级</label>
        <div className="flex gap-2">
          {[
            { value: 0, label: '普通' },
            { value: 1, label: '低' },
            { value: 2, label: '中' },
            { value: 3, label: '高' },
          ].map(p => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPriority(p.value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                priority === p.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          {initial ? '保存修改' : '创建任务'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition text-sm"
        >
          取消
        </button>
      </div>
    </form>
  );
}
