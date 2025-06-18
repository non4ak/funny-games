export default function Waiting({room, players}) {
    return (
        <div className="mt-12 mx-auto text-center space-y-2 border p-12 rounded-lg w-full md:w-[600px] ">
            {players.length === 2 ? (
                <p className="text-4xl">Starting in...</p>
            ) : (
                <h1 className="text-4xl">Waiting from players...</h1>
            )}
            <p className="text-3xl mb-8">Room: <span className="font-medium">{room}</span></p>
            <div className="w-full mx-auto flex justify-between px-4 md:w-[70%] ">
                {players.map((player, index) => (
                    <p key={index} className="text-xl py-2.5 px-3">👤 {player.playerName}</p>
                ))}
            </div>
        </div>
    )
}