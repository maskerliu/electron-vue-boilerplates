import { reactive } from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { BizMainState, NavBarState } from "./interface";


const state: BizMainState = reactive({
  navBarState: {
    showLeft: false,
    showRight: false,
    title: "",
  },
});

export const getters: GetterTree<BizMainState, any> = {
  navBar() {
    return state.navBarState;
  }
};

// async
export const actions: ActionTree<BizMainState, any> = {
  async updateNavBar(context: any, navBarState: NavBarState) {
    this.commit("setNavBar", navBarState);
  },
};

// sync
export const mutations: MutationTree<BizMainState> = {
  setNavBar(context: any, navBarState: NavBarState) {
    state.navBarState = Object.assign({}, navBarState);

    // set(state, "navBarState", navBarState);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations,
};
