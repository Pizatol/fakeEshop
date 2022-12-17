import React, { useEffect, useState, useRef, useContext } from "react";
import css from "../styles/Map_display.module.scss";
import { LoginContext } from "../context/LoginContext";
import Geocode from "react-geocode";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export default function Map_display({adressBuyer} ) {
    const { credentials, setCredentials } = useContext(LoginContext);

    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [toggleMap, setToggleMap] = useState(false);

    const positionDef = [46.6048, 1.44419];
    const position = [lat, lng];
    // console.log(credentials.adress);

    useEffect(() => {
        if (credentials.globalAdress) {
            createCoords();
        }
        if(adressBuyer) {
            createCoordsFromBuyer()
        }
    }, [credentials.adress,adressBuyer ]);

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

    const createCoordsFromBuyer = () => {
        const apiKey = Geocode.setApiKey(
            process.env.NEXT_PUBLIC_API_KEY_GOOGLE_MAP
        );

        Geocode.fromAddress(adressBuyer).then(
            (response) => {
                const res = response.results[0].geometry.location;

                setLat(res.lat);
                setLng(res.lng);
            },

            (error) => {
                console.error(error);
            }
        );
    }

    const FlyMap = () => {
        const map = useMap();

        if (lat !== 0) {
            const fly = map.setView(position, 13, {
                duration: 3,
            });
            setToggleMap(true);

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
        <>
            {credentials.globalAdress ? (
                <div className={css.map_container}>
                    <MapContainer
                        // center={positionDef}
                        scrollWheelZoom={true}
                        center={lat === 0 ? position : positionDef}
                        zoom={14}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <FlyMap />
                    </MapContainer>
                </div>
            ) : (
                
                ""


            )}

            {
                adressBuyer ? (
                    <div className={css.map_container}>
                    <MapContainer
                        // center={positionDef}
                        scrollWheelZoom={true}
                        center={lat === 0 ? position : positionDef}
                        zoom={14}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <FlyMap />
                    </MapContainer>
                </div>
                ) : ''
            }
        </>
    );
}
