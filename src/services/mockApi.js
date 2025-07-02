// Service to simulate API calls for GPS tracking

// Simulate an API delay
const simulateApiDelay = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500); // 500ms delay
  });
};

// Mock function to send position data to an API
export const sendPositionToApi = async (positionData) => {
  try {
    console.log('Sending position data to API:', positionData);
    
    // Simulate API delay
    await simulateApiDelay();
    
    // Simulate a successful API response
    console.log('Position sent successfully to API');
    return {
      success: true,
      message: 'Position sent successfully',
      timestamp: new Date().toISOString(),
      data: positionData
    };
  } catch (error) {
    console.error('Error sending position to API:', error);
    return {
      success: false,
      message: 'Failed to send position data',
      error: error.message
    };
  }
};

// Mock function to get latest position data from an API
export const getLatestPosition = async (id, type) => {
  try {
    console.log(`Fetching latest position for ${type} with ID ${id}`);
    
    // Simulate API delay
    await simulateApiDelay();
    
    // Simulate a random position near Paris
    const baseLatitude = 48.856614;
    const baseLongitude = 2.352222;
    
    // Add small random offset to create a "new" position
    const randomLat = baseLatitude + (Math.random() - 0.5) * 0.02;
    const randomLong = baseLongitude + (Math.random() - 0.5) * 0.02;
    
    // Simulated position data
    const positionData = {
      latitude: randomLat,
      longitude: randomLong,
      accuracy: Math.floor(Math.random() * 15) + 5, // Random accuracy between 5-20 meters
      speed: Math.floor(Math.random() * 60), // Random speed between 0-60 km/h
      timestamp: new Date().toISOString(),
      itemId: id,
      itemType: type
    };
    
    console.log('Position fetched successfully:', positionData);
    return {
      success: true,
      data: positionData
    };
  } catch (error) {
    console.error('Error fetching position data:', error);
    return {
      success: false,
      message: 'Failed to fetch position data',
      error: error.message
    };
  }
};