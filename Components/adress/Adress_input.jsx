import React, { useEffect, useState, useRef, useContext } from "react";
import css from "../../styles/Adress_input.module.scss";
import { LoginContext } from "../../context/LoginContext";

import Button_validate from "../buttons/Button_validate";
import Button_cancel from "../buttons/Button_cancel";

export default function Adress_input() {
    const { credentials, setCredentials } = useContext(LoginContext);

    const [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        adress: "",
        postal: "",
        city: "",
        
    });

    const handleCredentials = (e) => {
        e.preventDefault();

        const globalAdress =
            credentials.adress +
            ", " +
            credentials.postal +
            " " +
            credentials.city +
            ", France";
        setInputs((prev) => ({ ...prev, globalAdress: globalAdress }));
    };

    setCredentials(inputs);

    const reset_fields = () => {
        setInputs({
            firstname: "",
            lastname: "",
            adress: "",
            postal: "",
            city: "",
        });
    };

    return (
        <div>
            <div className={css.global_container}>
                <div className={css.inputs_container}>
                    <form
                        onSubmit={(e) => handleCredentials(e)}
                        className={css.form_container}
                    >
                        <div className={css.name_container}>
                            <label>
                                <input
                                    required
                                    className={css.input_field}
                                    type="text"
                                    placeholder="Nom"
                                    value={inputs.firstname}
                                    onChange={(e) =>
                                        setInputs((prev) => ({
                                            ...prev,
                                            firstname: e.target.value,
                                        }))
                                    }
                                />
                            </label>
                            <label>
                                <input
                                    required
                                    className={css.input_field}
                                    type="text"
                                    placeholder="Prénom"
                                    value={inputs.lastname}
                                    onChange={(e) =>
                                        setInputs((prev) => ({
                                            ...prev,
                                            lastname: e.target.value,
                                        }))
                                    }
                                />
                            </label>
                        </div>
                        <div className={css.adress_container}>
                            <label required>
                                <input
                                    required
                                    className={css.input_field}
                                    type="text"
                                    placeholder="Addresse"
                                    value={inputs.adress}
                                    onChange={(e) =>
                                        setInputs((prev) => ({
                                            ...prev,
                                            adress: e.target.value,
                                        }))
                                    }
                                />
                            </label>
                            <label required>
                                <input
                                    required
                                    className={css.input_field}
                                    type="number"
                                    placeholder="Code postal"
                                    value={inputs.postal}
                                    onChange={(e) =>
                                        setInputs((prev) => ({
                                            ...prev,
                                            postal: e.target.value,
                                        }))
                                    }
                                />
                            </label>
                            <label required>
                                <input
                                    required
                                    className={css.input_field}
                                    type="text"
                                    placeholder="Ville"
                                    value={inputs.city}
                                    onChange={(e) =>
                                        setInputs((prev) => ({
                                            ...prev,
                                            city: e.target.value,
                                        }))
                                    }
                                />
                            </label>
                        </div>

                        <div>
                            {credentials.globalAdress ? (
                                <Button_cancel
                                    foo={reset_fields}
                                    props={"Annuler"}
                                />
                            ) : (
                                <Button_validate props={"Valider"} />
                            )}
                        </div>

                        <div></div>
                    </form>
                </div>
            </div>
        </div>
    );
}
