// Test file to demonstrate the usage of tier store functions
import {
  configTierStore,
  getTierLists,
  getTierList,
  addTierList,
  updateTierList,
  deleteTierList,
  setCurrentTierList,
  getCurrentTierList,
} from "./tier.store";

// Example usage of the tier store functions
const exampleUsage = async () => {
  // Initialize the store
  await configTierStore();

  // Get all tier lists
  const allTierLists = await getTierLists();
  console.log("All tier lists:", allTierLists);

  // Add a new tier list
  const newTierListData = {
    name: "My New Tier List",
    tiers: [
      {
        id: "tier-s",
        tier: "S",
        backgroundColor: "#ccaa00",
        elements: [],
      },
      {
        id: "tier-a",
        tier: "A",
        backgroundColor: "#cc9900",
        elements: [],
      },
    ],
    elements: [],
  };

  const newTierList = await addTierList(newTierListData);
  console.log("Added tier list:", newTierList);

  // Get a specific tier list by ID
  const retrievedTierList = await getTierList(newTierList.id);
  console.log("Retrieved tier list:", retrievedTierList);

  // Update the tier list
  const updatedTierList = await updateTierList(newTierList.id, {
    name: "Updated Tier List Name",
    tiers: [
      {
        id: "tier-s",
        tier: "S",
        backgroundColor: "#ccaa00",
        elements: [],
      },
      {
        id: "tier-a",
        tier: "A",
        backgroundColor: "#cc9900",
        elements: [],
      },
      {
        id: "tier-b",
        tier: "B",
        backgroundColor: "#cc6600",
        elements: [],
      },
    ],
  });
  console.log("Updated tier list:", updatedTierList);

  // Set as current tier list
  await setCurrentTierList(updatedTierList);
  const currentTierList = getCurrentTierList();
  console.log("Current tier list:", currentTierList);

  // Delete the tier list
  const deleted = await deleteTierList(newTierList.id);
  console.log("Tier list deleted:", deleted);

  // Get all tier lists again to confirm deletion
  const remainingTierLists = await getTierLists();
  console.log("Remaining tier lists:", remainingTierLists);
};

// Export the example for potential use in tests
export { exampleUsage };
