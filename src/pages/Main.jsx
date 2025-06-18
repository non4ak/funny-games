import Section from "../components/Section.jsx";
import { Link } from 'react-router-dom';
import TicTacIcon from '../assets/tic-tac-toe_1429455.png';
import WordleIcon from '../assets/wordleicon.png';

export default function Main() {

    return (
        <main>
            <Section heading={"Welcome to the game!"}>
                <h3 className="text-center text-xl text-stone-600 font-medium">Feeling lucky? Tap a game and let’s go!</h3>
                <section className="w-[1000px] mx-auto space-y-8 mt-12">
                    <div>
                        <Link to="/rooms">
                            <button className="text-5xl py-3 cursor-pointer flex gap-12 mx-auto text-left px-12 w-full md:w-[70%] items-center justify-center hover:bg-amber-100 rounded-md shadow-md border border-gray-200">
                                <img src={TicTacIcon} alt="Tic Tac Icon" className="w-32 h-32" />
                                <span className="w-[350px]">Play Tic Tac Toe!</span>
                            </button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/wordle">
                            <button className="text-5xl py-3 cursor-pointer flex gap-12 mx-auto text-left px-12 w-full md:w-[70%] items-center justify-center hover:bg-amber-100 rounded-md shadow-md border border-gray-200">
                                <img src={WordleIcon} alt="Wordle Icon" className="w-32 h-32" />
                                <span className="w-[350px]">Play Wordle!</span>
                            </button>
                        </Link>
                    </div>
                </section>
            </Section>
        </main>
    )
}