'use client'

import { useRouter } from 'next/navigation';
import React from 'react'

export default function SidebarImport() {
  const router = useRouter()
  const onChange = async (e) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("something went wrong");
        return;
      }

      const data = await response.json();
      router.push(`/note/${data.uid}`)
      router.refresh()

    } catch (error) {
      console.error("something went wrong");
    }

    // // 重置 file input
    e.target.type = "text";
    e.target.type = "file";
  };
  return (
    <form method="post" encType="multipart/form-data">
      <div style={{ textAlign: "center", position: 'relative' }}>
        <label htmlFor="file" style={{ cursor: 'pointer' }}>导入 .md 文件</label>
        <input
          type="file"
          id="file"
          name="file"
          style={{ position: "absolute", clip: "rect(0 0 0 0)" }}
          onChange={onChange}
          accept=".md"
          // multiple
        />
      </div>
    </form>
  )
}