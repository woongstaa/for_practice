import {selector} from 'recoil';
import {textState} from './atom';

const charCountState = selector({
  key: 'charCountState',
  get: ({get}) => {
    const text = get(textState)

    return text.length
  },
})

export { charCountState }