import { apiFetch } from "./ApiFetch";

// ==================== Cars ====================

export const getAllCars = async (
  page = 1,
  limit = 12,
  search = "",
  carType = "",
) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) params.append("search", search);
  if (carType) params.append("carType", carType);

  return apiFetch(`/cars?${params}`);
};

export const getRandomCars = () => apiFetch("/cars/random").catch(() => []);

export const getCarDetails = (id) =>
  apiFetch(`/explore-cars/${id}`).catch(() => null);

export const createCar = (data) =>
  apiFetch("/add-car", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateCar = (id, data) =>
  apiFetch(`/cars/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteCar = (id) =>
  apiFetch(`/delete-car/${id}`, {
    method: "DELETE",
  });

export const getMyAddedCars = (ownerId, token) =>
  apiFetch(`/my-added-cars/${ownerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(() => []);

// ==================== Users ====================

export const getUserDetails = (id, token) =>
  apiFetch(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(() => null);

export const updateUserDetails = (id, data) =>
  apiFetch(`/user/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

// ==================== Bookings ====================

export const addBooking = (data) =>
  apiFetch("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getBookingListByUserId = (userId, token) =>
  apiFetch(`/bookings/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(() => []);

export const deleteBooking = (bookingId) =>
  apiFetch(`/bookings/${bookingId}`, {
    method: "DELETE",
  });
