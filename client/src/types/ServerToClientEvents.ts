interface Room {
    name?: string,
    index: number
}
interface ServerToClientEvents {
    nextMove: (index: number) => void;
    joinRoom: (room: string | undefined, name: string) => void;
    gameStarted: () => void;
}

export default ServerToClientEvents