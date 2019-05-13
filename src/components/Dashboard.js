import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DocService from '../DocService.js';

class Dashboard extends Component {

  createSectionList(section, index){

    return (
      <section key={"sec" + index}>
        <h2 className="cc-h">{section.subheader}</h2>
        <div className="cc-section-panel cc-panel cc-panel-body cc-panel-border">
          <div className="cc-indent-lg">
            <ul className="cc-list row cc-flex-list">
              {section.topics.map((obj,i) => this.createTopicList(obj))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  createTopicList(topic){
    if (!topic.name) {
      return;
    }
    return (
      <li key={topic.id} className="col-md-3 col-sm-12">
        <Link to={`topic/${topic.id}`}>
          {topic.name}
        </Link>
      </li>
    );
  }

  render() {
    let sections = DocService.getSections();
    return (
      <div>
        {sections.map((obj,i) => this.createSectionList(obj, i))}
      </div>
    );
  }

}

export default Dashboard;