import KokosilContentItem, {
  KokosilContentData,
  ContentType,
} from "@/components/shared/KokosilContentItem";

// 4種別のコンテンツが混在するダミーデータを生成
const contentTypes: ContentType[] = ["spot", "article", "review", "news"];
const dummyAuthors = ["Taro", "Jiro", "Saburo", "Shiro"];
const dummyLogos = [
  "https://ginza.kokosil.net/static/data/sites/00001c00000000000002000000220000/kokosil_site_api/images/logo_ja.png",
  "https://ueno.kokosil.net/static/data/sites/00001c00000000000002000000310000/kokosil_site_api/images/logo_ja.png",
  "https://akihabara.kokosil.net/static/data/sites/00001c00000000000002000000340000/kokosil_site_api/images/logo_ja.png",
  "https://ikebukuro.kokosil.net/static/data/sites/00001c00000000000001000000220000/kokosil_site_api/images/logo_ja.png",
  "https://komae.kokosil.net/static/data/sites/00001c00000000000002000000270000/kokosil_site_api/images/logo_ja.png",
];

const favoriteItems: KokosilContentData[] = Array.from(
  { length: 20 },
  (_, i) => {
    const contentType = contentTypes[i % 4];
    const item: KokosilContentData = {
      id: i + 1,
      contentType: contentType,
      logoUrl: dummyLogos[i % 5],
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
      const hour = String(i % 24).padStart(2, "0");
      const minute = String((i * 7) % 60).padStart(2, "0");
      const second = String((i * 13) % 60).padStart(2, "0");
      item.date = `2023年10月26日 ${hour}:${minute}:${second}`;
      item.author = dummyAuthors[i % 4];
    }

    return item;
  }
);

export default function FavoritesContent() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {favoriteItems.map((item) => (
        <KokosilContentItem key={item.id} item={item} />
      ))}
    </div>
  );
}
