//modules
import {useState, useEffect} from "react";

//components
import KakaoMap from "../components/Map/KakaoMap";

//css
import "../assets/css/write.css";

const WritePage = () => {
    const [title, setTitle] = useState("");
    const [locationName, setLocationName] = useState("");
    const [locationId, setLocationId] = useState(null);
    const [content, setContent] = useState("");
    const [images, setImages] = useState(null);
    
    const submitLocation = (locationName, locationId)=>{
        setLocationName(locationName)
        setLocationId(locationId);
    }

    const resetLocation = ()=>{
        setLocationName("");
        setLocationId("");
    }

    return(
        <div className="container">
            <div className="write_wrapper">
                <div className="post_title_wrapper">
                    <input 
                        name="title" 
                        className="title_input" 
                        placeholder="제목을 입력해주세요."
                        onChange={(e)=>{setTitle(e.target.value)}}
                    />
                </div>
                <div className="kakaomap_wrapper">
                    <KakaoMap locationName={locationName} submitLocation={submitLocation} resetLocation={resetLocation}/>
                </div>
                <div className="post_content_wrapper">
                    <textarea 
                        className="content_textarea" 
                        placeholder="내용을 입력해주세요."
                        rows="15"
                        onChange={(e)=>{setContent(e.target.value)}}
                    />
                </div>
                <div className="post_image_wrapper">
                    <input 
                        type="file"
                        onChange={(e)=>{setImages(e.target.value)}}
                    />
                </div>
                <div className="btn_group">
                    <button className="btn_cancel">취소</button>
                    <button className="btn_submit">전송</button>
                </div>
            </div>
        </div>
    );
}
export default WritePage;