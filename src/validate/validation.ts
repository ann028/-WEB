
// import isValid from './validate'
// const validPhone = (rule: any, value: any, callback: any) => {
//   if (!value) {
//     callback(new Error('请输入电话号码！'))
//   } else if (!isValid.isValidPhone.test(value)) {
//     callback(new Error('手机格式不正确!'))
//   } else {
//     callback()
//   }
// }
// export default validPhone

export const validateMobile = (rule: any, mobile: any, callback: any) => {
  console.log(mobile)
  if (mobile.length === 0) {
    callback(new Error('请添加'))
  } else {
    callback()
  }
}
