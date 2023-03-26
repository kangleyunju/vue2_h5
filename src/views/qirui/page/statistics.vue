<template>
	<div class="statistics">
		<div class="headerBox">
			<img src="@/assets/logo.png">
			<van-tabs v-model="activeTime" background="#009FB1" color="#fff" title-active-color="#fff" title-inactive-color="#fff" line-height="2px" line-width="24px" @click="changeTime">
				<van-tab title="日" :name="1"></van-tab>
				<van-tab title="周" :name="2"></van-tab>
				<van-tab title="月" :name="3"></van-tab>
				<van-tab title="季" :name="4"></van-tab>
				<van-tab title="年" :name="5"></van-tab>
				<van-tab title="自定义" :name="6"></van-tab>
			</van-tabs>
		</div>
		<!-- 销售总览 -->
		<saleView />
		<!-- 趋势 -->
		<div class="dataContainer">
			<van-tabs v-model="activeTab" offset-top="40px" color="#009FB1" title-active-color="#009FB1" title-inactive-color="#86909C" line-height="2px" line-width="24px" scrollspy sticky class="stickyTab" @change="changeTab">
				<van-tab title="趋势" :name="1">
					<trendTab></trendTab>
				</van-tab>
				<van-tab title="战区数据" :name="2">
					<dataTab :dataType="1"></dataTab>
				</van-tab>
				<van-tab title="渠道数据" :name="3">
					<dataTab :dataType="2"></dataTab>
				</van-tab>
				<van-tab title="车型数据" :name="4">
					<dataTab :dataType="3"></dataTab>
				</van-tab>
			</van-tabs>
		</div>
		<van-action-sheet
			v-model="chooseShow"
			:actions="actions"
			cancel-text="取消"
			close-on-click-action
			@select="chooseTime"
			@cancel="cancel"
			@click-overlay="cancel" />
		<van-calendar
			v-model="rangeShow"
			@confirm="confirmTime"
			@open="isChoose=false"
			@close="closeTime "
			color="#009FB1"
			:min-date="minDate"
			:max-date="maxDate"
			title="选择日期范围"
			confirm-text="确定"
			confirm-disabled-text="请选择日期"
			type="range"
			allow-same-day
			position="bottom" />
	</div>
</template>
<script>
	import saleView from './saleView'
	import trendTab from './trendTab'
	import dataTab from './dataTab'
	export default {
		components: {
			saleView,
			trendTab,
			dataTab
		},
		data() {
			return {
				activeTime: 1,
				originalTime: 1,
				activeTab: 1,
				popupShow: false,
				chooseShow: false,
				rangeShow: false,
				show: false,
				actions: [],
				minDate: new Date(),
				maxDate: new Date(),
				isChoose: false
			}
		},
		methods: {
			cancel(e) {
				this.activeTime = this.originalTime
			},
			changeTime(e, b, d) {
				const array = [{ name: '今日', value: 1 }, { name: '昨日', value: 2 }, { name: '本周', value: 3 }, { name: '上周', value: 4 }, { name: '本月', value: 5 }, { name: '上月', value: 6 }, { name: '本季度', value: 7 }, { name: '上季度', value: 8 }, { name: '本年度', value: 9 }, { name: '上年度', value: 10 }]
				if (this.activeTime < 6) {
					this.chooseShow = true
					this.actions = array.filter(item => {
						return this.activeTime * 2 == item.value || this.activeTime * 2 - 1 == item.value
					})
				} else {
					this.rangeShow = true
				}
			},
			chooseTime(e) {
				this.originalTime = this.activeTime
				this.getData()
			},
			formatDate(date) {
				return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
			},
			confirmTime(e) {
				console.log(e.map(item => { return `${item.getFullYear() + 1}/${item.getMonth() + 1}/${item.getDate()}` }))
				this.rangeShow = false
				this.isChoose = true
				this.originalTime = this.activeTime
				this.getData()
			},
			closeTime(e) {
				if (!this.isChoose) {
					this.activeTime = this.originalTime
				}
			},
			changeTab(e) {},
			// 获取日期
			getDay(d, num) {
				const date = new Date(new Date(d).setDate(new Date(d).getDate() + num))
				const year = date.getFullYear()
				const month = (date.getMonth() + 1 + "").padStart(2, "0")
				const day = (date.getDate() + "").padStart(2, "0")
				return `${year}-${month}-${day}`
			},
			// 是否是闰年
			isLeap(year) {
				return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
			},
			//获取去年日期
			getLastYearDate(d) {
				if (!d) d = new Date()
				const date = new Date(d)
				const year = date.getFullYear()
				const month = date.getMonth() + 1
				const day = date.getDate()
				const lastYear = year - 1
				const thisYearisLeap = this.isLeap(year)
				const lastYearIsLeap = this.isLeap(lastYear)
				if (lastYearIsLeap || (thisYearisLeap && month == 12 && day == 31)) return this.getDay(d, -366)
				return this.getDay(d, -365)
			},
			//获取首页数据
			getData() {}
		},
		mounted() {
			this.minDate = new Date(this.getLastYearDate())
		}
	}
</script>
<style lang="scss">
	.statistics {
		padding-top: 40px;
		height: 100vh;
		.headerBox {
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #009FB1;
			padding: 0 0 0 12px;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 10;
			img {
				height: 24px;
			}
			.van-tabs {
				.van-tabs__wrap {
					height: 36px;
				}
			}
		}
		.dataContainer {
			background: #FFFFFF;
			box-shadow: 0px 2px 10px 0px rgba(214, 214, 214, 0.5);
			padding: 0 10px;
			border-radius: 8px;
			color: #2D2E37;
			margin-bottom: 12px;
			.title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 46px;
				.left {
					display: flex;
					align-items: center;
					font-size: 14px;
					.van-icon {
						color: #989898;
						margin: 2px 0 0 4px;
					}
				}
				.right {
					color: #989898;
					font-size: 12px;
				}
			}
			.van-tab {
				-webkit-box-flex: unset;
				-webkit-flex: unset;
				flex: unset;
				margin-right: 20px;
			}
			.stickyTab {
				.van-sticky--fixed {
					margin: 0 22px;
				}
				.van-tabs__wrap {
					height: 40px;
				}
			}
		}
	}
</style>