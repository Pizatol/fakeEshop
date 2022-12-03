import React, { useContext, useState } from "react";
import css from "../styles/Description.module.scss";
import Button_validate from "./buttons/Button_validate";
import Button_cancel from "./buttons/Button_cancel";
import { LoginContext } from "../context/LoginContext";

export default function Description() {
    const { description, setDescription } = useContext(LoginContext);

    const [textDescription, setTextDescription] = useState("");
    const [description_validation, setDescription_validation] = useState(false);

    const handle_description_validation = (e) => {
        e.preventDefault();
        setDescription(e);
        setDescription_validation(true);
    };

    const handle_cancel_description = (e) => {
        e.preventDefault();
        setDescription("");
        setDescription_validation(false);
    };
    console.log("DESCRIPTION", textDescription);
    return (
        <div className={css.global_container}>
            <div>
                <h2 className={css.title_description}>Description : </h2>
            </div>
            <form className={css.form_container}>
                {description_validation? (
                    <textarea
						  className={`${css.textArea} ${css.denied}`}
                        disabled
                        value={textDescription}
                        type="text"
                        onChange={(e) => setTextDescription(e.target.value)}
                    />
                ) : (
                    <textarea
						   className={css.textArea}
                        value={textDescription}
                        type="text" 
                        onChange={(e) => setTextDescription(e.target.value)}
                        
                    />
                )}
                {!description_validation ? (
                    <Button_validate
                        props={"Valider"}
                        foo={handle_description_validation}
                    />
                ) : (
                    <Button_cancel
                        props={"Annuler"}
                        foo={handle_cancel_description}
                    />
                )}
            </form>
        </div>
    );
}
