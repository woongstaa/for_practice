import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Counter from '../components/Counter';
import { decrease, increase, setDiff } from '../modules/counter';

export default function CounterContainer() {
  const { number, diff } = useSelector(
    state => ({
      number: state.counter.number,
      diff: state.counter.diff,
    }),
    shallowEqual,
  );

  const dispatch = useDispatch();

  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = diff => dispatch(setDiff(diff));

  return <Counter number={number} diff={diff} onIncrease={onIncrease} onDecrease={onDecrease} onSetDiff={onSetDiff} />;
}
