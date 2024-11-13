'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import SidebarNoteItem from './Item';
import NoteListEmpty from './Empty';

export default function SidebarNoteListFilter({ notes }) {
  const searchParams = useSearchParams()
  const searchText = searchParams.get('q')

  const filterNotes = useMemo(() => {
    if (!searchText) return notes;
    return notes.filter(([noteId, note]) => {
      const noteData = JSON.parse(note);
      return noteData.title.toLowerCase().includes(searchText.toLowerCase())
    })

  }, [searchText, notes]);

  if (filterNotes.length === 0) {
    return (
      <NoteListEmpty />
    )
  }
  return (
    <ul className="notes-list">
      {
        filterNotes.map(([noteId, note]) => {
          return (
            <li key={noteId}>
              <SidebarNoteItem noteId={noteId} note={note} />
            </li>
          )
        })
      }
    </ul>
  )
}