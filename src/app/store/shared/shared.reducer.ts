import {createReducer, on} from "@ngrx/store";
import {initialState} from "./shared.state";
import {setErrorMessage, setLoadingSpinner, setSelectedExam, setSignedInStatus} from "./shared.actions";

export const sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status
    }
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message
    }
  }),
  on(setSignedInStatus, (state, action) => {
    return {
      ...state,
      isSignedIn: action.status
    }
  }),
  on(setSelectedExam, (state, action) => {
    return {
      ...state,
      selectedExam: action.exam
    }
  })
)
