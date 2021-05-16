import Card from "@/domains/card/Card";
import CardForAccount from "@/domains/card/CardForAccount";
import CardForHome from "@/domains/card/CardForHome";

export default interface CardService {

    upload(card: Card): void;
    getTags(): Promise<string[]>;
    getCardsForHome(): Promise<CardForHome[]>;
    getCardsForAccount(): Promise<CardForAccount>;
    search(tag: string, freeword: string): Promise<Card[]>;

}