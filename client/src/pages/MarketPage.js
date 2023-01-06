// modules
import { useState } from 'react';

// components
import NFTList from '../components/NFTList';
import Footer from "../components/Footer";

// css
import '../assets/css/market.css';

const MarketPage = ({nfts}) => {
    const[nftLimit, setNftLimit] = useState(10);
    const[nftPage, setNftPage] = useState(1);
    const nftOffset = (nftPage - 1) * nftLimit
    let numNftPages = Math.ceil(nfts.length/nftLimit)


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
                                    <i className="fas fa-image image_icon"/>
                                    Click to upload images.
                                    <input
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
                                />
                            </div>
                            <div className="input_group">
                                <label>Description</label>
                                <textarea 
                                    name="description"
                                    placeholder="Please insert description of NFT."
                                    rows={5}
                                />
                            </div>
                            <div className="input_group">
                                <label>Category</label>
                                <select>
                                    <option>Korean</option>
                                    <option>Chinese</option>
                                    <option>Japanese</option>
                                    <option>Western</option>
                                </select>
                            </div>
                        </div>
                        <div className="btn_group">
                            <button className="btn btn_reset">Reset</button>
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