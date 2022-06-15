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
  GET_ALL_CLIENTS_ENDED
} from "../types/client_type";

const initialState = {
  clients_loading: true,
  clients: null,
  page: null,
  pages: null,
  total_clients: 0,

  client: null,
  client_loading: null,

  loading: true,

  client_message: null,
  all_clients: null,
  all_clients_loading: null,
  add_client_loading: true,
  edit_client_loading: true
};

export const client_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CLIENTS_STATED:
      return {
        ...state,
        clients: null,
        pages: null,
        page: null,
        total_clients: 0,
        clients_loading: true
      };
    case GET_CLIENTS:
      return {
        ...state,
        clients: payload.clients,
        pages: payload.pages,
        page: payload.page,
        total_clients: payload.count
      };
    case GET_CLIENTS_ENDED:
      return {
        ...state,
        clients_loading: false
      };
    case GET_ALL_CLIENTS_STATED:
      return {
        ...state,
        all_clients_loading: true,
        all_clients: null
      };
    case GET_ALL_CLIENTS:
      return {
        ...state,
        all_clients: payload
      };
    case GET_ALL_CLIENTS_ENDED:
      return {
        ...state,
        all_clients_loading: false
      };

    case ADD_CLIENT_STATED:
      return {
        ...state,
        client_message: null,
        add_client_loading: true
      };
    case ADD_CLIENT:
      return {
        ...state,
        client_message: payload
      };
    case ADD_CLIENT_ENDED:
      return {
        ...state,
        add_client_loading: false
      };
    case GET_CLIENT_STATED:
      return {
        ...state,
        client: null,
        client_loading: true
      };
    case GET_CLIENT:
      return {
        ...state,
        client: payload
      };
    case GET_CLIENT_ENDED:
      return {
        ...state,
        client_loading: false
      };
    case EDIT_CLIENT_STATED:
      return {
        ...state,
        client_message: null,
        edit_client_loading: true
      };
    case EDIT_CLIENT:
      return {
        ...state,
        client_message: payload
      };
    case EDIT_CLIENT_ENDED:
      return {
        ...state,
        edit_client_loading: false
      };

    default:
      return state;
  }
};
