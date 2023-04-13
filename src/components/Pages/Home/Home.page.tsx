
import { CharacterListBoard } from '@/components/organisms/Board/CharacterListBoard';
import { CharacterSearchForm } from '@/components/organisms/Form/CharacterSearchForm';
import Link from "next/link";
import { AiFillPlusCircle } from "react-icons/ai";

export const HomePage = () => (
  <>
    <div className="px-8 py-3">
      <div>
        <CharacterSearchForm />
        
        <CharacterListBoard />
      </div>

      <Link href={'/create'} className="fixed right-16 bottom-20 z-70 rounded-full bg-white p-0 border-none">
        <AiFillPlusCircle 
          className="text-stone-800 text-6xl hover:text-stone-500"
        />
      </Link>
    </div>
  </>
)