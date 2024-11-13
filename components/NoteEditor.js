'use client'

import { useState, useTransition } from 'react'
import NotePreview from '@/components/NotePreview'
import { useFormStatus } from 'react-dom'
import { deleteNote, saveNote } from '@/app/actions'

export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody
}) {

  // const { pending } = useFormStatus()
  const [pending, startTransition] = useTransition();
  const [title, setTitle] = useState(initialTitle)
  const [body, setBody] = useState(initialBody)
  const isDraft = !noteId

  const [message, setMessage] = useState('')
  // const [pending, setPending] = useState(false)

  const saveFormAction = async (...args) => {
    // setPending(true)
    setMessage('')
    startTransition(async () => {
      const res = await saveNote(...args);
      if (res.errors) {
        const message = res.errors[0].message
        setMessage(message)
        return;
      }
      setMessage(res.message)
    });
    // const res = await saveNote(...args);
    // // setPending(false)
    // if (res.errors) {
    //   const message = res.errors[0].message
    //   setMessage(message)
    //   return;
    // }

    // setMessage(res.message)
  }

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <div className="note-editor-menu" role="menubar">
          <input type="hidden" name="noteId" value={noteId} />
          <button
            className="note-editor-done"
            disabled={pending}
            type="submit"
            formAction={saveFormAction}
            role="menuitem"
          >
            <img
              src="/checkmark.svg"
              width="14px"
              height="10px"
              alt=""
              role="presentation"
            />
            Done
          </button>
          {!isDraft && (
            <button
              className="note-editor-delete"
              disabled={pending}
              formAction={deleteNote}
              role="menuitem"
            >
              <img
                src="/cross.svg"
                width="10px"
                height="10px"
                alt=""
                role="presentation"
              />
              Delete
            </button>
          )}
        </div>
        <div className="note-editor-menu">
          {message}
        </div>
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea
          name="body"
          value={body}
          id="note-body-input"
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className="note-editor-preview">
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  )
}