// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
  } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFJ5N6DZKJDqKfuEtuA-MMHqZStNjD2pQ",
  authDomain: "e-com-app-aca1a.firebaseapp.com",
  projectId: "e-com-app-aca1a",
  storageBucket: "e-com-app-aca1a.appspot.com",
  messagingSenderId: "717407156259",
  appId: "1:717407156259:web:225f91cd1319f66aa6d996"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const AuthContext=createContext(null);

const AuthProvider=({children})=>{
    const auth=useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth=()=>useContext(AuthContext);

function useProvideAuth(){
    const [user, setUser]= useState();

    const signUp=(email,password,displayName)=>createUserWithEmailAndPassword(auth, email,password).then(({user})=>{
        updateProfile(user,{displayName});
        setUser(user);
        return user;
    });

    const signIn = (email,password)=>signInWithEmailAndPassword(auth, email,password).then(({user})=>{
        setUser(user);
        return user;
    });

    const signOutUser=()=>signOut(auth).then(()=>setUser(null));

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            user? setUser(user):setUser(null);
        });
        return ()=>unsubscribe();
    })

    return {
        signIn, signUp, signOut:signOutUser, user,
    };
}

export default AuthProvider;