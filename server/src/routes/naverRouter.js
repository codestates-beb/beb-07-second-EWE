/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();
const request = require('request');
const jwt = require('jsonwebtoken');
const { users, nfts } = require('../models');
const { createAccount } = require('../chainUtils/accountUtils');
const { useEtherFaucet } = require('../chainUtils/etherUtils');
const {
  transferTokenToUser,
  approveTokenToAdmin,
} = require('../chainUtils/tokenUtils');

const { giveWelcomeNFT } = require('../chainUtils/nftUtils');

const { WELCOMETOKEN } = process.env;

const client_id = process.env.NAVER_ID;
const client_secret = process.env.NAVER_SECRET;
let state = 'RANDOM_STATE';
const redirectURI = encodeURI(
  'https://nodeauction.42msnsnsfoav6.ap-northeast-2.cs.amazonlightsail.com/naver/callback',
); // 로컬에서 확인할때는 'http://localhost:5050/naver/callback' 로 변경!
let api_url = '';

router.get('/login', function (req, res) {
  api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&state=${state}`;
  res.status(200).redirect(api_url);
});

router.get('/callback', function (req, res, next) {
  // console.log(req);
  console.log('GET /naver/callback called');
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
      // refreshToken = JSON.parse(body).refresh_token;
      console.log({ naver: accessToken });
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
              if (!joinedUser) {
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
                useEtherFaucet(address);
                transferTokenToUser(address, WELCOMETOKEN);
                approveTokenToAdmin(address, WELCOMETOKEN);
                const targetNFT = await nfts.findOne({
                  where: { token_id: newUser.id },
                });
                if (targetNFT) {
                  console.log('welcome nft presented to user!');
                  giveWelcomeNFT(address, newUser.id);
                }
              }
              // DB에 존재하는 이메일일 경우 유저 정보를 DB에서 가져온다.
              // 유저객체를 가져와서, 자체 jwt토큰을 생성하고, 응답에 accessToken, 쿠키에 sameSite 적용된 refreshToken을 보내준다.
              accessToken = jwt.sign(
                {
                  email,
                  nickname,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: '30m',
                  issuer: 'EWE api server',
                },
              );

              refreshToken = jwt.sign(
                {
                  email,
                  nickname,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: '60m',
                  issuer: 'EWE api server',
                },
              );
              console.log({ refreshToken });
              res.cookie('refreshToken', refreshToken, {
                sameSite: 'none',
                secure: true,
                maxAge: 60 * 60 * 1000, // ms 1hr
                httpOnly: true,
              });
              // const currentUser = await users.findOne({ where: { email } });
              // return res.status(200).json({
              //   data: { accessToken, user: currentUser },
              //   message: 'accessToken issued',
              // });
              return res.redirect('https://d3t5y0jgzx6lw2.cloudfront.net/');
            } catch (error1) {
              console.log(error1);
              next(error1);
            }
          } else {
            console.log(err);
            next(err);
          }
        },
      );
      // 여기서 리턴값 필요
    } else {
      console.log(error);
      next(error);
    }
  });
});

// 배포 https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=VxWHtOzH3cIGqBItpTdY&client_secret=V2vruDLVGa&access_token={accessToken}&service_provider=NAVER
// 로컬 https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=G8M4m6BnEwXW_4MuPXjv&client_secret=_hhYGsrqAs&access_token={accessToken}&service_provider=NAVER

module.exports = router;
