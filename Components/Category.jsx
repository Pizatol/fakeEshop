import React, { useState } from "react";
import css from "../styles/Category.module.scss";
import Image from "next/image";

import cancel_icon from "../public/assets/icons/cancel.svg";
import Button_cancel from "./buttons/Button_cancel";

export default function Category({ category, price }) {
    const [mode, SetMode] = useState(false);
    const [multimedia, setMultimedia] = useState(false);
    const [loisirs, setLoisirs] = useState(false);
    const [animaux, setAnimaux] = useState(false);

    const [value, setValue] = useState("");

    category(value);

    const toggleMode = () => {
        SetMode(true);
        setMultimedia(false);
        setLoisirs(false);
        setAnimaux(false);
    };
    const toggleMultimedia = () => {
        SetMode(false);
        setMultimedia(true);
        setLoisirs(false);
        setAnimaux(false);
    };
    const toggleLoisirs = () => {
        SetMode(false);
        setMultimedia(false);
        setLoisirs(true);
        setAnimaux(false);
    };
    const toggleAnimaux = () => {
        SetMode(false);
        setMultimedia(false);
        setLoisirs(false);
        setAnimaux(true);
    };

    const toggleCancel = () => {
        setValue("");
    };

    return (
        <div
            className={
                price === 0
                    ? `${css.hidden} ${css.category_container}`
                    : css.category_container
            }
        >
            <h2 className={css.main_title} >Catégorie :</h2>
            <div
                className={!value ? `${css.choix_container}` : `${css.hidden}`}
            >
                {/* <div className={css.category_container} > */}
                <div className={css.left_part}>
                    <button
                        className={css.option_button}
                        type="button"
                        onClick={toggleMode}
                    >
                        {" "}
                        Mode
                    </button>

                    <button
                        className={css.option_button}
                        type="button"
                        onClick={toggleMultimedia}
                    >
                        {" "}
                        Multimedia
                    </button>
                    <button
                        className={css.option_button}
                        type="button"
                        onClick={toggleLoisirs}
                    >
                        {" "}
                        Loisirs
                    </button>
                    <button
                        className={css.option_button}
                        type="button"
                        onClick={toggleAnimaux}
                    >
                        {" "}
                        Animaux
                    </button>
                </div>

                <div className={css.right_part}>
                    {/* MODE */}
                    {mode ? (
                        <div>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("Vêtements")}
                                type="button"
                            >
                                Vêtements
                            </button>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("Chaussures")}
                                type="button"
                            >
                                Chaussures
                            </button>
                            <button
                                className={css.option_button}
                                onClick={() =>
                                    setValue("Accessoires et bagagerie")
                                }
                                type="button"
                            >
                                Accessoires & Bagagerie
                            </button>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("Montres et bijoux")}
                                type="button"
                            >
                                Montres & bijoux
                            </button>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("Equipement bébé")}
                                type="button"
                            >
                                Equipement bébé
                            </button>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("Vêtements bébé")}
                                type="button"
                            >
                                Vêtements bébé
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                    {/* MULTUIMEDIA */}
                    {multimedia ? (
                        <div>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("Informatique")}
                                type="button"
                            >
                                Informatique
                            </button>
                            <button
                                className={css.option_button}
                                onClick={() =>
                                    setValue("Consoles & jeux vidéos")
                                }
                                type="button"
                            >
                                Consoles & jeux vidéos
                            </button>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("Image et son")}
                                type="button"
                            >
                                Image et son
                            </button>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("Téléphonie")}
                                type="button"
                            >
                                Téléphonie
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                    {/* LOISIRS */}
                    {loisirs ? (
                        <div>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("DVD - Films")}
                                type="button"
                            >
                                DVD - Films
                            </button>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("CD Musique")}
                                type="button"
                            >
                                CD - Musique
                            </button>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("Livres")}
                                type="button"
                            >
                                Livres
                            </button>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("Vélos")}
                                type="button"
                            >
                                Vélos
                            </button>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("Sports & Hobbies")}
                                type="button"
                            >
                                Sports et hobbies
                            </button>
                            <button
                                className={css.option_button}
                                onClick={() =>
                                    setValue("Instruments de musique")
                                }
                                type="button"
                            >
                                Instruments de musique
                            </button>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("Collection")}
                                type="button"
                            >
                                Collection
                            </button>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("Jeux & jouets")}
                                type="button"
                            >
                                Jeux & jouets
                            </button>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("Vins & gastronomie")}
                                type="button"
                            >
                                Vins & gastronomie
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                    {animaux ? (
                        <div>
                            <button
                                className={css.option_button}
                                onClick={() => setValue("Animaux")}
                                type="button"
                            >
                                Animaux
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            {value ? (
                <div className={css.result_container}>
                    <div className={css.result_field}>
                        <p> {value} </p>
                    </div>

                    <div>
                        {value !== "" ? (
                            <Button_cancel
                                props={"Annuler"}
                                foo={toggleCancel}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

{
    /* <button
                            className={css.reset_button}
                            type="button"
                            onClick={() => setValue("")}
                        >
                            {" "}
                            <Image
                                src={cancel_icon}
                                alt="cancel button"
                                height={40}
                                width={40}
                            />
                        </button> */
}
