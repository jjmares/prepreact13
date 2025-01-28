import { fetchGames, createGame, deleteGame } from "./gameService";
import { Game } from "./gameModel";
import $ from "jquery";

function renderGames(games: Game[]) {
    const tableBody = $("#games-table");
    tableBody.empty();

    games.forEach((game) => {
        tableBody.append(`
            <tr id="game-${game.id}">
                <td>${game.id}</td>
                <td>${game.title}</td>
                <td>${game.stars}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${game.id}">Delete</button>
                </td>
            </tr>
        `);
    });
}

async function initializeApp() {
    try {
        const games = await fetchGames();
        renderGames(games);
    } catch (error) {
        console.error("Error initializing app:", error);
    }
}

// Handle form submission for creating a new game
$("#create-form").on("submit", async function (e) {
    e.preventDefault();
    const title = String($("#game-title").val());
    const stars = parseInt($("#game-stars").val() as string);

    if (!title || isNaN(stars)) {
        console.error("Invalid input for title or stars.");
        return;
    }

    const newGame: Omit<Game, "id"> = { title, stars };
    const createdGame = await createGame(newGame);

    if (createdGame) {
        const games = await fetchGames();
        renderGames(games);
        $("#game-title").val("");
        $("#game-stars").val("");
    }
});

// Handle delete button clicks
$(document).on("click", ".delete-btn", async function () {
    const id = $(this).data("id");

    if (typeof id !== "number") {
        console.error("Invalid game ID for deletion.");
        return;
    }

    const success = await deleteGame(id);

    if (success) {
        $(`#game-${id}`).remove();
    }
});

// Initialize the app
initializeApp();
