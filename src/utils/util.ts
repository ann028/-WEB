const obj1 = {
  // 最近一个月时间
  getNowtime() {
    const date = new Date()
    const dateTime = date.getTime();
    const end = new Date(dateTime)
    const beg = new Date(dateTime - 30 * 24 * 60 * 60 * 1000)
    const year = beg.getFullYear();
    const month = beg.getMonth() + 1 < 10 ? '0' + ( beg.getMonth() + 1) : ( beg.getMonth() + 1 )
    const da = beg.getDate() < 10 ? '0' + beg.getDate() : beg.getDate()
    const year1 = end.getFullYear();
    const month1 = end.getMonth() + 1 < 10 ? '0' + ( end.getMonth() + 1) : ( end.getMonth() + 1 )
    const da1 = end.getDate() < 10 ? '0' + end.getDate() : end.getDate()
    const beg1 = `${year}-${month}-${da}`
    const end1 = `${year1}-${month1}-${da1}`
    let dat: any = [];
    dat = [beg1, end1]; // 将值设置给插件绑定的数据
    return dat
  },
  // 本月第一天至今
  getFirst(endValue?: any) {
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
  },
  // 获取当前月份
  getNowmonth() {
    const date = new Date()
    const dateTime  = date.getTime();
    const end = new Date(dateTime)
    const year1 = end.getFullYear();   // '2019'
    const month1 = end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1) : (end.getMonth() + 1);  // '04'
    const monthTime = `${year1}-${month1}`
    return monthTime
  },
};

export {
  obj1,
}
