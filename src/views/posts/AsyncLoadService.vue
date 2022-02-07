<script>
export default {
  render(h) {
    return h(
      require("./" + this.app.type + "/" + this.app.page + ".vue").default,
      {
        props: {
          service: "posts",
          type: this.app.type,
        },
      }
    );
  },
  props: {
    app: Object,
    service: { String },
    type: { String },
  },
};
</script>