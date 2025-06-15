export default function ResultModal({ isWinner }) {
    return (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 bg-opacity-50 z-50 '>
            <div className='text-green-500  py-4 px-4 font-bold text-[3rem] text-center select-none -translate-y-[100px] bounce-in'>
                {isWinner === "X" ? "X won" : isWinner === "O" ? "O won" : "Draw!"}
            </div>
        </div>
    )   

}