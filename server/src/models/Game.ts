import Player from "./Player";

class Game {
    public words: Array<string>;
    public wordsRoles: Array<string>;
    public currentState: Array<string>;
    public spymasters: Array<Player>;
    public players: Array<Player>;
    public isStarted: Boolean;

    constructor(words: Array<string>, wordsRoles: Array<string>) {
        this.wordsRoles = wordsRoles;
        this.words = words;
        this.currentState = new Array(5).fill('none');
        this.players = [];
        this.spymasters = [];
        this.isStarted = false;
    };

    addSpymaster(player: Player) {
        this.spymasters.push(player);
    };

    addPlayer(player: Player) {
        this.players.push(player);
    };

    start() {
        this.isStarted = true;
    }
}

export default Game