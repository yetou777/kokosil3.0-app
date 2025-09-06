import { useState } from "react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import KokosilContentItem, {
  KokosilContentData,
  ContentType,
} from "@/components/shared/KokosilContentItem";
import ViewToggle, { DisplayMode } from "@/components/shared/ViewToggle";
import SlideInPanel from "@/components/shared/SlideInPanel";
import IconSearch from "@/components/icons/footer-search.svg";
import IconFilter from "@/components/icons/search-filter.svg";
import IconContentTypeSpot from "@/components/icons/content-type-spot.svg";
import IconContentTypeReview from "@/components/icons/content-type-review.svg";
import IconContentTypeNews from "@/components/icons/content-type-news.svg";
import IconContentTypeArticle from "@/components/icons/content-type-article.svg";
import "swiper/css";

const MapView = dynamic(() => import("@/components/shared/MapView"), {
  ssr: false,
  loading: () => <p>Map is loading...</p>,
});

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
      body: `これは検索結果の本文です。アイテム${
        i + 1
      }の概要がここに表示されます。`,
    };
    if (
      contentType === "article" ||
      contentType === "review" ||
      contentType === "news"
    ) {
      item.date = "2023年10月28日";
      item.author = dummyAuthors[i % 4];
    }
    return item;
  }
);

const dummyKeywords = [
  "銀座",
  "ランチ",
  "美術館",
  "イベント",
  "お土産",
  "夜景",
  "カフェ",
  "限定",
];

const filterCategories = [
  { type: "spot", icon: IconContentTypeSpot },
  { type: "review", icon: IconContentTypeReview },
  { type: "news", icon: IconContentTypeNews },
  { type: "article", icon: IconContentTypeArticle },
];

export default function SearchContent() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("list");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const { t } = useTranslation();

  const searchControls = (
    <>
      {/* 1段目: 検索入力と表示切替 */}
      <div className="flex items-center space-x-2 pt-1">
        <div className="relative flex-grow">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder={t("search.placeholder")}
            className="h-9 w-full rounded-full border border-gray-300 bg-white pl-10 pr-4 focus:border-primary focus:ring-primary"
          />
        </div>
        {/* 表示切替ボタン */}
        <ViewToggle displayMode={displayMode} setDisplayMode={setDisplayMode} />
      </div>

      {/* 2段目: キーワードタグとフィルタ */}
      <div className="mt-2 flex items-center">
        <div className="flex-grow overflow-hidden">
          <Swiper slidesPerView={"auto"} spaceBetween={8} className="!py-1">
            {dummyKeywords.map((key) => {
              const isActive = key === selectedKeyword;
              return (
                <SwiperSlide key={key} className="!w-auto">
                  <button
                    onClick={() => setSelectedKeyword(isActive ? null : key)}
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-sm border transition-colors ${
                      isActive
                        ? "bg-green-50 text-primary border-primary"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {key}
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="ml-2 flex-shrink-0">
          {displayMode === "list" && (
            <button onClick={() => setIsFilterOpen(true)} className="p-2 -mr-2">
              <IconFilter className="h-6 w-6 text-gray-500" />
            </button>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="h-full w-full">
      {displayMode === "list" ? (
        <div className="flex flex-col h-full">
          {/* 上部: 検索コントロール */}
          <div className="sticky top-0 z-10 bg-white p-2 border-b border-gray-200">
            {searchControls}
          </div>

          {/* 下部: 検索結果 */}
          <div className="flex-1">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              {searchResults.map((item) => (
                <KokosilContentItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-full w-full">
          <MapView items={searchResults} />
          <div className="absolute top-0 left-0 right-0 z-10 p-2">
            {searchControls}
          </div>
        </div>
      )}

      {/* 絞り込みダイアログ */}
      <SlideInPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title={t("search.filterTitle")}
      >
        <div className="grid grid-cols-4 gap-4 text-center">
          {filterCategories.map(({ type, icon: Icon }) => (
            <button
              key={type}
              className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Icon className="h-8 w-8 text-gray-600" />
              <span className="text-xs text-gray-700">
                {t(`contentType.${type}`)}
              </span>
            </button>
          ))}
        </div>
      </SlideInPanel>
    </div>
  );
}
