import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, provider } from "../firebase/config";
import { clearUser, setUser } from "../store/userSlice";
//import useSecrets from "./useSecrets";

export const useAuth = () => {
  const dispatch = useDispatch();
  //const {resetSecrets} = useSecrets();

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            loading: false,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });
  }, [dispatch]);

  const handleLogin = async () => {
    await signInWithPopup(auth, provider);
  };

  const handleLogout = async () => {
    //resetSecrets();
    await signOut(auth);
  };

  return { handleLogin, handleLogout };
};