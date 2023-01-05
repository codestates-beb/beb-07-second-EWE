// modules
import {useState, useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

// apis
import { getPostOnev2 } from "../apis/post";

// css
import "../assets/css/postdetail.css";
import "swiper/css";

function convertDate(date){
    const parsingDate = new Date(date).toLocaleString();
    return parsingDate;
}

const PostDetailPage = () => {
    const [post, setPost] = useState("");

    useEffect(()=>{
        (async()=>{
            const result = await getPostOnev2(1);
            setPost(result[0]);
            console.log(result);
        })();
    }, []);

    return(
        <div className="container">
            {post ?
            <div className="detail_section">
                <div className="detail_wrapper">
                    <div className="detail_header">
                        <div className="header_section">
                            <div className="detail_profile_wrapper">
                                <div className="profile_frame">
                                    <img src="https://spnimage.edaily.co.kr/images/Photo/files/NP/S/2022/07/PS22072100041.jpg"/>
                                </div>
                            </div>
                            <div className="detail_title_wrapper">
                                <h1>{post.title}</h1>
                                <p>
                                    <i class="fas fa-pen"/>
                                    <span>{post.creator}</span>
                                    <span>|</span>
                                    <i class="fas fa-eye" />
                                    <span>{post.views}</span>
                                </p>
                            </div>
                        </div>
                        <div className="detail_data_wrapper">
                            <p># {post.id}</p>
                            <p>{convertDate(post.created_at)}</p>
                        </div>
                    </div>
                    <div className="detail_image_wrapper">
                        <Swiper
                            slidesPerView={1}
                        >
                            {post.images.map((image)=>{
                                return(
                                    <SwiperSlide>
                                        <div className="swiper_image_wrapper">
                                            <img src={image.uri}/>
                                        </div>
                                    </SwiperSlide>
                                )})
                            }
                        </Swiper>
                    </div>
                    <div className="detail_content_wrapper">
                        <p>{post.content}</p>
                    </div>
                    <div className="btn-group">
                        <button className="btn">목록</button>
                    </div>
                </div>
            </div>
            :<></>
            }
        </div> 
    );
}
export default PostDetailPage;