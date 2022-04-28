import './App.css';

import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

// 상태 값(currState)과 변하는 함수(action)를 담는 곳
const reducer = (currState, action) => {
  // Initial Value 설정
  if (currState === undefined) {
    return {
      number: 1,
    };
  }

  // 스프레드를 통해 객체를 딥카피 (기존 상태 값을 수정하면 안되기 때문에)
  const newState = { ...currState };

  // action type에 맞는 행동을 설정
  if (action.type === 'PLUS') {
    newState.number++;
  } else if (action.type === 'POWER') {
    newState.number = Math.pow(newState.number, 2);
  }

  return newState;
};

// reducer를 인자로 받는 createStore 선언 후 연결
const store = createStore(reducer);

function App() {
  return (
    <div id="container">
      <h1>Root</h1>
      <div id="grid">
        <Provider store={store}>
          <Left1 />
          <Right1></Right1>
        </Provider>
      </div>
    </div>
  );
}

const Left1 = () => {
  return (
    <div>
      <h1>Left1: </h1>
      <Left2 />
    </div>
  );
};

const Left2 = () => {
  return (
    <div>
      <h1>Left2: </h1>
      <Left3 />
    </div>
  );
};

const Left3 = () => {
  // 상태 값을 useSelector로 호출
  const number = useSelector(state => state.number);

  return (
    <div>
      <h1>Left3: {number} </h1>
    </div>
  );
};

const Right1 = () => {
  return (
    <div>
      <h1>Right1</h1>
      <Right2 />
    </div>
  );
};

const Right2 = () => {
  return (
    <div>
      <h1>Right2</h1>
      <Right3 />
    </div>
  );
};

const Right3 = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Right3</h1>
      <input
        type="button"
        value="+"
        onClick={() => {
          dispatch({ type: 'PLUS' });
        }}></input>
      <input
        type="button"
        value="Pow"
        onClick={() => {
          dispatch({ type: 'POWER' });
        }}></input>
    </div>
  );
};

export default App;
