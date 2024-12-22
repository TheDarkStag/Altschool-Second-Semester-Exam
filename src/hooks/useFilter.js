import { useState, useMemo } from 'react';

export function useFilter(items, initialFilter = 'all', initialSearch = '') {
  const [filter, setFilter] = useState(initialFilter);
  const [search, setSearch] = useState(initialSearch);

  const filteredItems = useMemo(() => {
    return items
      .filter(item => {
        if (filter === 'completed') return item.completed;
        if (filter === 'pending') return !item.completed;
        return true;
      })
      .filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
  }, [items, filter, search]);

  return {
    filter,
    search,
    setFilter,
    setSearch,
    filteredItems
  };
}