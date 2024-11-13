import { createIncrementArray } from "@/lib/utils"

const arr = createIncrementArray(5);
export default function NoteSkeleton() {
  return (
    <div
      className="note skeleton-container"
      role="progressbar"
      aria-busy="true"
    >
      <div className="note-header">
        <div
          className="note-title skeleton"
          style={{ height: '3rem', width: '65%', marginInline: '12px 1em' }}
        />
        <div
          className="skeleton skeleton--button"
          style={{ width: '8em', height: '2.5em' }}
        />
      </div>
      <div className="note-preview">
        {
          arr.map((item) => {
            return (
              <div className="skeleton v-stack" key={item} style={{ height: '1.5em' }} />
            )
          })
        }
      </div>
    </div>
  )
}