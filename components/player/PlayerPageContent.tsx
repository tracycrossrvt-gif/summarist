import type { Book } from "@/interfaces/book.interface";
import AudioPlayer from "./AudioPlayer";
import Reader from "./Reader";

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

      <Reader summary={book.summary} />

      <AudioPlayer
        audioLink={book.audioLink}
        title={book.title}
      />
    </section>
  );
}