import { useEffect, useState } from 'react'
import Section from '../components/Section';
import TurnSection from '../components/TurnSection';
import ResultModal from '../components/ResultModal';
import { checkIfWin } from '../utils/tic-tac';
import socket from '../socket.js';
import { useLocation } from 'react-router-dom';
import TicTakBoard from '../components/TicTacBoard.jsx';
import Waiting from '../components/Waiting.jsx';


export default function TikTak() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isWinner, setWinner] = useState(null);
    const [isCross, setSide] = useState(true);
    const [yourSymbol, setYourSymbol] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [players, setPlayers] = useState([]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const roomId = queryParams.get("room") || "none";

    const handleClick = (index) => {
        if (board[index]) return;

        if ((isCross && yourSymbol === "X") || (!isCross && yourSymbol === "O")) {
            const newBoard = [...board];
            newBoard[index] = yourSymbol;
            setBoard(newBoard);
            setWinner(checkIfWin(newBoard));
            setSide(!isCross);

            socket.emit('move', {
                roomId: roomId,
                index: index,
                symbol: yourSymbol,
            });
        }
    }

    const handleStartGame = () => {
        socket.emit('startGame', roomId);
    }

    useEffect(() => {
        socket.emit('join', roomId);

        socket.on('playerJoined', ({ playerId, symbol }) => {
            setYourSymbol(symbol);
            console.log("JOINED ", playerId, "SYMBOL ", symbol);
        });

        socket.on('playersInRoom', players => {
            setPlayers(players.map((playerId, index) => (
                {
                    playerId: playerId,
                    playerName: `Player ${index + 1}`
                }
            )));
        })

        socket.on('startGame', () => {
            const timer = setTimeout(() => {
                setGameStarted(true);
                console.log(gameStarted);
            }, 5000);

            return () => clearTimeout(timer);
        })

        return () => {
            socket.off('playerJoined');
            socket.off('startGame');
            socket.off('playersInRoom');
        }
    }, []);

    useEffect(() => {
        socket.on("opponentMove", ({ index, symbol }) => {
            const newBoard = [...board];
            newBoard[index] = symbol;
            setBoard(newBoard);
            setWinner(checkIfWin(newBoard));
            setSide(prev => !prev);
        })

        return () => socket.off('opponentMove');
    }, [board]);


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
                <Section heading="Tic Tac Toe">
                    {gameStarted ? (
                        <>
                            <TurnSection isCross={isCross} />
                            <TicTakBoard board={board} onClick={handleClick} onReset={resetGame} />
                        </>
                    ) : (
                        <Waiting room={roomId} players={players}/>
                    )}

                </Section>
                <button onClick={handleStartGame}>Start game</button>
            </main>
            {isWinner && <ResultModal isWinner={isWinner} />}
        </>
    )
}