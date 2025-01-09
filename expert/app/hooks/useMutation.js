import { useMutation } from "@tanstack/react-query";
import Queries from "@/app/actions/queries";

const useCustomMutation = (key, options = {}) => {
  const mutation = useMutation({
    mutationFn: async (variables) => {
      const response = await Queries[key](variables);

      if (response?.error) {
        throw response;
      }

      return response;
    },
    ...options,
  });

  return {
    ...mutation,
    fetch: mutation.mutateAsync,
  };
};

export default useCustomMutation;