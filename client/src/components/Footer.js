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
                    <h5>eclip6@ajou.ac.kr</h5>
                    <a className='blog' href='https://velog.io/@jejualrock'><h6>Welcome to my Blog</h6></a>
                    <br/>                    <h5>김현태 백엔드, 스마트 컨트랙트</h5>
                    <h5>hyuntae384@gmail.com</h5>
                    <a className='blog' href='https://velog.io/@atoye1'><h6>Welcome to my Blog</h6></a>
                    <br/>  
                    <h5>설동헌 백엔드, 스마트 컨트랙트</h5>
                    <h5>ssalssi1@gmail.com</h5>
                    <a className='blog' href='https://www.notion.so/
                    7eb68268711f40619020318efcaeca0c'><h6>Welcome to my Blog</h6></a>
                    <br/> 
                    <h5>윤수빈 프론트엔드, 디자인</h5>
                    <h5>yunsubin481@gmail.com</h5>
                    <a className='blog' href='https://velog.io/@nft_sb'><h6>Welcome to my Blog</h6></a>

                    <a className="blog" href="https://github.com/codestates-beb/beb-07-second-EWE/tree/main">
                    <br/>
                            <h1>github</h1>
                        </a>

                </div>
                <div className="project">

                    <h3>Project EWE</h3><br/>
                    <h4>
                        Intro
                    </h4><br/>
                    <h5>EWE is an incentivized community<br/>
                    that creates value by
                    sharing and empathizing
                    with memorable meals.</h5>
                    <br/>
                </div>

            </div>
    );
}
export default Footer;