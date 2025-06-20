export function checkIfWin(boardToCheck) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[b] === boardToCheck[c]) {
            return boardToCheck[a];
        }
    }

    if (boardToCheck.every(cell => cell !== null)) {
        return "Draw";
    }

    return null;
}

export const createHandlers = ({
    setYourSymbol,
    setPlayers,
    setGameStarted,
    setCounter,
    setBoard,
    setWinner,
    setSide,
    setVotes,
    getBoard,
    swap,
}) => {
    let localTimeoutId = null;
    let localIntervalId = null;

    const startGame = () => {
        setCounter(5);

        localTimeoutId = setTimeout(() => {
            setGameStarted(true);
        }, 5000);

        localIntervalId = setInterval(() => {
            setCounter(prev => {
                if (prev <= 1) {
                    clearInterval(localIntervalId);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const clearTimers = () => {
        if (localTimeoutId) {
            clearTimeout(localTimeoutId);
            localTimeoutId = null;
        }
        if (localIntervalId) {
            clearInterval(localIntervalId);
            localIntervalId = null;
        }
    };

    return {
        playerJoined: ({ playerId, symbol }) => {
            setYourSymbol(symbol);
            console.log("JOINED", playerId, "SYMBOL", symbol);
        },

        playersInRoom: (players) => {
            setPlayers(players.map((playerId, index) => ({
                playerId,
                playerName: `Player ${index + 1}`
            })));
        },

        startGame,

        playerLeft: () => {
            clearTimers();
            setGameStarted(false);
            setCounter(5);
            setVotes(0);
            swap();
        },

        opponentMove: ({ index, symbol }) => {
            const board = getBoard();
            const newBoard = [...board];
            newBoard[index] = symbol;
            setBoard(newBoard);
            setWinner(checkIfWin(newBoard));
            setSide(prev => !prev);
        },

        resetGame: () => {
            setBoard(Array(9).fill(null));
            setSide(true);
            setVotes(0);
            setWinner(null);
            swap();
        },

        updateResetVotes: total => {
            setVotes(total);
        },

        clearTimers,
    };
};