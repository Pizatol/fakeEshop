/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from "react";
import css from "../styles/Title.module.scss";
import Button_cancel from "./buttons/Button_cancel";
import Button_validate from "./buttons/Button_validate";
import { LoginContext } from "../context/LoginContext";

export default function Price() {
    const { price, setPrice, title } = useContext(LoginContext);
    const [tempoPrice, setTempoPrice] = useState(0);

    const handlePrice = (e) => {
        if (tempoPrice) {
            e.preventDefault();
            setPrice(tempoPrice);
        } else {
            e.preventDefault();
        }
    };
    const toggleCancel = () => {
        setPrice(0);
        setTempoPrice(0);
    };


    return (
        <div>
            {title !== "" ? (
                <form onSubmit={(e) => handlePrice(e)}>
                    <div className={css.subtitle}>
                        <p>Quel est le prix du produit ?</p>
                    </div>

                    <div className={css.flex}>
                        <label>
                            {price !== 0 ? (
                                <input
                                    type="number"
                                    className={
                                        price === ""
                                            ? `${css.name_input_container}`
                                            : `${css.name_input_container} ${css.disabled}`
                                    }
                                    value={tempoPrice}
                                    onChange={(e) =>
                                        setTempoPrice(e.target.value)
                                    }
                                    disabled
                                />
                            ) : (
                                <input
                                    type="number"
                                    className={
                                        price === ""
                                            ? `${css.name_input_container}`
                                            : `${css.name_input_container} ${css.disabled}`
                                    }
                                    value={tempoPrice}
                                    onChange={(e) =>
                                        setTempoPrice(e.target.value)
                                    }
                                />
                            )}

                            {/* $$$$ */}

                            {!price ? (
                                <Button_validate
                                    props={"Valider"}
                                    data={tempoPrice}
                                    //  foo={handlePrice}
                                />
                            ) : (
                                ""
                            )}

                            {price ? (
                                <Button_cancel
                                    props={"Annuler"}
                                    foo={toggleCancel}
                                />
                            ) : (
                                ``
                            )}
                        </label>
                    </div>
                </form>
            ) : (
                ""
            )}
        </div>
    );
}
