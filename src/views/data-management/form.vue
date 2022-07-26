<template>
  <a-modal
    :visible="isShowForm"
    :title="type === 'add' ? '新增數據' : '修改數據'"
    @cancel="hideForm()"
    :footer="null"
    :destroyOnClose="true"
  >
    <a-form
      :model="formData.data"
      ref="formRef"
      :rules="rules"
      @finish="onFinish"
    >
      <a-form-item label="會員帳號" name="account">
        <a-input v-model:value="formData.data.account" />
      </a-form-item>
      <a-form-item label="會員名稱" name="name">
        <a-input v-model:value="formData.data.name" />
      </a-form-item>
      <a-form-item label="電子信箱" name="email">
        <a-input v-model:value="formData.data.email" />
      </a-form-item>
      <a-form-item label="聯絡電話" name="phone">
        <a-input v-model:value="formData.data.phone" />
      </a-form-item>
      <a-form-item>
        <a-button style="margin-left: 80px" type="primary" html-type="submit"
          >送出</a-button
        >
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { watch, defineComponent, reactive, ref } from "vue";
export default defineComponent({
  props: {
    isShowForm: {
      type: Boolean,
    },
    type: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  setup(props, context) {
    watch(
      () => props.isShowForm,
      (newVal) => {
        if (newVal) {
          if (props.type === "add") {
            formData.data = {};
          } else if (props.type === "modify") {
            let list = JSON.parse(localStorage.data);
            for (let i = 0; i < list.length; i++) {
              if (list[i].id == props.id) {
                formData.data = list[i];
              }
            }
          }
        }
      }
    );
    const formRef = ref();
    const formData = reactive<any>({
      data: {
        id: "",
        account: "",
        name: "",
        email: "",
        phone: "",
        create_time: "",
        modify_time: "",
      },
    });

    const hideForm = () => {
      context.emit("hideForm");
      formRef.value.resetFields();
    };
    const rules = {
      account: {
        required: true,
        message: "請輸入會員帳號",
      },
      name: {
        required: true,
        message: "請輸入會員名稱",
      },
      email: {
        required: true,
        message: "請輸入電子信箱",
      },
      phone: {
        required: true,
        message: "請輸入會員帳號",
      },
    };
    const onFinish = () => {
      let data = JSON.parse(localStorage.data);
      let t = new Date();
      if (props.type === "add") {
        let nextDataID = parseInt(localStorage.dataID) + 1;
        localStorage.dataID = nextDataID;
        data.push({
          id: nextDataID.toString(),
          account: formData.data.account,
          name: formData.data.name,
          email: formData.data.email,
          phone: formData.data.phone,
          create_time: getTime(t),
          modify_time: getTime(t),
        });
      } else if (props.type === "modify") {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id == props.id) {
            data[i] = formData.data;
          }
        }
      }
      localStorage.data = JSON.stringify(data);
      context.emit("refreshData");
      hideForm();
    };
    const getTime = (t: any) => {
      return `${t.getFullYear()}-${padZero(t.getMonth() + 1)}-${padZero(
        t.getDate()
      )} ${padZero(t.getHours())}:${padZero(t.getMinutes())}:${padZero(
        t.getSeconds()
      )}`;
    };
    const padZero = (number: number) => {
      return number.toString().padStart(2, "0");
    };
    return {
      formRef,
      formData,
      onFinish,
      rules,
      hideForm,
    };
  },
});
</script>