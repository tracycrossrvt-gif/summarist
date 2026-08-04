import BookSection from "@/components/books/BookSection";
import SelectedBook from "@/components/books/SelectedBook";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  getRecommendedBooks,
  getSelectedBooks,
  getSuggestedBooks,
} from "@/services/books";

export default async function ForYouPage() {
  const selectedBooks = await getSelectedBooks();
  const recommended = await getRecommendedBooks();
  const suggested = await getSuggestedBooks();

  const selectedBook = selectedBooks[0];

  return (
    <DashboardLayout>
      {selectedBook && (
        <SelectedBook book={selectedBook} />
      )}

      <BookSection
        title="Recommended For You"
        subtitle="We think you’ll like these"
        books={recommended}
      />

      <BookSection
        title="Suggested Books"
        subtitle="Browse those books"
        books={suggested}
      />
    </DashboardLayout>
  );
}