import React, { Suspense } from 'react'
import Link from 'next/link'
import SidebarSearchField from './Search';
import SidebarNoteList from './NoteList';
import NoteListSkeleton from './NoteList/Skeleton';
import Add from './Add';

export default async function Sidebar() {
  return (
    <>
      <section className="col sidebar">
        <Link href={'/'} className="link--unstyled">
          <section className="sidebar-header">
            <img
              className="logo"
              src="/logo.svg"
              width="22px"
              height="20px"
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          {/* SideSearchField */}
          <SidebarSearchField />
          {/* <EditButton noteId={null}>NEW</EditButton> */}
          <Add />
        </section>
        <nav>
          {/* SidebarNoteList */}
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  )
}