const Footer = () => {
    return(
        <div className="footer">
                <div className="CI">
                    <div className="logo" >
                        <a href="/"><i className='fas fa-drumstick-bite fa-2xl' 
                        ></i></a>
                    </div>
                    <div className="ICName">
                        <a href="/" className="bigName">
                        <h1>EWE</h1></a>
                        <a href="/" className="smallName">
                        <h5>Eat Write Earn</h5></a>
                    </div>
                </div>
            <div className="team">
                윤수빈 프론트엔드, 디자인<br/>
                강두훈 프론트엔드, 디자인<br/>
                설동헌 백엔드, 스마트 컨트랙트<br/>
                김현태 백엔드, 스마트 컨트랙트<br/>
            </div>

            <div className="blogs">
                https://velog.io/@nft_sb<br/>
                https://velog.io/@jejualrock<br/>
                https://www.notion.so/7eb68268711f40619020318efcaeca0c<br/>
                https://velog.io/@atoye1<br/>
            </div>  
            <div className="github_repo">
                https://github.com/codestates-beb/beb-07-second-EWE/tree/main
            </div>
        </div>
    );
}
export default Footer;