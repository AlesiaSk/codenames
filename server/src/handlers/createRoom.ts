import Game from "../models/Game";

const createRoom = () => {
    // Here will be logic for creating random set of words and random roles for them
    const game = new Game(['Test1', 'Test2', 'Test3', 'Test4', 'Test5'], ['red', 'blue', 'black', 'neutral', 'red']);
    return game;
};

export default createRoom;