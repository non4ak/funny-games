export default function AvailableRooms({ rooms, onClick }) {
    return (
        <section className="mt-12 w-[95%] md:w-[700px] mx-auto">
            <h3 className="text-left text-3xl m-4">Available rooms:</h3>
            {rooms.length === 0 ? (
                <p className="text-xl text-center">No available rooms...</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {rooms.map((room, index) => (
                        <div key={index} className="flex text-xl justify-between px-12 items-center py-2 border border-gray-200 shadow-md bg-white">

                            <p className="font-semibold">{room.roomId}</p>
                            <p>{room.playersCount}/2</p>
                            <button className="button-submit py-1 px-4 w-[120px] cursor-pointer " onClick={() => onClick(room.roomId)}>Join</button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}