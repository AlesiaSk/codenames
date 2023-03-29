const baseURL = 'http://localhost:8000';

export const GameAPI = {
    create: function() {
        return fetch(`${baseURL}/game`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json());
    }
}