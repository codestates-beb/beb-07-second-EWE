// modules
import {useState, useEffect} from "react";
import { getPostOne } from "../apis/post";
import {Swiper, SwiperSlide} from "swiper/react";

// apis


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
            const result = await getPostOne(1);
            setPost(result);
        })();
    }, []);

    console.log(post);

    return(
        <div className="container">
            {post ?
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
                            <p>{`작성자: ${post.creator} | 조회 수: ${post.views}`}</p>
                        </div>
                    </div>
                    <div className="detail_data_wrapper">
                        <p>{post.id}</p>
                        <p>{convertDate(post.created_at)}</p>
                    </div>
                </div>
                <div className="detail_image_wrapper">
                    <Swiper
                        slidesPerView={1}
                    >
                        <SwiperSlide>
                            <div className="swiper_image_wrapper">
                                <img src={post.images}/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiper_image_wrapper">
                                <img src={post.images}/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiper_image_wrapper">
                                <img src={post.images}/>
                            </div>
                        </SwiperSlide>                        
                    </Swiper>
                </div>
                <div className="detail_content_wrapper">
                    <p>{post.content}</p>
                </div>
                
            </div>
            :<></>
            }
        </div> 
    );
}
export default PostDetailPage;