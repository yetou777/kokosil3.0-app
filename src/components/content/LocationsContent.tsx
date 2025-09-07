import { useState } from "react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import ViewToggle, { DisplayMode } from "@/components/shared/ViewToggle";
import SlideInPanel from "@/components/shared/SlideInPanel";
import KokosilSiteItem, {
  KokosilSiteData,
} from "@/components/shared/KokosilSiteItem";
import IconSort from "@/components/icons/locations-sort.svg";
import IconSearch from "@/components/icons/footer-search.svg";

const MapView = dynamic(() => import("@/components/shared/MapView"), {
  ssr: false,
  loading: () => <p>Map is loading...</p>,
});

// ダミーデータ
const dummySiteItems: KokosilSiteData[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: i + 1,
    name: `各地のココシル ${i + 1}`,
    description: `これは各地のココシルサイトの説明文です。このエリアの魅力や特徴を紹介します。`,
    siteImageUrl: `https://picsum.photos/seed/${i + 400}/800/600`,
    logoUrl:
      "https://ginza.kokosil.net/static/data/sites/00001c00000000000002000000220000/kokosil_site_api/images/logo_ja.png",
  })
);

export default function LocationsContent() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("map");
  const [isSortPanelOpen, setIsSortPanelOpen] = useState(false);
  const [sortOption, setSortOption] = useState("recentlyViewed");
  const { t } = useTranslation();

  // 一覧表示用のコントロール
  const listControls = (
    <div className="flex items-center space-x-2 py-1">
      <button
        onClick={() => setIsSortPanelOpen(true)}
        className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <IconSort className="h-6 w-6 text-gray-500" />
      </button>

      <div className="relative flex-grow">
        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder={t("locations.placeholder")}
          className="h-9 w-full rounded-full border border-gray-300 bg-white pl-10 pr-4 focus:border-primary focus:ring-primary"
        />
      </div>

      <ViewToggle displayMode={displayMode} setDisplayMode={setDisplayMode} />
    </div>
  );

  // 地図表示用のコントロール
  const mapControls = (
    <div className="flex justify-end pt-1">
      <ViewToggle displayMode={displayMode} setDisplayMode={setDisplayMode} />
    </div>
  );

  return (
    <div className="h-full w-full">
      {displayMode === "list" ? (
        <div className="flex flex-col h-full">
          {/* 上部コントロール */}
          <div className="sticky top-0 z-10 bg-white p-2 border-b border-gray-200">
            {listControls}
          </div>
          {/* 一覧表示 */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dummySiteItems.map((item) => (
                <div key={item.id} className="h-80">
                  <KokosilSiteItem item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-full w-full">
          <MapView items={dummySiteItems} />
          <div className="absolute top-0 left-0 right-0 z-10 px-2 pt-2 pb-[9px]">
            {mapControls}
          </div>
        </div>
      )}

      {/* 並び替えダイアログ (一覧表示時のみ) */}
      {displayMode === "list" && (
        <SlideInPanel
          isOpen={isSortPanelOpen}
          onClose={() => setIsSortPanelOpen(false)}
          title={t("locations.sortTitle")}
          direction="left"
          topPosition="top-16"
        >
          <div className="space-y-6 my-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="sortOption"
                value="recentlyViewed"
                checked={sortOption === "recentlyViewed"}
                onChange={(e) => setSortOption(e.target.value)}
                className="h-5 w-5 text-primary focus:ring-primary"
              />
              <span className="text-gray-700">
                {t("locations.recentlyViewed")}
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="sortOption"
                value="nearby"
                checked={sortOption === "nearby"}
                onChange={(e) => setSortOption(e.target.value)}
                className="h-5 w-5 text-primary focus:ring-primary"
              />
              <span className="text-gray-700">{t("locations.nearby")}</span>
            </label>
          </div>
        </SlideInPanel>
      )}
    </div>
  );
}
