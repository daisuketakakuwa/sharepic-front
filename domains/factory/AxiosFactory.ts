import axios from 'axios';

class AxiosFactory {

  private static initialized = false;


    static get axios() {
        if (!this.initialized) {
            this.initialized = true;
        }
        return axios;
    }

}

export default AxiosFactory.axios;