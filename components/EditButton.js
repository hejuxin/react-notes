import Link from 'next/link'
import cn from 'classnames'

export default function EditButton({ noteId, children }) {
  const isDraft = noteId === null;
  return (
    <Link
      href={{
        pathname: `/note/edit/${noteId || ''}`,
        query: { name: 'test' },
      }}
      className="link--unstyled"
    >
      <button
        className={cn('edit-button', {
          'edit-button--solid': isDraft,
          'edit-button--outline': !isDraft
        })}
        role="menuitem"
      >
        {children}
      </button>
    </Link>
  );
}