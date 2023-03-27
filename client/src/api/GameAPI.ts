import UserData from "../types/UserData";

const baseURL = 'http://localhost:8000';

export const GameAPI = {
    create: function() {
        return fetch(`${baseURL}/room`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json());
    },

    addPlayer: function ({nickname, role, team, roomId} : UserData) {
        return fetch(`${baseURL}/addPlayer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({nickname, role, team, roomId})
        }).then(res => res.json());
    }
}