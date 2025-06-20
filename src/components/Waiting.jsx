export default function Waiting({room, players, timer, onStart, onCancel}) {
    return (
        <div className="mt-12 mx-auto text-center space-y-2 border-gray-300 border p-12 rounded-xl w-full md:w-[600px] bg-white ">
            {players.length === 2 ? (
                <p className="text-4xl font-semibold">Starting in {timer}</p>
            ) : (
                <h1 className="text-4xl font-semibold">Waiting from players...</h1>
            )}
            <p className="text-3xl mb-8">Room: <span className="font-medium">{room}</span></p>
            <div className="w-full mx-auto flex justify-between px-4 md:w-[70%] ">
                {players.map((player, index) => (
                    <p key={index} className="text-xl py-2.5 px-3">👤 {player.playerName}</p>
                ))}
            </div>
            <section className='space-x-4 text-center mt-8 text-xl'>
                <button onClick={onStart} className="button-submit py-2.5 px-3 w-[150px] cursor-pointer font-semibold">Start</button>
                <button onClick={onCancel} className="border-2 border-gray-300 py-2.5 px-3s w-[150px] cursor-pointer hover:bg-red-500 hover:text-white uppercase font-semibold">Cancel</button>
            </section>
        </div>
    )
}