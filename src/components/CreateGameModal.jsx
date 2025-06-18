import { useState } from "react";

export default function CreateGameModal({show, onClose, onSubmit}) {
    const [roomName, setRoomName] = useState('');
    
    if (!show) return null;

    const handleSubmit = () => {
        const roomId = roomName.trim();

        if (!roomId) {
            return;
        }

        onSubmit(roomId);
        setRoomName("");
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/15 backdrop-blur-md/15 flex items-center justify-center z-50 -translate-y-[100px]">
            <div className="bg-white rounded-xl p-12 w-[500px] max-w-md shadow-lg relative flex flex-col gap-8 ">
                <h1 className="text-3xl text-center font-semibold">Start a New Game Room</h1>
                <input 
                    type="text" 
                    name="room-name" 
                    placeholder="Enter room name..."
                    maxLength={16}
                    value={roomName}
                    onChange={e => setRoomName(e.target.value)}
                    className="w-full max-w-md text-xl px-4 py-3 border border-gray-300 rounded-xl shadow-sm transition"
                />
                <div className="flex justify-center gap-4 text-xl">
                    <button 
                        className="button-submit py-2.5 px-3s w-[150px] cursor-pointer"
                        onClick={handleSubmit}
                    >
                        Create
                    </button>
                    <button className="border-2 border-gray-300 py-2.5 px-3s w-[150px] cursor-pointer hover:bg-red-500 hover:text-white" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>  
    )
}