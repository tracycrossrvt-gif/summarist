import BookDetails from "@/components/books/BookDetails";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getBook } from "@/services/books";

interface BookPageProps {
  params: {
    id: string;
  };
}

export default async function BookPage({
  params,
}: BookPageProps) {
  const book = await getBook(params.id);

  return (
    <DashboardLayout>
      <BookDetails book={book} />
    </DashboardLayout>
  );
}