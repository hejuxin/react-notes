'use server'

import { redirect } from 'next/navigation'
import {addNote, updateNote, delNote} from '@/lib/redis';
import { revalidatePath } from 'next/cache';
import { z } from "zod";
import { sleep } from '@/lib/utils';

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, '请填写内容').max(500, '字数最多 500')
});

export async function saveNote(formData) {
  const noteId = formData.get('noteId')
  // const data = JSON.stringify({
  //   title: formData.get('title'),
  //   content: formData.get('body'),
  //   updateTime: new Date()
  // })

  const data = {
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date()
  }

  const validated = schema.safeParse(data)
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    }
  }

  await sleep(3000)
  const form = JSON.stringify(data);
  if (noteId) {
    await updateNote(noteId, form)
    revalidatePath('/', 'layout')
    // redirect(`/note/${noteId}`)
  } else {
    const res = await addNote(form)
    revalidatePath('/', 'layout')
    // redirect(`/note/${res}`)
  }

  return { message: `Add Success!` }
}

export async function deleteNote(formData) {
  const noteId = formData.get('noteId')

  await delNote(noteId)
  revalidatePath('/', 'layout')
  redirect('/')
}