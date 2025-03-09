import React, { useState } from 'react';

const PopupForm = ({ isOpen, onClose }) => {
    const [propertyType, setPropertyType] = useState('1bhk');
    const [formData, setFormData] = useState({
        location: '',
        name: '',
        phone: '',
        whatsapp: true
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const selectPropertyType = (type) => {
        setPropertyType(type);
    };

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        const fieldName = id.replace('popup-', '');
        
        // Clear phone error when user starts typing a new phone number
        if (fieldName === 'phone') {
            setPhoneError(false);
        }
        
        setFormData({
            ...formData,
            [fieldName]: type === 'checkbox' ? checked : value
        });
    };
    
    // Validate phone number (must be exactly 10 digits)
    const isValidPhoneNumber = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const storeLeadInLocalStorage = (leadData) => {
        try {
            // Generate a unique ID for the lead
            const leadId = Date.now().toString();
            
            // Get property type text from the active element
            const propertyTypeText = document.querySelector('.property-type-active').getAttribute('data-value');
            
            // Create the lead object with standard format that matches AdminLeadsView expectations
            const completeLeadData = {
                id: leadId,
                name: leadData.name,
                phone: leadData.phone,
                location: leadData.location,
                spaceType: propertyTypeText, // Map to spaceType for consistency
                style: "From Popup Form", // Fill with placeholder
                budget: leadData.whatsapp ? "WhatsApp updates: Yes" : "WhatsApp updates: No",
                timestamp: new Date().toISOString(),
                source: "Popup Form" // Identify source of lead
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
            existingLeads.push(completeLeadData);
            
            // Save back to localStorage
            localStorage.setItem("designLeads", JSON.stringify(existingLeads));
            
            return true;
        } catch (error) {
            console.error("Error storing lead:", error);
            return false;
        }
    };

    const submitPopupForm = () => {
        // Validate phone number
        if (!isValidPhoneNumber(formData.phone)) {
            setPhoneError(true);
            return;
        }
        
        // Store lead data in localStorage for AdminLeadsView
        const success = storeLeadInLocalStorage(formData);
        
        if (!success) {
            alert("There was an error saving your information. Please try again.");
            return;
        }
        
        // Here you would typically send data to your backend
        console.log({
            propertyType: document.querySelector('.property-type-active').getAttribute('data-value'),
            ...formData
        });

        // Show thank you message
        setIsSubmitted(true);

        // Close popup after some time if needed
        setTimeout(() => {
            onClose();
            // Reset form state after closing
            setTimeout(() => {
                setIsSubmitted(false);
                setPropertyType('1bhk');
                setPhoneError(false);
                setFormData({
                    location: '',
                    name: '',
                    phone: '',
                    whatsapp: true
                });
            }, 300);
        }, 3000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4 py-6 overflow-y-auto">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                {/* Left side with image - hidden on small screens, visible on medium and up */}
                <div className="w-full md:w-2/5 p-5 md:p-8 md:flex md:flex-col md:justify-between hidden md:block" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/244/174/non_2x/artistic-rainbow-colors-splash-watercolor-background-vector.jpg')" }}>
                    {/* <img src="/StoryLogo.png" alt="Wall Stories" className="max-w-[140px] mb-6" /> */}
                    <div className="flex flex-col my-6">
                        <span className="text-3xl font-semibold text-white-500">FLAT</span>
                        <span className="text-6xl font-bold text-black my-1">15% OFF</span>
                        <span className="text-xl text-black">On Modular Interiors</span>
                        <span className="text-xl text-black mt-3">Hurry, Book Before 14th March, 2025!</span>
                    </div>
                    <div className="text-black">
                        <div className="flex items-center my-3">
                            <div className="text-2xl mr-3">🎨</div>
                            <span>Personalised Designs</span>
                        </div>
                        <div className="flex items-center my-3">
                            <div className="text-2xl mr-3">🛡️</div>
                            <span>10-Year Warranty</span>
                        </div>
                    </div>
                </div>

                {/* Right side with form */}
                <div className="w-full md:w-3/5 p-5 md:p-8 relative">

                    {/* Mobile only logo and discount - visible on small screens only */}
                    <div className="flex flex-col items-center mb-4 md:hidden">
                        <div
                            className="text-center bg-amber-50 p-5 rounded-lg w-full bg-cover bg-center flex flex-col items-center justify-center"
                            style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/244/174/non_2x/artistic-rainbow-colors-splash-watercolor-background-vector.jpg')" }}
                        >
                            <span className="block text-2xl font-semibold">FLAT</span>
                            <span className="block text-4xl font-bold text-white-400">15% OFF</span>
                            <span className="block text-xl">On Modular Interiors</span>
                        </div>
                    </div>
                    <span
                        onClick={onClose}
                        className="absolute top-3 right-3 md:top-4 md:right-5 text-2xl md:text-3xl text-gray-500 cursor-pointer hover:text-gray-700 transition-colors z-10"
                    >
                        &times;
                    </span>
                    <h1 className="text-xl md:text-2xl mb-4 md:mb-6 text-gray-800 text-center md:text-left">Get a free design consultation</h1>
                    <div className={isSubmitted ? "hidden" : "block"}>
                        <div className="text-base mb-2 text-gray-600">Property type</div>
                        <div className="grid grid-cols-2 gap-2 mb-4 md:mb-5">
                            <div
                                className={`py-2 md:py-3 text-center border rounded-md cursor-pointer transition-all text-sm md:text-base ${propertyType === '1bhk'
                                    ? 'bg-orange-500 text-white border-orange-500 property-type-active'
                                    : 'border-gray-300 hover:bg-gray-100'
                                }`}
                                data-value="1 BHK"
                                onClick={() => selectPropertyType('1bhk')}
                            >
                                1 BHK
                            </div>
                            <div
                                className={`py-2 md:py-3 text-center border rounded-md cursor-pointer transition-all text-sm md:text-base ${propertyType === '2bhk'
                                    ? 'bg-orange-500 text-white border-orange-500 property-type-active'
                                    : 'border-gray-300 hover:bg-gray-100'
                                }`}
                                data-value="2 BHK"
                                onClick={() => selectPropertyType('2bhk')}
                            >
                                2 BHK
                            </div>
                            <div
                                className={`py-2 md:py-3 text-center border rounded-md cursor-pointer transition-all text-sm md:text-base ${propertyType === '3bhk'
                                    ? 'bg-orange-500 text-white border-orange-500 property-type-active'
                                    : 'border-gray-300 hover:bg-gray-100'
                                }`}
                                data-value="3 BHK"
                                onClick={() => selectPropertyType('3bhk')}
                            >
                                3 BHK
                            </div>
                            <div
                                className={`py-2 md:py-3 text-center border rounded-md cursor-pointer transition-all text-sm md:text-base ${propertyType === '4bhk'
                                    ? 'bg-orange-500 text-white border-orange-500 property-type-active'
                                    : 'border-gray-300 hover:bg-gray-100'
                                }`}
                                data-value="4+ BHK / Duplex"
                                onClick={() => selectPropertyType('4bhk')}
                            >
                                4+ BHK
                            </div>
                        </div>
                        <div className="mb-3 md:mb-4">
                            <select
                                id="popup-location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full p-2 md:p-3 border border-gray-300 rounded-md text-sm md:text-base"
                            >
                                <option value="" disabled>Property Location</option>
                                <option value="Visakhapatnam">Visakhapatnam</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3 md:mb-4">
                            <input
                                type="text"
                                id="popup-name"
                                placeholder="Name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 md:p-3 border border-gray-300 rounded-md text-sm md:text-base"
                            />
                        </div>
                        <div className="mb-3 md:mb-4">
                            <div className="flex border border-gray-300 rounded-md overflow-hidden">
                                <div className="bg-gray-100 p-2 md:p-3 text-sm md:text-base border-r border-gray-300">+91</div>
                                <input
                                    type="number"
                                    id="popup-phone"
                                    placeholder="Mobile Number"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`flex-1 p-2 md:p-3 border-none text-sm md:text-base ${phoneError ? 'bg-red-50' : ''}`}
                                />
                            </div>
                            {(phoneError || (formData.phone && !isValidPhoneNumber(formData.phone))) && (
                                <p className="text-red-500 text-xs mt-1">Please enter a valid 10-digit phone number</p>
                            )}
                        </div>
                        <div className="flex items-center my-3 md:my-4">
                            <input
                                type="checkbox"
                                id="popup-whatsapp"
                                checked={formData.whatsapp}
                                onChange={handleInputChange}
                                className="mr-2 md:mr-3"
                            />
                            <label htmlFor="popup-whatsapp" className="text-sm md:text-base">Yes, send me updates via WhatsApp</label>
                        </div>
                        <button
                            onClick={() => {
                                // Validate location
                                if (!formData.location) {
                                    alert("Please select a location");
                                    return;
                                }
                                
                                // Validate name
                                if (!formData.name.trim()) {
                                    alert("Please enter your name");
                                    return;
                                }
                                
                                // Validate phone number
                                if (!isValidPhoneNumber(formData.phone)) {
                                    setPhoneError(true);
                                    return;
                                }

                                // If validation passes, proceed with popup handling
                                submitPopupForm();
                            }}
                            className="w-full py-2 md:py-3 bg-orange-500 text-white border-none rounded-md text-base md:text-lg font-semibold cursor-pointer hover:bg-orange-600 transition-colors"
                        >
                            Book a Free Consultation
                        </button>
                    </div>
                    <div className={isSubmitted ? "text-center py-6 md:py-8" : "hidden"}>
                        <h2 className="text-xl md:text-2xl text-orange-500 mb-3 md:mb-4">Thank You! 🎉</h2>
                        <p className="text-sm md:text-base">Your details are submitted. Our team will reach out to you soon!</p>
                    </div>

                    {/* Mobile only benefits section - visible on small screens only */}
                    <div className="mt-4 md:hidden">
                        <div className="flex items-center justify-center gap-4 text-sm">
                            <div className="flex items-center">
                                <div className="text-lg mr-1">🎨</div>
                                <span>Personalised Designs</span>
                            </div>
                            <div className="flex items-center">
                                <div className="text-lg mr-1">🛡️</div>
                                <span>10-Year Warranty</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupForm;