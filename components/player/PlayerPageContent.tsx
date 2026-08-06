import type { Book } from "@/interfaces/book.interface";
import AudioPlayer from "./AudioPlayer";

interface PlayerPageContentProps {
  book: Book;
}

export default function PlayerPageContent({
  book,
}: PlayerPageContentProps) {
  return (
    <section className="player-page">
      <header className="player-page__header">
        <p className="player-page__eyebrow">
          {book.author}
        </p>

        <h1 className="player-page__title">
          {book.title}
        </h1>
      </header>

      <article className="player-page__summary">
        {book.summary
          .split("\n")
          .filter((paragraph) => paragraph.trim())
          .map((paragraph, index) => (
            <p key={index}>{paragraph.trim()}</p>
          ))}
      </article>
      <AudioPlayer
  audioLink={book.audioLink}
  title={book.title}
/>
    </section>
  );
}