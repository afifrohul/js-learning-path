import React, { useDebugValue } from "react";
import {
  getActiveNotes,
  deleteNote,
  archiveNote,
  getArchivedNotes,
} from "../utils/local-data";
import NotesList from "../components/NotesList";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getActiveNotes(),
      archiveNote: getArchivedNotes(),
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
  }

  onDeleteHandler(id) {
    deleteNote(id);
    this.setState(() => {
      return {
        notes: getActiveNotes(),
        archiveNote: getArchivedNotes(),
      };
    });
  }

  onArchiveHandler(id) {
    archiveNote(id);
    this.setState(() => {
      return {
        notes: getActiveNotes(),
        archiveNote: getArchivedNotes(),
      };
    });
  }

  render() {
    return (
      <div>
        <section>
          <h2>Catatan Aktif</h2>
          <NotesList
            notes={this.state.notes}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
          />
        </section>
        <section>
          <h2>Arsip</h2>
          <NotesList
            notes={this.state.archiveNote}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
          />
        </section>
      </div>
    );
  }
}

export default HomePage;
