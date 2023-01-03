// modules
import React, {useState, useEffect} from "react";

// components
import PlaceListItem from "./PlaceListItem";

const PlaceList = ({places, map, submitLocation, resetPlaces})=>{

    return (
        <ul className="place-list">
            {
                places.map((place, idx)=>{
                    return <PlaceListItem 
                                key={idx} 
                                place={place} 
                                map={map} 
                                submitLocation={submitLocation}
                                resetPlaces={resetPlaces}
                            />
                })
            }
        </ul>
    )
}

export default PlaceList;