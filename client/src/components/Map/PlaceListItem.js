// modules
import {useState} from "react";

const {kakao} = window

const PlaceListItem = ({place, map, submitLocation, resetPlaces})=>{
    const [placeId, setPlaceId] = useState(place.place_id);

    // const itemEnterHandler= ()=>{
    //     marker.setMap(map);
    //     map.panTo(position);
    // }

    const itemClickHandler = ()=>{
        console.log(place.name, placeId);
        submitLocation(place.name, placeId);
        resetPlaces();
    }

    return (
        <div className="place-list-item" onClick={itemClickHandler}>
            <span className="name">{place.name}</span>
            <span className="address">{place.formatted_address}</span>
        </div>
    )
}

export default PlaceListItem;