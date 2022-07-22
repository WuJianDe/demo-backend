<template>
  <div style="padding: 30px">
    <a-typography-title :level="3">數據管理</a-typography-title>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-card title="前台訪問人數" :bordered="false">
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  components: {
  },
  setup() {
   
    return {
    };
  },
});
</script>