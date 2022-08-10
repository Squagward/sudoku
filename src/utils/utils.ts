import React from "react";

export const SIZE = 9;

export const locationToIndex = (row: number, col: number) => row * SIZE + col;

export const isShiftDown = (e: React.KeyboardEvent<HTMLTableCellElement>) =>
  e.shiftKey ||
  (e.code.startsWith("Numpad") &&
    (e.key.startsWith("Arrow") ||
      e.key === "Home" ||
      e.key === "End" ||
      e.key === "Clear" ||
      e.key.startsWith("Page")));
