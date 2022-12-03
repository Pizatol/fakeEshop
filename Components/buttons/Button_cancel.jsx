import React from "react";
import css from "../../styles/Button_cancel.module.scss";

export default function Button_cancel({ props, toggleCancel, foo }) {
    return (
        <>
            <button
					onClick={foo}
                type="submit"
                className={
						toggleCancel !== ""
                        ? `${css.global_container}`
                        : ` ${css.disabled}`
                }
            >
                {props}
            </button>
        </>
    );
}