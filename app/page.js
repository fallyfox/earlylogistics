import { Todo } from "@/components/Todo";
import { TallyCounter } from "../components/TallyCounter";
import { Random } from "@/components/Random";

export default function Home () {

  return (
    <div className="h-screen flex justify-center items-center bg-black p-12">
      <div className="h-full w-[400px] flex flex-col gap-4 border border-gray-300 p-4">
        {/* <Todo bg="red" border="yellow"/>

        <Todo bg="white" border="red">
          <span>Call dad</span>
          <span>14:20</span>
        </Todo>

        <TallyCounter/> */}

        <Random/>
      </div>
    </div>
  )
}