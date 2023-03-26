interface ClientToServerEvents {
    words: (words: Array<string>) => void;
    rolesOfWords: (roles: Array<string>) => void;
    createGame: (id: string) => void;
    startGame: (isGameStarted: Boolean) => void;
}

export default ClientToServerEvents