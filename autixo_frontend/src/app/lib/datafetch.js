import { apiFetch } from "./ApiFetch";

const authHeaders = (token) =>
  token ? { Authorization: `Bearer ${token}` } : undefined;

// Get All Cars
export const getAllCars = async (
  page = 1,
  limit = 12,
  search = "",
  carType = "",
) => {
  const params = new URLSearchParams({ page, limit });
  if (search) params.append("search", search);
  if (carType) params.append("carType", carType);

  return apiFetch(`/cars?${params.toString()}`, { cache: "no-store" });
};

// Random 6 Cars
export const getRandomCars = () => apiFetch(`/cars/random`).catch(() => []);

// Get Car Details by ID
export const getCarDetails = (id) =>
  apiFetch(`/explore-cars/${id}`).catch(() => null);

// Create Car
export const createCar = (payload) => {
  const normalizedPayload = {
    ...payload,
    ownerId: payload?.ownerId || payload?.userId || "",
    userId: payload?.userId || payload?.ownerId || "",
  };

  return apiFetch(`/add-car`, {
    method: "POST",
    body: JSON.stringify(normalizedPayload),
  });
};

// Get My Added Cars
export const getMyAddedCars = (ownerId, token) =>
  apiFetch(`/my-added-cars/${ownerId}`, {
    cache: "no-store",
    headers: authHeaders(token),
  }).catch(() => []);

// Delete Car by ID
export const deleteCar = (id) =>
  apiFetch(`/delete-car/${id}`, { method: "DELETE" });

// Update Car by ID
export const updateCar = (id, payload) =>
  apiFetch(`/cars/${id}`, { method: "PUT", body: JSON.stringify(payload) });

// Get User Details by ID
export const getUserDetails = (id, token) =>
  apiFetch(`/user/${id}`, { headers: authHeaders(token) }).catch(() => null);

// Update User Details by ID
export const updateUserDetails = (id, payload) =>
  apiFetch(`/user/${id}`, { method: "PUT", body: JSON.stringify(payload) });

// Add Booking
export const addBooking = (payload) =>
  apiFetch(`/bookings`, { method: "POST", body: JSON.stringify(payload) });

// Get Booking List by User ID
export const getBookingListByUserId = (userId, token) =>
  apiFetch(`/bookings/user/${userId}`, {
    cache: "no-store",
    headers: authHeaders(token),
  }).catch(() => []);

// Delete Booking by ID
export const deleteBooking = (bookingId) =>
  apiFetch(`/bookings/${bookingId}`, { method: "DELETE" });
