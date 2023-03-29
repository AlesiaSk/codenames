export type PlayerId = string;

class Player {
    public nickname: string;
    public id: PlayerId;
    public role: string;
    public team: 'RED' | 'BLUE';

    constructor(nickname: string, role: string, team: 'RED' | 'BLUE', id: PlayerId) {
        this.nickname = nickname;
        this.role = role;
        this.team = team;
        this.id = id;
    };
}

export default Player