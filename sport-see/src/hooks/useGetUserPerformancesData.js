import { getUserPerformancesData } from "../data/api";
import { useFetchData } from "./useFetchData";

export function useGetUserPerformancesData(userId) {
  const {isLoading, error, data} = useFetchData(getUserPerformancesData, userId);
  return { isLoading, error, data };
}
