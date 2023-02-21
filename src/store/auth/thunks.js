import { async } from "@firebase/util"
import { registerUserWithEmailPassword, signInWithGoogle, loginWithEmailPassword, logoutFirebase } from "../../firebase/providers"
import { clearNoteLogOut } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) =>{
   
    return async ( dispatch ) =>{
        dispatch (checkingCredentials())
    }
}

export const startGoogleSingIn = (email, password) =>{
   
    return async ( dispatch ) =>{
    
        dispatch (checkingCredentials())
        const result = await signInWithGoogle();
        if( !result.ok ) return dispatch(logout(result.errorMessage))
        
        dispatch(login(result))
    }
}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName}) => {

    return async ( dispatch ) => {
        
        dispatch( checkingCredentials());
    
        const {ok , uid , photoURL , errorMessage} = await registerUserWithEmailPassword ({email , password, displayName})
        
        if( ! ok ) return dispatch ( logout ({errorMessage}))

        dispatch(login(uid, displayName , email, photoURL ))
    }
}


export const startLoginWithEmailPassword = ({email, password}) =>{
    return  async ( dispatch) =>{
        dispatch( checkingCredentials())
        
        const response = await loginWithEmailPassword({email, password})

        if(!response.ok) return dispatch ( logout ((response)))

        dispatch(login(response))
        
    }
}

export const startLogout = () =>{
    return async (dispatch) =>{
        
        await logoutFirebase();
        dispatch(clearNoteLogOut())
        dispatch( logout())
    }
} 