type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* --- PC用サイドバー (従来通り) --- */}
      <aside className="w-48 bg-gray-200 p-4 hidden md:block shrink-0">
        <h2 className="font-bold mb-2">サイドバー</h2>
        <ul>
          <li>メニュー1</li>
          <li>メニュー2</li>
        </ul>
      </aside>

      {/* --- スマホ用サイドバー (ここからが追加分) --- */}

      {/* サイドバー表示時の背景オーバーレイ */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* サイドバー本体 */}
      <aside
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg z-40 transform transition-transform ease-in-out duration-300 p-4 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">メニュー</h2>
          <button onClick={onClose} className="p-2">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul>
          <li>メニュー1</li>
          <li>メニュー2</li>
        </ul>
      </aside>
    </>
  );
}
