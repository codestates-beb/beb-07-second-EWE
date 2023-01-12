// modules
import {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import {Wrapper} from "@googlemaps/react-wrapper";

// components
import DetailGoogleMap from "../components/Map/DetailGoogleMap";
import Dropdown from "../components/Dropdown";

// apis
import { 
    getPostOne, 
    increaseLike,
    updatePost 
} from "../apis/post";

// css
import "../assets/css/postdetail.css";
import "swiper/css";
import "swiper/css/navigation";

function convertDate(date){
    const parsingDate = new Date(date).toLocaleString();
    return parsingDate;
}

const PostDetailPage = ({user}) => {
    const navigator = useNavigate();

    // Login Global State Var
    const isLogin = useSelector((state)=>state.auth.isLogin);
    const accessToken = useSelector((state)=>state.auth.accessToken);

    const {postId} = useParams()

    // Post Detail Page
    const [post, setPost] = useState(null);
    const [writer, setWriter] = useState(null);
    const [images, setImages] = useState(null);

    // Update Mode
    const [updateMode, setUpdateMode] = useState(false);
    const [titleToUpdate, setTitleToUpdate] = useState("");
    const [contentToUpdate, setContentToUpdate] = useState("");

    const [isLike, setIsLike] = useState(false);
    const [isDropdownView, setIsDropdownView] = useState(false)

    const postUpdateSubmitButtonHandler = async ()=>{
        const data = {};
        if (titleToUpdate.length > 0) data.title = titleToUpdate;
        if (contentToUpdate.length > 0) data.content = contentToUpdate;

        const updateResult = await updatePost(data, post.id, accessToken)
        .then(result=>result)
        .catch(err=>err)

        console.log(updateResult);
        if(!updateResult) return;
        setPost(updateResult)
    }

    const clickLikeHandler = async()=>{
        setIsLike(true);
        const result = await increaseLike(postId);
        console.log(result);
    }

    const clickAddressHandler = async()=>{
        if (window.navigator.clipboard){
            try{
                await window.navigator.clipboard.writeText(writer.wsetWriter)
            } catch(err) {
                console.log("copy failed", err);
            }
        } else {
            const address = document.createElement("input");
            address.value=writer.wsetWriter;
            address.style.position="absolute";
            address.style.left="-9999px";
            document.body.appendChild(address);
            address.select();
            if (!document.execCommand("copy")){
                console.log('copy failed');
            }
            address.remove();
        }
    }

    const toggleLike = ()=>{
        setIsLike(!isLike);
        if(isLike === false) setPost({...post, likes: post.likes+1});
        else setPost({...post, likes: post.likes-1});
    }

    const toggleIsDropdownView = ()=>{
        setIsDropdownView(!isDropdownView);
    }

    useEffect(()=>{
        (async()=>{
            const result = await getPostOne(postId);

            if (result.status === 500) navigator("/404");

            setPost(result);
            setImages(result.images);
            setWriter(result.user);
            setTitleToUpdate(result.title)
            setContentToUpdate(result.content);
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
                    {images.map((image, idx)=>{
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
                        {updateMode ?
                        <div className="detail_edit">
                            <button
                                className="btn cancel_button"
                                onClick={()=>{
                                    setUpdateMode(false)
                                    setIsDropdownView(false)
                                }}
                            >Cancel</button>
                            <button
                                className="btn submit_button" 
                                onClick={()=>{
                                    postUpdateSubmitButtonHandler()
                                    setUpdateMode(false); 
                                    setIsDropdownView(false)
                                }}
                            >Submit</button>
                        </div>
                        :<></>}
                        {isLogin && writer.id === user.id && !updateMode ? 
                        <div className="btn ellipsis">
                            <i className="fas fa-ellipsis" onClick={toggleIsDropdownView}/>
                            <Dropdown isDropdownview={isDropdownView}>
                                <div 
                                    className="dropdown_content"
                                    onClick={()=>{setUpdateMode(true)}}
                                >Update</div>
                                <div className="dropdown_content">Delete</div>
                            </Dropdown>
                        </div>
                        :<></>}
                    </div>
                    <div className="detail_header">
                        <div className="detail_header_row">
                            {updateMode? 
                                <input 
                                    className="detail_title detail_update" 
                                    defaultValue={titleToUpdate}
                                    onChange={e=>setTitleToUpdate(e.target.value)}
                                ></input>
                                :
                                <h1 className="detail_title">{post.title}</h1>
                            }
                            <p className="detail_postid"># {post.id}</p>
                        </div>
                        <div className="detail_header_row">
                            <p className="detail_data">
                                <i className="fas fa-pen"/>
                                <span>{writer? writer.nickname:""}</span>
                                <span>|</span>
                                <i className="fas fa-eye" />
                                <span>{post.views}</span>
                            </p>
                            <p className="detail_date">{convertDate(post.createdAt)}</p>
                        </div>
                    </div>
                    <div className="detail_content_wrapper">
                        {updateMode? 
                            <textarea 
                                className="detail_content detail_update" 
                                value={contentToUpdate}
                                onChange={(e)=>{setContentToUpdate(e.target.value)}}
                            >{contentToUpdate}</textarea>
                            :
                            <p className="detail_content">{post.content}</p>
                        }
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
                            <div className="content_right">
                                <div 
                                    className="content_writer_wallet"
                                    onClick={clickAddressHandler}
                                >
                                    <i className="fas fa-wallet"/>
                                    <p className="content_writer_address">
                                        {writer? writer.wallet_account:""}
                                    </p>
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
                            <DetailGoogleMap location={post.location}/>
                        </Wrapper>
                    </div>
                    
                </div>
            </div>
            <Link to='/write' className='write'>
                <img className='post_button' src={require('../assets/image/main.png')}>
                </img>
            </Link>
            </>
            :<></>}
        </div>
    );
}
export default PostDetailPage;