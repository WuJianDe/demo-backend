<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">Demo</div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="/dashboard" @click="toRouter('dashboard')">
          <bar-chart-outlined />
          <span>儀錶板</span>
        </a-menu-item>
        <a-menu-item key="/data-management" @click="toRouter('data-management')">
          <appstore-outlined />
          <span>數據管理</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <div style="flex: 1" />
        <a-avatar :src="userImg" :size="40" style="margin: 0 10px"> </a-avatar>
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent style="font-size: 16px">
            {{ userName }}
            <down-outlined style="margin-right: 20px" />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;" @click="toRouter('login')">登出</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <router-view name="pages" v-if="isRouterAlive" />
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import userImg from "@/assets/images/user.png";
import {
  DownOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import { defineComponent, ref, nextTick } from "vue";
import CryptoJS from "@/plugins/crypto";
export default defineComponent({
  components: {
    DownOutlined,
    BarChartOutlined,
    AppstoreOutlined,
    FileTextOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup() {
    let selectedKeys = ref<string[]>([]);
    let isRouterAlive = ref<boolean>(true);
    const router = useRouter();
    const { cookies } = useCookies();
    let userName = ref<string>();
    if (cookies.get("ac") && cookies.get("pw")) {
      userName = CryptoJS.decrypt(cookies.get("ac"));
    } else {
      router.push("/login");
    }
    const toRouter = (path: string) => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
      router.push(path);
    };
    selectedKeys.value = [router.currentRoute.value.path];

    return {
      isRouterAlive,
      selectedKeys,
      userImg,
      userName,
      collapsed: ref<boolean>(false),
      toRouter,
    };
  },
});
</script>
<style>
.header {
  background: #fff !important;
  padding: 0 !important;
  display: flex;
  vertical-align: middle;
  align-items: center;
}
.logo {
  height: 64px;
  line-height: 64px;
  background: #e09e50;
  color: #fff;
  font-weight: 500;
  text-align: center;
  font-size: 26px;
  letter-spacing: 1px;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #8cbdb9;
}
</style>