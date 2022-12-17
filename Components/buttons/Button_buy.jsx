import React from "react";
import css from "../../styles/Button_buy.module.scss";

export default function Button_buy({
    props,

    foo,
}) {
    return (
        <div>
            <button className={css.global_container}>{props}</button>
        </div>
    );
}
