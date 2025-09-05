"use client"; // このファイルがクライアントコンポーネントであることを示すおまじない

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import "@/i18n"; // i18nextの初期化
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import HomeContent from "./content/HomeContent";
import SearchContent from "./content/SearchContent";
import LocationsContent from "./content/LocationsContent";
import FavoritesContent from "./content/FavoritesContent";
import MyPostsContent from "./content/MyPostsContent";

// 表示するビューの種類を定義
export type ViewType =
  | "home"
  | "locations"
  | "search"
  | "favorites"
  | "myPosts";

function MainContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  // URLのクエリパラメータからアクティブなビューを決定
  // パラメータが無効な場合は 'home' にフォールバック
  const validViews: ViewType[] = [
    "home",
    "locations",
    "search",
    "favorites",
    "myPosts",
  ];
  const activeView: ViewType = validViews.includes(view as ViewType)
    ? (view as ViewType)
    : "home";

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // 表示するメインコンテンツを動的に選択する
  const renderMainContent = () => {
    switch (activeView) {
      case "home":
        return <HomeContent />;
      case "locations":
        return <LocationsContent />;
      case "search":
        return <SearchContent />;
      case "favorites":
        return <FavoritesContent />;
      case "myPosts":
        return <MyPostsContent />;
      default:
        return <HomeContent />;
    }
  };

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* ヘッダー */}
      <Header activeView={activeView} onToggleSidebar={handleToggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* サイドバー（PC用とスマホ用を含む） */}
        <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
        {/* メインコンテンツエリア */}
        <main
          className={`flex-1 overflow-y-auto no-scrollbar ${
            ["home", "favorites", "myPosts", "search"].includes(activeView)
              ? ""
              : "p-4"
          }`}
        >
          {renderMainContent()}
        </main>
      </div>

      {/* フッター */}
      <Footer activeView={activeView} />
    </div>
  );
}

export default function MainLayout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainContent />
    </Suspense>
  );
}
