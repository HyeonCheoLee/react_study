import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));  //root는 public > index.html >> <div id="root"></div>

//root에 App를 렌더링한다.(뿌려준다)
root.render(
  //Strict 모드(자식 컴포넌트들에 대한 부가적인 검사와 경고를 활성화합니다.)
  <React.StrictMode>  
    <App />
  </React.StrictMode>
);  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
