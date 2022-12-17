import React, { useState, useEffect } from "react";
import Image from "next/image";

import css from "../styles/Slug.module.scss";
import { db } from "../Firebase/FirebaseConfig";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    startAfter,
    deleteField,
    query,
    onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { getIdToken } from "firebase/auth";

import Button_validadte from "../Components/buttons/Button_validate";
import Map_display from "../Components/Map_display";

import face from "../public/assets/icons/face.svg";
import Button_buy from "../Components/buttons/Button_buy";

export default function Slug() {
    const router = useRouter();
    const slugId = router.query.slug;

    const dataCollectionRef = collection(db, "products");
    const [productList, setProductList] = useState([]);
    const [product, setProduct] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [adressBuyer, setAddressBuyer] = useState('')

    useEffect(() => {
        const getProducts = async () => {
            const docRef = doc(db, "products", slugId);
            const docSnap = await getDoc(docRef);
            //  const data =   db.collection("products").doc(slugId);

            setProduct(docSnap.data());
            setLoading(true);
            
        };
        
        getProducts();
        if(product){

            setAddressBuyer(product.credentials.globalAdress)
        }
    }, []);

   

   

    return (
        <div className={css.global_container}>
            {loading ? (
                <div className={css.product_container}>
                    <div className={css.upper_part}>
                        <div className={css.image_wrapper_container}>
                            {product.images.map((img, index) => (
                                <div
                                    className={css.image_container}
                                    key={index}
                                >
                                    <Image
                                        src={img.url}
                                        className={css.image}
                                        fill
                                        alt="image"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className={css.buy_buyer_container}>
                            <div className={css.pseudo_container}>
                                <Image
                                    alt="client icon"
                                    src={face}
                                    width={40}
                                    height={40}
                                />
                                <p className={css.pseudo}>Pseudonyme</p>
                            </div>

                            <Button_buy props="Acheter" />
                        </div>
                    </div>

                    <div className={css.middle_part}>
                            <h2> {product.title} </h2>   
                            <h3>  {product.price} € </h3>
                            <p> {product.date} </p>

                    </div>        

                    <div className={css.bottom_part}>

                            <Map_display adressBuyer = {adressBuyer} />

                    </div>



                </div>




            ) : (
                <div>Loading</div>
            )}

            <div></div>
        </div>
    );
}
