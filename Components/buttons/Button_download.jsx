import React from "react";
import css from "../../styles/Button_validate.module.scss";

export default function Button_download({ props,  onImageUpload, filed }) {


    return (
        <>
            <button
            onClick={onImageUpload}
                type="submit"
                className={
                    filed.length !== 0 
                        ? `${css.global_container}`
                        : ` ${css.disabled}`
                }
            >
                {props}
            </button>
        </>
    );
}
