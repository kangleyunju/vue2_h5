<template>
	<div class="dataTab">
		<div class="title">
			<div class="left">{{dataType==1?'战区数据':dataType==2?'渠道数据':'车型数据'}}
				<van-icon name="question-o" @click="openTip" />
			</div>
			<div class="right">
				<div v-for="(item,index) in btnList" :key="index" :class="{active:activeType.includes(item.value)}" @click="changeType(item.value)">
					<van-icon name="passed" />{{item.name}}
				</div>
			</div>
		</div>
		<van-tabs v-model="activeTab" color="#009FB1" title-active-color="#009FB1" line-height="2px" line-width="24px" title-inactive-color="#86909C" @change="changeTab">
			<van-tab :title="item.title" :name="item.name" v-for="(item,index) in tabList" :key="index"></van-tab>
		</van-tabs>
		<dataTable :tableHeader="tableHeader" :tableData="tableData" :more="more" :loading="loading" @changeSort="changeSort">
			<div slot="zhanqu" slot-scope="scope" class="tableItem firstItem">
				<div><img src="@/assets/home/arrow-down.png" :class="{fold:scope.row.isFold}" @click="scope.row.isFold=!scope.row.isFold">{{scope.row.zhanqu}}
					<van-icon name="arrow" />
				</div>
				<div v-if="activeType.includes(1)&&!scope.row.isFold">占比</div>
				<div v-if="activeType.includes(2)&&!scope.row.isFold">环比</div>
				<div v-if="activeType.includes(3)&&!scope.row.isFold">同比</div>
			</div>
      <template v-for="(item,index) in propList" :slot="item" slot-scope="scope">
        <div class="tableItem" :key="index">
				<div>{{scope.row[item]}}</div>
				<div v-if="activeType.includes(1)&&!scope.row.isFold" :class="{red:scope.row[item]<0,green:scope.row[item]>0}"><span v-if="scope.row[item]>0">+</span>{{scope.row[item]}}%</div>
				<div v-if="activeType.includes(2)&&!scope.row.isFold" :class="{red:scope.row[item]<0,green:scope.row[item]>0}"><span v-if="scope.row[item]>0">+</span>{{scope.row[item]}}%</div>
				<div v-if="activeType.includes(3)&&!scope.row.isFold" :class="{red:scope.row[item]<0,green:scope.row[item]>0}"><span v-if="scope.row[item]>0">+</span>{{scope.row[item]}}%</div>
        </div>
      </template>
		</dataTable>
		<tipPopup ref="tipPopup" />
	</div>
</template>
<script>
	import dataTable from '@/components/dataTable'
	import tipPopup from './tipPopup'
	export default {
		props: {
			dataType: {
				type: Number,
				default: 1
			}
		},
		components: {
			dataTable,
			tipPopup
		},
		data() {
			return {
				activeTab: 1,
				activeType: [1, 2, 3],
				more: '',
        loading:false,
				btnList: [{
					name: '占比',
					value: 1
				}, {
					name: '环比',
					value: 2
				}, {
					name: '同比',
					value: 3
				}],
				tabList: [],
				tableData: [],
				tableHeader: [{
					label: '战区/大区',
					prop: 'zhanqu',
					width: '110px',
					fixed: 'left'
				}, {
					label: '成交量',
					prop: 'chengjiao',
					sort: 1,
					width: '80px'
				}, {
					label: '下订量',
					prop: 'xiading',
					sort: 1,
					width: '80px'
				}, {
					label: '试驾量',
					prop: 'shijia',
					sort: 1,
					width: '80px'
				}, {
					label: '到店量',
					prop: 'daodian',
					sort: 1,
					width: '80px'
				}, {
					label: '客户量',
					prop: 'kehu',
					sort: 1,
					width: '80px'
				}, {
					label: '线索量',
					prop: 'xiansuo',
					sort: 1,
					width: '80px'
				}],
				propList: ['chengjiao', 'xiading', 'shijia', 'daodian', 'kehu', 'xiansuo']
			}
		},
		mounted() {
			this.getTabList()
      this.loading=true    
			setTimeout(() => {
        this.loading=false
				this.more  = 'finish'
				this.tableData = Math.random(0, 1) > 0.5 ? [] : [{
					zhanqu: '东部战区',
					chengjiao: 12,
					xiading: 3,
					shijia: 10,
					daodian: 13,
					kehu: 33,
					xiansuo: 130,
					isFold: false
				}, {
					zhanqu: '西部战区',
					chengjiao: 777,
					xiading: 3,
					shijia: 10,
					daodian: -13,
					kehu: 33,
					xiansuo: 130,
					isFold: false
				}, {
					zhanqu: '北部战区',
					chengjiao: 888,
					xiading: 3,
					shijia: 10,
					daodian: 13,
					kehu: 33,
					xiansuo: 130,
					isFold: false
				}, {
					zhanqu: '南部战区',
					chengjiao: 999,
					xiading: 3,
					shijia: 0,
					daodian: 13,
					kehu: -33,
					xiansuo: 130,
					isFold: false
				}]
			}, 2000)
		},
		methods: {
			openTip() {
				this.$refs.tipPopup.open(this.dataType == 1 ? 'zhanqu' : this.dataType == 2 ? 'qudao' : 'chexing')
			},
			changeType(val) {
				const index = this.activeType.indexOf(val)
				index < 0 ? this.activeType.push(val) : this.activeType.splice(index, 1)
			},
			changeSort(e) {
				this.tableHeader.forEach((item) => {
					if (item.prop == e.prop) {
						item.sort = e.sort == 1 ? 2 : e.sort == 2 ? 3 : 2
					} else if (item.sort) {
						item.sort = 1
					}
				})
			},
			getTabList() {
				if (this.dataType == 1) {
					this.tabList = [{
						title: '全部',
						name: 1
					}, {
						title: '战区',
						name: 2
					}, {
						title: '大区',
						name: 3
					}, {
						title: '经销商',
						name: 4
					}]
				} else if (this.dataType == 2) {
					this.tabList = [{
						title: '全部',
						name: 1
					}, {
						title: '线上',
						name: 2
					}, {
						title: '线下',
						name: 3
					}]
				} else {
					this.tabList = [{
						title: '全部',
						name: 1
					}, {
						title: 'QQ冰淇淋',
						name: 2
					}, {
						title: 'eQ2',
						name: 3
					}, {
						title: '艾瑞泽系列',
						name: 4
					}]
				}
			},
			changeTab() {}
		}
	}
</script>
<style lang="scss">
	.dataContainer {
		.title {
			.right {
				display: flex;
				align-items: center;
				div {
					width: 53px;
					height: 20px;
					border-radius: 10px;
					font-size: 12px;
					color: #96969B;
					background: #F2F3F5;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 12px;
					.van-icon {
						margin-right: 4px;
						transform: scale(0.8);
						margin-top: 2px;
					}
					&.active {
						color: #009FB1;
						background: rgba(0, 201, 224, 0.1);
					}
				}
			}
		}
		.van-tabs {
			margin-bottom: 14px;
		}
		.data_table {
			.table_header {
				.headerItem {
					justify-content: flex-start;
				}
			}
			.table_body {
				padding-bottom: 10px;
				.bodyItem {
					padding: 10px 0 0 0;
					.tableItem {
						&.firstItem {
							div {
								display: flex;
								align-items: center;
								font-size: 14px;
							}
							div:not(:first-child) {
								padding-left: 20px;
								font-size: 12px;
								color: #2D2E36;
							}
						}
						div {
							text-align: right;
							padding-right: 32px;
							height: 28px;
							line-height: 28px;
							font-size: 16px;
							img {
								height: 15px;
								margin-right: 6px;
								transition: all 0.2s;
								&.fold {
									transform: rotate(-90deg);
								}
							}
							.van-icon {
								font-size: 12px;
								margin-top: 2px;
							}
							&:not(:first-child) {
								font-size: 12px;
								color: #86909C;
								&.red {
									color: #EC4343;
								}
								&.green {
									color: #22AE43;
								}
							}
						}
					}
				}
			}
		}
	}
</style>