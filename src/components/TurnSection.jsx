import socket from "../socket";

export default function TurnSection({isCross, players, symbol}) {
    const index = players.findIndex(player => player.playerId === socket.id);
    const currPlayer = players[index].playerName;
    const otherPlayer = players.find((_, i) => i !== index).playerName;

    return <>
        <div className='w-[500px] flex justify-between mx-auto text-3xl h-[60px] my-4 select-none'>
            <div className={`w-[45%] text-center flex items-center rounded-2xl justify-center ${isCross ? "bg-custom-yellow" : ""}`}>
                X {symbol === "X" ? currPlayer : otherPlayer}
            </div>
            <div className={`w-[45%] text-center flex items-center rounded-2xl justify-center ${!isCross ? "bg-custom-yellow" : ""}`}>
                O {symbol === "O" ? currPlayer : otherPlayer}
            </div>
        </div>
    </>
}