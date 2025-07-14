import instance from "../Setup/axios.ts";

const fetchAllUsers = (CurrentPage: number, PageSize: number) => {
  return instance.get("/api/user", {
    params: {
      CurrentPage: CurrentPage,
      PageSize: PageSize,
    },
  });
};

export { fetchAllUsers };
