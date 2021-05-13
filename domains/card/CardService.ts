import Card from "@/domains/card/Card";

export default interface CardService {

    uploadCard(card: Card) : void;

}