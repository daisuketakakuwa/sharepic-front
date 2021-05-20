import AuthService from "@/domains/auth/AuthService";
import AuthServiceImpl from "@/domains/auth/AuthServiceImpl";
import CardService from "@/domains/card/CardService";
import CardServiceImpl from "@/domains/card/CardServiceImpl";
export default class ServiceFactory {

    private static authService: AuthService;    
    private static cardService: CardService;

    static async getAuthService() {
        if (!this.authService) {
            return new AuthServiceImpl();
        }
        return this.authService;
    }


    static async getCardService() {
        if (!this.cardService) {
            this.cardService = new CardServiceImpl();
        }
        return this.cardService;
    }

}