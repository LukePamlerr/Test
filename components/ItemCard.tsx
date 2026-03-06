type Item = {
  id: number;
  title: string;
  description: string;
  created_at: string;
};

export default function ItemCard({
  item,
  onDelete,
}: {
  item: Item;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 hover:shadow-md transition">
      <h4 className="font-semibold text-indigo-600">{item.title}</h4>
      <p className="text-sm text-gray-600">{item.description}</p>
      <p className="text-xs text-gray-400">
        {new Date(item.created_at).toLocaleDateString()}
      </p>
      <button
        onClick={() => onDelete(item.id)}
        className="mt-auto self-end text-xs text-red-400 hover:text-red-600 transition"
      >
        🗑 Delete
      </button>
    </div>
  );
}
