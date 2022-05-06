<template>
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "BarCharts",
  mounted() {
    // 挂载完初始化echarts
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数据
    lineCharts.setOption({
      xAxis: {
        // 隐藏x轴
        show: false,
        // 均分
        type: "category",
      },
      yAxis: {
        // 隐藏y轴
        show: false,
      },
      // 系列
      series: [
        {
          type: "bar",
          data: [10, 24, 11, 17, 12, 25, 20, 10, 17, 4],
        },
      ],
      // 布局
      grid: {
        left: 0,
        top: 1,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>