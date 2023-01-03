// modules
import {useState, useEffect} from "react";

const {kakao} = window;

const usePlaces = ()=>{
    const [places, setPlaces] = useState(null);

    useEffect(()=>{
        const kakaoPlaces = new kakao.maps.services.Places();

        setPlaces(kakaoPlaces);
    }, [])

    return places
}

export default usePlaces;

