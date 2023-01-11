/* eslint-disable node/no-unsupported-features/es-builtins */
const { users } = require('../models');

const { spendApprovedToken } = require('../chainUtils/tokenUtils');

module.exports = {
  transferToken: async (req, res, next) => {
    // 1. 로그인 정보를 검증한다. sender 객체로 받는다.
    try {
      if (!req.decoded) {
        const err = new Error(
          'Token is valid, but user info in token is invalid',
        );
        next(err);
      }
      const { email, nickname } = req.decoded;
      const sender = await users.findOne({
        where: {
          email,
          nickname,
        },
      });
      if (!sender) {
        return res.status(400).send({
          data: null,
          message:
            'no such user, but valid jwt token issued, try again or ask admin',
        });
      }
      const { address, amount } = req.body;
      if (!address || !amount) {
        return res.status(400).json({
          message: 'must input address and amount',
          status: 'error',
        });
      }
      // 2. 입력값을 검증한다. amount와 recipient가 적절한지 확인한다.
      const recipient = await users.findOne({
        where: {
          wallet_account: address,
        },
      });

      if (!recipient) {
        return res
          .status(404)
          .json({ message: 'no user with provided address', status: 'error' });
      }

      if (BigInt(amount) > BigInt(sender.erc20)) {
        return res
          .status(404)
          .json({ message: 'insufficient token balance', status: 'error' });
      }
      // 2. 체인에 현재 내 잔액을 확인한다.

      // 3. web3 트랜스퍼 호출한다.
      // const spendApprovedToken = async (sender, recipient, amount) =>
      spendApprovedToken(
        sender.wallet_account,
        recipient.wallet_account,
        amount,
      );
      // 4. db를 업데이트 한다. - block listener로 이관
      // const senderBalance = BigInt(sender.erc20) - BigInt(amount);
      // const recipientBalance = BigInt(recipient.erc20) + BigInt(amount);
      // await sender.update({
      //   erc20: senderBalance.toString(),
      // });
      // await recipient.update({
      //   erc20: recipientBalance.toString(),
      // });
      // console.log({ sender });
      // console.log({ recipient });
      return res
        .status(200)
        .json({ status: 'ok', message: 'trasfer successful' });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
};
