interface ClientToServerEvents {
    words: (words: Array<string>) => void;
    roles: (roles: Array<string>) => void;
    getRole: (roles: string) => void;
}

export default ClientToServerEvents