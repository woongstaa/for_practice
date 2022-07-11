import { atom } from 'recoil';

const textState = atom({
  key: 'textState',
  default: ''
})

const todoListState = atom({
  key:  'todoListState',
  default:[],
})

export { textState, todoListState }