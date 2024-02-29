<template>
    <div>
        <el-row>
            <el-col :span="6">
                <each-month-calendar month="2024-01-01"></each-month-calendar>
            </el-col>
            <el-col :span="6">
                <each-month-calendar month="2024-02-01"></each-month-calendar>
            </el-col>
            <el-col :span="6">
                <each-month-calendar month="2024-03-01"></each-month-calendar>
            </el-col>
            <el-col :span="6">
                <each-month-calendar month="2024-04-01"></each-month-calendar>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <each-month-calendar month="2024-05-01"></each-month-calendar>
            </el-col>
            <el-col :span="6">
                <each-month-calendar month="2024-06-01"></each-month-calendar>
            </el-col>
            <el-col :span="6">
                <each-month-calendar month="2024-07-01"></each-month-calendar>
            </el-col>
            <el-col :span="6">
                <each-month-calendar month="2024-08-01"></each-month-calendar>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <each-month-calendar month="2024-09-01"></each-month-calendar>
            </el-col>
            <el-col :span="6">
                <each-month-calendar month="2024-10-01"></each-month-calendar>
            </el-col>
            <el-col :span="6">
                <each-month-calendar month="2024-11-01"></each-month-calendar>
            </el-col>
            <el-col :span="6">
                <each-month-calendar month="2024-12-01"></each-month-calendar>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import EachMonthCalendar from '../components/EachMonthCalendar.vue';
import { ElRow, ElCol } from 'element-plus';
export default {
    components:{
        EachMonthCalendar,
        ElRow,
        ElCol,
    },  
    data() {
        return {
            
        };
    },
};
</script>

