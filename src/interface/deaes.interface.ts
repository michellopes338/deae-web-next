export interface IDeae {
  id: string,
  adjustment: string,
  classification: {
    id: string,
    label: string,
  },
  deviation: string,
  local: {
    id: string,
    label: string,
  },
  status: {
    id: string,
    label: string,
  },
  created_at: Date,
  is_valid: boolean,
  user: {
    id: string,
    username: string,
    email: string,
  }
}