import {HttpClient} from "tsrpc-browser";
import {serviceProto, ServiceType} from "db://assets/Scripts/tsrpc/protocols/serviceProto";

export class TsrpcManager {
    private static _instance: TsrpcManager;
    private _apiClient: HttpClient<ServiceType>;

    public static get instance() {
        if (!this._instance) {
            this._instance = new TsrpcManager();
            this._instance._apiClient = new HttpClient(serviceProto, {
                server: "http://127.0.0.1:7459",
                json: true
            });
        }
        return this._instance;
    }

    async login(username: string, password: string, address: string) {
        const res = await this._apiClient.callApi("Login", {
            username,
            password,
            address
        });
        return res.res.state === "success";
    }
}
