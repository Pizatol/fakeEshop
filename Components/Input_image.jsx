import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import css from "../styles/Input_image.module.scss";

import { db } from "../Firebase/FirebaseConfig";
import { storage } from "../Firebase/FirebaseConfig";
import { v4 } from "uuid";
import { LoginContext } from "../context/LoginContext";

import Button_validate from "./buttons/Button_validate";
import Button_input from "./buttons/Button_input";
import Button_download from "./buttons/Button_download";

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

import cancel_icon from "../public/assets/icons/cancel.svg";
import validate_icon from "../public/assets/icons/validate.svg";
import download_icon from "../public/assets/icons/download_icon.svg";

export default function Input_image({
    stateImage,
    setStateImage,
    uploadImage,
    setUploadImage,
    category,
}) {
    const { validationImg, setValidationImg } = useContext(LoginContext);

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
        <div
            className={
                category !== "" ? `${css.global_container}` : `${css.hidden}`
            }
        >
            <div className={css.right_part}>
                <h2>Images : </h2>
                <p>Sélectionner des images (3 minimum) : </p>
                <div className={css.buttons_container}>
                    <div className={css.left_part_buttons}>
                        <Button_input
                            props={"Sélectionner"}
                            file={stateImage}
                            input={(e) => setStateImage(e.target.files[0])}
                        />
                    </div>

                    <Button_download
                        props={"Télécharger"}
                        onImageUpload={onImageUpload}
                        filed={stateImage}
                    />
                </div>

                <div className={css.selected_image_span}>
                    {stateImage.length !== 0 ? (
                        <div className={css.name_file_container}>
                            <p>{stateImage.name}</p>
                            <button
                                type="button"
                                className={css.button_reset}
                                onClick={() => setStateImage([])}
                            >
                                <Image
                                    src={cancel_icon}
                                    alt="cancel icon"
                                    height={30}
                                    width={30}
                                />
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                <div className={css.image_container_preview}>
                    {uploadImage
                        ? uploadImage.map((img, index) => (
                              <div
                                  className={css.image_preview_container}
                                  key={index}
                              >
                                  <Image
                                      className={css.image}
                                      src={img.url}
                                      layout="responsive"
                                      width={300}
                                      height={200}
                                      alt={img}
                                  />
                                  <button
                                      className={css.button_reset}
                                      type="button"
                                      onClick={() => {
                                          deleteImage(img);
                                      }}
                                  >
                                      <Image
                                          src={cancel_icon}
                                          alt="cancel icon"
                                          height={30}
                                          width={30}
                                      />
                                  </button>
                              </div>
                          ))
                        : null}
                </div>
                {/* <div>
                    {uploadImage.length >= 1 ? (
                        <Button_validate
                            props={"Valider"}
                            validation_image={uploadImage}
                        />
                    ) : (
                        ""
                    )}
                </div> */}
            </div>
        </div>
    );
}
