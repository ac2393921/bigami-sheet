import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiFillCaretDown } from "react-icons/ai";

export const CharacterSearchForm = () => (
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
)