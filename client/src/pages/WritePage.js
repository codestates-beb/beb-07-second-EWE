//modules
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import {Wrapper, Status} from "@googlemaps/react-wrapper";
import { useSelector } from "react-redux";
import {Link } from 'react-router-dom'
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

const Slide = ({image})=>{
    return(
        <SwiperSlide>
            <div className="swiper_image_wrapper">
                <img src={image}/>
            </div>
        </SwiperSlide>
    )
}

const WritePage = ({user}) => {
    const navigator = useNavigate();

    const isLogin = useSelector((state)=>state.auth.isLogin);
    const accessToken = useSelector((state)=>state.auth.accessToken);

    // New Review State Variable
    const [title, setTitle] = useState("");
    const [locationName, setLocationName] = useState("");
    const [locationId, setLocationId] = useState(null);
    const [content, setContent] = useState("");
    const [images, setImages] = useState(null);

    const [previewImage, setPreviewImage] = useState("");
    
    const submitLocation = (locationName, locationId)=>{
        setLocationName(locationName)
        setLocationId(locationId);
    }

    const resetLocation = ()=>{
        setLocationName("");
        setLocationId("");
    }

    const imageChangeHandler = (e)=>{
        const file = e.target.files[0];
        setImages(file);

        const reader = new FileReader();

        if (/\.(jpe?g|png|gif)$/i.test(file.name)){

            reader.addEventListener("load",
            ()=>{
                setPreviewImage(reader.result);
            },false)
        }

        reader.readAsDataURL(file);
    }

    const submitBtnHandler = async ()=>{
        const review = {
            user_id: user.id,
            title,
            store_name: locationName,
            location: locationId,
            content: content,
            image: images,
        }
        
        const createReviewResult = await createReview(review, accessToken);

        if (createReviewResult.status=== 200) {
            navigator("/");
        } else {
            console.log(createReviewResult);
        }
    }

    useEffect(()=>{
        if(!isLogin){
            navigator("/");
        }
    },[])

    return(
        <div className="container">
                    <Link to='/write' className='write'>
                <img className='post_button' src={require('../assets/image/post_2.png')}>
                </img>
            </Link>
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
                    <label className="image_input_helper">
                        { previewImage? 
                            <div className="image_preview_wrapper">
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    navigation
                                    pagination={{clickable:false}}
                                    slidesPerView={1}
                                >
                                    <Slide image={previewImage}/>
                                </Swiper>
                            </div>
                        :
                            <div className="image_input_wrapper">
                                <i className="fas fa-image image_icon"/>
                                <span>Please click to upload images.</span>
                            </div>
                        }
                        <input
                            id="image_input"
                            className="image_input"
                            type="file"
                            onChange={imageChangeHandler}
                        />
                    </label>
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
                <img className='post_button' src={require('../assets/image/bottom.png')} onClick={()=>navigator(-1)}>
                </img>
        </div>
    );
}
export default WritePage;