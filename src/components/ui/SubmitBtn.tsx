import { BtnProps } from "@/src/lib/interfaces";

export default function SubmitBtn({title, callback, isLoading}: BtnProps) {

  return (
    <>
        {!isLoading ?

            <button type="submit" onClick={(e) =>  callback(e)}
                className="cursor-pointer px-6 py-3 bg-[#ea580c] text-white rounded-md hover:bg-[#d45209] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ea580c]">
                {title}
            </button> :

            <button disabled type="submit" className="px-6 py-3 bg-[#ea580c] text-white rounded-md opacity-50 cursor-not-allowed">
                <div className="flex gap-4 items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    {title}
                </div>
            </button>

        }
    </>
  )
}