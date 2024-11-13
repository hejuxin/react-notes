import Note from '@/components/Note'
import { getNote } from '@/lib/redis';
import { sleep } from '@/lib/utils';

export default async function Page({ params }) {
  // 动态路由 获取笔记 id
  const { id } = await params
  const note = await getNote(id)

  // 为了让 Suspense 的效果更明显
  await sleep(5000);

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  return <Note noteId={id} note={note} />
}