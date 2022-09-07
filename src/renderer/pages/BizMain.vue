<template>
  <van-row class="full-row">
    <van-nav-bar
      class="drag-bar"
      :title="navBar.title"
      :left-text="navBar.leftText"
      :left-arrow="navBar.showLeft"
      @click-left="onLeftNavBtnClicked"
      @click-right="onRightNavBtnClicked"
      fixed
    >
      <template #right>
        <van-icon
          class="iconfont"
          class-prefix="icon"
          :name="navBar.rightIcon"
          color="grey"
          size="22"
        />
      </template>
    </van-nav-bar>
    <router-view class="biz-content"></router-view>
    <van-tabbar route v-model="active">
      <van-tabbar-item replace to="/feeds">
        <span>首页</span>
        <template #icon>
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="rss-feed"
            size="22"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/discover" dot>
        <span>探索</span>
        <template #icon>
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="discovery"
            size="22"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/pid">
        <span>P&ID</span>
        <template #icon>
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="workflow"
            size="22"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/message" badge="5">
        <span>消息</span>
        <template #icon>
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="message"
            size="22"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/settings" badge="20">
        <span>设置</span>
        <template #icon>
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="setting"
            size="22"
          />
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <debug-panel />
  </van-row>
</template>

<script lang="ts" src="./BizMain.vue.ts"></script>

<style>
.full-row {
  width: 100%;
  height: 100%;
  background: #eee;
  overflow: hidden;
}
.drag-bar {
  width: 100%;
  padding-top: 26px;
  -webkit-app-region: drag;
  background: white;
}
.biz-content {
  width: 100%;
  height: calc(100vh - 122px);
  margin: 72px 0 50px 0;
  background: #f1f2f6;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 4px; 
  height: 4px;
  scrollbar-arrow-color: red;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(125, 125, 125, 0.1);
  -webkit-box-shadow: inset 0 0 5px rgba(125, 125, 125, 0.1);
  background: rgba(0, 0, 0, 0.2);
  scrollbar-arrow-color: red;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(125, 125, 125, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(125, 125, 125, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>
