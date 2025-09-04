"use client"; // このファイルがクライアントコンポーネントであることを示すおまじない

import { useState, useCallback } from "react";
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

export default function MainLayout() {
  // 現在選択されているビューを管理するための状態(state)
  // useStateの初期値として 'home' を設定
  const [activeView, setActiveView] = useState<ViewType>("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

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
            activeView !== "favorites" ? "p-4" : ""
          }`}
        >
          {renderMainContent()}
        </main>
      </div>

      {/* フッター */}
      <Footer activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}
