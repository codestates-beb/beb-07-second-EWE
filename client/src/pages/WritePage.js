//modules
import {useState, useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import {Wrapper, Status} from "@googlemaps/react-wrapper";

//components
// import KakaoMap from "../components/Map/KakaoMap";
import GoogleMap from "../components/Map/GoogleMap";

//css
import "../assets/css/write.css";
import "swiper/css"
import "swiper/css/navigation";
import "swiper/css/pagination";

const WritePage = () => {
    const [title, setTitle] = useState("");
    const [locationName, setLocationName] = useState("");
    const [locationId, setLocationId] = useState(null);
    const [content, setContent] = useState("");
    const [images, setImages] = useState(false);
    
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
                    {/* <KakaoMap locationName={locationName} submitLocation={submitLocation} resetLocation={resetLocation}/> */}
                    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={["places"]}>
                        <GoogleMap locationName={locationName} submitLocation={submitLocation} resetLocation={resetLocation}/>
                    </Wrapper>
                </div>
                <div className="post_image_wrapper">
                    { images? 
                    <div className="image_preview_wrapper">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{clickable:false}}
                            slidesPerView={1}
                        >
                            <SwiperSlide>
                                <div className="swiper_image_wrapper">
                                    <img src="https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202012/11/elle/20201211193633070ycoe.jpg"></img>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="swiper_image_wrapper">
                                    <img src="https://d12zq4w4guyljn.cloudfront.net/20210208191223_photo0_6YN01m7Ob30F.jpg"></img>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="swiper_image_wrapper">
                                    <img src="https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202012/11/elle/20201211193633070ycoe.jpg"></img>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    :
                    <div className="image_input_wrapper">
                        <label className="image_input_helper" htmlFor="image_input">
                            <i className="fas fa-image image_icon"/>
                            클릭해서 이미지를 업로드하세요.
                            <input
                                id="image_input"
                                className="image_input"
                                type="file"
                                onChange={(e)=>{setImages(e.target.value)}}
                            />
                        </label>
                    </div>
                    }
                </div>
                <div className="post_content_wrapper">
                    <textarea 
                        className="content_textarea" 
                        placeholder="내용을 입력해주세요."
                        rows="15"
                        spellCheck={false}
                        onChange={(e)=>{setContent(e.target.value)}}
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