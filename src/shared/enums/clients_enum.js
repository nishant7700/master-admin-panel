export const PAGE_TITLE = "Clients";
export const PAGE_SINGLE_TITLE = "Client";
export const LINK_URL = "clients";
export const inputFields = {
  name: {
    type: "string",
    required: false,
    title: "Name",
    inputType: "",
    options: "",
    field: "",
  },
};
export const initialValues = {
  name: "",
};

export const view_all_table = [{ name: "Name", value: "name" }];

export const SIDEBAR_OPTIONS = [
  {
    id: "name",
    field: "name",
    label: "Name",
    type: "string",
    search_type: "search",
    inputType: "text",
    condition: "",
  },
  {
    id: "createdAtGte",
    field: "createdAt",
    label: "Date From",
    type: "string",
    search_type: "conditional",
    condition: "$gte",
    inputType: "date",
  },
  {
    id: "createdAtLte",
    field: "createdAt",
    label: "Date To",
    type: "string",
    search_type: "conditional",
    condition: "$lte",
    inputType: "date",
  },
];
