// import jsPDF from "jspdf";
// import ReactDOMServer from "react-dom/server";
// import moment from "moment";
// import { getMemoByIdApi } from "../api";

// function useDownloadMemoPDF() {
//   var isLoading = false;
//   var getMemoByIdData = "";

//   const handleDownloadPDF = async (id) => {
//     isLoading = true;
//     const res = await getMemoByIdApi(id);
//     getMemoByIdData = res.data;
//     if (res?.data) {
// const htmlContent = ReactDOMServer.renderToString(
//   <div className="row memo-form" id="challan-form">
//     <section className="header">
//       <div className="container page-invoice">
//         <div className="row row-header d-flex align-items-center">
//           <div className="col-lg-2 col-md-2 col-sm col-4">
//             <img src="/assets/images/image-2.png" className="img-fluid" />
//           </div>
//           <div className="col-lg-8 text-center d-none d-lg-block d-md-block">
//             <p className="m-0 p1">Shree Swami Samarth</p>
//             <h4 className="m-0 py-0">
//               Jai Laxmi Fruit Supplier Service Center, ugaon
//             </h4>
//             <p className="m-0 p2">
//               At/Post-Ugaon, Tal-Niphad, Dist-Nashik (Maharashtra)
//             </p>
//           </div>
//           <div
//             className="col-lg-2 col-md-8 col-sm col-8 pe-0 text-end pe-4"
//             style={{
//               borderRadius: "0px 20px 0px 0px",
//               backgroundColor: "#ff4545",
//               clipPath: "polygon(100% 100%, 100% 0, 25% 0%, 0 100%)",
//             }}
//           >
//             <h5 className="text-white pt-3">Memo No.</h5>
//             <div
//               className="btn btn-secondary"
//               style={{
//                 // backgroundImage: "url(/assets/images/rectangle-15.png)",
//                 // backgroundSize: "cover",
//                 // borderRadius: "0px 20px 0px 0px",
//                 backgroundColor: "#fff",
//                 color: "#ff4545 ",
//               }}
//             >
//               #{getMemoByIdData?.memoId}
//             </div>
//             <p className="text-white">Delivery Challan</p>
//           </div>
//         </div>
//         <div className="row py-4">
//           <div className="col-lg-4 col-md-4">
//             <label>Party name who receiving the order</label>
//             <input
//               className="form-control"
//               placeholder="Enter party name"
//               id="recipient"
//               name="recipient"
//               value={getMemoByIdData.recipient}
//             />
//           </div>
//           <div className="col-lg-4 col-md-4">
//             <label>Mobile Number</label>
//             <input
//               className="form-control"
//               placeholder="Enter party mobile number"
//               id="mobile_no"
//               name="mobile_no"
//               value={getMemoByIdData.mobile_no}
//             />
//           </div>
//           <div className="col-lg-4 col-md-4 position-relative">
//             <label>Date</label>
//             <input
//               className="form-control date"
//               placeholder="Enter Date"
//               type="date"
//               id="date"
//               name="date"
//               value={getMemoByIdData.date}
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="card mb-4">
//               <div className="card-body px-0 py-0">
//                 <div className="table-responsive">
//                   <table className="table mb-2">
//                     <thead>
//                       <tr>
//                         <th>Trade Mark</th>
//                         <th>Box</th>
//                         <th>Receiver</th>
//                         <th />
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {getMemoByIdData?.details_of_box?.length &&
//                         getMemoByIdData.details_of_box.map(
//                           (item, index) => (
//                             <tr key={index}>
//                               <td>
//                                 <input
//                                   className="form-control"
//                                   placeholder="Trade mark"
//                                   id="trade_mark"
//                                   name="trade_mark"
//                                   value={item?.trade_mark}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   type="number"
//                                   className="form-control"
//                                   placeholder="Box"
//                                   id="box"
//                                   name="box"
//                                   value={item?.box}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-control"
//                                   placeholder="Receiver name"
//                                   id="receiver"
//                                   name="receiver"
//                                   value={item?.receiver}
//                                 />
//                               </td>
//                             </tr>
//                           )
//                         )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-lg-6">
//             <div className="card mb-4">
//               <div className="card-body px-0 py-0">
//                 <div className="table-responsive">
//                   <table className="table mb-0">
//                     <thead>
//                       <tr>
//                         <th>Tapshil</th>
//                         <th>Weight</th>
//                         <th>Qty</th>
//                         <th>Per boxe rate</th>
//                         <th>This Fare</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {getMemoByIdData?.details_of_quantity?.length &&
//                         getMemoByIdData.details_of_quantity.map(
//                           (item, index) => (
//                             <tr key={index}>
//                               <td className="w-120">
//                                 <input
//                                   className="form-control"
//                                   placeholder="Receiver name"
//                                   id="type"
//                                   name="type"
//                                   value={item.type}
//                                 />
//                               </td>
//                               <td>
//                                 <div className="input-group">
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     id="weight"
//                                     name="weight"
//                                     value={item?.weight}
//                                   />
//                                   <span
//                                     className="input-group-text"
//                                     id="basic-addon1"
//                                   >
//                                     kg
//                                   </span>
//                                 </div>
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-control"
//                                   type="number"
//                                   id="quantity"
//                                   name="quantity"
//                                   value={item.quantity}
//                                 />{" "}
//                               </td>
//                               <td>
//                                 <input
//                                   type="number"
//                                   className="form-control"
//                                   placeholder="In Rupees"
//                                   id="per_boxes_rate"
//                                   name="per_boxes_rate"
//                                   value={item.per_boxes_rate}
//                                 />{" "}
//                               </td>
//                               <td>
//                                 <input
//                                   type="number"
//                                   className="form-control"
//                                   placeholder="In Rupees"
//                                   id="fare_rate"
//                                   name="fare_rate"
//                                   value={item.fare_rate}
//                                 />{" "}
//                               </td>
//                             </tr>
//                           )
//                         )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-6">
//             <div className="card mb-4">
//               <div className="card-body px-0 py-0">
//                 <div className="table-responsive">
//                   <table className="table mb-0">
//                     <thead>
//                       <tr>
//                         <th colSpan={2} className="text-center">
//                           Jai Laxmi Fruit Supplier Service Center, ugaav
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td className="w-170">
//                           <label>Total Box</label>
//                         </td>
//                         <td>
//                           <input
//                             className="form-control"
//                             type="number"
//                             id="total_box"
//                             name="total_box"
//                             value={getMemoByIdData.total_box}
//                           />
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="w-170">
//                           <label>Total Fare</label>
//                         </td>
//                         <td>
//                           <input
//                             type="number"
//                             className="form-control"
//                             placeholder="In Rupees"
//                             id="total_fare"
//                             name="total_fare"
//                             value={getMemoByIdData.total_fare}
//                           />
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="w-170">
//                           <label>Advance Amount</label>
//                         </td>
//                         <td>
//                           <input
//                             type="number"
//                             className="form-control"
//                             placeholder="In Rupees"
//                             id="advance_amount"
//                             name="advance_amount"
//                             value={getMemoByIdData.advance_amount}
//                           />
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="w-170">
//                           <label>Balance Amount</label>
//                         </td>
//                         <td>
//                           <input
//                             type="number"
//                             className="form-control"
//                             placeholder="In Rupees"
//                             id="balance_amount"
//                             name="balance_amount"
//                             value={getMemoByIdData.balance_amount}
//                           />
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="card mb-4">
//               <div className="card-body px-0 pt-0">
//                 <div className="row bdr-bottom m-auto">
//                   <div className="col-lg-12 text-center">
//                     <p className="m-0 py-2">Reward</p>
//                   </div>
//                 </div>
//                 <div className="row pt-2 pb-1 px-2">
//                   <div className="col-lg-4 position-relative">
//                     <label>Vehicle Departure Date </label>
//                     <input
//                       className="form-control"
//                       type="date"
//                       placeholder="Enter Date"
//                       id="reward.vehicle_departure_date"
//                       name="reward.vehicle_departure_date"
//                       value={
//                         getMemoByIdData?.reward?.vehicle_departure_date
//                       }
//                     />
//                   </div>
//                   <div className="col-lg-2 position-relative">
//                     <label>Time </label>
//                     <input
//                       className="form-control"
//                       type="time"
//                       placeholder="Enter Time"
//                       id="reward.departure_time"
//                       name="reward.departure_time"
//                       value={getMemoByIdData?.reward?.departure_time}
//                     />
//                   </div>
//                   <div className="col-lg-4 position-relative">
//                     <label>Vehicle Reaching Date </label>
//                     <input
//                       className="form-control"
//                       type="date"
//                       placeholder="Enter Date"
//                       id="reward.vehicle_reaching_date"
//                       name="reward.vehicle_reaching_date"
//                       value={
//                         getMemoByIdData?.reward?.vehicle_reaching_date
//                       }
//                     />
//                   </div>
//                   <div className="col-lg-2 position-relative">
//                     <label>Time </label>
//                     <input
//                       className="form-control"
//                       type="time"
//                       placeholder="Enter Time"
//                       id="reward.reaching_time"
//                       name="reward.reaching_time"
//                       value={getMemoByIdData?.reward?.reaching_time}
//                     />
//                   </div>
//                 </div>
//                 <div className="row pt-2 pb-1 px-2">
//                   <div className="col-lg-3 position-relative ">
//                     <label>If Driver Reaches Within </label>
//                     <div className="input-group">
//                       <input
//                         className="form-control"
//                         type="text"
//                         placeholder="Enter Time"
//                         id="reward.driver_reaches_within"
//                         name="reward.driver_reaches_within"
//                         value={
//                           getMemoByIdData?.reward?.driver_reaches_within
//                         }
//                       />

//                       <span
//                         className="input-group-text"
//                         id="basic-addon1"
//                       >
//                         hours
//                       </span>
//                     </div>{" "}
//                   </div>
//                   <div className="col-lg-4">
//                     <label>Then Reward Amount </label>
//                     <input
//                       className="form-control"
//                       type="number"
//                       placeholder="In Rupees"
//                       id="reward.reward_amount"
//                       name="reward.reward_amount"
//                       value={getMemoByIdData?.reward?.reward_amount}
//                     />
//                   </div>
//                   <div className="col-lg-5">
//                     <label>Then Reward Amount in Words </label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       placeholder="In Rupees"
//                       id="reward.reword_amount_word"
//                       name="reward.reword_amount_word"
//                       value={getMemoByIdData?.reward?.reword_amount_word}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="card mb-4">
//               <div className="card-body px-0 pt-0">
//                 <div className="row bdr-bottom m-auto">
//                   <div className="col-lg-12 text-center">
//                     <p className="m-0 py-2">&nbsp;</p>
//                   </div>
//                 </div>
//                 <div className="row pt-2 pb-1 px-2">
//                   <div className="col-lg-4 mb-3">
//                     <label>Vehicle owner name </label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       placeholder="Enter Owner’s name"
//                       id="vehicle_owner_name"
//                       name="vehicle_owner_name"
//                       value={getMemoByIdData.vehicle_owner_name}
//                     />
//                   </div>
//                   <div className="col-lg-4 mb-3">
//                     <label>Address </label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       placeholder="Enter address"
//                       id="vehicle_owner_address"
//                       name="vehicle_owner_address"
//                       value={getMemoByIdData.vehicle_owner_address}
//                     />
//                   </div>
//                   <div className="col-lg-4 mb-3">
//                     <label>Mobile number </label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       placeholder="Enter Number"
//                       id="vehicle_owner_phone"
//                       name="vehicle_owner_phone"
//                       value={getMemoByIdData.vehicle_owner_phone}
//                     />
//                   </div>
//                   <div className="col-lg-4 mb-3">
//                     <label>Vehicle Driver name </label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       placeholder="Enter Driver’s  name"
//                       id="vehicle_driver_name"
//                       name="vehicle_driver_name"
//                       value={getMemoByIdData.vehicle_driver_name}
//                     />
//                   </div>
//                   <div className="col-lg-4 mb-3">
//                     <label>Address </label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       placeholder="Enter address"
//                       id="vehicle_driver_address"
//                       name="vehicle_driver_address"
//                       value={getMemoByIdData.vehicle_driver_address}
//                     />
//                   </div>
//                   <div className="col-lg-4 mb-3">
//                     <label>Mobile number </label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       placeholder="Enter Number"
//                       id="vehicle_driver_phone"
//                       name="vehicle_driver_phone"
//                       value={getMemoByIdData.vehicle_driver_phone}
//                     />
//                   </div>
//                 </div>
//                 <div className="row pt-2 pb-1 px-2">
//                   <div className="col-lg-8">
//                     <div className="row">
//                       <div className="col-lg-6 mb-3">
//                         <label>Vehicle number </label>
//                         <input
//                           className="form-control"
//                           type="text"
//                           placeholder="Enter name"
//                           id="vehicle_number"
//                           name="vehicle_number"
//                           value={getMemoByIdData.vehicle_number}
//                         />
//                       </div>
//                       <div className="col-lg-6 mb-3">
//                         <label>Attached transport </label>
//                         <input
//                           className="form-control"
//                           type="text"
//                           placeholder="Enter name"
//                           id="attached_transport"
//                           name="attached_transport"
//                           value={getMemoByIdData.attached_transport}
//                         />
//                       </div>
//                       <div className="col-lg-6 mb-3">
//                         <label>Mobile number </label>
//                         <input
//                           className="form-control"
//                           type="text"
//                           placeholder="Enter Number"
//                           id="attached_transport_mobile_number"
//                           name="attached_transport_mobile_number"
//                           value={
//                             getMemoByIdData.attached_transport_mobile_number
//                           }
//                         />
//                       </div>
//                       <div className="col-lg-6 mb-3">
//                         <label>License number </label>
//                         <input
//                           className="form-control"
//                           type="text"
//                           placeholder="Enter Enter number"
//                           id="license_number"
//                           name="license_number"
//                           value={getMemoByIdData.license_number}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-lg-4">
//                     <label>Driver Signature</label>
//                     <div className="row">
//                       <div className="col-lg-12 mb-3">
//                         <div className="card signature-card">
//                           <div className="card-body">
//                             <p className="m-0">Signature</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   </div>
// );

//       var doc = new jsPDF();
//       doc.html(htmlContent, {
//   callback: function (doc) {
//     const totalPages = doc.internal.getNumberOfPages();
//     if (totalPages > 7) {
//       for (let i = totalPages; i > totalPages - 7; i--) {
//         doc.deletePage(i);
//       }
//     }
//     doc.save(moment().format("DDMMYYYYHHmmss") + ".pdf");
//   },

//   autoPaging: "text",
//   x: 5,
//   y: 5,
//   width: 200,
//   windowWidth: 930,
//   margin: [5, 0, 5, 0],
// });
//     }
//     isLoading = false;
//   };
//   return { isLoading, handleDownloadPDF };
// }

// export default useDownloadMemoPDF;

import React, { useState } from "react";
import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";
import moment from "moment";
import { getMemoByIdApi } from "../api";

function useDownloadMemoPDF() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPDF = async (id) => {
    setIsLoading(true);
    try {
      const res = await getMemoByIdApi(id);
      const getMemoByIdData = res.data;

      if (getMemoByIdData) {
        const htmlContent = ReactDOMServer.renderToString(
          <div className="row memo-form" id="challan-form">
            <section className="header">
              <div className="container page-invoice">
                <div className="row row-header d-flex align-items-center">
                  <div className="col-lg-2 col-md-2 col-sm col-4">
                    <img
                      src="/assets/images/image-2.png"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-lg-8 text-center d-none d-lg-block d-md-block">
                    <p className="m-0 p1">Shree Swami Samarth</p>
                    <h4 className="m-0 py-0">
                      Jai Laxmi Fruit Supplier Service Center, ugaon
                    </h4>
                    <p className="m-0 p2">
                      At/Post-Ugaon, Tal-Niphad, Dist-Nashik (Maharashtra)
                    </p>
                  </div>
                  <div
                    className="col-lg-2 col-md-8 col-sm col-8 pe-0 text-end pe-4"
                    style={{
                      borderRadius: "0px 20px 0px 0px",
                      backgroundColor: "#ff4545",
                      clipPath: "polygon(100% 100%, 100% 0, 25% 0%, 0 100%)",
                    }}
                  >
                    <h5 className="text-white pt-3">Memo No.</h5>
                    <div
                      className="btn btn-secondary"
                      style={{
                        // backgroundImage: "url(/assets/images/rectangle-15.png)",
                        // backgroundSize: "cover",
                        // borderRadius: "0px 20px 0px 0px",
                        backgroundColor: "#fff",
                        color: "#ff4545 ",
                      }}
                    >
                      #{getMemoByIdData?.memoId}
                    </div>
                    <p className="text-white">Delivery Challan</p>
                  </div>
                </div>
                <div className="row py-4">
                  <div className="col-lg-4 col-md-4">
                    <label>Party name who receiving the order</label>
                    <input
                      className="form-control"
                      placeholder="Enter party name"
                      id="recipient"
                      name="recipient"
                      value={getMemoByIdData.recipient}
                    />
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <label>Mobile Number</label>
                    <input
                      className="form-control"
                      placeholder="Enter party mobile number"
                      id="mobile_no"
                      name="mobile_no"
                      value={getMemoByIdData.mobile_no}
                    />
                  </div>
                  <div className="col-lg-4 col-md-4 position-relative">
                    <label>Date</label>
                    <input
                      className="form-control date"
                      placeholder="Enter Date"
                      type="date"
                      id="date"
                      name="date"
                      value={getMemoByIdData.date}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card mb-4">
                      <div className="card-body px-0 py-0">
                        <div className="table-responsive">
                          <table className="table mb-2">
                            <thead>
                              <tr>
                                <th>Trade Mark</th>
                                <th>Box</th>
                                <th>Receiver</th>
                                <th />
                              </tr>
                            </thead>
                            <tbody>
                              {getMemoByIdData?.details_of_box?.length &&
                                getMemoByIdData.details_of_box.map(
                                  (item, index) => (
                                    <tr key={index}>
                                      <td>
                                        <input
                                          className="form-control"
                                          placeholder="Trade mark"
                                          id="trade_mark"
                                          name="trade_mark"
                                          value={item?.trade_mark}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control"
                                          placeholder="Box"
                                          id="box"
                                          name="box"
                                          value={item?.box}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          className="form-control"
                                          placeholder="Receiver name"
                                          id="receiver"
                                          name="receiver"
                                          value={item?.receiver}
                                        />
                                      </td>
                                    </tr>
                                  )
                                )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="card mb-4">
                      <div className="card-body px-0 py-0">
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                <th>Tapshil</th>
                                <th>Weight</th>
                                <th>Qty</th>
                                <th>Per boxe rate</th>
                                <th>This Fare</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getMemoByIdData?.details_of_quantity?.length &&
                                getMemoByIdData.details_of_quantity.map(
                                  (item, index) => (
                                    <tr key={index}>
                                      <td className="w-120">
                                        <input
                                          className="form-control"
                                          placeholder="Receiver name"
                                          id="type"
                                          name="type"
                                          value={item.type}
                                        />
                                      </td>
                                      <td>
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="weight"
                                            name="weight"
                                            value={item?.weight}
                                          />
                                          <span
                                            className="input-group-text"
                                            id="basic-addon1"
                                          >
                                            kg
                                          </span>
                                        </div>
                                      </td>
                                      <td>
                                        <input
                                          className="form-control"
                                          type="number"
                                          id="quantity"
                                          name="quantity"
                                          value={item.quantity}
                                        />{" "}
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control"
                                          placeholder="In Rupees"
                                          id="per_boxes_rate"
                                          name="per_boxes_rate"
                                          value={item.per_boxes_rate}
                                        />{" "}
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control"
                                          placeholder="In Rupees"
                                          id="fare_rate"
                                          name="fare_rate"
                                          value={item.fare_rate}
                                        />{" "}
                                      </td>
                                    </tr>
                                  )
                                )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card mb-4">
                      <div className="card-body px-0 py-0">
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                <th colSpan={2} className="text-center">
                                  Jai Laxmi Fruit Supplier Service Center, ugaav
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="w-170">
                                  <label>Total Box</label>
                                </td>
                                <td>
                                  <input
                                    className="form-control"
                                    type="number"
                                    id="total_box"
                                    name="total_box"
                                    value={getMemoByIdData.total_box}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="w-170">
                                  <label>Total Fare</label>
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="In Rupees"
                                    id="total_fare"
                                    name="total_fare"
                                    value={getMemoByIdData.total_fare}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="w-170">
                                  <label>Advance Amount</label>
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="In Rupees"
                                    id="advance_amount"
                                    name="advance_amount"
                                    value={getMemoByIdData.advance_amount}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="w-170">
                                  <label>Balance Amount</label>
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="In Rupees"
                                    id="balance_amount"
                                    name="balance_amount"
                                    value={getMemoByIdData.balance_amount}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card mb-4">
                      <div className="card-body px-0 pt-0">
                        <div className="row bdr-bottom m-auto">
                          <div className="col-lg-12 text-center">
                            <p className="m-0 py-2">Reward</p>
                          </div>
                        </div>
                        <div className="row pt-2 pb-1 px-2">
                          <div className="col-lg-4 position-relative">
                            <label>Vehicle Departure Date </label>
                            <input
                              className="form-control"
                              type="date"
                              placeholder="Enter Date"
                              id="reward.vehicle_departure_date"
                              name="reward.vehicle_departure_date"
                              value={
                                getMemoByIdData?.reward?.vehicle_departure_date
                              }
                            />
                          </div>
                          <div className="col-lg-2 position-relative">
                            <label>Time </label>
                            <input
                              className="form-control"
                              type="time"
                              placeholder="Enter Time"
                              id="reward.departure_time"
                              name="reward.departure_time"
                              value={getMemoByIdData?.reward?.departure_time}
                            />
                          </div>
                          <div className="col-lg-4 position-relative">
                            <label>Vehicle Reaching Date </label>
                            <input
                              className="form-control"
                              type="date"
                              placeholder="Enter Date"
                              id="reward.vehicle_reaching_date"
                              name="reward.vehicle_reaching_date"
                              value={
                                getMemoByIdData?.reward?.vehicle_reaching_date
                              }
                            />
                          </div>
                          <div className="col-lg-2 position-relative">
                            <label>Time </label>
                            <input
                              className="form-control"
                              type="time"
                              placeholder="Enter Time"
                              id="reward.reaching_time"
                              name="reward.reaching_time"
                              value={getMemoByIdData?.reward?.reaching_time}
                            />
                          </div>
                        </div>
                        <div className="row pt-2 pb-1 px-2">
                          <div className="col-lg-3 position-relative ">
                            <label>If Driver Reaches Within </label>
                            <div className="input-group">
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Time"
                                id="reward.driver_reaches_within"
                                name="reward.driver_reaches_within"
                                value={
                                  getMemoByIdData?.reward?.driver_reaches_within
                                }
                              />

                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                hours
                              </span>
                            </div>{" "}
                          </div>
                          <div className="col-lg-4">
                            <label>Then Reward Amount </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="In Rupees"
                              id="reward.reward_amount"
                              name="reward.reward_amount"
                              value={getMemoByIdData?.reward?.reward_amount}
                            />
                          </div>
                          <div className="col-lg-5">
                            <label>Then Reward Amount in Words </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="In Rupees"
                              id="reward.reword_amount_word"
                              name="reward.reword_amount_word"
                              value={
                                getMemoByIdData?.reward?.reword_amount_word
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card mb-4">
                      <div className="card-body px-0 pt-0">
                        <div className="row bdr-bottom m-auto">
                          <div className="col-lg-12 text-center">
                            <p className="m-0 py-2">&nbsp;</p>
                          </div>
                        </div>
                        <div className="row pt-2 pb-1 px-2">
                          <div className="col-lg-4 mb-3">
                            <label>Vehicle owner name </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter Owner’s name"
                              id="vehicle_owner_name"
                              name="vehicle_owner_name"
                              value={getMemoByIdData.vehicle_owner_name}
                            />
                          </div>
                          <div className="col-lg-4 mb-3">
                            <label>Address </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter address"
                              id="vehicle_owner_address"
                              name="vehicle_owner_address"
                              value={getMemoByIdData.vehicle_owner_address}
                            />
                          </div>
                          <div className="col-lg-4 mb-3">
                            <label>Mobile number </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter Number"
                              id="vehicle_owner_phone"
                              name="vehicle_owner_phone"
                              value={getMemoByIdData.vehicle_owner_phone}
                            />
                          </div>
                          <div className="col-lg-4 mb-3">
                            <label>Vehicle Driver name </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter Driver’s  name"
                              id="vehicle_driver_name"
                              name="vehicle_driver_name"
                              value={getMemoByIdData.vehicle_driver_name}
                            />
                          </div>
                          <div className="col-lg-4 mb-3">
                            <label>Address </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter address"
                              id="vehicle_driver_address"
                              name="vehicle_driver_address"
                              value={getMemoByIdData.vehicle_driver_address}
                            />
                          </div>
                          <div className="col-lg-4 mb-3">
                            <label>Mobile number </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter Number"
                              id="vehicle_driver_phone"
                              name="vehicle_driver_phone"
                              value={getMemoByIdData.vehicle_driver_phone}
                            />
                          </div>
                        </div>
                        <div className="row pt-2 pb-1 px-2">
                          <div className="col-lg-8">
                            <div className="row">
                              <div className="col-lg-6 mb-3">
                                <label>Vehicle number </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Enter name"
                                  id="vehicle_number"
                                  name="vehicle_number"
                                  value={getMemoByIdData.vehicle_number}
                                />
                              </div>
                              <div className="col-lg-6 mb-3">
                                <label>Attached transport </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Enter name"
                                  id="attached_transport"
                                  name="attached_transport"
                                  value={getMemoByIdData.attached_transport}
                                />
                              </div>
                              <div className="col-lg-6 mb-3">
                                <label>Mobile number </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Enter Number"
                                  id="attached_transport_mobile_number"
                                  name="attached_transport_mobile_number"
                                  value={
                                    getMemoByIdData.attached_transport_mobile_number
                                  }
                                />
                              </div>
                              <div className="col-lg-6 mb-3">
                                <label>License number </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Enter Enter number"
                                  id="license_number"
                                  name="license_number"
                                  value={getMemoByIdData.license_number}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <label>Driver Signature</label>
                            <div className="row">
                              <div className="col-lg-12 mb-3">
                                <div className="card signature-card">
                                  <div className="card-body">
                                    <p className="m-0">Signature</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

        const pdf = new jsPDF();
        pdf.html(htmlContent, {
          callback: (doc) => {
            const totalPages = doc.internal.getNumberOfPages();
            if (totalPages > 7) {
              for (let i = totalPages; i > totalPages - 7; i--) {
                doc.deletePage(i);
              }
            }
            doc.save(moment().format("DDMMYYYYHHmmss") + ".pdf");
          },

          autoPaging: "text",
          x: 5,
          y: 5,
          width: 200,
          windowWidth: 930,
          margin: [5, 0, 5, 0],
        });
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleDownloadPDF, isLoading };
}

export default useDownloadMemoPDF;
