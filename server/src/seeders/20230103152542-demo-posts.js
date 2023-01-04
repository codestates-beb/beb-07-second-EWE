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
        title: 'post1 title',
        store_name: 'crab house',
        location: 'post1 location',
        content:
          'post1 content\n제철의 마지막에 맛본 꽃게찜. 조금 늦은 것 같기도 하지만 숫게철 말미에 마장동에서 유명하다는 목포산꽃게집에 옴. 이 근방 목포집, 군산집, 태안집 지역별 꽃게집들이 모여 있는데 유독 여기 목포집에만 웨이팅이 심하다. 수요미식회에도 나왔고, 동네 주민에게 들어보니 원래 목포집이 진짜 원조였고 워낙 장사가 잘 되어 주변 식당들이 생겼다고 함.  여튼 가을철은 숫게철이고 살이 완전히 올랐다. 사실 게의 크기가 막 크지는 않은데 살수율이 매우 높고 신선도가 높아 살이 정말 부드럽고 담백하며 과다한 짠 맛이나 질긴 식감 등은 전혀 없다.  담백하게 그냥 찜으로 먹어도 좋지만, 여기 양념맛이 많이 자극적이지 않다고 하여 양념꽃게찜(중)으로 주문, 게는 크게 3마리를 썼던데 껍딱지는 뜯었고 허파쪽은 잘 제거한 다음 몸통을 반으로 갈라낸다.  위에서도 썼지만 제철 숫게 살은 정말 젓가락으로 툭툭 치면 후두둑 털려 나올 정도록 꽉찼더라.',
        views: 30,
        likes: 4,
        user_id: 1,
      },
      {
        title: 'post2 title',
        store_name: 'goggi house',
        location: 'post2 location',
        content:
          'post2 content\n▪이날 준비된 고기는 안심, 채끝, 안심 추리, 치마살, 업진살, 안창살, 제비추리, 살치살 + 시오 타래(소금 양념), 갈비살로 완전 이거다 싶은 건 사실 멏 개 없었지만 노련한 서버님의 스킬과 의심할 여지없이 좋은 고기의 퀄리티 덕분에 전반적으로 높은 만족감이었던!  ▪간장베이스 육회 + 노른자, 이탈리아 스타일 햄: 아뮤즈는 와-앙이 국룰 ▪클래식 시저샐러드 엔초비 드레싱: 멸치가 엄청 크고 씹혀서 개인적으론 딱히 기억에 남지 않는다 ▪노루궁뎅이버섯튀김: 맛있고 귀여워!  ▪가츠샌드: 이쯤 되니 배불렀는데 안 먹을 수 있나?  ▪밥과 함께 나온 청어알 젓갈, 미더덕젓갈, 파김치. 쌀이 좋아서인지 밥이 맛있고 사골육수와 함께 먹으니 정말 b',
        views: 300,
        likes: 41,
        user_id: 2,
      },
      {
        title: 'post3 title',
        store_name: 'the plate',
        location: 'post3 location',
        content:
          'post3 content\n더현대서울 지하1층 푸드코트 한쪽에 자리잡은 더플레이트디저트~ 주말엔 당연히 사람이 바글바글한데...평일에도 자리잡기가 어렵네요~ 전용 테이블 공간이 있음에도~ 다른 음식을 갖고와 앉아있는분들도 있고, 먹지도 않는데 어린애들을 데리고 앉아 있거나 나이가 많은분들이 앉아 있는 경우도 있어서 자리 구하는게 더 힘든것 같아요~ 보통은 담당직원이 얘기를해서 자리 마련해주면 좋을텐데...그렇게까지 관리를 하진 않는 느낌이라 손님입장에서 얘기하기도 난감하더라구요~ 다른거 다 떠나서 디저트만 말씀드린다면, 가격대도 좋은편이고, 맛도 좋아요~ 생활의달인에도 나왔던 밀푀유 슈는 꼭 한번 드셔보시구요~ 그외에 다양한 맛의 슈가 있으니 취향에 맞게 선택하셔도 만족스러울거라 생각해요^^ 주문과 동시에 크림을 넣어주시니 겉이 여전히 크리스피하게 바삭해서 무너지지 않아 좋습니다.  다쿠아즈도 막 부서지지않고, 적당히 단단함과 쫀득함이 느껴져서 커피와 딱 어울리네요~ 슈 외에도 다양한 베이커리가 준비되어 있는데...소금빵이나 대파빵, 크루아상 등 여러가지의 메뉴들도 기본은 하는 곳이니 충분히 인기 있을 디저트 맛집이라 생각해요~',
        views: 5,
        likes: 1,
        user_id: 3,
      },
      {
        title: 'post4 title',
        store_name: 'daegu dessert cafe',
        location: 'post4 location',
        content:
          'post4 content\n동성로에 위치한 디저트 카페인데 요기 사장님 부부가 르꼬르동 블루 교수, 학생출신이라고 하시더라구요!  파티때 먹으려고 남아있는 디저트들 거의 쓸어왔는데 보기에도 예쁘지만 하나하나 다 맛있었어요!  케익이나 에끌레어도 맛있었는데 오랑쥬 쇼콜라도 취향저격...  조금 늦은 낮시간에 가서 남아있는 디저트가 별로 없어서 거의 선택의 여지 없이 사온거라 아쉽긴 하지만 다 맛있었어요:',
        views: 30,
        likes: 4,
        user_id: 4,
      },
      {
        title: 'post5 title',
        store_name: 'sausage house',
        location: 'post5 location',
        content:
          'post5 content\n정릉에 위치한 샤퀴테리 전문점 도이칠란드 박입니다. 수제 소세지와 함께 샤퀴테리를 직접 만들어 합리적인 가격으로 판매하는 곳인데요. 접근성이 안 좋아 맘 먹고 가야하는 곳이지만 한번 맛보면 절대 잊을 수 없을 거예요.  한옥 분위기에 폴란드식 소시지 플레이트, 코젤 다크 맥주, 잠봉 뵈르 샌드위치라니! 이 조합만으로도 가볼만 한 가치가 있어요. 특히 칼바사 소시지는 육즙이 풍부하고 고기 입자가 굵어 씹는 맛이 풍성해요. 게다가 크리스마스 & 연말 파티 플래터를 판매해 홈파티용으로도 딱이에요. 치즈부터 파스트라미, 칼바사 오리지널 등 아주 풍성한 구성을 편리하게 즐길 수 있답니다. 픽업이나 택배도 가능하다니 공식 인스타그램을 참고하세요.',
        views: 3990,
        likes: 104,
        user_id: 1,
      },
    ])
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
