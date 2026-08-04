import type { Book } from "@/interfaces/book.interface";
import BookCard from "./BookCard";

interface BookSectionProps {
  title: string;
  subtitle?: string;
  books: Book[];
}

export default function BookSection({
  title,
  subtitle,
  books,
}: BookSectionProps) {
  return (
    <section className="book-section">
      <div className="book-section__header">
        <h2 className="book-section__title">{title}</h2>

        {subtitle && (
          <p className="book-section__subtitle">{subtitle}</p>
        )}
      </div>

      <div className="book-section__list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}