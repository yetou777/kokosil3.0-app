"use client"; // このファイルがクライアントコンポーネントであることを示すおまじない

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import HomeContent from "./content/HomeContent";
import SearchContent from "./content/SearchContent";
import MapContent from "./content/MapContent";
import NotificationsContent from "./content/NotificationsContent";
import ProfileContent from "./content/ProfileContent";

// 表示するビューの種類を定義
export type ViewType = "home" | "search" | "map" | "notifications" | "profile";

export default function MainLayout() {
  // 現在選択されているビューを管理するための状態(state)
  // useStateの初期値として 'home' を設定
  const [activeView, setActiveView] = useState<ViewType>("home");

  // 表示するメインコンテンツを動的に選択する
  const renderMainContent = () => {
    switch (activeView) {
      case "home":
        return <HomeContent />;
      case "search":
        return <SearchContent />;
      case "map":
        return <MapContent />;
      case "notifications":
        return <NotificationsContent />;
      case "profile":
        return <ProfileContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* ヘッダー */}
      <Header activeView={activeView} />

      <div className="flex flex-1 overflow-hidden">
        {/* サイドバー */}
        <Sidebar />

        {/* メインコンテンツ */}
        <main className="flex-1 p-4 overflow-y-auto">
          {renderMainContent()}
        </main>
      </div>

      {/* フッター */}
      <Footer activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}
