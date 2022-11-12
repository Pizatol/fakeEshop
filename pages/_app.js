import '../styles/globals.css'
import Navbar from '../Components/Navbar'
import {LoginContext} from '../context/LoginContext'
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


  return (

    <Navbar>

    <Component {...pageProps} />
    </Navbar>
  ) 

}

export default MyApp
