export enum Role {
  OPERATIVE = "OPERATIVE",
  SPYMASTER = "SPYMASTER",
}

export enum Team {
  RED = "RED",
  BLUE = "BLUE",
}

type Player = {
  nickname: string;

  id: string;
  role?: Role;
  team?: Team;
};

export default Player;
