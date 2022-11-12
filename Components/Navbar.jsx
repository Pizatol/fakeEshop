import React from "react";
import css from "../styles/Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";

import searchIcon from "../assets/icons/searchIcon.svg";
import eshopBrand from "../assets/eshopBrand.svg";
import cart from "../assets/icons/cart.svg";
import BasketPage from "../pages/BasketPage";

export default function Navbar() {
    return (
        <div className={css.global_container}>
            <div className={css.logo_container}>
                <Link href="/">
                    <div className={css.logo_box}>
                        <Image
                            src={eshopBrand}
                            alt="logo brand"
                            width={30}
                            height={30}
                        />
                    </div>
                </Link>
            </div>

            <div className={css.searchBar_container}>
                <input className={css.searchBar} type="text" />
                <button className={css.searchBar_button}>
                    <Image
                        src={searchIcon}
                        alt="search button"
                        width={30}
                        height={30}
                    />
                </button>
            </div>

            <div className={css.right_part_container}>
                <div className={css.login_container}>
                    <button> Log In</button>
                </div>

                <div className={css.basket_container}>
                    <Link href="/BasketPage.jsx">
                        <Image src={cart} alt="basket icon" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
