export type ClansSort = "DepositedDiamonds" | "Points" | "Created";
export type SortOrder = "asc" | "desc";

export type GetClansParams = {
  page?: number;
  pageSize?: number;
  sort?: ClansSort;
  sortOrder?: SortOrder;
};
