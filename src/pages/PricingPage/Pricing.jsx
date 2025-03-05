// import React from "react";
// import CommonBanner from "../../components/common/CommonBanner";
// import pricingBanner from "../../assets/pricing.png";
// import { PricingData } from "../../components/common/data";
// import Button from "../../components/common/Button";
// const Pricing = () => {
//   return (
//     <div>
//       <CommonBanner
//         title={"Pricing& Plan"}
//         bannerImage={pricingBanner}
//         bread1={"Home"}
//         bread2={"Pricing"}
//       />
//       <div className="mt-[50px] lg:my-[100px] max-w-[360px] md:max-w-[720px] lg:max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-3 lg:gap-10">
//         {PricingData?.map((pricedata, i) => {
//           return (
//             <div
//               class="divide-y divide-gray-200 text-center drop-shadow-md hover:bg-[#f5e3d88a] hover:rounded-[15px] group hover:text-[#C16828]"
//               key={i}>
//               <div>
//                 <h1 class="text-[27px] mt-8 font-normal">{pricedata.title}</h1>
//                 <h1 class="text-[85px]">
//                   <span className="text-[25px]">$</span>
//                   {pricedata.price}
//                   <span class="text-[25px] font-normal">/month</span>
//                 </h1>
//               </div>

//               <div class="px-6 pt-6 pb-8">
//                 <h3 class="text-[20px] font-medium">What's included</h3>
//                 <ul class="mt-6 space-y-3 text-[18px] text-[#4D5053] hover:text-[#C16828] font-normal">
//                   {pricedata.services?.map((service, i) => {
//                     return <li key={i}>{service.name}</li>;
//                   })}
//                 </ul>
//                 <div className="flex justify-center items-center mt-10">
//                   <Button title={"Get Started"} />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Pricing;







// import React, { useState } from "react";
// import CommonBanner from "../../components/common/CommonBanner";
// import pricingBanner from "../../assets/pricing.png";
// import Button from "../../components/common/Button";

// // Main Quotation Page component
// const Pricing = () => {
//   return (
//     <div>
//       <CommonBanner
//         title={"Interior Quotation"}
//         bannerImage={pricingBanner}
//         // bread1={"Home"}
//         // bread2={"Quotation"}
//       />
      
//       <div className="mt-[50px] lg:my-[100px] max-w-[1200px] mx-auto">
//         <PasswordProtectedQuotation />
//       </div>
//     </div>
//   );
// };

// // PasswordProtectedQuotation component
// const PasswordProtectedQuotation = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
  
//   // Quotation form state
//   const [quotationData, setQuotationData] = useState({
//     roomType: "Living Room",
//     squareFootage: "",
//     designStyle: "Modern",
//     services: [],
//     clientName: "",
//     clientEmail: "",
//     clientPhone: "",
//     additionalNotes: "",
//   });
  
//   // Quotation result state
//   const [quotationResult, setQuotationResult] = useState(null);
  
//   const correctPassword = "interiorQuote2025"; // This should be stored securely in a real application
  
//   const handleAuthentication = (e) => {
//     e.preventDefault();
//     if (password === correctPassword) {
//       setIsAuthenticated(true);
//       setError("");
//     } else {
//       setError("Incorrect password. Please try again.");
//     }
//   };
  
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setQuotationData({
//       ...quotationData,
//       [name]: value
//     });
//   };
  
//   const handleCheckboxChange = (e) => {
//     const { value, checked } = e.target;
//     setQuotationData({
//       ...quotationData,
//       services: checked 
//         ? [...quotationData.services, value]
//         : quotationData.services.filter(service => service !== value)
//     });
//   };
  
//   const calculateQuotation = () => {
//     // Base rates per square foot based on room type
//     const baseRates = {
//       "Living Room": 25,
//       "Bedroom": 20,
//       "Kitchen": 35,
//       "Bathroom": 40,
//       "Office": 22,
//       "Dining Room": 28,
//     };
    
//     // Style multipliers
//     const styleMultipliers = {
//       "Modern": 1.0,
//       "Traditional": 1.1,
//       "Minimalist": 0.9,
//       "Industrial": 1.05,
//       "Scandinavian": 1.15,
//       "Bohemian": 1.2,
//       "Luxury": 1.5,
//     };
    
//     // Service add-ons
//     const serviceAddOns = {
//       "Interior Design": 500,
//       "3D Rendering": 350,
//       "Furniture Selection": 250,
//       "Color Consultation": 150,
//       "Lighting Design": 200,
//       "Custom Furniture": 800,
//     };
    
//     // Calculate base cost
//     const squareFootage = parseFloat(quotationData.squareFootage);
//     if (isNaN(squareFootage)) return null;
    
//     const baseRate = baseRates[quotationData.roomType] || 25;
//     const styleMultiplier = styleMultipliers[quotationData.designStyle] || 1.0;
    
//     let baseCost = squareFootage * baseRate * styleMultiplier;
    
//     // Add service costs
//     let serviceCosts = 0;
//     quotationData.services.forEach(service => {
//       serviceCosts += serviceAddOns[service] || 0;
//     });
    
//     const total = baseCost + serviceCosts;
    
//     return {
//       baseCost: baseCost.toFixed(2),
//       serviceCosts: serviceCosts.toFixed(2),
//       total: total.toFixed(2),
//       breakdown: quotationData.services.map(service => ({
//         service,
//         cost: serviceAddOns[service] || 0
//       }))
//     };
//   };
  
//   const handleQuotationSubmit = (e) => {
//     e.preventDefault();
//     const result = calculateQuotation();
//     setQuotationResult(result);
//   };
  
//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setPassword("");
//     setQuotationData({
//       roomType: "Living Room",
//       squareFootage: "",
//       designStyle: "Modern",
//       services: [],
//       clientName: "",
//       clientEmail: "",
//       clientPhone: "",
//       additionalNotes: "",
//     });
//     setQuotationResult(null);
//   };
  
//   // Authentication Form
//   if (!isAuthenticated) {
//     return (
//       <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto mt-10">
//         <h2 className="text-2xl font-semibold text-center mb-6">Interior Quotation Access</h2>
//         <form onSubmit={handleAuthentication}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="password"
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
//           <div className="flex items-center justify-center">
//             <button
//               className="bg-[#C16828] hover:bg-[#a85a23] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Access Quotation System
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   }
  
//   // Quotation System UI
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md max-w-6xl mx-auto mt-10">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Interior Design Quotation Generator</h2>
//         <button
//           onClick={handleLogout}
//           className="text-sm text-gray-600 hover:text-[#C16828]"
//         >
//           Logout
//         </button>
//       </div>
      
//       {!quotationResult ? (
//         <form onSubmit={handleQuotationSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <h3 className="text-lg font-medium mb-4">Project Details</h3>
            
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomType">
//                 Room Type
//               </label>
//               <select
//                 className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="roomType"
//                 name="roomType"
//                 value={quotationData.roomType}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="Living Room">Living Room</option>
//                 <option value="Bedroom">Bedroom</option>
//                 <option value="Kitchen">Kitchen</option>
//                 <option value="Bathroom">Bathroom</option>
//                 <option value="Office">Office</option>
//                 <option value="Dining Room">Dining Room</option>
//               </select>
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="squareFootage">
//                 Square Footage
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="squareFootage"
//                 name="squareFootage"
//                 type="number"
//                 min="1"
//                 placeholder="Enter square footage"
//                 value={quotationData.squareFootage}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designStyle">
//                 Design Style
//               </label>
//               <select
//                 className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="designStyle"
//                 name="designStyle"
//                 value={quotationData.designStyle}
//                 onChange={handleInputChange}
//               >
//                 <option value="Modern">Modern</option>
//                 <option value="Traditional">Traditional</option>
//                 <option value="Minimalist">Minimalist</option>
//                 <option value="Industrial">Industrial</option>
//                 <option value="Scandinavian">Scandinavian</option>
//                 <option value="Bohemian">Bohemian</option>
//                 <option value="Luxury">Luxury</option>
//               </select>
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Services Required
//               </label>
//               <div className="pl-4 space-y-2">
//                 {["Interior Design", "3D Rendering", "Furniture Selection", "Color Consultation", "Lighting Design", "Custom Furniture"].map((service) => (
//                   <div key={service} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id={service.replace(/\s+/g, '-').toLowerCase()}
//                       name="services"
//                       value={service}
//                       checked={quotationData.services.includes(service)}
//                       onChange={handleCheckboxChange}
//                       className="mr-2"
//                     />
//                     <label htmlFor={service.replace(/\s+/g, '-').toLowerCase()}>{service}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           <div>
//             <h3 className="text-lg font-medium mb-4">Client Information</h3>
            
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientName">
//                 Name
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="clientName"
//                 name="clientName"
//                 type="text"
//                 placeholder="Enter your name"
//                 value={quotationData.clientName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientEmail">
//                 Email
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="clientEmail"
//                 name="clientEmail"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={quotationData.clientEmail}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientPhone">
//                 Phone
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="clientPhone"
//                 name="clientPhone"
//                 type="tel"
//                 placeholder="Enter your phone number"
//                 value={quotationData.clientPhone}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="additionalNotes">
//                 Additional Notes
//               </label>
//               <textarea
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="additionalNotes"
//                 name="additionalNotes"
//                 rows="4"
//                 placeholder="Any specific requirements or details..."
//                 value={quotationData.additionalNotes}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
          
//           <div className="col-span-1 md:col-span-2 flex justify-center">
//             <button
//               type="submit"
//               className="bg-[#C16828] hover:bg-[#a85a23] text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline"
//             >
//               Generate Quotation
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="bg-gray-50 p-6 rounded-lg">
//           <h3 className="text-xl font-medium mb-4 text-center">Your Custom Interior Design Quotation</h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h4 className="font-semibold text-lg mb-2">Client Information</h4>
//               <p><span className="font-medium">Name:</span> {quotationData.clientName}</p>
//               <p><span className="font-medium">Email:</span> {quotationData.clientEmail}</p>
//               <p><span className="font-medium">Phone:</span> {quotationData.clientPhone}</p>
              
//               <h4 className="font-semibold text-lg mt-4 mb-2">Project Details</h4>
//               <p><span className="font-medium">Room Type:</span> {quotationData.roomType}</p>
//               <p><span className="font-medium">Square Footage:</span> {quotationData.squareFootage} sq ft</p>
//               <p><span className="font-medium">Design Style:</span> {quotationData.designStyle}</p>
              
//               {quotationData.additionalNotes && (
//                 <>
//                   <h4 className="font-semibold text-lg mt-4 mb-2">Additional Notes</h4>
//                   <p>{quotationData.additionalNotes}</p>
//                 </>
//               )}
//             </div>
            
//             <div>
//               <h4 className="font-semibold text-lg mb-2">Cost Breakdown</h4>
//               <p><span className="font-medium">Base Design Cost:</span> ${quotationResult.baseCost}</p>
              
//               {quotationResult.breakdown.length > 0 && (
//                 <div className="mt-2">
//                   <p className="font-medium">Additional Services:</p>
//                   <ul className="pl-5 list-disc">
//                     {quotationResult.breakdown.map((item, index) => (
//                       <li key={index}>
//                         {item.service}: ${item.cost.toFixed(2)}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
              
//               <div className="mt-6 pt-4 border-t border-gray-300">
//                 <p className="text-xl font-bold flex justify-between">
//                   <span>Total Estimate:</span>
//                   <span className="text-[#C16828]">${quotationResult.total}</span>
//                 </p>
//               </div>
              
//               <div className="mt-6 text-sm text-gray-500">
//                 <p>This quotation is an estimate based on the information provided. Final pricing may vary based on detailed requirements and site inspection.</p>
//                 <p className="mt-2">Quotation valid for 30 days.</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="mt-8 flex justify-center space-x-4">
//             <button
//               onClick={() => setQuotationResult(null)}
//               className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Edit Quotation
//             </button>
//             <button
//               onClick={() => window.print()}
//               className="bg-[#C16828] hover:bg-[#a85a23] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Print / Save PDF
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Pricing;





// --------
// -
// -
// -
// -

// -
// -
// -

// -
// -
// -
// -







// import React, { useState, useRef } from "react";
// import Button from "../../components/common/Button";

// // Main Quotation Page component
// const Pricing = () => {
//   return (
//     <div>
//       <PasswordProtectedQuotation />
//     </div>
//   );
// };

// // Logo component
// const Logo = () => {
//   return (
//     <div className="text-center py-4">
//       <img 
//         src="/wslogo.png" // Replace with actual logo path
//         alt="Company Logo"
//         className="h-16 mx-auto"

//       />
//     </div>
//   );
// };

// // PasswordProtectedQuotation component
// const PasswordProtectedQuotation = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showCustomerForm, setShowCustomerForm] = useState(false);
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
  
//   // Customer information
//   const [customerInfo, setCustomerInfo] = useState({
//     date: new Date().toISOString().slice(0, 10),
//     customerName: "",
//     bhkType: "2BHK",
//     location: "",
//     city: "Visakhapatnam",
//     documentType: "Quotation"
//   });
  
//   // Quotation form state
//   const [quotationItems, setQuotationItems] = useState([
//     {
//       id: 1,
//       roomType: "Children bedroom",
//       category: "Semi Modular",
//       specifications: ["16mm branded ply", "high gloss shutters"],
//       description: "",
//       uom: "SQ.FT",
//       customUom: "",
//       length: "",
//       width: "",
//       unit: "feet",
//       price: "",
//       totalPrice: 0
//     }
//   ]);
  
//   const [showTerms, setShowTerms] = useState(true);
//   const [showPaymentTerms, setShowPaymentTerms] = useState(true);
  
//   // Ref for print area
//   const printAreaRef = useRef(null);
  
//   const correctPassword = "interiorQuote2025"; // This should be stored securely in a real application
  
//   const handleAuthentication = (e) => {
//     e.preventDefault();
//     if (password === correctPassword) {
//       setIsAuthenticated(true);
//       setShowCustomerForm(true);
//       setError("");
//     } else {
//       setError("Incorrect password. Please try again.");
//     }
//   };
  
//   const handleCustomerInfoChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerInfo(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
  
//   const handleCustomerFormSubmit = (e) => {
//     e.preventDefault();
//     setShowCustomerForm(false);
//   };
  
//   const calculateQty = (item) => {
//     if (!item.length || !item.width) return "";
//     const length = parseFloat(item.length);
//     const width = parseFloat(item.width);
//     if (isNaN(length) || isNaN(width)) return "";
    
//     // Convert to square feet if needed
//     if (item.unit === "inches") {
//       return ((length * width) / 144).toFixed(2);
//     } else if (item.unit === "meters") {
//       return (length * width * 10.764).toFixed(2);
//     } else if (item.unit === "cm") {
//       return ((length * width) / 929.03).toFixed(2);
//     } else {
//       // feet
//       return (length * width).toFixed(2);
//     }
//   };
  
//   const calculateItemPrice = (item) => {
//     const qty = calculateQty(item);
//     if (!qty || !item.price) return 0;
//     return parseFloat(qty) * parseFloat(item.price);
//   };
  
//   const calculateTotalPrice = () => {
//     return quotationItems.reduce((total, item) => {
//       return total + calculateItemPrice(item);
//     }, 0);
//   };
  
//   const handleItemChange = (id, field, value) => {
//     setQuotationItems(prevItems => 
//       prevItems.map(item => {
//         if (item.id === id) {
//           const updatedItem = { ...item, [field]: value };
//           // Recalculate the totalPrice if needed
//           if (['length', 'width', 'unit', 'price'].includes(field)) {
//             updatedItem.totalPrice = calculateItemPrice(updatedItem);
//           }
//           return updatedItem;
//         }
//         return item;
//       })
//     );
//   };
  
//   const handleSpecificationChange = (id, index, value) => {
//     setQuotationItems(prevItems => 
//       prevItems.map(item => {
//         if (item.id === id) {
//           const newSpecifications = [...item.specifications];
//           newSpecifications[index] = value;
//           return { ...item, specifications: newSpecifications };
//         }
//         return item;
//       })
//     );
//   };
  
//   const addSpecification = (id) => {
//     setQuotationItems(prevItems => 
//       prevItems.map(item => {
//         if (item.id === id) {
//           return { ...item, specifications: [...item.specifications, ""] };
//         }
//         return item;
//       })
//     );
//   };
  
//   const removeSpecification = (id, index) => {
//     setQuotationItems(prevItems => 
//       prevItems.map(item => {
//         if (item.id === id && item.specifications.length > 1) {
//           const newSpecifications = [...item.specifications];
//           newSpecifications.splice(index, 1);
//           return { ...item, specifications: newSpecifications };
//         }
//         return item;
//       })
//     );
//   };
  
//   const addNewItem = () => {
//     const newId = quotationItems.length > 0 
//       ? Math.max(...quotationItems.map(item => item.id)) + 1 
//       : 1;
    
//     setQuotationItems([
//       ...quotationItems, 
//       {
//         id: newId,
//         roomType: "Children bedroom",
//         category: "Semi Modular",
//         specifications: ["16mm branded ply"],
//         description: "",
//         uom: "SQ.FT",
//         customUom: "",
//         length: "",
//         width: "",
//         unit: "feet",
//         price: "",
//         totalPrice: 0
//       }
//     ]);
//   };
  
//   const removeItem = (id) => {
//     setQuotationItems(prevItems => prevItems.filter(item => item.id !== id));
//   };
  
//   const handlePrint = () => {
//     const printWindow = window.open('', '_blank');
//     const printContent = document.getElementById("quotation-print-area").innerHTML;
    
//     printWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Interior ${customerInfo.documentType}</title>
//         <style>
//           body { 
//             font-family: Arial, sans-serif; 
//             margin: 20px; 
//             padding: 0;
//           }
//           table { 
//             width: 100%; 
//             border-collapse: collapse; 
//           }
//           table, th, td { 
//             border: 1px solid #ddd; 
//           }
//           th, td { 
//             padding: 8px; 
//             text-align: left; 
//           }
//           th { 
//             background-color: #f2f2f2; 
//           }
//           .watermark {
//             position: fixed;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             opacity: 0.05;
//             z-index: -1;
//             width: 60%;
//           }
//           .header {
//             display: flex;
//             justify-content: space-between;
//             margin-bottom: 20px;
//           }
//           .print-only { 
//             display: block; 
//           }
//           .no-print { 
//             display: none; 
//           }
//         </style>
//       </head>
//       <body>
//         <div class="watermark">
//           <img src="/logo.png" alt="Watermark" />
//         </div>
//         ${printContent}
//       </body>
//       </html>
//     `);
    
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//   };
  
//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setPassword("");
//   };
  
//   // Authentication Form
//   if (!isAuthenticated) {
//     return (
//       <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto mt-10">
//         <Logo />
//         <h2 className="text-2xl font-semibold text-center mb-6">Interior Quotation Access</h2>
//         <form onSubmit={handleAuthentication}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="password"
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
//           <div className="flex items-center justify-center">
//             <button
//               className="bg-[#C16828] hover:bg-[#a85a23] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Access Quotation System
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   }
  
//   // Customer Information Form
//   if (showCustomerForm) {
//     return (
//       <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto mt-10">
//         <Logo />
//         <h2 className="text-2xl font-semibold text-center mb-6">Customer Information</h2>
//         <form onSubmit={handleCustomerFormSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
//               Date
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="date"
//               name="date"
//               type="date"
//               value={customerInfo.date}
//               onChange={handleCustomerInfoChange}
//               required
//             />
//           </div>
          
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerName">
//               Customer Name
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="customerName"
//               name="customerName"
//               type="text"
//               placeholder="Enter customer name"
//               value={customerInfo.customerName}
//               onChange={handleCustomerInfoChange}
//               required
//             />
//           </div>
          
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="documentType">
//               Document Type
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="documentType"
//               name="documentType"
//               value={customerInfo.documentType}
//               onChange={handleCustomerInfoChange}
//               required
//             >
//               <option value="Quotation">Quotation</option>
//               <option value="Invoice">Invoice</option>
//               <option value="Estimation">Estimation</option>
//             </select>
//           </div>
          
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bhkType">
//               BHK Type
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="bhkType"
//               name="bhkType"
//               value={customerInfo.bhkType}
//               onChange={handleCustomerInfoChange}
//               required
//             >
//               <option value="1BHK">1BHK</option>
//               <option value="2BHK">2BHK</option>
//               <option value="3BHK">3BHK</option>
//               <option value="4BHK">4BHK</option>
//               <option value="5BHK">5BHK</option>
//             </select>
//           </div>
          
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
//               Location
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="location"
//               name="location"
//               type="text"
//               placeholder="e.g. MVV&MK PARK, Kurmannapalem"
//               value={customerInfo.location}
//               onChange={handleCustomerInfoChange}
//               required
//             />
//           </div>
          
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
//               City
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="city"
//               name="city"
//               type="text"
//               placeholder="Enter city"
//               value={customerInfo.city}
//               onChange={handleCustomerInfoChange}
//               required
//             />
//           </div>
          
//           <div className="flex items-center justify-center">
//             <button
//               className="bg-[#C16828] hover:bg-[#a85a23] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Continue to {customerInfo.documentType}
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   }
  
//   // Quotation Form
//   return (
//     <div className="bg-white min-h-screen">
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-6">
//           <Logo />
//           <h1 className="text-3xl font-bold text-center">Interior Quotation</h1>
//           <button
//             onClick={handleLogout}
//             className="text-sm text-gray-600 hover:text-[#C16828]"
//           >
//             Logout
//           </button>
//         </div>
        
//         {/* Form Controls */}
//         <div className="mb-6 flex gap-4">
//           <button
//             className="bg-[#C16828] hover:bg-[#a85a23] text-white px-4 py-2 rounded"
//             onClick={addNewItem}
//           >
//             Add Item
//           </button>
//           <button
//             className="bg-[#4D5053] hover:bg-gray-700 text-white px-4 py-2 rounded"
//             onClick={handlePrint}
//           >
//             Print Quotation
//           </button>
          
//           <div className="flex items-center ml-auto">
//             <input
//               type="checkbox"
//               id="showTerms"
//               checked={showTerms}
//               onChange={(e) => setShowTerms(e.target.checked)}
//               className="mr-2"
//             />
//             <label htmlFor="showTerms">Show Terms</label>
            
//             <input
//               type="checkbox"
//               id="showPaymentTerms"
//               checked={showPaymentTerms}
//               onChange={(e) => setShowPaymentTerms(e.target.checked)}
//               className="ml-6 mr-2"
//             />
//             <label htmlFor="showPaymentTerms">Show Payment Terms</label>
//           </div>
//         </div>
        
//         {/* Print Area */}
//         <div id="quotation-print-area" ref={printAreaRef} className="bg-white p-8 border border-gray-300 relative">
//           {/* Watermark Logo */}
//           <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
//             <img 
//               src="/logo.png" // Replace with actual logo path
//               alt="Watermark"
//               className="w-2/3 max-w-md"
//             />
//           </div>
          
//           {/* Header */}
//           <div className="mb-8 z-10 relative">
//             <div className="flex justify-between items-center mb-4">
//               <Logo />
//               <div className="text-right">
//                 <p className="font-semibold">Date: {customerInfo.date}</p>
//                 <p className="font-semibold">Customer: {customerInfo.customerName}</p>
//               </div>
//             </div>
//             <div className="flex justify-between items-center">
//               <h1 className="text-3xl font-bold">Interior {customerInfo.documentType}</h1>
//             </div>
//             <p className="mt-2 text-gray-700">
//               {customerInfo.documentType} for the home interiors of {customerInfo.bhkType} flat, {customerInfo.location}, {customerInfo.city}.
//             </p>
//           </div>
          
//           {/* Materials Information */}
//           <div className="mb-8 z-10 relative">
//             <h2 className="text-2xl font-bold mb-2">Wood work (Material and Installation)</h2>
//             <h3 className="text-xl font-semibold mb-3">Materials used</h3>
//             <ul className="list-disc pl-6 space-y-1 text-gray-700">
//               <li>IS:710 Plywood (Gurjan waterproof ply) for complete project.</li>
//               <li>HDHMR with PVC liner will be considered for complete Kitchen.</li>
//               <li>PVC liner for the back panel of all modular cabinets.</li>
//               <li>0.8MM Color fabric lam for inside (carcass) of modular cabinets will be used.</li>
//               <li>Soft close Hinges from Olive/Sleek, Evershine company will be used in the complete project.</li>
//               <li>Soft closure sliding channel from Olive/Nimmi company will be used.</li>
//               <li>Hydraulic lifts (Olive/Hepo by Hettich) for the Loft units above wardrobe.</li>
//               <li>Regular Stainless-Steel handles for all shutters from Companies like GB, Senso, Menage etc.
//                   Differences of the amount to be paid (if applicable) for any specific company handles are selected.</li>
//               <li>Cup handles of Nimmi for sliding doors will be used.</li>
//               <li>Locks from Bonus / Ebco company.</li>
//               <li>1MM Laminates from given catalogues of Marino, Croma,Skydecor or equivalent.</li>
//             </ul>
            
//             <h3 className="text-xl font-semibold mt-6 mb-3">False Ceiling:</h3>
//             <ul className="list-disc pl-6 space-y-1 text-gray-700">
//               <li>JINDAL 5.5 Channel & SAINT GOBIN Sheet.</li>
//               <li>LED Ceiling Lights – Wipro, Phillips, Orient (Brand Warrenty)</li>
//               <li>LED Profile Lights – 240LED, Aluminium Patti</li>
//             </ul>
//           </div>
          
//           {/* Quotation Table */}
//           <div className="overflow-x-auto mb-8 z-10 relative">
//             <table className="min-w-full border border-gray-300">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border border-gray-300 px-4 py-2 w-16">Serial No.</th>
//                   <th className="border border-gray-300 px-4 py-2">Item Description</th>
//                   <th className="border border-gray-300 px-4 py-2 w-24">UOM</th>
//                   <th className="border border-gray-300 px-4 py-2 w-24">Qty</th>
//                   <th className="border border-gray-300 px-4 py-2 w-32">Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {quotationItems.map((item, index) => (
//                   <tr key={item.id} className="print-row">
//                     <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       <div className="print-only">
//                         <strong>{item.roomType}</strong> category: {item.category}
//                         {item.description ? `, ${item.description}` : ''}
//                         <br />
//                         Specifications are {item.specifications.join(", ")}
//                       </div>
                      
//                       <div className="no-print">
//                         <div className="mb-2">
//                           <label className="block text-sm font-medium text-gray-700">Room Type</label>
//                           <select
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                             value={item.roomType}
//                             onChange={(e) => handleItemChange(item.id, 'roomType', e.target.value)}
//                           >
//                             <option value="Children bedroom">Children bedroom</option>
//                             <option value="Master bedroom">Master bedroom</option>
//                             <option value="Guest bedroom">Guest bedroom</option>
//                             <option value="Kitchen">Kitchen</option>
//                             <option value="Living room">Living room</option>
//                             <option value="Bathroom">Bathroom</option>
//                             <option value="Balcony">Balcony</option>
//                           </select>
//                         </div>
                        
//                         <div className="mb-2">
//                           <label className="block text-sm font-medium text-gray-700">Category</label>
//                           <select
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                             value={item.category}
//                             onChange={(e) => handleItemChange(item.id, 'category', e.target.value)}
//                           >
//                             <option value="Semi Modular">Semi Modular</option>
//                             <option value="Full Modular">Full Modular</option>
//                           </select>
//                         </div>
                        
//                         <div className="mb-2">
//                           <label className="block text-sm font-medium text-gray-700">Specifications</label>
//                           {item.specifications.map((spec, specIndex) => (
//                             <div key={specIndex} className="flex mt-1">
//                               <select
//                                 className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                                 value={spec}
//                                 onChange={(e) => handleSpecificationChange(item.id, specIndex, e.target.value)}
//                               >
//                                 <option value="16mm branded ply">16mm branded ply</option>
//                                 <option value="high gloss shutters">high gloss shutters</option>
//                                 <option value="16mm HDHMR">16mm HDHMR</option>
//                                 <option value="0.8 liner">0.8 liner</option>
//                                 <option value="1mm laminate">1mm laminate</option>
//                                 <option value="1.2mm high gloss laminate">1.2mm high gloss laminate</option>
//                                 <option value="1.5mm acrylic">1.5mm acrylic</option>
//                               </select>
//                               <button
//                                 type="button"
//                                 className="ml-1 text-red-600"
//                                 onClick={() => removeSpecification(item.id, specIndex)}
//                               >
//                                 ×
//                               </button>
//                             </div>
//                           ))}
//                           <button
//                             type="button"
//                             className="mt-1 text-blue-600 text-sm"
//                             onClick={() => addSpecification(item.id)}
//                           >
//                             + Add Specification
//                           </button>
//                         </div>
                        
//                         <div className="mb-2">
//                           <label className="block text-sm font-medium text-gray-700">Description</label>
//                           <textarea
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                             rows="2"
//                             value={item.description}
//                             onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
//                             placeholder="Additional description..."
//                           />
//                         </div>
                        
//                         <button
//                           type="button"
//                           className="mt-2 text-red-600 text-sm"
//                           onClick={() => removeItem(item.id)}
//                         >
//                           Remove Item
//                         </button>
//                       </div>
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       <div className="print-only">
//                         {item.uom === "Other" ? item.customUom : item.uom}
//                       </div>
                      
//                       <div className="no-print">
//                         <select
//                           className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                           value={item.uom}
//                           onChange={(e) => handleItemChange(item.id, 'uom', e.target.value)}
//                         >
//                           <option value="SQ.FT">SQ.FT</option>
//                           <option value="Other">Other</option>
//                         </select>
                        
//                         {item.uom === "Other" && (
//                           <input
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                             type="text"
//                             value={item.customUom}
//                             onChange={(e) => handleItemChange(item.id, 'customUom', e.target.value)}
//                             placeholder="Custom UOM"
//                           />
//                         )}
//                       </div>
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       <div className="print-only">
//                         {calculateQty(item)}
//                       </div>
                      
//                       <div className="no-print">
//                         <div className="flex flex-col space-y-1">
//                           <input
//                             className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                             type="number"
//                             min="0"
//                             step="0.01"
//                             value={item.length}
//                             onChange={(e) => handleItemChange(item.id, 'length', e.target.value)}
//                             placeholder="Length"
//                           />
//                           <input
//                             className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                             type="number"
//                             min="0"
//                             step="0.01"
//                             value={item.width}
//                             onChange={(e) => handleItemChange(item.id, 'width', e.target.value)}
//                             placeholder="Width"
//                           />
//                           <select
//                             className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                             value={item.unit}
//                             onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
//                           >
//                             <option value="feet">feet</option>
//                             <option value="inches">inches</option>
//                             <option value="meters">meters</option>
//                             <option value="cm">cm</option>
//                           </select>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       <div className="print-only">
//                         ${calculateItemPrice(item).toFixed(2)}
//                       </div>
                      
//                       <div className="no-print">
//                         <input
//                           className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                           type="number"
//                           min="0"
//                           step="0.01"
//                           value={item.price}
//                           onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
//                           placeholder="Price per unit"
//                         />
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 <tr className="bg-gray-100 font-bold">
//                   <td colSpan="4" className="border border-gray-300 px-4 py-3 text-right">
//                     Final Estimation:
//                   </td>
//                   <td className="border border-gray-300 px-4 py-3 text-center">
//                     ${calculateTotalPrice().toFixed(2)}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
          
//           {/* Terms and Conditions */}
//           {showTerms && (
//             <div className="mb-8 z-10 relative">
//               <h2 className="text-xl font-bold mb-3">Terms of Understanding</h2>
//               <ul className="list-none pl-6 space-y-1 text-gray-700">
//                 <li>➢ The above-mentioned details are subject to correction. Please be advised to go through the details and get it clarified by each line item.</li>
//                 <li>➢ The above prices are quoted as per the design & drawings given.</li>
//                 <li>➢ We would need 55 days for the completion of work from the day of finalization of all designs and advance payment. Changes in the scope of work may extend the time of completion.</li>
//                 <li>➢ Any works not included in the quotation are extra and are to be negotiated further.</li>
//                 <li>➢ Electrical Power & Water to be in the customer's scope of supply.</li>
//                 <li>➢ Deep cleaning & Debris shifting charges are in addition to the above-quoted price.</li>
//                 <li>➢ Change in the scope of work after the completion of 20% of the work would incur an additional rate for the material & labor respectively.</li>
//               </ul>
//             </div>
//           )}
          
//           {/* Payment Terms */}
//           {showPaymentTerms && (
//             <div className="z-10 relative">
//               <h2 className="text-xl font-bold mb-3">Payment Terms</h2>
              
//               <h3 className="text-lg font-semibold mb-2">Modular Works</h3>
//               <ul className="list-none pl-6 space-y-1 text-gray-700">
//                 <li>60% advance payment at the time of order confirmation.</li>
//                 <li>20% before the arrival of the finished materials to the site.</li>
//                 <li>10% after the installation of Carcass & Shutters (Before the installation of handles).</li>
//                 <li>10% at the time of handing over the work.</li>
//               </ul>
              
//               <h3 className="text-lg font-semibold mt-4 mb-2">Non – Modular /Semi - Modular Works</h3>
//               <ul className="list-none pl-6 space-y-1 text-gray-700">
//                 <li>50% advance payment at the time of order confirmation.</li>
//                 <li>30% of the payment after the completion of 60% of the work scope.</li>
//                 <li>10% after the completion of 90% of the work scope.</li>
//                 <li>10% at the time of handing over.</li>
//               </ul>
//             </div>
//           )}
//         </div>
        
//         {/* Print Styles */}
//         <style>
//           {`
//             @media print {
//               body { margin: 0; padding: 0; }
//               .no-print { display: none !important; }
//               .print-only { display: block !important; }
//               .container { max-width: 100%; padding: 0; margin: 0; }
//               button, select, input, textarea { display: none !important; }
//             }
//             @media screen {
//               .print-only { display: none; }
//               .no-print { display: block; }
//             }
//           `}
//         </style>
//       </div>
//     </div>
//   );
// };

// export default Pricing;



















import React, { useState, useRef } from "react";
import Button from "../../components/common/Button";

// Main Quotation Page component
const Pricing = () => {
  return (
    <div>
      <PasswordProtectedQuotation />
    </div>
  );
};

// Logo component
const Logo = () => {
  return (
    <div className="text-center py-4">
      <img 
        src="/wslogo.png" // Replace with actual logo path
        alt="Company Logo"
        className="h-16"
      />
    </div>
  );
};

// PasswordProtectedQuotation component
const PasswordProtectedQuotation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Customer information
  const [customerInfo, setCustomerInfo] = useState({
    date: new Date().toISOString().slice(0, 10),
    customerName: "",
    bhkType: "2BHK",
    location: "",
    city: "Visakhapatnam",
    documentType: "Quotation"
  });
  
  // Quotation form state
  const [quotationItems, setQuotationItems] = useState([
    {
      id: 1,
      isCustom: false,
      customText: "",
      roomType: "Children bedroom",
      category: "Semi Modular",
      specifications: ["16mm branded ply", "high gloss shutters"],
      description: "",
      uom: "SQ.FT",
      customUom: "",
      length: "",
      width: "",
      unit: "feet",
      price: "",
      totalPrice: 0
    }
  ]);
  
  const [showTerms, setShowTerms] = useState(true);
  const [showPaymentTerms, setShowPaymentTerms] = useState(true);
  
  // Ref for print area
  const printAreaRef = useRef(null);
  
  const correctPassword = "quotewall"; // This should be stored securely in a real application
  
  const handleAuthentication = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setShowCustomerForm(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };
  
  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCustomerFormSubmit = (e) => {
    e.preventDefault();
    setShowCustomerForm(false);
  };
  
  const calculateQty = (item) => {
    if (!item.length || !item.width) return "";
    const length = parseFloat(item.length);
    const width = parseFloat(item.width);
    if (isNaN(length) || isNaN(width)) return "";
    
    // Convert to square feet if needed
    if (item.unit === "inches") {
      return ((length * width) / 144).toFixed(2);
    } else if (item.unit === "meters") {
      return (length * width * 10.764).toFixed(2);
    } else if (item.unit === "cm") {
      return ((length * width) / 929.03).toFixed(2);
    } else {
      // feet
      return (length * width).toFixed(2);
    }
  };
  
  const calculateItemPrice = (item) => {
    const qty = calculateQty(item);
    if (!qty || !item.price) return 0;
    return parseFloat(qty) * parseFloat(item.price);
  };
  
  const calculateTotalPrice = () => {
    return quotationItems.reduce((total, item) => {
      if (item.isCustom) {
        return total + (parseFloat(item.price) || 0);
      } else {
        return total + calculateItemPrice(item);
      }
    }, 0);
  };
  
  const handleItemChange = (id, field, value) => {
    setQuotationItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          // Recalculate the totalPrice if needed
          if (['length', 'width', 'unit', 'price'].includes(field)) {
            updatedItem.totalPrice = calculateItemPrice(updatedItem);
          }
          return updatedItem;
        }
        return item;
      })
    );
  };
  
  const handleSpecificationChange = (id, index, value) => {
    setQuotationItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const newSpecifications = [...item.specifications];
          newSpecifications[index] = value;
          return { ...item, specifications: newSpecifications };
        }
        return item;
      })
    );
  };
  
  const addSpecification = (id) => {
    setQuotationItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          return { ...item, specifications: [...item.specifications, ""] };
        }
        return item;
      })
    );
  };
  
  const removeSpecification = (id, index) => {
    setQuotationItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id && item.specifications.length > 1) {
          const newSpecifications = [...item.specifications];
          newSpecifications.splice(index, 1);
          return { ...item, specifications: newSpecifications };
        }
        return item;
      })
    );
  };
  
  const addNewItem = () => {
    const newId = quotationItems.length > 0 
      ? Math.max(...quotationItems.map(item => item.id)) + 1 
      : 1;
    
    setQuotationItems([
      ...quotationItems, 
      {
        id: newId,
        isCustom: false,
        customText: "",
        roomType: "Children bedroom",
        category: "Semi Modular",
        specifications: ["16mm branded ply"],
        description: "",
        uom: "SQ.FT",
        customUom: "",
        length: "",
        width: "",
        unit: "feet",
        price: "",
        totalPrice: 0
      }
    ]);
  };
  
  const addCustomItem = () => {
    const newId = quotationItems.length > 0 
      ? Math.max(...quotationItems.map(item => item.id)) + 1 
      : 1;
    
    setQuotationItems([
      ...quotationItems, 
      {
        id: newId,
        isCustom: true,
        customText: "",
        roomType: "",
        category: "",
        specifications: [],
        description: "",
        uom: "Other",
        customUom: "",
        length: "",
        width: "",
        unit: "feet",
        price: "",
        totalPrice: 0
      }
    ]);
  };
  
  const removeItem = (id) => {
    setQuotationItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printContent = document.getElementById("quotation-print-area").innerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Interior ${customerInfo.documentType}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            padding: 0;
            position: relative;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
          }
          table, th, td { 
            border: 1px solid #ddd; 
          }
          th, td { 
            padding: 8px; 
            text-align: left; 
          }
          th { 
            background-color: #f2f2f2; 
          }
          .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.05;
            pointer-events: none;
            z-index: -1;
            width: 30%;
            max-width: 300px;
          }
          .watermark img {
            width: 100%;
            height: auto;
          }
          .logo {
            height: 60px;
            width: auto;
          }
          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          .print-only { 
            display: block; 
          }
          .no-print { 
            display: none; 
          }
        </style>
      </head>
      <body>
        <div class="watermark">
          <img src="/wslogo.png" alt="Watermark" />
        </div>
        ${printContent}
      </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };
  
  // Authentication Form
  if (!isAuthenticated) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto mt-10">
        <Logo />
        <h2 className="text-2xl font-semibold text-center mb-6">Interior Quotation Access</h2>
        <form onSubmit={handleAuthentication}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-center">
            <button
              className="bg-[#C16828] hover:bg-[#a85a23] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Access Quotation System
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  // Customer Information Form
  if (showCustomerForm) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto mt-10">
        <Logo />
        <h2 className="text-2xl font-semibold text-center mb-6">Customer Information</h2>
        <form onSubmit={handleCustomerFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              name="date"
              type="date"
              value={customerInfo.date}
              onChange={handleCustomerInfoChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerName">
              Customer Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="customerName"
              name="customerName"
              type="text"
              placeholder="Enter customer name"
              value={customerInfo.customerName}
              onChange={handleCustomerInfoChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="documentType">
              Document Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="documentType"
              name="documentType"
              value={customerInfo.documentType}
              onChange={handleCustomerInfoChange}
              required
            >
              <option value="Quotation">Quotation</option>
              <option value="Invoice">Invoice</option>
              <option value="Estimation">Estimation</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bhkType">
              BHK Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bhkType"
              name="bhkType"
              value={customerInfo.bhkType}
              onChange={handleCustomerInfoChange}
              required
            >
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
              <option value="3BHK">3BHK</option>
              <option value="4BHK">4BHK</option>
              <option value="5BHK">5BHK</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              name="location"
              type="text"
              placeholder="e.g. MVV&MK PARK, Kurmannapalem"
              value={customerInfo.location}
              onChange={handleCustomerInfoChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
              City
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              name="city"
              type="text"
              placeholder="Enter city"
              value={customerInfo.city}
              onChange={handleCustomerInfoChange}
              required
            />
          </div>
          
          <div className="flex items-center justify-center">
            <button
              className="bg-[#C16828] hover:bg-[#a85a23] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Continue to {customerInfo.documentType}
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  // Quotation Form
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Logo />
          <h1 className="text-3xl font-bold text-center">Interior Quotation</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-[#C16828]"
          >
            Logout
          </button>
        </div>
        
        {/* Form Controls */}
        <div className="mb-6 flex gap-4">
          <button
            className="bg-[#C16828] hover:bg-[#a85a23] text-white px-4 py-2 rounded"
            onClick={addNewItem}
          >
            Add Item
          </button>
          <button
            className="bg-[#4D5053] hover:bg-gray-700 text-white px-4 py-2 rounded"
            onClick={addCustomItem}
          >
            Add Others
          </button>
          <button
            className="bg-[#4D5053] hover:bg-gray-700 text-white px-4 py-2 rounded"
            onClick={handlePrint}
          >
            Print Quotation
          </button>
          
          <div className="flex items-center ml-auto">
            <input
              type="checkbox"
              id="showTerms"
              checked={showTerms}
              onChange={(e) => setShowTerms(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showTerms">Show Terms</label>
            
            <input
              type="checkbox"
              id="showPaymentTerms"
              checked={showPaymentTerms}
              onChange={(e) => setShowPaymentTerms(e.target.checked)}
              className="ml-6 mr-2"
            />
            <label htmlFor="showPaymentTerms">Show Payment Terms</label>
          </div>
        </div>
        
        {/* Print Area */}
        <div id="quotation-print-area" ref={printAreaRef} className="bg-white p-8 border border-gray-300 relative">
          {/* The watermark will be added in the print window, not here */}
          
          {/* Header */}
          <div className="mb-8 z-10 relative">
            <div className="flex justify-between items-center mb-4 ">
              {/* <img src="/logo.png" alt="Logo" className="h-2" /> */}
              <div className="text-right">
                <p className="font-semibold">Date: {customerInfo.date}</p>
                <p className="font-semibold">Customer: {customerInfo.customerName}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Interior {customerInfo.documentType}</h1>
            </div>
            <p className="mt-2 text-gray-700">
              {customerInfo.documentType} for the home interiors of {customerInfo.bhkType} flat, {customerInfo.location}, {customerInfo.city}.
            </p>
          </div>
          
          {/* Materials Information */}
          <div className="mb-8 z-10 relative">
            <h2 className="text-2xl font-bold mb-2">Wood work (Material and Installation)</h2>
            <h3 className="text-xl font-semibold mb-3">Materials used</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>IS:710 Plywood (Gurjan waterproof ply) for complete project.</li>
              <li>HDHMR with PVC liner will be considered for complete Kitchen.</li>
              <li>PVC liner for the back panel of all modular cabinets.</li>
              <li>0.8MM Color fabric lam for inside (carcass) of modular cabinets will be used.</li>
              <li>Soft close Hinges from Olive/Sleek, Evershine company will be used in the complete project.</li>
              <li>Soft closure sliding channel from Olive/Nimmi company will be used.</li>
              <li>Hydraulic lifts (Olive/Hepo by Hettich) for the Loft units above wardrobe.</li>
              <li>Regular Stainless-Steel handles for all shutters from Companies like GB, Senso, Menage etc.
                  Differences of the amount to be paid (if applicable) for any specific company handles are selected.</li>
              <li>Cup handles of Nimmi for sliding doors will be used.</li>
              <li>Locks from Bonus / Ebco company.</li>
              <li>1MM Laminates from given catalogues of Marino, Croma,Skydecor or equivalent.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">False Ceiling:</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>JINDAL 5.5 Channel & SAINT GOBIN Sheet.</li>
              <li>LED Ceiling Lights – Wipro, Phillips, Orient (Brand Warrenty)</li>
              <li>LED Profile Lights – 240LED, Aluminium Patti</li>
            </ul>
          </div>
          
          {/* Quotation Table */}
          <div className="overflow-x-auto mb-8 z-10 relative">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 w-16">Serial No.</th>
                  <th className="border border-gray-300 px-4 py-2">Item Description</th>
                  <th className="border border-gray-300 px-4 py-2 w-24">UOM</th>
                  <th className="border border-gray-300 px-4 py-2 w-24">Qty</th>
                  <th className="border border-gray-300 px-4 py-2 w-32">Price</th>
                </tr>
              </thead>
              <tbody>
                {quotationItems.map((item, index) => (
                  <tr key={item.id} className="print-row">
                    <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.isCustom ? (
                        <>
                          <div className="print-only">
                            {item.customText}
                          </div>
                          
                          <div className="no-print">
                            <textarea
                              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              rows="4"
                              value={item.customText}
                              onChange={(e) => handleItemChange(item.id, 'customText', e.target.value)}
                              placeholder="Enter custom description..."
                            />
                            
                            <button
                              type="button"
                              className="mt-2 text-red-600 text-sm"
                              onClick={() => removeItem(item.id)}
                            >
                              Remove Item
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="print-only">
                            <strong>{item.roomType}</strong> category: {item.category}
                            {item.description ? `, ${item.description}` : ''}
                            <br />
                            Specifications are {item.specifications.join(", ")}
                          </div>
                          
                          <div className="no-print">
                            <div className="mb-2">
                              <label className="block text-sm font-medium text-gray-700">Room Type</label>
                              <select
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                value={item.roomType}
                                onChange={(e) => handleItemChange(item.id, 'roomType', e.target.value)}
                              >
                                <option value="Children bedroom">Children bedroom</option>
                                <option value="Master bedroom">Master bedroom</option>
                                <option value="Guest bedroom">Guest bedroom</option>
                                <option value="Kitchen">Kitchen</option>
                                <option value="Living room">Living room</option>
                                <option value="Bathroom">Bathroom</option>
                                <option value="Balcony">Balcony</option>
                              </select>
                            </div>
                            
                            <div className="mb-2">
                              <label className="block text-sm font-medium text-gray-700">Category</label>
                              <select
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                value={item.category}
                                onChange={(e) => handleItemChange(item.id, 'category', e.target.value)}
                              >
                                <option value="Semi Modular">Semi Modular</option>
                                <option value="Full Modular">Full Modular</option>
                              </select>
                            </div>
                            
                            <div className="mb-2">
                              <label className="block text-sm font-medium text-gray-700">Specifications</label>
                              {item.specifications.map((spec, specIndex) => (
                                <div key={specIndex} className="flex mt-1">
                                  <select
                                    className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    value={spec}
                                    onChange={(e) => handleSpecificationChange(item.id, specIndex, e.target.value)}
                                  >
                                    <option value="16mm branded ply">16mm branded ply</option>
                                    <option value="high gloss shutters">high gloss shutters</option>
                                    <option value="16mm HDHMR">16mm HDHMR</option>
                                    <option value="0.8 liner">0.8 liner</option>
                                    <option value="1mm laminate">1mm laminate</option>
                                    <option value="1.2mm high gloss laminate">1.2mm high gloss laminate</option>
                                    <option value="1.5mm acrylic">1.5mm acrylic</option>
                                  </select>
                                  <button
                                    type="button"
                                    className="ml-1 text-red-600"
                                    onClick={() => removeSpecification(item.id, specIndex)}
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                className="mt-1 text-blue-600 text-sm"
                                onClick={() => addSpecification(item.id)}
                              >
                                + Add Specification
                              </button>
                            </div>
                            
                            <div className="mb-2">
                              <label className="block text-sm font-medium text-gray-700">Description</label>
                              <textarea
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                rows="2"
                                value={item.description}
                                onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                placeholder="Additional description..."
                              />
                            </div>
                            
                            <button
                              type="button"
                              className="mt-2 text-red-600 text-sm"
                              onClick={() => removeItem(item.id)}
                            >
                              Remove Item
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.isCustom ? (
                        <>
                          <div className="print-only">
                            {item.customUom || ""}
                          </div>
                          
                          <div className="no-print">
                            <input
                              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              type="text"
                              value={item.customUom}
                              onChange={(e) => handleItemChange(item.id, 'customUom', e.target.value)}
                              placeholder="Custom UOM"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="print-only">
                            {item.uom === "Other" ? item.customUom : item.uom}
                          </div>
                          
                          <div className="no-print">
                            <select
                              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              value={item.uom}
                              onChange={(e) => handleItemChange(item.id, 'uom', e.target.value)}
                            >
                              <option value="SQ.FT">SQ.FT</option>
                              <option value="Other">Other</option>
                            </select>
                            
                            {item.uom === "Other" && (
                              <input
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                type="text"
                                value={item.customUom}
                                onChange={(e) => handleItemChange(item.id, 'customUom', e.target.value)}
                                placeholder="Custom UOM"
                              />
                            )}
                          </div>
                        </>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.isCustom ? (
                        <>
                          <div className="print-only">
                            {item.length || "-"}
                          </div>
                          
                          <div className="no-print">
                            <input
                              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              type="text"
                              value={item.length}
                              onChange={(e) => handleItemChange(item.id, 'length', e.target.value)}
                              placeholder="Custom Quantity"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="print-only">
                            {calculateQty(item)}
                          </div>
                          
                          <div className="no-print">
                            <div className="flex flex-col space-y-1">
                              <input
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                type="number"
                                min="0"
                                step="0.01"
                                value={item.length}
                                onChange={(e) => handleItemChange(item.id, 'length', e.target.value)}
                                placeholder="Length"
                              />
                              <input
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                type="number"
                                min="0"
                                step="0.01"
                                value={item.width}
                                onChange={(e) => handleItemChange(item.id, 'width', e.target.value)}
                                placeholder="Width"
                              />
                              <select
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                value={item.unit}
                                onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                              >
                                <option value="feet">feet</option>
                                <option value="inches">inches</option>
                                <option value="meters">meters</option>
                                <option value="cm">cm</option>
                              </select>
                            </div>
                          </div>
                        </>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.isCustom ? (
                        <>
                          <div className="print-only">
                            ${item.price || "0.00"}
                          </div>
                          
                          <div className="no-print">
                            <input
                              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.price}
                              onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                              placeholder="Total Price"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="print-only">
                            ${calculateItemPrice(item).toFixed(2)}
                          </div>
                          
                          <div className="no-print">
                            <input
                              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.price}
                              onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                              placeholder="Price per unit"
                            />
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-bold">
                  <td colSpan="4" className="border border-gray-300 px-4 py-3 text-right">
                    Final Estimation:
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    ${calculateTotalPrice().toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Terms and Conditions */}
          {showTerms && (
            <div className="mb-8 z-10 relative">
              <h2 className="text-xl font-bold mb-3">Terms of Understanding</h2>
              <ul className="list-none pl-6 space-y-1 text-gray-700">
                <li>➢ The above-mentioned details are subject to correction. Please be advised to go through the details and get it clarified by each line item.</li>
                <li>➢ The above prices are quoted as per the design & drawings given.</li>
                <li>➢ We would need 55 days for the completion of work from the day of finalization of all designs and advance payment. Changes in the scope of work may extend the time of completion.</li>
                <li>➢ Any works not included in the quotation are extra and are to be negotiated further.</li>
                <li>➢ Electrical Power & Water to be in the customer's scope of supply.</li>
                <li>➢ Deep cleaning & Debris shifting charges are in addition to the above-quoted price.</li>
                <li>➢ Change in the scope of work after the completion of 20% of the work would incur an additional rate for the material & labor respectively.</li>
              </ul>
            </div>
          )}
          
          {/* Payment Terms */}
          {showPaymentTerms && (
            <div className="z-10 relative">
              <h2 className="text-xl font-bold mb-3">Payment Terms</h2>
              
              <h3 className="text-lg font-semibold mb-2">Modular Works</h3>
              <ul className="list-none pl-6 space-y-1 text-gray-700">
                <li>60% advance payment at the time of order confirmation.</li>
                <li>20% before the arrival of the finished materials to the site.</li>
                <li>10% after the installation of Carcass & Shutters (Before the installation of handles).</li>
                <li>10% at the time of handing over the work.</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">Non – Modular /Semi - Modular Works</h3>
              <ul className="list-none pl-6 space-y-1 text-gray-700">
                <li>50% advance payment at the time of order confirmation.</li>
                <li>30% of the payment after the completion of 60% of the work scope.</li>
                <li>10% after the completion of 90% of the work scope.</li>
                <li>10% at the time of handing over.</li>
              </ul>
            </div>
          )}
        </div>
        
        {/* Print Styles */}
        <style>
          {`
            @media print {
              body { margin: 0; padding: 0; }
              .no-print { display: none !important; }
              .print-only { display: block !important; }
              .container { max-width: 100%; padding: 0; margin: 0; }
              button, select, input, textarea { display: none !important; }
            }
            @media screen {
              .print-only { display: none; }
              .no-print { display: block; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Pricing;