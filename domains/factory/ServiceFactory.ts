import AuthService from "@/domains/auth/AuthService";
import AuthServiceImpl from "@/domains/auth/AuthServiceImpl";
import CardService from "@/domains/card/CardService";
import CardServiceImpl from "@/domains/card/CardServiceImpl";
import config from '@/domains/config/Config';
export default class ServiceFactory {

    private static authService: AuthService;    
    private static cardService: CardService;

    static async getAuthService() {
        config.getConfig();
        if (!this.authService) {
            return new AuthServiceImpl();
        }
        return this.authService;
    }


    static async getCardService() {
        config.getConfig();
        if (!this.cardService) {
            this.cardService = new CardServiceImpl();
        }
        return this.cardService;
    }

}