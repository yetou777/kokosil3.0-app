"use client";

import IconSearch from "@/components/icons/footer-search.svg";

type SearchInputProps = {
  placeholder: string;
  // 今後の機能拡張のために、valueとonChangeも受け取れるように準備しておきます
  // value?: string;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput({ placeholder }: SearchInputProps) {
  return (
    <div className="relative flex-grow">
      <IconSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="h-9 w-full rounded-full border border-gray-300 bg-white pl-10 pr-4 focus:border-primary focus:ring-primary"
      />
    </div>
  );
}
