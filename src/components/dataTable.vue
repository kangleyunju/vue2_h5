<template>
  <div class="data_table">
    <div :class="{ sticky: sticky}" class="table_header">
      <div v-for="(item, index) in tableHeader" :key="index" v-if="item.fixed && item.fixed == 'left'" class=" headerItem" :style="{width:item.width,minWidth:item.minWidth}" @click="changeSort(item)">
        <div class="label">{{item.label}}</div>
        <div class="sort" :class="{up:item.sort==3,down:item.sort==2}" v-if="item.sort>0"></div>
      </div>
      <div class="table_row" ref="topBox">
        <div v-for="(item, index) in tableHeader" :key="index" v-if="!item.fixed || item.fixed !== 'left'" class="headerItem" :style="{width:item.width,minWidth:item.minWidth}" @click="changeSort(item)">
          <div class="label">{{item.label}}</div>
          <div class="sort" :class="{up:item.sort==3,down:item.sort==2}" v-if="item.sort>0"></div>
        </div>
      </div>
    </div>
    <template v-if="loading">
      <div class="loadingBox">
        <van-loading vertical>加载中...</van-loading>
      </div>
    </template>
    <template v-else>
      <div v-show="tableData && tableData.length >0" class="table_body">
        <div v-for="(item, index) in tableHeader" :key="index" v-if="item.fixed && item.fixed == 'left'" :style="{width:item.width,minWidth:item.minWidth}" class="body_column">
          <div class="bodyItem" v-for="(value, key) in tableData" :key="key" :style="{width:item.width,minWidth:item.minWidth}">
            <slot :name="item.prop" :row="value" :index="key">{{ value[item.prop] }}</slot>
          </div>
        </div>
        <div class="table_row" ref="listBox">
          <div v-for="(item, index) in tableHeader" :key="index" v-if="!item.fixed || item.fixed !== 'left'" :style="{width:item.width,minWidth:item.minWidth}" class="body_column">
            <div class="bodyItem" v-for="(value, key) in tableData" :key="key" :style="{width:item.width,minWidth:item.minWidth}">
              <slot :name="item.prop" :row="value" :index="key">{{ value[item.prop] }}</slot>
            </div>
          </div>
        </div>
      </div>
      <div class="table_empty" v-show="!tableData || tableData.length ==0">
        <img src="@/assets/empty.png">
        <div>{{emptyText}}</div>
      </div>
    </template>
    <div class="moreBtn" v-if="more!=''&&tableData.length >0" @click="loadMore">
      <van-loading size="14px" v-if="more=='loading'"/>{{more=='loading'?'加载中...':more=='more'?'更多数据':'没有更多了'}}
      <van-icon name="arrow-down" v-if="more=='more'"/>
    </div>
    <div class="fixed_left" :class="{more:more&&!loading&& tableData.length >0}" v-if="!loading&&tableData.length>0"></div>
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
    data(){
      return{
        scrollLeft:0
      }
    },
    methods: {
      loadMore(){
        if(this.more=='more'){
          this.$emit('loadMore')
        }
      },
      changeSort(item) {
        if (item.sort) {
          this.$emit('changeSort', item)
        }
      }
    },
    watch: {
      loading: {
        handler(val) {
          if (!this.loading && this.tableData && this.tableData.length >= 1) {
            this.$nextTick(() => {
              const topBox = this.$refs.topBox
              const listBox = this.$refs.listBox
              listBox.addEventListener('scroll', (e) => {
                topBox.scrollLeft = listBox.scrollLeft
              })
              topBox.addEventListener('scroll', (e) => {
                let scrollLeft = topBox.scrollLeft
                topBox.scrollLeft = listBox.scrollLeft = scrollLeft
                this.scrollLeft=scrollLeft
              })
            })
          }
        },
        immediate: true
      }
    }
  }
</script>
<style scoped lang="scss">
  .data_table {
    background-color: #fff;
    position: relative;
    overflow: hidden;
    .table_row {
      overflow-x: auto;
      display: flex;
      width: 100%;
      &::-webkit-scrollbar {
        height: 0;
      }
    }
    .loadingBox{
      .van-loading {
        padding: 50px 0;
      }
    }
    .table_header {
      position: relative;
      display: flex;
      &.sticky {
        position: sticky;
        top:0;
        background-color: #fff;
      }
      .headerItem {
        border-bottom: 1px solid #f5f6f9;
        padding: 10px 5px;
        box-sizing: border-box;
        color: #86909C;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 0;
        flex-shrink: 0;
        font-size: 14px;
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
      }
    }
    .table_body {
      display: flex;
      .body_column {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      }
      .bodyItem {
        width: 100%;
        padding: 10px 5px;
        min-height: 40px;
        box-sizing: border-box;
        font-size: 14px;
        color: #2D2E36;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        flex-shrink: 0;
      }
    }
    .table_empty {
      text-align: center;
      padding: 20px 0;
      font-size:14px;
      img {
        height: 160px;
        width: 160px;
      }
      div {
        color: #86909C;
      }
    }
    .fixed_left {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 110px;
      box-shadow: 0 -8px 10px rgba(0, 0, 0, .12);
      pointer-events: none; 
      &.more{
        bottom:36px;
      }
    }
    .moreBtn{
      display:flex;
      align-items:center;
      justify-content:center;
      padding: 12px 0;
      font-size: 12px;
      color: #86909C;
      .van-loading {
        padding:0;
        margin-right:4px;
      }
      .van-icon{
        margin-left:2px;
      }
    }
  }
</style>