// modules
import React, {useState, useEffect} from "react";

// components
import PlaceListItem from "./PlaceListItem";

const PlaceList = ({places, map})=>{

    return (
        <ul className="place-list">
            {
                places.map((place, idx)=>{
                    return <PlaceListItem key={idx} place={place} map={map}/>
                })
            }
        </ul>
    )
}

export default PlaceList;