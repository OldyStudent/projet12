import { getUserAverageSessionsData } from "../data/api";
import { useFetchData } from "./useFetchData";

export function useGetUserAverageSessionsData(userId) {
  const {isLoading, error, data} = useFetchData(getUserAverageSessionsData, userId);
  return { isLoading, error, data };
}
