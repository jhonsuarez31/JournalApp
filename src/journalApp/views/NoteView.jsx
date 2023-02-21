import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from "../../hooks/useForm";
import { setActiveNote, updateNote } from "../../store/journal/journalSlice";
import { starSavingNote, startDeletingNote, startUploadingFiles } from "../../store/journal/thunks";
import { ImageGallery } from "../components";

export const NoteView = () => {

  const dispatch = useDispatch () 

  const { activeNote, messageSave, isSaving } = useSelector( state => state.journal)

  console.log(activeNote.imageUrls)
  const {body, title, date ,onInputChange, formState} = useForm(activeNote)

  useEffect(() => {
    dispatch ( setActiveNote (formState))
  }, [formState])
  
  const onSaveNote = () =>{  
    dispatch( starSavingNote())
  }

  const onFileInputChangue = ({target}) => {
    if( target.files === 0) return 

    dispatch( startUploadingFiles(target.files))
  }

  useEffect(() => {
    if( messageSave.length > 0){
      Swal.fire('Nota actualizada' , messageSave, 'success')
    }
  }, [messageSave])
  

  const newStringDate = useMemo(() => {
    const newDate = new Date(date)
    return newDate.toUTCString()
  }, [date])


  const fileInputRef = useRef()

  const onDelete = () =>{
    dispatch( startDeletingNote())
  }
  return (
    <Grid
    className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent={"space-between"}
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {newStringDate  }
        </Typography>
      </Grid>
      <Grid item>
        <input type='file'
        multiple 
        onChange={ onFileInputChangue}
        style={{display:'none'}}
        ref = {fileInputRef}
        />
      <IconButton>
        <UploadOutlined 
        color="primary"
        disabled={isSaving}
        onClick={()=> fileInputRef.current.click()}


        />
      </IconButton>
        <Button disabled={isSaving} onClick={onSaveNote} color="primary" sx={{ padding: 2 } }>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} /> Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type={"text"}
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          name = 'title'
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedio hoy?"
          sx={{ border: "none", mb: 1 }}
          minRows={5}
          name = 'body'
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      
        <Grid container justifyContent={'end'}>
          <Button onClick={ onDelete}
            sx={{mt:2}}
            color="error">
              <DeleteOutline/> Borrar
          </Button>
        </Grid>
      <ImageGallery   images = {activeNote.imageUrls}/>
    </Grid>
  );
};
