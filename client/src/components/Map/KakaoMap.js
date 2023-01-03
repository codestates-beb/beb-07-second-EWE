// modules
import React, {useEffect, useState} from "react";

// components
import PlaceList from "./PlaceList";
import PlaceListPagination from "./PlaceListPagination";

// css
import "../../assets/css/map.css";

// hooks
import usePlaces from "../../hooks/usePlaces";
import useMap from "../../hooks/useMap";

const {kakao} = window;

const KakaoMap = ()=>{
    const map = useMap();
    const search = usePlaces();

    const [keyword, setKeyword] = useState("");
    const [places, setPlaces] = useState(null)
    const [pagination, setPagination] = useState(null);

    const searchRequest = ()=>{
        if (keyword.length === 0) return;
        search.keywordSearch(keyword, (result, status, pagination)=>{
            console.log(result);
            console.log(status);
            console.log(pagination);
            setPlaces(result);
            setPagination(pagination);
        },{})
    }
    
    const searchBtnHandler = ()=>{
        searchRequest();
    }

    const searchEnterHandler = (e)=>{
        if(e.key === "Enter") searchRequest();
    }

    return (
        <div className="map-wrap">
            <div className="map-search">
                <div className="map-searchbar-wrap">
                    <input className="map-searchbar" 
                        value={keyword} 
                        onChange={(e)=>{setKeyword(e.target.value)}} 
                        onKeyUp={searchEnterHandler}
                        size="15" 
                        placeholder="장소명을 입력해주세요."/> 
                    <button onClick={searchBtnHandler}>검색하기</button> 
                </div>
                {places?
                    <>
                    <PlaceList places={places} map={map}/>
                    </> 
                    : <></>
                }
            </div>
            <div id="map" style={{
                width:"600px",
                height:"400px",
                position:"relative",
                overflow:"hidden"
                }}>
            </div>
        </div>
    )
}

export default KakaoMap;