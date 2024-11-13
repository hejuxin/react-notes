import { createIncrementArray } from "@/lib/utils";

const arr = createIncrementArray(3)
export default function NoteListSkeleton() {
  return (
    <div>
      <ul className="notes-list skeleton-container">
        {
          arr.map((item) => {
            return (
              <li className="v-stack" key={item}>
                <div className="sidebar-note-list-item skeleton" />
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}