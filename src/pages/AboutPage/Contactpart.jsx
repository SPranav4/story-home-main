// import React from "react";
// import Button from "../../components/common/Button";

// const ContactPart = () => {
//   return (
//     <div className="mx-auto max-w-[1200px] flex flex-col justify-center items-center mb-[174px] md:mt-12 lg:my-[200px]">
//       <h1 className="text-[26px] md:text-[35px] w-[340px] md:w-[480px] lg:w-[700px] lg:text-[50px] text-center">
//         Creative project? Let's have a productive talk.
//       </h1>
//       <div className="mt-[80px] grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10 justify-start items-center">
//         <div class="relative">
//           <input
//             type="text"
//             class="peer placeholder-transparent h-10 w-[300px] lg:w-[500px] border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
//             placeholder="Your name"
//           />
//           <label
//             for="name"
//             class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
//             Name
//           </label>
//         </div>
//         <div class="relative mt-14 md:mt-0 lg:mt-0">
//           <input
//             type="Email"
//             class="peer placeholder-transparent h-10 w-[300px] lg:w-[500px] border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
//             placeholder="Email"
//           />
//           <label
//             for="Email"
//             class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
//             Email
//           </label>
//         </div>
//       </div>
//       <div class="relative mr-[76px] md:mr-auto lg:mr-auto mt-[90px] mx-20">
//         <input
//           type="Message"
//           class="peer placeholder-transparent h-10 w-[300px] md:w-[600px] lg:w-[1050px] border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
//           placeholder="Message"
//         />
//         <label
//           for="Message"
//           class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
//           Message
//         </label>
//       </div>{" "}
//       <div className="my-42 ml-[-170px]">
//         {" "}
//         <Button title={"Send Now"} />
//       </div>
//     </div>
//   );
// };

// export default ContactPart;


import React from "react";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";

const ContactPart = () => {
  return (
    <div className="mx-auto max-w-[1200px] flex flex-col justify-center items-center mb-[174px] md:mt-12 lg:my-[200px] px-4">
      <h1 className="text-[26px] md:text-[35px] lg:text-[50px] text-center">
        Creative project? Let's have a productive talk.
      </h1>
      <p className="text-[18px] md:text-[20px] text-center text-gray-600 mt-6 max-w-[800px]">
        Ready to transform your Visakhapatnam home with coastal-inspired interior design? 
        Reach out to discuss how we can create spaces that celebrate both your style and our beautiful city.
      </p>
      
      <div className="mt-12 flex flex-col items-center">
        <div className="w-full max-w-[600px] bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
          <div className="p-8 bg-gray-50 border-b">
            <h2 className="text-2xl font-semibold text-gray-800">Get in touch with our design team</h2>
            <p className="mt-2 text-gray-600">We'll help bring your vision to life with seaside elegance</p>
          </div>
          
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#C16828] rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Email us at</p>
                <p className="text-lg font-medium">wallstories.ds@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#C16828] rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Call us at</p>
                <p className="text-lg font-medium">+91 9010533518</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#C16828] rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Visit us</p>
                <p className="text-lg font-medium">Visakhapatnam</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10">
          <Link to="/contact" 
  onClick={() => window.scrollTo(0, 0)}>
            <Button title="Contact Our Design Team" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPart;