import client from "$src/database";
import type { Cell } from "$lib/store";
import { error, redirect } from "@sveltejs/kit";
import type { Sudoku } from "sudoku-gen/dist/types/sudoku.type";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ params, cookies }) => {
  const game = await client.hget("games", params.id);

  if (game === null) {
    throw error(404, "Not Found");
  }

  cookies.set("gameID", params.id, {
    path: "/",
  });

  const { puzzle } = JSON.parse(game) as Sudoku;

  const board = [...puzzle].map<Cell>((char) => {
    const num = parseInt(char);
    return {
      number: num || 0,
      locked: !Number.isNaN(num),
      corners: [],
      centers: [],
    };
  });

  return {
    board,
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  checkBoard: async ({ request, cookies }) => {
    const cookie = cookies.get("gameID");
    if (cookie !== undefined) {
      const game = await client.hget("games", cookie);
      if (game !== null) {
        const { solution } = JSON.parse(game) as Sudoku;
        const formData = await request.formData();

        const board = formData.get("board");

        return {
          success: board === solution,
        };
      }
    }

    return {
      success: false,
    };
  },

  giveUp: async ({ cookies }) => {
    cookies.delete("gameID", {
      path: "/",
    });
    throw redirect(307, "/");
  },
};
