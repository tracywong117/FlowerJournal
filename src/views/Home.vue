<template>
  <div style="height: 90vh; display: flex; align-items: center; justify-content: center;">
    <div style="display: flex; align-items: center;">
      <el-row :gutter="120">
        <el-col :span="12" :xs="24" :sm="24" :md="12">
          <img src="../assets/Daisy_0_without_background.png" width="600">
        </el-col>
        <el-col :span="12" :xs="24" :sm="24" :md="12">
          <Calendar dt="Oct, 2023"></Calendar>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Calendar from '../components/Calendar.vue';
import { ElRow, ElCol } from 'element-plus';

export default {
  components: {
    Calendar,
    ElRow,
    ElCol,

  }
}

</script>

<style></style>