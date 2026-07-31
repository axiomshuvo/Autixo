const getBaseUrl = () => {
  return process.env.DATA_URI || "http://localhost:5001";
};
// getAllCars
export const getAllCars = async (page = 1, limit = 12) => {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/cars?page=${page}&limit=${limit}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cars");
  }

  return res.json();
};

// Random 6 Cars
export const getRandomCars = async () => {
  try {
    const response = await fetch(`${getBaseUrl()}/cars/random`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const randomCars = await response.json();
    return randomCars;
  } catch (error) {
    console.error("Error fetching random cars:", error);
    return [];
  }
};

// Get Car Details by ID

export const getCarDetails = async (id) => {
  try {
    const response = await fetch(`${getBaseUrl()}/explore-cars/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const carDetails = await response.json();
    return carDetails;
  } catch (error) {
    console.error(`Error fetching car details for ID ${id}:`, error);
    return null;
  }
};

// added Car
export const createCar = async (payload) => {
  const response = await fetch(`${getBaseUrl()}/add-car`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Failed to create car");
  }
  return {
    ok: response.ok,
    status: response.status,
    data,
  };
};

// Get My Added Cars
export const getMyAddedCars = async (ownerId) => {
  try {
    const response = await fetch(`${getBaseUrl()}/my-added-cars/${ownerId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching my added cars:", error);
    return [];
  }
};

// Delete Car by ID
export const deleteCar = async (id) => {
  const response = await fetch(`${getBaseUrl()}/delete-car/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Delete failed");
  }

  return data;
};

// Update Car by ID
export const updateCar = async (id, payload) => {
  const res = await fetch(`${getBaseUrl()}/cars/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to update car");
  }

  return data;
};

// get User Details by ID
export const getUserDetails = async (id) => {
  try {
    const response = await fetch(`${getBaseUrl()}/user/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const userDetails = await response.json();
    return userDetails;
  } catch (error) {
    console.error(`Error fetching user details for ID ${id}:`, error);
    return null;
  }
};

// update User Details by ID
export const updateUserDetails = async (id, payload) => {
  const res = await fetch(`${getBaseUrl()}/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to update user details");
  }

  return data;
};
