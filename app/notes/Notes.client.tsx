"use client"

import { useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'
import SearchBox from '@/components/SearchBox/SearchBox'
import NoteList from '@/components/NoteList/NoteList'
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Loader from '@/components/Loader/Loader';
import EmptyState from '@/components/EmptyState/EmptyState';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

import css from "./page.module.css";


export default function App() {

  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get('page')) || 1;

  const updatePage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const updateSearchQuery = useDebouncedCallback((value: string) => {
  setSearchQuery(value);
  updatePage(1);
}, 300);

  const { data, isSuccess, isLoading, error, isError, isFetching } = useQuery({
    queryKey: [ 'notes', searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    setSearchInput(value)
    updateSearchQuery(value)
  }

  const notesList = data?.notes ?? []
  const totalPages = data?.totalPages ?? 0;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
	    <header className={css.toolbar}>
		    <SearchBox value={searchInput} onSearch={handleSearchChange}/>
		    {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          updatePage={updatePage}
        />
        )}
		    <button 
          onClick={openModal} 
          className={css.button}>
            Create note +
          </button>
      </header>
      <main className={css.mainContent}>
        {isLoading && !isError && <Loader variant={'global'}/>}

        {isSuccess && notesList.length > 0 && (
          <div className={css.listWrapper}>
            < NoteList notes={notesList}/> 
            {isFetching && !isLoading && <Loader variant={'fetching'}/>}
          </div> 
        )}

        {isError && <ErrorMessage message={error instanceof Error ? error.message : "Failed to load notes."}/>}
        {isSuccess && notesList.length === 0 && (<EmptyState searchQuery={searchQuery} onAction={openModal}/>)}

        {isModalOpen && 
        (<Modal onClose={closeModal}>
            <NoteForm onClose={closeModal}/>
          </Modal>
        )}
      </main>
    </div>
  );
}