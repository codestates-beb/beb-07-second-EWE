//components
import PlaceList from "./PlaceList";

//hooks
import { useState, useEffect, useRef } from "react";

//apis

//css
import "../../assets/css/map.css"

const GoogleMap =  ({locationName, submitLocation, resetLocation})=>{
    const ref = useRef();
    const [keyword, setKeyword] = useState("");
    const [places, setPlaces] = useState();
    
    const [map, setMap] = useState(null);
    const [service, setService] = useState(null);

    const mapViewStyle = {
        width:"600px",
        height:"400px",
        position:"relative",
        overflow:"hidden"
    }

    const mapHiddenStyle = {
        display:"none",
    }

    function requestSearch(){
        if (keyword.length === 0) return;

        let request = {
            query: keyword,
            fields: ['place_id','name', 'geometry', 'formatted_address'],
        };
    
        service.findPlaceFromQuery(request, (results, status)=>{
            if(status === window.google.maps.places.PlacesServiceStatus.OK){
                map.setCenter(results[0].geometry.location);
                new window.google.maps.Marker({
                    position: results[0].geometry.location,
                    map
                })
                setPlaces(results);

                console.log(results);
            }
        })
    }

    const searchEnterHandler = (e)=>{
        if(e.key === "Enter")
            requestSearch();
    }

    const searchBtnHandler = ()=>{
        requestSearch()
    }

    const resetPlaces = ()=>{
        setPlaces(null);
    }

    const resetBtnHandler = ()=>{
        resetLocation();
    }

    useEffect(()=>{
        const newMap = new window.google.maps.Map(ref.current, {
            center : { lat: 37.569227, lng: 126.9777256},
            zoom : 16,
        });    
        
        setMap(newMap);
    },[])

    useEffect(()=>{
        const newService = new window.google.maps.places.PlacesService(map);
        setService(newService);
    }, [map])

    return (
        <div className="map-wrap">
            <div className="map-search">
                <div className="map-searchbar-wrap">
                    {locationName ? 
                    <>
                    <input className="map-searchbar" 
                        value={locationName} 
                        size="15"
                        disabled={true}
                    /> 
                    <button onClick={resetBtnHandler}>Research</button> 
                    </>
                    :
                    <>
                    <input className="map-searchbar" 
                        value={keyword} 
                        onChange={(e)=>{setKeyword(e.target.value)}} 
                        onKeyUp={searchEnterHandler}
                        size="15"
                        placeholder="Please insert keyword for the place."
                    /> 
                    <button onClick={searchBtnHandler}>Search</button> 
                    </>
                    }
                </div>
                {places?
                    <PlaceList 
                        places={places} 
                        map={map} 
                        submitLocation={submitLocation}
                        resetPlaces={resetPlaces}
                    />
                    : <></>
                }
            </div> 
            <div ref={ref} id="map" style={locationName? mapHiddenStyle : mapViewStyle}>
            </div>
        </div>
    )
}


export default GoogleMap;