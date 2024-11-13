import { sleep } from '@/lib/utils';
import { getAllNotes } from '@/lib/redis';
import SidebarNoteListFilter from './Filter';
import NoteListEmpty from './Empty';

export default async function NoteList() {
  await sleep(3000);
  const notes = await getAllNotes();
  const arr = Object.entries(notes);

  if (arr.length === 0) {
    return (
      <NoteListEmpty />
    )
  }

  return (
    <SidebarNoteListFilter notes={arr} />
  )
}