import { useState, useMemo, useCallback } from "react";
import { debounce } from "radash";

export function useDebouncedSearch(delay: number = 1000) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDebouncing, setIsDebouncing] = useState(false);

  const debouncedSearch = useMemo(
    () =>
      debounce({ delay }, (search: string) => {
        setSearchQuery(search);
        setIsDebouncing(false);
      }),
    [delay]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsDebouncing(true);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  return {
    searchQuery,
    isDebouncing,
    handleInputChange,
  };
}
