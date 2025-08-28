import { ViewType } from "./MainLayout";

type HeaderProps = {
  activeView: ViewType;
};

const viewTitles: Record<ViewType, string> = {
  home: "ホーム",
  search: "検索",
  map: "マップ",
  notifications: "通知",
  profile: "プロフィール",
};

export default function Header({ activeView }: HeaderProps) {
  return (
    <header className="bg-white shadow-md p-4 text-center">
      <h1 className="text-xl font-bold">{viewTitles[activeView]}</h1>
    </header>
  );
}
