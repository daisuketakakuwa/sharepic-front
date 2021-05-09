export default class Card {
    constructor(
        public id: string,
        public src: string,
        public tags: string[],
        public description: string,
        public postDate: string,
        public postUser: string
    ) { }
}