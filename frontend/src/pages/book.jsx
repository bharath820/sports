// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal, Button, Form } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate, useLocation } from "react-router-dom";



// const Book = () => {
//   const location = useLocation();
//   const sportName = location.state?.sport || "Ground";
//   console.log(sportName);

//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [daysInWeek, setDaysInWeek] = useState([]);
//   const [selectedPlace, setSelectedPlace] = useState("Kukatpally");
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [userName, setUserName] = useState("");
  

//   const navigate = useNavigate();

//   const places = ["Kukatpally", "LB Nagar", "Madhapur", "Gachibowli", "KPHB"];

//   const [timeSlots, setTimeSlots] = useState(
//     places.map((place) => ({
//       place,
//       slots: [
//         { time: "10:00 AM", status: "available" },
//         { time: "12:00 PM", status: "available" },
//         { time: "2:00 PM", status: "available" },
//         { time: "4:00 PM", status: "available" },
//         { time: "6:00 PM", status: "available" },
//         { time: "8:00 PM", status: "available" },
//       ],
//     }))
//   );

//   useEffect(() => {
//     setDaysInWeek(getWeekDates(selectedDate));
//   }, [selectedDate]);

//   const getWeekDates = (date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // normalize to midnight
//     const startOfWeek = new Date(date);
//     startOfWeek.setDate(date.getDate() - date.getDay());
  
//     return [...Array(7)].map((_, i) => {
//       const d = new Date(startOfWeek);
//       d.setDate(startOfWeek.getDate() + i);
//       return d;
//     }).filter((d) => d >= today);
//   };

//   const formatDate = (date) =>
//     date.toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

//   const handleTimeSlotSelect = (time) => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // or check for a token

//     if (!isLoggedIn) {
//       toast.info("Please log in to book a slot", {
//         position: "top-center",
//         autoClose: 2000,
//       });

//       navigate("/login", { state: { from: "/book", selectedTime: time } });
//       return;
//     }

//     // If logged in, open the booking modal and set the selected slot
//     setSelectedSlot({ time, date: selectedDate });
//     setShowModal(true);
//   };

//   const handleConfirmBooking = () => {
//     if (!userName || !selectedSlot) return;

//     navigate({Payment}, {
//       state: {
//         userName,
//         slot: selectedSlot,
//         amount: 500, // Pass the amount to the payment page
//       },
//     });

//     setTimeSlots((prev) =>
//       prev.map((place) =>
//         place.place === selectedPlace
//           ? {
//               ...place,
//               slots: place.slots.map((slot) =>
//                 slot.time === selectedSlot.time
//                   ? { ...slot, status: "booked" }
//                   : slot
//               ),
//             }
//           : place
//       )
//     );

//     const bookingDateTime = new Date(selectedSlot.date);
//     const [hours, minsPart] = selectedSlot.time.split(":");
//     let [minutes, ampm] = minsPart.split(" ");
//     let hour24 = parseInt(hours);
//     if (ampm === "PM" && hour24 !== 12) hour24 += 12;
//     if (ampm === "AM" && hour24 === 12) hour24 = 0;

//     bookingDateTime.setHours(hour24, parseInt(minutes), 0, 0);
//     const now = new Date();
//     const timeUntilSlot = bookingDateTime - now;

//     if (timeUntilSlot > 0) {
//       setTimeout(() => {
//         setTimeSlots((prev) =>
//           prev.map((place) =>
//             place.place === selectedPlace
//               ? {
//                   ...place,
//                   slots: place.slots.map((slot) =>
//                     slot.time === selectedSlot.time
//                       ? { ...slot, status: "available" }
//                       : slot
//                   ),
//                 }
//               : place
//           )
//         );
//       }, timeUntilSlot);
//     }

//     setShowModal(false);
//     setUserName("");
//     setPaymentMethod("UPI");
//     setPaymentDetails({ upiId: "", cardNumber: "", expiry: "", cvv: "" });
//     setSelectedSlot(null);
//   };

//   const filteredTimeSlots =
//     timeSlots.find((place) => place.place === selectedPlace)?.slots || [];

//   return (
//     <div className="container my-5">
//       <ToastContainer />
//       <div className="bg-white p-4 rounded shadow-sm">
//         {/* Ground Title */}
//         <h2 className="text-center text-success mb-4">
//           Welcome {sportName} Ground
//         </h2>

//         {/* Date Navigator */}
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h2 className="h5 text-primary mb-0">{formatDate(selectedDate)}</h2>
//           <div className="d-flex gap-2">
//           <button
//   className="btn btn-outline-secondary"
//   onClick={() => {
//     const newDate = new Date(selectedDate);
//     newDate.setDate(selectedDate.getDate() - 7);
//     if (newDate >= new Date().setHours(0, 0, 0, 0)) {
//       setSelectedDate(newDate);
//     }
//   }}
// >
//   &lt;
// </button>
//             <button
//               className="btn btn-outline-primary"
//               onClick={() => setSelectedDate(new Date())}
//             >
//               Today
//             </button>
//             <button
//               className="btn btn-outline-secondary"
//               onClick={() =>
//                 setSelectedDate(
//                   new Date(selectedDate.setDate(selectedDate.getDate() + 7))
//                 )
//               }
//             >
//               &gt;
//             </button>
//           </div>
//         </div>

//         {/* Week Calendar */}
//         <div className="row text-center mb-4">
//           {daysInWeek.map((date, index) => (
//             <div
//               key={index}
//               className={`col rounded py-2 ${
//                 date.toDateString() === selectedDate.toDateString()
//                   ? "bg-primary text-white"
//                   : "bg-light"
//               }`}
//               style={{ cursor: "pointer" }}
//               onClick={() => setSelectedDate(date)}
//             >
//               <div className="small text-muted">
//                 {date.toLocaleDateString("en-US", { weekday: "short" })}
//               </div>
//               <div className="fw-bold">{date.getDate()}</div>
//             </div>
//           ))}
//         </div>

//         {/* Place Selector */}
//         <div className="mb-4">
//           <Form.Select
//             value={selectedPlace}
//             onChange={(e) => setSelectedPlace(e.target.value)}
//             className="w-auto"
//           >
//             {places.map((place, index) => (
//               <option key={index} value={place}>
//                 {place}
//               </option>
//             ))}
//           </Form.Select>
//         </div>

//         {/* Time Slots */}
//         <h4 className="mt-4 mb-3 text-primary">
//           Available Slots for {selectedPlace}
//         </h4>
//         <div className="row g-3">
//           {filteredTimeSlots.map((slot, index) => (
//             <div key={index} className="col-sm-6 col-md-4 col-lg-3">
//               <div
//                 className={`p-3 rounded border ${
//                   slot.status === "available"
//                     ? "border-success bg-light"
//                     : "border-danger bg-light text-danger"
//                 }`}
//                 style={{
//                   cursor:
//                     slot.status === "available" ? "pointer" : "not-allowed",
//                 }}
//                 onClick={() =>
//                   slot.status === "available" &&
//                   handleTimeSlotSelect(slot.time)
//                 }
//               >
//                 <div className="d-flex justify-content-between align-items-center">
//                   <span className="fw-medium">{slot.time}</span>
//                   <span
//                     className={`text-${
//                       slot.status === "available" ? "success" : "danger"
//                     } small fw-semibold`}
//                   >
//                     {slot.status === "available" ? "Available" : "Booked"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Book;