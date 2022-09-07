import { defineComponent, PropType } from "vue";

import BizMain from "./pages/BizMain.vue";

const App = defineComponent({
  components: {
    [BizMain.name]: BizMain,
  },
  props: {
    success: { type: String },
    callback: {
      type: Function as PropType<() => void>
    }
  },
  data() {
    return {
      canRender: false as boolean,
    }
  },
  computed: {

  },
  created() {
    this.canRender = true;
  },
  destroyed() {

  }
});

export default App;