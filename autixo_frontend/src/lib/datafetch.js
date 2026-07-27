// getAllCars
export const getAllCars = async () => {
  try {
    const response = await fetch(`${process.env.DATA_URI}/cars`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const cars = await response.json();
    return cars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
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
