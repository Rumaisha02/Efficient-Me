import React, { useState } from 'react'
import './Notes.css'

 function Notes() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  const handleAddNote = () => {
    if (newNote.trim() === '') {
      alert('Please write something in your note!')
      return
    }
    setNotes([...notes, newNote])
    setNewNote('') // Clear textarea
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
                ></textarea>
              </div>
              <button
                onClick={handleAddNote}
                style={{
                  marginTop: '10px',
                  backgroundColor: '#7b6849',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Add Note
              </button>
            </div>
          </div>

          {notes.map((note, index) => (
            <div key={index} className="createnote">
              <div className="creatnotebox">
                <div className="smallnotebox">
                  <textarea
                    readOnly
                    value={note}
                    style={{ backgroundColor: 'lemonchiffon' }}
                  ></textarea>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Notes