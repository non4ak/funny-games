export default function TurnSection({isCross}) {
    return <>
        <div className='w-[300px] flex justify-between mx-auto text-3xl h-[60px] my-4 select-none'>
            <div className={`w-[40%] text-center flex items-center rounded-2xl justify-center ${isCross ? "bg-amber-200" : "bg-gray-200"}`}>
                Cross
            </div>
            <div className={`w-[40%] text-center flex items-center rounded-2xl justify-center ${!isCross ? "bg-amber-200" : "bg-gray-200"}`}>
                Nolik
            </div>
        </div>
    </>
}