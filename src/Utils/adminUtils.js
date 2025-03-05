// src/utils/adminUtils.js - Helper functions for admin authentication

// Check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const test = 'test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// Set admin status with fallback and error handling
export const setAdminStatus = (isAdmin) => {
  try {
    if (isLocalStorageAvailable()) {
      localStorage.setItem("isAdmin", String(isAdmin));
      // Also set a session timestamp
      localStorage.setItem("adminSessionStart", String(Date.now()));
    } else {
      console.warn("localStorage is not available");
    }
  } catch (error) {
    console.error("Error setting admin status:", error);
  }
};

// Check if current user is admin with session validation
export const checkIsAdmin = () => {
  try {
    if (!isLocalStorageAvailable()) {
      return false;
    }

    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const sessionStart = Number(localStorage.getItem("adminSessionStart"));
    const sessionDuration = Date.now() - sessionStart;
    
    // If session is older than 24 hours, clear it
    if (sessionDuration > 24 * 60 * 60 * 1000) {
      adminLogout();
      return false;
    }

    return isAdmin;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

// Admin login function (simplified for demo)
export const adminLogin = (username, password) => {
  try {
    // This is just a demo - in production, NEVER hardcode credentials
    // or perform authentication on the client side
    if (username === "adminwall" && password === "admin123wall") {
      setAdminStatus(true);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
};

// Admin logout with error handling
export const adminLogout = () => {
  try {
    if (isLocalStorageAvailable()) {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("adminSessionStart");
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
};