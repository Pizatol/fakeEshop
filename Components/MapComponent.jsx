import React, { useEffect, useState, useRef } from "react";
import css from "../styles/Map.module.scss";
import dynamic from "next/dynamic";

import Button_validate from "./buttons/Button_validate";
import Button_cancel from "./buttons/Button_cancel";

import Geocode from "react-geocode";

export default function MapComponent({ category }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [adress, setAdress] = useState("");
    const [postal, setPostal] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [addressGlobal, setAddressGlobal] = useState("");

    const positionDef = [46.6048, 1.44419];

    const mapRef = useRef();

    const MapDynamicDiplay = dynamic(
        () => import("../Components/Map_display"),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false,
        }
    );

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
                },
                (error) => {
                    console.error(error);
                }
            );
        }, 250);
    };

    const reset_fields = () => {
        setLat(0);
        setLng(0);
        setAdress("");
        setPostal("");
        setCity("");
        setCountry("");
        setAddressGlobal("");
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
                    <div className={css.name_container}>
                        <label>
                            <input
                                required
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                className={css.input_field}
                                type="text"
                                placeholder="Nom"
                            />
                        </label>
                        <label>
                            <input
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                value={lastName}
                                className={css.input_field}
                                type="text"
                                placeholder="Prénom"
                            />
                        </label>
                    </div>
                    <div className={css.adress_container}>
                        <label required>
                            <input
                                required
                                className={css.input_field}
                                onChange={(e) => setAdress(e.target.value)}
                                type="text"
                                placeholder="Addresse"
                                value={adress}
                            />
                        </label>
                        <label required>
                            <input
                                required
                                className={css.input_field}
                                onChange={(e) => setPostal(e.target.value)}
                                type="number"
                                placeholder="Code postal"
                                value={postal}
                            />
                        </label>
                        <label required>
                            <input
                                required
                                className={css.input_field}
                                onChange={(e) => setCity(e.target.value)}
                                type="text"
                                placeholder="Ville"
                                value={city}
                            />
                        </label>
                        <label required>
                            <input
                                required
                                className={css.input_field}
                                onChange={(e) => setCountry(e.target.value)}
                                type="text"
                                placeholder="Pays"
                                value={country}
                            />
                        </label>
                    </div>
                    {/* <button type="submit">valider</button> */}
                    {lat === 0 ? (
                        <Button_validate props={"Valider"} />
                    ) : (
                        <Button_cancel
                            toggleCancel={reset_fields}
                            props={"Annuler"}
                        />
                    )}
                </form>
            </div>

            <div>
                <MapDynamicDiplay
                    addressGlobal={addressGlobal}
                    positionDef={positionDef}
                    lat={lat}
                    lng={lng}
                />
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
