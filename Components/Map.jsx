import React, { useEffect, useState, useRef } from "react";
import css from "../styles/Map.module.scss";

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet"

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import Geocode from "react-geocode";

export default function Map() {
    const [lati, setLat] = useState(0);
    const [lngi, setLng] = useState(0);
    const [status, setStatus] = useState(null);

    const [adress, setAdress] = useState("");
    const [postal, setPostal] = useState(0);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("France");

    const [addressGlobal, setAddressGlobal] = useState("");

    const positionDef = [48.84889654453206, 2.3266729316971877];
    const position = [lati, lngi];

    const handleAdress = (e) => {
        e.preventDefault();
        setAddressGlobal(adress + " " + postal + " " + city + " " + country);
        // console.log(addressGlobal);
        getLocation();
    };



   

    // GEOLOC
    const getLocation = () => {
        Geocode.setApiKey(process.env.NEXT_PUBLIC_API_KEY_GOOGLE_MAP);
        const regard = "10 rue du regard, 75006 Paris, France";

        // FROM ADRESS
        Geocode.fromAddress(addressGlobal).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;

                setLat(lat);
                setLng(lng);

                Geocode.fromLatLng(lat, lng).then(
                    (response) => {
                        const address = response.results[0].formatted_address;
                        console.log("ADRESSE", address);
                    },
                    (error) => {
                        console.log(error.message);
                    }
                );

               


                setAdress("");
                setPostal(0);
                setCity("");
                setCountry("France");
                console.log(lat, lng);
            },
            (error) => {
                console.error(error);
            }
        );
    };

 

    return (
        <div className={css.global_container}>
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
            <div
                className={
                    lati === null
                        ? `${css.map_container} ${css.hidden_map}`
                        : `${css.map_container}`
                }
            >
                <MapContainer
                  
                    className={css.map}
                    center={position}
                    // center={lati !== null ?   position : positionDef}
                    zoom={14}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                        position={position}
                        draggable={false}
                        animate={true}
                    ></Marker>
                   
                </MapContainer>
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
