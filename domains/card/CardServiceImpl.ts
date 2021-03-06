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

    async getTagsAndNames() {
        return (await axios.get("/card/tags-names")).data;
    }

    async search(tag: string, name: string) {
        return (await axios.get("/card/search", {
            params: {
                tag: tag,
                name: name
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