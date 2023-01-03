import '../assets/css/header.css'
const Header = () => {

    return(
        <header>
            <div className="CI">
                <div className="logo" >
                    <a href="/"><i className='fas fa-drumstick-bite fa-2xl' 
                    ></i></a>
                </div>
                <div className="ICName">
                    <a href="/" className="bigName">EWE</a>
                    <a href="/" className="smallName">Eat Write Earn</a>

                </div>
            </div>
            <div className="userMenu">
                
                <div className="logIn">
                    <a href="/">Login</a>
                </div>
                <div className="signUp">
                    <a href="/">SignUp</a>
                </div>
                <div>
                    <i className='fas fa-user '></i>
                    {/* <img src='{userImg}'></img> */}
                </div>
                <div className="userTeb">
                    <a href="/">Nickname</a>
                    <a href="/">My Page</a>
                    <a href="/">Mint</a>
                    <a href="/">ETH Faucet</a>
                    <a href="/">Log Out</a>
                    <a href="/">Secession</a>
                </div>

            </div>
        </header>
    );
}
export default Header;