import React, { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';

import "../styles/globals.css";
import Navbar from "../Components/Navbar";
import LoginForm from "../Components/LoginForm";
import { LoginContext } from "../context/LoginContext";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";

function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState(null);
    const [formOn, setFormOn] = useState(false);
    const [userName, setUserName] = useState(null);

    return (
        <LoginContext.Provider
            value={{ user, setUser, formOn, setFormOn, userName, setUserName }}
        >
            <Navbar />
            <LoginForm />
            <Component {...pageProps} />
            <ToastContainer               
            />
        </LoginContext.Provider>
    );
}

export default MyApp;
