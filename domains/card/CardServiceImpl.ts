import axios from '@/domains/factory/AxiosFactory';
import Card from "@/domains/card/Card";
import CardService from "@/domains/card/CardService";

export default class CardServiceImpl implements CardService {

    async uploadCard(card: Card) {
        await axios.put("/card/upload", card);
    }

}