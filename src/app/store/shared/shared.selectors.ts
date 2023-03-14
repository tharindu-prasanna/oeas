import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SharedState} from "./shared.state";

export const SHARED_STATE_NAME = 'shared'

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME)

export const getLoading = createSelector(getSharedState, (state: SharedState) => {
  return state.showLoading
})

export const getErrorMessage = createSelector(getSharedState, (state: SharedState) => {
  return state.errorMessage
})

export const getSignedInStatus = createSelector(getSharedState, (state: SharedState) => {
  return state.isSignedIn
})

export const getSelectedExam = createSelector(getSharedState, (state: SharedState) => {
  return state.selectedExam
})
