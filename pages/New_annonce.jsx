import React, { useState, useEffect, useContext } from "react";
import css from "../styles/New_annonce.module.scss";
import Image from "next/image";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { db } from "../Firebase/FirebaseConfig";
import { storage } from "../Firebase/FirebaseConfig";
import { v4 } from "uuid";

import cancel_icon from "../public/assets/icons/cancel.svg";
import Category from "../Components/Category";


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
import Input_image from "../Components/Input_image";

export default function New_annonce() {
    const [stateImage, setStateImage] = useState([]);
    const [uploadImage, setUploadImage] = useState([]);
    const [tempoListImg, setTempoListImg] = useState([]);

    const [title, setTitle] = useState("");
    const [tempoTitle, setTempoTitle] = useState("");

    const [category, setCategory] = useState("");

    const dataCollectionRef = collection(db, "products");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {};

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
    };

    const handleTitle = (e) => {
        e.preventDefault();
        setTitle(tempoTitle);
        setTempoTitle("");
    };

    // CONSOLE LOG
    //    console.log(tempoTitle);

    return (
        <div>
            <form onSubmit={(e) => handleTitle(e)}>
                <div className={ title === "" ? `${css.name_input_container}` : `${css.name_input_container} ${css.disabled}`}>
                    <label>
                        Titre :
                        <input
                            value={tempoTitle}
                            onChange={(e) => setTempoTitle(e.target.value)}
                            type="text"
                        />
                        <button type="submit"> Valider</button>
                    </label>
                </div>
            </form>

            <div className={css.title_field_container}>
                {title ? (
                    <div>
                        <h1> {title} </h1>
                        <button
                    className={css.reset_button}
                    type="button"
                    onClick={() => setTitle("")}
                >
                    {" "}
                    <Image
                        src={cancel_icon}
                        alt="cancel button"
                        height={40}
                            width={40}
                    />
                </button>
                    </div>
                ) : (
                    <div>
                        <h1></h1>
                    </div>
                )}
            </div>

            <Category category={setCategory} title={title} />

            <Input_image
                stateImage={stateImage}
                setStateImage={setStateImage}
                uploadImage={uploadImage}
                setUploadImage={setUploadImage}
            />
        </div>
    );
}
