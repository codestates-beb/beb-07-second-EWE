import ReactPlayer from 'react-player'
const Footer = () => {
    return(
        <div className="footer">
                <ReactPlayer
                    className="player"
                    url={"https://youtu.be/tJlzIJaokVY"}
                    width='100%'
                    height="500px"
                    playing={true}
                    muted={true}
                    controls={false}
                    loop={true}
                />
                <div className="team">

                    <img className='logo'src={require('../assets/image/EWElogo.png')}></img>


                    <br/>
                    <h5>강두훈 프론트엔드, 디자인</h5>
                    <h5>https://velog.io/@jejualrock</h5>
                    <h5>eclip6@ajou.ac.kr</h5>
                    <br/>                    <h5>김현태 백엔드, 스마트 컨트랙트</h5>
                    <h5>https://velog.io/@atoye1</h5>
                    <h5>hyuntae384@gmail.com</h5>
                    <br/>  
                    <h5>설동헌 백엔드, 스마트 컨트랙트</h5>
                    <h5>https://www.notion.so/
                    7eb68268711f40619020318efcaeca0c</h5>
                    <h5>ssalssi1@gmail.com</h5>
                    <br/> 
                    <h5>윤수빈 프론트엔드, 디자인</h5>
                    <h5>https://velog.io/@nft_sb</h5>
                    <h5>yunsubin481@gmail.com</h5>
                    <a className="github_repo" href="https://github.com/codestates-beb/beb-07-second-EWE/tree/main">
                    <br/>
                            <h5>github_repo</h5>
                        </a>

                </div>
                <div className="project">

                    <h5>Project EWE</h5>
                    <h5>
                        Intro
                    </h5>
                    <br/>
                </div>

            </div>
    );
}
export default Footer;