import { useTranslation } from "react-i18next";
import { ViewType } from "./MainLayout";
import { Home, Globe, Search, Heart, User } from "lucide-react";

type FooterProps = {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
};

type FooterButton = {
  view: ViewType;
  icon: React.ComponentType<{ className?: string }>;
};

const footerButtons: FooterButton[] = [
  { view: "home", icon: Home },
  { view: "locations", icon: Globe },
  { view: "search", icon: Search },
  { view: "favorites", icon: Heart },
  { view: "myPosts", icon: User },
];

export default function Footer({ activeView, setActiveView }: FooterProps) {
  const { t } = useTranslation();

  return (
    <footer className="bg-white shadow-t-md">
      <nav className="flex justify-around p-2">
        {footerButtons.map(({ view, icon: Icon }) => {
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
              <span className="text-xs">{t(`footer.${view}`)}</span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
}
