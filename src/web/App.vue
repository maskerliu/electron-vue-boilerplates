<template>
  <van-row id="app">
    <van-col style="width: 70px; height: 100vh">
      hello world
    </van-col>
    <van-col
      style="
        width: calc(100vw - 70px);
        height: calc(100vh - 10px);
        background: transparent;
      "
    >
      <div class="header">
        <div class="header-title" >test</div>
        <div class="header-content"></div>
        <div class="header-right">
          <van-button plain >{{ "登录" }}</van-button>
        </div>
      </div>
      <router-view></router-view>
    </van-col>
  </van-row>
</template>

<script lang="ts" src="./App.vue.ts"></script>

<style>
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

#app {
  font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑,
    STHeiti, MingLiu, monospace;
  background: transparent;
  letter-spacing: 1px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.navbar-btn {
  -webkit-app-region: no-drag;
  padding: 2px 10px;
  color: #f1f2f6;
  cursor: pointer;
}

.navbar-btn:hover {
  color: white;
}

.header {
  display: flex;
  align-items: center;
  height: 20px;
  padding: 15px;
  background: #8e44ad;
  color: white;
  -webkit-app-region: drag;
}

.header-title {
  flex: 2;
}

.header-content {
  flex: 7;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header-right {
  align-items: right;
  flex-wrap: nowrap;
  justify-content: flex-end;
}

.header-right-btn {
  -webkit-app-region: no-drag;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  margin-left: 10px;
  padding: 2.5px 1.5px 3px 3px;
  border-radius: 4rem;
  border: 1px solid #d1d1d1;
}

.header-right-btn:hover {
  border-radius: 4rem;
  border: 1px solid white;
}

.bg-border {
  margin: 5px;
  padding: 0;
  border-radius: 8px;
  border: 1px solid #e1e1e1;
  box-shadow: 0px 12px 8px -12px #000;
}
</style>
