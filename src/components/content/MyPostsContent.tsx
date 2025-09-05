const myPostItems = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `自分の投稿 ${i + 1}`,
  content: `これは自分の投稿${i + 1}の本文です。`,
}));

export default function MyPostsContent() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {myPostItems.map((item, index) => (
        <div
          key={item.id}
          className={`p-4 ${
            index < myPostItems.length - 1 ? "border-b border-gray-200" : ""
          }`}
        >
          <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
          <p className="text-gray-600 mt-1">{item.content}</p>
        </div>
      ))}
    </div>
  );
}
