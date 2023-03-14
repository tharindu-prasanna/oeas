import {createAction, props} from "@ngrx/store";

export const setLoadingSpinner = createAction('set-loading-spinner', props<{ status: boolean }>())

export const setErrorMessage = createAction('set-error-message', props<{ message: string }>())
export const setSignedInStatus = createAction('set-signedin-status', props<{ status: boolean }>())
export const setSelectedExam = createAction('set-exam', props<{ exam: string | null }>())
