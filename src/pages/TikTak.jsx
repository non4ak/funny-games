import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function TikTak() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isCross, setSide] = useState(true);
    const [isWinner, setWinner] = useState(null);

    const handleClick = (index) => {
        if (board[index]) return;
        const newBoard = [...board];
        newBoard[index] = isCross ? "X" : "O";
        setBoard(newBoard);
        setSide(!isCross);
        checkIfWin(newBoard);
    }

    useEffect(() => {
        if (isWinner) {
            const timer = setTimeout(() => {
                resetGame();
            }, 5000)

            return () => clearTimeout(timer);
        }
    }, [board]);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setSide(true);
        setWinner(null);
    }

    const checkIfWin = (boardToCheck) => {
        const lines = [
            [0,1,2], 
            [3,4,5], 
            [6,7,8], 
            [0,3,6], 
            [1,4,7], 
            [2,5,8],
            [0,4,8], 
            [2,4,6]           
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[b] === boardToCheck[c]) {
                setWinner(boardToCheck[a]);
                return;
            }
        }

        if (boardToCheck.every(cell => cell !== null)) {
            setWinner("Draw");
        }
    }

    return (
        <>
            <div className='w-full h-screen bg-gray-100'>
                <NavBar />
                <h1 className='text-[3.5rem] text-center pt-2 font-medium'>Tic Tac Toe</h1>
                <div className='w-[300px] flex justify-between mx-auto text-3xl h-[60px] my-4 select-none'>
                    <div className={`w-[40%] text-center flex items-center rounded-2xl justify-center ${isCross ? "bg-amber-200" : "bg-gray-200"}`}>
                        Cross
                    </div>
                    <div className={`w-[40%] text-center flex items-center rounded-2xl justify-center ${!isCross ? "bg-amber-200" : "bg-gray-200"}`}>
                        Nolik
                    </div>
                </div>
                <div className='w-[480px] grid grid-cols-3 mx-auto gap-4 text'>
                    {Array(9).fill(null).map((cell, index) => (
                        <div
                            key={index}
                            onClick={() => handleClick(index)}
                            className='w-38 h-38 aspect-square border-2 border-gray-300 bg-gray-300 flex items-center justify-center text-5xl font-bold select-none cursor-pointer rounded-xl'
                        >
                            {board[index]}
                        </div>
                    ))}
                </div>
                <div className='mx-auto text-center my-4 flex justify-center'>
                    <button
                        onClick={resetGame}
                        className='bg-red-400 text-3xl py-2 w-[200px] text-white cursor-pointer rounded-2xl'>
                        Reset
                    </button>
                </div>
            </div>
            {isWinner && (
                <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 bg-opacity-50 z-50 '>
                    <div className='text-green-500  py-4 px-4 font-bold text-[3rem] text-center select-none -translate-y-[100px] bounce-in'>
                        {isWinner === "X" ? "X won" : isWinner === "O" ? "O won" : "Draw!"}
                    </div>
                </div>
            )}
        </>
    )
}