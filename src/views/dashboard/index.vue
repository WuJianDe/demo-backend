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
              <a-select-option value="week">1周</a-select-option>
              <a-select-option value="month">1月</a-select-option>
              <a-select-option value="year">1年</a-select-option>
            </a-select></template
          >
          <BarChart :labels="visitLabels" :data="visitData" />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Card title" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Card title" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import BarChart from "./bar.ts";
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  components: {
    BarChart,
  },
  setup() {
    let visitLabels = reactive<string[]>([]);
    let visitData = reactive<number[]>([]);
    const handleVisitChange = (value: string) => {
      let timestamp = new Date().getTime();
      visitData = [];
      visitLabels = [];
      switch (value) {
        case "week":
          for (let i = 0; i < 7; i++) {
            let day = new Date(timestamp - i * 86400000);
            visitLabels.push(
              (day.getMonth() + 1).toString() + "/" + day.getDate().toString()
            );
            visitData.push(Math.floor(Math.random() * 100));
          }
          break;
        case "month":
          console.log("觸發");
          
          for (let i = 0; i < 30; i++) {
            let day = new Date(timestamp - i * 86400000);
            visitLabels.push(
              (day.getMonth() + 1).toString() + "/" + day.getDate().toString()
            );
            visitData.push(Math.floor(Math.random() * 100));
          }
          break;
        case "year":
          break;
      }
      console.log(visitLabels);
      console.log(visitData);
      
      visitLabels.reverse();
    };
    handleVisitChange("week");
    return {
      visit: ref<String>("week"),
      handleVisitChange,
      visitLabels,
      visitData,
    };
  },
});
</script>