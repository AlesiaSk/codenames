import Game from "./models/Game";

export type GameId = string;

class InMemoryGameStore {
    games: Map<GameId, Game>;

    constructor() {
        this.games = new Map<GameId, Game>();
    }

    add(gameId: GameId, game: Game) {
        this.games.set(gameId, game);
    }

    get(gameId: GameId) {
        return this.games.get(gameId);
    }

    remove(gameId: GameId) {
        this.games.delete(gameId)
    }
}

const gameStore = new InMemoryGameStore();

export default gameStore;
