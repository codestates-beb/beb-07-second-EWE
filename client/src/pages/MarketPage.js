// modules
import { useState, useEffect } from 'react';

import {mintNTF} from "../apis/nft";

// components
import NFTList from '../components/NFTList';
import Footer from "../components/Footer";

// css
import '../assets/css/market.css';

const MarketPage = ({nfts}) => {
    // Minting State Variable
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState();

    const [previewImage, setPreviewImage] = useState();

    const[nftLimit, setNftLimit] = useState(10);
    const[nftPage, setNftPage] = useState(1);
    const nftOffset = (nftPage - 1) * nftLimit
    let numNftPages = Math.ceil(nfts.length/nftLimit)

    const imageChangeHandler = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();

        if (/\.(jpe?g|png|gif)$/i.test(file.name)){

            reader.addEventListener("load",
            ()=>{
                setPreviewImage(reader.result);
            },false)
        }

        reader.readAsDataURL(file);
    }

    const resetButtonHandler = (e)=>{
        setName("")
        setDescription("");
        setImage(null);
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
                                <select>
                                    <option value="korean">Korean</option>
                                    <option value="chinese">Chinese</option>
                                    <option value="japanese">Japanese</option>
                                    <option value="western">Western</option>
                                </select>
                            </div>
                        </div>
                        <div className="btn_group">
                            <button className="btn btn_reset" resetButtonHandler={resetButtonHandler}>Reset</button>
                            <button className="btn btn_mint">Minting</button>
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