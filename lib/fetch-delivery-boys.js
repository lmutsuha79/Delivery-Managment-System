export const fetchDeliveryBoys = async () => {
  try {
    const data = await fetch("/api/get-delivery-boys");
    const fetchedDeliveryBoys = await data.json();

    return fetchedDeliveryBoys;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
