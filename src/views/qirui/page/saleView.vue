<template>
	<div class="dataContainer">
		<div class="title">
			<div class="left">销售总览 <van-icon name="question-o" @click="$refs.tipPopup.open('xiaoshou')" />
			</div>
			<div class="right">更新时间: 2023-03-15</div>
		</div>
		<div class="viewBox">
			<div class="loudouChart" ref="loudouChart" :class="{center:!activeField.includes(1)}"></div>
			<div class="rightData" v-if="activeField.includes(1)">
				<div class="item">
					<div>跟进率 {{saleData.followUpRate}}</div>
				</div>
				<div class="item">
					<div>有效线索率 {{saleData.validLeadsRate}}</div>
					<div>30min跟进率 {{saleData.thirtyMinutesFollowUpRate}}</div>
				</div>
				<div class="item">
					<div>有效到店率 {{saleData.validToStoreRate}}</div>
					<div>到店率 {{saleData.toStoreRate}}</div>
				</div>
				<div class="item">
					<div>有效试驾率 {{saleData.validTestDriveRate}}</div>
					<div>试驾率 {{saleData.testDriveRate}}</div>
				</div>
				<div class="item">
					<div>有效下订率 {{saleData.validOrderRate}}</div>
					<div>下订率 {{saleData.orderRate}}</div>
				</div>
				<div class="item last">
					<div>有效线索成交率 {{saleData.validBargainRate}}</div>
					<div>成交率 {{saleData.bargainRate}}</div>
				</div>
			</div>
			<div class="subTitle">
				<div>销售阶段</div>
				<div>阶段转化率</div>
			</div>
			<div class="fieldBox">
				<div v-for="(item,index) in fieldList" :key="index" :class="{active:activeField.includes(item.value)}" @click="changeField(item.value)"><span></span>{{item.name}}</div>
			</div>
		</div>
		<tipPopup ref="tipPopup" />
	</div>
</template>
<script>
	import tipPopup from './tipPopup'
	export default {
		data() {
			return {
				saleData: {},
				activeField: [1, 2, 3],
				fieldList: [{
					name: '净率',
					value: 1
				}, {
					name: '环比',
					value: 2
				}, {
					name: '同比',
					value: 3
				}]
			}
		},
		components: {
			tipPopup
		},
		mounted() {
			this.getSaleView()
		},
		methods: {
			getSaleView() {
				this.saleData = { "leadsNum": 61, "leadsNumYoY": "13%", "leadsNumMoM": "103.3%", "followUpRate": "3.3%", "validLeadsRate": "100.0%", "customerNum": 61, "customerNumYoY": "13%", "customerNumMoM": "103.3%", "thirtyMinutesFollowUpRate": "1.6%", "validToStoreRate": "36.1%", "toStoreNum": 22, "toStoreNumYoY": "13%", "toStoreNumMoM": "57.1%", "toStoreRate": "36.1%", "validTestDriveRate": "0.0%", "testDriveNum": 0, "testDriveNumYoY": "13%", "testDriveNumMoM": "13%", "testDriveRate": "0.0%", "validOrderRate": "60.7%", "orderNum": 37, "orderNumYoY": "13%", "orderNumMoM": "1750.0%", "orderRate": "60.7%", "validBargainRate": "13.1%", "bargainNum": 8, "bargainNumYoY": "13%", "bargainNumMoM": "-11.1%", "bargainRate": "13.1%", "updateTime": "2023-03-29 14:35:04", "firstCallTaskNum": 2, "thirtyMinutesFirstCallTaskNum": 1 }
				this.initChart()
			},
			changeField(val) {
				const index = this.activeField.indexOf(val)
				index < 0 ? this.activeField.push(val) : this.activeField.splice(index, 1)
				this.initChart()
			},
			initChart() {
				if (this.$refs.loudouChart) {
					var myChart = this.$echarts.init(this.$refs.loudouChart)
					var option = {
						tooltip: {
							trigger: 'item',
							formatter: ((params) => {
								const data = params.data
								const first = `${data.name}:${data.value}`
								if (this.activeField.includes(2) && this.activeField.includes(3)) {
									return `${first}<br/>同比:${params.data.tb}<br/>环比:${params.data.hb}`
								} else if (this.activeField.includes(2)) {
									return `${first}<br/>环比:${params.data.hb}`
								} else if (this.activeField.includes(3)) {
									return `${first}<br/>同比:${params.data.tb}`
								} else {
									return `${first}`
								}
							}),
							padding: [5],
							textStyle: {
								fontSize: 12,
								lineHeight: 12
							},
							extraCssText: 'z-index:2',
							show: true
						},
						color: ["#BEF5FB", "#4ED9E9", "#4ACDDC", "#00B9CE", "#00A4B6", "#008F9F"],
						series: [{
							name: 'Funnel',
							type: 'funnel',
							top: 0,
							left: 0,
							bottom: 0,
							width: '100%',
							minSize: "50%",
							maxSize: "100%",
							gap: 0.5, //间隙
							sort: 'none',
							label: {
								show: true,
								formatter: ((params) => {
									const data = params.data
									if (this.activeField.includes(2) && this.activeField.includes(3)) {
										return `{a|${data.name}(${data.value})}` + `\n 同比${params.data.tb}  环比${params.data.hb}`
									} else if (this.activeField.includes(2)) {
										return `{a|${data.name}(${data.value})}` + `\n 环比${params.data.hb}`
									} else if (this.activeField.includes(3)) {
										return `{a|${data.name}(${data.value})}` + `\n 同比${params.data.tb}`
									} else {
										return `{a|${data.name}(${data.value})}`
									}
								}),
								rich: {
									'a': {
										fontSize: 10
									}
								},
								lineHeight: 12,
								position: "inner",
								fontSize: 8
							},
							data: [{ name: '线索量', value: this.saleData.leadsNum, tb: this.saleData.leadsNumYoY, hb: this.saleData.leadsNumMoM }, { name: '客户量', value: this.saleData.customerNum, tb: this.saleData.customerNumYoY, hb: this.saleData.customerNumMoM }, { name: '到店量', value: this.saleData.toStoreNum, tb: this.saleData.toStoreNumYoY, hb: this.saleData.toStoreNumMoM }, { name: '试驾量', value: this.saleData.testDriveNum, tb: this.saleData.testDriveNumYoY, hb: this.saleData.testDriveNumMoM }, { name: '下订量', value: this.saleData.orderNum, tb: this.saleData.orderNumYoY, hb: this.saleData.orderNumMoM }, { name: '成交量', value: this.saleData.bargainNum, tb: this.saleData.bargainNumYoY, hb: this.saleData.bargainNumMoM }]
						}]
					}
					myChart.setOption(option);
					window.addEventListener('resize', myChart.resize)
				}
			}
		}
	}
</script>
<style lang="scss">
	.dataContainer {
		.viewBox {
			position: relative;
			.loudouChart {
				height: 186px;
				width: 254px;
				&.center {
					margin: 0 auto;
				}
			}
			.rightData {
				position: absolute;
				right: 0;
				width: 100%;
				top: 0;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				pointer-events: none;
				.item {
					height: 31px;
					text-align: right;
					width: 140px;
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					&:not(last):before {
						content: '';
						position: absolute;
						right: 30px;
						bottom: 0;
						width: 180px;
						border-bottom: 1px dashed #E6E6E6;
					}
					div {
						color: #a9aaba;
						text-align: center;
						transform: scale(0.7);
						transform-origin: right;
					}
					div:last-child {
						color: #009FB1;
					}
				}
			}
			.subTitle {
				display: flex;
				align-items: center;
				height: 40px;
				div {
					transform: scale(0.7);
					color: #86909C;
					&:first-child {
						width: 254px;
						text-align: center;
					}
					&:last-child {
						flex: 1;
						transform-origin: left;
					}
				}
			}
			.fieldBox {
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				padding-bottom: 15px;
				width: 80%;
				margin: 0 auto;
				div {
					font-size: 12px;
					color: #C9CDD4;
					display: flex;
					align-items: center;
					span {
						width: 8px;
						height: 8px;
						background: #E5E6EB;
						border-radius: 50%;
						display: block;
						margin-right: 8px;
					}
					&.active {
						color: #2D2E37;
						span {
							background: #009FB1;
						}
					}
				}
			}
		}
	}
</style>