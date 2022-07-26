<template>
  <div style="padding: 30px">
    <a-typography-title :level="3">數據管理</a-typography-title>
    <a-card
      ><a-button @click="showForm('add')">新增</a-button>
      <a-table
        style="margin-top: 10px"
        :bordered="true"
        :columns="title"
        :data-source="data.list"
      >
        <template v-slot:bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <a-popconfirm
              :title="`是否確定要刪除系統編號 ${record.id} ?`"
              @confirm="deleteItem(record.id)"
            >
              <a>刪除</a>
            </a-popconfirm>
            <a style="margin-left: 10px" @click="modifyItem(record.id)">修改</a>
          </template>
        </template>
      </a-table></a-card
    >
    <FormWindow
      :isShowForm="isShowForm"
      :type="formType"
      :id="formID"
      @hideForm="hideForm"
      @refreshData="getData"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import FormWindow from "./form.vue";

export default defineComponent({
  components: { FormWindow },
  setup() {
    const isShowForm = ref<boolean>(false);
    const formType = ref<string>("");
    const formID = ref<string>("");
    const title = reactive<any[]>([
      {
        title: "系統編號",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "會員帳號",
        dataIndex: "account",
        key: "account",
      },
      {
        title: "會員名稱",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "電子信箱",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "聯絡電話",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "建立時間",
        dataIndex: "create_time",
        key: "create_time",
      },
      {
        title: "修改時間",
        dataIndex: "modify_time",
        key: "modify_time",
      },
      {
        title: "操作",
        dataIndex: "operation",
      },
    ]);
    let data = reactive<any>({ list: [] });
    const getData = () => {
      if (!localStorage.data) {
        localStorage.data = JSON.stringify([
          {
            id: "1",
            account: "john",
            name: "John Brown",
            email: "john@gmail.com",
            phone: "0932526595",
            create_time: "2022-07-25 01:55:32",
            modify_time: "2022-07-25 02:42:25",
          },
        ]);
        localStorage.dataID = 1;
      }
      data.list = JSON.parse(localStorage.data);
    };
    getData();
    const hideForm = () => {
      isShowForm.value = false;
    };
    const showForm = (type: string) => {
      (formType.value = type), (isShowForm.value = true);
    };
    const deleteItem = (id: string) => {
      let list = JSON.parse(localStorage.data);
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          list.splice(i, 1);
        }
      }
      localStorage.data = JSON.stringify(list);
      data.list = list;
    };
    const modifyItem = (id: string) => {
      formID.value = id;
      showForm("modify");
    };
    return {
      isShowForm,
      showForm,
      hideForm,
      deleteItem,
      modifyItem,
      title,
      formID,
      formType,
      data,
      getData,
    };
  },
});
</script>