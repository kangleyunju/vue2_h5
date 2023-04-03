<template>
  <div class="data_table" ref="table">
    <div class="table_main" :class="{scroll:!loading&&more!=loading}">
      <div class="table_row table_header">
        <div v-for="(item, index) in tableHeader" :key="index" :style="{width:item.width,minWidth:item.minWidth}" class="table_Item header_item" @click="changeSort(item)">
          <div class="label">{{item.label}}</div>
          <div class="sort" :class="{up:item.sort==3,down:item.sort==2}" v-if="item.sort>0"></div>
        </div>
      </div>
      <div class="table_row">
        <div v-for="(item, index) in tableHeader" :key="index" class="body_column" :style="{width:item.width,minWidth:item.minWidth}">
          <div class="table_Item body_item" v-for="(value, key) in tableData" :key="key" :style="{width:item.width,minWidth:item.minWidth}">
            <slot :name="item.prop" :row="value" :index="key">{{ value[item.prop] }}</slot>
          </div>
        </div>
      </div>
    </div>
    <div class="table_loading" v-if="loading">
      <van-loading vertical>加载中...</van-loading>
    </div>
    <div class="table_more" v-if="more!=''&&tableData.length>0" @click="loadMore">
      <van-loading size="14px" v-if="more=='loading'" />{{more=='loading'?'加载中...':more=='more'?'更多数据':'没有更多了'}}
      <van-icon name="arrow-down" v-if="more=='more'" />
    </div>
    <div class="table_empty" v-show="!loading &&tableData.length ==0">
      <img src="@/assets/empty.png">
      <div>{{emptyText}}</div>
    </div>
    <!-- 固定列 -->
    <div class="fixed_left" :class="{more:more&&!loading&& tableData.length >0}" v-if="!loading&&tableData.length>0">
      <div class="table_row table_header">
        <div v-for="(item, index) in tableHeader" :key="index" class="table_Item header_item" :style="{width:item.width,minWidth:item.minWidth}" v-if="item.fixed" @click="changeSort(item)">
          <div class="label">{{item.label}}</div>
          <div class="sort" :class="{up:item.sort==3,down:item.sort==2}" v-if="item.sort>0"></div>
        </div>
      </div>
      <div class="table_row">
        <div v-for="(item, index) in tableHeader" :key="index" class="body_column" :style="{width:item.width,minWidth:item.minWidth}" v-if="item.fixed">
          <div v-for="(value, key) in tableData" :key="key" class="table_Item body_item" :style="{width:item.width,minWidth:item.minWidth}">
            <slot :name="item.prop" :row="value" :index="key">{{ value[item.prop] }}</slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'dateTable',
    props: {
      sticky: {
        type: Boolean,
        default: true
      },
      /**
       sort=1,默认
       sort=2,降序
       sort=3,正序
       **/
      tableHeader: {
        type: Array,
        default: () => []
      },
      tableData: {
        type: Array,
        default: () => []
      },
      emptyText: {
        type: String,
        default: '暂无数据'
      },
      loading: {
        type: Boolean,
        default: false
      },
      //底部加载文字 more|finish|loading
      more: {
        type: String,
        default: ''
      }
    },
    methods: {
      loadMore() {
        if (this.more == 'more') {
          this.$emit('loadMore')
        }
      },
      changeSort(item) {
        if (item.sort && !this.loading && this.more != 'loading' && this.tableData.length > 0) {
          this.$emit('changeSort', item)
        }
      }
    },
    mounted() {
    }
  }
</script>
<style scoped lang="scss">
  .data_table {
    background-color: #fff;
    font-size: 14px;
    color: #2D2E37;
    position: relative;
    overflow: hidden;
    .table_main {
      &.scroll {
        overflow-x: auto;
      }
    }
    .table_row {
      display: flex;
      .body_column {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .table_Item {
        border-bottom: 1px solid #f5f6f9;
        padding: 10px 5px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        .label {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sort {
          height: 16px;
          width: 8px;
          position: relative;
          transform: translateX(4px);
          &:before {
            position: absolute;
            top: -1px;
            left: 8;
            content: '';
            border: 4px solid transparent;
            border-bottom-color: #96969b;
          }
          &:after {
            position: absolute;
            bottom: -1px;
            left: 0;
            content: '';
            border: 4px solid transparent;
            border-top-color: #96969b;
          }
          &.up:before {
            border-bottom-color: #009FB1;
          }
          &.down:after {
            border-top-color: #009FB1;
          }
        }
        &.body_item {
          flex: 1;
        }
      }
    }
    .table_empty {
      text-align: center;
      padding: 20px 0;
      font-size: 14px;
      img {
        height: 160px;
        width: 160px;
      }
      div {
        color: #86909C;
      }
    }
    .table_loading {
      .van-loading {
        padding: 50px 0;
      }
    }
    .table_more {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 0;
      font-size: 12px;
      color: #86909C;
      .van-loading {
        padding: 0;
        margin-right: 4px;
      }
      .van-icon {
        margin-left: 2px;
      }
    }
    .fixed_left {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 2;
      box-shadow: 0 -8px 10px rgba(0, 0, 0, .12);
      background-color: #fff;
      &.more {
        bottom: 36px;
      }
    }
  }
</style>