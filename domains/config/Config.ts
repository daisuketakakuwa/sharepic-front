import axios from "@/domains/factory/AxiosFactory";

export class Config {
  public apiPath = '';
}

class ConfigLoader {
    private static config: Config;

    static async getConfig() {
        if (!this.config) {
            this.config = (await axios.get("/resources/config.json")).data;
            axios.defaults.baseURL = this.config.apiPath;
        }
        return this.config;
    }
}

export default ConfigLoader;
