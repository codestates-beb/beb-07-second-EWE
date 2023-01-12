/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();
const request = require('request');
const { users, nfts, posts, images } = require('../models');
const { createAccount } = require('../chainUtils/accountUtils');
const { getEtherBalance, useEtherFaucet } = require('../chainUtils/etherUtils');
const {
  getTokenBalance,
  transferTokenToUser,
  approveTokenToAdmin,
  spendApprovedToken,
} = require('../chainUtils/tokenUtils');

const {
  getCurrentTokenId,
  giveWelcomeNFT,
  getNFTOwner,
  getMyNFTBalance,
} = require('../chainUtils/nftUtils');

const WELCOMETOKEN = '10000000000000000';

const client_id = process.env.NAVER_ID;
const client_secret = process.env.NAVER_SECRET;
let state = 'RANDOM_STATE';
const redirectURI = encodeURI(
  'https://nodeauction.42msnsnsfoav6.ap-northeast-2.cs.amazonlightsail.com/naver/callback',
);
let api_url = '';

router.get('/login', function (req, res) {
  api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&state=${state}`;
  res.status(200).redirect(api_url);
});

router.get('/callback', function (req, res) {
  // console.log(req);
  const { code } = req.query;
  state = req.query.state;
  api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirectURI}&code=${code}&state=${state}`;
  const options = {
    url: api_url,
    headers: {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret,
    },
  };

  let accessToken = '';
  let refreshToken = '';
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      accessToken = JSON.parse(body).access_token;
      refreshToken = JSON.parse(body).refresh_token;
      request.get(
        {
          url: 'https://openapi.naver.com/v1/nid/me',
          headers: { Authorization: `Bearer ${accessToken}` },
        },
        async function (err, resp, body1) {
          if (!err && resp.statusCode === 200) {
            const body2 = JSON.parse(body1);
            const { email } = body2.response;
            const { nickname } = body2.response;
            const joinedUser = await users.findOne({ where: { email } });
            try {
              if (joinedUser !== null && joinedUser.login_provider == 'naver') {
                // DB에 존재하는 이메일일 경우 네이버 토큰을 돌려줌
                console.log(refreshToken);
                res.cookie('refreshToken', refreshToken, {
                  maxAge: 60 * 60,
                  httpOnly: true,
                });
                console.log('already joined');
                return res.status(200).json({
                  data: { accessToken, user: joinedUser },
                  message: 'accessToken issued',
                });
              }
              // DB에 존재하지 않을 경우 회원가입 진행 (password 는 null)
              const { address, privateKey } = await createAccount(); // web3 call
              const newUser = await users.create({
                email,
                wallet_account: address,
                eth: 0,
                login_provider: 'naver',
                nickname,
                erc20: 0,
                wallet_pk: privateKey,
              });
              await useEtherFaucet(address);
              await transferTokenToUser(address, WELCOMETOKEN);
              await approveTokenToAdmin(address, WELCOMETOKEN);
              const targetNFT = await nfts.findOne({
                where: { token_id: newUser.id },
              });
              if (targetNFT) {
                console.log('welcome nft presented to user!');
                await giveWelcomeNFT(address, newUser.id);
                await targetNFT.update({
                  user_id: newUser.id,
                });
              }

              const tokenBalance = await getTokenBalance(address);
              const etherBalance = await getEtherBalance(address);

              await newUser.update({
                eth: etherBalance,
                erc20: tokenBalance,
              });
              res.cookie('refreshToken', refreshToken, {
                maxAge: 60 * 60,
                httpOnly: true,
              });
              return res.status(200).json({
                data: { accessToken, user: newUser },
                message: 'accessToken issued',
              });
            } catch (error1) {
              console.log(error1);
              return res
                .status(500)
                .send({ data: null, message: 'server error' });
            }
          } else {
            console.log('error');
            if (res != null) {
              res.status(resp.statusCode).end();
              console.log(`error = ${resp.statusCode}`);
            }
          }
        },
      );
      // 여기서 리턴값 필요
    } else {
      res.status(response.statusCode).end();
      console.log(`error = ${response.statusCode}`);
    }
  });
});

router.get('/newAccessToken', async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res
      .status(404)
      .json({ data: null, message: 'no refresh token in cookie' });
  }
  try {
    await request.get(
      `https://nid.naver.com/oauth2.0/token?grant_type=refresh_token&client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refreshToken}`
    );
    // 유저 데이터 조회 후 유저 데이터와 함께 갱신된 토큰 전송
  } catch (err) {
    console.log(err);
    return next(err);
  }
});
// 배포 https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=VxWHtOzH3cIGqBItpTdY&client_secret=V2vruDLVGa&access_token={accessToken}&service_provider=NAVER
// 로컬 https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=G8M4m6BnEwXW_4MuPXjv&client_secret=_hhYGsrqAs&access_token={accessToken}&service_provider=NAVER

module.exports = router;
