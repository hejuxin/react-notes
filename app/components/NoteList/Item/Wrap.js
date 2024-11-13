'use client'

import { useState, useTransition } from "react"
import cn from 'classnames'
import { usePathname, useRouter } from "next/navigation"

export default function SidebarNoteItemContent({
  id,
  children,
  expandedChildren
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const selectedId = pathname?.split('/').at(-1) || null
  const [isPending] = useTransition()
  const isActive = id === selectedId

  return (
    <div
      className={cn('sidebar-note-list-item', {
        'note-expanded': isExpanded,
        'active': isActive
      })}
      onClick={() => {
        router.push(`/note/${id}`)
      }}
    >
      {children}
      {/* <button
        className="sidebar-note-open"
        
        onClick={() => {
          const sidebarToggle = document.getElementById('sidebar-toggle')
          if (sidebarToggle) {
            sidebarToggle.checked = true
          }
          router.push(`/note/${id}`)
        }}>
        Open note for preview
      </button> */}
      <button
        className="sidebar-note-toggle-expand"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? (
          <img
            src="/chevron-down.svg"
            width="10px"
            height="10px"
            alt="Collapse"
          />
        ) : (
          <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
        )}
      </button>
      {
        isExpanded && expandedChildren
      }
    </div>
  )
}