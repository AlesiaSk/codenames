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
    id: PlayerId
  ) {
    this.nickname = nickname;
    this.id = id;
  }

  setRole(role: Role) {
    this.role = role;
  };

  setTeam(team: Team) {
    this.team = team;
  }
}

export default Player;
