import '../assets/css/signup.css'
const SignupPage = () => {

    let elInputUsername = document.querySelector('#username')
    let elInputPw = document.querySelector('#pw')
    let elWrongIdMessage = document.querySelector('.failure_message.wrong_id')
    let elNoneIdMessage = document.querySelector('.failure_message.none_id')
    let elNonePwMessage = document.querySelector('.failure_message.wrong_pw')
    let elPwRequires = document.querySelector('.pw_requires')
    let elPwRequiresDigitsC = document.querySelector('.digitsC')
    let elPwRequiresDigitsK = document.querySelector('.digitsK')
    let elPwRequiresNumC = document.querySelector('.numC')
    let elPwRequiresNumK = document.querySelector('.numK')
    let elPwRequiresUppercaseC = document.querySelector('.uppercaseC')
    let elPwRequiresUppercaseK = document.querySelector('.uppercaseK')
    let elPwRequiresSpecialC = document.querySelector('.specialC')
    let elPwRequiresSpecialK = document.querySelector('.specialK')
    
    const usernameOnKeyUp = () => {
    
        if(emailFormat(elInputUsername.value)){
            elWrongIdMessage.classList.add('hide')
        }else{
            if(elInputUsername.value){
                elNoneIdMessage.classList.add('hide')
                elWrongIdMessage.classList.remove('hide')
    
            }else{
                elNoneIdMessage.classList.remove('hide')
                elWrongIdMessage.classList.add('hide')
    
            }
        }
    }
    
    const passwordOnKeyUp = () =>{
    console.log(elInputPw.value)
    console.log(elInputPw)
//
    if(elInputPw.value){
            elNonePwMessage.classList.add('hide')
            elPwRequires.classList.remove('hide')
    
        }else{
            elNonePwMessage.classList.remove('hide')
            elPwRequires.classList.add('hide')
        }
    
        if(pwFormatLeastNum(elInputPw.value)){
            elPwRequiresNumK.classList.remove('hide')
            elPwRequiresNumC.classList.add('hide')
        }else{
            elPwRequiresNumK.classList.add('hide')
            elPwRequiresNumC.classList.remove('hide')
        }
        if(pwFormatLength(elInputPw.value)){
            elPwRequiresDigitsK.classList.remove('hide')
            elPwRequiresDigitsC.classList.add('hide')
        }else{
            elPwRequiresDigitsK.classList.add('hide')
            elPwRequiresDigitsC.classList.remove('hide')
        }
        if(pwFormatUppercase(elInputPw.value)){
            elPwRequiresUppercaseK.classList.remove('hide')
            elPwRequiresUppercaseC.classList.add('hide')
        }else{
            elPwRequiresUppercaseK.classList.add('hide')
            elPwRequiresUppercaseC.classList.remove('hide')
        }
        if(pwFormatSpecial(elInputPw.value)){
            elPwRequiresSpecialK.classList.remove('hide')
            elPwRequiresSpecialC.classList.add('hide')
        }else{
            elPwRequiresSpecialK.classList.add('hide')
            elPwRequiresSpecialC.classList.remove('hide')
        }
    }
    
    function emailFormat(value){
        return value.includes('@'&&'.') 
    }
    
    function pwFormatLength(value){
        return 8 <= value.length && value.length <= 32
    }
    
    function pwFormatLeastNum(value){
        if(value.match(/[0-9]/g)){
            return true
        }else{
            return false
        }
    }
    
    function pwFormatUppercase(value){
        if(value.match(/[A-Z]/g)){
            return true
        }else{
            return false
        }
       
    }
    
    function pwFormatSpecial(value){
        if(value.match(/[@#$%^&+!=]/g)){
            return true
        }else{
            return false
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
                <input type="text" placeholder="Email" id="username" onKeyUp={usernameOnKeyUp}/>
                <div>
                    <div className="failure_message wrong_id hide"><h6>The account you entered (mail or phone number) is in the wrong format</h6></div>
                    <div className="failure_message none_id hide"><h6>Enter Email address</h6></div>
                </div>

            </div>
            <div className="pw">
                <input type="password" placeholder="Set Password" id="pw" onClick={passwordOnKeyUp}
                    onKeyUp={passwordOnKeyUp}
                />
                <div>
                    <div className="failure_message wrong_pw hide"><h6>8 to 32 digits, at least 1 number, 1 uppercase letter, and 1Special characters</h6></div>
                    <div className="failure_message none_pw hide"><h6>Please enter password</h6></div>
                </div>    
                <div className="pw_requires hide">
                    <div className="requires">
                    <i className="hide fa-regular fa-circle-check digitsK "></i>
                    <i className="fa-regular fa-circle digitsC"></i><h6>8 to 32 digits</h6>
                    </div>
                    <div className="requires"><i className="hide fa-regular fa-circle-check numK "></i><i className="fa-regular fa-circle numC"></i><h6>At least 1 number</h6></div>
                    <div className="requires"><i className="hide fa-regular fa-circle-check uppercaseK "></i><i className="fa-regular fa-circle uppercaseC" ></i><h6>At least 1 uppercase letter</h6></div>
                    <div className="requires"><i className="hide fa-regular fa-circle-check specialK "></i><i className="fa-regular fa-circle specialC"></i><h6>At least 1 special characters</h6></div>
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