import type { ReactNode } from 'react';

type WithId = {
  id: string | number;
};

type TableData<T = Record<string, any>> = T & WithId;

export type TableProps<T extends TableData> = {
  data: T[];
  columns: TableColumn<T>[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
  isLoading?: boolean;
} & CommonSortProps<T>;

export type TableColumn<T, K extends keyof T = keyof T> = {
  key: K;
  label: string;
  render?: (value: T[K], item: T) => ReactNode;
};

export type TableColumns<T> = {
  columns: TableColumn<T>[];
} & CommonSortProps<T>;

export type CommonSortProps<T, K extends keyof T = keyof T> = {
  sortBy?: K;
  sortOrder?: 'asc' | 'desc';
  onSort?: (field: K) => void;
};
