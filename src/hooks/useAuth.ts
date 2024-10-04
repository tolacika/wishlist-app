import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, provider } from "../firebase/config";
import { clearUser, setUser } from "../store/userSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

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
    await signOut(auth);
  };

  return { handleLogin, handleLogout };
};