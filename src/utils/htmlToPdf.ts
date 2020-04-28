// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default{
  install(Vue: any, options: any) {
    Vue.prototype.getPdf = () => {
      const title = '产品详情'
      const mainRight: HTMLInputElement = document.querySelector('#pdfDom') as HTMLInputElement;
      html2Canvas(mainRight, {
        allowTaint: true,
        scale: 2, // 提升画面质量，但是会增加文件大小
      }).then((canvas) => {
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;
        const pageData = canvas.toDataURL('image/jpeg', 0.4);
        const pdfWidth = (contentWidth + 10) / 2 * 0.75;
        const pdfHeight = (contentHeight + 200) / 2 * 0.75; // 500为底部留白
        const imgWidth = pdfWidth;
        const imgHeight = (contentHeight / 2 * 0.75); // 内容图片这里不需要留白的距离
        const pdf = new JsPDF('', 'pt', [pdfWidth, pdfHeight]);
        pdf.addImage(pageData, 'jpeg', 0, 0, imgWidth, imgHeight);
        pdf.save(title + '.pdf');
      });

      // const title = '产品详情'
      // const xx: HTMLInputElement = document.querySelector('#pdfDom') as HTMLInputElement
      // html2Canvas( xx, {
      //   allowTaint: true,
      // }).then((canvas: any) => {
      //   const contentWidth = canvas.width
      //   const contentHeight = canvas.height
      //   const pageHeight = contentWidth / 592.28 * 841.89
      //   let leftHeight = contentHeight
      //   let position = 0
      //   const imgWidth = 595.28
      //   const imgHeight = 592.28 / contentWidth * contentHeight
      //   const pageData = canvas.toDataURL('image/jpeg', 1.0)
      //   const PDF = new JsPDF('', 'pt', 'a4')
      //   if (leftHeight < pageHeight) {
      //     PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      //   } else {
      //     while (leftHeight > 0) {
      //       PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
      //       leftHeight -= pageHeight
      //       position -= 841.89
      //       if (leftHeight > 0) {
      //         PDF.addPage()
      //       }
      //     }
      //   }
      //   PDF.save(title + '.pdf')
      // },
      // )
    }
  },
}
