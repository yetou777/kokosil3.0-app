import { useTranslation } from "react-i18next";
import { ViewType } from "./MainLayout";
import { useRouter } from "next/navigation";

// カスタムSVGアイコンをReactコンポーネントとしてインポート
import IconHome from "@/components/icons/footer-home.svg";
import IconLocations from "@/components/icons/footer-locations.svg";
import IconSearch from "@/components/icons/footer-search.svg";
import IconFavorites from "@/components/icons/footer-favorites.svg";
import IconMyPosts from "@/components/icons/footer-my-posts.svg";

type FooterProps = {
  activeView: ViewType;
};

type FooterButton = {
  view: ViewType;
  icon: React.ComponentType<{ className?: string }>;
};

const footerButtons: FooterButton[] = [
  { view: "home", icon: IconHome },
  { view: "locations", icon: IconLocations },
  { view: "search", icon: IconSearch },
  { view: "favorites", icon: IconFavorites },
  { view: "myPosts", icon: IconMyPosts },
];

export default function Footer({ activeView }: FooterProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <footer className="bg-white border-t border-gray-200">
      <nav className="flex justify-around px-2 pt-2 pb-3">
        {footerButtons.map(({ view, icon: Icon }) => {
          const isActive = activeView === view;

          const buttonClasses = `group flex flex-col items-center justify-center w-full rounded-lg p-0
            transition-colors duration-200
            ${
              isActive
                ? "text-primary" // アクティブ時の文字色
                : "text-gray-500"
            }
          `;

          const iconWrapperClasses = `flex items-center justify-center h-8 w-16 rounded-full transition-colors duration-200 ${
            isActive ? "bg-primary/10" : "group-hover:bg-gray-100"
          }`;

          return (
            <button
              key={view}
              onClick={() => router.push(`/?view=${view}`, { scroll: false })}
              className={buttonClasses}
            >
              <div className={iconWrapperClasses}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <span className={`text-xs ${isActive ? "font-bold" : ""}`}>
                {t(`footer.${view}`)}
              </span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
}
