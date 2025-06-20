export default function TicTakBoard({ board, onClick, onReset, votes}) {
    return (
        <>
            <div className='w-[480px] grid grid-cols-3 mx-auto gap-4 text'>
                {Array(9).fill(null).map((cell, index) => (
                    <div
                        key={index}
                        onClick={() => onClick(index)}
                        className='w-38 h-38 aspect-square border-2 border-gray-300 bg-gray-200 flex items-center justify-center font-suez text-[4rem] select-none cursor-pointer rounded-xl'
                    >
                        {board[index]}
                    </div>
                ))}
            </div>
            <div className='mx-auto text-center my-4 flex justify-center'>
                <button
                    onClick={onReset}
                    className='bg-red-400 text-3xl py-2 w-[200px] text-white cursor-pointer rounded-2xl'>
                    Reset {votes}/2
                </button>
            </div>
        </>
    )
}