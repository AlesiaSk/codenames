import Player, {PlayerId} from "./Player";

class Game {
    public words: Array<string>;
    public rolesOfWords: Array<string>;
    public currentState: Array<string>;
    public spymasters: Map<PlayerId, Player>;
    public players: Map<PlayerId, Player>;
    public isStarted: Boolean;

    constructor() {
        // Here will be logic for creating random set of words and random roles for them
        this.rolesOfWords = ['red', 'blue', 'black', 'neutral', 'red'];
        this.words = ['Test1', 'Test2', 'Test3', 'Test4', 'Test5'];
        this.currentState = new Array(5).fill('none');
        this.players = new Map<PlayerId, Player>();
        this.spymasters = new Map<PlayerId, Player>();
        this.isStarted = false;
    };

    private addSpymaster(player: Player) {
        this.spymasters.set(player.id, player);
    };

    addPlayer(player: Player) {
        this.players.set(player.id, player);

        if(player.role === 'spymaster') {
            this.addSpymaster(player);
        }
    };

    getPlayer(playerId: PlayerId) {
        return this.players.get(playerId);
    };

    nextMove(index: number) {
        this.currentState[index] = this.rolesOfWords[index];
    };

    start() {
        this.isStarted = true;
    };
}

export default Game