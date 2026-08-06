import type {
  Book,
  BookStatus,
} from "@/interfaces/book.interface";

const BOOKS_API_URL =
  "https://us-central1-summaristt.cloudfunctions.net/getBooks";

const BOOK_API_URL =
  "https://us-central1-summaristt.cloudfunctions.net/getBook";

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

async function fetchBookById(id: string): Promise<Book> {
  const response = await fetch(
    `${BOOK_API_URL}?id=${encodeURIComponent(id)}`
  );

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      `Failed to fetch book ${id}: ${response.status} ${response.statusText}. ${errorBody}`
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

export const getBook = (id: string) =>
  fetchBookById(id);