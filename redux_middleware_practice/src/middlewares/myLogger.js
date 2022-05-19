const myLogger = store => next => action => {
  console.log(action);

  const result = next(action); // next는 다음 미들웨어 혹은 리듀서에게 액션을 전달하는 역할

  console.log('\t', store.getState()); // 업데이트 이후의 상태 값을 조회

  return result; // 이 값은 dispatch(action)의 결과물이 됩니다.
};

export default myLogger;
