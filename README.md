### beb-07-second-EWE
# 시연 영상
**[메인 & 리뷰]**
![main & detail](https://user-images.githubusercontent.com/18072469/212232769-147a14e0-e518-4bd4-905a-57391efe5be9.gif)

**[리뷰 작성]**
![write](https://user-images.githubusercontent.com/18072469/212232855-61667ec7-c07a-4081-9083-9b0b0ca7ef81.gif)

**[민팅]**
![minting](https://user-images.githubusercontent.com/18072469/212232957-5af32595-4071-44c1-8646-1daf641c592d.gif)

**[반응형]**
![responsive](https://user-images.githubusercontent.com/18072469/212233077-6b3b3e85-e3b0-4694-8d3e-60025b77ec6d.gif)

# 팀명 : EWE

팀장 - 윤수빈 프론트엔드 개발, 디자인<br>
팀원 - 강두훈 프론트엔드 개발, 디자인<br>
팀원 - 설동헌 백엔드, 스마트 컨트랙트 개발<br>
팀원 - 김현태 백엔드, 스마트 컨트랙트 개발<br>

#### 프로젝트 소개
맛집 리뷰를 작성하는 인센티브 커뮤니티입니다. 리뷰의 품질을 높이기 위하여, 작성되는 리뷰마다 토큰이 지급되고 작성된 리뷰에 토큰을 “좋아요” 기능처럼 사용 가능합니다. 
또한 모은 토큰을 가지고 쿠폰을 구매하여 이용 가능합니다.

#### 배경
맛집 추천은 인터넷에 치면 바로바로 나옵니다. 그리고 보통 해당 맛집들에 대해서 별점과 리뷰들을 보며 식사나 디저트를 먹을 곳을 찾게 됩니다. 하지만 아이러니하게도 이 데이터를 통해 합리적인 생각을 갖고 맛집이라고 판단한 곳을 방문해보지만, 실패하는 경우가 생깁니다. 다음과 같은 문제때문에 이런 경우가 발생합니다.

#### 뒷광고 리뷰 문제
이는 리뷰가 해당 식당에 광고를 받아 작성되었을 가능성이 있습니다. 그래서 본질은 왜곡하고 좋은 점들만, 혹은 좋은 점들까지 꾸며서 쓰는 경우도 생깁니다. 광고가 꼭 나쁜것은 아니지만, 음식을 빛 좋은 개살구로 만드는 것은 해당 광고 리뷰가 광고가 아닌 것처럼 포장하는 것은 사람들이 맛집을 구분하기 어렵게 만듭니다. 

#### 리뷰 별점, 좋아요 스캠 문제
별점 또한 가게 평판 관리를 하는 영세 기업에 맡깁니다. 해당 기업은 가계정을 여러 개 만들어 두어 해당 가게의 별점을 올리게 됩니다. 여기서 데이터에 대한 데이터로 리뷰에 대한 좋아요를 누르게 하는 서비스도 존재합니다. 잘 작성된 리뷰는 좋아요가 많고, 리뷰가 광고성이 짙고 실제와 거리가 멀다면 좋아요가 없을 것입니다. 하지만 이런 방지책 또한 별점의 사례와 같이 평판 관리를 맡긴다면 식당에 유리한 리뷰들만 좋아요가 많아질 수 있습니다.

#### 블랙컨슈머 문제
프로젝트 소개<br>
맛집 리뷰를 작성하는 인센티브 커뮤니티입니다. 리뷰의 품질을 높이기 위하여, 작성되는 리뷰마다 토큰이 지급되고 작성된 리뷰에 토큰을 “좋아요” 기능처럼 사용 가능합니다. 
또한 모은 토큰을 가지고 쿠폰을 구매하여 이용 가능합니다.

# 기능

사용자의 관점에서 제공되는 기능을 정리합니다.

## 개요

| 기능 | 설명 |
| --- | --- |
| 리뷰 작성 및 토큰 지급 | 맛집에 대한 리뷰를 작성하면 토큰을 지급 받습니다. |
| 리뷰 팁 기능 | 도움이 된 리뷰에 토큰을 팁처럼 보내는 기능입니다. 해당 리뷰를 작성한 글쓴이는 부가적으로 토큰을 벌 수 있습니다. |
| NFT 쿠폰 구매 기능 | 모은 토큰으로 매장에서 사용할 수 있는 NFT를 구매할 수 있습니다. |

# 기능 별 상세설명

- 리뷰 작성 및 토큰 지급

리뷰를 작성할 때마다 정보를 제공해준 대가로 토큰을 지급 받습니다.

- 리뷰 팁 기능

도움이 된 리뷰에 토큰을 팁처럼 보내는 기능입니다. 해당 토큰은 리뷰를 작성한 글쓴이이게 전해집니다.  또한 특정 리뷰가 다른 유저들로부터 총 얼마의 팁을 받았는지 확인할 수 있습니다. 

- NFT 쿠폰 구매 기능

이 커뮤니티에서 토큰의 최종 소비처로 작용하는 기능입니다. 고품질의 리뷰를 작성하여 번 토큰으로 매장에서 사용 가능한 NFT 쿠폰을 구매할 수 있습니다.


개발자 관점에서 구현이 되어야 하는 요구사항들을 설명합니다.

### 요구사항 개요

| 요구사항 | 설명 |
| --- | --- |
| 유저인증 | 서비스가 기능을 제공하기 위하여 사용자의 인증을 검증하고 권한을 부여합니다. |
| 유저 지갑관리 | 토큰과 NFT 거래에 필요한 계정을 서버에서 관리합니다. |
| 맛집 리뷰 CRUD | 리뷰가 작성 및 수정 되는 UI가 제공되고, 데이터베이스 상에서 관리할 수 있는 데이터로 남깁니다. |
| 리뷰 팁(토큰) 전송 | 작성된 리뷰에 토큰을 전송하여 작성자에게 보낼 수 있습니다. |
| 쿠폰 NFT 민팅 및 전송 | 쿠폰으로 사용할 수 있는 NFT를 구매할 수 있습니다. |


## 요구사항 상세



- 유저인증

유저가 커뮤니티에서 활동할 때, 접속되는 디바이스에서 서비스를 제공받고 있는 대상자가 커뮤니티에 등록이 되어있는 유저인지 확인합니다.  DB에 유저 정보를 저장해놓았다가, 이후 유저가 인증 요청을 해왔을 때 필요한 정보들을 조합해 대상을 인증시키고 이후 커뮤니티에서 제공되는 서비스들을 이용할 수 있게 합니다.

- 유저 지갑관리

커뮤니티 활동의 보상으로 유저들에게는 토큰이 주어지고, 또한 주어지는 토큰을 모아 NFT를 구매할 수 있습니다. 이를 위해서는 토큰과 NFT의 거래 데이터가 저장되는 블록체인이 필요합니다. 그리고 커뮤니티 이용자들에게는 해당 블록체인에서 자신이 소유한 토큰과 NFT를 가질 수 있는 계정을 소유해야 합니다. 구현되는 커뮤니티에서는 회원가입하는 유저에게 해당 유저만의 블록체인에서 사용되는 계정을 만들어주고 관리해야 합니다.

- 맛집 리뷰 CRUD

커뮤니티 구현 중 핵심 사항입니다. 맛집 리뷰를 작성할 수 있는 UI가 제공되어 사용자가 쉽게 특정 맛집에 대한 리뷰를 작성할 수 있습니다. 그리고 리뷰를 작성할 때마다 토큰이 지급되어 다른 커뮤니티 구성원들에게 정보를 제공해준 대가를 얻을 수 있습니다. 특정 리뷰는 해당 리뷰를 작성한 인증된 유저에 한해서 서버에 있는 데이터로부터 수정, 제거가 가능합니다.

- 리뷰 팁(토큰) 전송

특정 식당을 잘 설명할 수 있는 리뷰에 대해서 보상을 제공하기 위한 기능입니다. 임의의 유저가 해당 리뷰의 작성자에게 토큰을 전송시켜 리뷰를 잘 작성한 대가를 지불합니다.

- 쿠폰 NFT 민팅 및 전송

사용가능한, 혹은 커뮤니티에서 한 활동을 입증할 수 있는 NFT를 민팅하거나 발행하여서 이용자가 실제로 소유할 수 있게 만듭니다. 해당 NFT는 커뮤니티 활동으로 얻을 수 있는 토큰을 모아 구매 가능합니다.
