import regeneratorRuntime from "../../../utils/runtime.js";
const app = getApp();
Page({
  data: {
    active: "打卡时间",
    avatar: "",
    currentUserIndex: -1,
    list: [],
    activeBtn: "全校",
    game: [],
    showSlider: false,
    activeGameIndex: -1
  },
  onLoad: function() {
    let { avatar, id } = app.globalData.userInfo;
    let game = app.globalData.game_list.reduce((curr, next) => {
      curr.push({
        id: next.id,
        name: next.name
      });
      return curr;
    }, []);
    this.getList(1);
    this.setData({
      avatar,
      game
    });
  },
  getList: async function(type, gameid) {
    let { token, id } = app.globalData.userInfo;
    let data = {
      ranking_type: type
    };
    gameid ? (data.game_id = gameid) : null;
    let result = await app.wxRequest({
      url: "/api/wxapp.game/rankingList",
      data: data,
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
      currentUserIndex: currentIndex === undefined ? -1 : currentIndex
    });
  },
  // 选择列表类型
  selectListType(e) {
    let type = e.currentTarget.dataset.type;
    let btnname = e.currentTarget.dataset.btnname;
    this.setData({
      active: type == 1 ? "打卡时间" : "成绩",
      activeBtn: btnname || "全校"
    });
    if (type) {
      this.getList(type);
    }
    this.closeSlider();
  },
  // 点击单项排名
  singleList(e) {
    let btnname = e.currentTarget.dataset.btnname;
    this.setData({
      activeBtn: btnname || "全校",
      showSlider: !this.data.showSlider
    });
  },
  getSingleList(e) {
    let type = e.currentTarget.dataset.type,
      id = e.currentTarget.dataset.id;
    this.setData({
      showSlider: false,
      activeGameIndex: id
    });
    this.getList(type, id);
  },
  closeSlider() {
    this.setData({
      showSlider: false
    });
  }
});
