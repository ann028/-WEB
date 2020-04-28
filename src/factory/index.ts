export function leaveOption() {
  return [
    {
      value: 1,
      label: '事假',
    },
    {
      value: 2,
      label: '病假',
    },
    {
      value: 3,
      label: '年假',
    },
    {
      value: 4,
      label: '调休',
    },
    {
      value: 5,
      label: '婚假',
    },
    {
      value: 6,
      label: '产假',
    },
    {
      value: 7,
      label: '陪产假',
    },
    {
      value: 8,
      label: '路途假',
    },
    {
      value: 9,
      label: '其他',
    },
  ]
}
export function workProgressOption() {
  return [
    {
      label: '完成',
      value: 1,
    },
    {
      label: '已沟通，持续跟进',
      value: 2,
    },
    {
      label: '待沟通',
      value: 3,
    },
    {
      label: '未完成',
      value: 4,
    },
  ]
}
// 本月第一天至今
export function getFirstDay(endValue?: any) {
  const date = new Date()
  if (!endValue) {
    const year = date.getFullYear().toString()   // '2019'
    const month =
    date.getMonth() + 1 < 10 ? '0' + ( date.getMonth() + 1 ).toString() : (date.getMonth() + 1).toString()  // '04'
    const da = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString()  // '12'
    const end = year + '-' + month + '-' + da  // 当天'2019-04-12'
    const beg = year + '-' + month + '-01'    // 当月第一天'2019-04-01'
    let dat: any = []
    dat = [beg, end] // 将值设置给插件绑定的数据
    return dat
  }
}

export function mechanismOption() {
  return [
    {
      label: '零售业务部',
      value: 1,
    },
    {
      label: '私人银行部',
      value: 2,
    },
    {
      label: '财富管理部',
      value: 3,
    },
    {
      label: '金融市场部',
      value: 4,
    },
    {
      label: '投资管理部',
      value: 5,
    },
    {
      label: '投资银行部',
      value: 6,
    },
    {
      label: '同业部',
      value: 7,
    },
    {
      label: '公司内部',
      value: 8,
    },
  ]
}

