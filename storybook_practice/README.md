> 이 글은 스토리북 [공식문서](https://storybook.js.org/tutorials/intro-to-storybook/react/ko/get-started/)를 가지고 공부하고 정리한 내용입니다. 혹시라도 틀린 내용이 있다면 알려주세요!

# Storybook?

스토리북은 UI 개발 도구입니다. 스토리북은 컴포넌트들을 분리시킴으로써 더 빠르고 간단하게 개발할 수 있게 도와줍니다. 또한 스토리북은 전체 UI를 복잡한 기술 스택을 요구하지 않고, 데이터베이스에 데이터가 필요한 것을 강요하지 않고 개발할 수 있으며 어플리케이션을 돌아 볼 수 있게끔 해줍니다.

스토리북을 작은 단위의 컴포넌트부터 복잡한 어플리케이션 단위에도 사용할 수 있습니다. UI이기만 한다면, 스토리북을 통해 만들 수 있습니다.

스토리북은 컴포넌트를 재사용할 수 있게 문서화 할 수 있고, 버그를 막기위해 자동적으로 시각화 테스트를 진행합니다. 또한 반응형 레이아웃을 미세조정하거나 접근성을 확인하는데 도움이 되는 애드온 애코시스템으로 스토리북을 확장할 수도 있습니다.

스토리북은 가장 널리 사용되는 JavaScript UI 프레임워크와 통합되며 (실험적으로) Ruby on Rails와 같은 서버 렌더링 구성 요소 프레임워크를 지원합니다.

# Storybook Tutorial for React

## 시작하기

### React Storybook 설치하기

```shell
# Create our application:
npx create-react-app taskbox

cd taskbox

# Add Storybook:
npx -p @storybook/cli sb init
```

> 이 튜토리얼에서는 yarn을 사용해 대부분의 명령어를 실행하지만, npm을 선호한다면 --use-npm 플래그를 추가하면 npm에서도 사용할 수 있습니다.

```shell
# Run the test runner (Jest) in a terminal:
yarn test --watchAll

# Start the component explorer on port 6006:
yarn storybook

# Run the frontend app proper on port 3000:
yarn start
```

### Asset 추가하기

의도된 디자인에 맞도록 글꼴과 아이콘 디렉터리들을 모두 다운로드해서 src/assets 폴더 안에 넣어주세요. 터미널에서 다음 명령어를 실행하세요.

```shell
npx degit chromaui/learnstorybook-code/src/assets/font src/assets/font
npx degit chromaui/learnstorybook-code/src/assets/icon src/assets/icon
```

## 간단한 컴포넌트

간단한 컴포넌트를 독립적으로 만들어 봅시다.

우리는 컴포넌트 기반 개발(CDD, Component-Driven Development) 방법론에 따라 UI를 만들어 볼 것입니다. 이는 컴포넌트로부터 시작하여 마지막 화면에 이르기까지 상향적으로 UI를 개발하는 과정입니다. CDD는 UI를 구축할 때 직면하게 되는 규모의 복잡성을 해결하는 데 도움이 됩니다.

### Task 컴포넌트

Task는 핵심 컴포넌트입니다. 아래와 같은 props를 필요로 합니다.

- title: task를 설명해주는 문자열
- state: 현재 어떤 task가 목록에 있으며, 선택되어 있는지의 여부

### 설정하기

우선 Task 컴포넌트와 그에 해당하는 스토리 파일을 만들어 봅시다.
`src/component/Task.js`와 `src/components/Taks.stories.js`를 생성해주세요

```jsx
// src/components/Task.js

import React from 'react';

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <div className="list-item">
      <input type="text" value={title} readOnly={true} />
    </div>
  );
}
```

스토리북은 기본적으로 컴포넌트와 스토리, 두 단계로 구성되어 있습니다. 각각의 스토리는 해당 컴포넌트에 대응됩니다.

- 컴포넌트
  - 스토리
  - 스토리
  - 스토리

이제 스토리북에게 우리가 문서화하고 있는 컴포넌트에 대해서 알려주기위해, 아래 사항들을 포함하는 default export를 생성합니다.

- component: 해당 컴포넌트
- title: 스토리북 앱의 사이드바에서 컴포넌트를 참조하는 방법

```jsx
// src/components/Task.stories.js

import React from 'react';

import Task from './Task';

export default {
  component: Task,
  title: 'Task',
};

const Template = args => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED',
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED',
  },
};
```

스토리를 정의하기 위해, 각각의 테스트 state에 해당하는 스토리를 함수로 내보냅니다. 스토리는 주어진 state안에서 렌더링된 요소(prop이 포함된 컴포넌트)를 리턴하는 함수입니다. 이는 함수형 컴포넌트와 같은 구조를 가지고 있습니다.

우리 컴포넌트의 순열이 여러 개이기 때문에 템플릿 변수에 할당하는 것이 편합니다. 이 패턴을 스토리에 도입함으로써 작성하고 유지해야하는 코드의 양이 줄어들 것입니다.

> Template.bind({})는 함수의 복사본을 만드는 표준 JavaScript의 한 기법입니다. 이를 활용해 각각의 스토리가 고유한 속성을 갖는 동시에 동일한 구현을 사용하도록 만들 수 있습니다.

인수(args)를 사용하여 스토리북을 다시 시작하지 않고도 Controls addon으로 컴포넌트를 실시간으로 수정할 수 있습니다. 인수의 값이 변하면 컴포넌트도 같이 변하게됩니다.

스토리를 만들 때 우리는 기본적으로 task인수를 이용하여 컴포넌트가 예상하는 task의 형태를 구성합니다. 이는 실제 데이터를 모델로 하여 만들어집니다. 다시 말하지만 export로 내보내는 것은 이후 스토리에서 이를 재사용 할 수 있도록 해줍니다.

> Action은 UI 컴포넌트를 독립적으로 만들 때, 컴포넌트와의 상호작용을 확인하는데 도움이 됩니다. 종종 앱의 컨텍스트에서 함수와 상태 값에 접근하지 못할 경우에 action() 필드를 객체 내부에 삽입해주세요

### 구성

스토리북 구성을 변경하여 최근에 생성한 스토리뿐만 아니라 CSS 파일도 사용할 수 있게 해보겠습니다.
`./storybook/main.js`와 `./storybook/preview.js`를 아래와 같이 수정해주세요

```js
// .storybook/main.js

module.exports = {
  //👇 Location of our stories
  stories: ['../src/components/**/*.stories.js'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-create-react-app'],
};
```

```js
// .storybook/preview.js

import '../src/index.css'; //👈 The app's CSS file goes here

//👇 Configures Storybook to log the actions( onArchiveTask and onPinTask ) in the UI.
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
```

parameters는 일반적으로 스토리북의 기능과 애드온의 동작을 제어하기 위해 사용합니다. 지금은 actions(mocked callbacks)이 처리되는 방식을 구성할 것입니다.

actions은 클릭이 됐을때 스토리북 UI의 액션패널에 나타날 콜백을 생성할 수 있도록 해줍니다. 이를 통해 핀 버튼을 만든다면 버튼 클릭이 성공했는지 여부를 테스트 UI에서 확인할 수 있을 것입니다.

위 작업을 끝낸 뒤, 스토리북 서버를 재시작하면 세 가지 task state에 관한 테스트 사례가 생성될 것입니다.

### States 구현하기

지금까지 Storybook 설정, 스타일 가져오기, 테스트 사례를 구성해보았습니다. 이제 디자인에 맞게 컴포넌트의 HTML을 구현하는 작업을 빠르게 시작 할 수 있습니다.

`src/components/Taks.js`를 아래와 같이 수정해줍시다.

```jsx
// src/components/Task.js

import React from 'react';

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input type="checkbox" defaultChecked={state === 'TASK_ARCHIVED'} disabled={true} name="checked" />
        <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
      </label>
      <div className="title">
        <input type="text" value={title} readOnly={true} placeholder="Input title" />
      </div>

      <div className="actions" onClick={event => event.stopPropagation()}>
        {state !== 'TASK_ARCHIVED' && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a onClick={() => onPinTask(id)}>
            <span className={`icon-star`} />
          </a>
        )}
      </div>
    </div>
  );
}
```

### 데이터 요구사항 명시하기

컴포넌트에 필요한 데이터 형태를 명시하려면 리액트에서 propTypes를 활용하는 것이 가장 좋습니다.

```jsx
// src/components/Task.js

import React from 'react';
import PropTypes from 'prop-types';

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  // ...
}

Task.propTypes = {
  /** Composition of the task */
  task: PropTypes.shape({
    /** Id of the task */
    id: PropTypes.string.isRequired,
    /** Title of the task */
    title: PropTypes.string.isRequired,
    /** Current state of the task */
    state: PropTypes.string.isRequired,
  }),
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
};
```

이제 Task 컴포넌트가 잘못 사용된다면 경고가 나타날 것입니다.

> 위 방법은 타입스크립트를 활용해서 구성할 수도 있습니다.

### 완성!

우리는 서버나 프론트엔드 어플리케이션 전체를 실행하지 않고 성공적으로 컴포넌트를 만들어봤습니다. 다음 단계는 이와 유사한 방법으로 Taskbox 컴포넌트의 남은 부분을 하나씩 만드는 것입니다.

우리가 경험했듯이 독립적 환경에서 컴포넌트를 제작하는 것은 쉽고 빠릅니다. 모든 state를 테스트 할 수 있기 때문에 버그가 적고 높은 퀄리티의 UI를 제작할 수 있습니다.

### 테스트 자동화

스토리북은 우리 앱의 UI를 만드는 동안 수동으로 테스트할 수 있는 방법을 제공했습니다. "스토리"는 앱을 개발하는동안 Task 컴포넌트의 외관을 망가뜨리지 않았는지 확인하는 것을 도와줬습니다. 그러나 이는 완전 수동적인 프로세스이기 때문에 각각의 테스트를 일일이 클릭해 오류나 경고 없이 렌더링 되는지 살펴봐야합니다. 이를 자동화 할 수는 없을까요?

#### 스냅샷 테스트

스냅샷 테스트는 주어진 입력에 대해 컴포넌트의 이상적인 출력 값을 입력한 다음, 이후 출력 값이 바뀔 때마다 컴포넌트에 플래그를 지정하는 방식입니다. 이는 새로운 버전의 컴포넌트를 보고 바뀐 부분을 빠르게 확인할 수 있기 때문에 스토리북을 보완해줄 수 있습니다.

> 스냅샷 테스트가 매번 실패하지 않도록 하려면, 컴포넌트에 전달되는 데이터는 매번 변경되지 않는 것으로 해주세요. 특히 날짜나 무작위로 생성된 값 같은 것들에 주의해주세요.

Storyshots addon을 사용하면 각 스토리에 대한 스냅샷이 생성됩니다.

```shell
yarn add -D @storybook/addon-storyshots react-test-renderer
```

위 명령어를 입력한 뒤 `src/storybook.test.js`를 생성한 뒤 아래의 내용을 입력해줍니다.

```js
import initStoryshots from '@storybook/addon-storyshots';
initStoryshots();
```

이제 npm test 명령어를 실행해서 테스트를 진행할 수 있습니다.

> 현재 해당 명령어를 실행하면 에러가 발생하는데 아직 새로운 리액트 버전과 호환이 제대로 이루어지지 않아서 그런 것 같습니다. 차후에 해결되겠지만, 계속 에러가 발생한다면 `package.json`에 "resolutions"필드에 "react-test-renderer": "^18.1.0"를 추가해주도록 합시다. [참고](https://github.com/storybookjs/storybook/issues/17985#)

우리는 Task 스토리를 위한 스냅샷 테스트들을 만들어 보았습니다. 만약 Task의 구성을 변경하게되면, 변경사항을 확인하라는 메세지가 표시될 것입니다.

## 복합적 컴포넌트 조합하기

간단한 컴포넌트로 복합적 컴포넌트를 조합해봅시다.

### Tasklist

Taskbox는 핀으로 고정된 task를 일반 task 위에 배치하여 강조합니다. 따라서 일반 task와 핀으로 고정된 task에 대한 두 가지 유형의 TaskList 스토리를 만들어야 합니다.
![tasklist](https://storybook.js.org/tutorials/intro-to-storybook/tasklist-states-1.png)

Task 데이터는 비동기식으로 전송될 수 있기 때문에, 연결이 없는 상태를 렌더링 할 수 있도록 로딩 state 또한 필요합니다. task가 없는 경우를 위해 비어있는 state도 필요할 것입니다.
![tasklist2](https://storybook.js.org/tutorials/intro-to-storybook/tasklist-states-2.png)

### 설정하기

`src/components/TaskList.js` 와 `src/components/TaskList.stories.js`를 생성해주세요.

```jsx
// src/components/TaskList.js

import React from 'react';

import Task from './Task';

export default function TaskList({ loading, tasks, onPinTask, onArchiveTask }) {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  if (loading) {
    return <div className="list-items">loading</div>;
  }

  if (tasks.length === 0) {
    return <div className="list-items">empty</div>;
  }

  return (
    <div className="list-items">
      {tasks.map(task => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}
```

```jsx
// src/components/TaskList.stories.js

import React from 'react';

import TaskList from './TaskList';
import * as TaskStories from './Task.stories';

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
};

const Template = args => <TaskList {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Shaping the stories through args composition.
  // The data was inherited from the Default story in task.stories.js.
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
  ],
};

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Default story.
  tasks: [...Default.args.tasks.slice(0, 5), { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' }],
};

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Loading story.
  ...Loading.args,
  loading: false,
};
```

> 데코레이터(Decorators)는 스토리에 임의의 래퍼를 제공하는 방법입니다. 위 예시에선 우리는 데코레이터 key를 사용해 export default에서 렌더링 된 컴포넌트에 padding을 추가합니다. 또한 데코레이터는 Providers에서 스토리를 감싸 줄 때 사용될 수 있습니다.

TaskStories를 가져와 간단하게 스토리 속의 args를 합성 할 수 있습니다. (...TaskStories,Default.args.task)

이를 통해 두 컴포넌트가 받을 수 있는 데이터와 액션이 모두 보존됩니다.

### States 구현하기

TaskList는 아직 기본 뼈대만 갖춘 상황입니다. 아래와 같이 코드를 수정하면서 `withPinnedTasks`, `loading`, `empty` 스토리를 구성합니다.

```jsx
import React from 'react';

import Task from './Task';

export default function TaskList({ loading, tasks, onPinTask, onArchiveTask }) {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="list-items">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  const tasksInOrder = [
    ...tasks.filter(t => t.state === 'TASK_PINNED'),
    ...tasks.filter(t => t.state !== 'TASK_PINNED'),
  ];

  return (
    <div className="list-items">
      {tasksInOrder.map(task => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}
```

### 데이터 요구사항 및 props

컴포넌트가 커질 수록 입력에 필요한 데이터 요구사항도 함께 커집니다. `TaskList.js`에 아래와 같이 props의 요구사항을 정의해줍니다.

```js
// src/components/TaskList.js

import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

export default function TaskList() {
  ...
}


TaskList.propTypes = {
  /** Checks if it's in loading state */
  loading: PropTypes.bool,
  /** The list of tasks */
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
};

TaskList.defaultProps = {
  loading: false,
};
```

### 테스트 자동화

TaskList에서는 더 복잡한 구조를 가지고 있기 때문에 특정 입력이 자동화된 테스트에 적합한 방식으로 출력되는지 확인해야합니다. 이를 위해 테스트 렌더러와 함께 Jest를 사용해 단위 테스트를 만들어 보겠습니다.

#### Jest를 사용한 유닛 테스트

스토리북의 스토리, 수동 테스트, 스냅샷 테스트는 UI 버그를 피하는데 큰 도움이 됩니다. 스토리가 광범위한 컴포넌트 사용 사례를 다루고 있으며 사람이 스토리의 변경 사항을 확인하도록 하는 도구를 사용한다면 오류 발생 가능성을 훨씬 줄일 수 있습니다.

그러나, 오류는 세부 사항에 숨어있을 수도 있습니다. 세부 사항을 명확히 하기위해 테스트 프레임워크가 필요합니다.

우리의 경우에는 TaskList가tasks prop에서 전달된 일반 task보다 핀으로 고정된 task를 먼저 렌더링 하기를 원합니다. 이러한 특정 시나리오를 테스트하는 스토리(WithPinnedTasks)가 있다 할지라도, 컴포넌트가 task의 순서를 바르게 정렬하지 않는 버그와 같은 경우 사람이 검토할 때는 판단하기 애매모호할 수 있습니다. 일반적인 시선에는 딱히 “잘못되었어!”라고 보이지 않을 것입니다.

그래서 이러한 문제를 피하기 위하여 Jest를 사용하여 스토리를 DOM에 렌더링 하고 출력 값의 두드러진 특징을 확인하기 위해 DOM 쿼리 코드를 실행할 수 있습니다. 스토리 형식의 좋은 점은 간단히 스토리를 테스트에 가져와 렌더링 할 수 있다는 점입니다!

src/components/TaskList.test.js라는 테스트 파일을 만들어주세요. 여기서 출력 값을 검증하는 테스트를 만들어보겠습니다.

> 한글로 번역된 문서의 예시는 React 18에선 작동하지 않기 때문에, 영문으로 된 문서의 코드를 사용하는 것을 권장합니다.

```shell
yarn add -D @storybook/testing-react
```

위 명령어로 해당 애드온을 설치한 뒤,

```js
// src/components/TaskList.test.js

import { render } from '@testing-library/react';

import { composeStories } from '@storybook/testing-react';

import * as TaskListStories from './TaskList.stories'; //👈  Our stories imported here

//👇 composeStories will process all information related to the component (e.g., args)
const { WithPinnedTasks } = composeStories(TaskListStories);

it('renders pinned tasks at the start of the list', () => {
  const { container } = render(<WithPinnedTasks />);

  expect(container.querySelector('.list-item:nth-child(1) input[value="Task 6 (pinned)"]')).not.toBe(null);
});
```

위 코드를 작성해 테스트를 진행해보겠습니다.

이와 같이 WithPinnedTasks 스토리를 단위 테스트에서 재사용할 수 있습니다. 이러한 방식으로 기존의 자원을 여러가지 방법으로 계속 활용할 수 있습니다.

단위 테스트는 매우 취약할 수 있다는 것도 아셔야 합니다. 프로젝트의 완성도에 따라, Task의 정확한 구현이 변할 수 있습니다. 어쩌면 다른 클래스명을 사용하거나 input 대신 textarea를 사용하여 테스트가 실패하게 되면 업데이트가 필요할 수 있습니다. 이것이 꼭 문제라기보다는 UI에 대한 단위 테스트를 자유롭게 사용하는 것에 주의해야 한다는 지표입니다. 단위 테스트는 유지 관리하기가 쉽지 않습니다. 가능한 경우 수동, 스냅샷, 시각적 회귀 테스트를 사용하세요.

## 데이터 연결하기

지금까지 우리는 독립된 환경에서 상태 값이 없는 컴포넌트들을 만들어 보았습니다. 이 컴포넌트들은 스토리북에는 적합하지만 어플리케이션에 데이터를 제공하기 전까지는 유용하다고 할 수 없습니다.

이번 챕터에서는 컴포넌트에 데이터를 연결하는 일반적인 패턴을 살펴보도록 하겠습니다.

### 컨테이너 컴포넌트

TaskList는 외부와 어떠한 연결도 없기 때문에 **표상적(presentational)**이라고 할 수 있습니다. 데이터를 얻기 위해선 컨테이너가 필요합니다.

이 챕터는 데이터 저장을 위해 가장 널리 사용되는 리액트 라이브러리인 리덕스를 사용해 간단한 데이터 모델을 만듭니다. 여기서 사용된 패턴은 Apollo나 MobX 같은 데이터관리 라이브러리에도 적용됩니다.

프로젝트에 필수 dependency를 다음과 같이 설치해주세요

```shell
yarn add react-redux redux
```

우선 src/lib/store.js를 생성해 task의 state를 변경하는 동작에 대응하는 간단한 리덕스 저장소를 구성해보겠습니다.

```js
// src / lib / store.js;

/* A simple redux store/actions/reducer implementation.
 * A true app would be more complex and separated into different files.
 */
import { configureStore, createSlice } from '@reduxjs/toolkit';

/*
 * The initial state of our store when the app loads.
 * Usually, you would fetch this from a server. Let's not worry about that now
 */
const defaultTasks = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];

const TaskBoxData = {
  tasks: defaultTasks,
  status: 'idle',
  error: null,
};

/*
 * The store is created here.
 * You can read more about Redux Toolkit's slices in the docs:
 * https://redux-toolkit.js.org/api/createSlice
 */
const TasksSlice = createSlice({
  name: 'taskbox',
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (state, action) => {
      const { id, newTaskState } = action.payload;
      const task = state.tasks.findIndex(task => task.id === id);
      if (task >= 0) {
        state.tasks[task].state = newTaskState;
      }
    },
  },
});

// The actions contained in the slice are exported for usage in our components
export const { updateTaskState } = TasksSlice.actions;

/*
 * Our app's store configuration goes here.
 * Read more about Redux's configureStore in the docs:
 * https://redux-toolkit.js.org/api/configureStore
 */
const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer,
  },
});

export default store;
```

그런 다음 TaskList 컴포넌트를 redux store에 연결하고 task를 렌더링합니다.

```js
// src / components / TaskList.js;

import React from 'react';
import Task from './Task';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskState } from '../lib/store';

export default function TaskList() {
  // We're retrieving our state from the store
  const tasks = useSelector(state => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter(t => t.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter(t => t.state !== 'TASK_PINNED'),
    ];
    const filteredTasks = tasksInOrder.filter(t => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED');
    return filteredTasks;
  });

  const { status } = useSelector(state => state.taskbox);

  const dispatch = useDispatch();

  const pinTask = value => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_PINNED' }));
  };
  const archiveTask = value => {
    // We're dispatching the Archive event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_ARCHIVED' }));
  };
  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );
  if (status === 'loading') {
    return (
      <div className="list-items" data-testid="loading" key={'loading'}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="list-items" key={'empty'} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items" data-testid="success" key={'success'}>
      {tasks.map(task => (
        <Task key={task.id} task={task} onPinTask={task => pinTask(task)} onArchiveTask={task => archiveTask(task)} />
      ))}
    </div>
  );
}
```

이제 리덕스에서 받은 실제 데이터로 생성된 컴포넌트가 있기 때문에, `src/app.js`에 연결하여 컴포넌트를 렌더링 할 수 있습니다만, 지금은 컴포넌트 중심으로 프로젝트를 진행하겠습니다.

### 데코레이터로 컨택스트 제공하기

우리 스토리북의 스토리는 TaskList가 리덕스 스토어에 연결됐기 때문에 더 이상 작동하지 않게 됐습니다.

우리는 이 문제를 해결하기위해 다양한 접근방법이 있습니다. 여전히 우리의 어플리캐이션은
아주 직선적이기 때문에 우리는 데코레이터를 이용할 수 있습니다. 이것은 지난 챕터에 우리가 했던것과 비슷하며 우리 스로리북의 스토리에 mocked store를 제공할 것 입니다.

```js
import React from 'react';

import TaskList from './TaskList';
import * as TaskStories from './Task.stories';

import { Provider } from 'react-redux';

import { configureStore, createSlice } from '@reduxjs/toolkit';

// A super-simple mock of the state of the store
export const MockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
  ],
  status: 'idle',
  error: null,
};

// A super-simple mock of a redux store
const Mockstore = ({ taskboxState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: 'taskbox',
          initialState: taskboxState,
          reducers: {
            updateTaskState: (state, action) => {
              const { id, newTaskState } = action.payload;
              const task = state.tasks.findIndex(task => task.id === id);
              if (task >= 0) {
                state.tasks[task].state = newTaskState;
              }
            },
          },
        }).reducer,
      },
    })}>
    {children}
  </Provider>
);

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
  excludeStories: /.*MockedState$/,
};

const Template = () => <TaskList />;

export const Default = Template.bind({});
Default.decorators = [story => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>];

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.decorators = [
  story => {
    const pinnedtasks = [...MockedState.tasks.slice(0, 5), { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' }];

    return (
      <Mockstore
        taskboxState={{
          ...MockedState,
          tasks: pinnedtasks,
        }}>
        {story()}
      </Mockstore>
    );
  },
];

export const Loading = Template.bind({});
Loading.decorators = [
  story => (
    <Mockstore
      taskboxState={{
        ...MockedState,
        status: 'loading',
      }}>
      {story()}
    </Mockstore>
  ),
];

export const Empty = Template.bind({});
Empty.decorators = [
  story => (
    <Mockstore
      taskboxState={{
        ...MockedState,
        tasks: [],
      }}>
      {story()}
    </Mockstore>
  ),
];
```

> excludeStories는 임의로 생성한 상태가 스토리로 취급되는 것을 막아주는 스토리북 구성 필드입니다. 더 자세한 내용은 [이 곳](https://storybook.js.org/docs/react/api/csf)에서 참고하시기 바랍니다.

> 이 변화로, 이전에 작성한 모든 테스트들은 업데이트가 필요합니다. -u 플래그를 이용해 테스트 명령어를 재실행시켜 업데이트 시켜줍시다. 물론 git에 커밋하는 것도 잊지마세요!
