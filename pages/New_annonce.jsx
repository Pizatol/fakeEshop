

import React, { useState, useEffect, useContext } from "react";
import css from '../styles/New_annonce.module.scss'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { db } from '../Firebase/FirebaseConfig';
import { storage } from "../Firebase/FirebaseConfig";
import { v4 as uuid } from "uuid";




import {
	uploadBytes,
	ref,
	listAll,
	getDownloadURL,
	refFromURL,
	deleteObject,
} from "firebase/storage";

import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	startAfter,
	deleteField,
} from "firebase/firestore";

export default function New_annonce() {

	const dataCollectionRef = collection(db, "products");

	const handleSubmit = async (e) => {
		e.preventDefault()


		const newProduct = {

		}

		try {


			toast.success(" New product added!", {
            autoClose: 1000,
            theme: "colored",
            closeOnClick: true,
            pauseOnHover: false,
        });
			
		} catch (error) {
			console.log(error.message);
			toast.error(" cannot send new product!", {
            autoClose: 1000,
            theme: "colored",
            closeOnClick: true,
            pauseOnHover: false,
        });
		}

	}


  return (
	 <div>
	 
	 <form>

	 </form>
	 </div>
  )
}
