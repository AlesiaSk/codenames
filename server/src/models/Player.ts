export type PlayerId = string;

class Player {
    public nickname: string;
    public id: PlayerId;
    public role: string;
    public team: string;

    constructor(nickname: string, role: string, team: string, id: PlayerId) {
        this.nickname = nickname;
        this.role = role;
        this.team = team;
        this.id = id;
    };
}

export default Player