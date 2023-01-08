//modules
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import {Wrapper, Status} from "@googlemaps/react-wrapper";


// apis
import {createReview} from "../apis/post";

//components
// import KakaoMap from "../components/Map/KakaoMap";
import GoogleMap from "../components/Map/GoogleMap";

//css
import "../assets/css/write.css";
import "swiper/css"
import "swiper/css/navigation";
import "swiper/css/pagination";

const WritePage = ({user}) => {
    const navigator = useNavigate();

    if(!user){
        navigator(-1);
    }

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

    const submitBtnHandler = async ()=>{
        const review = {
            user_id: user.id,
            title,
            store_name: locationName,
            location: locationId,
            content: content,
            uri: "https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202012/11/elle/20201211193633070ycoe.jpg"
        }
        console.log(review);

        const createReviewResult = await createReview(review);

        if (createReviewResult.status=== 200) {
            navigator("/");
        } else {
            console.log(createReviewResult);
        }
    }

    return(
        <div className="container">
            <div className="write_wrapper">
                <div className="post_title_wrapper">
                    <input 
                        name="title" 
                        className="title_input" 
                        placeholder="Please insert title."
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
                            Please click to upload images.
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
                        placeholder="Please insert contents."
                        rows="15"
                        spellCheck={false}
                        onChange={(e)=>{setContent(e.target.value)}}
                    />
                </div>
                <div className="btn_group">
                    <button className="btn_cancel">Cancel</button>
                    <button className="btn_submit" onClick={submitBtnHandler}>Submit</button>
                </div>
            </div>
        </div>
    );
}
export default WritePage;