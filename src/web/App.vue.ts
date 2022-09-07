import { defineComponent } from "vue"


const App = defineComponent({

  data() {
    return {
      count: 0 as number,
      username: "" as string,
      navMenus: []
    }

  },
  created() {

  },
  mounted() {
    // window.onbeforeunload =  (e)=> {
    //     this.unInit();
    //     return "浏览器关闭！";
    // };
    // window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
  },
  destroyed() {
    console.log("hello world");
  }
});

export default App;