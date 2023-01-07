const Footer = () => {
    return(
        <div className="footer">
            <div className="web">
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
                <div className="web_info">
                    <a className="github_repo" href="https://github.com/codestates-beb/beb-07-second-EWE/tree/main">
                        <h5>github_repo</h5>
                    </a>
                </div>
            </div>
            <div className="footer">
                <div className="team">
                    <h5>윤수빈 프론트엔드, 디자인</h5>
                    <h5>https://velog.io/@nft_sb</h5>
                    <h5>yunsubin481@gmail.com</h5>

                    <br/>
                    <h5>강두훈 프론트엔드, 디자인</h5>
                    <h5>https://velog.io/@jejualrock</h5>
                    <h5>eclip6@ajou.ac.kr</h5>
                    <br/>
                    <h5>설동헌 백엔드, 스마트 컨트랙트</h5>
                    <h5>https://www.notion.so/
                    7eb68268711f40619020318efcaeca0c</h5>
                    <h5>ssalssi1@gmail.com</h5>
                    <br/>
                    <h5>김현태 백엔드, 스마트 컨트랙트</h5>
                    <h5>https://velog.io/@atoye1</h5>
                    <h5>hyuntae384@gmail.com</h5>
                </div>

                <div className="blogs">
                </div>  

            </div>
        </div>
    );
}
export default Footer;