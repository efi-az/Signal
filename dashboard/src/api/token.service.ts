export class TokenService {
    public getLocalRefreshToken(): string | null {
        return localStorage.getItem("refresh-token");
    }

    public getLocalAccessToken(): string | null {
        return localStorage.getItem("access-token");
    }

    public setLocalAccessToken(token: string) {
        localStorage.setItem("access-token", token);
    }

    public removeLocalAccessToken() {
        localStorage.removeItem("access-token");
    }
}