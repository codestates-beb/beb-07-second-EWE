// modules
import {useState} from "react";

const {kakao} = window

const PlaceListItem = ({place, map})=>{
    const [placeId, setPlaceId] = useState(place.id);
    const position = new kakao.maps.LatLng(place.y, place.x);
    const marker = new kakao.maps.Marker({position});
    

    const itemEnterHandler= ()=>{
        marker.setMap(map);
        map.panTo(position);
    }

    const itemClickHandler = ()=>{
        console.log(place);
    }

    return (
        <div className="place-list-item" onMouseEnter={itemEnterHandler} onClick={itemClickHandler}>
            <span className="name">{place.place_name}</span>
            <span className="address">{place.address_name}</span>
        </div>
    )
}

export default PlaceListItem;