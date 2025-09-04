import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

const Notes = async ({ params }: NotesProps) => {
  const { slug } = await params;
  const tag = slug[0] === 'All%20notes' ? '' : slug[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default Notes;
