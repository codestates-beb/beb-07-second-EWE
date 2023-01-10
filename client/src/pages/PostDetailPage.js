// modules
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import {Wrapper} from "@googlemaps/react-wrapper";

// components
import DetailGoogleMap from "../components/Map/DetailGoogleMap";
import Dropdown from "../components/Dropdown";

// apis
import { getPostOne, increaseLike } from "../apis/post";

// css
import "../assets/css/postdetail.css";
import "swiper/css";
import "swiper/css/navigation";

function convertDate(date){
    const parsingDate = new Date(date).toLocaleString();
    return parsingDate;
}

const PostDetailPage = () => {
    const navigator = useNavigate(-1);

    const {postId} = useParams()
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [store, setStore] = useState("");

    const [isLike, setIsLike] = useState(false);
    const [isDropdownView, setIsDropdownView] = useState(false)

    const clickLikeHandler = async()=>{
        setIsLike(true);
        const result = await increaseLike(postId);
        console.log(result);
    }

    const toggleLike = ()=>{
        setIsLike(!isLike);
        if(isLike === false) setPost({...post, likes: post.likes+1});
        else setPost({...post, likes: post.likes-1});
    }

    const toggleIsDropdownView = ()=>{
        setIsDropdownView(!isDropdownView);
    }

    const liftStore = (store)=>{
        setStore(store);
    }

    useEffect(()=>{
        (async()=>{
            const result = await getPostOne(postId);

            setPost(result);
            setUser(result.user);
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
                    <div className="detail_navbar">
                        <div className="btn back" onClick={()=>{navigator(-1)}}>
                            <i className="fas fa-chevron-left"/>
                            <span>Back</span>
                        </div>
                        <div className="btn ellipsis">
                            <i className="fas fa-ellipsis" onClick={toggleIsDropdownView}/>
                            <Dropdown isDropdownview={isDropdownView}>
                                <div className="dropdown_content">수정</div>
                                <div className="dropdown_content">삭제</div>
                            </Dropdown>
                        </div>
                    </div>
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
                            <span>{user? user.nickname:""}</span>
                            <span>|</span>
                            <i className="fas fa-eye" />
                            <span>{post.views}</span>
                        </p>
                        <p className="detail_date">{convertDate(post.createdAt)}</p>
                    </div>
                    <div className="detail_content_wrapper">
                        <p className="detail_content">{post.content}</p>
                        <div className="content_tail">
                            <div className="content_left">
                                <div 
                                    className="content_like"
                                    onClick={clickLikeHandler}
                                >
                                    { isLike?
                                        <i className="fas fa-thumbs-up"/>
                                    :
                                        <i className="fa-regular fa-thumbs-up"/>
                                    }
                                    <span className="like_num">{post.likes}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detail_section">
                    <div className="detail_location_wrapper">
                        <i className="fas fa-location-pin"/>
                        <span className="detail_location_name">{post.store_name}</span>
                    </div>
                    <div className="detail_map_wrapper">
                        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={["places"]}>
                            <DetailGoogleMap liftStore={liftStore}/>
                        </Wrapper>
                    </div>
                </div>
            </div>
            </>
            :<></>}
        </div>
    );
}
export default PostDetailPage;