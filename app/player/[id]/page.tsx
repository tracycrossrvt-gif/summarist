import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PlayerPageContent from "@/components/player/PlayerPageContent";
import { getBook } from "@/services/books";

interface PlayerPageProps {
  params: {
    id: string;
  };
}

export default async function PlayerPage({
  params,
}: PlayerPageProps) {
  const book = await getBook(params.id);

  return (
    <DashboardLayout>
      <PlayerPageContent book={book} />
    </DashboardLayout>
  );
}