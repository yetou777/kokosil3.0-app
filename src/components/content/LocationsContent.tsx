import { useState } from "react";
import dynamic from "next/dynamic";
import ViewToggle, { DisplayMode } from "@/components/shared/ViewToggle";
import KokosilSiteItem, {
  KokosilSiteData,
} from "@/components/shared/KokosilSiteItem";

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

  const locationControls = (
    <div className="flex justify-end">
      <ViewToggle displayMode={displayMode} setDisplayMode={setDisplayMode} />
    </div>
  );

  return (
    <div className="h-full w-full">
      {displayMode === "list" ? (
        <div className="flex flex-col h-full">
          {/* 上部コントロール */}
          <div className="sticky top-0 z-10 bg-white p-2 border-b border-gray-200">
            {locationControls}
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
          <div className="absolute top-0 left-0 right-0 z-10 p-2">
            {locationControls}
          </div>
        </div>
      )}
    </div>
  );
}
