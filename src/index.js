import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './index.css';
import DocService from './DocService.js'
import Dashboard from './components/Dashboard';
import Topic from './components/Topic';


class Index extends React.Component {

  state = {
    header: ""
  }

  setHeader = () => {
    let header = DocService.getHeader();
    this.setState({
      "header": header
    });
  }

  constructor(props) {
    super(props);
    DocService.init( () => {
        this.setHeader();
      }
    );
  }

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <>
        <div className="cc-h-area cc-nav">
          <div className="container cc-padding">
            <h1 className="cc-h cc-inline">
              <Link to="/">{this.state.header}</Link>
            </h1>
          </div>
        </div>
        <div className="cc-body">
          <div className="container" id="container">
            {
              this.state.header === "" ? ( 
                <div/> 
              ) : (
                <Switch>
                  <Route exact path="/" component={Dashboard}/>
                  <Route path="/topic/:topic" component={Topic}/>
                </Switch>
              )
            }
          </div>
        </div>
        </>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));