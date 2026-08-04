import type { Book } from "@/interfaces/book.interface";
import { FiPlay } from "react-icons/fi";

interface SelectedBookProps {
  book: Book;
}

export default function SelectedBook({
  book,
}: SelectedBookProps) {
  return (
    <section className="selected-book">
      <h2 className="selected-book__heading">
        Selected just for you
      </h2>

      <div className="selected-book__card">
        <div className="selected-book__summary">
          {book.subTitle}
        </div>

        <div className="selected-book__divider" />

        <figure className="selected-book__image-wrap">
          <img
            className="selected-book__image"
            src={book.imageLink}
            alt={`${book.title} cover`}
          />
        </figure>

        <div className="selected-book__details">
          <h3 className="selected-book__title">
            {book.title}
          </h3>

          <p className="selected-book__author">
            {book.author}
          </p>

          <button
            className="selected-book__play"
            type="button"
          >
            <span className="selected-book__play-icon">
              <FiPlay />
            </span>

            <span>3 mins 23 secs</span>
          </button>
        </div>
      </div>
    </section>
  );
}