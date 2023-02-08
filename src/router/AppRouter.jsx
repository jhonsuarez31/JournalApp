import { async } from '@firebase/util';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from "../auth/router/AuthRoutes";
import { useCheckOut } from '../hooks/useCheckOut';
import { JournalRoutes } from "../journalApp/routes/JournalRoutes";
import { CheckingAuth } from '../UI/components/CheckingAuth';


export const AppRouter = () => {

  const {status} = useCheckOut()

  if(status === 'checking'){
    return <CheckingAuth/>
  }
  
  return (
    <>
        <Routes>
        { (status === 'authenticated')
        ? <Route path='/*' element={<JournalRoutes/>} /> 
        : <Route path='/auth/*' element={<AuthRoutes/>} />
        }

        <Route path='/*' element={ <Navigate to={'/auth/login'} />} ></Route>
            {/*Login y registro*/}
           {/* <Route path='/auth/*' element={<AuthRoutes/>} /> }*/}

            {/*JournalApp*/}
            {/*<Route path='/*' element={<JournalRoutes/>} /> */}
            
        </Routes>
    </>
  )
}
