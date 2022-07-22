<template>
  <div style="padding: 30px">
    <a-typography-title :level="3">儀錶板</a-typography-title>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-card title="前台訪問人數" :bordered="false">
          <template #extra>
            <a-select
              ref="select"
              v-model:value="visit"
              style="width: 80px"
              @change="handleVisitChange"
            >
              <a-select-option value="day">天</a-select-option>
              <a-select-option value="month">月</a-select-option>
              <a-select-option value="year">年</a-select-option>
            </a-select></template
          >
          <BarChart :chartData="visitData" />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="性別比例" :bordered="false">
          <template #extra>
            <a-select
              ref="select"
              v-model:value="sex"
              style="width: 80px"
              @change="handleSexChange"
            >
              <a-select-option value="day">天</a-select-option>
              <a-select-option value="month">月</a-select-option>
              <a-select-option value="year">年</a-select-option>
            </a-select></template
          >
          <PieChart :chartData="sexData" />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="註冊人數" :bordered="false">
          <template #extra>
            <a-select
              ref="select"
              v-model:value="register"
              style="width: 80px"
              @change="handleRegisterChange"
            >
              <a-select-option value="day">天</a-select-option>
              <a-select-option value="month">月</a-select-option>
              <a-select-option value="year">年</a-select-option>
            </a-select></template
          >
          <LineChart :chartData="registerData" />
        </a-card>
      </a-col>

      <a-col :span="12">
        <a-card title="訪問位置" :bordered="false">
          <template #extra>
            <a-select
              ref="select"
              v-model:value="location"
              style="width: 80px"
              @change="handleLocationChange"
            >
              <a-select-option value="day">天</a-select-option>
              <a-select-option value="month">月</a-select-option>
              <a-select-option value="year">年</a-select-option>
            </a-select></template
          >
          <DoughnutChart :chartData="locationData" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import BarChart from "./bar";
import PieChart from "./pie";
import LineChart from "./line";
import DoughnutChart from "./doughnut";
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  components: {
    BarChart,
    PieChart,
    LineChart,
    DoughnutChart,
  },
  setup() {
    const colors = ref<string[]>([
      "#FA675C",
      "#31A4FF",
      "#FFC15E",
      "#42C3AF",
      "#1C9399",
      "#D2D2D2",
      "#404040",
    ]);
    let visit = ref<string>("day");
    let visitData = reactive<any>({ labels: [], datasets: [] });
    let sex = ref<string>("day");
    let sexData = reactive<any>({ labels: ["男", "女"], datasets: [] });
    let register = ref<string>("day");
    let registerData = reactive<any>({ labels: [], datasets: [] });
    let location = ref<string>("day");
    let locationData = reactive<any>({
      labels: ["臺北市", "新北市", "桃園市", "臺中市", "臺南市", "高雄市","其他"],
      datasets: [],
    });
    const getDate = (time: string) => {
      let timeArr = [];
      let today = new Date().getTime();
      for (let i = 0; i < 7; i++) {
        if (time === "day") {
          let day = new Date(today - i * 86400000);
          timeArr.push(
            (day.getMonth() + 1).toString() +
              "/" +
              day.getDate().toString() +
              "日"
          );
        } else if (time === "month") {
          timeArr.push(
            (new Date(today - i * 2592000000).getMonth() + 1).toString() + "月"
          );
        } else if (time === "year") {
          timeArr.push(
            new Date(today - i * 31536000000).getFullYear().toString() + "年"
          );
        }
      }
      return timeArr.reverse();
    };
    const getData = (time: string) => {
      let data = [],
        max = 0,
        min = 0;
      switch (time) {
        case "day":
          min = 0;
          max = 100;
          break;
        case "month":
          min = 1000;
          max = 3000;
          break;
        case "year":
          min = 10000;
          max = 36500;
          break;
      }

      for (let i = 0; i < 7; i++) {
        data.push(Math.floor(Math.random() * max) + min);
      }
      return data;
    };
    const handleVisitChange = (time: string) => {
      visitData.labels = getDate(time);
      visitData.datasets = [
        {
          backgroundColor: colors.value,
          data: getData(time),
        },
      ];
    };
    const handleSexChange = (time: string) => {
      let man = 0,
        male = 0,
        min = 0,
        max = 0;
      switch (time) {
        case "day":
          min = 0;
          max = 100;
          break;
        case "month":
          min = 1000;
          max = 3000;
          break;
        case "year":
          min = 10000;
          max = 36500;
          break;
      }
      for (let i = 0; i < 7; i++) {
        man += Math.floor(Math.random() * max) + min;
        male += Math.floor(Math.random() * max) + min;
      }
      sexData.datasets = [
        {
          backgroundColor: colors.value,
          data: [man, male],
        },
      ];
    };
    const handleRegisterChange = (time: string) => {
      registerData.labels = getDate(time);
      registerData.datasets = [
        {
          backgroundColor: colors.value,
          data: getData(time),
        },
      ];
    };
    const handleLocationChange = (time: string) => {
      locationData.datasets = [
        {
          backgroundColor: colors.value,
          data: getData(time),
        },
      ];
    };
    handleVisitChange("day");
    handleSexChange("day");
    handleRegisterChange("day");
    handleLocationChange("day");
    return {
      visit,
      sex,
      register,
      location,
      handleSexChange,
      handleVisitChange,
      handleRegisterChange,
      handleLocationChange,
      visitData,
      sexData,
      registerData,
      locationData,
    };
  },
});
</script>