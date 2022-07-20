<template>
  <div style="padding: 30px">
    <a-typography-title :level="3">儀錶板</a-typography-title>
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="前台訪問人數" :bordered="false">
          <template #extra>
            <a-select
              ref="select"
              v-model:value="visit"
              style="width: 80px"
              @change="handleVisitChange"
            >
              <a-select-option :value="7">1周</a-select-option>
              <a-select-option :value="30">1月</a-select-option>
              <a-select-option :value="365">1年</a-select-option>
            </a-select></template
          >
          <BarChart :chartData="visitData" />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="性別比例" :bordered="false">
          <template #extra>
            <a-select
              ref="select"
              v-model:value="sex"
              style="width: 80px"
              @change="handleSexChange"
            >
              <a-select-option :value="7">1周</a-select-option>
              <a-select-option :value="30">1月</a-select-option>
              <a-select-option :value="365">1年</a-select-option>
            </a-select></template
          >
          <PieChart :chartData="sexData" />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="註冊人數" :bordered="false">
          <template #extra>
            <a-select
              ref="select"
              v-model:value="register"
              style="width: 80px"
              @change="handleRegisterChange"
            >
              <a-select-option :value="7">1周</a-select-option>
              <a-select-option :value="30">1月</a-select-option>
              <a-select-option :value="365">1年</a-select-option>
            </a-select></template
          >
          <LineChart :chartData="registerData"/>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import BarChart from "./bar.ts";
import PieChart from "./pie.ts";
import LineChart from "./line.ts";
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  components: {
    BarChart,
    PieChart,
    LineChart,
  },
  setup() {
    let visit = ref<number>(7);
    let visitData = reactive<any>({ labels: [], datasets: [] });
    let sex = ref<number>(7);
    let sexData = reactive<any>({ labels: ["男", "女"], datasets: [] });
    let register = ref<number>(7);
    let registerData = reactive<any>({ labels: [], datasets: [] });
    const handleVisitChange = (day: number) => {
      let timestamp = new Date().getTime();
      let labels = [];
      let data = [];
      for (let i = 0; i < day; i++) {
        let day = new Date(timestamp - i * 86400000);
        labels.push(
          (day.getMonth() + 1).toString() + "/" + day.getDate().toString()
        );
        data.push(Math.floor(Math.random() * 100));
      }
      visitData.labels = labels.reverse();
      visitData.datasets = [
        {
          backgroundColor: "#f87979",
          data: data,
        },
      ];
    };
    const handleSexChange = (day: number) => {
      let man = 0;
      let male = 0;
      for (let i = 0; i < day; i++) {
        man += Math.floor(Math.random() * 100);
        male += Math.floor(Math.random() * 100);
      }
      sexData.datasets = [
        {
          backgroundColor: ["#00D8FF", "#E46651"],
          data: [man, male],
        },
      ];
    };
    const handleRegisterChange = (day: number) => {
      let timestamp = new Date().getTime();
      let labels = [];
      let data = [];
      for (let i = 0; i < day; i++) {
        let day = new Date(timestamp - i * 86400000);
        labels.push(
          (day.getMonth() + 1).toString() + "/" + day.getDate().toString()
        );
        data.push(Math.floor(Math.random() * 10));
      }
      registerData.labels = labels.reverse();
      registerData.datasets = [
        {
          backgroundColor: "#f87979",
          data: data,
        },
      ];
      console.log(registerData);
    };
    handleVisitChange(7);
    handleSexChange(7);
    handleRegisterChange(7);
    return {
      visit,
      sex,
      register,
      handleSexChange,
      handleVisitChange,
      handleRegisterChange,
      visitData,
      sexData,
      registerData
    };
  },
});
</script>