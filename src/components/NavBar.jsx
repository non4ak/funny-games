import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
    const location = useLocation();

    return (
        <>
            <nav className="flex justify-center space-x-8 w-full max-w-xl mx-auto text-2xl py-4 shadow-md rounded-md select-none mt-4 z-40">
                <Link
                    to="/"
                    className={`px-4 py-2 rounded hover:bg-amber-300 transition-colors duration-200 font-semibold ${location.pathname === "/" ? "bg-amber-200" : ""}`}
                >
                    🎮 Tic Tak
                </Link>
                <Link
                    to="/wordle"
                    className={`px-4 py-2 rounded hover:bg-amber-300 transition-colors duration-200 font-semibold ${location.pathname === "/wordle" ? "bg-amber-200" : ""}`}
                >
                    🧩 Wordle
                </Link>
            </nav>
        </>
    )
}