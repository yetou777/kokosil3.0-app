const favoriteItems = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `お気に入りスポット ${i + 1}`,
  description: `これはお気に入りスポット${i + 1}の説明です。`,
}));

export default function FavoritesContent() {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {favoriteItems.map((item, index) => (
        <div
          key={item.id}
          className={`p-4 cursor-pointer ${
            index < favoriteItems.length - 1 ? "border-b border-gray-200" : ""
          }`}
        >
          <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
          <p className="text-gray-600 mt-1">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
