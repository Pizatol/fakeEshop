import React, { useState } from "react";
import css from "../styles/Category.module.scss";
import Image from "next/image";

import cancel_icon from "../public/assets/icons/cancel.svg";

export default function Category({ category, title }) {
    const [vacance, SetVacances] = useState(true);
    const [emploi, SetEmploi] = useState(false);
    const [vehicule, SetVehicule] = useState(false);
    const [immobilier, SetImmobilier] = useState(false);
    const [mode, SetMode] = useState(false);

    const [value, setValue] = useState("");

    category(value);

    const toggleVacances = () => {
        SetVacances(true);
        SetEmploi(false);
        SetVehicule(false);
        SetImmobilier(false);
        SetMode(false);
    };
    const toggleImmo = () => {
        SetVacances(false);
        SetEmploi(false);
        SetVehicule(false);
        SetImmobilier(true);
        SetMode(false);
    };
    const toggleEmploi = () => {
        SetVacances(false);
        SetEmploi(true);
        SetVehicule(false);
        SetImmobilier(false);
        SetMode(false);
    };
    const toggleVehicule = () => {
        SetVacances(false);
        SetEmploi(false);
        SetVehicule(true);
        SetImmobilier(false);
        SetMode(false);
    };
    const toggleMode = () => {
        SetVacances(false);
        SetEmploi(false);
        SetVehicule(false);
        SetImmobilier(false);
        SetMode(true);
    };

    return (
        <div
            className={
                title === ""
                    ? `${css.disabled} ${css.category_container}`
                    : css.category_container
            }
        >
            {/* <div className={css.category_container} > */}
            <div className={css.left_part}>
                <button className={css.option_button} type="button" onClick={toggleVacances}>
                    {" "}
                    Vacances
                </button>
                <button className={css.option_button} type="button" onClick={toggleEmploi}>
                    {" "}
                    Emploi
                </button>
                <button className={css.option_button} type="button" onClick={toggleVehicule}>
                    {" "}
                    Véhicule
                </button>
                <button className={css.option_button} type="button" onClick={toggleImmo}>
                    {" "}
                    Immobilier
                </button>
                <button className={css.option_button} type="button" onClick={toggleMode}>
                    {" "}
                    Mode
                </button>
            </div>

            <div className={css.right_part}>
                {vacance ? (
                    <div>
                        <button className={css.option_button}
                            onClick={() => setValue("Location & Gîtes")}
                            type="button"
                        >
                            Locations & Gîtes
                        </button>
                        <button className={css.option_button}
                            onClick={() => setValue("Chambre d'hôte")}
                            type="button"
                        >
                            Chambres d'hôtes
                        </button>
                        <button className={css.option_button}
                            onClick={() => setValue("Camping")}
                            type="button"
                        >
                            Camping
                        </button>
                        <button className={css.option_button}
                            onClick={() => setValue("hebergements insolite")}
                            type="button"
                        >
                            Hébergements insolites
                        </button>
                    </div>
                ) : (
                    ""
                )}

                {emploi ? (
                    <div>
                        <button className={css.option_button}
                            onClick={() => setValue("Offre d'emploi")}
                            type="button"
                        >
                            {" "}
                            Offres d'emloi
                        </button>
                    </div>
                ) : (
                    ""
                )}

                {vehicule ? (
                    <div>
                        <button className={css.option_button}
                            onClick={() => setValue("Voitures")}
                            type="button"
                        >
                            Voitures
                        </button>
                        <button className={css.option_button} onClick={() => setValue("Motos")} type="button">
                            Motos
                        </button>
                        <button className={css.option_button}
                            onClick={() => setValue("Véhicules utilitaires")}
                            type="button"
                        >
                            Utilitaires
                        </button>
                    </div>
                ) : (
                    ""
                )}

                {immobilier ? (
                    <div>
                        <button className={css.option_button}
                            onClick={() => setValue("Vente immobiliere")}
                            type="button"
                        >
                            Ventes Immobilières
                        </button>
                        <button className={css.option_button}
                            onClick={() => setValue("Location")}
                            type="button"
                        >
                            Locations
                        </button>
                        <button className={css.option_button}
                            onClick={() => setValue("Colocation")}
                            type="button"
                        >
                            Colocations
                        </button>
                        <button className={css.option_button}
                            onClick={() => setValue("Bureaux et commerces")}
                            type="button"
                        >
                            Bureaux & Commerces
                        </button>
                    </div>
                ) : (
                    ""
                )}

                {mode ? (
                    <div>
                        <button className={css.option_button}
                            onClick={() => setValue("Vêtements")}
                            type="button"
                        >
                            Vêtements
                        </button>
                        <button className={css.option_button}
                            onClick={() => setValue("Chaussures")}
                            type="button"
                        >
                            Chaussures
                        </button>
                        <button className={css.option_button}
                            onClick={() => setValue("Accessoires et bagagerie")}
                            type="button"
                        >
                            Accessoires & Bagagerie
                        </button>
                        <button className={css.option_button}
                            onClick={() => setValue("Montres et bijoux")}
                            type="button"
                        >
                            Montres & bijoux
                        </button>
                        <button className={css.option_button}
                            onClick={() => setValue("Equipement bébé")}
                            type="button"
                        >
                            Equipement bébé
                        </button>
                        <button className={css.option_button}
                            onClick={() => setValue("Vêtements bébé")}
                            type="button"
                        >
                            Vêtements bébé
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </div>

            <h2>{value} </h2>
            {value !== "" ? (
                <button
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
                </button>
            ) : (
                ""
            )}
        </div>
    );
}
