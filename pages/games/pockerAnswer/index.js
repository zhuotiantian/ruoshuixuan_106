import regeneratorRuntime from "../../../utils/runtime.js";
const app = getApp();
Page({
  data: {
    startAnwserText: true,
    operationType: "",
    hasToOperationPocker: true,
    pocker:[]
  },
  onLoad: function() {
    let pocker = [];
    for (let j = 1; j <= 4; j++) {
      let columns = [];
      for (let i = 1; i <= 13; i++) {
        columns.push({
          show: true,
          selected: false,
          row: j,
          column: i
        });
      };
      pocker.push(columns);
    this.setData({
      startAnwserText: app.globalData.gameId === 1,
      pocker
    });
  }
});
