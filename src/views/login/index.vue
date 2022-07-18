<template>
  <a-layout>
    <a-row
      type="flex"
      justify="center"
      align="middle"
      style="min-height: 100vh"
    >
      <a-col>
        <a-card title="後台管理" style="width: 450px">
          <a-form
            :model="formData"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <a-form-item
              name="account"
              :rules="[{ required: true, message: '請輸入使用者名稱!' }]"
            >
              <a-space direction="vertical" style="width: 100%">
                <label class="input-label">使用者名稱</label>
                <a-input
                  v-model:value.trim="formData.account"
                  size="large"
                  placeholder="請輸入使用者名稱"
                >
                  <template #prefix>
                    <user-outlined style="font-size: 20px" />
                  </template>
                </a-input>
              </a-space>
            </a-form-item>
            <a-form-item
              name="password"
              :rules="[{ required: true, message: '請輸入使用者密碼!' }]"
            >
              <a-space direction="vertical" style="width: 100%">
                <label class="input-label">使用者密碼</label>
                <a-input-password
                  v-model:value.trim="formData.password"
                  size="large"
                  placeholder="請輸入使用者密碼"
                  autocomplete="off"
                >
                  <template #prefix>
                    <lock-outlined style="font-size: 20px" /> </template
                ></a-input-password>
              </a-space>
            </a-form-item>
            <a-form-item style="margin: 0">
              <div style="display: flex; align-items: center">
                <a-checkbox v-model:checked="formData.isRememberLoginData"
                  >記住我的登入資訊</a-checkbox
                >
                <div style="flex: 1"></div>
                <a-button
                  type="primary"
                  size="large"
                  style="width: 90px"
                  html-type="submit"
                  >登入</a-button
                >
              </div>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col></a-row
    >
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import CryptoJS from "@/plugins/crypto.js";
interface FormData {
  account: string;
  password: string;
  isRememberLoginData: boolean;
}
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const router = useRouter();
    const { cookies } = useCookies();
    const formData = reactive<FormData>({
      account: "",
      password: "",
      isRememberLoginData: false,
    });
    if (cookies.get("ac") && cookies.get("pw")) {
      formData.account = CryptoJS.decrypt(cookies.get("ac"));
      formData.password = CryptoJS.decrypt(cookies.get("pw"));
      formData.isRememberLoginData = true;
    }
    const onFinish = () => {
      if (formData.isRememberLoginData) {
        cookies.set("ac", CryptoJS.encrypt(formData.account), "7d");
        cookies.set("pw", CryptoJS.encrypt(formData.password), "7d");
      } else {
        cookies.remove("ac");
        cookies.remove("pw");
      }
      router.push("/");
    };
    const onFinishFailed = (errorInfo: any) => {
      console.log("欄位錯誤:", errorInfo);
    };
    return {
      formData,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>
<style>
.input-label {
  font-size: 16px !important;
}
</style>
