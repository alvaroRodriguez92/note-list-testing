import { useState, useEffect } from "react";
import { useAuthContext } from "../../Context/AuthContext";

export default function Note() {
  const { user, submitNote, notes, setNotes, deleteNote,getNotes } = useAuthContext();
  const [noteInput, setNoteInput] = useState("");
  const [isEditing, setIsEditing] = useState([]);
  const [editInput, setEditInput] = useState([]);

  useEffect(() => {
    setEditInput(notes);
  }, [notes]);

  function handleNote(e) {
    setNoteInput(e.target.value);
  }

  function handleEdit(index) {
    let array = isEditing;
    array[index] = true;
    setIsEditing([...array]);
  }

  function cancelEdit(index) {
    let array = isEditing;
    array[index] = false;
    setIsEditing([...array]);
    getNotes()
  }

  function handleEditInput(e, index) {
    const aux = editInput;
    aux[index].description = e.target.value;
    setEditInput([...aux]);
  }

  async function confirmUpdate(newNote, userID, noteID, index) {
    const response = await fetch(`http://localhost:3001/notes/${noteID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID: userID, newNote: newNote }),
    });
    if (response.status == 200) {
      const data = await response.json();
      setNotes(data);
      let array = isEditing;
      array[index] = false;
      setIsEditing([...array]);
    }
  }

  return (
    <>
      {user?.userID ? (
        <>
          <div className="add-notes">
            <input
              onChange={(e) => handleNote(e)}
              className="input-notes"
              placeholder="Type a note"
              value={noteInput}
            />{" "}
            <button
              onClick={() => submitNote(noteInput, setNoteInput)}
              className="button-notes"
            >
              Add note ✔
            </button>
          </div>
          <div className="notes-container">
            <ul className="notes-list">
              {notes?.map((note, index) => {
                return isEditing[index] ? (
                  <div key={index} className="input-edit-container">
                    <input
                      className="input-notes"
                      value={editInput[index]?.description}
                      onChange={(e) => handleEditInput(e, index)}
                    />{" "}
                    <button
                      className="button-notes"
                      onClick={() => cancelEdit(index)}
                    >
                      Cancel 🙅‍♂️
                    </button>
                    <button
                      className="button-notes"
                      onClick={() =>
                        confirmUpdate(
                          editInput[index].description,
                          note.userID,
                          note.notesID,
                          index
                        )
                      }
                    >
                      Confirm 🙆‍♂️
                    </button>
                  </div>
                ) : (
                  <div key={index} className="individual-note-container">
                    <li>{note.description}</li>{" "}
                    <button
                      onClick={() => deleteNote(note.notesID, note.userID)}
                    >
                      Remove ❌
                    </button>{" "}
                    <button onClick={() => handleEdit(index)}>Edit 📝</button>
                  </div>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <h1 className="h1-notas">Login to see your notes ! 📒 </h1>
      )}
    </>
  );
}
