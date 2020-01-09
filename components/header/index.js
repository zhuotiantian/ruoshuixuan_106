const app = getApp();
Component({
  properties: {
    isResult: { type: Boolean, value: false }, // 是否为结果页面
    showTips: { type: Boolean, value: false }, // 是否显示操作提示按钮
    showType: { type: Boolean, value: false }, // 是否显示显示方式按钮
    showCountdown: { type: Boolean, value: false }, // 是否显示倒计时
    startAnwserText: { type: Boolean, value: false }, // 是否显示开始作答字样
    showGameLevel: { type: Boolean, value: false }, // 是否显示游戏等级
    showChangePageBtn: { type: Boolean, value: false }, // 是否显示下一页按钮
    showFinishMemoryBtn: { type: Boolean, value: false }, // 是否显示记忆完成按钮
    showFinishAnwserBtn: { type: Boolean, value: false } // 是否显示作答完成按钮
  },
  data: {
    time: {
      hour: 1,
      minutes: 0,
      seconds: 0
    },
    gameLevel: "",
    showPrevPage: false
  },
  methods: {
    // 点击帮助
    help() {
      this.triggerEvent("help");
    },
    // 点击操作提示
    showTipsHandler() {},
    // 点击显示方式
    showTipsHandler() {},
    // 点击下一页
    nextPage() {},
    // 点击上一页
    prevPage() {},
    // 点击记忆完成按钮
    finishMemary() {},
    // 点击作答完成按钮
    finishAnwser() {}
  }
});
