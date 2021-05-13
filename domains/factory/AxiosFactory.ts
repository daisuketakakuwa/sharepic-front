import axios from 'axios';

class AxiosFactory {

    private static initialized = false;

    static get axios() {
        if (!this.initialized) {
            axios.defaults.baseURL = "http://localhost:8081";
            this.initialized = true;
        }
        return axios;
    }

}

export default AxiosFactory.axios;