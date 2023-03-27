interface ClientToServerEvents {
    words: (words: Array<string>) => void;
    rolesOfWords: (words: Array<string>) => void;
    currentRolesOfWords: (words: Array<string>) => void;
    createGame: (id: string) => void;
    startGame: (isGameStarted: Boolean) => void;
}

export default ClientToServerEvents