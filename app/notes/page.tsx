// app/notes/page.tsx

'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { summarizeNote } from '@/lib/ai-actions';
import { useNotesStore, Note } from '@/lib/store/notesStore';
import { Dot, Zap, Loader2, Trash2, BookText } from 'lucide-react';
import { format } from 'date-fns';

const MIN_LENGTH = 50;

/**
 * Component to display a single saved note.
 */
const NoteItem = ({ note }: { note: Note }) => {
  const { deleteNote } = useNotesStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-border/50 border-b py-3">
      <div
        className="hover:text-primary flex cursor-pointer items-center justify-between transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col">
          <h3 className="text-foreground/90 font-semibold">
            {note.summary.substring(0, 80)}
            {note.summary.length > 80 ? '...' : ''}
          </h3>
          <span className="text-muted-foreground mt-0.5 text-xs">
            {format(note.timestamp, 'MMM dd, yyyy - hh:mm a')}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <BookText className="text-primary h-4 w-4" />
          <Trash2
            className="text-destructive h-4 w-4 transition-transform hover:scale-110"
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening/closing the note
              deleteNote(note.id);
            }}
            aria-label={`Delete note titled: ${note.summary}`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="bg-muted/20 mt-3 space-y-2 rounded-lg p-3 text-sm">
          <p className="text-foreground/80 font-medium">Original Note:</p>
          <p className="text-muted-foreground whitespace-pre-wrap">
            {note.content}
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * The main component for the AI Notes application.
 */
export default function AINotesPage() {
  const [inputNote, setInputNote] = useState('');
  const [currentSummary, setCurrentSummary] = useState('');
  const [isPending, startTransition] = useTransition();
  const { notes, addNote, loadNotes } = useNotesStore(); // Access ViewModel

  // Load notes from local storage once on mount
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputNote.length < MIN_LENGTH) return;
    setCurrentSummary('');

    // 1. Trigger Server Action (Model/Mutation)
    startTransition(async () => {
      const summaryResult = await summarizeNote(inputNote);

      setCurrentSummary(summaryResult);

      // 2. Commit to Zustand Store (ViewModel)
      if (
        !summaryResult.startsWith('Error') &&
        summaryResult.length > MIN_LENGTH
      ) {
        addNote({
          content: inputNote,
          summary: summaryResult,
        });
        setInputNote('');
      }
    });
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-foreground flex items-center justify-center space-x-3 text-4xl font-extrabold">
          <Zap className="text-primary h-8 w-8" /> <span>AI Notes Lab</span>
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Take notes, get instant AI summaries, and save your knowledge locally.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* LEFT COLUMN: Input and Live Summary */}
        <div className="space-y-6">
          <h2 className="text-foreground text-xl font-bold">
            1. Input & Summarize
          </h2>
          <form
            onSubmit={handleSubmit}
            className="border-border bg-card space-y-4 rounded-xl border p-4 shadow-lg"
          >
            <textarea
              id="note-input"
              rows={12}
              value={inputNote}
              onChange={(e) => setInputNote(e.target.value)}
              placeholder={`Paste or type your technical notes here. (Min ${MIN_LENGTH} characters for summary)`}
              className="border-input bg-background text-foreground focus:ring-primary focus:border-primary w-full resize-none rounded-lg border p-3 text-sm transition-all focus:ring-2"
              disabled={isPending}
            />

            <button
              type="submit"
              disabled={isPending || inputNote.length < MIN_LENGTH}
              className="text-md bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-12 w-full items-center justify-center rounded-lg px-8 py-3 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing
                  Note...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" /> Get AI Summary & Save
                </>
              )}
            </button>
          </form>

          {/* Live Summary Panel */}
          <div className="space-y-2">
            <h3 className="text-foreground text-lg font-bold">AI Output:</h3>
            <div className="border-border bg-muted/20 text-muted-foreground min-h-[100px] rounded-lg border p-4 text-sm shadow-inner">
              {currentSummary ? (
                <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {currentSummary}
                </p>
              ) : isPending ? (
                <div className="text-primary flex h-full items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing
                  AI response...
                </div>
              ) : (
                <p className="text-muted-foreground/70 flex items-center text-sm">
                  <Dot className="mr-1 h-5 w-5" /> A quick summary appears here
                  after the AI processes your note.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Saved Notes List */}
        <div className="space-y-6">
          <h2 className="text-foreground text-xl font-bold">
            2. Saved Knowledge ({notes.length})
          </h2>
          <div className="border-border bg-card min-h-[500px] rounded-xl border p-4 shadow-lg">
            {notes.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center">
                Your saved AI notes will appear here.
              </p>
            ) : (
              <div className="divide-border divide-y">
                {notes.map((note) => (
                  <NoteItem key={note.id} note={note} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
