import NoteItem from "./NoteItem";

function NotesList(props) {
  const { notes, onDelete, onArchive } = props;

  const hasNotes = notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list">
        <p className="notes-list__empty-message">Tidak ada catatan.</p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map((note, index) => (
        <NoteItem
          onDelete={onDelete}
          onArchive={onArchive}
          key={index}
          note={note}
        />
      ))}
    </div>
  );
}

export default NotesList;
