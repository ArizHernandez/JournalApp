import { db } from "../firebase/firebase-config"

export const loadNotes = async(uid) => {
  const notesSnapshot = await db.collection(`${uid}/journal/notes`).orderBy('date','desc').get();
  const notes = [];

  notesSnapshot.forEach( snapSon => {
    notes.push({
      id: snapSon.id,
      ...snapSon.data()
    })
  })

  return notes;
}