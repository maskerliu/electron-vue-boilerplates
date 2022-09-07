import vant from 'vant';
import "@vant/touch-emulator";
import { createApp } from "vue";


import App from "./App.vue";

const app = createApp({
  components: { App },
  template: "<App/>",
});
app.use(vant);
app.mount("#app");