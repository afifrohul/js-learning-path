import { useParams } from "react-router-dom";
import { getNote } from "../utils/local-data";
import { showFormattedDate } from "../utils";

function DetailPage() {
  const { id } = useParams();
  const note = getNote(id);

  return (
    <section>
      <div>
        <h1 className="note-item__title">{note?.title}</h1>
        <p className="note-item__date">{showFormattedDate(note?.createdAt)}</p>
        <p className="note-item__body">{note?.body}</p>
      </div>
    </section>
  );
}

export default DetailPage;
