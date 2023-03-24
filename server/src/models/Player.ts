class Player {
    public nickname: string;
    public id: string;
    public role: string;
    public team: string;

    constructor(nickname: string, role: string, team: string) {
        this.nickname = nickname;
        this.role = role;
        this.team = team;
    };
}

export default Player