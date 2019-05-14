import React from 'react';
import { Link } from 'react-router-dom';

const SectionList = (props) => {
  const {section, index} = props;
  return (
    <section key={"sec" + index}>
      <h2 className="cc-h">{section.subheader}</h2>
      <div className="cc-section-panel cc-panel cc-panel-body cc-panel-border">
        <div className="cc-indent-lg">
          <ul className="cc-list row cc-flex-list">
            {
              section.topics.map((obj,i) => (
                <TopicList key={"topiclist" + i} topic={obj} /> 
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  );
  
}

const TopicList = (props)=> {
  const {topic} = props;
  if (!topic.name) {
    return "";
  }
  return (
    <li key={topic.id} className="col-md-3 col-sm-12">
      <Link to={{
        pathname:`topic/${topic.id}`,
        state:{topic}
      }}>
        {topic.name}
      </Link>
    </li>
  );
}

const Dashboard = (props) => {
  const {sections} = props;
  if (typeof(sections) == "undefined") {
    return <div></div>
  } else {
    return (
      <div> {sections.map((section,i) =>
            <SectionList key={"sectionlist" + i} section={section} index={i} />
          )}
      </div>
    );
  }

}

export default Dashboard;