import { getUserActivityData } from "../data/api";
import { useFetchData } from "./useFetchData";

export function useGetUserActivityData(userId) {
  const {isLoading, error, data} = useFetchData(getUserActivityData, userId);
  return { isLoading, error, data };
}
