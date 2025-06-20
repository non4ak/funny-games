import { Link } from "react-router-dom";

export default function GameButton({ icon, link, heading, descript }) {
    return (
        <Link to={`/${link}`}>
            <button className="text-4xl py-8 cursor-pointer flex gap-12 mx-auto text-left px-12 w-full md:w-[70%] items-center justify-center hover:bg-slate-200 rounded-md shadow-md border border-gray-200 hover:border-gray-300">
                <img src={icon} alt="Tic Tac Icon" className="w-32 h-32" />
                <div className="flex flex-col gap-2">
                    <span className="w-[400px] font-semibold">{heading}</span>
                    <p className="text-xl leading-tight">{descript}</p>
                </div>
            </button>
        </Link>
    )
}