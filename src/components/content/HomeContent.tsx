import React from "react";

// Swiper ReactコンポーネントとCSSをインポート
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import KokosilSiteItem, {
  KokosilSiteData,
} from "@/components/shared/KokosilSiteItem";

// GalleryView用のダミーデータ
const galleryItems: KokosilSiteData[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `ココシル銀座 ${i + 1}`,
  description: `国際的なブランドショップから老舗までが軒を連ねる、洗練された大人の街。伝統と革新が共存する魅力的なエリアです。`,
  siteImageUrl: `https://picsum.photos/seed/${i + 300}/800/600`,
  logoUrl:
    "https://ginza.kokosil.net/static/data/sites/00001c00000000000002000000220000/kokosil_site_api/images/logo_ja.png",
}));

export default function HomeContent() {
  return (
    <div>
      {/* 画面上部: GalleryView風のセクション */}
      <div className="w-full h-80 flex-shrink-0 py-4">
        <Swiper
          slidesPerView={"auto"} // 表示するスライドの数を'auto'に設定
          centeredSlides={true} // アクティブなスライドを中央に配置
          spaceBetween={16} // スライド間のスペース
          loop={true} // 無限ループを有効化
          className="!px-10 h-full" // Swiperコンテナに左右のパディングを追加
        >
          {galleryItems.map((item) => (
            <SwiperSlide key={item.id} className="!w-3/4">
              {({ isActive }) => (
                <div
                  className={`w-full h-full transition-transform duration-300 ${
                    isActive ? "scale-100" : "scale-85"
                  }`}
                >
                  <KokosilSiteItem item={item} />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 画面下部: iframeを格納するセクション */}
      <div className="h-[150vh] border-t-2 border-gray-200">
        <iframe
          src="https://kokosil.net/" // 例としてkokosilのトップページ
          title="External Content"
          className="w-full h-full border-0"
          scrolling="no"
        >
          お使いのブラウザはiframeをサポートしていません。
        </iframe>
      </div>
    </div>
  );
}
