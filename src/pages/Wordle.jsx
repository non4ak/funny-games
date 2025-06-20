import { useState } from 'react'
import NavBar from '../components/NavBar';
import Section from '../components/Section';

export default function Wordle() {
    const [board, setBoard] = useState(Array.from({ length: 6 }, () => Array(5).fill('')));
    const [value, setValue] = useState('');
    const [error, setError] = useState(null);
    const [counter, setCounter] = useState(0);
    const [results, setResults] = useState(Array.from({ length: 6 }, () => Array(5).fill('')));
    const [isWin, setIsWin] = useState(false);
    const [isLost, setIsLost] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const wordToGuess = Array.from("dream".toUpperCase());

    const handleSubmit = () => {
        setError(null);

        if (value.length !== 5) {
            setError('Try Again!');
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            return;
        }

        const wordArray = Array.from(value.toUpperCase());
        const newBoard = [...board];
        newBoard[counter] = [...wordArray];
        const newResults = [...results];

        if (board.some(row => row.join('') === value.toUpperCase())) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            return;
        }

        let win = false;
        if (isEqual(wordArray, wordToGuess)) {
            setIsWin(true);
            win = true;
            setTimeout(() => {
                refresh();
            }, 5000);
        }

        if (counter > 4 && !win) {
            setIsLost(true);
            setTimeout(() => {
                refresh();
            }, 5000);
        }

        newResults[counter] = wordArray.map((char, index) => {
            if (char === wordToGuess[index]) return 'correct';
            else if (wordToGuess.includes(char)) return 'includes';
            else return 'absent';
        })

        setResults(newResults);
        setBoard(newBoard);
        setCounter(prev => prev + 1);
        setValue('');
    }

    function isEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }

        return true;
    }

    function refresh() {
        setIsWin(false);
        setIsLost(false);
        setError(null);
        setBoard(Array.from({ length: 6 }, () => Array(5).fill('')));
        setResults(Array.from({ length: 6 }, () => Array(5).fill('')));
        setCounter(0);
        setValue('');
    }

    return (
        <>
            <div className='w-full h-screen'>
                <Section heading={"Wordle"}>
                    <div className='grid grid-rows-6 w-[400px] mx-auto gap-4 justify-center'>
                        {board.map((_, rowIndex) => (
                            <div key={rowIndex} className='grid grid-cols-5 gap-2'>
                                {board[rowIndex].map((item, colIndex) => {
                                    let status = results[rowIndex][colIndex];

                                    let colorClass;
                                    if (status === 'includes') {
                                        colorClass = "bg-yellow-500";
                                    } else if (status === 'correct') {
                                        colorClass = "bg-green-500";
                                    } else if (status === "absent") {
                                        colorClass = "bg-gray-500";
                                    } else {
                                        colorClass = "bg-gray-300";
                                    }

                                    return (
                                        <div
                                            key={colIndex}
                                            className={`w-18 h-18 ${colorClass} text-white border rounded-lg flex justify-center items-center text-4xl select-none font-bold bounce-in`}
                                        >
                                            {item}
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col w-[500px] mx-auto mt-8 items-center justify-center'>
                        <input
                            type="text"
                            onChange={(e) => setValue(e.target.value)}
                            name="word"
                            value={value}
                            className='bg-white w-[70%] text-2xl rounded-xl px-3 py-2.5 border border-gray-300'
                            placeholder='Enter word'
                        />
                        <button
                            onClick={handleSubmit}
                            className={`uppercase font-medium text-2xl mt-4 w-[200px] py-2.5 rounded-2xl button-submit cursor-pointer ${isShaking ? "shake" : ""}`}
                        >
                            Submit
                        </button>
                    </div>
                    {error && <p className='text-center mt-2 text-2xl text-red-500'>{error}</p>}

                </Section>

            </div>
            {isWin && (
                <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 bg-opacity-50 z-50 '>
                    <div className='text-green-500  py-4 px-4 font-bold text-[3rem] text-center select-none -translate-y-[100px] bounce-in'>
                        🎉 CORRECT!!!
                    </div>
                </div>
            )}
            {isLost && (
                <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 bg-opacity-50 z-50 '>
                    <div className='text-red-500  py-4 px-4 font-bold text-5xl text-center select-none -translate-y-[100px] bounce-in'>
                        You fucked up!!!
                    </div>
                </div>
            )}
        </>
    )
}