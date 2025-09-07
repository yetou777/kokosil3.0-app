import MyPostItem, { MyPostItemData } from "./MyPostItem";
import IconPlus from "@/components/icons/fab-plus.svg";
import { dummyLogos } from "@/lib/dummyData";

const myPostItems: MyPostItemData[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  spotName: `投稿先のスポット名 ${i + 1}`,
  logoUrl: dummyLogos[i % dummyLogos.length],
  title: `私の投稿タイトル ${i + 1}`,
  body: `これは私の投稿の本文です。最大4行まで表示されるように設定されています。この文章はダミーです。この文章はダミーです。この文章はダミーです。この文章はダミーです。この文章はダミーです。この文章はダミーです。`,
  mainImageUrl: `https://picsum.photos/seed/${i + 200}/500/281`,
  likes: 10 + ((i * 3) % 17),
}));

export default function MyPostsContent() {
  return (
    <>
      <div>
        {myPostItems.map((item) => (
          <MyPostItem key={item.id} item={item} />
        ))}
      </div>

      {/* 新規投稿ボタン */}
      <button
        onClick={() => alert("投稿画面へ遷移します")}
        className="fixed bottom-24 right-4 z-10 transition-transform hover:scale-105 active:scale-95"
        aria-label="新規投稿"
      >
        <IconPlus />
      </button>
    </>
  );
}
