'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('posts', [
      {
        title: 'post6 title',
        store_name: 'nice sushi',
        location: 'post6 location',
        content:
          'post6 content\n판교의 스시 맛집, 점심 특선과 반우동으로 상대적으로 저렴한 가격에 맛볼 수 있는 스시세트를 맛볼 수 있다.',
        views: 55,
        likes: 6,
        user_id: 1,
      },
      {
        title: 'post7 title',
        store_name: 'yongin chinese',
        location: 'post7 location',
        content:
          'post7 content\n용인에 위치한 최고의 중화요리집. 용인에서 제일가는 짬뽕 맛으로 유명하다는데, 그 양조차 푸짐해서 가성비와 맛 모두 챙길 수 있는 맛집입니다!',
        views: 39,
        likes: 5,
        user_id: 2,
      },
      {
        title: 'post8 title',
        store_name: 'noodle office',
        location: 'post8 location',
        content:
          'post8 content\n속초에 위치한 장칼국수 맛집. 시외버스 터미널 근처에 위치해서 도착하자마자 첫끼로 하거나 집에 돌아가기 전에 숙취해소하기 딱 좋은 메뉴입니다. 양도 푸짐해요!',
        views: 225,
        likes: 181,
        user_id: 3,
      },
      {
        title: 'post9 title',
        store_name: 'ancient chicken',
        location: 'post9 location',
        content:
          'post9 content\n서울 성북구에 위치한 옛날통닭 맛집. 한 번 맛보면 그 맛에 헤어나올 수가 없다. 바삿한 튀김옷과 부드러운 닭다리살...맥주가 땡기는 맛을 자랑한다.',
        views: 320,
        likes: 224,
        user_id: 4,
      },
      {
        title: 'post10 title',
        store_name: 'japanese ramen',
        location: 'post10 location',
        content:
          'post10 content\n안양에 위치한 일본 라멘집. 국물이 얼큰하고 일반 라멘들보다 느끼한 맛이 덜하다.',
        views: 201,
        likes: 44,
        user_id: 1,
      },
      {
        title: 'post11 title',
        store_name: 'handmade burger',
        location: 'post11 location',
        content:
          'post11 content\n쉑쉑버거 장인이 창업한 수제버거 맛집. 담백하고 부드러운 고기로 그 풍미가 예술이다.',
        views: 551,
        likes: 61,
        user_id: 1,
      },
      {
        title: 'post12 title',
        store_name: 'ms pizza',
        location: 'post12 location',
        content:
          'post12 content\n미스터피자의 마르게리따 피자에 영감을 받아 창업을 시작한 사장님. 이탈리아 피자의 짠맛을 덜하게 만들어 담백함을 더했다.',
        views: 393,
        likes: 151,
        user_id: 2,
      },
      {
        title: 'post13 title',
        store_name: 'coffee go',
        location: 'post13 location',
        content:
          'post13 content\n양양에 위치한 오션뷰 카페. 약간 가격이 비싼감이 있지만, 뷰를 감상하는 비용이라고 생각하자.',
        views: 2125,
        likes: 1181,
        user_id: 3,
      },
      {
        title: 'post14 title',
        store_name: 'seafood soup',
        location: 'post14 location',
        content:
          'post14 content\n서울 강남에서 시작된 해물탕 맛집 체인점. 풍부한 해물로 포만감이 상당하다.',
        views: 110,
        likes: 14,
        user_id: 4,
      },
      {
        title: 'post15 title',
        store_name: 'cold noodle',
        location: 'post15 location',
        content:
          'post15 content\n안양 인덕원역 2번 출구 바로 앞 건물 2층에 위치한 냉면 맛집. 회냉면이 유명하며 약간 매콤하다.',
        views: 420,
        likes: 104,
        user_id: 1,
      },
      {
        title: 'post16 title',
        store_name: 'alio',
        location: 'post16 location',
        content:
          'post16 content\n분당 서현역에 있는 알리오 올리오 맛집이다. 짜지도 않고 느끼하지도 않는 최고의 풍미이다.',
        views: 35,
        likes: 16,
        user_id: 1,
      },
      {
        title: 'post17 title',
        store_name: 'nakji',
        location: 'post17 location',
        content:
          'post17 content\n낙지 탕탕이 맛집이다. 육회와 세트로 먹으면 더욱 맛있다.',
        views: 139,
        likes: 25,
        user_id: 2,
      },
      {
        title: 'post18 title',
        store_name: 'my dounut',
        location: 'post18 location',
        content:
          'post18 content\n춘천에 유명한 도넛집. 크리스피 도넛과 유사한 맛이지만, 그 느끼함이 덜하다.',
        views: 22,
        likes: 18,
        user_id: 3,
      },
      {
        title: 'post19 title',
        store_name: 'raw meat',
        location: 'post19 location',
        content:
          'post19 content\n여의도에 위치한 육사시미 맛집. 회사원들의 퇴근 후 반주에 용이한 맛집이다.',
        views: 32,
        likes: 22,
        user_id: 4,
      },
      {
        title: 'post20 title',
        store_name: 'bit hotdog',
        location: 'post20 location',
        content:
          'post20 content\n명랑핫도그 그 이상의 핫도그 맛집.누구나 한 번 맛보고 싶은 최고의 맛이다.',
        views: 421,
        likes: 104,
        user_id: 1,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('posts', null, {});
  }
};
