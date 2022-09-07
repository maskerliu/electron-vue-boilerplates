import { defineComponent } from "vue";
import { mapGetters } from "vuex";

import DebugPanel from "./components/DebugPanel.vue";

const BizMain = defineComponent({
  name: "BizMain",
  components: {
    DebugPanel
  },
  setup() {

  },
  data() {
    return {
      active: 0,
      navTitle: "",
    }
  },
  created() {
    this.$router.beforeEach((to: any, from: any) => {
      this.navTitle = to.name;
      return true;
    });
  },
  mounted() {
    this.$router.replace("/welcome");
    this.active = 1;
  },
  computed: {
    ...mapGetters(["navBar"])
  },
  methods: {
    onLeftNavBtnClicked() {
      if (this.navBar.leftAction != null) {
        this.navBar.leftAction();
      } else {
        this.$router.go(-1);
      }
    },
    onRightNavBtnClicked() {
      this.navBar.rightAction();
    }
  }
});

export default BizMain;