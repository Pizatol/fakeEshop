import react, { useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import css from "../styles/Home.module.scss";
import { LoginContext } from "../context/LoginContext";
import Link from "next/link";




import front_page from "../public/assets/Pictures/front_page_image/front_page.jpg";
import dynamic from "next/dynamic";

export default function Home() {




    
    return (
        <div className={css.global_container}>
            <Head>
                <title>Fake Eshop</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={css.card_container}>
                {/* <h2>Welcome to the</h2>
                <h1>Fake Shop</h1> */}
                <div>
                    <Image
                        src={front_page}
                        alt="front page picture"
                        width={600}
                        height={500}
                        layout="responsive"
                    />
                </div>
                <Link href="ProductsPage">
                    <button>Produits</button>
                </Link>
            </div>
        </div>
    );
}
