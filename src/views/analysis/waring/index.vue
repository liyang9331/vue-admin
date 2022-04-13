<template>
  <div class="page">
    <el-row style="padding-top: 20px">
      <el-col :span="2"><div class="label">告警时间:</div></el-col>
      <el-col :span="6">
        <el-date-picker
          class="picker"
          v-model="params.startTime"
          type="datetime"
          prefix-icon="el-icon-date"
          placeholder="开始时间"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
        >
        </el-date-picker>
        <span style="color: #707070">-</span>
        <el-date-picker
          v-model="params.endTime"
          class="picker"
          prefix-icon="el-icon-date"
          type="datetime"
          placeholder="结束时间"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
        >
        </el-date-picker>
      </el-col>
      <el-col :span="1"><div class="label">设备名称:</div></el-col>
      <el-col :span="4">
        <el-input
          placeholder="请输入内容"
          v-model="params.detectorName"
          class="input-with-select picker"
          clearable
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search()"
          ></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="label">布控点位:</div></el-col>
      <el-col :span="6">
        <el-radio-group v-model="params.detectGroup" class="radio-group">
          <el-radio-button
            v-for="(item, key) in groupList"
            :key="key"
            :label="item.id"
            >{{ item.name }}</el-radio-button
          >
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="label">监测特征/行为:</div></el-col>
      <el-col :span="6">
        <el-radio-group v-model="params.eventId" class="radio-group">
          <el-radio-button
            v-for="(item, key) in monitorList"
            :key="key"
            :label="item.id"
            >{{ item.name }}</el-radio-button
          >
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="label">告警级别:</div></el-col>
      <el-col :span="6">
        <el-radio-group v-model="params.level" class="radio-group">
          <el-radio-button
            v-for="(item, key) in alarmList"
            :key="key"
            :label="item.id"
            >{{ item.dictLabel }}</el-radio-button
          >
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- 分割线 -->
    <div class="divider"></div>

    <div
      class="content-tainer"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
    >
      <ul>
        <li class="item" v-for="(item, key) in waringInfo" :key="key">
          <!-- 图片 -->
          <div class="media">
            <el-image
              :src="item.url"
              fit="cover"
              style="width: 100%; height: 100%"
            />
          </div>
          <div class="tips">
            <span>{{ fromCurrentTime(item.alarmTime) }}</span>

            <span>{{ item.groupName }}</span>
            <span>{{ item.eventName }}</span>
            <span>{{ item.alarmLevel }}</span>
            <!-- <span>{{ item.detectorName }}</span> -->
          </div>
        </li>
      </ul>
    </div>

    <pagination
      :total="total"
      :page="page"
      :pageSize="size"
      @pagination="paginationHandel"
      style="padding: 20px 0"
    ></pagination>
  </div>
</template>
<script>
import pagination from "@/components/Pagination/index.vue";
import { getCondition, getByCondition } from "@/api/waring";
import { formatTime, objectEmpty } from "@/utils/index";
export default {
  data() {
    return {
      list: [],
      waringInfo: [],
      groupList: [],
      monitorList: [],
      alarmList: [],
      total: 10,
      page: 1,
      size: 10,
      loading: false,
      //   查询条件
      params: {
        detectGroup: "_999", //分组id
        detectorName: "", //设备名称-手动输入
        endTime: "", //结束时间
        eventId: "_999", //事件id
        level: "_999", //告警级别
        startTime: "", //开始时间
      },
    };
  },
  components: {
    pagination,
  },
  computed: {},
  created() {
    this.getCondition();
    this.query();
  },
  watch: {
    "params.endTime"(val) {
      this.query();
    },
    "params.detectGroup"(val) {
      this.query();
    },
    "params.eventId"(val) {
      this.query();
    },
    "params.level"(val) {
      this.query();
    },
  },
  methods: {
    //   搜索
    search() {
      if (this.params.detectorName != "") {
        this.query();
      } else {
        this.$message({
          message: "请输入设备名称！",
          type: "warning",
        });
      }
    },
    // 分页组件回调
    // { page: this.currentPage, size: val }
    paginationHandel(obj) {
      this.page = obj.page;
      this.size = obj.size;
      this.query();
    },
    query() {
      this.loading = true;
      const params = objectEmpty(this.params, "_999");
      getByCondition({ ...params, _index: this.page, _size: this.size })
        .then((res) => {
          this.total = res.total;
          this.waringInfo = res.records;
        })
        .catch((err) => {
            
        }).finally(res=>{
            this.loading = false;
        })
    },
    getCondition() {
      getCondition({})
        .then((res) => {
          this.monitorList = [{ id: "_999", name: "全部" }, ...res.event];
          this.alarmList = [{ id: "_999", dictLabel: "全部" }, ...res.level];
          this.groupList = [{ id: "_999", name: "全部" }, ...res.group];
        })
        .catch((err) => {});
    },
    fromCurrentTime(val) {
      return formatTime(val);
    },
  },
};
</script>
<style lang="scss">
// 覆盖按钮样式
.radio-group {
  height: 40px;
  display: flex;
  align-items: center;
  //   未选中样式
  label {
    .el-radio-button__inner {
      border: none !important;
      height: 24px;
      background: none;
      border-radius: 6px 6px 6px 6px;
      opacity: 1;
      border: none;
      display: flex;
      align-items: center;
      color: #ffffff;
    }
  }
  //   选中样式
  .is-active {
    .el-radio-button__inner {
      height: 24px;
      background: #5e64ff;
      border-radius: 6px 6px 6px 6px;
      opacity: 1;
      border: none;
      display: flex;
      align-items: center;
      color: #ffffff;
      box-shadow: none !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.page {
  background-color: #17183c;
}
.picker {
  &::v-deep .el-input__inner {
    background-color: #17183c;
    border: 1px solid #5e64ff;
  }
  &::v-deep .el-button,
  &::v-deep .el-input-group__append {
    border: 1px solid #5e64ff;
    background-color: #5e64ff;
    color: #ffffff;
  }
}

// 分割线
.divider {
  width: 100%;
  height: 0px;
  opacity: 0.29;
  border: 1px dashed #707070;
  margin-top: 20px;
}
.text {
  font-size: 14px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #ffffff;
}
.label {
  height: 40px;
  font-size: 16px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #ffffff;
  font-size: 16px;
  margin-right: 10px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: end;
}

.content-tainer {
  min-height: 530px;
  ul {
    margin: 0;
    margin-bottom: 20px;
    padding: 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    display: flex;
    flex-wrap: wrap;
    width: 352px;
    margin: 26px 20px 0 0;
    cursor: pointer;
    .media {
      width: 352px;
      height: 198px;
      margin-bottom: 12px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .tips {
      span {
        color: #c9caec;
        display: inline-block;
        padding: 6px 9px;
        background: #2e2e53;
        border-radius: 4px;
        font-size: 14px;
        margin-right: 8px;
      }
    }
  }
}
</style>
