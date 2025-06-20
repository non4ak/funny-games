import Section from "../components/Section";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket.js';
import CreateGameModal from "../components/CreateGameModal.jsx";
import AvailableRooms from "../components/AvailableRooms.jsx";

export default function Rooms() {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    const handleCreate = (roomId) => {
        setError(null);
        const roomIdent = roomId.trim();

        if (!roomIdent) {
            return;
        }

        if (!availableRooms.find(room => room.roomId === roomIdent)) {
            socket.emit("join", roomIdent);
            socket.emit("getAvailableRooms");
            navigate(`/tic-tac?room=${roomIdent}`);
        } else {
            console.log("room is already exists!");
            return;
        }
    }

    const handleJoin = (roomId) => {
        setError(null);
        const roomIdent = roomId.trim();

        if (!roomIdent) {
            return;
        }

        if (availableRooms.find(room => room.roomId === roomIdent)) {
            socket.emit("join", roomIdent);
            socket.emit("getAvailableRooms");
            navigate(`/tic-tac?room=${roomIdent}`);
        } else {
            setError("Room is not found!");
        }
    }

    useEffect(() => {
        const handleAvailableRooms = (rooms) => {
            setAvailableRooms(rooms);
        }

        socket.on("availableRooms", handleAvailableRooms);
        socket.emit("getAvailableRooms");

        return () => socket.off("availableRooms", handleAvailableRooms);
    }, []);

    return (
        <main>
            <Section heading={"Select a room for Tic Tac Toe"}>
                <div className="w-full md:w-[1000px] mx-auto">
                    <section className="flex flex-col gap-6 items-center my-16 text-xl">
                        <div className="flex gap-4 justify-center">
                            <input
                                className={`${error ? "border-red-500" : "border-gray-300"} py-2.5 px-3 w-82 border-2 rounded-md bg-amber-50 transition-all`}
                                type="text"
                                placeholder="Enter room..."
                                value={roomId}
                                onChange={e => setRoomId(e.target.value)}
                            />
                            <button
                                className={`py-2.5 px-3 w-[150px] button-submit cursor-pointer rounded-md font-semibold ${error ? "shake" : ""}`}
                                onClick={() => handleJoin(roomId)}
                            >
                                Join
                            </button>
                        </div>
                        <div className="flex flex-col items-center gap-6 font-semibold">
                            <p>or</p>
                            <button 
                                className="border bg-stone-800 border-gray-200 shadow-md py-2.5 px-3 w-[300px] text-white hover:border-gray-300 cursor-pointer uppercase rounded-md"
                                onClick={() => setShowModal(true)}
                            >
                                Create room
                            </button>
                        </div>
                    </section>
                    <AvailableRooms rooms={availableRooms} onClick={handleJoin}/>
                </div>
            </Section>
            <CreateGameModal show={showModal} onSubmit={handleCreate} onClose={() => setShowModal(false)} />
        </main>
    )   
}