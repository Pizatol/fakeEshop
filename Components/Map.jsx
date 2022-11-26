import React, { useEffect, useState } from "react";
import css from "../styles/Map.module.scss";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";


export default function Map() {

    const position = [48.84889654453206, 2.3266729316971877];

    return (
        <div className={css.global_container}>
            <MapContainer
                    center={position}
                    zoom={14}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} draggable={false} animate={true}>
                        {/* <Popup>Hey ! you found me</Popup> */}
                    </Marker>
                </MapContainer>

         
        </div>
    );
}
