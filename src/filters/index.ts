export function leaveStatusFilter(status: any) {
  switch (status) {
    case 1: return '事假'
    case 2: return '病假'
    case 3: return '年假'
    case 4: return '调休'
    case 5: return '婚假'
    case 6: return '产假'
    case 7: return '陪产假'
    case 8: return '路途假'
    case 9: return '其他'
    default: return status
  }
}

import moment from 'moment'

export function formatDate(timestap: any) {
  if (timestap) {
    return moment(timestap).format('YYYY' + '年' + 'MM' + '月' + 'DD' + '日')
  } else {
    return '-'
  }
}

export function formatDateBy(timestap: any) {
  if (timestap) {
    return moment(timestap).format('YYYY' + '-' + 'MM' + '-' + 'DD')
  } else {
    return '-'
  }
}

