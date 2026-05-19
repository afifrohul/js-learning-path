import React from 'react';
import { showFormattedDate } from '../utils';

function NoteItem({ note, onDelete, onArchive }) {
  return (
    <div
      className="note-item"
      data-testid="note-item"
      data-note-id={note?.id}
    >
      <div className="note-item__content" data-testid="note-item-content">
        {/* TODO [Basic] tampilkan judul catatan menggunakan note.title */}
        {/* TODO [Advanced] sorot kata kunci pencarian dalam judul menggunakan elemen <mark>. */}
        <h3 className="note-item__title" data-testid="note-item-title">
          {note.title}
        </h3>
        {/* TODO [Basic] gunakan util showFormattedDate untuk menampilkan tanggal dibuat. */}
        <p className="note-item__date" data-testid="note-item-date">
          {showFormattedDate(note.createdAt)}
        </p>
        {/* TODO [Basic] tampilkan isi catatan dari note.body */}
        {/* TODO [Advanced] sorot kata kunci pencarian dalam isi menggunakan elemen <mark>. */}
        <p className="note-item__body" data-testid="note-item-body">
          {note.body}
        </p>
      </div>
      <div className="note-item__action" data-testid="note-item-action">
        {/* TODO [Skilled] pecah tombol aksi menjadi komponen terpisah bernama `NoteActionButton` dengan menerima props `variant` dan `onClick` */}
        <button
          className="note-item__delete-button"
          type="button"
          // TODO [Basic] panggil onDelete dengan id catatan.
          onClick={() => onDelete(note.id)}
          data-testid="note-item-delete-button"
        >
          Delete
        </button>

        {/* TODO [Advanced] implementasikan tombol arsip untuk fitur mengarsipkan catatan */}
        <button
          className="note-item__archive-button"
          type="button"
          // TODO [Basic] panggil onArchive dengan id catatan.
          onClick={() => onArchive(note.id)}
          data-testid="note-item-archive-button"
        >
          {note.archived == false ? 'Archive' : 'Unarchive'}
        </button>
      </div>
    </div>
  );
}

export default NoteItem;
