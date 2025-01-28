import { Game } from "./gameModel";

const API_URL = "http://localhost:3000/games";

// Fetch all games
export async function fetchGames(): Promise<Game[]> {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch games.");
        return response.json();
    } catch (error) {
        console.error("Error fetching games:", error);
        return [];
    }
}

// Create a new game
export async function createGame(newGame: Omit<Game, "id">): Promise<Game | null> {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newGame),
        });
        if (!response.ok) throw new Error("Failed to create game.");
        return response.json();
    } catch (error) {
        console.error("Error adding game:", error);
        return null;
    }
}

// Delete a game by ID
export async function deleteGame(id: number): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete game.");
        return true;
    } catch (error) {
        console.error("Error deleting game:", error);
        return false;
    }
}
