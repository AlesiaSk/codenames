export type PlayerId = string;

export enum Role {
  OPERATIVE = "OPERATIVE",
  SPYMASTER = "SPYMASTER"
}

export enum Team {
  RED = "RED",
  BLUE = "BLUE"
}

class Player {
  public nickname: string;
  public id: PlayerId;
  public role: Role;
  public team: Team;

  constructor(
    nickname: string,
    role: Role,
    team: Team,
    id: PlayerId
  ) {
    this.nickname = nickname;
    this.role = role;
    this.team = team;
    this.id = id;
  }
}

export default Player;
