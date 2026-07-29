// getAllCars
export const getAllCars = async (page = 1, limit = 12) => {
  // console.log("Fetching page:", page);
  const res = await fetch(
    `${process.env.DATA_URI}/cars?page=${page}&limit=${limit}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch cars");
  }

  return res.json();
};

// Random 6 Cars
export const getRandomCars = async () => {
  try {
    const response = await fetch(`${process.env.DATA_URI}/cars/random`);
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
    const response = await fetch(`${process.env.DATA_URI}/explore-cars/${id}`);
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
