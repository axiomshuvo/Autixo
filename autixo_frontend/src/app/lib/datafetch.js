import { apiFetch } from "./ApiFetch";

const getBaseUrl = () => {
  return process.env.DATA_URI || "http://localhost:5001";
};

const authHeaders = (token) =>
  token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : undefined;

// getAllCars
export const getAllCars = async (
  page = 1,
  limit = 12,
  search = "",
  carType = "",
) => {
  const baseUrl = getBaseUrl();
  const queryParams = new URLSearchParams({ page, limit });
  if (search) {
    queryParams.append("search", search);
  }
  if (carType) {
    queryParams.append("carType", carType);
  }

  const res = await apiFetch(`${baseUrl}/cars?${queryParams.toString()}`, {
    cache: "no-store",
  });

  if (typeof res === "string") {
    throw new Error(res);
  }

  return res;
};

// Random 6 Cars
export const getRandomCars = async () => {
  try {
    return await apiFetch(`/cars/random`);
  } catch (error) {
    console.error("Error fetching random cars:", error);
    return [];
  }
};

// Get Car Details by ID
export const getCarDetails = async (id) => {
  try {
    return await apiFetch(`/explore-cars/${id}`);
  } catch (error) {
    console.error(`Error fetching car details for ID ${id}:`, error);
    return null;
  }
};

// added Car
export const createCar = async (payload) => {
  return apiFetch(`/add-car`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

// Get My Added Cars
export const getMyAddedCars = async (ownerId, token) => {
  try {
    return await apiFetch(`/my-added-cars/${ownerId}`, {
      cache: "no-store",
      headers: authHeaders(token),
    });
  } catch (error) {
    console.error("Error fetching my added cars:", error);
    return [];
  }
};

// Delete Car by ID
export const deleteCar = async (id) => {
  return apiFetch(`/delete-car/${id}`, {
    method: "DELETE",
  });
};

// Update Car by ID
export const updateCar = async (id, payload) => {
  return apiFetch(`/cars/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

// get User Details by ID
export const getUserDetails = async (id, token) => {
  try {
    return await apiFetch(`/user/${id}`, {
      headers: authHeaders(token),
    });
  } catch (error) {
    console.error(`Error fetching user details for ID ${id}:`, error);
    return null;
  }
};

// update User Details by ID
export const updateUserDetails = async (id, payload) => {
  return apiFetch(`/user/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

// Make Booking List by User ID
export const addBooking = async (payload) => {
  try {
    const data = await apiFetch(`/bookings`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!data?.success) {
      throw new Error(data?.message || "Failed to add booking");
    }

    return data;
  } catch (error) {
    console.error("Error adding booking:", error);
    throw error;
  }
};

// Get Booking List by User ID
export const getBookingListByUserId = async (userId, token) => {
  try {
    return await apiFetch(`/bookings/user/${userId}`, {
      cache: "no-store",
      headers: authHeaders(token),
    });
  } catch (error) {
    console.error("Error fetching booking list:", error);
    return [];
  }
};

// Delete Booking by ID
export const deleteBooking = async (bookingId) => {
  try {
    return await apiFetch(`/bookings/${bookingId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};
