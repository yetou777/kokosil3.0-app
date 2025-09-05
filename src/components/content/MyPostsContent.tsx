import MyPostItem, { MyPostItemData } from "./MyPostItem";
import IconPlus from "@/components/icons/fab-plus.svg";

const dummyLogos = [
  "https://ginza.kokosil.net/static/data/sites/00001c00000000000002000000220000/kokosil_site_api/images/logo_ja.png",
  "https://ueno.kokosil.net/static/data/sites/00001c00000000000002000000310000/kokosil_site_api/images/logo_ja.png",
  "https://akihabara.kokosil.net/static/data/sites/00001c00000000000002000000340000/kokosil_site_api/images/logo_ja.png",
  "https://ikebukuro.kokosil.net/static/data/sites/00001c00000000000001000000220000/kokosil_site_api/images/logo_ja.png",
  "https://komae.kokosil.net/static/data/sites/00001c00000000000002000000270000/kokosil_site_api/images/logo_ja.png",
];

const myPostItems: MyPostItemData[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  spotName: `投稿先のスポット名 ${i + 1}`,
  logoUrl: dummyLogos[i % 5],
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
