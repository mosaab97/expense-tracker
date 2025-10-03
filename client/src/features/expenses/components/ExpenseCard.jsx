const ExpenseCard = ({ expense, onEdit, onDelete }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm flex justify-between items-center bg-white">
      <div>
        <p className="font-medium">{expense.description}</p>
        <p className="text-gray-500">${expense.amount}</p>
        <p className="text-gray-400 text-sm">{expense.date}</p>
        {expense.category_id && <p className="text-gray-400 text-sm">{expense.category_id}</p>}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(expense.id, expense)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
