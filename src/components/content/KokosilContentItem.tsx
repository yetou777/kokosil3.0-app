// 新しいファイル: src/components/content/KokosilContentItem.tsx

import Image from "next/image";
import { useState, useLayoutEffect, useRef } from "react";
import IconMapPin from "@/components/icons/item-map-pin.svg";
import IconNewspaper from "@/components/icons/item-newspaper.svg";
import IconChatBubble from "@/components/icons/item-chat-bubble.svg";
import IconMegaphone from "@/components/icons/item-megaphone.svg";
import IconHeart from "@/components/icons/item-heart.svg";
import IconHeartSolid from "@/components/icons/item-heart-solid.svg";
import IconNew from "@/components/icons/item-new.svg";

// コンテンツの型定義
export type ContentType = "spot" | "article" | "review" | "news";

export type KokosilContentData = {
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
  spot: IconMapPin,
  article: IconNewspaper,
  review: IconChatBubble,
  news: IconMegaphone,
};

export default function KokosilContentItem({
  item,
}: {
  item: KokosilContentData;
}) {
  const ContentTypeIcon = contentTypeIcons[item.contentType];
  const [isFavorite, setIsFavorite] = useState(true);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [bodyLineClamp, setBodyLineClamp] = useState("line-clamp-4");

  useLayoutEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement) {
      // タイトルの高さを一行の高さで割って、実際の行数を計算
      const computedStyle = window.getComputedStyle(titleElement);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const titleHeight = titleElement.scrollHeight;
      const lines = Math.round(titleHeight / lineHeight);

      // タイトルが2行以上なら本文は3行、1行なら本文は4行に設定
      setBodyLineClamp(lines >= 2 ? "line-clamp-3" : "line-clamp-4");
    }
    // item.title が変更された時に再計算する
  }, [item.title]);

  return (
    <div className="bg-white p-2 cursor-pointer border-b border-gray-200 last:border-b-0">
      {/* 上部: ロゴとアイコン */}
      <div className="flex justify-between items-start mb-1">
        <div className="flex-shrink-0">
          {/* ロゴイメージ */}
          <Image
            src={item.logoUrl}
            alt="logo"
            width={150}
            height={40}
            className=""
          />
        </div>
        <div className="flex items-center space-x-2">
          {/* 【A】新着アイコン */}
          {item.isNew && <IconNew className="h-6 w-6 text-red-500" />}
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
            className="object-cover w-32 h-32 bg-gray-200"
          />
        </div>
        <div className="flex flex-col justify-between flex-grow min-w-0">
          {/* 上段: タイトルと本文 */}
          <div>
            <h3
              ref={titleRef}
              className="text-lg font-bold text-gray-800 line-clamp-2 leading-tight"
            >
              {item.title}
            </h3>
            <p className={`text-sm text-gray-600 mt-1 ${bodyLineClamp}`}>
              {item.body}
            </p>
          </div>
          {/* 下段: 日付/投稿者とCアイコン */}
          <div className="flex justify-between items-center mt-1">
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
              className="p-0.5"
            >
              {isFavorite ? (
                <IconHeartSolid className="h-5 w-5 text-pink-500" />
              ) : (
                <IconHeart className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
