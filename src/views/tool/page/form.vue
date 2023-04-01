<template>
	<div class="formContainer">
		<van-form ref="form" :show-error="false" input-align="right" error-message-align="right" :scroll-to-error="true" @submit="formConfirm">
			<van-field v-model="form.name" label="姓名" placeholder="请输入姓名" :rules="[{ required: true, message: '请输入姓名'}]" required autocomplete="off" maxlength="4" />
			<van-field v-model="form.password" type="password" label="密码" placeholder="请输入密码" autocomplete="off" />
			<van-field v-model="form.time" label="时间" placeholder="请选择时间" @click="timeShow=true" readonly right-icon="arrow" clickable />
			<van-field v-model="form.phone" type="tel" label="手机号" placeholder="请输入手机号" :rules="[{ required: true, message: '请输入手机号' },{ pattern: /^1[3-9]\d{9}$/, message: '手机号不正确' }]" required maxlength="11" :formatter="formatterNumber" />
			<van-field label="开关">
				<template #input>
					<van-switch v-model="form.switch" size="20" />
				</template>
			</van-field>
			<van-field label="生肖" class="like">
				<template #input>
					<van-radio-group v-model="form.animal" direction="horizontal">
						<van-radio name="1" icon-size="16px">狮子</van-radio>
						<van-radio name="2" icon-size="16px">老虎</van-radio>
					</van-radio-group>
				</template>
			</van-field>
			<van-field label="爱好" class="like">
				<template #input>
					<van-checkbox-group v-model="form.like" direction="horizontal">
						<van-checkbox name="1" shape="square" icon-size="16px">爬山</van-checkbox>
						<van-checkbox name="2" shape="square" icon-size="16px">涉水</van-checkbox>
					</van-checkbox-group>
				</template>
			</van-field>
			<van-field label="步进器">
				<template #input>
					<van-stepper v-model="form.stepper" max="99" min="1" />
				</template>
			</van-field>
			<van-field label="评分">
				<template #input>
					<van-rate v-model="form.rate" />
				</template>
			</van-field>
			<van-field label="滑块">
				<template #input>
					<van-slider v-model="form.slider" />
				</template>
			</van-field>
			<van-field v-model="form.cardId" label="身份证号" placeholder="身份证号" readonly clickable @click="idShow = true" right-icon="arrow" maxlength="18" />
			<van-field v-model="form.fapiao" label="发票" placeholder="发票" readonly clickable @click="popupShow = true" right-icon="arrow" />
			<van-field label="文件上传">
				<template #input>
					<van-uploader v-model="form.img" multiple :max-count="2" :after-read="afterRead" />
				</template>
			</van-field>
			<van-field v-model="form.area"  name="area" label="地区选择" placeholder="选择省市区" readonly clickable @click="areaShow = true" :rules="[{ required: true, message: '请选择省市区' }]" required right-icon="arrow" />
			<van-field v-model="form.calendar" label="日历" placeholder="选择日期范围" readonly clickable @click="calendarShow = true" right-icon="arrow" />
			<van-field v-model="form.mark" type="textarea" label="备注" placeholder="请输入备注" show-word-limit maxlength="50" />
		</van-form>
		<div class="bottomFixed">
			<van-button type="info" plain @click="cancel">取消</van-button>
			<van-button type="info" @click="formConfirm">确定</van-button>
		</div>
		<!-- 时间弹窗 -->
		<van-popup position="bottom" v-model="timeShow" get-container="formContainer" safe-area-inset-bottom>
			<van-datetime-picker
				v-model="currentDate"
				type="datetime"
				title="选择年月日"
				:min-date="minDate"
				:max-date="maxDate"
				:filter="filter"
				:formatter="formatter"
				@confirm="timeConfrim" />
		</van-popup>
		<!-- 地区弹窗 -->
		<van-popup v-model="areaShow" position="bottom">
			<van-area :area-list="areaList" @confirm="areaConfirm" @cancel="areaShow = false" />
		</van-popup>
		<!-- 日历弹窗 -->
		<van-calendar
			v-model="calendarShow"
			@confirm="calendarConfirm"
			color="#1989fa"
			:min-date="minDate"
			:max-date="maxDate"
			confirm-text="确定"
			confirm-disabled-text="请选择日期"
			:round="false"
			type="range"
			allow-same-day
			position="bottom" />
		<van-number-keyboard
			:show="idShow"
			extra-key="X"
			close-button-text="完成"
			v-model="form.cardId"
			@blur="idShow = false" />
		<van-popup
			v-model="popupShow"
			position="bottom">
			<div class="popupBox">
				<van-field v-model="fapiao.name" label="公司名称" placeholder="请输入公司公司名称" maxLength="18" clearable />
				<van-field v-model="fapiao.address" label="公司地址" placeholder="请输入公司地址" maxLength="18" clearable />
				<van-field v-model="fapiao.phone" label="联系电话" placeholder="请输入联系电话" maxLength="18" clearable />
				<van-field v-model="fapiao.id" label="纳税人识别号" placeholder="请输入纳税人识别号" maxLength="18" clearable />
				<van-field v-model="fapiao.bank" label="开户银行" placeholder="请输入开户银行" maxLength="18" clearable />
				<van-field v-model="fapiao.account" label="银行账号" placeholder="请输入银行账号" maxLength="18" clearable />
				<van-button size="small" type="primary">确定</van-button>
			</div>
		</van-popup>
	</div>
</template>
<script>
	import { areaList } from '@vant/area-data';
	export default {
		data() {
			return {
				form: {},
				timeShow: false, //时间弹窗
				minDate: new Date(1980, 0, 1),
				maxDate: new Date(2023, 11, 31),
				currentDate: new Date(),
				areaList: areaList,
				areaShow: false, //地区弹窗
				calendarShow: false, //日历弹窗
				loading: false,
				idShow: false,
				popupShow: false,
				fapiao: {}
			}
		},
		methods: {
			//过滤数字
			formatterNumber(value) {
				return value.replace(/\D/g, '');
			},
			// 时间间隔
			filter(type, options) {
				if (type === 'minute') return options.filter((option) => option % 15 == 0)
				return options;
			},
			//时间格式
			formatter(type, val) {
				if (type === 'year') return val + '年'
				if (type === 'month') return val + '月'
				if (type === 'day') return val + '日'
				if (type === 'hour') return val + '时'
				if (type === 'minute') return val + '分'
			},
			afterRead(file) {
				file.status = 'uploading';
				file.message = '上传中...';
				setTimeout(() => {
					file.status = "done";
					file.message = "上传完成";
				}, 1000);
			},
      cancel(){
        this.$refs.form.resetValidation()
        this.$router.go(-1)
      },
			//提交表单
			formConfirm() {
				this.$refs.form.validate().then((valid) => {
					this.$toast.loading({
						message: '提交中...',
						forbidClick: true,
					})
					setTimeout(() => {
						this.$toast.success('提交成功')
						this.$router.push('/home/user')
					}, 3000)
				}).catch(err => {
					document.querySelector('.van-field__error-message').parentNode.scrollIntoView({
						block: 'center',
						behavior: 'smooth'
					})
				})
			},
			//时间确定
			timeConfrim(e) {
				this.timeShow = false
				this.form.time = this.parseTime(e)
			},
			//地区确定
			areaConfirm(e) {
				this.form.area = e.map(item => { return item.name }).join('/')
				this.areaShow = false
			},
			//日历确定
			calendarConfirm(e) {
				this.form.calendar = e.map(item => { return `${item.getFullYear() + 1}/${item.getMonth() + 1}/${item.getDate()}` }).join('-')
				this.calendarShow = false
			}
		},
		created() {
			//初始化取最近的整15分钟
			let now = new Date()
			let minute = new Date().getMinutes()
			if ([0, 15, 30, 45].includes(minute)) {
				this.currentDate = new Date()
			} else if (minute > 45) {
				this.currentDate = new Date((60 - minute) * 60 * 1000 + now.getTime())
			} else if (minute > 30) {
				this.currentDate = new Date((45 - minute) * 60 * 1000 + now.getTime())
			} else if (minute > 15) {
				this.currentDate = new Date((30 - minute) * 60 * 1000 + now.getTime())
			} else {
				this.currentDate = new Date((15 - minute) * 60 * 1000 + now.getTime())
			}
		}
	}
</script>
<style lang="scss">
	.formContainer {
		padding: 0.24rem;
		padding-bottom: calc(1.8rem + env(safe-area-inset-bottom));
		.van-form {
			border-radius: 0.12rem;
			overflow: hidden;
			.van-cell {
				padding: 10px 6px 10px 16px;
				&.like {
					.van-field__value {
						padding-right: 0;
					}
				}
				.van-field__value {
					padding-right: 0.3rem;
					.van-field__right-icon {
						position: absolute;
						right: 0;
						i {
							font-size: 14px;
						}
					}
				}
				.van-uploader__wrapper {
					justify-content: flex-end;
				}
			}
		}
		.bottomFixed {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #fff;
			box-shadow: 0 0px 6px 2px rgba(0, 0, 0, 0.1);
			height: 1.6rem;
			padding: 0.24rem;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.van-button {
				flex: 1;
				margin-right: 0.24rem;
				border-radius: 4px;
				&:last-child {
					margin: 0;
				}
			}
		}
		.popupBox {
			height: 7rem;
			background-color: #fff;
			.van-button {
				position: fixed;
				bottom: 20px;
				margin: 0 20px;
				width: 90%;
			}
		}
	}
</style>