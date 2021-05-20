import Auth from "@/domains/auth/Auth";
import AuthService from "@/domains/auth/AuthService";
import axios from "@/domains/factory/AxiosFactory";
import User from "@/domains/user/User";

export default class AuthServiceImpl implements AuthService{

    async register(user: User): Promise<string> {
       const auth: Auth = (await axios.put("/user/register", user)).data;
        if (auth.success) {
            axios.defaults.headers.common.Authorization = auth.token;
            return "";
        } else if (auth.username === "DUPLICATE_USERNAME") {
            return "既に存在するユーザー名です。"
        } else {
            return "アカウント登録処理に失敗しました。管理者にお問い合わせください。";
        }
    }

    async login(user: User): Promise<boolean> {
        const auth: Auth = (await axios.put("/auth/login", user)).data;
        if (auth.success) {
            axios.defaults.headers.common.Authorization = auth.token;
            return true;
        } else {
            return false
        }

    }

}