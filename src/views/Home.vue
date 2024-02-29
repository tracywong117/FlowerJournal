<template>
  <!-- <div style="height: 90vh; display: flex; align-items: center; justify-content: center;">
    <div style="display: flex; align-items: center;">
      <el-row :gutter="120">
        <el-col :span="12" :xs="24" :sm="24" :md="12">
          <img src="../assets/img/Daisy_0_without_background.png" width="600">
        </el-col>
        <el-col :span="12" :xs="24" :sm="24" :md="12">
          <Calendar dt="Nov, 2023"></Calendar>
        </el-col>
      </el-row>
    </div>
  </div> -->
  <div style="width: 100%;">
    <Calendar></Calendar>
  </div>
</template>

<script>
import Calendar from '../components/CalendarUseDiv.vue';
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