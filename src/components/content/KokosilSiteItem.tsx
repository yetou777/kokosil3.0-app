import Image from "next/image";

// データ型定義
export type KokosilSiteData = {
  id: number;
  name: string;
  description: string;
  siteImageUrl: string;
  logoUrl: string;
};

type KokosilSiteItemProps = {
  item: KokosilSiteData;
};

export default function KokosilSiteItem({ item }: KokosilSiteItemProps) {
  return (
    <div className="w-full h-full bg-white shadow-lg overflow-hidden flex flex-col border-2 border-gray-200">
      {/* 上部: ココシルサイトイメージ */}
      <div className="relative w-full h-1/2">
        <Image
          src={item.siteImageUrl}
          alt={`${item.name} site image`}
          layout="fill"
          objectFit="cover"
          className="bg-gray-200"
        />
      </div>

      {/* 下部: ロゴと情報 */}
      <div className="flex-1 p-2 flex flex-col justify-start">
        {/* ロゴイメージ */}
        <div className="flex-shrink-0 h-8 w-40 relative self-start mb-1">
          <Image
            src={item.logoUrl}
            alt={`${item.name} logo`}
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* ココシルサイト情報の文言 */}
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>
    </div>
  );
}
