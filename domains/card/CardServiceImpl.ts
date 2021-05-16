import axios from '@/domains/factory/AxiosFactory';
import Card from "@/domains/card/Card";
import CardService from "@/domains/card/CardService";

export default class CardServiceImpl implements CardService {

    async upload(card: Card) {
        await axios.put("/card/upload", card);
    }

    async getTags() {
        return (await axios.get("/card/tags")).data;
    }

    async search(tag: string, freeword: string) {
        return (await axios.get("/card/search", {
            params: {
                tag: tag,
                freeword: freeword
            }
        })).data
    }

    async getCardsForHome() {
        return (await axios.get("/card/home")).data;
    }

    async getCardsForAccount() {
        return (await axios.get("/card/account")).data;
    }

}