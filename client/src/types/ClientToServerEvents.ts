interface ClientToServerEvents {
    words: (words: Array<string>) => void;
    roles: (roles: Array<string>) => void;
    createGame: (id: string) => void;
}

export default ClientToServerEvents