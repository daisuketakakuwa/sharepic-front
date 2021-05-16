import Card from "@/domains/card/Card";

export default class CardForAccount {
    constructor(
        public favoriteCards: Card[] =[],
        public yourCards: Card[] = []
    ) { }
}