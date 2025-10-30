import { create } from 'zustand';

export interface Note {
  id: string;
  timestamp: number;
  content: string;
  summary: string;
}

interface NotesState {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'timestamp'>) => void;
  loadNotes: () => void;
  deleteNote: (id: string) => void;
}

const getInitialNotes = (): Note[] => {
  if (typeof window !== 'undefined') {
    const storedNotes = localStorage.getItem('aiNotes');
    // Ensure data integrity during parse
    try {
      return storedNotes ? JSON.parse(storedNotes) : [];
    } catch (e) {
      console.error('Failed to parse notes from local storage.', e);
      return [];
    }
  }
  return [];
};

const saveNotesToStorage = (notes: Note[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('aiNotes', JSON.stringify(notes));
  }
};

export const useNotesStore = create<NotesState>((set) => ({
  notes: getInitialNotes(),

  addNote: (newNoteData) =>
    set((state) => {
      const note: Note = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        ...newNoteData,
      };
      const updatedNotes = [note, ...state.notes];
      saveNotesToStorage(updatedNotes);
      return { notes: updatedNotes };
    }),

  loadNotes: () =>
    set(() => ({
      notes: getInitialNotes(),
    })),

  deleteNote: (id) =>
    set((state) => {
      const updatedNotes = state.notes.filter((note) => note.id !== id);
      saveNotesToStorage(updatedNotes);
      return { notes: updatedNotes };
    }),
}));
