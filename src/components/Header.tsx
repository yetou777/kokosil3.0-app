import { useTranslation } from "react-i18next";
import { ViewType } from "./MainLayout";

type HeaderProps = {
  activeView: ViewType;
  onToggleSidebar: () => void;
};

export default function Header({ activeView, onToggleSidebar }: HeaderProps) {
  const { t } = useTranslation();
  return (
    <header className="bg-white shadow-md p-4 text-center relative">
      <h1 className="text-xl font-bold">{t(`header.${activeView}`)}</h1>
      <div className="absolute top-0 right-0 h-full flex items-center pr-4 md:hidden">
        <button onClick={onToggleSidebar} className="p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
