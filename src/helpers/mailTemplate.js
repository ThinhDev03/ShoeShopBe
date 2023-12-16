import moment from "moment";

export const getBillNotify = (bill) => {
  console.log(bill);
  return {
    to: bill.email,
    subject: "Đặt hàng thành công.",
    html: /* html */ `
       <h4>Thân gửi ${bill.receiver}</h4>
       <div>
         Đơn hàng của bạn được tạo ngày ${moment().format("DD/MM/YYYY")}.
         <p>
             Vui lòng theo dõi đơn hàng tại <a href='${"http://localhost:3000/bill"}'>link</a> này.
         </p>
         <p>Cảm ơn bạn đã tin tưởng và ủng hộ.</p>
         
         <hr style="width: 100%; height: 0.5px; background: #d1d5db">
         <i>Lưu ý: Đây là mail tự động, vui lòng không trả lời mail này.</i>
         <br>
         <b>Trân trọng!</b>
         <br>
         <i>Web bán giày Fpoly</i>
       </div>
      `,
  };
};
