export const PAGE_TITLE = "Clients";
export const PAGE_SINGLE_TITLE = "Client";
export const LINK_URL = "clients";
export const inputFields = {
  name: {
    type: "string",
    required: true,
    title: "Name",
    inputType: "text",
  },
  payment_status: {
    type: "select",
    required: true,
    title: "Payment Status",
    inputType: "select",
    options: ["PAID", "NOT PAID"],
  },
  client: {
    type: "related",
    required: true,
    title: "Client",
    inputType: "select",
  },
};
export const initialValues = {
  name: "",
  payment_status: "",
};

export const view_all_table = [
  { name: "Name", value: "name" },
  { name: "payment_status", value: "payment_status" },
];

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
    id: "payment_status",
    field: "payment_status",
    label: "Payment Status",
    type: "select",
    search_type: "exact",
    inputType: "text",
    condition: "",
    options: ["PAID", "NOT PAID"],
  },
  {
    id: "phone",
    field: "phone",
    label: "Phone",
    type: "string",
    search_type: "exact",
    inputType: "text",
    condition: "",
  },
  {
    id: "client",
    field: "client",
    label: "Client",
    type: "related",
    search_type: "exact",
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
