import { createSlice } from "@reduxjs/toolkit";
import { loadNotes } from "../../helpers/loadNotes";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSave: "",
    notas: [],
    activeNote: null,
  },
  reducers: {
    savinNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notas.push(action.payload);
      state.isSaving = false;
    },

    setActiveNote: (state, action) => {
      state.activeNote = action.payload;
      state.messageSave = ''
    
    },

    setNotes: (state, action) => {
      state.notas = action.payload;
    },

    setSaving: (state) => {
      state.isSaving = true;
      state.messageSave = ''
    },

    updateNote: (state, action) => {
      state.isSaving = false;

      state.notas = state.notas.map((note) => {
        if (note.id == action.payload.id) {
          return action.payload;
        }

        return note;
      });

      state.messageSave = `${ action.payload.title} , actualizada correctamente`
    },

    setPhotostoActiveNote: (state, action) =>{
      state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload]
      
      state.isSaving = false;

    },

    clearNoteLogOut: (state) =>{
      state.isSaving = false,
      state.messageSave ='',
      state.activeNote = null,
      state.notas =[]
    },

    deleteNoteById: (state, action) => {
      state.active = null,
      state.notas = state.notas.filter( note => note.id !==  action.payload)
    },
  },


});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  savinNewNote,
  setPhotostoActiveNote,
  clearNoteLogOut
} = journalSlice.actions;
