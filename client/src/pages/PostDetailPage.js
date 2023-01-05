// modules
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import {Wrapper} from "@googlemaps/react-wrapper";

// components
import DetailGoogleMap from "../components/Map/DetailGoogleMap";

// apis
import { getPostOnev2 } from "../apis/post";

// css
import "../assets/css/postdetail.css";
import "swiper/css";
import "swiper/css/navigation";

function convertDate(date){
    const parsingDate = new Date(date).toLocaleString();
    return parsingDate;
}

const PostDetailPage = () => {
    const [post, setPost] = useState(null);
    const {postId} = useParams()

    useEffect(()=>{
        (async()=>{
            const result = await getPostOnev2(postId);
            const {images}= result[0];

            setPost(result[0]);

        })();
    }, []);

    return(
        <div>
            {post? 
            <>
            <div className="detail_image_wrapper">
                <Swiper
                    spaceBetween={10}   
                    modules={[Navigation]}
                    slidesPerView={1}
                    navigation
                >
                    {post.images.map((image, idx)=>{
                        return(
                            <SwiperSlide key={idx}>
                                <div className="swiper_image_wrapper">
                                    <img src={image.uri}/>
                                </div>
                            </SwiperSlide>
                        )})
                    }
                </Swiper>
            </div>
            <div className="detail_container">
                <div className="detail_section">
                    <div className="detail_header">
                        <div className="detail_profile_wrapper">
                            <div className="profile_frame">
                                <img src="https://spnimage.edaily.co.kr/images/Photo/files/NP/S/2022/07/PS22072100041.jpg"/>
                            </div>
                        </div>
                        <h1 className="detail_title">{post.title}</h1>
                        <p className="detail_postid"># {post.id}</p>
                        <p className="detail_data">
                            <i className="fas fa-pen"/>
                            <span>{post.user_id}</span>
                            <span>|</span>
                            <i className="fas fa-eye" />
                            <span>{post.views}</span>
                        </p>
                        <p className="detail_date">{convertDate(post.createdAt)}</p>
                    </div>
                    <div className="detail_content_wrapper">
                            <p>{post.content}</p>
                    </div>
                </div>
                <div className="detail_section">
                    <div className="detail_location_wrapper">
                        <i className="fas fa-location-pin"/>
                    </div>
                    <div className="detail_map_wrapper">
                        <img 
                            width="100%"
                            height="400px"
                            src="https://shareditassets.s3.ap-northeast-2.amazonaws.com/production/uploads/post/featured_image/936/%EB%A7%9B%EC%A7%91.JPG"
                        />
                        {/* <Wrapper apiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={["places"]}>
                            <DetailGoogleMap/>
                        </Wrapper> */}
                    </div>
                </div>
            </div>
            </>
            :<></>}
        </div>
    );
}
export default PostDetailPage;