import { Role, Team } from "../models/Player";

interface JoinGameParams {
  gameId: string;
  nickname: string;
  role: Role;
  team: Team;
}
export default JoinGameParams;
