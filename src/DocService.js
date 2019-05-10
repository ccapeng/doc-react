import doc from './docs.json';

function getAllTopics() {
  for (let i = 0; i < doc.sections.length; i++) {
    let section = doc.sections[i];
    for (let j = 0; j < section.topics.length; j++) {
      let topicObj = section.topics[j];
      topics[topicObj.id] = topicObj;
    }
  }
}

var isTopicArraryReady = false;
var topics = [];

const DocService = {
  getDoc: function() {
    return doc;
  },
  getSections: function() {
    return doc.sections;
  },
  getTopic: function(topicId) {
    let topic = {};
    if (!isTopicArraryReady) {
      getAllTopics();
      isTopicArraryReady = true;
    }
    topic = topics[topicId];
    return topic;
  }
}

export default DocService;