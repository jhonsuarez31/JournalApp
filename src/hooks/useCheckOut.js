import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { starLoadingNotes } from "../store/journal/thunks";

export const useCheckOut = () => {
  const { status } = useSelector((state) => state.auth);

  const dispath = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispath(logout());
      dispath(login(user)); 
      dispath(starLoadingNotes())
    });
  }, []);

  return {
    status,
  };
};
