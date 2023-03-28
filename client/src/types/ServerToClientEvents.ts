import JoinGameParams from "./JoinGameParams";

interface ServerToClientEvents {
    nextMove: (index: number) => void;
    joinRoom: (joinGameParams: JoinGameParams) => void;
    gameStarted: () => void;
}

export default ServerToClientEvents