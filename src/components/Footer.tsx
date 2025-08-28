import { ViewType } from "./MainLayout";

type FooterProps = {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
};

const footerButtons: { view: ViewType; label: string }[] = [
  { view: "home", label: "ホーム" },
  { view: "search", label: "検索" },
  { view: "map", label: "Map" },
  { view: "notifications", label: "通知" },
  { view: "profile", label: "Profile" },
];

export default function Footer({ activeView, setActiveView }: FooterProps) {
  return (
    <footer className="bg-white shadow-t-md">
      <nav className="flex justify-around p-2">
        {footerButtons.map(({ view, label }) => {
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
              {/* ここにアイコンなどを将来的に追加できます */}
              <span className="text-xs">{label}</span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
}
