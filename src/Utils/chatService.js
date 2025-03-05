// // chatService.js - Service for handling chat responses and storing leads

// // Store user information from chat
// export const storeUserLead = (userInfo) => {
//     try {
//       // Get existing leads from localStorage
//       const existingLeads = JSON.parse(localStorage.getItem("designLeads") || "[]");
      
//       // Add new lead with timestamp
//       const newLead = {
//         ...userInfo,
//         timestamp: new Date().toISOString(),
//         id: Date.now() // Unique ID based on current timestamp
//       };
      
//       // Save updated leads to localStorage
//       localStorage.setItem("designLeads", JSON.stringify([...existingLeads, newLead]));
      
//       return true;
//     } catch (error) {
//       console.error("Error storing lead:", error);
//       return false;
//     }
//   };
  
//   // Process user responses to extract information about their design needs
//   export const processUserResponses = (messages) => {
//     // Extract user messages only
//     const userMessages = messages.filter(msg => msg.type === "user");
    
//     // Questions indexes map to user responses
//     const designNeeds = {
//       spaceType: userMessages[0]?.text || "Not specified",
//       preferredStyle: userMessages[1]?.text || "Not specified", 
//       colorPreferences: userMessages[2]?.text || "Not specified",
//       budget: userMessages[3]?.text || "Not specified",
//       specialRequirements: userMessages[4]?.text || "Not specified",
//       name: userMessages[6]?.text || "Not provided",
//       phone: userMessages[7]?.text || "Not provided",
//       location: userMessages[8]?.text || "Not provided"
//     };
    
//     return designNeeds;
//   };



// chatService.js - Enhanced with better lead storage

/**
 * Process user responses from chat messages to extract design information
 * @param {Array} messages - Array of chat messages
 * @returns {Object} Processed user information
 */
export const processUserResponses = (messages) => {
  // Initialize the design info object
  const designInfo = {
    spaceType: "",
    style: "",
    colors: "",
    budget: "",
    requirements: "",
    name: "",
    phone: "",
    location: ""
  };
  
  // Only process user messages (skip bot messages)
  const userMessages = messages.filter(msg => msg.type === "user");
  
  // Map responses to the appropriate fields based on question sequence
  if (userMessages.length > 0) designInfo.spaceType = userMessages[0].text;
  if (userMessages.length > 1) designInfo.style = userMessages[1].text;
  if (userMessages.length > 2) designInfo.colors = userMessages[2].text;
  if (userMessages.length > 3) designInfo.budget = userMessages[3].text;
  if (userMessages.length > 4) designInfo.requirements = userMessages[4].text;
  
  // Skip the confirmation question (index 5) and extract contact info
  if (userMessages.length > 6) designInfo.name = userMessages[6].text;
  if (userMessages.length > 7) designInfo.phone = userMessages[7].text;
  if (userMessages.length > 8) designInfo.location = userMessages[8].text;
  
  return designInfo;
};

/**
 * Store user lead information in localStorage
 * @param {Object} leadData - User lead information
 * @returns {boolean} Success status
 */
export const storeUserLead = (leadData) => {
  try {
    // Ensure we have a valid lead with essential information
    if (!leadData.name || !leadData.phone) {
      console.error("Missing required lead information");
      return false;
    }
    
    // Create a complete lead object with ID and timestamp
    const completeLeadData = {
      id: leadData.id || Date.now().toString(),
      name: leadData.name,
      phone: leadData.phone,
      location: leadData.location || "",
      spaceType: leadData.spaceType || "",
      style: leadData.style || "",
      colors: leadData.colors || "",
      budget: leadData.budget || "",
      requirements: leadData.requirements || "",
      timestamp: leadData.timestamp || new Date().toISOString()
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
    
    // Check if this lead already exists (by ID)
    const existingIndex = existingLeads.findIndex(lead => lead.id === completeLeadData.id);
    
    if (existingIndex >= 0) {
      // Update existing lead
      existingLeads[existingIndex] = completeLeadData;
    } else {
      // Add new lead
      existingLeads.push(completeLeadData);
    }
    
    // Save to localStorage
    localStorage.setItem("designLeads", JSON.stringify(existingLeads));
    
    // You could also implement API calls here to store leads on a server
    
    return true;
  } catch (error) {
    console.error("Error storing lead:", error);
    return false;
  }
};

/**
 * Retrieve all stored design leads
 * @returns {Array} Array of lead objects
 */
export const getDesignLeads = () => {
  try {
    const storedLeads = localStorage.getItem("designLeads");
    return storedLeads ? JSON.parse(storedLeads) : [];
  } catch (error) {
    console.error("Error retrieving leads:", error);
    return [];
  }
};

/**
 * Delete a specific lead by ID
 * @param {string} leadId - ID of the lead to delete
 * @returns {boolean} Success status
 */
export const deleteLead = (leadId) => {
  try {
    // Get existing leads
    const storedLeads = localStorage.getItem("designLeads");
    const existingLeads = storedLeads ? JSON.parse(storedLeads) : [];
    
    // Filter out the lead to delete
    const updatedLeads = existingLeads.filter(lead => lead.id !== leadId);
    
    // Save back to localStorage
    localStorage.setItem("designLeads", JSON.stringify(updatedLeads));
    
    return true;
  } catch (error) {
    console.error("Error deleting lead:", error);
    return false;
  }
};