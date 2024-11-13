import dayjs from 'dayjs';
import SidebarNoteItemContent from './Wrap';
export default function SidebarNoteItem({ noteId, note }) {
  const { title, content = '', updateTime } = JSON.parse(note);
  return (
    <SidebarNoteItemContent
      id={noteId}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }
    >
      <header className="sidebar-note-header">
        <strong>{title}</strong>
        <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
      </header>
    </SidebarNoteItemContent>
  )
}