
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
import Link from "next/link";
import { AiFillCaretDown, AiFillDelete, AiFillPlusCircle, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

const characters = [
  { id: 1, name: 'shinobi1', image: '/images/比良坂機関.gif', school: '比良坂機関', class: '中忍', user: 'user1', created_time: '2023.4.8' },
  { id: 2, name: 'shinobi2', image: '/images/比良坂機関.gif', school: '比良坂機関', class: '中忍頭', user: 'user1', created_time: '2023.4.8' },
  { id: 3, name: 'shinobi3', image: '/images/私立御斎学園.gif', school: '私立御斎学園', class: '中忍', user: 'user2', created_time: '2023.4.8' },
  { id: 3, name: 'shinobi3', image: '/images/私立御斎学園.gif', school: '私立御斎学園', class: '中忍', user: 'user2', created_time: '2023.4.8' },
];

export const HomePage = () => (
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

        <div className="bg-white p-4 shadow h-full">
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
                <th className="px-4 py-3 w-2"></th>
                <th className="px-4 py-3 w-2"></th>
                <th className="px-4 py-3 w-2"></th>
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
                    <td className="px-4 py-3 text-sm">
                      <button className="bg-stone-700 hover:bg-stone-500 text-white font-bold py-2 px-4 rounded">
                        <AiOutlineEye 
                          className="text-xl"
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button className="bg-stone-700 hover:bg-stone-500 text-white font-bold py-2 px-4 rounded">
                        <AiOutlineEdit
                          className="text-xl"
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
                        <AiFillDelete 
                          className="text-xl"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Link href={'/create'} className="fixed right-16 bottom-20 z-70 rounded-full bg-white p-0 border-none">
        <AiFillPlusCircle 
          className="text-stone-800 text-6xl hover:text-stone-500"
        />
      </Link>
    </div>
  </div>
)