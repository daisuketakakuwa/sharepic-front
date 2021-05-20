import User from "@/domains/user/User";

export default interface AuthService {
    register: (user: User) => Promise<string>;
    login: (user: User) => Promise<boolean>;
}