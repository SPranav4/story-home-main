// // AdminLeadsView.jsx - For admin to view collected leads
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { checkIsAdmin } from "../../utils/adminUtils";

// const AdminLeadsView = () => {
//   const navigate = useNavigate();
//   const [leads, setLeads] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check admin status
//     const admin = checkIsAdmin();
//     setIsAdmin(admin);
    
//     if (!admin) {
//       navigate("/admin/login");
//       return;
//     }
    
//     // Load leads from localStorage
//     try {
//       const storedLeads = JSON.parse(localStorage.getItem("designLeads") || "[]");
//       setLeads(storedLeads);
//     } catch (error) {
//       console.error("Error loading leads:", error);
//     }
    
//     setLoading(false);
//   }, [navigate]);

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return "Unknown";
    
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleString();
//     } catch (error) {
//       return "Invalid date";
//     }
//   };

//   // Delete a lead
//   const handleDeleteLead = (id) => {
//     if (window.confirm("Are you sure you want to delete this lead?")) {
//       try {
//         const updatedLeads = leads.filter(lead => lead.id !== id);
//         localStorage.setItem("designLeads", JSON.stringify(updatedLeads));
//         setLeads(updatedLeads);
//       } catch (error) {
//         console.error("Error deleting lead:", error);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return null; // Redirecting to login
//   }

//   return (
//     <div className="container mx-auto p-4 max-w-[1150px]">
//       <h1 className="text-2xl font-bold mb-6">Design Consultation Leads</h1>
      
//       {leads.length === 0 ? (
//         <div className="bg-gray-100 p-6 rounded-lg text-center">
//           <p>No leads found. When users interact with the design assistant chat, their information will appear here.</p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="py-3 px-4 text-left">Name</th>
//                 <th className="py-3 px-4 text-left">Contact</th>
//                 <th className="py-3 px-4 text-left">Location</th>
//                 <th className="py-3 px-4 text-left">Space Type</th>
//                 <th className="py-3 px-4 text-left">Budget</th>
//                 <th className="py-3 px-4 text-left">Date</th>
//                 <th className="py-3 px-4 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {leads.map((lead) => (
//                 <tr key={lead.id} className="hover:bg-gray-50">
//                   <td className="py-3 px-4">{lead.name}</td>
//                   <td className="py-3 px-4">{lead.phone}</td>
//                   <td className="py-3 px-4">{lead.location}</td>
//                   <td className="py-3 px-4">{lead.spaceType}</td>
//                   <td className="py-3 px-4">{lead.budget}</td>
//                   <td className="py-3 px-4">{formatDate(lead.timestamp)}</td>
//                   <td className="py-3 px-4">
//                     <button
//                       onClick={() => handleDeleteLead(lead.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminLeadsView;


// AdminLeadsView.jsx - Enhanced to display leads from multiple sources
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkIsAdmin } from "../../Utils/adminUtils";
import { FaFilter, FaSearch, FaTrash, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const AdminLeadsView = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

  useEffect(() => {
    // Check admin status
    const admin = checkIsAdmin();
    setIsAdmin(admin);
    
    if (!admin) {
      navigate("/admin/login");
      return;
    }
    
    // Load leads from localStorage
    try {
      const storedLeads = JSON.parse(localStorage.getItem("designLeads") || "[]");
      setLeads(storedLeads);
    } catch (error) {
      console.error("Error loading leads:", error);
    }
    
    setLoading(false);
  }, [navigate]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (error) {
      return "Invalid date";
    }
  };

  // Sort leads based on sortConfig
  const sortedLeads = React.useMemo(() => {
    let sortableLeads = [...leads];
    if (sortConfig.key) {
      sortableLeads.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableLeads;
  }, [leads, sortConfig]);

  // Request sort function
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sort direction indicator
  const getSortDirectionIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  // Filter leads based on search term and source filter
  const filteredLeads = React.useMemo(() => {
    return sortedLeads.filter(lead => {
      // Apply source filter
      if (filterSource !== "all" && (!lead.source || lead.source !== filterSource)) {
        return false;
      }
      
      // Apply search term filter (search in name, phone, location)
      const searchLower = searchTerm.toLowerCase();
      return (
        (lead.name && lead.name.toLowerCase().includes(searchLower)) ||
        (lead.phone && lead.phone.toLowerCase().includes(searchLower)) ||
        (lead.location && lead.location.toLowerCase().includes(searchLower))
      );
    });
  }, [sortedLeads, searchTerm, filterSource]);

  // Delete a lead
  const handleDeleteLead = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        const updatedLeads = leads.filter(lead => lead.id !== id);
        localStorage.setItem("designLeads", JSON.stringify(updatedLeads));
        setLeads(updatedLeads);
      } catch (error) {
        console.error("Error deleting lead:", error);
      }
    }
  };

  // Handle contacting a lead
  const handleContact = (type, contact) => {
    if (type === 'phone') {
      window.location.href = `tel:${contact}`;
    } else if (type === 'whatsapp') {
      window.open(`https://wa.me/91${contact}`, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Redirecting to login
  }

  // Calculate source types for filtering
  const sourceTypes = [...new Set(leads.map(lead => lead.source || "Chat"))];

  return (
    <div className="container mx-auto p-4 max-w-[1150px]">
      <h1 className="text-2xl font-bold mb-6">Design Consultation Leads</h1>
      
      {/* Search and filter controls */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="relative w-full md:w-auto md:flex-1">
          <input
            type="text"
            placeholder="Search by name, phone or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <FaFilter className="text-gray-500" />
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="all">All Sources</option>
            {sourceTypes.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-blue-700">Total Leads</h3>
          <p className="text-3xl font-bold">{leads.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-green-700">New Today</h3>
          <p className="text-3xl font-bold">
            {leads.filter(lead => {
              const today = new Date();
              const leadDate = new Date(lead.timestamp);
              return leadDate.setHours(0,0,0,0) === today.setHours(0,0,0,0);
            }).length}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-purple-700">New This Week</h3>
          <p className="text-3xl font-bold">
            {leads.filter(lead => {
              const now = new Date();
              const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
              weekStart.setHours(0,0,0,0);
              const leadDate = new Date(lead.timestamp);
              return leadDate >= weekStart;
            }).length}
          </p>
        </div>
      </div>
      
      {filteredLeads.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p>No leads found. When users interact with the design assistant chat or fill out the popup form, their information will appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200" 
                  onClick={() => requestSort('name')}
                >
                  Name {getSortDirectionIndicator('name')}
                </th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                  onClick={() => requestSort('location')}
                >
                  Location {getSortDirectionIndicator('location')}
                </th>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                  onClick={() => requestSort('spaceType')}
                >
                  Space Type {getSortDirectionIndicator('spaceType')}
                </th>
                <th className="py-3 px-4 text-left">Details</th>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                  onClick={() => requestSort('timestamp')}
                >
                  Date {getSortDirectionIndicator('timestamp')}
                </th>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                  onClick={() => requestSort('source')}
                >
                  Source {getSortDirectionIndicator('source')}
                </th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{lead.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span>{lead.phone}</span>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleContact('phone', lead.phone)}
                          className="text-blue-500 hover:text-blue-700 p-1"
                          title="Call"
                        >
                          <FaPhoneAlt size={14} />
                        </button>
                        <button 
                          onClick={() => handleContact('whatsapp', lead.phone)}
                          className="text-green-500 hover:text-green-700 p-1"
                          title="WhatsApp"
                        >
                          <FaWhatsapp size={14} />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{lead.location}</td>
                  <td className="py-3 px-4">{lead.spaceType}</td>
                  <td className="py-3 px-4">
                    <div className="max-w-[200px] overflow-hidden text-sm">
                      {lead.style && <div>Style: {lead.style}</div>}
                      {lead.colors && <div>Colors: {lead.colors}</div>}
                      {lead.budget && <div>Budget: {lead.budget}</div>}
                      {lead.requirements && <div>Notes: {lead.requirements}</div>}
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">{formatDate(lead.timestamp)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      lead.source === 'Popup Form' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {lead.source || 'Chat'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminLeadsView;