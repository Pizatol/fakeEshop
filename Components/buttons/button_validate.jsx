import React, {useContext} from "react";
import { LoginContext } from "../../context/LoginContext";
import css from "../../styles/Button_validate.module.scss";

export default function Button_validate({
    props,
   title,
    onImageUpload,
    filed,
    adress,
    validation_image,
    foo
}) {

    // const {  user,
    //     setUser,
    //     formOn,
    //     setFormOn,
    //     userName,
    //     setUserName,
    //     mapOk,
    //     setMapOk,         
    //     setTitle,
    //     category,
    //     setCategory,
    //     validationImg,
    //     setValidationImg } = useContext(LoginContext);

    return (
        <>
             <button
                onClick={foo}
                type="submit"
                className={
                    title !== ""
                        ? `${css.global_container}`
                        : ` ${css.disabled}`
                }
            >
                {props}
            </button>
{/*            
            {
                validation_image ? (
                    <button
                onClick={onImageUpload}
                type="submit"
                className={
                    title !== ""
                        ? `${css.global_container}`
                        : ` ${css.disabled}`
                }
            >
                {props}
            </button>
                ) : ""
            } */}
        </>
    );
}
