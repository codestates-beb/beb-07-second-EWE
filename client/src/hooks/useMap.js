// modules
import {useState, useEffect} from "react";

const {kakao} = window;

const useMap = ()=>{
    const [map, setMap] = useState(null);

    useEffect(()=>{
        if(!kakao) return;

        const container = document.getElementById("map");
        if(!container) return;
        
        const options = { center: new kakao.maps.LatLng(33.450701, 126.570667) };
        const kakaoMap = new kakao.maps.Map(container, options);
        
        setMap(kakaoMap);
    }, [])

    return map;
}

export default useMap;