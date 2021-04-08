import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//redux에서 제공하는 Provider를 이용해서 연결
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
//미들웨어를 이용해서 promise랑 function도 받을수있다.
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';//promise
import ReduxThunk from 'redux-thunk';//function
//reducer 가져오기 index.js 라고 경로를 안넣어도 알아서 찾아서 해준다.
import Reducer from './_reducers';

//미들웨어에 위에 선언한거 넣기
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <React.StrictMode>
    {/* redux랑 어플리케이션을 연결 */}
    <Provider store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
