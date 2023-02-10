import { async } from "@firebase/util";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, savinNewNote, setActiveNote, setNotes } from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savinNewNote());
    const { uid } = getState().auth;
    //id

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };

  //Dispatch nueva nota, ctivar la nota
};

export const starLoadingNotes = () => {
  return async (dispatch, getState) => {
    
    const { uid } = getState().auth;
    if( !uid) throw new Error ('El ui del usario no existe')

   const Notas = await loadNotes(uid)

    dispatch(setNotes(Notas))
  };
};
