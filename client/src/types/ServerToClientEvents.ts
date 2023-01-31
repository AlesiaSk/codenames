interface Room {
    name?: string,
    index: number
}
interface ServerToClientEvents {
    checkCardTeam: (room: string | undefined, index: number) => void;
}

export default ServerToClientEvents