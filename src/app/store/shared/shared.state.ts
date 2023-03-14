export interface SharedState {
  showLoading: boolean
  errorMessage: string
  isSignedIn: boolean
  selectedExam: string | null
}

export const initialState: SharedState = {
  showLoading: false,
  errorMessage: '',
  isSignedIn: false,
  selectedExam: ''
}
