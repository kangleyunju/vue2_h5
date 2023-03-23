<template>
  <div class="data_table">
    <div :class="{ sticky: sticky}" class="table_header">
      <div v-for="(item, index) in tableHeader" :key="index" v-if="item.fixed && item.fixed == 'left'" class=" headerItem" :style="{width:item.width,minWidth:item.minWidth}" @click="changeSort(item)">
        <div class="label">{{item.label}}</div>
        <div class="sort" :class="{up:item.sort==3,down:item.sort==2}" v-if="item.sort>0"></div>
      </div>
      <div class="table_row" :class="{hidden:tableData.length >0}" ref="topBox">
        <div v-for="(item, index) in tableHeader" :key="index" v-if="!item.fixed || item.fixed !== 'left'" class="headerItem" :style="{width:item.width,minWidth:item.minWidth}" @click="changeSort(item)">
          <div class="label">{{item.label}}</div>
          <div class="sort" :class="{up:item.sort==3,down:item.sort==2}" v-if="item.sort>0"></div>
        </div>
      </div>
    </div>
    <div v-show="tableData && tableData.length >= 1" class="table_body">
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
    <div class="table_empty" v-show="!tableData || tableData.length ==0">{{emptyText}}</div>
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
      }
    },
    methods: {
      changeSort(item) {
        if (item.sort) {
          this.$emit('changeSort',item)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        const topBox = this.$refs.topBox
        const listBox = this.$refs.listBox
        listBox.addEventListener('scroll', (e) => {
          topBox.scrollLeft = listBox.scrollLeft
        })
        topBox.addEventListener('scroll', (e) => {
          let scrollLeft=topBox.scrollLeft
          topBox.scrollLeft = listBox.scrollLeft=scrollLeft
        })
      })
    }
  }
</script>
<style scoped lang="scss">
  .data_table {
    background-color: #fff;
    .table_row {
      overflow-x: auto;
      display: flex;
      width: 100%;
      &::-webkit-scrollbar {
        height: 0;
      }
    }
    .table_header {
      position: relative;
      display: flex;
      &.sticky {
        position: sticky;
        .headerItem {
          border-bottom: 1px solid #f5f6f9;
          padding: 10px 4px;
          box-sizing: border-box;
          color: #86909C;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-grow: 0;
          flex-shrink: 0;
          font-size:14px;
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
            &.up:before{
              border-bottom-color: #009FB1;
            }
            &.down:after{
              border-top-color: #009FB1;
            }
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
        padding: 10px 4px;
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
      color: #86909C;
      line-height: 48px;
      text-align: center;
    }
  }
</style>
