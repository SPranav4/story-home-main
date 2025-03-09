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