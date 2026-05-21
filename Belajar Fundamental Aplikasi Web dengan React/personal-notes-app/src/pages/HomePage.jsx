import React, { useDebugValue } from "react";
import {
  getActiveNotes,
  deleteNote,
  archiveNote,
  getArchivedNotes,
  unarchiveNote,
} from "../utils/network-data";
import NotesList from "../components/NotesList";

function HomePage() {
  const [notes, setNotes] = React.useState([]);
  const [archivedNotes, setArchivedNotes] = React.useState([]);

  const onDeleteHandler = async (id) => {
    await deleteNote(id);

    const { data: active } = await getActiveNotes();
    setNotes(active);

    const { data: archived } = await getArchivedNotes();
    setArchivedNotes(archived);
  };

  const onArchiveHandler = async (id) => {
    await archiveNote(id);

    const { data: active } = await getActiveNotes();
    setNotes(active);

    const { data: archived } = await getArchivedNotes();
    setArchivedNotes(archived);
  };

  const onUnarchiveHandler = async (id) => {
    await unarchiveNote(id);

    const { data: active } = await getActiveNotes();
    setNotes(active);

    const { data: archived } = await getArchivedNotes();
    setArchivedNotes(archived);
  };

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });

    getArchivedNotes().then(({ data }) => {
      setArchivedNotes(data);
    });
  }, []);

  return (
    <div>
      <section>
        <h2>Catatan Aktif</h2>
        <NotesList
          notes={notes}
          onDelete={onDeleteHandler}
          onArchive={onArchiveHandler}
        />
      </section>
      <section>
        <h2>Arsip</h2>
        <NotesList
          notes={archivedNotes}
          onDelete={onDeleteHandler}
          onUnarchive={onUnarchiveHandler}
        />
      </section>
    </div>
  );
}

export default HomePage;
