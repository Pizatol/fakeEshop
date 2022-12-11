/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext } from "react";
import css from "../styles/New_annonce.module.scss";
import Image from "next/image";
import dynamic from "next/dynamic";
import { LoginContext } from "../context/LoginContext";

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
import Description from "../Components/Description";
import Adress_input from "../Components/adress/Adress_input";

export default function New_annonce() {
    const dataCollectionRef = collection(db, "products");
    const {
        title,
        setTitle,
        category,
        setCategory,
        validationImg,
        setValidationImg,
        description,
        setDescription,
        credentials, setCredentials,
        images,
    } = useContext(LoginContext);

    const [stateImage, setStateImage] = useState([]);
    const [uploadImage, setUploadImage] = useState([]);
    const [tempoListImg, setTempoListImg] = useState([]);
    const [tempoTitle, setTempoTitle] = useState("");
   
   

    const MapDynamicDiplay = dynamic(
        () => import("../Components/Map_display"),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false,
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            title: title,
            category: category,
            description: description,
            credentials: newCredentials,
            images: images,
        };

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

    // const MapWithNoSSR = dynamic(() => import("../Components/MapComponent"), {
    //     loading: () => <p>A map is loading</p>,
    //     ssr: false,
    // });

    // CONSOLE LOG ***************

    return (
        <div className={css.global_container}>
            {/* TITRE */}
            <div className={title ? "" : ""}>
                <div className={css.title}>
                    <h1>Déposer une annonce</h1>
                  
                </div>

                <div className={css.title_announcement_container}>
                    <h2 className={css.main_title}>Titre de l'annonce</h2>
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
                                        // title={tempoTitle}
                                        foo={handleTitle}
                                    />
                                ) : (
                                    ""
                                )}

                                {title ? (
                                    <Button_cancel
                                        props={"Annuler"}
                                        foo={toggleCancel}
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


            <Adress_input/>


            {/* <Input_image
                stateImage={stateImage}
                setStateImage={setStateImage}
                uploadImage={uploadImage}
                setUploadImage={setUploadImage}
                category={category}
            />
            {uploadImage.length > 1 ? (
                <Description
                    description={description}
                    setDescription={setDescription}
                />
            ) : (
                ""
            )} */}
            {
                credentials.adress !== "" ? (
                    
                    <MapDynamicDiplay
               
            />
                ) : ''
            }
           

            {/* <div>
                {finalCredentials.adress !== undefined ? (
                    <MapDynamicDiplay finalCredentials={finalCredentials} />
                ) : (
                    ""
                )}
            </div> */}

            {/* {description ? (
                <MapWithNoSSR
                    uploadImage={uploadImage}
                    addressGlobal={addressGlobal}
                    setAddressGlobal={setAddressGlobal}
                />
            ) : (
                ""
            )} */}

            {/* {Object.keys(credentials).length !== 0 ? (
                <Button_validate props="Valider" foo={handleSubmit} />
            ) : (
                ""
            )} */}
        </div>
    );
}
