import React, { Component } from 'react';
import DocService from '../DocService.js'

class Topic extends Component {

  constructor(props) {
    super();
    this.topicID = props.match.params.topic;
    let topic = DocService.getTopic(this.topicID);
    this.topicComp = topic;
    this.topicName = topic.name;  
  }
  
  getItemContent(itemId, url) {
    fetch(url)
    .then(resp => resp.text())
    .then(function(html){
      let obj = document.getElementById(itemId);
      obj.innerHTML = html;
      let scripts = obj.getElementsByTagName("script");
      for (let i=0; i<scripts.length; i++) {
        let tag = scripts[i];
        if(!tag.src){
          var script = document.createElement('script');
          let text = scripts[i].textContent;
          script.appendChild( document.createTextNode( text ) );
          document.getElementsByTagName('head')[0].appendChild(script);
        }
      }
    })
  }
  
  getItems() {
    function getItemKey(itemURL) {
      let itemKey = itemURL;
      itemKey = itemKey.substring(itemKey.lastIndexOf("/")+1, itemKey.lastIndexOf("."));
      return itemKey;
    }
    let s = [];
    let len = this.topicComp.items.length;
    let prefix = process.env.PUBLIC_URL;

    for (let i=0; i<len; i++) {
      let item = this.topicComp.items[i];
      let title = item.title;
      let url = (prefix !== "") ? prefix : "";
      url += "/" + item.url;
      let id = this.topicID + i;
      let itemId = getItemKey(item.url); 
      s.push(
        <div className="cc-section cc-panel" key={id} id={itemId}>
          <h2 className="cc-h cc-panel-header">
            <a href={"#" + itemId } className="cc-block">{title}</a>
          </h2>
          <div className="cc-panel-body" id={id}>
            {this.getItemContent(id,url)}
          </div>
        </div>
      )
    }
    return s;
  }

  render() {
    return (
      <div className="cc-section">
        <div className="cc-h-area">
          <h1 className="cc-h">{ this.topicName }</h1>
        </div>
        {this.getItems()}
      </div>
    )
  }
}

export default Topic;