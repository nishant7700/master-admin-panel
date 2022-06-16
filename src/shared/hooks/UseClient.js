import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _debounce from "lodash/debounce";
import {
  addClient,
  getClients,
  getClient,
  editClient,
  deleteClient,
  getAllClients,
} from "../../store/actions/client_action";

// Get All Data
export const useAllClients = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.client);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
  console.log("ID TO DELETE", deleteEntry);
  useEffect(() => {
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(
        getClients({
          pageNumber,
        })
      );
    }, 1000),
    []
  );

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteClient(deleteEntry));
      allQuery();
    }
  }, [deleteEntry]);

  useEffect(() => {
    setPageNumber(1);
  }, [window.location.search]);

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleClient = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.client);
  useEffect(() => {
    dispatch(getClient(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateClient = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.client);
  const addData = async (data) => {
    await dispatch(addClient(data));
  };
  return [data, addData];
};
export const useUpdateClient = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.client);
  const updateData = async (id, data) => {
    await dispatch(editClient(id, data));
  };
  return [updateData];
};

export const useSelectAllClient = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.client);
  useEffect(() => {
    dispatch(getAllClients({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [client, setClientSearchField, setClientSearchValue] =
    useSelectAllClient();
  const [dropdownOptions, setDropdownOptions] = useState({});
  useEffect(() => {
    if (client && client.all_clients) {
      const newData = client.all_clients.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, client: newData });
    }
  }, [client]);

  return [dropdownOptions, setClientSearchField, setClientSearchValue];
};
