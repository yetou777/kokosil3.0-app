// 新しいファイル: src/components/content/MyPostItem.tsx

import { useState } from "react";
import Image from "next/image";
import IconThumbUp from "@/components/icons/item-thumb-up.svg";
import IconThumbUpSolid from "@/components/icons/item-thumb-up-solid.svg";
import IconEllipsis from "@/components/icons/item-ellipsis.svg";

// 投稿データの型定義
export type MyPostItemData = {
  id: number;
  spotName: string;
  logoUrl: string;
  title: string;
  body: string;
  mainImageUrl: string;
  likes: number;
};

export default function MyPostItem({ item }: { item: MyPostItemData }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes);

  const handleLikeClick = () => {
    setIsLiked((prev) => {
      // isLikedがtrue -> false になる時
      if (prev) {
        setLikeCount((count) => count - 1);
      } else {
        // isLikedがfalse -> true になる時
        setLikeCount((count) => count + 1);
      }
      return !prev;
    });
  };

  return (
    <div className="bg-white p-4 shadow m-1">
      {/* 上部: スポット名とロゴ (上下中央寄せ) */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">{item.spotName}</h3>
        <div className="flex-shrink-0">
          <Image
            src={item.logoUrl}
            alt={`${item.spotName} logo`}
            width={150}
            height={40}
            className=""
          />
        </div>
      </div>

      {/* 中部: タイトル、本文、メイン画像 */}
      <div>
        <h4 className="text-lg font-bold">{item.title}</h4>
        <p className="mt-2 text-sm text-gray-700">{item.body}</p>
        <div className="mt-3">
          <Image
            src={item.mainImageUrl}
            alt={item.title}
            width={500}
            height={281} // 16:9 aspect ratio
            className="w-full h-auto bg-gray-200"
          />
        </div>
      </div>

      {/* 下部: いいねとメニュー */}
      <div className="flex justify-between items-center mt-2">
        {/* 【A】いいねアイコンとカウント */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleLikeClick}
            className="group flex items-center space-x-1 text-gray-600 transition-colors"
          >
            {isLiked ? (
              <IconThumbUpSolid className="h-6 w-6 text-primary" />
            ) : (
              <IconThumbUp className="h-6 w-6 group-hover:text-primary" />
            )}
            <span className={`font-semibold ${isLiked ? "text-primary" : ""}`}>
              {likeCount}
            </span>
          </button>
        </div>

        {/* 【B】三点リーダーアイコン */}
        <button className="p-1 text-gray-500 hover:text-gray-800 transition-colors">
          <IconEllipsis className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
