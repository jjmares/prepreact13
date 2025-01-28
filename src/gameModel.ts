export interface Game {
    id?: number; // Optional during creation, required for existing games
    title: string;
    stars: number; // 1-5
}
