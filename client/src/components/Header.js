// modules
import { useState, useEffect } from "react";
import Modal from 'react-modal'
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

// apis
import { 
    getUser,
    localLoginUser,
    logoutUser,
    naverLoginUser,
    updateUser,
    getUserBalance,
} from "../apis/user";

import { transferToken } from "../apis/token";

// actions
import {setAuth, resetAuth } from "../feature/authSlice";

// css
import '../assets/css/header.css'
import '../assets/css/modal.css'

// utils
import {
    verifyPassword,
    emailFormat,
    nicknameFormat,
    passwordDoubleCheck,
} from "../utils/validate";

import {
    successStyle,
    failStyle,
} from "../utils/style";

const Header = ({user, liftUser}) => {
    // Navigator
    const navigator = useNavigate();

    // Header State Var
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [sidebarModalIsOpen, setSidebarModalIsOpen] = useState(false);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

    // Login Global State Redux
    const isLogin = useSelector((state)=>state.auth.isLogin);
    const accessToken = useSelector((state)=>state.auth.accessToken);
    const dispatch = useDispatch();

    // Token Transfer State Var
    const [recepient, setRecepient] = useState("");
    const [amount, setAmount] = useState("")
    const [isTransfering, setIsTransfering] = useState(false);
    const [isTransferFail, setIsTransferFail] = useState(false);

    // Update Mode
    const [updateMode, setUpdateMode] = useState(false);

    const [nicknameToUpdate, setNicknameToUpdate] = useState("");
    const [passwordToUpdate, setPasswordToUpdate] = useState("");
    const [passwordToVerify, setPasswordToVerify] = useState("");

    const [isValidNickname, setIsValidNickname] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidPasswordVerify, setIsValidPasswordVerify] = useState(false);

    // Modal Handler
    const closeLoginModal=()=>{
        setLoginModalIsOpen(false)
    }
    const closeSidebarModal=()=>{
        setSidebarModalIsOpen(false)
    }
    const handleCopyClipBoard = async (text) => {
        if (window.navigator.clipboard){
            try {
                await window.navigator.clipboard.writeText(text);
            } catch (err) {
                console.log("copy failed", err);
            }
        } else {
            const address = document.createElement("input");
            address.value=user.wallet_account;
            address.style.position="absolute";
            address.style.left="-9999px";
            document.body.appendChild(address);
            address.select();
            if (!document.execCommand("copy")){
                console.log('copy failed');
            }
            address.remove();
        }
    };

    const tokenTransferButtonHandler = async ()=>{
        setIsTransfering(true);
        const isSuccess = await transferToken(recepient, amount, accessToken)
        if (isSuccess === true) {
            console.log("success");
            setTimeout(async()=>{
                const userBalance = await getUserBalance(user.id);
                liftUser({...user, ...userBalance});
                setIsTransfering(false);
            }, 1000);
        }
        else {
            console.log("failed")
            setIsTransferFail(true);
            setIsTransfering(false);
            setTimeout(()=>{
                setIsTransferFail(false);
            },2000)
        };
    }

    // Update Handler
    const userUpdateEditButtonHandler = ()=>{
        if(isLogin) setUpdateMode(true);
        else return;
    }

    const userUpdateSubmitButtonHandler= async()=>{
        const userInfoToUpdate = {}
        if ( verifyPassword(passwordToUpdate) ){
            if(passwordToUpdate !== passwordToVerify) return false;
            userInfoToUpdate.password = passwordToUpdate;
        }

        if ( nicknameFormat(nicknameToUpdate) )
            userInfoToUpdate.nickname = nicknameToUpdate;

        const userUpdated = await updateUser(userInfoToUpdate, user.id, accessToken)
        .then(result=>result)
        .catch(err=>err);

        if(!userUpdated) return;
        liftUser(userUpdated);
        setUpdateMode(false);
    }

    const passwordVerifyChangeHandler = (e)=>{
        if(passwordDoubleCheck(passwordToUpdate, e.target.value)) setIsValidPasswordVerify(true);
        else setIsValidPasswordVerify(false);

        setPasswordToVerify(e.target.value);
    }

    const nicknameChangeHandler = (e)=>{
        if(nicknameFormat(e.target.value)) setIsValidNickname(true);
        else setIsValidNickname(false);

        setNicknameToUpdate(e.target.value);
    }

    const passwordChangeHandler = (e)=>{
        if(verifyPassword(e.target.value)) setIsValidPassword(true);
        else setIsValidPassword(false);

        setPasswordToUpdate(e.target.value);
    }

    // Login Handler

    const loginFunc = async()=>{
        try{
            const result = await localLoginUser({email, password})
            liftUser(result.data.user);
            dispatch(setAuth({
                accessToken: result.data.accessToken, 
                userID: result.data.user.id
            }));
            setEmail("");
            setPassword("");
            return true;
        } catch{
            return false;
        }
    }

    const loginEnterHandler= async(e)=>{
        if(e.key === "Enter" && await loginFunc()) setLoginModalIsOpen(false);
        else return false;
    }

    const logoutButtonHandler = async()=>{
        if(isLogin===false) return;

        try{
            const result = await logoutUser(accessToken);
            if (result.status === "ok") {
                liftUser({
                    nickname:"Guest",
                    eth: 0,
                    erc20: 0,
                });
                dispatch(resetAuth());
                navigator("/");
            };
        }catch{
            console.log("logout failed");
        }
    }

    useEffect(()=>{
        if(loginModalIsOpen) document.body.style= 'overflow: hidden';
        else document.body.style = 'overflow: unset';
    },[loginModalIsOpen])

    useEffect(()=>{
        if(updateMode) {
            getUser(user.id)
            .then(user=>{
                const {nickname, password} = user;
                setNicknameToUpdate(nickname); setIsValidNickname(true);
                setPasswordToUpdate(password); setIsValidPassword(true);
                setPasswordToVerify(password); setIsValidPasswordVerify(true);
            })
        }
    }, [updateMode])

    return(
        <header>
            <div className='header_left'>
                <i 
                className='fab fa-bitcoin fa-xl'
                onClick={()=>setSidebarModalIsOpen(!sidebarModalIsOpen)}></i>
            </div>
            <Modal
                isOpen={sidebarModalIsOpen}
                onRequestClose={()=> closeSidebarModal(false)}
                style={{
                    overlay:{
                        position:'fixed',
                        top:0,
                        left:0,
                        right:0,
                        bottom:0,
                        backgroundColor: '#00000050',
                        zIndex:'40',
                        
                    },
                    content:{
                        width:'240px',
                        height:'100%',
                        margin:'auto',
                        padding:'0',
                        position:"absolute",
                        top:'0px',
                        left:'0px',
                        right:'90%',
                        bottom:'0px',
                        border: '1px solid #ccc',
                        background:'#fff',
                        outline:'none',
                        textAlign:'left',
                    },
                }}
            >
                <div className='modal_sidebar'>
                    <div className="sidebar_head">
                        <i className="fas fa-xmark" onClick={()=>{closeSidebarModal(); setUpdateMode(false)}}></i>
                        {updateMode ?
                            <button className="user_submit" onClick={userUpdateSubmitButtonHandler}>Submit</button>
                            :
                            <button className="user_edit" onClick={userUpdateEditButtonHandler}>Edit</button>
                        }
                    </div>
                    <div className='user_info'>
                        <div className='sidebar_user user_info_1'>
                                <h2>User Information</h2>
                            {!updateMode ?
                                <>
                                <div className="nickname">
                                    <h3>Nickname</h3>
                                    {user.nickname===null||user.nickname===undefined?"Guest":user.nickname}
                                </div>
                                <div className="email">
                                    <h3>Email</h3>
                                    {user.email===null||user.email===undefined?<div>-</div>:user.email}
                                </div>
                                <div className="wallet_account">
                                    <h3>Wallet Account</h3>
                                    <div className='account'>
                                        <p>{user===null||user.nickname===undefined?<div>-</div>:user.wallet_account}</p>
                                        <button onClick={() => {handleCopyClipBoard(user.wallet_account===null||user.wallet_account===undefined?<div>-</div>:user.wallet_account)}}>copy</button>
                                    </div>
                                </div>
                                <div className="eth">
                                    <h3>Balance</h3>
                                    {user.eth===null||user.eth===undefined?<div>0 ETH</div>:user.eth/1000000000000000000+'ETH'}
                                </div>
                                <div className="erc20">
                                    <h3>Token</h3>
                                    {user.erc20===null||user.erc20===undefined?<div>0 EWE</div>:user.erc20+'EWE'}
                                </div>
                                </>
                            :
                                <>
                                <div className="nickname update">
                                    <h3>Nickname</h3>
                                    <input 
                                        value={nicknameToUpdate}
                                        onChange={nicknameChangeHandler}
                                        style={isValidNickname? successStyle : failStyle}
                                    />
                                </div>
                                <div className="password update">
                                    <h3>Password</h3>
                                    <input
                                        value={passwordToUpdate}
                                        onChange={passwordChangeHandler}
                                        type="password"
                                        style={isValidPassword? successStyle : failStyle}
                                    />
                                </div>
                                <div className="password_check update">
                                    <h3>Password Check</h3>
                                    <input
                                        value={passwordToVerify}
                                        onChange={passwordVerifyChangeHandler}
                                        type="password"
                                        style={isValidPasswordVerify? successStyle : failStyle}
                                    />
                                </div>
                                </>
                            }
                    </div>
                </div>
                <div className='sidebar_user user_info_2'>
                    <div className='token_transfer'>
                        <h2>Token Transfer</h2>
                        <div className="receivers_address">
                            <h4>Receiver's Address</h4>
                            <input 
                                value={recepient}
                                onChange={e=>{setRecepient(e.target.value)}}
                            />
                        </div>
                        <div className="amount">
                            <h4>Amount</h4>
                            <input 
                                onChange={e=>{
                                    const { value } = e.target;
                                    const onlyNumber = value.replace(/[^0-9]/g, '');
                                    setAmount(onlyNumber);}
                                }
                                value={amount}
                            />
                        </div>
                        {isTransfering? 
                            <div className="transaction transfering">
                                <img className="transfering_img" src="/img/loading.gif" />
                            </div>
                        : 
                            <div 
                                className='transaction'onClick={tokenTransferButtonHandler}
                            >
                                <h2>{isTransferFail? "Fail" : "Transaction"}</h2>
                            </div>
                        }
                    </div>
                    
                </div>
                <div className='sidebar_user user_info_2'>
                </div>
                </div>
            </Modal>
            <div className="CI header_middle">
                <div className='header_logo'>
                    <div className="logo" >
                        <Link to="/">
                        <img src={require('../assets/image/EWElogo_1.png')}></img>

                        </Link>
                    </div>
                </div>
            </div>
            <div className='header_right'>
                {isLogin?
                <div className="userMenu">
                    <div className='user'>
                        <div>
                            <i className='fas fa-user '></i>
                            {/* <img src='{userImg}'></img> */}
                        </div>
                        <div className="userTab">
                            <h3>{user===null?"":user.nickname}</h3>
                            <Link to="/mypage">My Page</Link>
                            <Link to="/market">NFT Market</Link>
                            <Link to="/">ETH Faucet</Link>
                            <Link onClick={logoutButtonHandler}>Log Out</Link>
                            {/* <Link to="/">Secession</Link> */}
                        </div>
                    </div>
                </div>    
                :
                <div className="userMenu">
                    <div className="Login">
                        <Link onClick={()=>setLoginModalIsOpen(true)}>
                        <h4>Login</h4>
                        </Link>
                        <Modal 
                isOpen={loginModalIsOpen}
                onRequestClose={()=> setLoginModalIsOpen(false)}
                style={{
                    overlay:{
                        position:'fixed',
                        margin:'auto',
                        padding:'auto',
                        top:0,
                        left:0,
                        right:0,
                        bottom:0,
                        backgroundColor: '#00000050',
                        zIndex:'50',
                        
                    },
                    content:{
                        minWidth:'360px',
                        width:'30%',
                        alignItems:'center',
                        height:'75%',
                        margin:'auto',
                        padding:'0px 3% 3% 3%',
                        position:"absolute",
                        top:'40%',
                        left:'0.5%',
                        right:'0.5%',
                        bottom:'40%',
                        border: '1px solid #ccc',
                        background:'#fff',
                        borderRadius: '30px',
                        outline:'none',
                        textAlign:'center',
                    },
                }}
                >
                <div className='login_modal'>  
                    <i className="fas fa-xmark" onClick={()=>closeLoginModal()}></i>
                    <div className="hide"></div>
                    <img className='login_modal_CI'src={require('../assets/image/EWElogo_1.png')} alt='home'></img>
                    <h1>Login</h1>
                    <h5 className="welcome">[Welcome to EWE]</h5>
                    <div>
                        <div className='login_user_info'>
                            <h2>Email</h2>
                            <input 
                                onChange={(e)=>{setEmail(e.target.value)}}
                                onKeyDown={loginEnterHandler}
                            />
                        </div>
                        <div className='login_user_info'>
                            <h2>Password</h2>
                            <input 
                                type="password" 
                                onChange={(e)=>{setPassword(e.target.value)}}
                                onKeyDown={loginEnterHandler}
                            />
                        </div>
                    </div>
                    <button onClick={()=>closeLoginModal()}><h3 className="login_button" onClick={loginFunc}>Log in</h3></button>
                    <div className="sign_up_with">
                        <a href="https://nodeauction.42msnsnsfoav6.ap-northeast-2.cs.amazonlightsail.com/naver/login" target="_blank">
                            <div className="modal_naver">
                                <h1>N</h1>
                                <h3>Naver Login</h3>
                            </div>
                        </a>                
                    </div>
                    <h4 className="create_your_account">Create your Account!</h4>
                    <Link to="/signup" onClick={()=>setLoginModalIsOpen(!loginModalIsOpen)}><h3  className="modal_sign_up_button">Sign Up</h3></Link>
                </div>
            </Modal>

                    </div>
                    <div className="signup">
                        <Link to="/signup">
                        <h4>SignUp</h4>
                        </Link>
                    </div>
                    <div className='user'>
                        <div>
                            <i className='fas fa-user '></i>
                            {/* <img src='{userImg}'></img> */}
                        </div>
                    </div>
                </div> 
                }
            </div>
            
        </header>
    );
}
export default Header;