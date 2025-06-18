import Section from "../components/Section";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket.js';
import CreateGameModal from "../components/CreateGameModal.jsx";

export default function Rooms() {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleCreate = (roomId) => {
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
        if (roomId.trim()) {
            navigate(`/tic-tac?room=${roomId}`);
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
            <Section heading={"Available Rooms!"}>
                <div className="w-[1000px] mx-auto mt-12 ">
                    <section className="flex flex-col gap-4 items-center my-16">
                        <div className="flex gap-4 justify-center">
                            <input
                                className="py-2.5 px-3 w-82 text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                                type="text"
                                placeholder="Enter room..."
                                value={roomId}
                                onChange={e => setRoomId(e.target.value)}
                            />
                            <button
                                className="py-2.5 px-3 w-[150px] button-submit cursor-pointer rounded-md text-xl uppercase font-semibold"
                                onClick={() => handleJoin(roomId)}
                            >
                                Join
                            </button>
                        </div>
                        <div className="text-xl flex flex-col items-center gap-4">
                            <p>or</p>
                            <button 
                                className="border border-gray-200 shadow-md py-2.5 px-3 w-[300px] text-stone-700 hover:border-gray-300 cursor-pointer"
                                onClick={() => setShowModal(true)}
                            >
                                + Create new room!
                            </button>
                        </div>

                    </section>
                    <section className="mt-12 w-full md:w-[700px] mx-auto">
                        <h3 className="text-left text-3xl m-4">Available rooms:</h3>
                        {availableRooms.length === 0 ? (
                            <p className="text-xl text-center">No available rooms...</p>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {availableRooms.map((room, index) => (
                                    <div key={index} className="flex text-xl justify-between px-12 border border-gray-200 shadow-md">

                                        <p><span>🎮</span> {room.roomId}</p>
                                        <p>{room.playersCount}/2</p>
                                        <button className="button-submit py-1 px-4 w-[120px] cursor-pointer " onClick={() => handleJoin(room.roomId)}>Join</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </Section>
            <CreateGameModal show={showModal} onSubmit={handleCreate} onClose={() => setShowModal(false)} />
        </main>
    )
}