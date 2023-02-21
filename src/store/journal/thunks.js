
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fuleUpload } from "../../helpers/fuleUpload";
import { loadNotes } from "../../helpers/loadNotes";
import {
  addNewEmptyNote,
  deleteNoteById,
  savinNewNote,
  setActiveNote,
  setNotes,
  setPhotostoActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savinNewNote());
    const { uid } = getState().auth;
    //id

    const newNote = {
      title: "",
      body: "",
      imageUrls: [],
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
    if (!uid) throw new Error("El ui del usario no existe");

    const Notas = await loadNotes(uid);
    dispatch(setNotes(Notas));
  };
};

export const starSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { activeNote } = getState().journal;

    const noteFirestore = { ...activeNote };
    delete noteFirestore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);

    await setDoc(docRef, noteFirestore, { merge: true });

    dispatch(updateNote(activeNote));
  };
};


export const startUploadingFiles = ( files = []) =>{
  return async( dispatch) =>{
    dispatch (setSaving)

    const fileUploadPromises =[]
    for (const file of files) {
      fileUploadPromises.push(fuleUpload (file))
    }

    const photoURL =await Promise.all(fileUploadPromises)
    
    dispatch(setPhotostoActiveNote(photoURL))
  }
  
}

export const startDeletingNote = () =>{
  return async ( dispatch, getState) =>{
    const { uid } = getState().auth;
    const {activeNote} = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)

    await deleteDoc(docRef); 

    dispatch (deleteNoteById(activeNote.id))

  } 
}