import React, { useEffect, useState, useRef, useContext } from "react";
import css from "../styles/Map_display.module.scss";
import { LoginContext } from "../context/LoginContext";
import Geocode from "react-geocode";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
    Map,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export default function Map_display() {
    const { credentials, setCredentials } = useContext(LoginContext);

    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const positionDef = [46.6048, 1.44419];
    const position = [lat, lng];
    // console.log(credentials.adress);

    useEffect(() => {
        if (credentials.adress !== "") {
            createCoords();
        }
    }, [credentials.adress]);

    const createCoords = async () => {
        const apiKey = Geocode.setApiKey(
            process.env.NEXT_PUBLIC_API_KEY_GOOGLE_MAP
        );

        Geocode.fromAddress(credentials.globalAdress).then(
            (response) => {
                const res = response.results[0].geometry.location;

                setLat(res.lat);
                setLng(res.lng);
            },

            (error) => {
                console.error(error);
            }
        );
    };

    const FlyMap = () => {
        const map = useMap();

        if (lat !== 0) {
           
            const fly = map.setView(position, 13, {
                duration: 3,
            });

            return (
                <Marker
                    position={position}
                    draggable={false}
                    animate={true}
                ></Marker>
            );
        } else {
            return;
        }
    };

    return (
        <div
            className={
                lat === 0
                    ? `${css.map_container} ${css.hidden_map}`
                    : `${css.map_container}`
            }
        >
            <MapContainer
                className={css.map}
                // center={positionDef}
                center={lat === 0 ?   position : positionDef}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FlyMap />
            </MapContainer>
        </div>
    );
}
