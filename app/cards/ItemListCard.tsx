import { Item, ItemListCardProps } from "@/lib/types";

export default function ItemListCard({
  item,
  onDelete,
  isDeleting = false,
}: ItemListCardProps) {
  const handleDelete = async () => {
    await onDelete(item.id);
  };

  return (
    <li className="p-4 border rounded-md flex items-center justify-between">
      <div className="flex items-center gap-4">
        {item.photo && (
          <img
            src={item.photo}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
          />
        )}

        <div>
          <div className="font-bold">{item.name}</div>
          <div className="text-sm">{item.description}</div>
        </div>
      </div>

      <button
        className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label={`Delete ${item.name}`}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </li>
  );
}
