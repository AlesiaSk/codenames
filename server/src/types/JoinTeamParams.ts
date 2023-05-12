import { PlayerId, Role, Team } from "../models/Player";

interface JoinTeamParams {
  playerId: PlayerId;
  role: Role;
  team: Team;
}
export default JoinTeamParams;
