import { useState} from 'react'
import '../assets/css/signup.css'
const SignupPage = () => {
    const [isEmail, setIsEmail] = useState('')
    const [password, setPassword] = useState('')

    function emailFormat(value){
        return value.includes('@'&&'.'); 
    }
    
    function pwFormatLength(value){
        return 8 <= value.length && value.length <= 32;
    } 
    
    function pwFormatLeastNum(value){
        if(value.match(/[0-9]/g)){
            return true;
        }else{
            return false;
        }
    }
    
    function pwFormatUppercase(value){
        if(value.match(/[A-Z]/g)){
            return true;
        }else{
            return false;
        }
       
    }
    
    function pwFormatSpecial(value){
        if(value.match(/[@#$%^&+!=]/g)){
            return true;
        }else{
            return false;
        }}

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
                <a href="/" className="Email"><h3>Email</h3></a>
                <a href="/" className="mobile_number"><h3>Mobile number</h3></a>
            </div>
            <div className="email">
                <input type="text" placeholder="Email" id="username" onChange={e=>
                {setIsEmail(e.target.value)}}/>
                <div>
                    {isEmail.length>0?<></>:<div className="failure_message none_id "><h6>Enter Email address</h6></div>}
                    {emailFormat(isEmail)? <></>:<div className="failure_message wrong_id "><h6>The account you entered (mail or phone number) is in the wrong format</h6></div>}
                </div>
            </div>
            <div className="pw">
                <input type="password" placeholder="Set Password" id="pw" onChange={e=>{setPassword(e.target.value)}}
                />
                <div>
                    {pwFormatLength(password)&&
                    pwFormatLeastNum(password)&&
                    pwFormatUppercase(password)&&
                    pwFormatSpecial(password)?<></>:
                    <div className="failure_message wrong_pw "><h6>8 to 32 digits, at least 1 number, 1 uppercase letter, and 1Special characters</h6></div>}   
                    {password.length>0?<></>:<div className="failure_message none_pw "><h6>Please enter password</h6></div>}
                </div>    
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
            </div>
        </div>
        <div>
            <div className="terms_of_use">
                <input type="checkbox" name="" value=""/>
                <h6>I agree to the</h6>
                <a href="/"><h6>&#60;Terms of Use&#62;</h6></a>
            </div>
            <div className="buttons">
                <button className="sign_up_button"><h3>Sign Up</h3></button>
                <h5>or sign up with</h5>
                <div className="sign_up_with">
                    <button>
                        <div className="google">
                            <i className="fa-brands fa-google"></i>
                            <h3>Google</h3>
                        </div>
                    </button>
                    <button>
                        <div className="apple">
                            <i className="fa-brands fa-apple"></i>
                            <h3>Apple</h3>
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
    <script src="signUp.js"></script>
    <link rel="stylesheet" href="style.css"/>
</div>
    );
}
export default SignupPage;