<template>
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineChart",
  mounted() {
    // 挂载完初始化echarts
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数据
    lineCharts.setOption({
      xAxis: {
        // 隐藏x轴
        show: false,
        type: "category",
      },
      yAxis: {
        // 隐藏y轴
        show: false,
      },
      // 系列
      series: [
        {
          type: "line",
          data: [10, 24, 11, 17, 12, 25, 20, 10, 17, 4],
          // 拐点的样式设置
          itemStyle: {
            opacity: 0,
          },
          // 线条的样式
          lineStyle: {
            color: "purple",
          },
          // 区域填充
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
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