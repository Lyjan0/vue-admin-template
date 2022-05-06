<template>
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "ProgressCharts",
  mounted() {
    // 挂载完初始化echarts
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数据
    lineCharts.setOption({
      xAxis: {
        // 隐藏x轴
        show: false,
        // 最大最小值
        min: 0,
        max: 100

      },
      yAxis: {
        // 隐藏y轴
        show: false,
        // 均分
        type: "category",
      },
      // 系列
      series: [
        {
          type: "bar",
          data: [78],
          // 柱状图的宽度
          barWidth: 10,
          color: 'yellowgreen',

          // 背景颜色设置开启
          showBackground: true,
          // 背景颜色
          backgroundStyle:{
            color:'#eee'
          },

          // 文本
          label:{
            show:true,
            // formatter:'|',
            position:'right',
          }


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