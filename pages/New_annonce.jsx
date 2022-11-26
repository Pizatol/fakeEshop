import React, { useState, useEffect, useContext } from "react";
import css from "../styles/New_annonce.module.scss";
import Image from "next/image";
import dynamic from "next/dynamic";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { db } from "../Firebase/FirebaseConfig";
import { storage } from "../Firebase/FirebaseConfig";
import { v4 } from "uuid";

import cancel_icon from "../public/assets/icons/cancel.svg";
import Category from "../Components/Category";
import Map from "../Components/Map/Map";

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

    const [title, setTitle] = useState("");
    const [tempoTitle, setTempoTitle] = useState("");

    const [category, setCategory] = useState("");

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);


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
        window.scrollBy(0, 100);
    };

    // CONSOLE LOG
  

    const MapWithNoSSR = dynamic(() => import("../Components/Map"),
     { 
        loading: () => <p>A map is loading</p>,
        ssr: false,
    });


    // GEOLOC

    const getLocation = () => {
        if (!navigator.geolocation) {
          setStatus('Geolocation is not supported by your browser');
        } else {
          setStatus('Locating...');
          navigator.geolocation.getCurrentPosition((position) => {
            setStatus(null);
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
          }, () => {
            setStatus('Unable to retrieve your location');
          });
        }
      }
   

    return (
        <div className={css.global_container}>
            <form onSubmit={(e) => handleTitle(e)}>
                <div
                    className={
                        title === ""
                            ? `${css.name_input_container}`
                            : `${css.name_input_container} ${css.disabled}`
                    }
                >
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

          
            <MapWithNoSSR lat={lat} lng={lng} />

            <div >
  <button onClick={getLocation}>Get Location</button>
  <h1>Coordinates</h1>
  <p>{status}</p>
  {lat && <p>Latitude: {lat}</p>}
  {lng && <p>Longitude: {lng}</p>}
</div>
        </div>
    );
}
