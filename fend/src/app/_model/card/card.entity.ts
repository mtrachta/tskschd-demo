export class Card {
    //
    countStr!: string;
    countNum!: number;
    // 
}

export interface ICard {
    items: Card[];
    total_count: number;
}