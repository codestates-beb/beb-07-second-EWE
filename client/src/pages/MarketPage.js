// modules
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

// apis
import { mintNFT, getNftOne } from "../apis/nft";

// components
import Pagination from "../components/Pagination";

// css
import '../assets/css/market.css';

const MarketPage = ({user}) => {
    const navigator = useNavigate();

    // User Global Variable
    const isLogin = useSelector((state)=>state.auth.isLogin);
    const accessToken = useSelector((state)=>state.auth.accessToken);

    // Minting State Variable
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("korean");

    const [previewImage, setPreviewImage] = useState();
    const [responsibleToggle,SetResponsibleToggle] = useState(false)

    const imageChangeHandler = (e)=>{
        const file = e.target.files[0];
        setImage(file);

        const reader = new FileReader();

        if (/\.(jpe?g|png|gif)$/i.test(file.name)){

            reader.addEventListener("load",
            ()=>{
                setPreviewImage(reader.result);
            },false)
        }

        reader.readAsDataURL(file);
    }

    const mintButtonHandler = async ()=>{
        console.log(name, description, image, category);
        if (!name || !description || !image || !category) return;

        const metadata = {
            name, description, image, attributes:{category}
        }

        const resultMint = await mintNFT(metadata, accessToken);

        const tokenId = resultMint.data.tokenId;
        

        console.log(resultMint)
        navigator("/mypage");
    }

    const resetButtonHandler = ()=>{
        setName("")
        setDescription("");
        setImage(null);
        setPreviewImage(null);
    }

    useEffect(()=>{
        if(!isLogin) navigator("/");
    }, [])

    return(
        
        <div className='market'>

            <Link to='/market' className='market'>
                <img className='post_button' src={require('../assets/image/mint.png')}>
                </img>
            </Link>
            <div className='category narrow'>
            <i className="fa-solid fa-caret-down" onClick={()=>{SetResponsibleToggle(!responsibleToggle)}}>
                </i>
                {
                responsibleToggle === false?
                <></>
                :<div className='toggle_category'>
                    <div className='toggle_category_1'>
                        <h2>{user===null || user===undefined ?
                        'Guest' : user.nickname
                            }</h2>
                        <Link to="/mypage">My Page</Link>
                        <Link to="/market">NFT Market</Link>
                        <Link to="/">ETH Faucet</Link>
                        <Link to="/">Log Out</Link>
                        <Link to="/">Secession</Link>
                    </div>
                </div>
                }


            </div>
            <div className='category wide'>
                <Link to='/'>
                Eat Write Earn   Incentive Community : Get your token with Boasting your dishes! 
                </Link>
            </div>
            <div className='market_section'>
                <div className="section_title">
                    <h1>Minting</h1>
                </div>
                <div className="mint_section">
                    <div className="mint_wrapper">
                        <div className="image_upload_wrapper">
                            <div className="image_input_wrapper">
                                <label className="image_input_helper" htmlFor="image_input">
                                    <div className="image_input_guide">
                                        {previewImage? 
                                            <div className="image_preview_wrapper">
                                                <img src={previewImage}/>
                                            </div>
                                        :
                                        <>
                                            <i className="fas fa-image image_icon"/>
                                            <span>Click to upload NFT image.</span>
                                        </>
                                        }
                                        
                                    </div>
                                    <input
                                        onChange={imageChangeHandler}
                                        id="image_input"
                                        className="image_input"
                                        type="file"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="mint_form_wrapper">
                            <div className="input_group">
                                <label>Name</label>
                                <input 
                                    name="name"
                                    placeholder="Please insert NFT's name."
                                    onChange={(e)=>{setName(e.target.value)}}
                                    value={name}
                                />
                            </div>
                            <div className="input_group">
                                <label>Description</label>
                                <textarea 
                                    name="description"
                                    placeholder="Please insert description of NFT."
                                    rows={5}
                                    onChange={(e)=>{setDescription(e.target.value)}}
                                />
                            </div>
                            <div className="input_group">
                                <label>Category</label>
                                <select defaultValue={"korean"} onChange={(e)=>setCategory(e.target.value)}>
                                    <option value="korean">Korean</option>
                                    <option value="chinese">Chinese</option>
                                    <option value="japanese">Japanese</option>
                                    <option value="western">Western</option>
                                </select>
                            </div>
                        </div>
                        <div className="btn_group">
                            <button className="btn btn_reset" onClick={resetButtonHandler}>Reset</button>
                            <button className="btn btn_mint" onClick={mintButtonHandler}>Minting</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='market_section'>
                <div className="section_title">
                    <h1>NFTs</h1>
                </div>
                {
                <Pagination
                    props={'nfts'}
                    user={''}
                />
                }    
                </div>        
            <div className="footer">
                <img className='post_button' src={require('../assets/image/main.png')}>
                </img>
                <div className="team">

                    <img className='logo'src={require('../assets/image/EWElogo.png')}></img>


                    <br/>
                    <h5>강두훈 프론트엔드, 디자인</h5>
                    <h5>https://velog.io/@jejualrock</h5>
                    <h5>eclip6@ajou.ac.kr</h5>
                    <br/>                    <h5>김현태 백엔드, 스마트 컨트랙트</h5>
                    <h5>https://velog.io/@atoye1</h5>
                    <h5>hyuntae384@gmail.com</h5>
                    <br/>  
                    <h5>설동헌 백엔드, 스마트 컨트랙트</h5>
                    <h5>https://www.notion.so/
                    7eb68268711f40619020318efcaeca0c</h5>
                    <h5>ssalssi1@gmail.com</h5>
                    <br/> 
                    <h5>윤수빈 프론트엔드, 디자인</h5>
                    <h5>https://velog.io/@nft_sb</h5>
                    <h5>yunsubin481@gmail.com</h5>
                    <a className="github_repo" href="https://github.com/codestates-beb/beb-07-second-EWE/tree/main">
                    <br/>
                            <h5>github_repo</h5>
                        </a>

                </div>
                <div className="project">

                    <h5>Project EWE</h5>
                    <h5>
                        Intro
                    </h5>
                    <br/>
                </div>
            </div>


        </div>

    );
}
export default MarketPage;