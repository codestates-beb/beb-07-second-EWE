//modules
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//apis
import {
    localSignupUser,
    localLoginUser,
} from "../apis/user"

//actions
import { setAuth } from "../feature/authSlice";

//css
import '../assets/css/signup.css'

// utils
import {
    emailFormat,
    nicknameFormat,
    pwFormatLength,
    pwFormatLeastNum,
    pwFormatUppercase,
    pwFormatSpecial
} from '../utils/validate';

import {
    failStyle
} from "../utils/style";

const SignupPage = ({liftUser}) => {
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidNickname, setIsValidNickname] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);

    const [isSignUpError, setIsSignUpError] = useState(false);
    const [isCheckTerm, setIsCheckTerm] = useState(false);

    const signupBtnHandler = async()=>{
        if(!isValidEmail || !isValidNickname || !isValidPassword)
            return console.log(new Error("Invalid Info"));

        const userInfo = { 
            email: email, 
            nickname: nickname, 
            password: password 
        };

        const signupResult = await localSignupUser(userInfo);
        console.log(signupResult);
        if (signupResult.status === 200){
            
            const {email, password} = signupResult.data;

            const result = await localLoginUser({email, password}) ;

            console.log(result);

            liftUser(result.data.user);
            dispatch(setAuth({
                accessToken: result.data.accessToken,
                userID: result.data.user.id
            }));
            
            navigator("/");
        } else{
            setIsSignUpError(true); 
            return new Error("No User Created");
        }
    }

    useEffect(()=>{
        if (emailFormat(email) && email.length > 0) setIsValidEmail(true);
        else setIsValidEmail(false);
    },[email]);

    useEffect(()=>{
        if (nicknameFormat(nickname) && nickname.length > 0) setIsValidNickname(true);
        else setIsValidNickname(false);
    }, [nickname]);

    useEffect(()=>{
        if ( pwFormatLength(password) 
            && pwFormatLeastNum(password) 
            && pwFormatUppercase(password) 
            && pwFormatSpecial(password)
            && password.length > 0
        ) setIsValidPassword(true);
        else setIsValidPassword(false);
    }, [password])

    return(
<div className='signUpPage'>
    <div><img className="loginImg" src="http://gdimg.gmarket.co.kr/2096967704/still/600?ver=1619205661" alt=""></img></div>
    <div className="create_account">        
        <div><h1>Create Account</h1></div>
        <div className="residence">
            <h5>Country of residence</h5>
            <select name="countrys" id="" type="text">
                <option value="Korea">Korea</option>
                <option value="United States">U.S.</option>
                <option value="China">China</option>
                <option value="France">Frence</option>
                <option value="France">Malta</option>
            </select>            
        </div>
        <div className="user_info">
            <div className="sign_up_method">
                <a href="#" className="Email"><h3>Email</h3></a>
                <a href="#" className="mobile_number"><h3>Mobile number</h3></a>
            </div>
            <div className="email">
                <input type="text" placeholder="Email" id="email" onChange={e=>
                {setEmail(e.target.value)}}/>
                <div>
                    {email.length>0 || email === ''?<></>:<div className="failure_message none_id "><h6>Enter Email address</h6></div>}
                    
                    {emailFormat(email) || email === ''? <></>:<div className="failure_message wrong_id "><h6>The account you entered (mail or phone number) is in the wrong format</h6></div>}
                    
                </div>
            </div>
            <div className="nickname">
                <input type="text" placeholder="Nickname" id="nickname" onChange={e=>
                {setNickname(e.target.value)}}/>
                <div>
                    {nickname.length>0 || nickname === ''?<></>:<div className="failure_message none_id "><h6>Enter Your Nickname</h6></div>}
                    {nicknameFormat(nickname) || nickname === ''? <></>:<div className="failure_message"><h6>2 to 20 characters</h6></div>}
                </div>
            </div>
            <div className="pw">
                <input type="password" placeholder="Set Password" id="pw" onChange={e=>{setPassword(e.target.value)}}
                />
                <div>
                    {pwFormatLength(password)&&
                    pwFormatLeastNum(password)&&
                    pwFormatUppercase(password)&&
                    pwFormatSpecial(password) || password === '' ?<></>:
                    <div className="failure_message wrong_pw "><h6>8 to 32 digits, at least 1 number, 1 uppercase letter, and 1Special characters</h6></div>}   
                    {password.length>0 || password === ''?<></>:<div className="failure_message none_pw "><h6>Please enter password</h6></div>}
                </div>  
                {password === '' ?<></>:   
                <div className="pw_requires ">

                    <div className="requires">
                        {pwFormatLength(password)?
                        <i className=" fa-regular fa-circle-check digitsK "></i>:
                        <i className="fa-regular fa-circle digitsC"></i>}
                        <h6>8 to 32 digits</h6>    
                    </div>
                    <div className="requires">
                        {pwFormatLeastNum(password)?
                        <i className=" fa-regular fa-circle-check digitsK "></i>:
                        <i className="fa-regular fa-circle digitsC"></i>}
                        <h6>At least 1 number</h6>
                    </div>
                    <div className="requires">
                        {pwFormatUppercase(password)?
                        <i className=" fa-regular fa-circle-check digitsK "></i>:
                        <i className="fa-regular fa-circle digitsC"></i>}
                        <h6>At least 1 uppercase letter</h6>
                    </div>
                    <div className="requires">
                        {pwFormatSpecial(password)?
                        <i className=" fa-regular fa-circle-check digitsK "></i>:
                        <i className="fa-regular fa-circle digitsC"></i>}
                        <h6>At least 1 special characters</h6>
                    </div>
                    
                </div>
                }
            </div>
        </div>
        <div>
            <div className="terms_of_use">
                <input type="checkbox" name="" onChange={e=>setIsCheckTerm(e.target.value)} value={isCheckTerm}/>
                <h6>I agree to the</h6>
                <a href="/"><h6>&#60;Terms of Use&#62;</h6></a>
            </div>
            <div className="buttons">
                <button className="sign_up_button" onClick={signupBtnHandler}><h3>Sign Up</h3></button>
                <h5>or sign up with</h5>
                <div className="sign_up_with">
                    <button>
                        <div className="google">
                            <h1>N</h1>
                            <h3>Naver social Login</h3>
                        </div>
                    </button>

                </div>
                <div className="login">
                    <h6>Already have an account?</h6>
                    <a href="/"><h3  className="login_button">Log in</h3></a>
                </div>
            </div>
        </div>
    </div>
</div>
    );
}
export default SignupPage;