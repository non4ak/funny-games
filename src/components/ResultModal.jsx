export default function ResultModal({ isWinner }) {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/30 z-50'>
            <div className={`bg-white p-12 rounded-xl shadow-lg text-5xl text-center font-bold bounce-in  ${isWinner === "Draw" ? "text-amber-300" : "text-green-500"} -translate-y-[50px]`}>
                {isWinner === "X" ? "X won!" : isWinner === "O" ? "O won!" : "Draw!"}
                <p className="text-stone-900 text-3xl font-medium">Thanks for playing!</p>
            </div>
        </div>
    )
}