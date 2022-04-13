<template>
  <div class="add">
    <div class="add-tab">
      <el-tabs v-model="activeName" :stretc="true">
        <el-tab-pane label="铁路线" name="0">
          <div v-if="activeName === '0'" class="content">
            <div class="content-title">添加铁路线</div>
            <railWay />
          </div>
        </el-tab-pane>

        <el-tab-pane label="站点" name="1">
          <div v-if="activeName === '1'" class="content">
            <div class="content-title">添加站点</div>
            <station />
          </div>
        </el-tab-pane>
        <el-tab-pane label="FSU" name="2">
          <div v-if="activeName === '2'" class="content">
            <div class="content-title">添加FSU</div>
            <FSU />
          </div>
        </el-tab-pane>
        <el-tab-pane label="监测设备" name="3">
          <div v-if="activeName === '3'" class="content">
            <div class="content-title">添加监测设备</div>
            <monitorEquip />
          </div>
        </el-tab-pane>
        <el-tab-pane label="漏缆" name="4">
          <div v-if="activeName === '4'" class="content">
            <div class="content-title">添加漏缆</div>
            <leakyCable />
          </div>
        </el-tab-pane>
        <el-tab-pane label="天馈线" name="5">
          <div v-if="activeName === '5'" class="content">
            <div class="content-title">添加天馈线</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import railWay from "./comp/railWay.vue";
import monitorEquip from "./comp/monitorEquip.vue";
import station from "./comp/station.vue";
import FSU from "./comp/FSU.vue";
import leakyCable from "./comp/leakyCable.vue";
export default {
  components: {
    monitorEquip,
    station,
    railWay,
    FSU,
    leakyCable
  },
  data() {
    return {
      activeName: "0",
      tabs: [
        {
          label: "铁路线",
          key: "0"
        },
        {
          label: "站点",
          key: "1"
        },
        {
          label: "FSU",
          key: "2"
        },
        {
          label: "监测设备",
          key: "3"
        },
        {
          label: "漏缆",
          key: "4"
        },
        {
          label: "天馈线",
          key: "5"
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__nav {
  display: flex;
  width: 100%;
  padding-bottom: 10px;
  .el-tabs__item {
    flex: 1;
    text-align: center;
    font-size: 18px;
    color: #666;
  }
  .el-tabs__item.is-active {
    color: #1e64f6;
  }
  .el-tabs__active-bar {
    background-color: #1e64f6;
  }
}
.add {
  padding: 10px;
  .tab {
    // width: 600px;
    margin: 0 auto;
  }
  .content {
    border: 1px solid #e3e3e3;
    border-radius: 10px;
    // height: 700px;
    // overflow-y: scroll;
    .content-title {
      width: 100%;
      height: 60px;
      background: rgba(226, 235, 255, 0.39);
      line-height: 60px;
      font-size: 18px;
      color: #333;
      font-weight: 500;
      text-align: center;
      border-bottom: 1px solid #e3e3e3;
    }
    .form {
      padding: 20px 0;
      width: 600px;
      margin: 0 auto;
    }
  }
  .btn {
    padding-top: 50px;
    text-align: center;
    button {
      width: 120px;
    }
  }
}
</style>
