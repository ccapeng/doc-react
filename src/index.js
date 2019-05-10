import React from 'react';
import ReactDOM from 'react-dom';

import Main from './components/Main';
import './index.css';

ReactDOM.render((
    <>
      <div className="cc-h-area cc-nav">
        <div className="container cc-padding">
          <h1 className="cc-h cc-inline">
            <a href="/">tccui</a>
          </h1>
        </div>
      </div>
      <div className="cc-body">
        <div className="container" id="container">
          <Main></Main>
        </div>
      </div>
    </>
), document.getElementById('root'));
