<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!--  @tab-click="handleClick" -->
      <!-- 头部左侧内容 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="first"> </el-tab-pane>
        <el-tab-pane label="访问量" name="second"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          v-model="date"
          class="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 内容 -->
    <div class="contnt">
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6">
          <h3>门店{{ title }}排名</h3>
          <ul>
            <li>
              <span class="rindex">1</span>
              <span>肯德基</span>
              <span class="rvalue">12345</span>
            </li>
            <li>
              <span class="rindex">2</span>
              <span>肯德基</span>
              <span class="rvalue">12345</span>
            </li>
            <li>
              <span class="rindex">3</span>
              <span>肯德基</span>
              <span class="rvalue">12345</span>
            </li>
            <li>
              <span class="rindex">4</span>
              <span>肯德基</span>
              <span class="rvalue">12345</span>
            </li>
            <li>
              <span class="rindex">5</span>
              <span>肯德基</span>
              <span class="rvalue">12345</span>
            </li>
            <li>
              <span class="rindex">6</span>
              <span>肯德基</span>
              <span class="rvalue">12345</span>
            </li>
            <li>
              <span class="rindex">7</span>
              <span>肯德基</span>
              <span class="rvalue">12345</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "first",
      charts: null,
      // 收集日历
      date: [],
    };
  },
  mounted() {
    // 初始化echarts
    this.charts = echarts.init(this.$refs.charts);
    // 配置
    this.charts.setOption({
      title: {
        text: `${this.title}趋势`,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWidthLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 100, 334, 225, 390, 241, 123, 98, 167, 44, 88],
        },
      ],
    });
  },
  computed: {
    title() {
      return this.activeName == "first" ? "销售额" : "访问量";
    },
  },
  watch: {
    title() {
      this.charts.setOption({
        title: {
          text: this.title + "趋势",
        },
      });
    },
  },
  methods: {
    // 本日
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day,day];
    },
    // 本周
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      // console.log(start,end);
      this.date = [start, end];
    },
    // 本月
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    // 本年
    setYear(){
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    }
  },
};
</script>

<style scoped>
.box-card {
  margin-top: 10px;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.right span {
  margin-right: 15px;
}
.date {
  width: 250px;
  margin: 0 20px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li {
  height: 8%;
  margin: 10px 0;
}
ul li span {
  margin: 0 10px;
}
.rindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  text-align: center;
  font-size: 12px;
  color: aliceblue;
}
.rvalue {
  float: right;
}
</style>