import React, { useState, useContext } from "react";

import css from "../styles/Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { LoginContext } from "../context/LoginContext";
import FirebaseAuthService from "../Firebase/FirebaseAuthService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import searchIcon from "../public/assets/icons/searchIcon.svg";
import eshopBrand from "../public/assets/eshopBrand.svg";
import cart from "../public/assets/icons/cart.svg";
import logout_icon from "../public/assets/icons/logout_icon.svg";
import login_icon from "../public/assets/icons/login_icon.svg";

export default function Navbar() {

    const router = useRouter()

    
    
    const { formOn, setFormOn, user, setUser, userName, setUserName } =
    useContext(LoginContext);
    FirebaseAuthService.subscribeToAuthChanges(setUser);

    const toggleForm = () => {
        setFormOn(!formOn);
    };

    const logOut = () => {
        FirebaseAuthService.logoutUser();
        toast.info("logged out", {
            autoClose: 2000,
            theme: "colored",
            closeOnClick: true,
            pauseOnHover: false,
        });
    };

    const mustConnect = () => {
        toast.error("Please connect before !", {
            autoClose: 1000,
            theme: "colored",
            closeOnClick: true,
            pauseOnHover: false,
        });
    }

    return (
        <div className={css.global_container}>
            <div className={css.left_part_container}>
            <div>

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
            { 
                user ? (
                    <div className={css.new_annonce} >
                <Link href='/New_annonce'>

                <h2>Déposer une annonce</h2>
                </Link>
            </div>
                ) : ("")
            }
            
            </div>

{/* MIDDLE PART */}
         
    {router.pathname === ("/ProductsPage" || "/slug") ? (

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
    ) : (
        <div className={css.title_container} >

        <h2>Welcome to the</h2>
                <h1>Fake Shop </h1>
        </div>
    )}

          


            <div className={css.right_part_container}>

            




                <div className={css.username_container}>
                    {user ? (
                        <p>
                            Welcome <span>{userName}</span>{" "}
                        </p>
                    ) : (
                        ""
                    )}
                </div>

                <div className={css.login_container}>
                    {user ? (
                        <button className={css.log_button} onClick={logOut}>
                            <Image
                                src={logout_icon}
                                alt="log out "
                                width={30}
                                height={30}
                            />
                        </button>
                    ) : (
                        <button className={css.log_button} onClick={toggleForm}>
                            <Image
                                src={login_icon}
                                alt="log in "
                                width={30}
                                height={30}
                            />
                        </button>
                    )}
                </div>

                <div className={css.basket_container}>

                    {user ? (

                        <Link href="/BasketPage">
                        <Image
                            src={cart}
                            alt="basket icon"
                            width={40}
                            height={40}
                        />
                    </Link>
                    ): (
                        <a onClick={mustConnect}>

                        <Image
                            src={cart}
                            alt="basket icon"
                            width={40}
                            height={40}
                        />
                        </a>
                    )}

                   
                </div>
            </div>
        </div>
    );
}
