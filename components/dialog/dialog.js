Component({
  properties: {
    show: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      value: ""
    }
  },
  methods: {
    close() {
      this.triggerEvent("close");
    }
  }
});
