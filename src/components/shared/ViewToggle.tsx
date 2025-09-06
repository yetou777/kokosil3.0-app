"use client";

import { useTranslation } from "react-i18next";
import IconMap from "@/components/icons/toggle-map.svg";
import IconList from "@/components/icons/toggle-list.svg";

export type DisplayMode = "list" | "map";

type ViewToggleProps = {
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
};

export default function ViewToggle({
  displayMode,
  setDisplayMode,
}: ViewToggleProps) {
  const { t } = useTranslation();

  return (
    <div className="flex-shrink-0 flex items-center text-sm">
      <button
        onClick={() => setDisplayMode("map")}
        className={`flex h-9 items-center space-x-1 rounded-l-full border px-3 transition-colors ${
          displayMode === "map"
            ? "bg-primary/10 text-primary border-primary z-10"
            : "bg-white text-gray-500 hover:bg-gray-100 border-gray-300"
        }`}
      >
        <IconMap className="h-5 w-5" />
        <span className="leading-none">{t("viewToggle.mapView")}</span>
      </button>
      <button
        onClick={() => setDisplayMode("list")}
        className={`flex h-9 items-center space-x-1 rounded-r-full border -ml-px px-3 transition-colors ${
          displayMode === "list"
            ? "bg-primary/10 text-primary border-primary z-10"
            : "bg-white text-gray-500 hover:bg-gray-100 border-gray-300"
        }`}
      >
        <IconList className="h-5 w-5 relative top-px" />
        <span className="leading-none">{t("viewToggle.listView")}</span>
      </button>
    </div>
  );
}
