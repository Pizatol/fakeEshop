import React, { useEffect, useState, useRef } from "react";
import css from "../styles/Map.module.scss";
import dynamic from "next/dynamic";

import Map_display from "./Map_display";

import Geocode from "react-geocode";

export default function MapComponent({ category }) {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [adress, setAdress] = useState("");
    const [postal, setPostal] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("France");
    const [addressGlobal, setAddressGlobal] = useState("");

    const positionDef = [46.6048, 1.44419];

    const mapRef = useRef();

    const MapDynamicDiplay = dynamic(() => import("../Components/Map_display"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
    });

    const handleAdress = async (e) => {
        e.preventDefault();

        const apiKey = Geocode.setApiKey(
            process.env.NEXT_PUBLIC_API_KEY_GOOGLE_MAP
        );
        const regard = "10 rue du regard, 75006 Paris, France";

        // FROM ADRESS

        setTimeout(() => {
            const fromAdd = Geocode.fromAddress(addressGlobal).then(
                (response) => {
                    const res = response.results[0].geometry.location;

                    setLat(res.lat);
                    setLng(res.lng);

                    console.log(lat, lng);

                    setAdress("");
                    setPostal("");
                    setCity("");
                    setCountry("France");
                },
                (error) => {
                    console.error(error);
                }
            );
        }, 250);
    };

    

    useEffect(() => {
        setAddressGlobal(adress + ", " + postal + " " + city + ", " + country);
    }, [adress, postal, city, country, addressGlobal]);

    return (
        <div
            className={
                category === ""
                    ? `${css.global_container} ${css.hidden_map}`
                    : `${css.global_container}`
            }
        >
            <div className={css.inputs_container}>
                {/* <button onClick={getLocation}>Get Location</button> */}

                <form onSubmit={handleAdress} className={css.form_container}>
                    {/* <div className={css.name_container}>
                        <label >
                            <input type="text" placeholder="Nom" />
                        </label>
                        <label >
                            <input type="text" placeholder="Prénom" />
                        </label>
                    </div> */}
                    <div className={css.adress_container}>
                        <label required>
                            <input
                                onChange={(e) => setAdress(e.target.value)}
                                type="text"
                                placeholder="Addresse"
                                value={adress}
                            />
                        </label>
                        <label required>
                            <input
                                onChange={(e) => setPostal(e.target.value)}
                                type="number"
                                placeholder="Code postal"
                                value={postal}
                            />
                        </label>
                        <label required>
                            <input
                                onChange={(e) => setCity(e.target.value)}
                                type="text"
                                placeholder="Ville"
                                value={city}
                            />
                        </label>
                        <label required>
                            <input
                                onChange={(e) => setCountry(e.target.value)}
                                type="text"
                                placeholder="Pays"
                                value={country}
                            />
                        </label>
                        <button type="submit">valider</button>
                    </div>
                </form>
            </div>

            <div>
                <MapDynamicDiplay addressGlobal={addressGlobal} positionDef={positionDef} lat={lat} lng={lng} />
            </div>
        </div>
    );
}

//    FROM LAT LONG
// Geocode.fromLatLng(lat , lng).then(
//     (response) => {
//         const address = response.results[0].formatted_address;
//         console.log(address);
//     },
//     (error) => {
//         console.log(error.message);
//     }
//     );

// FIND AUTO ADRESS
// if (!navigator.geolocation) {
//     setStatus("Geolocation is not supported by your browser");
// } else {
//     setStatus("Locating...");
//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//             setStatus(null);
//             setLat(position.coords.latitude);
//             setLng(position.coords.longitude);
//         },
//         () => {
//             setStatus("Unable to retrieve your location");
//         }
//     );
// }
