import {RecoilRoot} from 'recoil';
import CharacterCounter from './components/CharacterCounter';
import TodoList from './components/TodoList';

function App() {
  return (
  <RecoilRoot>
    <CharacterCounter />
    <TodoList />
  </RecoilRoot>
  );
}

export default App;
