import Image from 'next/image';
import { AiFillDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

const characters = [
  { id: 1, name: 'shinobi1',  school: '比良坂機関', class: '中忍', user: 'user1', created_time: '2023.4.8' },
  { id: 2, name: 'shinobi2',  school: '比良坂機関', class: '中忍頭', user: 'user1', created_time: '2023.4.8' },
  { id: 3, name: 'shinobi3',  school: '私立御斎学園', class: '中忍', user: 'user2', created_time: '2023.4.8' },
  { id: 4, name: 'shinobi4',  school: '私立御斎学園', class: '中忍', user: 'user2', created_time: '2023.4.8' },
];

export const CharacterListBoard = () => (
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
                    src={`/images/${character.school}.gif`}
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
)