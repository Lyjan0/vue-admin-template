<template>
  <div class="line-charts">
    <div class="header">
      <span>搜索用户数 <i class="el-icon-info"></i></span>
    </div>
    <div class="main">
      <span class="main-count">12321</span>
      <span class="main-content">17.1</span>
      <svg t="1650335036469" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2601" width="16" height="16"><path d="M325.456471 862.280661" p-id="2602" fill="#1afa29"></path><path d="M882.057788 862.280661" p-id="2603" fill="#1afa29"></path><path d="M236.028491 877.160382" p-id="2604" fill="#1afa29"></path><path d="M960.132455 877.160382" p-id="2605" fill="#1afa29"></path><path d="M63.683483 788.736998" p-id="2606" fill="#1afa29"></path><path d="M958.469023 788.736998" p-id="2607" fill="#1afa29"></path><path d="M64.77753 858.792098" p-id="2608" fill="#1afa29"></path><path d="M861.417121 738.727375c41.604731 0 65.233383-54.963795 34.928639-85.258218L547.071415 304.191372c-20.029996-20.031716-49.822121-20.031716-69.853837 0L127.955275 653.469157c-31.085714 31.073673-5.136514 85.258218 35.441258 85.258218L861.417121 738.727375 861.417121 738.727375z" p-id="2609" fill="#1afa29"></path><path d="M959.523505 858.792098" p-id="2610" fill="#1afa29"></path></svg>
      <svg t="1650335221326" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3052" width="16" height="16"><path d="M325.456471 862.280661" p-id="3053" fill="#d81e06"></path><path d="M882.057788 862.280661" p-id="3054" fill="#d81e06"></path><path d="M236.028491 877.160382" p-id="3055" fill="#d81e06"></path><path d="M960.132455 877.160382" p-id="3056" fill="#d81e06"></path><path d="M63.683483 788.736998" p-id="3057" fill="#d81e06"></path><path d="M958.469023 788.736998" p-id="3058" fill="#d81e06"></path><path d="M64.77753 858.792098" p-id="3059" fill="#d81e06"></path><path d="M163.396533 289.168875c-40.577772 0-66.525252 54.184545-35.441258 85.258218L477.217578 723.704878c20.031716 20.031716 49.823841 20.031716 69.853837 0l349.274345-349.277785c30.304744-30.294423 6.677812-85.258218-34.928639-85.258218L163.396533 289.168875 163.396533 289.168875z" p-id="3060" fill="#d81e06"></path><path d="M959.523505 858.792098" p-id="3061" fill="#d81e06"></path></svg>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name:'LineCharts',
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
            color: "skyblue",
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
                  color: "skyblue", // 0% 处的颜色
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
}
</script>

<style scoped>
.line-charts{
  margin-bottom: 20px;
}
.main{
  margin: 10px 0;
}
.main-count{
  margin-right: 30px;
}
.main-content{
  margin-right: 10px;
}
.footer .charts{
  width: 100%;
  height: 50px;
}
</style>