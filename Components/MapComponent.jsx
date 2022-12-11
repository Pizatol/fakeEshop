import React, { useEffect, useState, useRef, useContext } from "react";
import css from "../styles/Map.module.scss";
import dynamic from "next/dynamic";
import { LoginContext } from "../context/LoginContext";

import Button_validate from "./buttons/Button_validate";
import Button_cancel from "./buttons/Button_cancel";


export default function MapComponent({ uploadImage }) {
    const { finalCredentials, setFinalCredentials } = useContext(LoginContext);

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [adress, setAdress] = useState("");
    const [postal, setPostal] = useState("");
    const [city, setCity] = useState("");
    const [addressGlobal, setAddressGlobal] = useState("");

    const [newCredentials, setNewCredentials] = useState({});

    const positionDef = [46.6048, 1.44419];

   


    const handleAdress =  (e) => {
        e.preventDefault();
        
        // setNewCredentials({
        //     adress: adress,
        //     postal: postal,
        //     city: city,
        //     firstName: firstName,
        //     lastName: lastName,
        //     globalAdress: adress + ", " + postal + " " + city + ", France",
        // });

        setFinalCredentials(
            {
                adress: adress,
                postal: postal,
                city: city,
                firstName: firstName,
                lastName: lastName,
                globalAdress: adress + ", " + postal + " " + city + ", France",
            }
        )
       
    };

console.log(finalCredentials);
    // const MapDynamicDiplay = dynamic(
    //     () => import("../Components/Map_display"),
    //     {
    //         loading: () => <p>A map is loading</p>,
    //         ssr: false,
    //     }
    // );

    
 
  
    

    // const createCoords = async () => {
    //     const apiKey = Geocode.setApiKey(
    //         process.env.NEXT_PUBLIC_API_KEY_GOOGLE_MAP
    //     );

    //     Geocode.fromAddress(newCredentials.globalAdress).then(
    //         (response) => {
    //             const res = response.results[0].geometry.location;

    //             setLat(res.lat);
    //             setLng(res.lng);
    //         },

    //         (error) => {
    //             console.error(error);
    //         }
    //     );
    // };
    // setFinalCredentials(newCredentials)

    const reset_fields = () => {
        setLat(0);
        setLng(0);
        setAdress("");
        setPostal("");
        setCity("");
        setAddressGlobal("");
        setFirstName("");
        setLastName("");
    };

    return (
        <div
            // className={
            //     uploadImage.length <= 3
            //         ? `${css.global_container} ${css.hidden_map}`
            //         : `${css.global_container}`
            // }
            className={css.global_container}
        >
            <div className={css.inputs_container}>
                <form onSubmit={(e) => handleAdress(e)} className={css.form_container}>
                    <div className={css.name_container}>
                        <label>
                            {newCredentials.firstName !== undefined ? (
                                <input
                                    required
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                    // value={credentials.firstName}
                                    value={finalCredentials.firstName}
                                    className={css.input_field}
                                    type="text"
                                    placeholder="Nom"
                                />
                            ) : (
                                <input
                                    required
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                    // value={credentials.firstName}
                                    value={firstName}
                                    className={css.input_field}
                                    type="text"
                                    placeholder="Nom"
                                />
                            )}
                        </label>
                        <label>
                            {newCredentials.lastName !== undefined ? (
                                <input
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                    required
                                    // value={credentials.lastName}
                                    value={finalCredentials.lastName}
                                    className={css.input_field}
                                    type="text"
                                    placeholder="Prénom"
                                />
                            ) : (
                                <input
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                    required
                                    // value={credentials.lastName}
                                    value={lastName}
                                    className={css.input_field}
                                    type="text"
                                    placeholder="Prénom"
                                />
                            )}
                        </label>
                    </div>
                    <div className={css.adress_container}>
                        <label required>
                            {newCredentials.adress !== undefined ? (
                                <input
                                    required
                                    className={css.input_field}
                                    onChange={(e) => {
                                        // setCredentials({adress : e.target.value}) ;
                                        setAdress(e.target.value);
                                    }}
                                    type="text"
                                    placeholder="Addresse"
                                    value={finalCredentials.adress}
                                    // name="adress"
                                />
                            ) : (
                                <input
                                    required
                                    className={css.input_field}
                                    onChange={(e) => {
                                        // setCredentials({adress : e.target.value}) ;
                                        setAdress(e.target.value);
                                    }}
                                    type="text"
                                    placeholder="Addresse"
                                    value={adress}
                                    // name="adress"
                                />
                            )}
                        </label>
                        <label required>
                            {newCredentials.postal !== undefined ? (
                                <input
                                    required
                                    className={css.input_field}
                                    onChange={(e) => {
                                        // setCredentials({postal : e.target.value}) ;
                                        setPostal(e.target.value);
                                    }}
                                    type="number"
                                    placeholder="Code postal"
                                    value={finalCredentials.postal}
                                    // name="postal"
                                />
                            ) : (
                                <input
                                    required
                                    className={css.input_field}
                                    onChange={(e) => {
                                        // setCredentials({postal : e.target.value}) ;
                                        setPostal(e.target.value);
                                    }}
                                    type="number"
                                    placeholder="Code postal"
                                    value={postal}
                                    // name="postal"
                                />
                            )}
                        </label>
                        <label required>
                            {newCredentials.city !== undefined ? (
                                <input
                                    required
                                    className={css.input_field}
                                    onChange={(e) => {
                                        // setCredentials({city : e.target.value}) ;
                                        setCity(e.target.value);
                                    }}
                                    type="text"
                                    placeholder="Ville"
                                    value={finalCredentials.city}
                                    // name="city"
                                />
                            ) : (
                                <input
                                    required
                                    className={css.input_field}
                                    onChange={(e) => {
                                        // setCredentials({city : e.target.value}) ;
                                        setCity(e.target.value);
                                    }}
                                    type="text"
                                    placeholder="Ville"
                                    value={city}
                                    // name="city"
                                />
                            )}
                        </label>
                        {/* <label required>
                            <input
                                required
                                className={css.input_field}
                                onChange={(e) => setCountry(e.target.value)}
                                type="text"
                                placeholder="Pays"
                                value={country}
                            />
                        </label> */}
                    </div>

                    {lat === 0 ? (
                        <div>
                            <Button_validate
                                props={"Valider"}
                                // foo={(e) => handleAdress(e)}
                            />
                        </div>
                    ) : (
                        <Button_cancel foo={reset_fields} props={"Annuler"} />
                    )}
                </form>
            </div>

            {/* <div>
            {newCredentials.adress !== undefined ? (
                <MapDynamicDiplay
                   newCredentials={newCredentials}
                    
                    addressGlobal= {newCredentials.globalAdress}
                />
            ) : ''}
              
            </div> */}
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
