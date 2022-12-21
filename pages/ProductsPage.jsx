import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import css from "../styles/Product_page.module.scss";
import Product_mini_card from "../Components/Product_mini_card";

import { db } from "../Firebase/FirebaseConfig";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    startAfter,
    deleteField,
    query,
    onSnapshot,
} from "firebase/firestore";

export default function ProductsPage() {
    const dataCollectionRef = collection(db, "products");
    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            // Obtenir la liste complete de la database
            const data = await getDocs(dataCollectionRef);

            // Obtenir des data simplifiées et utilisables
            setProductList(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        };

        getProducts();
    }, []);

    return (
        <div className={css.global_container}>
            <div className={css.products_container}>
                {productList.map((item, index) => (
                    <div key={index}  >
                     
                        <Product_mini_card
                            id={item.id}
                            title={item.title}
                            category={item.category}
                            description={item.descrption}
                            credentials={item.credentials}
                            images={item.images}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
