<template>
  <div class="card-container">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title='总销售额' count="￥ 126560">
            <template slot="charts">
              <span v-html="'周同比&nbsp;&nbsp;&nbsp;56.67%'">
              </span>
              <svg t="1650335036469" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2601" width="16" height="16"><path d="M325.456471 862.280661" p-id="2602" fill="#1afa29"></path><path d="M882.057788 862.280661" p-id="2603" fill="#1afa29"></path><path d="M236.028491 877.160382" p-id="2604" fill="#1afa29"></path><path d="M960.132455 877.160382" p-id="2605" fill="#1afa29"></path><path d="M63.683483 788.736998" p-id="2606" fill="#1afa29"></path><path d="M958.469023 788.736998" p-id="2607" fill="#1afa29"></path><path d="M64.77753 858.792098" p-id="2608" fill="#1afa29"></path><path d="M861.417121 738.727375c41.604731 0 65.233383-54.963795 34.928639-85.258218L547.071415 304.191372c-20.029996-20.031716-49.822121-20.031716-69.853837 0L127.955275 653.469157c-31.085714 31.073673-5.136514 85.258218 35.441258 85.258218L861.417121 738.727375 861.417121 738.727375z" p-id="2609" fill="#1afa29"></path><path d="M959.523505 858.792098" p-id="2610" fill="#1afa29"></path></svg>
              <span v-html="'日同比&nbsp;&nbsp;&nbsp;19.96%'"></span>
              <svg t="1650335221326" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3052" width="16" height="16"><path d="M325.456471 862.280661" p-id="3053" fill="#d81e06"></path><path d="M882.057788 862.280661" p-id="3054" fill="#d81e06"></path><path d="M236.028491 877.160382" p-id="3055" fill="#d81e06"></path><path d="M960.132455 877.160382" p-id="3056" fill="#d81e06"></path><path d="M63.683483 788.736998" p-id="3057" fill="#d81e06"></path><path d="M958.469023 788.736998" p-id="3058" fill="#d81e06"></path><path d="M64.77753 858.792098" p-id="3059" fill="#d81e06"></path><path d="M163.396533 289.168875c-40.577772 0-66.525252 54.184545-35.441258 85.258218L477.217578 723.704878c20.031716 20.031716 49.823841 20.031716 69.853837 0l349.274345-349.277785c30.304744-30.294423 6.677812-85.258218-34.928639-85.258218L163.396533 289.168875 163.396533 289.168875z" p-id="3060" fill="#d81e06"></path><path d="M959.523505 858.792098" p-id="3061" fill="#d81e06"></path></svg>
            </template>
            <template slot='footer'>
              <span>日销售额￥ 123456</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <LineChart />
            </template>
            <template slot='footer'>
              <span>日访问量 1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
              <BarCharts />
            </template>
            <template slot='footer'>
              <span>转化率 65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail  title="运营活动效果" count="78%">
            <template slot="charts">
              <ProgressCharts />
            </template>
            <template slot='footer'>
              <span>
                周同比 12%
                <svg t="1650335221326" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3052" width="16" height="16"><path d="M325.456471 862.280661" p-id="3053" fill="#d81e06"></path><path d="M882.057788 862.280661" p-id="3054" fill="#d81e06"></path><path d="M236.028491 877.160382" p-id="3055" fill="#d81e06"></path><path d="M960.132455 877.160382" p-id="3056" fill="#d81e06"></path><path d="M63.683483 788.736998" p-id="3057" fill="#d81e06"></path><path d="M958.469023 788.736998" p-id="3058" fill="#d81e06"></path><path d="M64.77753 858.792098" p-id="3059" fill="#d81e06"></path><path d="M163.396533 289.168875c-40.577772 0-66.525252 54.184545-35.441258 85.258218L477.217578 723.704878c20.031716 20.031716 49.823841 20.031716 69.853837 0l349.274345-349.277785c30.304744-30.294423 6.677812-85.258218-34.928639-85.258218L163.396533 289.168875 163.396533 289.168875z" p-id="3060" fill="#d81e06"></path><path d="M959.523505 858.792098" p-id="3061" fill="#d81e06"></path></svg>
              </span>
              <span>
                日同比 11%
                <svg t="1650335036469" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2601" width="16" height="16"><path d="M325.456471 862.280661" p-id="2602" fill="#1afa29"></path><path d="M882.057788 862.280661" p-id="2603" fill="#1afa29"></path><path d="M236.028491 877.160382" p-id="2604" fill="#1afa29"></path><path d="M960.132455 877.160382" p-id="2605" fill="#1afa29"></path><path d="M63.683483 788.736998" p-id="2606" fill="#1afa29"></path><path d="M958.469023 788.736998" p-id="2607" fill="#1afa29"></path><path d="M64.77753 858.792098" p-id="2608" fill="#1afa29"></path><path d="M861.417121 738.727375c41.604731 0 65.233383-54.963795 34.928639-85.258218L547.071415 304.191372c-20.029996-20.031716-49.822121-20.031716-69.853837 0L127.955275 653.469157c-31.085714 31.073673-5.136514 85.258218 35.441258 85.258218L861.417121 738.727375 861.417121 738.727375z" p-id="2609" fill="#1afa29"></path><path d="M959.523505 858.792098" p-id="2610" fill="#1afa29"></path></svg>
              </span>
            </template>
          </Detail>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import Detail from './Detail';
import LineChart from './LineChart';
import BarCharts from './BarCharts';
import ProgressCharts from './ProgressCharts';
export default {
  name:'Card',
  components:{Detail,LineChart,BarCharts,ProgressCharts}
}
</script>

<style>

</style>