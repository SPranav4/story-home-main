// import React from "react";
// import contactImage from "../../assets/contact.jpg";
// import CommonBanner from "../../components/common/CommonBanner";
// import Button from "../../components/common/Button";
// import { Link } from "react-router-dom";


// const Contact = () => {
//   return (
//     <div>
//       <CommonBanner
//         title={"Contact Us"}
//         bannerImage={contactImage}
//         bread1={<Link to = '/' className = 'hover:text-[#d6763e] transition-colors' >Home</Link>}
//         bread2={"Contact"}
//       />

//       <section className="py-6 my-32">
//         <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
//           <div className="py-6 md:py-0 md:px-6">
//             <h1 className="text-4xl font-bold">Get in touch</h1>
//             <p className="pt-2 pb-4">
//               Fill in the form to start a conversation
//             </p>
//             <div className="space-y-4">
//               <p className="flex items-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   className="w-5 h-5 mr-2 sm:mr-6">
//                   <path
//                     fillRule="evenodd"
//                     d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                     clipRule="evenodd"></path>
//                 </svg>
//                 <span>Fake address, 9999 City</span>
//               </p>
//               <p className="flex items-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   className="w-5 h-5 mr-2 sm:mr-6">
//                   <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
//                 </svg>
//                 <span>123456789</span>
//               </p>
//               <p className="flex items-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   className="w-5 h-5 mr-2 sm:mr-6">
//                   <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
//                   <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
//                 </svg>
//                 <span>contact@business.com</span>
//               </p>
//             </div>
//           </div>
//           <form
//             novalidate=""
//             className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
//             <label className="block">
//               <span className="mb-1">Full name</span>
//               <input
//                 type="text"
//                 placeholder="abc"
//                 className="block w-full shadow-sm border-b border-gray-300"
//               />
//             </label>
//             <label className="block">
//               <span className="mb-1">Email address</span>
//               <input
//                 type="email"
//                 placeholder="a@g.com"
//                 className="block w-full shadow-sm border-b border-gray-300"
//               />
//             </label>
//             <label className="block">
//               <span className="mb-1">Message</span>
//               <textarea
//                 rows="3"
//                 placeholder="write somethings"
//                 className="block w-full border-b border-gray-300"></textarea>
//             </label>
//             <div className="my-[200px]">
//               <Button title={"Submit"} />
//             </div>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaPhone, FaPaperPlane, FaRegCheckCircle, FaCommentAlt } from "react-icons/fa";
import CommonBanner from "../../components/common/CommonBanner";
import contactImage from "../../assets/contact.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    requirements: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Store lead data in localStorage for AdminLeadsView
    try {
      // Generate a unique ID
      const leadId = Date.now().toString();
      
      // Create lead object matching admin panel format
      const leadData = {
        id: leadId,
        name: formData.name,
        phone: formData.phone,
        requirements: formData.requirements,
        spaceType: "Not specified", // Required for admin panel
        style: "Not specified", // Required for admin panel
        location: "Contact Form Submission",
        source: "Simple Contact Form",
        timestamp: new Date().toISOString()
      };
      
      // Get existing leads or initialize empty array
      let existingLeads = [];
      try {
        const storedLeads = localStorage.getItem("designLeads");
        existingLeads = storedLeads ? JSON.parse(storedLeads) : [];
      } catch (error) {
        console.error("Error parsing stored leads:", error);
        existingLeads = [];
      }
      
      // Add new lead to the array
      existingLeads.push(leadData);
      
      // Save back to localStorage
      localStorage.setItem("designLeads", JSON.stringify(existingLeads));
      
      // Show success message after a delay
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            phone: "",
            requirements: "",
          });
        }, 5000);
      }, 1000);
      
    } catch (error) {
      console.error("Error storing contact form data:", error);
      setIsSubmitting(false);
      alert("There was an error submitting your request. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50">
      <CommonBanner
        title={"Contact Us"}
        bannerImage={contactImage}
        bread1={<Link to="/" className="hover:text-[#d6763e] transition-colors">Home</Link>}
        bread2={"Contact"}
      />
      
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex flex-col md:flex-row items-stretch gap-8">
          {/* Left side - Info Card */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Create Your Dream Space</h2>
              <p className="text-amber-100 mb-8 text-lg">
                Get in touch with our design experts and transform your home into a beautiful, functional space.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-full text-white">
                    <FaPhone />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Call Us</h3>
                    <p className="text-amber-100">+91 9010533518</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-full text-white">
                    <FaCommentAlt />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email Us</h3>
                    <p className="text-amber-100">wallstories.ds@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-amber-400/30 pt-6 mt-6">
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 px-4 py-2 rounded-full text-sm">Modern Design</div>
                <div className="bg-white/10 px-4 py-2 rounded-full text-sm">Premium Quality</div>
                <div className="bg-white/10 px-4 py-2 rounded-full text-sm">10-Year Warranty</div>
                <div className="bg-white/10 px-4 py-2 rounded-full text-sm">Experts</div>
              </div>
            </div>
          </div>
          
          {/* Right side - Contact Form */}
          <div className="w-full md:w-1/2">
            <div className="bg-white shadow-xl rounded-2xl p-8 h-full">
              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Get In Touch</h2>
                    <p className="text-gray-600">Fill out this simple form to get a free consultation.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-3 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <FaPhone />
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-3 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300`}
                          placeholder="10-digit mobile number"
                          maxLength={10}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Design Requirements</label>
                      <textarea
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleInputChange}
                        placeholder="Tell us about your design needs or any specific requirements..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 min-h-[100px]"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2" />
                          Send Request
                        </>
                      )}
                    </button>
                    
                    <p className="text-sm text-gray-500 text-center mt-4">
                      We value your privacy. Your information is safe with us.
                    </p>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <FaRegCheckCircle className="text-green-500 text-3xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h2>
                  <p className="text-gray-600 mb-6 max-w-md">
                    Your request has been submitted successfully. Our design team will contact you shortly.
                  </p>
                  <Link 
                    to="/"
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                  >
                    Back to Home
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Additional section - Our Promise */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Our Promise to You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Personalized Design</h3>
              <p className="text-gray-600">Each design is tailored to your unique preferences and requirements.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Quick Response</h3>
              <p className="text-gray-600">Our team will contact you within 24 hours of your request submission.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💯</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-600">We work tirelessly until you're completely satisfied with your design.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;