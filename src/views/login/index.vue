<template>
  <v-container fill-height>
    <v-row class="justify-center">
      <v-col lg="5" md="6" sm="7">
        <v-card elevation="2" outlined>
          <v-form ref="form" lazy-validation>
            <v-card-title class="font-weight-bold justify-center"
              >礼物系统管理后台</v-card-title
            >
            <v-divider width="90%" class="mx-auto" />
            <v-card-text>
              <v-row class="justify-center" no-gutters>
                <v-col cols="10">
                  <label>帐号</label>
                  <v-text-field
                    v-model.trim="account"
                    :rules="rules.account"
                    label="请输入帐号"
                    prepend-inner-icon="mdi-account"
                    outlined
                    dense
                    solo
                    flat
                  />
                </v-col>
              </v-row>
              <v-row class="justify-center" no-gutters>
                <v-col cols="10">
                  <label>密码</label>
                  <v-text-field
                    @click:append="isShow.password = !isShow.password"
                    v-model.trim="password"
                    :append-icon="isShow.password ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="isShow.password ? 'text' : 'password'"
                    :rules="rules.password"
                    label="请输入密码"
                    prepend-inner-icon="mdi-lock"
                    outlined
                    dense
                    solo
                    flat
                  />
                </v-col>
              </v-row>
              <v-row class="justify-center" no-gutters>
                <v-col cols="10">
                  <label>OTP</label>
                  <v-text-field
                    v-model.trim="otp"
                    label="请输入OTP"
                    prepend-inner-icon="mdi-cellphone-lock"
                    outlined
                    dense
                    solo
                    flat
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="px-4 mb-5 mt-2">
              <v-row class="justify-center" no-gutters>
                <v-col cols="10">
                  <v-btn
                    @click="login()"
                    :loading="isLock.login"
                    :disabled="isLock.login"
                    class="login-btn"
                    elevation="0"
                    block
                  >
                    登⼊
                    <template v-slot:loader>
                      <span>登⼊中</span>
                    </template>
                  </v-btn>
                </v-col></v-row
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { apiLogin } from "@/api/login";
export default {
  name: "login",
  data() {
    return {
      rules: {
        account: [(v) => !!v || "请输入帐号"],
        password: [(v) => !!v || "请输入密码"],
      },
      isLock: {
        login: false,
      },
      isShow: {
        password: false,
      },
      account: "vic",
      password: "Vic123",
      otp: "",
    };
  },
  methods: {
    login() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.isLock.login = true;
      let form = new FormData();
      form.append("account", this.account);
      form.append("password", this.password);
      form.append("otp", this.otp);
      apiLogin(form)
        .then((res) => {
          console.log(res.data);
          if (res.data.Status == 0) {
            // 系統警告訊息(例如:三十天尚未更改密碼)
            if (res.data.Data != "") {
              this.$store.commit("message", {
                type: "error",
                content: res.data.Data[0],
              });
            }
            this.$router.push("/");
          } else {
            this.$store.commit("message", {
              content: res.data.ErrorMessage,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log("登入login:", err);
        })
        .finally(() => {
          this.isLock.login = false;
        });
    },
  },
};
</script>
