import apiClient from "../../apiClient";

export const deleteFund = async (fundId: number) => {
  const params = { params: { fundId } };
  return await apiClient.delete("/api/fundset", params);
};
