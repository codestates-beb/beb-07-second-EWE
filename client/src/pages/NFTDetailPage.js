// modules
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect }  from "react";
import NFTList  from  '../components/NFTList'

// apis
import { getNfts , getNftOne,getNftMetadata } from "../apis/nft";
import "../assets/css/nftdetail.css";

// components
import Pagination from "../components/Pagination";

const NFTDetail = () =>{
    const {nftId} = useParams()
    const [ nft , setNft ] = useState(null)
    const [metadata, setMetadata] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [user, setUser] = useState(null);
    const [nfts,setNfts] = useState([])
    const[nftLimit, setNftLimit] = useState(10);
    const[nftPage, setNftPage] = useState(1);
    const nftOffset = (nftPage - 1) * nftLimit
    let numNftPages = Math.ceil(nfts.length/nftLimit)

    useEffect(()=>{
        getNfts()
            .then((result)=>{
                setNfts(result)
            })
    },[]);

    useEffect(()=>{
        (async()=>{
            const result = await getNftOne(nftId);
            // console.log(result);
            setNft(result);
            const metadata = await getNftMetadata(result.metadata)
            // console.log(metadata);
            setMetadata(metadata)
        })();
    }, []);

    useEffect(()=>{
        (async()=>{
            const result = await getNftOne(nftId);
            // console.log(result);
            setNft(result);
            const metadata = await getNftMetadata(result.metadata)
            // console.log(metadata);
            setMetadata(metadata)
        })();
    }, [nftId]);

    useEffect(()=>{
        console.log(nft);
    }, [nft])

    useEffect(()=>{
        console.log(metadata);
    }, [metadata])

    const navigator = useNavigate()


    return(
        <div className="nft_detail">
            <Link to='/mint' className='mint'>
                <img className='post_button' src={require('../assets/image/mint.png')}>
                </img>
            </Link>

            <div className="nft_detail_wrapper">
                <div className="nft_image">
                    <h2>image</h2>
                    <img src={metadata===null?<></>:metadata.image}/>
                </div>
                <div className="nft_info">
                    <div className="nft_name">
                        <h2>name</h2>
                        <h1>{metadata===null?<></>:metadata.name}</h1>
                    </div>
                    <div className="nft_description">
                        <div className="nft_attributes">
                            <h2>{metadata===null?<></>:metadata.attributes[0].trait_type}</h2>
                            <h3>{metadata===null?<></>:metadata.attributes[0].value}</h3>
                    </div>
                    <h2>description</h2>
                    <h5>{metadata===null?<></>:metadata.description}</h5>
                    </div>
                </div>
            </div>
            {
                <Pagination
                    props={'nfts'}
                    user={''}
                />
                }  
                
            <img className='post_button' src={require('../assets/image/bottom.png')} onClick={()=>navigator(-1)}>
                </img>
        </div>
    )
}

export default NFTDetail;