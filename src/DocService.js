let isTopicArraryReady = false;
let topics = [];
let doc = {};
let isDocReady = false;

function fetchDoc(callback) {
  try {
    if(!isDocReady) {
      let prefix = process.env.PUBLIC_URL;
      let url = (prefix !== "") ? prefix : "";
      url += "/assets/docs.json";
      fetch(url)
        .then( response => response.json())
        .then( json => {
            doc = json;
            isDocReady = true;
            if(callback) {callback()}
            return;
          }
        );
    } else {
      if(callback) {callback()}
    }

  } catch(err) {
    console.log(err);
  }
}

function getAllTopics() {
  for (let i = 0; i < doc.sections.length; i++) {
    let section = doc.sections[i];
    for (let j = 0; j < section.topics.length; j++) {
      let topicObj = section.topics[j];
      topics[topicObj.id] = topicObj;
    }
  }
}

const DocService = {
  init:function(callback) {
    fetchDoc(callback);
  },
  getHeader: function() {
    return doc.header;
  },
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