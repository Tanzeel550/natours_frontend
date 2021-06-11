export interface AlertType {
  type?: 'Success' | 'Error'
  message: string
}

export interface SetSuccessAlertTypeAction {
  message: string
}

export interface SetErrorAlertTypeAction {
  message: string
}
