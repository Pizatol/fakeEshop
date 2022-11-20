import React, { useState } from "react";
import css from "../styles/Category.module.scss";

export default function Category( {category} ) {
    const [vacance, SetVacances] = useState(true);
    const [emploi, SetEmploi] = useState(false);
    const [vehicule, SetVehicule] = useState(false);
    const [immobilier, SetImmobilier] = useState(false);
    const [mode, SetMode] = useState(false);

	 const [value , setValue] = useState('')

	 
	 category(value)

	

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
        <div className={css.category_container}>
            <div className={css.left_part}>
                <button type="button" onClick={toggleVacances}>
                    {" "}
                    Vacances
                </button>
                <button type="button" onClick={toggleEmploi}>
                    {" "}
                    Emploi
                </button>
                <button type="button" onClick={toggleVehicule}>
                    {" "}
                    Véhicule
                </button>
                <button type="button" onClick={toggleImmo}>
                    {" "}
                    Immobilier
                </button>
                <button type="button" onClick={toggleMode}>
                    {" "}
                    Mode 
                </button>
            </div>

            <div className={css.right_part}>
                {vacance ? (
                    <div>
                        <button onClick={() => setValue("Location&Gites")} type="button">Locations & Gîtes</button>
                        <button onClick={() => setValue("ChambreHote")} type="button">Chambres d'hôtes</button>
                        <button onClick={() => setValue("Camping")} type="button">Camping</button>
                        <button onClick={() => setValue("hebergementsInsolite")} type="button">Hébergements insolites</button>
                    </div>
                ) : (
                    ""
                )}

                {emploi ? (
                    <div>
                        <button onClick={() => setValue("Offre Emploi")} type="button"> Offres d'emloi</button>
                    </div>
                ) : (
                    ""
                )}

                {vehicule ? (
                    <div>
                        <button onClick={() => setValue("voitures")} type="button">Voitures</button>
                        <button onClick={() => setValue("motos")} type="button">Motos</button>
                        <button onClick={() => setValue("vehicules utilitaires")} type="button">Utilitaires</button>
                    </div>
                ) : (
                    ""
                )}

                {immobilier ? (
                    <div>
                        <button onClick={() => setValue("vente immobiliere")} type="button">Ventes Immobilières</button>
                        <button onClick={() => setValue("location")} type="button">Locations</button>
                        <button onClick={() => setValue("colocation")} type="button">Colocations</button>
                        <button onClick={() => setValue("bureaux et commerces")} type="button">Bureaux & Commerces</button>
                    </div>
                ) : (
                    ""
                )}

                {mode ? (
                    <div>
                        <button onClick={() => setValue("vetements")} type="button">Vêtements</button>
                        <button onClick={() => setValue("chaussures")} type="button">Chaussures</button>
                        <button onClick={() => setValue("accessoires et bagagerie")} type="button">Accessoires & Bagagerie</button>
                        <button onClick={() => setValue("montres et bijoux")} type="button">Montres & bijoux</button>
                        <button onClick={() => setValue("equipement bebe")} type="button">Equipement bébé</button>
                        <button onClick={() => setValue("vetements bebe")} type="button">Vêtements bébé</button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

{
    /* <label>
                            Catégorie
                            <select>
                                <option value="Mode">Mode</option>
                                <option value="Maison">Maison</option>
                                <option value="Bricolage"> Bricolage </option>
                                <option value="Multimedia">Multimédia</option>

                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>

                            <option value="Informatique">Informatique</option>
                                <option value="Image&Son">Image & Son</option>
                                <option value="Telephonie">Téléphonie</option>
                        </label> */
}
