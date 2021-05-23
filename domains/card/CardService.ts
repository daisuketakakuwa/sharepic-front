import Card from "@/domains/card/Card";
import CardForAccount from "@/domains/card/CardForAccount";
import CardForHome from "@/domains/card/CardForHome";
import CardForSearch from "@/domains/card/CardForSearch";

export default interface CardService {

    upload(card: Card): void;
    getTags(): Promise<string[]>;
    getTagsAndNames(): Promise<CardForSearch>;
    getCardsForHome(): Promise<CardForHome[]>;
    getCardsForAccount(): Promise<CardForAccount>;
    search(tag: string, name: string): Promise<Card[]>;

}