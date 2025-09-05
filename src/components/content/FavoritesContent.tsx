import FavoriteItem, { FavoriteItemData, ContentType } from "./FavoriteItem";

// 4種別のコンテンツが混在するダミーデータを生成
const contentTypes: ContentType[] = ["spot", "article", "review", "news"];
const dummyAuthors = ["Taro", "Jiro", "Saburo", "Shiro"];

const favoriteItems: FavoriteItemData[] = Array.from({ length: 20 }, (_, i) => {
  const contentType = contentTypes[i % 4];
  const item: FavoriteItemData = {
    id: i + 1,
    contentType: contentType,
    logoUrl: `https://picsum.photos/seed/${i + 100}/40/40`,
    mainImageUrl: `https://picsum.photos/seed/${i}/128/128`,
    isNew: i % 5 === 0, // 5件に1件を新着にする
    title: `これは「${contentType}」のタイトルです。最大2行まで表示できます。${
      i % 3 === 0 ? "長いタイトルの場合はこのように改行されます。" : ""
    }`,
    body: `これは${
      i + 1
    }番目のアイテムの本文です。最大4行まで表示されるように設定されています。スマートフォンなどの画面幅が狭いデバイスでも、テキストがはみ出さないように制御されます。この文章はダミーです。`,
  };

  // 種別に応じて追加情報を付与
  if (contentType === "article") {
    item.date = "2023年10月27日";
  } else if (contentType === "review" || contentType === "news") {
    item.date = "2023年10月26日";
    item.author = dummyAuthors[i % 4];
  }

  return item;
});

export default function FavoritesContent() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {favoriteItems.map((item) => (
        <FavoriteItem key={item.id} item={item} />
      ))}
    </div>
  );
}
