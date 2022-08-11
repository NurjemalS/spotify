import { Settings } from "http2";

export class Credentials{

    private client_id: string = '';
    private secret_id: string = '';

   public getClientId(): string {
        return this.client_id;
    }

    public getSecretId(): string {
        return this.secret_id;
    }
}

