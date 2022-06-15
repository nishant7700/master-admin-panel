import api from "../../domain/api";
import {
  GET_CLIENTS_STATED,
  GET_CLIENTS,
  GET_CLIENTS_ENDED,
  ADD_CLIENT_STATED,
  ADD_CLIENT,
  ADD_CLIENT_ENDED,
  EDIT_CLIENT_STATED,
  EDIT_CLIENT,
  EDIT_CLIENT_ENDED,
  GET_CLIENT_STATED,
  GET_CLIENT,
  GET_CLIENT_ENDED,
  GET_ALL_CLIENTS_STATED,
  GET_ALL_CLIENTS,
  GET_ALL_CLIENTS_ENDED,
} from "../types/client_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addClient = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_CLIENT_STATED,
    });
    const { data } = await api.post(`/clients`, formData);
    dispatch({
      type: ADD_CLIENT,
      payload: data,
    });
    dispatch({
      type: ADD_CLIENT_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_CLIENT_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getClients =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_CLIENTS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });
      // console.log("QUERY PARAMS", queryParams);

      const { data } = await api.get(
        `/clients?&pageNumber=${pageNumber}&${query}`
      );

      dispatch({
        type: GET_CLIENTS,
        payload: data,
      });
      dispatch({
        type: GET_CLIENTS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_CLIENTS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getClient = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CLIENT_STATED,
    });
    const { data } = await api.get(`/clients/${id}`);

    dispatch({
      type: GET_CLIENT,
      payload: data,
    });
    dispatch({
      type: GET_CLIENT_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_CLIENT_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editClient = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_CLIENT_STATED,
    });
    const { data } = await api.put(`/clients/${id}`, formData);
    dispatch({
      type: EDIT_CLIENT,
      payload: data,
    });
    dispatch({
      type: EDIT_CLIENT_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_CLIENT_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteClient = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/clients/${id}`);
    dispatch(setAlert("Client Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllClients =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_CLIENTS_STATED,
      });
      const { data } = await api.get(
        `/clients/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_CLIENTS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_CLIENTS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_CLIENTS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
