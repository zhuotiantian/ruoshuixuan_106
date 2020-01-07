import regeneratorRuntime from "../../../utils/runtime.js";
const app = getApp();
Page({
  data: {
    active: "打卡时间",
    avatar: "",
    currentUserIndex: -1,
    list: [],
    activeBtn: "全校"
  },
  onLoad: function() {
    let { avatar, id } = app.globalData.userInfo;
    this.getList(1);
    this.setData({
      avatar
    });
  },
  getList: async function(type) {
    let { token, id } = app.globalData.userInfo;
    let result = await app.wxRequest({
      url: "/api/wxapp.game/rankingList",
      data: {
        ranking_type: type
      },
      token
    });
    let currentIndex;
    let list = result.data.reduce((curr, next, index) => {
      let { nickname, avatar } = next;
      if (id === next.user_id) {
        currentIndex = index;
      }
      curr.push({
        nickname,
        avatar
      });
      return curr;
    }, []);
    this.setData({
      list,
      currentUserIndex: currentIndex
    });
  },
  // 选择列表类型
  selectListType(e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      active: type == 1 ? "打卡时间" : "成绩"
    });
    this.getList(type);
  }
});
