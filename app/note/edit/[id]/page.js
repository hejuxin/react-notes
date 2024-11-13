import NoteEditor from '@/components/NoteEditor'
import { getNote } from '@/lib/redis';
import { sleep } from '@/lib/utils';

export default async function EditPage({params}) {
  const { id } = await params
  const note = await getNote(id)
  // console.log(params, params.url)

  // 让效果更明显
  // await sleep(5000);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  return <NoteEditor noteId={id} initialTitle={note.title} initialBody={note.content} />
}
