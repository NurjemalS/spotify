import { Settings } from "http2";

export class Credentials{

    private client_id: string = '1660d73268854fa1b5db09a6c41f44b4';
    private secret_id: string = 'a6e7aaa31a5a43dbb0f1d6603ef37a48';

   public getClientId(): string {
        return this.client_id;
    }

    public getSecretId(): string {
        return this.secret_id;
    }
}

