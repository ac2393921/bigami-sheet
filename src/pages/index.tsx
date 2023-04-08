import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Reggae_One } from "@next/font/google";
import Image from 'next/image';
import { AiFillAppstore, AiFillCaretDown } from "react-icons/ai";
import { FaUserNinja } from "react-icons/fa";

const reggaeone = Reggae_One({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const characters = [
  { id: 1, name: 'shinobi1', image: '/images/比良坂機関.gif', school: '比良坂機関', class: '中忍', user: 'user1', created_time: '2023.4.8' },
  { id: 2, name: 'shinobi2', image: '/images/比良坂機関.gif', school: '比良坂機関', class: '中忍頭', user: 'user1', created_time: '2023.4.8' },
  { id: 3, name: 'shinobi3', image: '/images/私立御斎学園.gif', school: '私立御斎学園', class: '中忍', user: 'user2', created_time: '2023.4.8' },
];

export default function Home() {
  return (
    <div>
      {/* Header */}
      <header className="border-red-900 border-b-4 sticky top-0 z-50">
        <nav className="bg-white border-gray-200 px-4 dark:bg-gray-800 relative">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
            <a href="https://flowbite.com" className="flex items-center">
              <img
                src="http://gakujo.info/sozai/shinobi.png"
                className="mr-0 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className={reggaeone.className}>
                <p className="self-center text-3xl whitespace-nowrap text-gray-800">
                  ビガミ シート
                </p>
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              <a
                href="#"
                className="bg-green text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2 flex items-center"
              >
                <img
                  src="https://kohacu.com/wp-content/uploads/2020/10/kohacu.com_samune_003117.png"
                  className="mr-1 h-6 sm:h-9"
                  alt="Flowbite Logo"
                />
                <p className={reggaeone.className}>ログイン</p>
              </a>
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            ></div>
          </div>
        </nav>
      </header>
      {/* Header */}

      {/* Sidebar */}
      <aside id="default-sidebar" className="fixed left-0 z-60 w-40 h-screen" aria-label="Sidebar">
        <div className="h-full py-8 overflow-y-auto bg-stone-900 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                  <a href="#" className="flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-stone-700 dark:hover:bg-gray-700">
                    <AiFillAppstore />
                    <span className="ml-3">シート一覧</span>
                  </a>
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
      {/* Sidebar */}

      {/* Main */}
      <div className="bg-[url('/images/bg.jpg')] h-screen p-4 sm:ml-32">
        <div className="px-8 py-3">
          <div>
            <div className="bg-white p-2 mb-8 shadow flex justify-start px-12">
              <div className="w-full max-w-sm mr-7">
                <label className="relative flex border-b-2 border-slate-300 focus:border-b-sky-500">
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sky-500 text-xl py-2 pl-9"/>
                  <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full py-2 pl-3 pr-3 focus:outline-none sm:text-base" placeholder="シノビ名・プレイヤー名" type="text" name="search"/>
                </label>
              </div>

              <div className="w-36 mr-7">
                <label for="underline_select" className="sr-only">
                  
                </label>
                <div className="flex border-0 border-b-2 border-slate-300 items-center">
                  <select id="underline_select" className="text-center block py-2 appearance-none  px-0 w-full text-base text-gray-500 bg-transparent dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                      <option selected>流派</option>
                      <option value="US">斜歯忍軍</option>
                      <option value="CA">鞍馬神流</option>
                  </select>
                  <AiFillCaretDown className="text-sky-500 text-2xl" />
                </div>
              </div>

              <div className="w-36">
                <label for="underline_select" className="sr-only">Underline select</label>
                <div className="flex border-0 border-b-2 border-slate-300 items-center">
                <select id="underline_select" className="text-center block py-2 appearance-none  px-0 w-full text-base text-gray-500 bg-transparent dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                      <option selected>階級</option>
                      <option value="US">中忍</option>
                      <option value="CA">中忍頭</option>
                      <option value="CA">上忍</option>
                      <option value="CA">上忍頭</option>
                  </select>
                  <AiFillCaretDown className="text-sky-500 text-2xl" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 shadow h-full max-h-92">
              <table className="w-full whitespace-no-wrap table-auto">
                <thead>
                  <tr
                    className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                  >
                    <th className="px-2 py-3 w-2"></th>
                    <th className="px-4 py-3">キャラクター名</th>
                    <th className="px-4 py-3">流派</th>
                    <th className="px-4 py-3">階級</th>
                    <th className="px-4 py-3">プレイヤー名</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody
                  className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                >
                  {characters.map((character, index) => {
                    return (
                      <tr className="text-gray-700 dark:text-gray-400">
                        <td className="px-4 py-3">
                          <div
                            className="relative hidden w-8 h-8 mr-5 rounded-full md:block"
                          >
                            <Image
                              className="object-contain"
                              // src=`/images/${character.school}.gif`
                              src={character.image}
                              alt='hirasaka icon'
                              fill
                            />
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="font-semibold">{character.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {character.school}
                        </td>
                        <td className="px-4 py-3 text-xs">
                          <span
                            className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                          >
                            {character.class}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {character.user}
                        </td>
                        <td className="px-4 py-3 text-sm">
                        {character.created_time}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
      {/* Main */}

    </div>
  );
}
