/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext } from "react";
import css from "../styles/New_annonce.module.scss";
import Image from "next/image";
import dynamic from "next/dynamic";
import { LoginContext } from "../context/LoginContext";
import { useRouter } from "next/router";

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
import Title from "../Components/Title";
import Price from "../Components/Price";


export default function New_annonce() {
    const dataCollectionRef = collection(db, "products");
    const {
        price,
        setPrice,
        title,
        setTitle,
        category,
        setCategory,
        description,
        setDescription,
        credentials,
        images,
        user,
    } = useContext(LoginContext);

    const [stateImage, setStateImage] = useState([]);
    const [uploadImage, setUploadImage] = useState([]);
    const [tempoListImg, setTempoListImg] = useState([]);
    const [tempoTitle, setTempoTitle] = useState("");

    const router =useRouter()

    const date = new Date();
    const day = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
    const month = `${
        date.getMonth() + 1 < 10 ? "0" : ""
    }${date.getMonth()}`;
    const year = `${date.getFullYear()} `;
    const minutes = date.getMinutes()
    const hour = date.getHours()
    const seconds = date.getSeconds()
    const formattedDate = day + "/" + month + "/" + year + ' ' + hour+":"+minutes+":"+seconds;
    console.log(formattedDate);

    const MapDynamicDiplay = dynamic(
        () => import("../Components/Map_display"),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false,
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        // DATE
        const date = new Date();
        const day = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
        const month = `${
            date.getMonth() + 1 < 10 ? "0" : ""
        }${date.getMonth()}`;
        const year = `${date.getFullYear()} `;
        const minutes = date.getMinutes()
        const hour = date.getHours()
        const seconds = date.getSeconds()
        const formattedDate = day + "/" + month + "/" + year + ' ' + hour+":"+minutes+":"+seconds;

        const newProduct = {
            id: v4(),
            title: title,
            price: price,
            category: category,
            description: description,
            credentials: credentials,
            images: images,
            user: user.email,
            date: formattedDate,
        };

        try {
            await addDoc(dataCollectionRef, newProduct);
            
            router.push("/")
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

    return (
        <div className={css.global_container}>
            {/* TITRE */}
            <div>
                <div className={css.title}>
                    <h1>Déposer une annonce</h1>
                </div>

                <div className={css.title_announcement_container}>
                    <h2 className={css.main_title}>Titre de l'annonce</h2>

                    <Title />
                </div>
            </div>

            <div>
                <Price />
            </div>

            <div className={css.title_field_container}></div>
            {/* CATEGORY */}
            <Category category={setCategory} price={price} />

            {category ? <Adress_input /> : ""}

            {credentials.globalAdress ? (
                <div>
                    <MapDynamicDiplay />

                    <Input_image
                        stateImage={stateImage}
                        setStateImage={setStateImage}
                        uploadImage={uploadImage}
                        setUploadImage={setUploadImage}
                        category={category}
                    />
                </div>
            ) : (
                ""
            )}

            {uploadImage.length > 1 ? (
                <Description
                    description={description}
                    setDescription={setDescription}
                />
            ) : (
                ""
            )}

            {description !== "" ? (
                <Button_validate data={description} props="Validation !" foo={handleSubmit} />
            ) : (
                ""
            )}
        </div>
    );
}
