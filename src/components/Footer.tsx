import { ViewType } from "./MainLayout";
import { Home, Search, Map, Bell, User } from "lucide-react";

type FooterProps = {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
};

type FooterButton = {
  view: ViewType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const footerButtons: FooterButton[] = [
  { view: "home", label: "ホーム", icon: Home },
  { view: "search", label: "検索", icon: Search },
  { view: "map", label: "Map", icon: Map },
  { view: "notifications", label: "通知", icon: Bell },
  { view: "profile", label: "Profile", icon: User },
];

export default function Footer({ activeView, setActiveView }: FooterProps) {
  return (
    <footer className="bg-white shadow-t-md">
      <nav className="flex justify-around p-2">
        {footerButtons.map(({ view, label, icon: Icon }) => {
          const isActive = activeView === view;
          const buttonClasses = `
            flex flex-col items-center justify-center w-full rounded-lg p-2
            transition-colors duration-200
            ${
              isActive
                ? "bg-blue-100 text-blue-600"
                : "text-gray-500 hover:bg-gray-100"
            }
          `;

          return (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={buttonClasses}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{label}</span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
}
