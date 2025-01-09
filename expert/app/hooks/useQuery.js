import { useQuery } from "@tanstack/react-query";
import Queries from "@/app/actions/queries";

const useCustomQuery = (key, params, options = {}) => {
  const queries = Queries[key];

  if (!queries) {
    console.error(`Query function for key "${key}" not found.`);
    return useQuery({
      queryKey: [key, params],
      queryFn: async () => {
        throw new Error(`Query function for key "${key}" not found.`);
      },
      enabled: false,
      ...options,
    });
  }

  const defaultStaleTime = options.cache ? 24 * 60 * 60 * 1000 : 0;

  if (typeof queries === "function") {
    return useQuery({
      queryKey: [key, params],
      queryFn: () => queries(params),
      staleTime: options.staleTime || defaultStaleTime,
      ...options,
      refetchOnWindowFocus: false,
    });
  }

  return useQuery({
    queryKey: [key],
    queryFn: queries,
    staleTime: options.staleTime || defaultStaleTime,
    ...options,
  });
};

export default useCustomQuery;