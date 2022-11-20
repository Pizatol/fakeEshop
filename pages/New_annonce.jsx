import React, { useState, useEffect, useContext } from "react";
import css from "../styles/New_annonce.module.scss";
import Image from "next/image";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { db } from "../Firebase/FirebaseConfig";
import { storage } from "../Firebase/FirebaseConfig";
import { v4 } from "uuid";

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
    const [stateImage, setStateImage] = useState([]);
    const [uploadImage, setUploadImage] = useState([]);
    const [tempoListImg, setTempoListImg] = useState([]);

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

    // IMAGE UPLOAD

    const onImageUpload = (e) => {
        // setStateImage(e.target.files[0])

        try {
            if (!stateImage) {
                toast.error(" Error, try again", {
                    autoClose: 1000,
                    theme: "colored",
                    closeOnClick: true,
                    pauseOnHover: false,
                });

                return;
            }
            const name = v4();
            // setTempoListImg((prev) => [...prev, name]);
            const imageRef = ref(storage, `/images/${name}`);

            console.log(stateImage);

            uploadBytes(imageRef, stateImage).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    {
                        stateImage
                            ? setUploadImage((prev) => [...prev, { url, name }])
                            : setUploadImage({ url, name });
                    }
                });
            });
            setStateImage([]);
        } catch (error) {
            alert(error.message);
        }
    };

    // DELETE
    const deleteImage = (e) => {
        const imageSelectRef = ref(storage, `/images/${e.name}`);

        deleteObject(imageSelectRef)
            .then(() => {
                const filterArr = uploadImage.filter(
                    (item) => item.name !== e.name
                );
                setUploadImage(filterArr);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <div>
            <form>
                <div className={css.left_part}>
                    <div className={css.name}>
                        <label>
                            Titre :
                            <input type="text" />
                        </label>
                    </div>
                    <div>
                        <label>
                            Prix :
                            <input type="number" />
                        </label>
                    </div>
                    <div>
                        <label>
                            Prix :
                            <input type="number" />
                        </label>
                    </div>
                    <div>
                        <label>
                            description
                            <textarea></textarea>
                        </label>
                    </div>
                </div>
                <div className={css.right_part}>
                    <div className={css.buttons_container}>
                        <div className={css.left_part_buttons}>
                            <label for="pic" className={css.input_picture}>
                                {stateImage ? (
                                    <span>sélectionner image</span>
                                ) : (
                                    ""
                                )}

                                <input
                                    className={css.input_file_button}
                                    id="pic"
                                    type="file"
                                    onChange={(e) =>
                                        setStateImage(e.target.files[0])
                                    }
                                    // onChange={(e) => onImageUpload(e)}
                                />
                            </label>

                            <button
                                className={css.button_reset}
                                type="button"
                                onClick={() => setStateImage([])}
                            >
                                {" "}
                                X{" "}
                            </button>
                        </div>

                        <button
                            className={css.button_validation}
                            type="button"
                            onClick={onImageUpload}
                        >
                            Télécharger
                        </button>
                    </div>

                    <span className={css.selected_image_span}>
                        {stateImage ? <span> {stateImage.name} </span> : ""}
                    </span>

                    <div className={css.image_container_preview}>
                        {uploadImage
                            ? uploadImage.map((img, index) => (
                                  <div className={css.image} key={index}>
                                      <Image
                                          src={img.url}
                                          layout="responsive"
                                          width={300}
                                          height={200}
                                          alt={img}
                                      />
                                      <button
                                          type="button"
                                          onClick={() => {
                                              deleteImage(img);
                                          }}
                                      >
                                          Supprimer
                                      </button>
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
            </form>
        </div>
    );
}
