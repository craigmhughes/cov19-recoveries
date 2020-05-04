(this.webpackJsonpheart=this.webpackJsonpheart||[]).push([[0],{42:function(e,t,a){e.exports=a(71)},46:function(e,t,a){},48:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(18),s=a.n(c),o=(a(46),a(14)),i=a(10),u=a.n(i),l=a(17),p=a(4),d=a(41),h=(a(48),a(2)),m=a(15),f=a(27),b=a(36),g=function(e){var t=e.url,a=e.color,c=Object(n.useState)(),s=Object(p.a)(c,2),o=s[0],i=s[1];new h.MeshPhongMaterial({color:a});return Object(n.useMemo)((function(){return(new b.a).load(t,(function(e){e.traverse((function(e){e.isMesh&&(e.material=new h.MeshPhongMaterial({color:a})),e instanceof h.Mesh&&(e.castShadow=!0)})),i(e)}))}),[t,a]),o?r.a.createElement("primitive",{object:o}):null},v=function(){var e=Object(m.e)(),t=e.camera;return t.position.z=2.5,t.position.y=0,e.gl.setSize(window.innerWidth,window.innerHeight),null};function w(e){var t=e.rate,a=e.nhs,c=Object(n.useState)(!0),s=Object(p.a)(c,2),o=s[0],i=s[1],u=Object(f.b)({scale:t?o?[.1,.1,.1]:[.12,.12,.12]:[0,0,0],rotation:[4.8,0,0],position:[0,t?-.25:-1,-2],config:{mass:2,tension:25,friction:12,clamp:!0}});return Object(n.useEffect)((function(){var e=Number((86400/t*1e3).toString().split(".")[0].substr(0,6));if(!isNaN(e)){var a=setInterval((function(){i(!o)}),e);return function(){return clearInterval(a)}}}),[o,t]),r.a.createElement(m.a,{onCreated:function(e){var t=e.gl;return t.shadowMap.enabled=!0,t.shadowMap.type=h.PCFSoftShadowMap},className:"Canvas"},r.a.createElement(v,null),r.a.createElement("ambientLight",{intensity:.5}),r.a.createElement("spotLight",{intensity:.85,position:[20,5,10],angle:.2,penumbra:1,castShadow:!0}),r.a.createElement(f.a.mesh,u,r.a.createElement(g,{attach:"geometry",url:"heart.obj",color:a?"blue":"red"})))}navigator.serviceWorker&&navigator.serviceWorker.register("./sw.js");var E=function(){var e=a(53).default,t=Object(n.useState)(4===(new Date).getDay()&&20===(new Date).getHours()),c=Object(p.a)(t,2),s=c[0],i=(c[1],Object(n.useState)({id:0,Cases:0,Date:0})),h=Object(p.a)(i,2),m=h[0],f=h[1];function b(){return(b=Object(l.a)(u.a.mark((function e(){var t,a,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v();case 2:return t=e.sent,a={},e.next=6,t.getAll("cases").then((function(e){a=e[0]})).catch((function(e){}));case 6:if(n=localStorage.getItem("lastChecked"),void 0!==a&&null!==n){e.next=11;break}g(t),e.next=19;break;case 11:if(new Date(Number(n)).getDate()===new Date(Date.now()).getDate()){e.next=18;break}return e.next=14,v();case 14:e.sent.delete("cases",0),g(t),e.next=19;break;case 18:f(a);case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(t){console.log("new data"),e.get("https://api.covid19api.com/live/country/united-kingdom/status/recovered").then(function(){var e=Object(l.a)(u.a.mark((function e(a){var n,r,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n={id:0,Cases:(n=a.data[a.data.length-1]).Recovered,Date:new Date(n.Date)},r=a.data.length;r>0;r--)c=a.data[r-1],n.Cases+=c.Recovered;t.add("cases",n).catch((function(){})),localStorage.setItem("lastChecked",JSON.stringify(Date.now())),f(n);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return console.error(e)}))}function v(){return E.apply(this,arguments)}function E(){return(E=Object(l.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("indexedDB"in window){e.next=3;break}return console.log("This browser doesn't support IndexedDB"),e.abrupt("return",!1);case 3:return t=["cases"],e.next=6,Object(d.a)("Heart",1,{upgrade:function(e){var a,n=Object(o.a)(t);try{for(n.s();!(a=n.n()).done;){var r=a.value;e.createObjectStore(r,{keyPath:"id",autoIncrement:!0}).createIndex("id","id")}}catch(c){n.e(c)}finally{n.f()}}});case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){v(),function(){b.apply(this,arguments)}()}),[]),r.a.createElement("main",{className:"App"},r.a.createElement(w,{rate:m.Cases,nhs:s}),s?r.a.createElement("section",{className:"update"},r.a.createElement("p",{className:"update__cases"},"Thank you"),r.a.createElement("p",{className:"update__subtitle"},m.Cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")," Recovered UK cases (COVID-19)"),r.a.createElement("p",{className:"update__source"},"Source ",r.a.createElement("a",{href:"https://github.com/CSSEGISandData/COVID-19"},"Johns Hopkins CSSE")),r.a.createElement("p",{className:"update__author"},r.a.createElement("a",{href:"https://www.justgiving.com/associationofnhscharities"},"#ClapForOurCarers"))):r.a.createElement("section",{className:"update"},r.a.createElement("p",{className:"update__cases"},m.Cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")),r.a.createElement("p",{className:"update__subtitle"},"Recovered UK cases (COVID-19)"),r.a.createElement("p",{className:"update__source"},"Source ",r.a.createElement("a",{href:"https://github.com/CSSEGISandData/COVID-19"},"Johns Hopkins CSSE")),r.a.createElement("p",{className:"update__author"},"Made by: ",r.a.createElement("a",{href:"https://github.com/craigmhughes"},"Craig Hughes"))))};s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.b73a0882.chunk.js.map