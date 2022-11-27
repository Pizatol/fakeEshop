import React from "react";
import css from "../../styles/Button_validate.module.scss";

export default function Button_validate({ props, title }) {
    return (
        <>
            <button
                type="submit"
                className={
                    title !== ""
                        ? `${css.global_container}`
                        : ` ${css.disabled}`
                }
            >
                {props}
            </button>
        </>
    );
}
