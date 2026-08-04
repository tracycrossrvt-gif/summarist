import Link from "next/link";
import type { Book } from "@/interfaces/book.interface";


interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/book/${book.id}`}
      className="book-card"
    >
      <div className="book-card__image-wrapper">
        {book.subscriptionRequired && (
          <span className="book-card__premium">
            Premium
          </span>
        )}

        <img
          className="book-card__image"
          src={book.imageLink}
          alt={`${book.title} cover`}
        />
      </div>

      <div className="book-card__content">
        <h3 className="book-card__title">
          {book.title}
        </h3>

        <p className="book-card__author">
          {book.author}
        </p>

        <p className="book-card__subtitle">
          {book.subTitle}
        </p>

      </div>
    </Link>
  );
}
