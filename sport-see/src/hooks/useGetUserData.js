import { useEffect, useState } from "react";
import { getUserData } from "../data/api";
import { useFetchData } from "./useFetchData";

export function useGetUserData(userId) {
  const {isLoading, error, data} = useFetchData(getUserData, userId);
  return { isLoading, error, data };
}
