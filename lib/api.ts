import axios from "axios";
import type { Note, CreateNote, NoteTag } from "@/types/note";


interface Response {
    notes: Note[]
    totalPages: number
}

interface FetchNotesArgs {
    search?: string;
    page?: number;
    perPage?: number;
    tag?: NoteTag | 'all'; 
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}` 
  },
})

export const fetchNotes = async ({
    search = "",
    page = 1,
    perPage = 12,
    tag
  }: FetchNotesArgs = {}): Promise<Response> => {
   
    const { data } = await api.get<Response>('/notes', {
        params: {
            search,
            page,
            perPage,
            tag: (tag && tag !== 'all' ? tag: undefined)
        }});
     return data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
      const { data } = await api.post<Note>('/notes', newNote);
      return data;
    };

export const deleteNote = async (noteId: string): Promise<Note> => {
      const { data } = await api.delete<Note>(`/notes/${noteId}`);
      return data;
    };    

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

