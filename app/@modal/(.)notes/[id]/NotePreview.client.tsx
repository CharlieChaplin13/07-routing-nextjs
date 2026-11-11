"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api'
import Modal from '@/components/Modal/Modal';

import css from './NotePreview.module.css'

const NotePreviewClient = () => {
    const router = useRouter();
	const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id || ''),
    enabled: !!id,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <Modal onClose={() => router.back()}>	
	    <div className={css.container}>
            <button onClick={() => router.back()} className={css.backBtn}>Back</button>
		    <div className={css.item}>
		      <div className={css.header}>
		        <h2>{note.title}</h2>
		      </div>
		      <p className={css.tag}>{note.tag}</p>
		      <p className={css.content}>{note.content}</p>
		      <p className={css.date}>{formattedDate}</p>
		    </div>
	    </div>
    </Modal>
  );
};

export default NotePreviewClient;