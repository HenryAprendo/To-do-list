export type Status = 'process' | 'pending' |'finalize' | 'initial' ;

export interface Task {
  id: string,
  title: string,
  state: Status,
  date: Date
}
