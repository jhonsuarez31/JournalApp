import { createSlice } from "@reduxjs/toolkit";
import { loadNotes } from "../../helpers/loadNotes";


export const journalSlice = createSlice({ 

  name: 'journal',
   initialState: {
     isSaving: false,
     messageSave:'',
     notas:[],
     activeNote:null
   },
   reducers: {

      savinNewNote :( state , ) =>{
        state.isSaving = true;
      },
      addNewEmptyNote: (state, action ) => {
        state.notas.push( action.payload )
        state.isSaving= false
      },

      setActiveNote: ( state, action) =>{
        state.activeNote = action.payload
      },

      setNotes: ( state, action) =>{
        state.notas = action.payload;
      },

      setSaving:( state) =>{

      },

      updateNote:(state, action) =>{

      },

      deleteNoteById:( state, action) =>{

      }
   }
});


export const { addNewEmptyNote,setActiveNote,setNotes,setSaving, updateNote, deleteNoteById, savinNewNote } = journalSlice.actions;