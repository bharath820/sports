import React from "react";
import Review1 from "../Assetss/review1.jpg";
import Review2 from "../Assetss/review2.jpg";
import Review3 from "../Assetss/review3.jpg";

const reviews = [
  {
    name: "Tsveti Kamova",
    role: "Owner, Red Paper Plane",
    image: Review1,
    text: `We booked Sunrise Arena for our weekend tournament and were amazed by how well-maintained the ground was. The online booking process was super easy, and the staff on-site were extremely helpful. We'll definitely use GroundBooking again for our future events.""`
  },
  {
    name: "Priya Sharma",
    role: "Manager, Greenfield Ground",
    image: Review2,
    text: `"Ground management was smooth and hassle-free. The facility is well-maintained, and communication with the staff was great throughout."`
  },
  {
    name: "Arjun Patel",
    role: "Event Coordinator, Sunrise Arena",
    image: Review3,
    text: `"Excellent experience managing our sports events here. The infrastructure is top-notch and the support team was very cooperative."`
  }
];

const Testimonial = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-8">
      {reviews.map((review, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          } items-center gap-6 p-6 bg-white shadow-md rounded-2xl`}
        >
          <div className="w-full md:w-2/5 flex justify-center">
            <img
              src={review.image}
              alt={review.name}
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>
          <div className="w-full md:w-3/5">
            <h3 className="text-xl font-semibold">{review.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{review.role}</p>
            <p className="text-gray-700">{review.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonial;
