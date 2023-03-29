interface JoinGameParams {
  gameId: string;
  nickname: string;
  role: string;
  team: "RED" | "BLUE";
}
export default JoinGameParams;
