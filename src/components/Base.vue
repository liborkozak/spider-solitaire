<script>
export default {
  name: 'base',
  data() {
    return {
      loc: {}
    };
  },
  created() {
    let cmpName = this.$options.name;
    let loc = this.$store.state.loc;
    let cmpLoc = loc[cmpName];
    if (cmpLoc) {
      this.loc = cmpLoc;
    }
  }
};
</script>