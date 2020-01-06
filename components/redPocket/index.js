Component({
  properties: {
    showSharePocket: {
      type: Boolean,
      default: false
    },
    showRegisterPocket: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    close_redPocket() {
      if (this.data.showSharePocket) {
        this.triggerEvent("closeSharePocket");
      }
      if (this.data.showRegisterPocket) {
        this.triggerEvent("closeRegPocket");
      }
    },
    getRedPocket() {
      this.triggerEvent("getRedPocket");
    }
  }
});
