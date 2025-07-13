import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import "./Notes.css";

function Notes() {
  const [notes, setNotes] = useState([]); // All user notes
  const [newNote, setNewNote] = useState(""); // Current input
  const { user } = useAuth(); // Get current user

  // Fetch notes from Firestore
  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return;
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setNotes(data.notes || []); // Load notes or empty array
        } else {
          console.log("No notes found for this user");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, [user]);

  // Save notes to Firestore
  const saveNotesToFirestore = async (updatedNotes) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, { notes: updatedNotes }, { merge: true });
      console.log("Notes saved!");
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  // Add note
  const handleAddNote = async () => {
    if (notes.length >= 2) {
      alert("You can only have up to 2 notes!");
      return;
    }
    if (newNote.trim() === "") {
      alert("Please write something in your note!");
      return;
    }
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setNewNote(""); // Clear textarea
    await saveNotesToFirestore(updatedNotes);
  };

  // Delete note
  const handleDeleteNote = async (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    await saveNotesToFirestore(updatedNotes);
  };

  if (!user) {
    return (
      <div className="center">
        <div className="box">
          <h2>Please login to view your Notes</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <div id="notescontain">
        <div id="notes">
          <div className="createnote">
            <div className="creatnotebox">
              <div className="smallnotebox">
                <textarea
                  placeholder="Write your notes here.."
                  id="inputNote"
                  maxLength="200"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  disabled={notes.length >= 2} // Disable textarea when limit reached
                ></textarea>
              </div>
              <button
                onClick={handleAddNote}
                className="addbutton"
                disabled={notes.length >= 2} // Disable button when limit reached
                style={{
                  backgroundColor: notes.length >= 2 ? "#aaa" : "#7b6849",
                  cursor: notes.length >= 2 ? "not-allowed" : "pointer",
                }}
              >
                {notes.length >= 2 ? "Limit Reached" : "Add Note"}
              </button>
            </div>
          </div>

          {/* Render saved notes */}
          {notes.map((note, index) => (
            <div key={index} className="createnote">
              <div className="creatnotebox">
                <div className="smallnotebox">
                  <textarea
                    readOnly
                    value={note}
                    style={{ backgroundColor: "lemonchiffon" }}
                  ></textarea>
                  <button
                    onClick={() => handleDeleteNote(index)}
                    className="deletebutton"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;
