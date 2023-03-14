import {SharedState} from "./shared/shared.state";
import {sharedReducer} from "./shared/shared.reducer";
import {SHARED_STATE_NAME} from "./shared/shared.selectors";

export interface AppState {
  [SHARED_STATE_NAME]: SharedState
}

export const appReducer = {
  [SHARED_STATE_NAME]: sharedReducer
}
