import { useEffect, useState } from 'react'
import Section from '../components/Section';
import TurnSection from '../components/TurnSection';
import ResultModal from '../components/ResultModal';
import { checkIfWin, createHandlers } from '../utils/tic-tac';
import socket from '../socket.js';
import { useLocation } from 'react-router-dom';
import TicTakBoard from '../components/TicTacBoard.jsx';
import Waiting from '../components/Waiting.jsx';

const INIT_COUNTER = 5;

export default function TikTak() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isWinner, setWinner] = useState(null);
    const [isCross, setSide] = useState(true);
    const [yourSymbol, setYourSymbol] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [players, setPlayers] = useState([]);
    const [counter, setCounter] = useState(INIT_COUNTER);
    const [error, setError] = useState(null);
    const [votes, setVotes] = useState(0);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const roomId = queryParams.get("room") || "none";

    const handleClick = (index) => {
        if (board[index] || isWinner) return;

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
        setError(null);
        if (players.length === 2) {
            socket.emit('startGame', roomId);
        } else {
            setError("Wait for another player");
        }
    }

    const handleCancelGame = () => {
        if (gameStarted) {
            setGameStarted(false);
        }
    }
    
    const handleResetRequest = () => {
        socket.emit("resetRequest", roomId, socket.id);
    };

    const swap = () => {
        setYourSymbol(prev => {
            if (prev === "X") {
                return "O";
            } else if (prev === "O") {
                return "X";
            } else {
                console.log("Error");
            }
        })
    };

    const handlers = createHandlers({
        setYourSymbol,
        setPlayers,
        setGameStarted,
        setCounter,
        setBoard,
        setWinner,
        setSide,
        setVotes,
        getBoard: () => board,
        swap,
    });



    useEffect(() => {
        socket.emit('join', roomId);

        socket.on('playerJoined', handlers.playerJoined);
        socket.on('playersInRoom', handlers.playersInRoom);
        socket.on('startGame', handlers.startGame);
        socket.on('playerLeft', handlers.playerLeft);
        socket.on('resetGame', handlers.resetGame);
        socket.on('resetVotesUpdate', handlers.updateResetVotes);

        return () => {
            socket.off('playerJoined', handlers.playerJoined);
            socket.off('playersInRoom', handlers.playersInRoom);
            socket.off('startGame', handlers.startGame);
            socket.off('playerLeft', handlers.playerLeft);
            socket.off('resetGame', handlers.resetGame);
            socket.off('resetVotesUpdate', handlers.updateResetVotes);
            socket.emit("leaveRoom", roomId);
            handlers.clearTimers();
        };
    }, []);

    useEffect(() => {
        socket.on("opponentMove", handlers.opponentMove);
        return () => socket.off('opponentMove', handlers.opponentMove);
    }, [board]);

    useEffect(() => {
        if (isWinner) {
            const timer = setTimeout(() => {
                resetGame();
            }, 5000)

            return () => clearTimeout(timer);
        }
    }, [isWinner]);

    useEffect(() => {
        return () => {
            if (roomId && roomId !== "none") {
                socket.emit("leaveRoom", roomId);
            }
        }
    }, []);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setSide(true);
        setWinner(null);
        swap();
    }

    return (
        <>
            <main className='w-full h-screen '>
                <Section heading="Tic Tac Toe">
                    {gameStarted ? (
                        <>
                            <TurnSection isCross={isCross} players={players} symbol={yourSymbol} />
                            <TicTakBoard board={board} onClick={handleClick} onReset={handleResetRequest} votes={votes}/>
                        </>
                    ) : (
                        <Waiting room={roomId} players={players} timer={counter} onStart={handleStartGame} onCancel={handleCancelGame} />
                    )}

                </Section>
            </main>
            {isWinner && <ResultModal isWinner={isWinner} />}
        </>
    )
}