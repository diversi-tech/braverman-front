import { useState } from "react";
import { Notes } from "../../model/notes.model";
import Swal from "sweetalert2";
import React from "react";


interface NotesColumnProps {
    notes: Notes[];
    leadId: string;
    addNote: (note: Notes) => void;
  }
  
   //Notes
   const NotesColumn: React.FC<NotesColumnProps> = ({ notes, leadId, addNote }) => {
    const [showAllNotes, setShowAllNotes] = useState(false);
  
    const handleNoteClick = async () => {
      const allNotesContent = notes.map((note, index) => `<p key=${index}>${note.content}</p>`).join('');
      const { value: formValues } = await Swal.fire({
        title: 'הערות',
        html: `
          <div>
            ${allNotesContent}
            <input id="swal-input-content" class="swal2-input" placeholder="הערה חדשה">
            <input id="swal-input-created-by" class="swal2-input" placeholder="נוצר על ידי">
          </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'הוסף הערה',
        cancelButtonText: 'ביטול',
        preConfirm: () => {
          const content = (document.getElementById('swal-input-content') as HTMLInputElement).value;
          const createdBy = (document.getElementById('swal-input-created-by') as HTMLInputElement).value;
  
          if (!content || !createdBy) {
            Swal.showValidationMessage('יש למלא את כל השדות');
            return false;
          }
  
          return { content, createdBy };
        }
      });
  
      if (formValues) {
        const newNote: Notes = {
          content: formValues.content,
          id:'',
          createdBy: formValues.createdBy,
          timestamp: new Date(),
          leadId: leadId
        };
  
        addNote(newNote);
      }
    };
  
    return (
      <div onClick={handleNoteClick} style={{ cursor: 'pointer' }}>
        {notes.length > 0 ? notes[notes.length - 1].content : 'אין הערות'}
      </div>
    );
  };
  export const NoteColumn = React.memo(NotesColumn)