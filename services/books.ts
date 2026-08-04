import type {
  Book,
  BookStatus,
} from "@/interfaces/book.interface";

const BOOKS_API_URL =
  "https://us-central1-summaristt.cloudfunctions.net/getBooks";

async function fetchBooks(
  status: BookStatus
): Promise<Book[]> {
  const response = await fetch(
    `${BOOKS_API_URL}?status=${status}`
  );

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      `Failed to fetch ${status} books: ${response.status} ${response.statusText}. ${errorBody}`
    );
  }

  return response.json();
}

export const getSelectedBooks = () =>
  fetchBooks("selected");

export const getRecommendedBooks = () =>
  fetchBooks("recommended");

export const getSuggestedBooks = () =>
  fetchBooks("suggested");