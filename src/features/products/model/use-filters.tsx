import { useSearchParams } from 'react-router-dom';

type SearchParams = {
  search: string;
  page: string;
  sortBy: string;
  order: string;
};

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: SearchParams = {
    sortBy: searchParams.get('sortBy') || '',
    order: searchParams.get('order') || '',
    search: searchParams.get('search') || '',
    page: searchParams.get('page') || '1',
  };

  const updateFiltes = (updates: Partial<SearchParams>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== '') {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    setSearchParams(newParams, { replace: true });
  };

  return { filters, updateFiltes };
};
