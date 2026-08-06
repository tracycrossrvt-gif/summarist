import Link from "next/link";
import {
  FiBookOpen,
  FiHeadphones,
  FiStar,
} from "react-icons/fi";

import { RiLightbulbLine } from "react-icons/ri";

import type { Book } from "@/interfaces/book.interface";

interface BookDetailsProps {
  book: Book;
}

export default function BookDetails({
  book,
}: BookDetailsProps) {

  return (
    <section className="book-details">
      <div className="book-details__hero">
        <div className="book-details__content">
          <h1 className="book-details__title">
            {book.title}
          </h1>

          <p className="book-details__author">
            {book.author}
          </p>

          <p className="book-details__subtitle">
            {book.subTitle}
          </p>

          <div className="book-details__meta">
            <div className="book-details__meta-item">
              <FiStar />
              <span>
                {book.averageRating.toFixed(1)} (
                {book.totalRating.toLocaleString()} ratings)
              </span>
            </div>

            <div className="book-details__meta-item">
              <FiHeadphones />
              <span>{book.type}</span>
            </div>

            <div className="book-details__meta-item">
              <RiLightbulbLine />
              <span>{book.keyIdeas} key ideas</span>
            </div>
          </div>

          <div className="book-details__actions">
            <Link
              href={`/player/${book.id}`}
              className="book-details__primary-action"
            >
              <FiBookOpen />
              Read
            </Link>

            <Link
              href={`/player/${book.id}`}
              className="book-details__secondary-action"
            >
              <FiHeadphones />
              Listen
            </Link>
          </div>

          <button
            className="book-details__library-button"
            type="button"
          >
            Add to My Library
          </button>
        </div>

        <figure className="book-details__image-wrapper">
          {book.subscriptionRequired && (
            <span className="book-details__premium">
              Premium
            </span>
          )}

          <img
            className="book-details__image"
            src={book.imageLink}
            alt={`${book.title} cover`}
          />
        </figure>
      </div>

      <div className="book-details__section">
  <h2>What&apos;s it about?</h2>

  {book.tags.length > 0 && (
    <div className="book-details__tags">
      {book.tags.map((tag) => (
        <span
          key={tag}
          className="book-details__tag"
        >
          {tag}
        </span>
      ))}
    </div>
  )}

  <p>{book.bookDescription}</p>
</div>

      <div className="book-details__section">
        <h2>About the author</h2>
        <p>{book.authorDescription}</p>
      </div>
    </section>
  );
}