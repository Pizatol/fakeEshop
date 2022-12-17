import React, { useState } from "react";
import css from "../styles/Product_mini_card.module.scss";
import Image from "next/image";
import Link from "next/link";

import StarRating from "./StarRating";

import hd600 from "../public/assets/Pictures/inventoryImg/hd600.jpg";

export default function Product_mini_card({
    id,
    title,
    category,
    description,
    credentials,
    images,
}) {
  
	

    return (
        <div className={css.global_container}>
            {/* <Link href="slug"> */}
            <Link href={id}>
                <div className={css.image_container}>
                    <Image
                        src={images[0].url}
                        height={300}
                        width={300}
                        alt="headphone"
								layout="responsive"
                    />
                </div>

                <div className={css.name_product}>
                    <h1>{title}</h1>
                </div>

                <div className={css.price}>
                    <p>
                        {" "}
                        450 <span>€</span>{" "}
                    </p>
                </div>

                <div className={css.rating}>{/* <StarRating/> */}</div>
            </Link>
        </div>
    );
}
