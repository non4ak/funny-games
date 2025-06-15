import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import Section from '../components/Section';
import TurnSection from '../components/TurnSection';
import ResultModal from '../components/ResultModal';
import { checkIfWin } from '../utils/tic-tac';


export default function TikTak() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isWinner, setWinner] = useState(null);
    const [isCross, setSide] = useState(true);

    const handleClick = (index) => {
        if (board[index]) return;
        const newBoard = [...board];
        newBoard[index] = isCross ? "X" : "O";
        setBoard(newBoard);
        setWinner(checkIfWin(newBoard));
        setSide(!isCross);
    }

    useEffect(() => {
        if (isWinner) {
            const timer = setTimeout(() => {
                resetGame();
            }, 5000)

            return () => clearTimeout(timer);
        }
    }, [isWinner]);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setSide(true);
        setWinner(null);
    }

    return (
        <>
            <main className='w-full h-screen bg-gray-100'>
                <NavBar />
                <Section heading="Tic Tac Toe">
                    <TurnSection isCross={isCross}/>
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
                </Section>
            </main>
            {isWinner && <ResultModal isWinner={isWinner} />}
        </>
    )
}