/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from "react";
import css from '../styles/Title.module.scss'
import Button_cancel from "./buttons/Button_cancel";
import Button_validate from "./buttons/Button_validate";
import { LoginContext } from "../context/LoginContext";

export default function Title() {
    const { title,  setTitle, } = useContext(LoginContext);
	 const [tempoTitle, setTempoTitle] = useState("");



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


    return (
        <div>
		  <form onSubmit={(e) => handleTitle(e)}>

		 
            <div className={css.subtitle}>
                <p>Quel est le titre de l'annonce ?</p>
            </div>

            <div className={css.flex}>
                <label>
                    {title !== "" ? (
                        <input
                            type="text"
                            className={
                                title === ""
                                    ? `${css.name_input_container}`
                                    : `${css.name_input_container} ${css.disabled}`
                            }
                            value={tempoTitle}
                            onChange={(e) => setTempoTitle(e.target.value)}
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
                            onChange={(e) => setTempoTitle(e.target.value)}
                        />
                    )}

                    {/* $$$$ */}

                    {!title ? (
                        <Button_validate
                            props={"Valider"}
                            data={tempoTitle}
                            // foo={handleTitle}
                        />
                    ) : (
                        ""
                    )}

                    {title ? (
                        <Button_cancel props={"Annuler"} foo={toggleCancel} />
                    ) : (
                        ``
                    )}
                </label>
            </div>
				</form>
        </div>
    );
}
