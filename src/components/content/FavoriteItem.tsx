// 新しいファイル: src/components/content/FavoriteItem.tsx

import Image from "next/image";
import {
  HeartIcon,
  MapPinIcon,
  NewspaperIcon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

// コンテンツの型定義
export type ContentType = "spot" | "article" | "review" | "news";

export type FavoriteItemData = {
  id: number;
  contentType: ContentType;
  logoUrl: string;
  mainImageUrl: string;
  isNew: boolean;
  title: string;
  body: string;
  date?: string;
  author?: string;
};

// コンテンツ種別ごとのアイコンをマッピング
const contentTypeIcons: Record<ContentType, React.ComponentType<any>> = {
  spot: MapPinIcon,
  article: NewspaperIcon,
  review: ChatBubbleLeftRightIcon,
  news: MegaphoneIcon,
};

export default function FavoriteItem({ item }: { item: FavoriteItemData }) {
  const ContentTypeIcon = contentTypeIcons[item.contentType];
  const [isFavorite, setIsFavorite] = useState(true);

  return (
    <div className="bg-white p-4 cursor-pointer border-b border-gray-200 last:border-b-0">
      {/* 上部: ロゴとアイコン */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-shrink-0">
          {/* ロゴイメージ */}
          <Image
            src={item.logoUrl}
            alt="logo"
            width={40}
            height={40}
            className="rounded-md bg-gray-200"
          />
        </div>
        <div className="flex items-center space-x-2">
          {/* 【A】新着アイコン */}
          {item.isNew && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
              NEW
            </span>
          )}
          {/* 【B】コンテンツ種別アイコン */}
          <ContentTypeIcon className="h-6 w-6 text-gray-500" />
        </div>
      </div>

      {/* 下部: メイン画像とテキスト */}
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          {/* メインイメージ */}
          <Image
            src={item.mainImageUrl}
            alt={item.title}
            width={128}
            height={128}
            className="rounded-md object-cover w-32 h-32 bg-gray-200"
          />
        </div>
        <div className="flex flex-col justify-between flex-grow min-w-0">
          {/* 上段: タイトルと本文 */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 line-clamp-2 leading-tight">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-4">
              {item.body}
            </p>
          </div>
          {/* 下段: 日付/投稿者とCアイコン */}
          <div className="flex justify-between items-end mt-1">
            <div className="text-xs text-gray-500 truncate">
              {item.contentType === "article" && <span>{item.date}</span>}
              {(item.contentType === "review" ||
                item.contentType === "news") && (
                <span>
                  {item.author} [{item.date}]
                </span>
              )}
            </div>
            {/* 【C】お気に入りアイコン */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // 親要素のクリックイベントを発火させない
                setIsFavorite(!isFavorite);
              }}
              className="p-1"
            >
              {isFavorite ? (
                <SolidHeartIcon className="h-6 w-6 text-pink-500" />
              ) : (
                <HeartIcon className="h-6 w-6 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
