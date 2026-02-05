import { create } from "zustand";

export type SortOption =
  | "price_asc"
  | "price_desc"
  | "rating"
  | "created_desc"
  | "created_asc";
export type DepartureTime =
  | "any"
  | "morning"
  | "afternoon"
  | "evening"
  | "night";

export interface RideSearchFilters {
  fromLat?: number;
  fromLng?: number;
  toLat?: number;
  toLng?: number;

  fromText?: string;
  toText?: string;

  date?: string;
  departure: DepartureTime;

  seats: number;

  sort?: SortOption;
  verifiedOnly: boolean;

  page: number;
  limit: number;
}

interface RideSearchState {
  filters: RideSearchFilters;
  isSearchDialogOpen: boolean;
  setFilters: (filters: Partial<RideSearchFilters>) => void;
  resetFilters: () => void;
  setSearchDialogOpen: (open: boolean) => void;
  buildQueryParams: () => URLSearchParams;
}

const defaultFilters: RideSearchFilters = {
  departure: "any",
  seats: 1,
  verifiedOnly: false,
  page: 1,
  limit: 9,
};

export const useRideSearchStore = create<RideSearchState>()((set, get) => ({
  filters: defaultFilters,
  isSearchDialogOpen: false,

  setFilters: (updates) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...updates,
        page: updates.page !== undefined ? updates.page : 1,
      },
    })),

  resetFilters: () =>
    set({
      filters: defaultFilters,
    }),

  setSearchDialogOpen: (open) => set({ isSearchDialogOpen: open }),

  buildQueryParams: () => {
    const { filters } = get();
    const params = new URLSearchParams();

    if (filters.fromLat !== undefined)
      params.set("fromLat", String(filters.fromLat));
    if (filters.fromLng !== undefined)
      params.set("fromLng", String(filters.fromLng));
    if (filters.toLat !== undefined) params.set("toLat", String(filters.toLat));
    if (filters.toLng !== undefined) params.set("toLng", String(filters.toLng));
    filters.fromText && params.set("fromText", filters.fromText);
    filters.toText && params.set("toText", filters.toText);

    if (filters.date) params.set("date", filters.date);

    params.set("seats", String(filters.seats));

    return params;
  },
}));
