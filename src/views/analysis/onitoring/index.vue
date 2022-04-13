<template>
  <div class="page">
    <div class="waring-unm">
      <div class="item-from">
        <div class="item" v-for="(item, key) in list[listKey]" :key="key">
          <div class="t1">{{ item.eventName }}</div>
          <div class="t2">{{ item.count }}</div>
        </div>
      </div>
      <!-- 箭头 -->
      <i
        class="el-icon-arrow-right arrow"
        @click="next()"
        v-if="list.length > 10 ? true : false"
      ></i>
    </div>
    <el-row
      :gutter="20"
      class="content-tainer"
      style="width: 100%; margin-top: 20px"
    >
      <el-col :span="17">
        <div class="top">
          <span class="text" style="font-size: 19px; margin-left: 21px"
            >最新告警</span
          >
        </div>
        <div class="left-main">
          <el-image
            :src="waringInfo[0].url"
            fit="cover"
            style="width: 100%; height: 100%"
          />
        </div>
      </el-col>
      <el-col :span="7">
        <div class="top">
          <span class="text" style="font-size: 19px; margin-left: 21px"
            >告警信息</span
          >
        </div>
        <div class="right-main">
          <div class="scrollbar" v-infinite-scroll="load">
            <ul>
              <li class="item" v-for="(item, key) in waringInfo" :key="key">
                <el-row style="width: 100%" type="flex" justify="space-between">
                  <el-col :span="14">
                    <!-- 图片 -->
                    <el-image
                      :src="item.url"
                      fit="cover"
                      style="width: 100%; height: 157px"
                    />
                  </el-col>
                  <el-col :span="9">
                    <div class="tips">
                      <div v-for="(item, key) in item.tips" :key="key">
                        <span style="color: #9d9fd6; margin-right: 5px">{{
                          item.label
                        }}</span>
                        <span style="color: #ffffff">{{ item.value }}</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getAlarmInformation, getRealTimeAlarmStatistics } from "@/api/waring";
import { formatTime } from "@/utils/index";
export default {
  data() {
    return {
      list: [],
      waringInfo: [],
      index: 1,
      size: 10,
      total: 10,
      listKey: 0,
    };
  },
  computed: {},
  mounted() {
    this.statistics();
    this.query();
    // 监听websocket
    const socket = window.socket ? window.socket : false;
    const _this = this;
    if (socket) {
      socket.onmessage((res) => {
        console.log("websocket 来消息啦!");
        _this.query();
      });
    }
  },
  created() {},

  methods: {
    next() {
      if (this.listKey < this.list.length - 1) {
        this.listKey += 1;
      }
    },
    statistics() {
      getRealTimeAlarmStatistics({})
        .then((res) => {
          let array = res.alarmEventCount
          if (res.todayAlarmCount > 10) {
            let arr1 = [];
            let arr2 = [];
            array.forEach((item,key) => {
              if (key <= 9) {
                arr1.push(item);
              } else {
                arr2.push(item);
              }
            });
            this.list = [arr1, arr2];
          } else {
            this.list = array;
          }
          console.log(this.list)
        })
        .catch((err) => {});
    },
    query() {
      getAlarmInformation({ _index: this.index, _size: this.size })
        .then((res) => {
          this.total = res.total;
          let arr = res.records.map((item, key) => {
            item.tips = [
              {
                label: "事件类型:",
                value: item.eventName,
              },
              {
                label: "区域:",
                value: item.groupName,
              },
              {
                label: "告警级别:",
                value: item.alarmLevel,
              },
              {
                label: "设备:",
                value: item.detectorName,
              },
              {
                label: "告警时间:",
                value: formatTime(item.alarmTime),
              },
            ];
            return item;
          });
          this.waringInfo = [...this.waringInfo, ...arr];
        })
        .catch((err) => {});
    },
    // 下拉加载更多
    load() {
      if (this.index * this.size < this.total) {
        this.index += 1;
        this.query();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  background-color: #100f31;
}
.text {
  font-size: 14px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #ffffff;
}
.waring-unm {
  height: 120px;
  background: #17183c;
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.16);
  opacity: 1;
  display: flex;
  align-items: center;
  .arrow {
    display: block;
    font-size: 50px;
    color: #ffffff;
    position: absolute;
    right: 50px;
    cursor: pointer;
  }
  .item-from {
    // margin-left: 40px;
    text-align: center;
    display: flex;
    .item {
      position: relative;
      padding: 0 50px;
      &::after {
        content: "";
        width: 1px;
        height: 40px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        background-color: #c9caec;
      }
      .t1 {
        font-size: 16px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        color: #dcddff;
        margin-bottom: 10px;
      }
      .t2 {
        font-size: 24px;
        font-family: DIN-Medium, DIN;
        color: #4eb2ff;
      }
    }
  }
}
.content-tainer {
  .top {
    height: 50px;
    background: #34367e;
    display: flex;
    align-items: center;
  }
  .left-main {
    height: 751px;
  }
  .right-main {
    height: 751px;
    padding: 20px 0 20px 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background-color: #17183c;
    .scrollbar {
      height: 100%;
      overflow-y: auto;
      width: 100%;
    }
    ul {
      margin: 0;
      padding: 0;
      width: 100%;
    }
    .item {
      display: flex;
      align-content: center;
      margin-bottom: 20px;
      .media {
        width: 100%;
        height: 157px;
      }
      .tips {
        color: #ffffff;
        > div {
          margin-bottom: 12px;
          span {
            // display: inline-block;
          }
        }
        > div:nth-child(5) {
          margin-bottom: 0px;
        }
      }
    }
  }
}
</style>
