import regeneratorRuntime from "../../utils/runtime.js";
const app = getApp();
Page({
  data: {
    domain: app.globalData.URL,
    list: [],
    currentUserIndex: -1,
    avatar: ""
  },
  onLoad: function() {
    this.getList();
  },
  getList: async function() {
    let { user_id, token } = app.globalData.userInfo;
    let result = await app.wxRequest({
      url: "/api/wxapp.game/rankingList",
      data: {
        ranking_type: 1
      },
      method: "GET",
      token
    });
    let currentIndex, user_avatar;
    let list = result.data.reduce((curr, next, index) => {
      let { nickname, avatar } = next;
      if (user_id === next.user_id) {
        currentIndex = index;
        user_avatar = avatar;
      }
      curr.push({
        nickname,
        avatar
      });
      return curr;
    }, []);
    this.setData({
      list,
      currentUserIndex: currentIndex,
      avatar: user_avatar
    });
  }
});
