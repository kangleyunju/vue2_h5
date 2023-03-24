import request from '@/base/service'
//销售总览
export function getSaleView(data) {
  return request({
    url: '/statistics/index/saleOverview',
    method: 'post',
    data
  })
}
//趋势
export function getTrend(data) {
  return request({
    url: '/statistics/index/trend',
    method: 'post',
    data
  })
}