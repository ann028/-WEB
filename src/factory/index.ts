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

export function search_listedPlace() {
  return [
    {
      label: '上海证券交易所',
      value: '上海证券交易所',
    },
    {
      label: '深圳证券交易所',
      value: '深圳证券交易所',
    },
    {
      label: '银行间市场',
      value: '银行间市场',
    },
    {
      label: '机构间私募产品报价与服务系统',
      value: '机构间私募产品报价与服务系统',
    },
    {
      label: 'MP99-其他',
      value: 'MP99-其他',
    },
  ]
}
export function search_deptType() {
  return [
    {
      label: '企业债',
      value: '企业债',
    },
    {
      label: 'FB07-政策性金融债',
      value: 'FB07-政策性金融债',
    },
    {
      label: 'CB030-公募公司债',
      value: 'CB030-公募公司债',
    },
    {
      label: 'CB031-私募公司债',
      value: 'CB031-私募公司债',
    },
    {
      label: 'CB05-分离交易的可转换公司债',
      value: 'CB05-分离交易的可转换公司债',
    },
    {
      label: 'CB04-普通可转换公司债',
      value: 'CB04-普通可转换公司债',
    },
    {
      label: 'ABS02-企业资产支持证券',
      value: 'ABS02-企业资产支持证券',
    },
    {
      label: 'ABS01-信贷资产支持证券',
      value: 'ABS01-信贷资产支持证券',
    },
  ]
}
export function search_managerType() {
  return [
    {
      label: '全部',
      value: '',
    },
    {
      label: '天风',
      value: '0',
    },
    {
      label: '非天风',
      value: '1',
    },
  ]
}
export function search_rateType() {
  return [
    {
      label: 'RF00-无利率类型',
      value: 'RF00-无利率类型',
    },
    {
      label: 'RF01-固定利率',
      value: 'RF01-固定利率',
    },
    {
      label: 'RF02-浮动利率',
      value: 'RF02-浮动利率',
    },
    {
      label: 'RF0201-挂钩浮动',
      value: 'RF0201-挂钩浮动',
    },
    {
      label: 'RF020101-与Shibor挂钩浮动',
      value: 'RF020101-与Shibor挂钩浮动',
    },
    {
      label: 'RF020102-与Libor挂钩浮动',
      value: 'RF020102-与Libor挂钩浮动',
    },
    {
      label: 'RF020103-与银行间市场7天质押式回购利率挂钩浮动',
      value: 'RF020103-与银行间市场7天质押式回购利率挂钩浮动',
    },
    {
      label: 'RF020104-与1年期定期存款基准利率挂钩浮动',
      value: 'RF020104-与1年期定期存款基准利率挂钩浮动',
    },
    {
      label: 'RF020105-与1至3年期贷款基准利率挂钩浮动',
      value: 'RF020105-与1至3年期贷款基准利率挂钩浮动',
    },
    {
      label: 'RF020106-与1年期贷款基础利率LPR挂钩浮动',
      value: 'RF020106-与1年期贷款基础利率LPR挂钩浮动',
    },
    {
      label: 'RF020107-与3年期国债收益率挂钩',
      value: 'RF020107-与3年期国债收益率挂钩',
    },
    {
      label: 'RF020108-与5年期国债收益率挂钩',
      value: 'RF020108-与5年期国债收益率挂钩',
    },
    {
      label: 'RF020199-与其他利率或其他标的挂钩浮动',
      value: 'RF020199-与其他利率或其他标的挂钩浮动',
    },
    {
      label: 'RF0202-累进浮动',
      value: 'RF0202-累进浮动',
    },
    {
      label: 'RF0299-其他浮动方式',
      value: 'RF0299-其他浮动方式',
    },
    {
      label: '9999-信息缺失',
      value: '9999-信息缺失',
    },
  ]
}
export function repayMode() {
  return [
    {
      label: '到期一次性偿还',
      value: '到期一次性偿还',
    },
    {
      label: '分期偿还',
      value: '分期偿还',
    },
    {
      label: '其他',
      value: '其他',
    },
  ]
}
export function interestPayMode() {
  return [
    {
      label: '贴现式',
      value: '贴现式',
    },
    {
      label: '零息式',
      value: '零息式',
    },
    {
      label: '利随本清式',
      value: '利随本清式',
    },
    {
      label: '附息式固定利率',
      value: '附息式固定利率',
    },
    {
      label: '附息式浮动利率',
      value: '附息式浮动利率',
    },
    {
      label: '其他',
      value: '其他',
    },
  ]
}
export function optionType() {
  return [
    {
      label: '发行人赎回选择权',
      value: '发行人赎回选择权',
    },
    {
      label: '发行人调整票面利率选择权',
      value: '发行人调整票面利率选择权',
    },
    {
      label: '发行人合并债券选择权',
      value: '发行人合并债券选择权',
    },
    {
      label: '投资人回售选择权',
      value: '投资人回售选择权',
    },
    {
      label: '投资人定向转让选择权',
      value: '投资人定向转让选择权',
    },
    {
      label: '投资人调换债券选择权',
      value: '投资人调换债券选择权',
    },
    {
      label: '延期兑付选择权',
      value: '延期兑付选择权',
    },
    {
      label: '投资人可转换选择权',
      value: '投资人可转换选择权',
    },
    {
      label: '其他选择权',
      value: '其他选择权',
    },
    {
      label: '无选择权',
      value: '无选择权',
    },
  ]
}
export function specailTermType() {
  return[
    {
      label: 'SI01-赎回条款',
      value: 'SI01-赎回条款',
    },
    {
      label: 'SI02-回售条款',
      value: 'SI02-回售条款',
    },
    {
      label: 'SI03-可交换为股票条款',
      value: 'SI03-可交换为股票条款',
    },
    {
      label: 'SI04-减记条款',
      value: 'SI04-减记条款',
    },
    {
      label: 'SI05-其他特殊条款',
      value: 'SI05-其他特殊条款',
    },
    {
      label: 'SI00-无特殊条款',
      value: 'SI00-无特殊条款',
    },
    {
      label: '9999-信息缺失',
      value: '9999-信息缺失',
    },
  ]
}
export function industryScale() {
  return [
    {
      label: '非企业',
      value: '非企业',
    },
    {
      label: '金融企业',
      value: '金融企业',
    },
    {
      label: '大型非金融企业',
      value: '大型非金融企业',
    },
    {
      label: '中型非金融企业',
      value: '中型非金融企业',
    },
    {
      label: '小型非金融企业',
      value: '小型非金融企业',
    },
    {
      label: '微型非金融企业',
      value: '微型非金融企业',
    },
    {
      label: '其他',
      value: '其他',
    },
  ]
}
export function economicSector() {
  return [
    {
      label: 'A0000-非企业',
      value: 'A0000-非企业',
    },
    {
      label: 'A0101-国有相对控股',
      value: 'A0101-国有相对控股',
    },
    {
      label: 'A0102-国有绝对控股',
      value: 'A0102-国有绝对控股',
    },
    {
      label: 'A0201-集体相对控股',
      value: 'A0201-集体相对控股',
    },
    {
      label: 'A0202-集体绝对控股',
      value: 'A0202-集体绝对控股',
    },
    {
      label: 'B0101-私人相对控股',
      value: 'B0101-私人相对控股',
    },
    {
      label: 'B0102-私人绝对控股',
      value: 'B0102-私人绝对控股',
    },
    {
      label: 'B0201-港澳台相对控股',
      value: 'B0201-港澳台相对控股',
    },
    {
      label: 'B0202-港澳台绝对控股',
      value: 'B0202-港澳台绝对控股',
    },
    {
      label: 'B0301-外商相对控股',
      value: 'B0301-外商相对控股',
    },
    {
      label: 'B0302-外商绝对控股',
      value: 'B0302-外商绝对控股',
    },
    {
      label: '9999-信息缺失',
      value: '9999-信息缺失',
    },
  ]
}
export function publishType() {
  return[
    {
      label: 'IM01-同时面向公众投资者和合格投资者公开发行',
      value: 'IM01-同时面向公众投资者和合格投资者公开发行',
    },
    {
      label: 'IM02-仅面向合格投资者公开发行',
      value: 'IM02-仅面向合格投资者公开发行',
    },
    {
      label: 'IM03-非公开发行',
      value: 'IM03-非公开发行',
    },
    {
      label: '9999-信息缺失',
      value: '9999-信息缺失',
    },
  ]
}
export function fixPriceType() {
  return[
    {
      label: 'IC01-招标发行',
      value: 'IC01-招标发行',
    },
    {
      label: 'IC02-簿记建档',
      value: 'IC02-簿记建档',
    },
    {
      label: 'IC03-协议定价',
      value: 'IC03-协议定价',
    },
    {
      label: 'IC04-其他',
      value: 'IC04-其他',
    },
    {
      label: '9999-信息缺失',
      value: '9999-信息缺失',
    },
  ]
}
export function underwritingMode() {
  return [
    {
      label: 'ST01-代销',
      value: 'ST01-代销',
    },
    {
      label: 'ST02-全额包销',
      value: 'ST02-全额包销',
    },
    {
      label: 'ST03-余额包销',
      value: 'ST03-余额包销',
    },
    {
      label: 'ST04-其他',
      value: 'ST04-其他',
    },
    {
      label: '9999-信息缺失',
      value: '9999-信息缺失',
    },
  ]
}
export function corporateRating() {
  return [
    {
      label: 'IC01-AAA',
      value: 'IC01-AAA',
    },
    {
      label: 'IC02-AAA-',
      value: 'IC02-AAA-',
    },
    {
      label: 'IC03-AA+',
      value: 'IC03-AA+',
    },
    {
      label: 'IC04-AA',
      value: 'IC04-AA',
    },
    {
      label: 'IC05-AA-',
      value: 'IC05-AA-',
    },
    {
      label: 'IC06-A+',
      value: 'IC06-A+',
    },
    {
      label: 'IC07-A',
      value: 'IC07-A',
    },
    {
      label: 'IC08-A-',
      value: 'IC08-A-',
    },
    {
      label: 'IC09-BBB+',
      value: 'IC09-BBB+',
    },
    {
      label: 'IC10-BBB',
      value: 'IC10-BBB',
    },
    {
      label: 'IC11-BBB-',
      value: 'IC11-BBB-',
    },
    {
      label: 'IC12-BB+',
      value: 'IC12-BB+',
    },
    {
      label: 'IC13-BB',
      value: 'IC13-BB',
    },
    {
      label: 'IC14-BB-',
      value: 'IC14-BB-',
    },
    {
      label: 'IC15-B+',
      value: 'IC15-B+',
    },
    {
      label: 'IC16-B',
      value: 'IC16-B',
    },
    {
      label: 'IC17-B-',
      value: 'IC17-B-',
    },
    {
      label: 'IC18-CCC+',
      value: 'IC18-CCC+',
    },
    {
      label: 'IC19-CCC',
      value: 'IC19-CCC',
    },
    {
      label: 'IC20-CCC-',
      value: 'IC20-CCC-',
    },
    {
      label: 'IC21-CC+',
      value: 'IC21-CC+',
    },
    {
      label: 'IC22-CC',
      value: 'IC22-CC',
    },
    {
      label: 'IC23-CC-',
      value: 'IC23-CC-',
    },
    {
      label: 'IC24-C+',
      value: 'IC24-C+',
    },
    {
      label: 'IC25-C',
      value: 'IC25-C',
    },
    {
      label: 'IC26-C-',
      value: 'IC26-C-',
    },
    {
      label: 'IC27-无评级',
      value: 'IC27-无评级',
    },
    {
      label: 'IC99-其他评级',
      value: 'IC99-其他评级',
    },
    {
      label: '9999-信息缺失',
      value: '9999-信息缺失',
    },
  ]
}
export function guaranteeMode() {
  return [
    {
      label: 'GU01-质押',
      value: 'GU01-质押',
    },
    {
      label: 'GU02-抵押',
      value: 'GU02-抵押',
    },
    {
      label: 'GU0201-房地产抵押',
      value: 'GU0201-房地产抵押',
    },
    {
      label: 'GU0202-其他抵押',
      value: 'GU0202-其他抵押',
    },
    {
      label: 'GU03-保证',
      value: 'GU03-保证',
    },
    {
      label: 'GU0301-一般保证',
      value: 'GU0301-一般保证',
    },
    {
      label: 'GU0302-连带责任',
      value: 'GU0302-连带责任',
    },
    {
      label: 'GU04-信用/免担保',
      value: 'GU04-信用/免担保',
    },
    {
      label: '9999-信息缺失',
      value: '9999-信息缺失',
    },
  ]
}
