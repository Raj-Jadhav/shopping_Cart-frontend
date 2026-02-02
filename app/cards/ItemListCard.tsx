import { Item, ItemListCardProps } from "@/lib/types";
import { Trash2 } from "lucide-react";

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
        className="p-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label={`Delete ${item.name}`}
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}
