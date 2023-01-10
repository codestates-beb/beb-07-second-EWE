// modules
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// apis
import { mintNFT, mintNTF } from "../apis/nft";

// components
import NFTList from '../components/NFTList';
import Footer from "../components/Footer";

// css
import '../assets/css/market.css';

const MarketPage = ({nfts}) => {
    const navigator = useNavigate();

    // User Global Variable
    const isLogin = useSelector((state)=>state.auth.isLogin);
    const accessToken = useSelector((state)=>state.auth.accessToken);

    if (isLogin === false) navigator(-1);

    // Minting State Variable
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("korean");

    const [previewImage, setPreviewImage] = useState();

    const[nftLimit, setNftLimit] = useState(10);
    const[nftPage, setNftPage] = useState(1);
    const nftOffset = (nftPage - 1) * nftLimit
    let numNftPages = Math.ceil(nfts.length/nftLimit)

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
        console.log(resultMint)
    }

    const resetButtonHandler = ()=>{
        setName("")
        setDescription("");
        setImage(null);
        setPreviewImage(null);
    }

    return(
        <>
        <div className='market'>
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
                <NFTList
                nftLimit={nftLimit}
                nftOffset={nftOffset}
                nfts={nfts}
                />
                <div className='pagination'>
                    <select 
                        type = 'number'
                        value={nftLimit}
                        onChange={({target: {value}})=> setNftLimit(Number(value))}>
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                        <option value='30'>30</option>
                        <option value='100'>100</option>
                    </select>
                    <button onClick={()=> setNftPage( nftPage - 1 )} disabled = {nftPage === 1}>
                        <i className='fas fa-left-long'></i>
                    </button>
                        {Array(numNftPages)
                        .fill()
                        .map((_,i) => (
                            <button
                            className='pagination_num'
                            key = {i + 1}
                            onClick={()=>setNftPage( i + 1 )}
                            aria-current = {nftPage !== i + 1 ? "page" : null}
                            >
                            { i + 1 }
                            </button>
                            ))
                        }
                        <button onClick={()=> setNftPage( nftPage + 1 )}      disabled = {nftPage === numNftPages}>
                        <i className='fas fa-right-long'></i>
                    </button>
                </div>
            </div>
            
        </div>
        <Footer/>
        </>
    );
}
export default MarketPage;