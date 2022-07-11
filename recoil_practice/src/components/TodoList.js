import React from 'react'
import {useRecoilState} from 'recoil'
import {todoListState} from '../recoil/atom'
import TodoItem from './TodoItem'
import TodoItemCreator from './TodoItemCreator'

export default function TodoList() {
  const todoList = useRecoilState(todoListState)
  return (
    <>
      {/* <TodoListStats /> */}
      {/* <TodoListFilters /> */}
      <TodoItemCreator />

      {todoList.map((todoItem)=> (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  )
}
