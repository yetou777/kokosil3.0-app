import { useState } from "react";
import KokosilContentItem, {
  KokosilContentData,
  ContentType,
} from "./KokosilContentItem";
import {
  MagnifyingGlassIcon,
  MapIcon,
  QueueListIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

// ダミーデータ (FavoritesContent.tsxから流用)
const contentTypes: ContentType[] = ["spot", "article", "review", "news"];
const dummyAuthors = ["Taro", "Jiro", "Saburo", "Shiro"];
const dummyLogos = [
  "https://ginza.kokosil.net/static/data/sites/00001c00000000000002000000220000/kokosil_site_api/images/logo_ja.png",
  "https://ueno.kokosil.net/static/data/sites/00001c00000000000002000000310000/kokosil_site_api/images/logo_ja.png",
  "https://akihabara.kokosil.net/static/data/sites/00001c00000000000002000000340000/kokosil_site_api/images/logo_ja.png",
];
const searchResults: KokosilContentData[] = Array.from(
  { length: 20 },
  (_, i) => {
    const contentType = contentTypes[i % 4];
    const item: KokosilContentData = {
      id: i + 1,
      contentType: contentType,
      logoUrl: dummyLogos[i % 3],
      mainImageUrl: `https://picsum.photos/seed/${i + 100}/128/128`,
      isNew: i % 6 === 0,
      title: `検索結果 ${i + 1}: 「${contentType}」のタイトル`,
      body: `これは検索結果の本文です。アイテム${i + 1}の概要がここに表示されます。`,
    };
    if (contentType === "article" || contentType === "review" || contentType === "news") {
      item.date = "2023年10月28日";
      item.author = dummyAuthors[i % 4];
    }
    return item;
  }
);

const dummyKeywords = ["銀座", "ランチ", "美術館", "イベント", "お土産", "夜景", "カフェ", "限定"];

export default function SearchContent() {
  const [displayMode, setDisplayMode] = useState<"list" | "map">("list");

  return (
    <div>
      {/* 上部: 検索コントロール */}
      <div className="sticky top-0 z-10 bg-gray-100 p-2 shadow">
        {/* 1段目: 検索入力と表示切替 */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="キーワードで検索"
              className="w-full rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 focus:border-primary focus:ring-primary"
            />
          </div>
          <div className="flex rounded-full border border-gray-300 p-0.5">
            <button onClick={() => setDisplayMode("map")} className={`p-1.5 rounded-full ${displayMode === 'map' ? 'bg-primary text-white' : 'text-gray-500'}`}><MapIcon className="h-5 w-5"/></button>
            <button onClick={() => setDisplayMode("list")} className={`p-1.5 rounded-full ${displayMode === 'list' ? 'bg-primary text-white' : 'text-gray-500'}`}><QueueListIcon className="h-5 w-5"/></button>
          </div>
        </div>

        {/* 2段目: キーワードタグとフィルタ */}
        <div className="mt-2 flex items-center">
          <div className="flex-grow overflow-x-auto no-scrollbar">
            <div className="flex space-x-2">
              {dummyKeywords.map(key => (
                <button key={key} className="whitespace-nowrap rounded-full bg-white px-3 py-1 text-sm border border-gray-300 hover:bg-gray-50">{key}</button>
              ))}
            </div>
          </div>
          <div className="ml-2 flex-shrink-0">
            <button className="rounded-full bg-white p-2 border border-gray-300 hover:bg-gray-50">
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* 下部: 検索結果 */}
      <div className="mt-2">
        {displayMode === "list" ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {searchResults.map((item) => (
              <KokosilContentItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex h-[60vh] items-center justify-center bg-gray-300 text-gray-600">
            <p>マップ表示エリア</p>
          </div>
        )}
      </div>
    </div>
  );
}
