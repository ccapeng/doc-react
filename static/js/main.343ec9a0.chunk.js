(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,_){"use strict";var c=!1,a=[],n={},r=!1;var o={init:function(e){console.log("DocService.init()"),function(e){try{if(console.log("isDocReady:"+r),r)e&&e();else{var t="/doc-react";t+="/assets/docs.json",console.log("url:"+t),fetch(t).then(function(e){return e.json()}).then(function(t){n=t,r=!0,e&&e()})}}catch(_){console.log(_)}}(e)},getHeader:function(){return n.header},getDoc:function(){return n},getSections:function(){return n.sections},getTopic:function(e){return c||(!function(){for(var e=0;e<n.sections.length;e++)for(var t=n.sections[e],_=0;_<t.topics.length;_++){var c=t.topics[_];a[c.id]=c}}(),c=!0),a[e]}};t.a=o},15:function(module,__webpack_exports__,__webpack_require__){"use strict";var D_dvp_react_doc_react_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(5),D_dvp_react_doc_react_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(6),D_dvp_react_doc_react_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(8),D_dvp_react_doc_react_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(7),D_dvp_react_doc_react_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(9),react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__),_DocService_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(10),Topic=function(_Component){function Topic(e){var t;return Object(D_dvp_react_doc_react_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__.a)(this,Topic),(t=Object(D_dvp_react_doc_react_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__.a)(this,Object(D_dvp_react_doc_react_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__.a)(Topic).call(this))).topicID=e.match.params.topic,_DocService_js__WEBPACK_IMPORTED_MODULE_6__.a.init(function(){var e=_DocService_js__WEBPACK_IMPORTED_MODULE_6__.a.getTopic(t.topicID);t.topicComp=e,t.topicName=e.name}),t}return Object(D_dvp_react_doc_react_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__.a)(Topic,_Component),Object(D_dvp_react_doc_react_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__.a)(Topic,[{key:"getItemContent",value:function getItemContent(itemId,url){fetch(url).then(function(e){return e.text()}).then(function(html){var obj=document.getElementById(itemId);obj.innerHTML=html;for(var scripts=obj.getElementsByTagName("script"),i=0;i<scripts.length;i++){var s=scripts[i].textContent;eval(s)}})}},{key:"getItems",value:function(){function e(e){var t=e;return t=t.substring(t.lastIndexOf("/")+1,t.lastIndexOf("."))}for(var t=[],_=this.topicComp.items.length,c=0;c<_;c++){var a=this.topicComp.items[c],n=a.title,r="/doc-react";r+="/"+a.url,console.log(r);var o=this.topicID+c,i=e(a.url);t.push(react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div",{className:"cc-section cc-panel",key:o,id:i},react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h2",{className:"cc-h cc-panel-header"},react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a",{href:"#"+i,className:"cc-block"},n)),react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div",{className:"cc-panel-body",id:o},this.getItemContent(o,r))))}return t}},{key:"render",value:function(){return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div",{className:"cc-section"},react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div",{className:"cc-h-area"},react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h1",{className:"cc-h"},this.topicName)),this.getItems())}}]),Topic}(react__WEBPACK_IMPORTED_MODULE_5__.Component);__webpack_exports__.a=Topic},18:function(e,t,_){e.exports=_(28)},27:function(e,t,_){},28:function(e,t,_){"use strict";_.r(t);var c=_(5),a=_(6),n=_(8),r=_(7),o=_(9),i=_(0),s=_.n(i),l=_(14),u=_.n(l),m=_(30),d=_(32),E=_(31),p=_(29),h=_(10),O=function(e){function t(){return Object(c.a)(this,t),Object(n.a)(this,Object(r.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(a.a)(t,[{key:"createSectionList",value:function(e,t){var _=this;return s.a.createElement("section",{key:"sec"+t},s.a.createElement("h2",{className:"cc-h"},e.subheader),s.a.createElement("div",{className:"cc-section-panel cc-panel cc-panel-body cc-panel-border"},s.a.createElement("div",{className:"cc-indent-lg"},s.a.createElement("ul",{className:"cc-list row cc-flex-list"},e.topics.map(function(e,t){return _.createTopicList(e)})))))}},{key:"createTopicList",value:function(e){if(e.name)return s.a.createElement("li",{key:e.id,className:"col-md-3 col-sm-12"},s.a.createElement(p.a,{to:"topic/".concat(e.id)},e.name))}},{key:"render",value:function(){var e=this,t=h.a.getSections();return s.a.createElement("div",null,t.map(function(t,_){return e.createSectionList(t,_)}))}}]),t}(i.Component),D=_(15),b=function(e){function t(){return Object(c.a)(this,t),Object(n.a)(this,Object(r.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(a.a)(t,[{key:"render",value:function(){return console.log("prefix:/doc-react"),s.a.createElement("main",null,s.a.createElement(m.a,null,s.a.createElement(d.a,null,s.a.createElement(E.a,{exact:!0,path:"".concat("/doc-react","/"),component:O}),s.a.createElement(E.a,{path:"".concat("/doc-react","/topic/:topic"),component:D.a}))))}}]),t}(i.Component),f=(_(27),function(e){function t(e){var _;return Object(c.a)(this,t),(_=Object(n.a)(this,Object(r.a)(t).call(this,e))).state={header:""},_.setHeader=function(){var e=h.a.getHeader();console.log("header:"+e),_.setState({header:e})},h.a.init(function(){_.setHeader()}),_}return Object(o.a)(t,e),Object(a.a)(t,[{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"cc-h-area cc-nav"},s.a.createElement("div",{className:"container cc-padding"},s.a.createElement("h1",{className:"cc-h cc-inline"},s.a.createElement("a",{href:"/"},this.state.header)))),s.a.createElement("div",{className:"cc-body"},s.a.createElement("div",{className:"container",id:"container"},""===this.state.header?s.a.createElement("div",null):s.a.createElement(b,{doc:this.state.doc}))))}}]),t}(s.a.Component));u.a.render(s.a.createElement(f,null),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.343ec9a0.chunk.js.map