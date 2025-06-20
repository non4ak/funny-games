import Section from "../components/Section.jsx";
import TicTacIcon from '../assets/tic-tac-toe_1429455.png';
import WordleIcon from '../assets/wordleicon.png';
import GameButton from "../components/GameButton.jsx";

export default function Main() {
    return (
        <main>
            <Section heading={"Feeling lucky? Tap a game and let’s go!"}>
                <section className="w-[1000px] mx-auto flex flex-col gap-8">
                    <GameButton link={"rooms"} icon={TicTacIcon} heading={"Play Tic Tac Toe"} descript={"A classic two-player game where players take turns marking X or O on a 3x3 grid."} />
                    <GameButton link={"wordle"} icon={WordleIcon} heading={"Play Wordle"} descript={"A word puzzle game where players have six attempts to guess a hidden five-letter word."} /> 
                </section>
            </Section>
        </main>
    )
}