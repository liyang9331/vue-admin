<template>
  <div>
    <div class="alarm_num">
      <el-row>总告警数：8</el-row>
      <el-divider />
      <el-row>睡岗：1</el-row>
      <el-row>抽烟：1</el-row>
      <el-row>摔倒：1</el-row>
      <el-row>玩手机：1</el-row>
      <el-row>未穿工服：1</el-row>
      <el-row>未带口罩：1</el-row>
      <el-row>未带手套：1</el-row>
      <el-row>未带安全帽：1</el-row>
      <el-row>未带护目镜：1</el-row>
      <el-row>未穿反光背心：1</el-row>
    </div>
    <div class="alarm_num">
      <el-row>设备数：8</el-row>
      <el-row>接入监控：8</el-row>
    </div>
    <div class="flex chart">
      <div ref="chartPie" class="chartPie alarm_num"></div>
      <div ref="chartLine" class="chartLine alarm_num"></div>
      <div ref="chartBar" class="chartPie alarm_num"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts"

export default {
  data() {
    return {
      myChartPie: null,
      myChartLine: null,
      myChartBar: null,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getPie()
      this.getLine()
      this.getBar()
    },
    getPie() {
      if (this.myChartPie) {
        echarts.dispose(this.myChartPie)
        this.myChartPie = null
      }
      this.myChartPie = echarts.init(this.$refs.chartPie)
      let option = {
        title: {
          text: '告警级别占比',
          textStyle: {
            color: '#C9CAEC'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '3%',
          left: 'center',
          textStyle: {
            color: '#C9CAEC'
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['30%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '25',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '正常' },
              { value: 735, name: '1 级' },
              { value: 580, name: '2 级' },
              { value: 484, name: '3 级' }
            ]
          }
        ]
      }
      this.myChartPie.setOption(option)
    },
    getLine() {
      if (this.myChartLine) {
        echarts.dispose(this.myChartLine)
        this.myChartLine = null
      }
      this.myChartLine = echarts.init(this.$refs.chartLine)
      let option = {
        title: {
          text: '告警趋势',
          textStyle: {
            color: '#C9CAEC'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          type: 'plain',
          bottom: 0,
          left: 'center',
          textStyle: {
            color: '#C9CAEC'
          },
          data: ['未带口罩', '未带手套', '未穿工服', '未戴护目镜', '未带安全帽', '玩手机', '抽烟', '睡岗', '摔倒', '未穿反光背心']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          name: '(个)',
          type: 'value',
          axisLine: { show: true },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#EFEFEF',
              opacity: 0.2
            }
          }
        },
        series: [
          {
            name: '未带口罩',
            type: 'line',
            data: [10, 12, 1, 3, 9, 2, 10, 5, 6, 7]
          },
          {
            name: '未带手套',
            type: 'line',
            data: [2, 8, 9, 4, 0, 3, 1, 2, 4, 5]
          },
          {
            name: '未带安全帽',
            type: 'line',
            data: [5, 2, 1, 1, 1, 3, 4, 5, 6, 7]
          },
          {
            name: '未穿工服',
            type: 'line',
            data: [3, 3, 3, 4, 9, 0, 2, 7, 8, 9]
          },
          {
            name: '未戴护目镜',
            type: 'line',
            data: [8, 9, 1, 4, 9, 1, 0, 6, 7, 8]
          },
          {
            name: '玩手机',
            type: 'line',
            data: [3, 3, 3, 4, 9, 0, 2, 7, 8, 9]
          },
          {
            name: '抽烟',
            type: 'line',
            data: [8, 9, 1, 4, 9, 1, 0, 6, 7, 8]
          }
        ]
      }
      this.myChartLine.setOption(option)
    },
    getBar() {
      if (this.myChartBar) {
        echarts.dispose(this.myChartBar)
        this.myChartBar = null
      }
      this.myChartBar = echarts.init(this.$refs.chartBar)
      let option = {
        title: {
          text: '事件类型占比',
          textStyle: {
            color: '#C9CAEC'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['摔倒', '未带安全帽', '未穿工服', '未戴护目镜', '未带口罩', '未穿反光背心']
        },
        yAxis: {
          name: '(个)',
          type: 'value',
          axisLine: { show: true },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#EFEFEF',
              opacity: 0.2
            }
          }
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110],
            type: 'bar',
            backgroundStyle: {
              color: "#0c3252"
            },
            "barMaxWidth": "auto",
            "barWidth": 14,
            "itemStyle": {
              barBorderRadius: [10, 10, 0, 0], // 圆角（左上、右上、右下、左下）
              "color": {
                "x": 0,
                "y": 0,
                "x2": 0,
                "y2": 1,
                "type": "linear",
                "global": false,
                "colorStops": [{
                  "offset": 0,
                  "color": "#00F2FE"
                }, {
                  "offset": 1,
                  "color": "#0015D6"
                }]
              }
            },
          }
        ]
      };
      this.myChartBar.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm_num {
  width: 170px;
  padding: 20px;
  background: #17183c;
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.16);
  border-radius: 10px 10px 10px 10px;
  opacity: 1;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #c9caec;
  margin-bottom: 14px;
  .el-row {
    margin-top: 24px;
    &:first-child {
      margin-top: 0px;
    }
  }
}
.chart {
  height: 350px;
  margin-top: 30px;
  .chartPie {
    width: 100%;
    height: 100%;
    // height: 350px;
    flex: 1;
    // width: 420px;
  }
  .chartLine {
    width: 100%;
    height: 100%;
    flex: 2;
    margin: 0 20px;
  }
}
</style>