import { useState, useEffect, useRef } from "react"

const DetailGoogleMap = ({liftStore})=>{
    const [map, setMap] = useState("");
    const ref = useRef();

    useEffect(()=>{
        const newMap = new window.google.maps.Map(ref.current, {
            center : { lat: 37.569227, lng: 126.9777256},
            zoom : 16,
        });     
        
        setMap(newMap);
    },[])

    useEffect(()=>{
        const service = new window.google.maps.places.PlacesService(map);
        
        const request = {
            placeId: "ChIJtUc1yjnlDDURf2QjCfD2tDQ",
            fields: ['name', 'geometry']
        }

        service.getDetails(request, (result, status)=>{
            if(status === window.google.maps.places.PlacesServiceStatus.OK){
                map.setCenter(result.geometry.location);
                new window.google.maps.Marker({
                    position: result.geometry.location,
                    map
                })
            }
        })
    }, [map])

    return (
        <div ref={ref} id="map" style={{width:"100%", height: "400px"}}></div>
    )
}

export default DetailGoogleMap