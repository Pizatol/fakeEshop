import React, { useEffect, useState } from "react";
import css from "../styles/Map.module.scss";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import Geocode from "react-geocode";

export default function Map() {

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);

    const [address, setAddress] = useState(null)


    const positionDef = [48.84889654453206, 2.3266729316971877];
    const position = [lat, lng];

      // GEOLOC
      const getLocation = () => {

        Geocode.setApiKey(process.env.NEXT_PUBLIC_API_KEY_GOOGLE_MAP);
        const regard = "10 rue du regard, 75006 Paris, France";

        // FROM ADRESS
        Geocode.fromAddress(regard).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                setLat(lat);
                setLng(lng);
            },
            (error) => {
                console.error(error);
            }
        );


    };
    return (
        <div>

<button onClick={getLocation}>Get Location</button>
                <h1>Coordinates</h1>
                <p>{status}</p>
        <div
            className={
                lat === null
                    ? `${css.global_container} ${css.hidden_map}`
                    : `${css.global_container}`
            }
        >
          <div>
               
                
            </div>
            <MapContainer
                className={css.map}
                center={lat === null ? positionDef : position}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
                
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    position={lat === null ? positionDef : position}
                    draggable={false}
                    animate={true}
                >
                    {/* <Popup>Hey ! you found me</Popup> */}
                </Marker>
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