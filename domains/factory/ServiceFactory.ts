import CardService from "@/domains/card/CardService";
import CardServiceImpl from "@/domains/card/CardServiceImpl";
export default class ServiceFactory {

    private static cardService: CardService;

    static async getCardService() {
        if (!this.cardService) {
            this.cardService = new CardServiceImpl();
        }
        return this.cardService;
    }

}