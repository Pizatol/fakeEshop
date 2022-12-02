

import React, { useEffect, useState, useRef } from "react";
import css from "../styles/Map.module.scss";


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


export default function Map_display( {positionDef, lat, lng, addressGlobal }) {


	const FlyMap =  () => {
		const map = useMap();

		if (lat !== 0) {
			 const position =  [lat, lng];
			 const fly = map.flyTo(position, 13, {
				  duration: 3,
			 });
			 return (
				<Marker
			  position={position}
			  draggable={false}
			  animate={true}
		 >
			{/* <Popup>
				{addressGlobal}
		        </Popup> */}
		 </Marker>
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
		 center={positionDef}
		 // center={lati !== null ?   position : positionDef}
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
  )
}
