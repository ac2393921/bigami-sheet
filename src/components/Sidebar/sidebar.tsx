import Link from "next/link";
import { AiFillAppstore } from "react-icons/ai";
import { FaUserNinja } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside id="default-sidebar" className="fixed left-0 z-60 w-40 h-screen" aria-label="Sidebar">
        <div className="h-full py-8 overflow-y-auto bg-stone-900 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                  <Link href="/" className="flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-stone-700 dark:hover:bg-gray-700">
                    <AiFillAppstore />
                    <span className="ml-3">シート一覧</span>
                  </Link>
              </li>
              <li>
                  <a href="#" className="flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-stone-700 dark:hover:bg-gray-700">
                    <FaUserNinja />
                    <span className="ml-3">マイページ</span>
                  </a>
              </li>
            </ul>
        </div>
      </aside>
  )
}