export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const priorityColors = {
    0: 'bg-gray-100 text-gray-600',
    1: 'bg-green-100 text-green-700',
    2: 'bg-yellow-100 text-yellow-700',
    3: 'bg-red-100 text-red-700',
  };

  const priorityLabels = { 0: '普通', 1: '低', 2: '中', 3: '高' };

  return (
    <div className={`bg-white rounded-lg border p-4 flex items-start gap-3 transition hover:shadow-sm ${
      todo.completed ? 'opacity-60' : ''
    }`}>
      <input
        type="checkbox"
        checked={!!todo.completed}
        onChange={e => onToggle(e.target.checked)}
        className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-medium text-gray-800 ${todo.completed ? 'line-through' : ''}`}>
            {todo.title}
          </span>
          <span className={`text-xs px-1.5 py-0.5 rounded ${priorityColors[todo.priority] || priorityColors[0]}`}>
            {priorityLabels[todo.priority] || '普通'}
          </span>
        </div>
        {todo.description && (
          <p className="text-sm text-gray-500 mt-0.5 truncate">{todo.description}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">{todo.created_at}</p>
      </div>

      <div className="flex gap-1 shrink-0">
        <button
          onClick={onEdit}
          className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition"
        >
          编辑
        </button>
        <button
          onClick={onDelete}
          className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition"
        >
          删除
        </button>
      </div>
    </div>
  );
}
