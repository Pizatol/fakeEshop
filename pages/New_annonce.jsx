/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext } from "react";
import css from "../styles/New_annonce.module.scss";
import Image from "next/image";
import dynamic from "next/dynamic";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { db } from "../Firebase/FirebaseConfig";
import { storage } from "../Firebase/FirebaseConfig";
import { v4 } from "uuid";
import Geocode from "react-geocode";

import cancel_icon from "../public/assets/icons/cancel.svg";
import cancel_white from "../public/assets/icons/cancel_white.svg";
import Category from "../Components/Category";
import Button_validate from "../Components/buttons/Button_validate";
import Button_cancel from "../Components/buttons/Button_cancel";

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
    const dataCollectionRef = collection(db, "products");

    const [stateImage, setStateImage] = useState([]);
    const [uploadImage, setUploadImage] = useState([]);
    const [tempoListImg, setTempoListImg] = useState([]);

    const [tempoTitle, setTempoTitle] = useState("");
    const [title, setTitle] = useState("");

    const [category, setCategory] = useState("");

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
        if (tempoTitle) {
            e.preventDefault();
            setTitle(tempoTitle);

            
        } else {
            e.preventDefault();
        }
    };
    const toggleCancel = () => {
        setTitle("");
        setTempoTitle("");
    };

    const MapWithNoSSR = dynamic(() => import("../Components/MapComponent"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
    });

    console.log(title);
    return (
        <div className={css.global_container}>
            {/* TITRE */}
            <div className={title ? "" : ""}>
                <div className={css.title}>
                    <h1>Déposer une annonce</h1>
                </div>

                <div className={css.title_announcement_container}>
                    <form onSubmit={(e) => handleTitle(e)}>
                        <div className={css.subtitle}>
                            <p>Quel est le titre de l'annonce ?</p>
                        </div>

                        <div className={css.flex}>
                            <label>
                                {title ? (
                                    <input
                                        type="text"
                                        className={
                                            title === ""
                                                ? `${css.name_input_container}`
                                                : `${css.name_input_container} ${css.disabled}`
                                        }
                                        value={tempoTitle}
                                        onChange={(e) =>
                                            setTempoTitle(e.target.value)
                                        }
                                        disabled
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        className={
                                            title === ""
                                                ? `${css.name_input_container}`
                                                : `${css.name_input_container} ${css.disabled}`
                                        }
                                        value={tempoTitle}
                                        onChange={(e) =>
                                            setTempoTitle(e.target.value)
                                        }
                                    />
                                )}

                                {!title ? (
                                    <Button_validate
                                        props={"Valider"}
                                        title={tempoTitle}
                                    />
                                ) : (
                                    ""
                                )}

                                {title ? (
                                    <Button_cancel
                                        props={"Annuler"}
                                        toggleCancel={toggleCancel}
                                    />
                                ) : (
                                    ``
                                )}
                            </label>
                            <span
                                className={
                                    tempoTitle.length < 1 && title === ""
                                        ? `${css.span_title}`
                                        : `${css.span_title_hidden}`
                                }
                            >
                                Veuillez donner un titre à votre annonce{" "}
                            </span>
                        </div>
                    </form>
                </div>
            </div>

            <div className={css.title_field_container}></div>

            <Category category={setCategory} title={title} />

            <MapWithNoSSR category={category} />

            {/* <Input_image
                stateImage={stateImage}
                setStateImage={setStateImage}
                uploadImage={uploadImage}
                setUploadImage={setUploadImage}
            /> */}
        </div>
    );
}
