import regeneratorRuntime from "../../../utils/runtime.js";
const app = getApp();
Page({
  data: {
    active: "打卡记录",
    list1: [],
    list2: [],
    showPannel: false,
    shareItem: {},
    showAlertBox: false,
    data: {}
  },
  onShareAppMessage: function(res) {
    let { id } = app.globalData.userInfo;
    return {
      path: "pages/firstPage/main?id=" + id,
      title: "来跟我一起玩吧~~",
      success: function() {
        console.log("分享成功");
      },
      error: function() {
        console.log("分享失败");
      }
    };
  },
  onLoad: function() {
    this.getList1();
    this.getList2();
  },
  // 选择列表类型
  selectListType(e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      active: type
    });
  },
  async getList1() {
    let { token } = app.globalData.userInfo;
    let result = await app.wxRequest({
      url: "/api/wxapp.student/punchInRecord",
      token
    });
    for (var i = 0, len = result.data.length; i < len; i++) {
      let init_time = new Date(result.data[i].createtime * 1000);
      let formateTime = init_time.getFullYear() + "-" + (Number(init_time.getMonth() + 1) < 10 ? "0" : "") + Number(init_time.getMonth() + 1) + "-" + (init_time.getDate() + 1 < 10 ? "0" : "") + init_time.getDate();
      result.data[i].createtime = formateTime;
    }
    this.setData({
      list1: result.data
    });
  },
  async getList2() {
    let { token } = app.globalData.userInfo;
    let result = await app.wxRequest({
      url: "/api/wxapp.game/achievement",
      token
    });
    this.setData({
      list2: result.data
    });
  },
  // 点击分享
  toShare(e) {
    this.item = e.currentTarget.dataset.item;
    this.setData({
      showPannel: true
    });
  },
  // 关闭列表
  closeDrop() {
    this.setData({
      showPannel: false,
      showAlertBox: false
    });
  },
  // 显示分享图
  alertBox() {
    this.closeDrop();
    this.createCanvas();
  },
  createCanvas() {
    wx.showLoading({
      title: "生成中"
    });
    let item = this.item,
      domain = app.globalData.URL;
    let { avatar, nickname } = app.globalData.userInfo;
    let canvasWidth = wx.getSystemInfoSync().windowWidth * 0.8,
      canvasHeight = wx.getSystemInfoSync().windowHeight * 0.8;
    let data = {
      background: "#173771",
      width: canvasWidth + "px",
      height: canvasHeight + "px",
      views: [
        {
          type: "image",
          url: avatar,
          css: {
            top: "30rpx",
            left: "30rpx",
            width: "96rpx",
            height: "96rpx",
            borderRadius: "48rpx"
          }
        },
        {
          type: "text",
          text: nickname,
          css: {
            top: "30rpx",
            left: "156rpx",
            fontSize: "40rpx",
            color: "white"
          }
        },
        {
          type: "text",
          text: "给你推荐了一款好玩的游戏《" + item.game + "》",
          css: {
            top: "90rpx",
            left: "156rpx",
            fontSize: "20rpx",
            color: "#999999"
          }
        },
        {
          type: "rect",
          css: {
            top: "200rpx",
            left: "30rpx",
            height: "198rpx",
            width: canvasWidth - 30 + "px",
            color: "#F8B551",
            borderRadius: "20rpx"
          }
        },
        {
          type: "text",
          text: "得分",
          css: {
            top: "230rpx",
            left: "156rpx",
            fontSize: "40rpx",
            color: "#333"
          }
        },
        {
          type: "text",
          text: "排名",
          css: {
            top: "230rpx",
            right: "156rpx",
            fontSize: "36rpx",
            color: "#333"
          }
        },
        {
          type: "text",
          text: String(item.fraction),
          css: {
            top: "300rpx",
            left: "175rpx",
            fontSize: "36rpx",
            color: "#333"
          }
        },
        {
          type: "text",
          text: String(item.ranking),
          css: {
            top: "300rpx",
            right: "175rpx",
            fontSize: "36rpx",
            color: "#333"
          }
        },
        {
          type: "image",
          url: domain + item.img,
          css: {
            top: "450rpx",
            left: "30rpx",
            width: canvasWidth - 30 + "px",
            height: "158rpx",
            borderRadius: "20rpx"
          }
        },
        {
          type: "text",
          text: "快来一起玩吧~",
          css: {
            bottom: "300rpx",
            left: "180rpx",
            fontSize: "36rpx",
            color: "white"
          }
        },
        {
          type: "image",
          url: domain + item.img,
          css: {
            bottom: "60rpx",
            left: "200rpx",
            width: "168rpx",
            height: "168rpx"
          }
        }
      ]
    };
    this.setData({
      data: data
    });
  },
  onImgOk(e) {
    wx.hideLoading();
    this.imagePath = e.detail.path;
    this.setData({
      showAlertBox: true
    });
  },
  imgError(e) {
    console.log(e);
  },
  drawCanvas() {
    let that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.imagePath,
      success: res => {
        wx.showModal({
          title: "已保存到系统相册",
          success: res => {
            this.setData({
              showAlertBox: false
            });
          },
          error: err => {
            if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              wx.openSetting({
                success: result => {
                  that.drawCanvas();
                }
              });
            }
          }
        });
      },
      fail: err => {
        if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          wx.openSetting({
            success: result => {
              that.drawCanvas();
            }
          });
        }
      }
    });
    this.setData({ data: {} }); // 重置,下次点击生成时重新生成
  }
});
