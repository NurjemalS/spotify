import { Settings } from "http2";

export class User{

    private username: string;
    private follower_count: number;
    private image_url: string;
    private country: string;

    constructor(username: string, follower_count: number, image_url: string, country: string){
        this.username = ' ';
        this.follower_count = 0;
        this.image_url = '';
        this.country = '';
    }

    public getUsername(): string {
        return this.username;
    }
    public setName(username: string): void {
        this.username = username;
    }

    public getFollowerCount(): number {
        return this.follower_count;
    }

    public getImgUrl(): string {
        return this.image_url;
    }

    public getCountry(): string {
        return this.country;
    }

}