(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const F_="modulepreload",j_=function(r){return"/"+r},ed={},Ce=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),c=o?.nonce||o?.getAttribute("nonce");i=Promise.allSettled(t.map(l=>{if(l=j_(l),l in ed)return;ed[l]=!0;const u=l.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${p}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":F_,u||(f.as="script"),f.crossOrigin="",f.href=l,c&&f.setAttribute("nonce",c),document.head.appendChild(f),u)return new Promise((g,I)=>{f.addEventListener("load",g),f.addEventListener("error",()=>I(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return i.then(o=>{for(const c of o||[])c.status==="rejected"&&s(c.reason);return e().catch(s)})};var td={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xh=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let i=r.charCodeAt(n);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(i=65536+((i&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},U_=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const i=r[t++];if(i<128)e[n++]=String.fromCharCode(i);else if(i>191&&i<224){const s=r[t++];e[n++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=r[t++],o=r[t++],c=r[t++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(l>>10)),e[n++]=String.fromCharCode(56320+(l&1023))}else{const s=r[t++],o=r[t++];e[n++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Zh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let i=0;i<r.length;i+=3){const s=r[i],o=i+1<r.length,c=o?r[i+1]:0,l=i+2<r.length,u=l?r[i+2]:0,p=s>>2,f=(s&3)<<4|c>>4;let g=(c&15)<<2|u>>6,I=u&63;l||(I=64,o||(g=64)),n.push(t[p],t[f],t[g],t[I])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Xh(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):U_(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let i=0;i<r.length;){const s=t[r.charAt(i++)],c=i<r.length?t[r.charAt(i)]:0;++i;const u=i<r.length?t[r.charAt(i)]:64;++i;const f=i<r.length?t[r.charAt(i)]:64;if(++i,s==null||c==null||u==null||f==null)throw new B_;const g=s<<2|c>>4;if(n.push(g),u!==64){const I=c<<4&240|u>>2;if(n.push(I),f!==64){const D=u<<6&192|f;n.push(D)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class B_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const q_=function(r){const e=Xh(r);return Zh.encodeByteArray(e,!0)},ao=function(r){return q_(r).replace(/\./g,"")},ep=function(r){try{return Zh.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $_(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z_=()=>$_().__FIREBASE_DEFAULTS__,G_=()=>{if(typeof process>"u"||typeof td>"u")return;const r=td.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},K_=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&ep(r[1]);return e&&JSON.parse(e)},Co=()=>{try{return z_()||G_()||K_()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},tp=r=>{var e,t;return(t=(e=Co())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[r]},np=r=>{const e=tp(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},rp=()=>{var r;return(r=Co())===null||r===void 0?void 0:r.config},ip=r=>{var e;return(e=Co())===null||e===void 0?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H_{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W_(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",i=r.iat||0,s=r.sub||r.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},r);return[ao(JSON.stringify(t)),ao(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Q_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ae())}function J_(){var r;const e=(r=Co())===null||r===void 0?void 0:r.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Y_(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function X_(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function Z_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ey(){const r=Ae();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function sp(){return!J_()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function op(){try{return typeof indexedDB=="object"}catch{return!1}}function ty(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ny="FirebaseError";class kt extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=ny,Object.setPrototypeOf(this,kt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,es.prototype.create)}}class es{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?ry(s,n):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new kt(i,c,n)}}function ry(r,e){return r.replace(iy,(t,n)=>{const i=e[n];return i!=null?String(i):`<${n}?>`})}const iy=/\{\$([^}]+)}/g;function sy(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function nn(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const i of t){if(!n.includes(i))return!1;const s=r[i],o=e[i];if(nd(s)&&nd(o)){if(!nn(s,o))return!1}else if(s!==o)return!1}for(const i of n)if(!t.includes(i))return!1;return!0}function nd(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vr(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Ei(r){const e={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[i,s]=n.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function bi(r){const e=r.indexOf("?");if(!e)return"";const t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}function oy(r,e){const t=new ay(r,e);return t.subscribe.bind(t)}class ay{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let i;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");cy(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:n},i.next===void 0&&(i.next=Na),i.error===void 0&&(i.error=Na),i.complete===void 0&&(i.complete=Na);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function cy(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function Na(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(r){return r&&r._delegate?r._delegate:r}class rn{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ly{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new H_;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&n.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(dy(e))try{this.getOrInitializeService({instanceIdentifier:Rn})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});n.resolve(s)}catch{}}}}clearInstance(e=Rn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Rn){return this.instances.has(e)}getOptions(e=Rn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[s,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);n===c&&o.resolve(i)}return i}onInit(e,t){var n;const i=this.normalizeInstanceIdentifier(t),s=(n=this.onInitCallbacks.get(i))!==null&&n!==void 0?n:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const i of n)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:uy(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Rn){return this.component?this.component.multipleInstances?e:Rn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function uy(r){return r===Rn?void 0:r}function dy(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hy{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new ly(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Y;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(Y||(Y={}));const py={debug:Y.DEBUG,verbose:Y.VERBOSE,info:Y.INFO,warn:Y.WARN,error:Y.ERROR,silent:Y.SILENT},fy=Y.INFO,my={[Y.DEBUG]:"log",[Y.VERBOSE]:"log",[Y.INFO]:"info",[Y.WARN]:"warn",[Y.ERROR]:"error"},gy=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),i=my[e];if(i)console[i](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Cc{constructor(e){this.name=e,this._logLevel=fy,this._logHandler=gy,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?py[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Y.DEBUG,...e),this._logHandler(this,Y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Y.VERBOSE,...e),this._logHandler(this,Y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Y.INFO,...e),this._logHandler(this,Y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Y.WARN,...e),this._logHandler(this,Y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Y.ERROR,...e),this._logHandler(this,Y.ERROR,...e)}}const _y=(r,e)=>e.some(t=>r instanceof t);let rd,id;function yy(){return rd||(rd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function vy(){return id||(id=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ap=new WeakMap,Xa=new WeakMap,cp=new WeakMap,Va=new WeakMap,Dc=new WeakMap;function Iy(r){const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("success",s),r.removeEventListener("error",o)},s=()=>{t(Yt(r.result)),i()},o=()=>{n(r.error),i()};r.addEventListener("success",s),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&ap.set(t,r)}).catch(()=>{}),Dc.set(e,r),e}function Ey(r){if(Xa.has(r))return;const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("complete",s),r.removeEventListener("error",o),r.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),i()};r.addEventListener("complete",s),r.addEventListener("error",o),r.addEventListener("abort",o)});Xa.set(r,e)}let Za={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return Xa.get(r);if(e==="objectStoreNames")return r.objectStoreNames||cp.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Yt(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function by(r){Za=r(Za)}function Ty(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(Oa(this),e,...t);return cp.set(n,e.sort?e.sort():[e]),Yt(n)}:vy().includes(r)?function(...e){return r.apply(Oa(this),e),Yt(ap.get(this))}:function(...e){return Yt(r.apply(Oa(this),e))}}function wy(r){return typeof r=="function"?Ty(r):(r instanceof IDBTransaction&&Ey(r),_y(r,yy())?new Proxy(r,Za):r)}function Yt(r){if(r instanceof IDBRequest)return Iy(r);if(Va.has(r))return Va.get(r);const e=wy(r);return e!==r&&(Va.set(r,e),Dc.set(e,r)),e}const Oa=r=>Dc.get(r);function Ay(r,e,{blocked:t,upgrade:n,blocking:i,terminated:s}={}){const o=indexedDB.open(r,e),c=Yt(o);return n&&o.addEventListener("upgradeneeded",l=>{n(Yt(o.result),l.oldVersion,l.newVersion,Yt(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",u=>i(u.oldVersion,u.newVersion,u))}).catch(()=>{}),c}const Py=["get","getKey","getAll","getAllKeys","count"],Ry=["put","add","delete","clear"],La=new Map;function sd(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(La.get(e))return La.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,i=Ry.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(i||Py.includes(t)))return;const s=async function(o,...c){const l=this.transaction(o,i?"readwrite":"readonly");let u=l.store;return n&&(u=u.index(c.shift())),(await Promise.all([u[t](...c),i&&l.done]))[0]};return La.set(e,s),s}by(r=>({...r,get:(e,t,n)=>sd(e,t)||r.get(e,t,n),has:(e,t)=>!!sd(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sy{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Cy(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function Cy(r){const e=r.getComponent();return e?.type==="VERSION"}const ec="@firebase/app",od="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pt=new Cc("@firebase/app"),Dy="@firebase/app-compat",ky="@firebase/analytics-compat",xy="@firebase/analytics",Ny="@firebase/app-check-compat",Vy="@firebase/app-check",Oy="@firebase/auth",Ly="@firebase/auth-compat",My="@firebase/database",Fy="@firebase/data-connect",jy="@firebase/database-compat",Uy="@firebase/functions",By="@firebase/functions-compat",qy="@firebase/installations",$y="@firebase/installations-compat",zy="@firebase/messaging",Gy="@firebase/messaging-compat",Ky="@firebase/performance",Hy="@firebase/performance-compat",Wy="@firebase/remote-config",Qy="@firebase/remote-config-compat",Jy="@firebase/storage",Yy="@firebase/storage-compat",Xy="@firebase/firestore",Zy="@firebase/vertexai-preview",ev="@firebase/firestore-compat",tv="firebase",nv="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const co="[DEFAULT]",rv={[ec]:"fire-core",[Dy]:"fire-core-compat",[xy]:"fire-analytics",[ky]:"fire-analytics-compat",[Vy]:"fire-app-check",[Ny]:"fire-app-check-compat",[Oy]:"fire-auth",[Ly]:"fire-auth-compat",[My]:"fire-rtdb",[Fy]:"fire-data-connect",[jy]:"fire-rtdb-compat",[Uy]:"fire-fn",[By]:"fire-fn-compat",[qy]:"fire-iid",[$y]:"fire-iid-compat",[zy]:"fire-fcm",[Gy]:"fire-fcm-compat",[Ky]:"fire-perf",[Hy]:"fire-perf-compat",[Wy]:"fire-rc",[Qy]:"fire-rc-compat",[Jy]:"fire-gcs",[Yy]:"fire-gcs-compat",[Xy]:"fire-fst",[ev]:"fire-fst-compat",[Zy]:"fire-vertex","fire-js":"fire-js",[tv]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lo=new Map,iv=new Map,tc=new Map;function ad(r,e){try{r.container.addComponent(e)}catch(t){Pt.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function Fn(r){const e=r.name;if(tc.has(e))return Pt.debug(`There were multiple attempts to register component ${e}.`),!1;tc.set(e,r);for(const t of lo.values())ad(t,r);for(const t of iv.values())ad(t,r);return!0}function Or(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function sv(r,e,t=co){Or(r,e).clearInstance(t)}function Ee(r){return r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ov={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Xt=new es("app","Firebase",ov);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class av{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new rn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Xt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lr=nv;function lp(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n=Object.assign({name:co,automaticDataCollectionEnabled:!1},e),i=n.name;if(typeof i!="string"||!i)throw Xt.create("bad-app-name",{appName:String(i)});if(t||(t=rp()),!t)throw Xt.create("no-options");const s=lo.get(i);if(s){if(nn(t,s.options)&&nn(n,s.config))return s;throw Xt.create("duplicate-app",{appName:i})}const o=new hy(i);for(const l of tc.values())o.addComponent(l);const c=new av(t,n,o);return lo.set(i,c),c}function kc(r=co){const e=lo.get(r);if(!e&&r===co&&rp())return lp();if(!e)throw Xt.create("no-app",{appName:r});return e}function lt(r,e,t){var n;let i=(n=rv[r])!==null&&n!==void 0?n:r;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Pt.warn(c.join(" "));return}Fn(new rn(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cv="firebase-heartbeat-database",lv=1,Mi="firebase-heartbeat-store";let Ma=null;function up(){return Ma||(Ma=Ay(cv,lv,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(Mi)}catch(t){console.warn(t)}}}}).catch(r=>{throw Xt.create("idb-open",{originalErrorMessage:r.message})})),Ma}async function uv(r){try{const t=(await up()).transaction(Mi),n=await t.objectStore(Mi).get(dp(r));return await t.done,n}catch(e){if(e instanceof kt)Pt.warn(e.message);else{const t=Xt.create("idb-get",{originalErrorMessage:e?.message});Pt.warn(t.message)}}}async function cd(r,e){try{const n=(await up()).transaction(Mi,"readwrite");await n.objectStore(Mi).put(e,dp(r)),await n.done}catch(t){if(t instanceof kt)Pt.warn(t.message);else{const n=Xt.create("idb-set",{originalErrorMessage:t?.message});Pt.warn(n.message)}}}function dp(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dv=1024,hv=30*24*60*60*1e3;class pv{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new mv(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=ld();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const c=new Date(o.date).valueOf();return Date.now()-c<=hv}),this._storage.overwrite(this._heartbeatsCache))}catch(n){Pt.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ld(),{heartbeatsToSend:n,unsentEntries:i}=fv(this._heartbeatsCache.heartbeats),s=ao(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Pt.warn(t),""}}}function ld(){return new Date().toISOString().substring(0,10)}function fv(r,e=dv){const t=[];let n=r.slice();for(const i of r){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),ud(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),ud(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class mv{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return op()?ty().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await uv(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return cd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return cd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function ud(r){return ao(JSON.stringify({version:2,heartbeats:r})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gv(r){Fn(new rn("platform-logger",e=>new Sy(e),"PRIVATE")),Fn(new rn("heartbeat",e=>new pv(e),"PRIVATE")),lt(ec,od,r),lt(ec,od,"esm2017"),lt("fire-js","")}gv("");function xc(r,e){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(r);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(r,n[i])&&(t[n[i]]=r[n[i]]);return t}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _v={PHONE:"phone",TOTP:"totp"},yv={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},vv={EMAIL_LINK:"emailLink",EMAIL_PASSWORD:"password",FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PHONE:"phone",TWITTER:"twitter.com"},Iv={LINK:"link",REAUTHENTICATE:"reauthenticate",SIGN_IN:"signIn"},Ev={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bv(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registered for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is incorrect, malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend.","unsupported-password-policy-schema-version":"The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.","password-does-not-meet-requirements":"The password does not meet the requirements."}}function hp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Tv=bv,pp=hp,fp=new es("auth","Firebase",hp()),wv={ADMIN_ONLY_OPERATION:"auth/admin-restricted-operation",ARGUMENT_ERROR:"auth/argument-error",APP_NOT_AUTHORIZED:"auth/app-not-authorized",APP_NOT_INSTALLED:"auth/app-not-installed",CAPTCHA_CHECK_FAILED:"auth/captcha-check-failed",CODE_EXPIRED:"auth/code-expired",CORDOVA_NOT_READY:"auth/cordova-not-ready",CORS_UNSUPPORTED:"auth/cors-unsupported",CREDENTIAL_ALREADY_IN_USE:"auth/credential-already-in-use",CREDENTIAL_MISMATCH:"auth/custom-token-mismatch",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"auth/requires-recent-login",DEPENDENT_SDK_INIT_BEFORE_AUTH:"auth/dependent-sdk-initialized-before-auth",DYNAMIC_LINK_NOT_ACTIVATED:"auth/dynamic-link-not-activated",EMAIL_CHANGE_NEEDS_VERIFICATION:"auth/email-change-needs-verification",EMAIL_EXISTS:"auth/email-already-in-use",EMULATOR_CONFIG_FAILED:"auth/emulator-config-failed",EXPIRED_OOB_CODE:"auth/expired-action-code",EXPIRED_POPUP_REQUEST:"auth/cancelled-popup-request",INTERNAL_ERROR:"auth/internal-error",INVALID_API_KEY:"auth/invalid-api-key",INVALID_APP_CREDENTIAL:"auth/invalid-app-credential",INVALID_APP_ID:"auth/invalid-app-id",INVALID_AUTH:"auth/invalid-user-token",INVALID_AUTH_EVENT:"auth/invalid-auth-event",INVALID_CERT_HASH:"auth/invalid-cert-hash",INVALID_CODE:"auth/invalid-verification-code",INVALID_CONTINUE_URI:"auth/invalid-continue-uri",INVALID_CORDOVA_CONFIGURATION:"auth/invalid-cordova-configuration",INVALID_CUSTOM_TOKEN:"auth/invalid-custom-token",INVALID_DYNAMIC_LINK_DOMAIN:"auth/invalid-dynamic-link-domain",INVALID_EMAIL:"auth/invalid-email",INVALID_EMULATOR_SCHEME:"auth/invalid-emulator-scheme",INVALID_IDP_RESPONSE:"auth/invalid-credential",INVALID_LOGIN_CREDENTIALS:"auth/invalid-credential",INVALID_MESSAGE_PAYLOAD:"auth/invalid-message-payload",INVALID_MFA_SESSION:"auth/invalid-multi-factor-session",INVALID_OAUTH_CLIENT_ID:"auth/invalid-oauth-client-id",INVALID_OAUTH_PROVIDER:"auth/invalid-oauth-provider",INVALID_OOB_CODE:"auth/invalid-action-code",INVALID_ORIGIN:"auth/unauthorized-domain",INVALID_PASSWORD:"auth/wrong-password",INVALID_PERSISTENCE:"auth/invalid-persistence-type",INVALID_PHONE_NUMBER:"auth/invalid-phone-number",INVALID_PROVIDER_ID:"auth/invalid-provider-id",INVALID_RECIPIENT_EMAIL:"auth/invalid-recipient-email",INVALID_SENDER:"auth/invalid-sender",INVALID_SESSION_INFO:"auth/invalid-verification-id",INVALID_TENANT_ID:"auth/invalid-tenant-id",MFA_INFO_NOT_FOUND:"auth/multi-factor-info-not-found",MFA_REQUIRED:"auth/multi-factor-auth-required",MISSING_ANDROID_PACKAGE_NAME:"auth/missing-android-pkg-name",MISSING_APP_CREDENTIAL:"auth/missing-app-credential",MISSING_AUTH_DOMAIN:"auth/auth-domain-config-required",MISSING_CODE:"auth/missing-verification-code",MISSING_CONTINUE_URI:"auth/missing-continue-uri",MISSING_IFRAME_START:"auth/missing-iframe-start",MISSING_IOS_BUNDLE_ID:"auth/missing-ios-bundle-id",MISSING_OR_INVALID_NONCE:"auth/missing-or-invalid-nonce",MISSING_MFA_INFO:"auth/missing-multi-factor-info",MISSING_MFA_SESSION:"auth/missing-multi-factor-session",MISSING_PHONE_NUMBER:"auth/missing-phone-number",MISSING_SESSION_INFO:"auth/missing-verification-id",MODULE_DESTROYED:"auth/app-deleted",NEED_CONFIRMATION:"auth/account-exists-with-different-credential",NETWORK_REQUEST_FAILED:"auth/network-request-failed",NULL_USER:"auth/null-user",NO_AUTH_EVENT:"auth/no-auth-event",NO_SUCH_PROVIDER:"auth/no-such-provider",OPERATION_NOT_ALLOWED:"auth/operation-not-allowed",OPERATION_NOT_SUPPORTED:"auth/operation-not-supported-in-this-environment",POPUP_BLOCKED:"auth/popup-blocked",POPUP_CLOSED_BY_USER:"auth/popup-closed-by-user",PROVIDER_ALREADY_LINKED:"auth/provider-already-linked",QUOTA_EXCEEDED:"auth/quota-exceeded",REDIRECT_CANCELLED_BY_USER:"auth/redirect-cancelled-by-user",REDIRECT_OPERATION_PENDING:"auth/redirect-operation-pending",REJECTED_CREDENTIAL:"auth/rejected-credential",SECOND_FACTOR_ALREADY_ENROLLED:"auth/second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"auth/maximum-second-factor-count-exceeded",TENANT_ID_MISMATCH:"auth/tenant-id-mismatch",TIMEOUT:"auth/timeout",TOKEN_EXPIRED:"auth/user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"auth/too-many-requests",UNAUTHORIZED_DOMAIN:"auth/unauthorized-continue-uri",UNSUPPORTED_FIRST_FACTOR:"auth/unsupported-first-factor",UNSUPPORTED_PERSISTENCE:"auth/unsupported-persistence-type",UNSUPPORTED_TENANT_OPERATION:"auth/unsupported-tenant-operation",UNVERIFIED_EMAIL:"auth/unverified-email",USER_CANCELLED:"auth/user-cancelled",USER_DELETED:"auth/user-not-found",USER_DISABLED:"auth/user-disabled",USER_MISMATCH:"auth/user-mismatch",USER_SIGNED_OUT:"auth/user-signed-out",WEAK_PASSWORD:"auth/weak-password",WEB_STORAGE_UNSUPPORTED:"auth/web-storage-unsupported",ALREADY_INITIALIZED:"auth/already-initialized",RECAPTCHA_NOT_ENABLED:"auth/recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"auth/missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"auth/invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"auth/invalid-recaptcha-action",MISSING_CLIENT_TYPE:"auth/missing-client-type",MISSING_RECAPTCHA_VERSION:"auth/missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"auth/invalid-recaptcha-version",INVALID_REQ_TYPE:"auth/invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uo=new Cc("@firebase/auth");function Av(r,...e){uo.logLevel<=Y.WARN&&uo.warn(`Auth (${Lr}): ${r}`,...e)}function Qs(r,...e){uo.logLevel<=Y.ERROR&&uo.error(`Auth (${Lr}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(r,...e){throw Vc(r,...e)}function He(r,...e){return Vc(r,...e)}function Nc(r,e,t){const n=Object.assign(Object.assign({},pp()),{[e]:t});return new es("auth","Firebase",n).create(e,{appName:r.name})}function De(r){return Nc(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Mr(r,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&Xe(r,"argument-error"),Nc(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Vc(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return fp.create(r,...e)}function V(r,e,...t){if(!r)throw Vc(e,...t)}function ot(r){const e="INTERNAL ASSERTION FAILED: "+r;throw Qs(e),new Error(e)}function Rt(r,e){r||ot(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fi(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.href)||""}function Oc(){return dd()==="http:"||dd()==="https:"}function dd(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pv(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Oc()||X_()||"connection"in navigator)?navigator.onLine:!0}function Rv(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(e,t){this.shortDelay=e,this.longDelay=t,Rt(t>e,"Short delay should be less than long delay!"),this.isMobile=Q_()||Z_()}get(){return Pv()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lc(r,e){Rt(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mp{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ot("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ot("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ot("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sv={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cv=new ts(3e4,6e4);function ue(r,e){return r.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:r.tenantId}):e}async function de(r,e,t,n,i={}){return gp(r,i,async()=>{let s={},o={};n&&(e==="GET"?o=n:s={body:JSON.stringify(n)});const c=Vr(Object.assign({key:r.config.apiKey},o)).slice(1),l=await r._getAdditionalHeaders();l["Content-Type"]="application/json",r.languageCode&&(l["X-Firebase-Locale"]=r.languageCode);const u=Object.assign({method:e,headers:l},s);return Y_()||(u.referrerPolicy="no-referrer"),mp.fetch()(_p(r,r.config.apiHost,t,c),u)})}async function gp(r,e,t){r._canInitEmulator=!1;const n=Object.assign(Object.assign({},Sv),e);try{const i=new kv(r),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Ti(r,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const c=s.ok?o.errorMessage:o.error.message,[l,u]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ti(r,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Ti(r,"email-already-in-use",o);if(l==="USER_DISABLED")throw Ti(r,"user-disabled",o);const p=n[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw Nc(r,p,u);Xe(r,p)}}catch(i){if(i instanceof kt)throw i;Xe(r,"network-request-failed",{message:String(i)})}}async function xt(r,e,t,n,i={}){const s=await de(r,e,t,n,i);return"mfaPendingCredential"in s&&Xe(r,"multi-factor-auth-required",{_serverResponse:s}),s}function _p(r,e,t,n){const i=`${e}${t}?${n}`;return r.config.emulator?Lc(r.config,i):`${r.config.apiScheme}://${i}`}function Dv(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class kv{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(He(this.auth,"network-request-failed")),Cv.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Ti(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const i=He(r,e,n);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hd(r){return r!==void 0&&r.getResponse!==void 0}function pd(r){return r!==void 0&&r.enterprise!==void 0}class yp{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Dv(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xv(r){return(await de(r,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function vp(r,e){return de(r,"GET","/v2/recaptchaConfig",ue(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nv(r,e){return de(r,"POST","/v1/accounts:delete",e)}async function Vv(r,e){return de(r,"POST","/v1/accounts:update",e)}async function Ip(r,e){return de(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ci(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ov(r,e=!1){return $(r).getIdToken(e)}async function Ep(r,e=!1){const t=$(r),n=await t.getIdToken(e),i=Do(n);V(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:n,authTime:Ci(Fa(i.auth_time)),issuedAtTime:Ci(Fa(i.iat)),expirationTime:Ci(Fa(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Fa(r){return Number(r)*1e3}function Do(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return Qs("JWT malformed, contained fewer than 3 sections"),null;try{const i=ep(t);return i?JSON.parse(i):(Qs("Failed to decode base64 JWT payload"),null)}catch(i){return Qs("Caught error parsing JWT payload as JSON",i?.toString()),null}}function fd(r){const e=Do(r);return V(e,"internal-error"),V(typeof e.exp<"u","internal-error"),V(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function St(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof kt&&Lv(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function Lv({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mv{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ci(this.lastLoginAt),this.creationTime=Ci(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ji(r){var e;const t=r.auth,n=await r.getIdToken(),i=await St(r,Ip(t,{idToken:n}));V(i?.users.length,t,"internal-error");const s=i.users[0];r._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Tp(s.providerUserInfo):[],c=Fv(r.providerData,o),l=r.isAnonymous,u=!(r.email&&s.passwordHash)&&!c?.length,p=l?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new nc(s.createdAt,s.lastLoginAt),isAnonymous:p};Object.assign(r,f)}async function bp(r){const e=$(r);await ji(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Fv(r,e){return[...r.filter(n=>!e.some(i=>i.providerId===n.providerId)),...e]}function Tp(r){return r.map(e=>{var{providerId:t}=e,n=xc(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jv(r,e){const t=await gp(r,{},async()=>{const n=Vr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=r.config,o=_p(r,i,"/v1/token",`key=${s}`),c=await r._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",mp.fetch()(o,{method:"POST",headers:c,body:n})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Uv(r,e){return de(r,"POST","/v2/accounts:revokeToken",ue(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){V(e.idToken,"internal-error"),V(typeof e.idToken<"u","internal-error"),V(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):fd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){V(e.length!==0,"internal-error");const t=fd(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(V(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:i,expiresIn:s}=await jv(e,t);this.updateTokensAndExpiration(n,i,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:i,expirationTime:s}=t,o=new hr;return n&&(V(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),i&&(V(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(V(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new hr,this.toJSON())}_performRefresh(){return ot("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qt(r,e){V(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class Et{constructor(e){var{uid:t,auth:n,stsTokenManager:i}=e,s=xc(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Mv(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new nc(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await St(this,this.stsTokenManager.getToken(this.auth,e));return V(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ep(this,e)}reload(){return bp(this)}_assign(e){this!==e&&(V(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Et(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){V(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await ji(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ee(this.auth.app))return Promise.reject(De(this.auth));const e=await this.getIdToken();return await St(this,Nv(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,i,s,o,c,l,u,p;const f=(n=t.displayName)!==null&&n!==void 0?n:void 0,g=(i=t.email)!==null&&i!==void 0?i:void 0,I=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,D=(o=t.photoURL)!==null&&o!==void 0?o:void 0,k=(c=t.tenantId)!==null&&c!==void 0?c:void 0,S=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,F=(u=t.createdAt)!==null&&u!==void 0?u:void 0,U=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:B,emailVerified:G,isAnonymous:J,providerData:K,stsTokenManager:E}=t;V(B&&E,e,"internal-error");const _=hr.fromJSON(this.name,E);V(typeof B=="string",e,"internal-error"),qt(f,e.name),qt(g,e.name),V(typeof G=="boolean",e,"internal-error"),V(typeof J=="boolean",e,"internal-error"),qt(I,e.name),qt(D,e.name),qt(k,e.name),qt(S,e.name),qt(F,e.name),qt(U,e.name);const y=new Et({uid:B,auth:e,email:g,emailVerified:G,displayName:f,isAnonymous:J,photoURL:D,phoneNumber:I,tenantId:k,stsTokenManager:_,createdAt:F,lastLoginAt:U});return K&&Array.isArray(K)&&(y.providerData=K.map(b=>Object.assign({},b))),S&&(y._redirectEventId=S),y}static async _fromIdTokenResponse(e,t,n=!1){const i=new hr;i.updateFromServerResponse(t);const s=new Et({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:n});return await ji(s),s}static async _fromGetAccountInfoResponse(e,t,n){const i=t.users[0];V(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Tp(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!s?.length,c=new hr;c.updateFromIdToken(n);const l=new Et({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new nc(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(l,u),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const md=new Map;function bt(r){Rt(r instanceof Function,"Expected a class definition");let e=md.get(r);return e?(Rt(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,md.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}wp.type="NONE";const rc=wp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Js(r,e,t){return`firebase:${r}:${e}:${t}`}class pr{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:i,name:s}=this.auth;this.fullUserKey=Js(this.userKey,i.apiKey,s),this.fullPersistenceKey=Js("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Et._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new pr(bt(rc),e,n);const i=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let s=i[0]||bt(rc);const o=Js(n,e.config.apiKey,e.name);let c=null;for(const u of t)try{const p=await u._get(o);if(p){const f=Et._fromJSON(e,p);u!==s&&(c=f),s=u;break}}catch{}const l=i.filter(u=>u._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new pr(s,e,n):(s=l[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async u=>{if(u!==s)try{await u._remove(o)}catch{}})),new pr(s,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gd(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Sp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ap(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Dp(e))return"Blackberry";if(kp(e))return"Webos";if(Pp(e))return"Safari";if((e.includes("chrome/")||Rp(e))&&!e.includes("edge/"))return"Chrome";if(Cp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if(n?.length===2)return n[1]}return"Other"}function Ap(r=Ae()){return/firefox\//i.test(r)}function Pp(r=Ae()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Rp(r=Ae()){return/crios\//i.test(r)}function Sp(r=Ae()){return/iemobile/i.test(r)}function Cp(r=Ae()){return/android/i.test(r)}function Dp(r=Ae()){return/blackberry/i.test(r)}function kp(r=Ae()){return/webos/i.test(r)}function Mc(r=Ae()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function Bv(r=Ae()){var e;return Mc(r)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function qv(){return ey()&&document.documentMode===10}function xp(r=Ae()){return Mc(r)||Cp(r)||kp(r)||Dp(r)||/windows phone/i.test(r)||Sp(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Np(r,e=[]){let t;switch(r){case"Browser":t=gd(Ae());break;case"Worker":t=`${gd(Ae())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Lr}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $v{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=s=>new Promise((o,c)=>{try{const l=e(s);o(l)}catch(l){c(l)}});n.onAbort=t,this.queue.push(n);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zv(r,e={}){return de(r,"GET","/v2/passwordPolicy",ue(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gv=6;class Kv{constructor(e){var t,n,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Gv,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(n=e.allowedNonAlphanumericCharacters)===null||n===void 0?void 0:n.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,i,s,o,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(n=l.meetsMaxPasswordLength)!==null&&n!==void 0?n:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let i=0;i<e.length;i++)n=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hv{constructor(e,t,n,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new _d(this),this.idTokenSubscription=new _d(this),this.beforeStateQueue=new $v(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=fp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=bt(t)),this._initializationPromise=this.queue(async()=>{var n,i;if(!this._deleted&&(this.persistenceManager=await pr.create(this,e),!this._deleted)){if(!((n=this._popupRedirectResolver)===null||n===void 0)&&n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ip(this,{idToken:e}),n=await Et._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ee(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i?._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&l?.user&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return V(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ji(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Rv()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ee(this.app))return Promise.reject(De(this));const t=e?$(e):null;return t&&V(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&V(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ee(this.app)?Promise.reject(De(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ee(this.app)?Promise.reject(De(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(bt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await zv(this),t=new Kv(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new es("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await Uv(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&bt(e)||this._popupRedirectResolver;V(t,this,"argument-error"),this.redirectPersistenceManager=await pr.create(this,[bt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(V(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,n,i);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return V(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Np(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Av(`Error while retrieving App Check token: ${t.error}`),t?.token}}function ve(r){return $(r)}class _d{constructor(e){this.auth=e,this.observer=null,this.addObserver=oy(t=>this.observer=t)}get next(){return V(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ns={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Wv(r){ns=r}function Fc(r){return ns.loadJS(r)}function Qv(){return ns.recaptchaV2Script}function Jv(){return ns.recaptchaEnterpriseScript}function Yv(){return ns.gapiScript}function Vp(r){return`__${r}${Math.floor(Math.random()*1e6)}`}const Xv="recaptcha-enterprise",Zv="NO_RECAPTCHA";class Op{constructor(e){this.type=Xv,this.auth=ve(e)}async verify(e="verify",t=!1){async function n(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,c)=>{vp(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const u=new yp(l);return s.tenantId==null?s._agentRecaptchaConfig=u:s._tenantRecaptchaConfigs[s.tenantId]=u,o(u.siteKey)}}).catch(l=>{c(l)})})}function i(s,o,c){const l=window.grecaptcha;pd(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(u=>{o(u)}).catch(()=>{o(Zv)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{n(this.auth).then(c=>{if(!t&&pd(window.grecaptcha))i(c,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=Jv();l.length!==0&&(l+=c),Fc(l).then(()=>{i(c,s,o)}).catch(u=>{o(u)})}}).catch(c=>{o(c)})})}}async function yd(r,e,t,n=!1){const i=new Op(r);let s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}const o=Object.assign({},e);return n?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Ui(r,e,t,n){var i;if(!((i=r._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await yd(r,e,t,t==="getOobCode");return n(r,s)}else return n(r,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await yd(r,e,t,t==="getOobCode");return n(r,o)}else return Promise.reject(s)})}async function eI(r){const e=ve(r),t=await vp(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new yp(t);e.tenantId==null?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,n.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")&&new Op(e).verify()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lp(r,e){const t=Or(r,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(nn(s,e??{}))return i;Xe(i,"already-initialized")}return t.initialize({options:e})}function tI(r,e){const t=e?.persistence||[],n=(Array.isArray(t)?t:[t]).map(bt);e?.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e?.popupRedirectResolver)}function Mp(r,e,t){const n=ve(r);V(n._canInitEmulator,n,"emulator-config-failed"),V(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const i=!!t?.disableWarnings,s=Fp(e),{host:o,port:c}=nI(e),l=c===null?"":`:${c}`;n.config.emulator={url:`${s}//${o}${l}/`},n.settings.appVerificationDisabledForTesting=!0,n.emulatorConfig=Object.freeze({host:o,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||rI()}function Fp(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function nI(r){const e=Fp(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(n);if(i){const s=i[1];return{host:s,port:vd(n.substr(s.length+1))}}else{const[s,o]=n.split(":");return{host:s,port:vd(o)}}}function vd(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function rI(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ot("not implemented")}_getIdTokenResponse(e){return ot("not implemented")}_linkToIdToken(e,t){return ot("not implemented")}_getReauthenticationResolver(e){return ot("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jp(r,e){return de(r,"POST","/v1/accounts:resetPassword",ue(r,e))}async function iI(r,e){return de(r,"POST","/v1/accounts:update",e)}async function sI(r,e){return de(r,"POST","/v1/accounts:signUp",e)}async function oI(r,e){return de(r,"POST","/v1/accounts:update",ue(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aI(r,e){return xt(r,"POST","/v1/accounts:signInWithPassword",ue(r,e))}async function ko(r,e){return de(r,"POST","/v1/accounts:sendOobCode",ue(r,e))}async function cI(r,e){return ko(r,e)}async function lI(r,e){return ko(r,e)}async function uI(r,e){return ko(r,e)}async function dI(r,e){return ko(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hI(r,e){return xt(r,"POST","/v1/accounts:signInWithEmailLink",ue(r,e))}async function pI(r,e){return xt(r,"POST","/v1/accounts:signInWithEmailLink",ue(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r extends Fr{constructor(e,t,n,i=null){super("password",n),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new _r(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new _r(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ui(e,t,"signInWithPassword",aI);case"emailLink":return hI(e,{email:this._email,oobCode:this._password});default:Xe(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ui(e,n,"signUpPassword",sI);case"emailLink":return pI(e,{idToken:t,email:this._email,oobCode:this._password});default:Xe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function At(r,e){return xt(r,"POST","/v1/accounts:signInWithIdp",ue(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fI="http://localhost";class ht extends Fr{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ht(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Xe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:i}=t,s=xc(t,["providerId","signInMethod"]);if(!n||!i)return null;const o=new ht(n,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return At(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,At(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,At(e,t)}buildRequest(){const e={requestUri:fI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Vr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mI(r,e){return de(r,"POST","/v1/accounts:sendVerificationCode",ue(r,e))}async function gI(r,e){return xt(r,"POST","/v1/accounts:signInWithPhoneNumber",ue(r,e))}async function _I(r,e){const t=await xt(r,"POST","/v1/accounts:signInWithPhoneNumber",ue(r,e));if(t.temporaryProof)throw Ti(r,"account-exists-with-different-credential",t);return t}const yI={USER_NOT_FOUND:"user-not-found"};async function vI(r,e){const t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return xt(r,"POST","/v1/accounts:signInWithPhoneNumber",ue(r,t),yI)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt extends Fr{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new Zt({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new Zt({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return gI(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return _I(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return vI(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:n,phoneNumber:i,temporaryProof:s}=e;return!n&&!t&&!i&&!s?null:new Zt({verificationId:t,verificationCode:n,phoneNumber:i,temporaryProof:s})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function II(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function EI(r){const e=Ei(bi(r)).link,t=e?Ei(bi(e)).deep_link_id:null,n=Ei(bi(r)).deep_link_id;return(n?Ei(bi(n)).link:null)||n||t||e||r}class jr{constructor(e){var t,n,i,s,o,c;const l=Ei(bi(e)),u=(t=l.apiKey)!==null&&t!==void 0?t:null,p=(n=l.oobCode)!==null&&n!==void 0?n:null,f=II((i=l.mode)!==null&&i!==void 0?i:null);V(u&&p&&f,"argument-error"),this.apiKey=u,this.operation=f,this.code=p,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=EI(e);try{return new jr(t)}catch{return null}}}function bI(r){return jr.parseLink(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(){this.providerId=fn.PROVIDER_ID}static credential(e,t){return _r._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=jr.parseLink(t);return V(n,"argument-error"),_r._fromEmailAndCode(e,n.code,n.tenantId)}}fn.PROVIDER_ID="password";fn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";fn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur extends Nt{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class Di extends Ur{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return V("providerId"in t&&"signInMethod"in t,"argument-error"),ht._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return V(e.idToken||e.accessToken,"argument-error"),ht._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return Di.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return Di.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n,oauthTokenSecret:i,pendingToken:s,nonce:o,providerId:c}=e;if(!n&&!i&&!t&&!s||!c)return null;try{return new Di(c)._credential({idToken:t,accessToken:n,nonce:o,pendingToken:s})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t extends Ur{constructor(){super("facebook.com")}static credential(e){return ht._fromParams({providerId:_t.PROVIDER_ID,signInMethod:_t.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _t.credentialFromTaggedObject(e)}static credentialFromError(e){return _t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _t.credential(e.oauthAccessToken)}catch{return null}}}_t.FACEBOOK_SIGN_IN_METHOD="facebook.com";_t.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt extends Ur{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ht._fromParams({providerId:yt.PROVIDER_ID,signInMethod:yt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return yt.credentialFromTaggedObject(e)}static credentialFromError(e){return yt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return yt.credential(t,n)}catch{return null}}}yt.GOOGLE_SIGN_IN_METHOD="google.com";yt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt extends Ur{constructor(){super("github.com")}static credential(e){return ht._fromParams({providerId:vt.PROVIDER_ID,signInMethod:vt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return vt.credentialFromTaggedObject(e)}static credentialFromError(e){return vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return vt.credential(e.oauthAccessToken)}catch{return null}}}vt.GITHUB_SIGN_IN_METHOD="github.com";vt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TI="http://localhost";class Bi extends Fr{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){const t=this.buildRequest();return At(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,At(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,At(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:i,pendingToken:s}=t;return!n||!i||!s||n!==i?null:new Bi(n,s)}static _create(e,t){return new Bi(e,t)}buildRequest(){return{requestUri:TI,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wI="saml.";class ho extends Nt{constructor(e){V(e.startsWith(wI),"argument-error"),super(e)}static credentialFromResult(e){return ho.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return ho.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=Bi.fromJSON(e);return V(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:t,providerId:n}=e;if(!t||!n)return null;try{return Bi._create(n,t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It extends Ur{constructor(){super("twitter.com")}static credential(e,t){return ht._fromParams({providerId:It.PROVIDER_ID,signInMethod:It.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return It.credentialFromTaggedObject(e)}static credentialFromError(e){return It.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return It.credential(t,n)}catch{return null}}}It.TWITTER_SIGN_IN_METHOD="twitter.com";It.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Up(r,e){return xt(r,"POST","/v1/accounts:signUp",ue(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,i=!1){const s=await Et._fromIdTokenResponse(e,n,i),o=Id(n);return new rt({user:s,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const i=Id(n);return new rt({user:e,providerId:i,_tokenResponse:n,operationType:t})}}function Id(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AI(r){var e;if(Ee(r.app))return Promise.reject(De(r));const t=ve(r);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new rt({user:t.currentUser,providerId:null,operationType:"signIn"});const n=await Up(t,{returnSecureToken:!0}),i=await rt._fromIdTokenResponse(t,"signIn",n,!0);return await t._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class po extends kt{constructor(e,t,n,i){var s;super(t.code,t.message),this.operationType=n,this.user=i,Object.setPrototypeOf(this,po.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,i){return new po(e,t,n,i)}}function Bp(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?po._fromErrorAndOperation(r,s,e,n):s})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qp(r){return new Set(r.map(({providerId:e})=>e).filter(e=>!!e))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PI(r,e){const t=$(r);await xo(!0,t,e);const{providerUserInfo:n}=await Vv(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),i=qp(n||[]);return t.providerData=t.providerData.filter(s=>i.has(s.providerId)),i.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function jc(r,e,t=!1){const n=await St(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return rt._forOperation(r,"link",n)}async function xo(r,e,t){await ji(e);const n=qp(e.providerData),i=r===!1?"provider-already-linked":"no-such-provider";V(n.has(t)===r,e.auth,i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $p(r,e,t=!1){const{auth:n}=r;if(Ee(n.app))return Promise.reject(De(n));const i="reauthenticate";try{const s=await St(r,Bp(n,i,e,r),t);V(s.idToken,n,"internal-error");const o=Do(s.idToken);V(o,n,"internal-error");const{sub:c}=o;return V(r.uid===c,n,"user-mismatch"),rt._forOperation(r,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&Xe(n,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zp(r,e,t=!1){if(Ee(r.app))return Promise.reject(De(r));const n="signIn",i=await Bp(r,n,e),s=await rt._fromIdTokenResponse(r,n,i);return t||await r._updateCurrentUser(s.user),s}async function No(r,e){return zp(ve(r),e)}async function Gp(r,e){const t=$(r);return await xo(!1,t,e.providerId),jc(t,e)}async function Kp(r,e){return $p($(r),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RI(r,e){return xt(r,"POST","/v1/accounts:signInWithCustomToken",ue(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SI(r,e){if(Ee(r.app))return Promise.reject(De(r));const t=ve(r),n=await RI(t,{token:e,returnSecureToken:!0}),i=await rt._fromIdTokenResponse(t,"signIn",n);return await t._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?Uc._fromServerResponse(e,t):"totpInfo"in t?Bc._fromServerResponse(e,t):Xe(e,"internal-error")}}class Uc extends rs{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new Uc(t)}}class Bc extends rs{constructor(e){super("totp",e)}static _fromServerResponse(e,t){return new Bc(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vo(r,e,t){var n;V(((n=t.url)===null||n===void 0?void 0:n.length)>0,r,"invalid-continue-uri"),V(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,r,"invalid-dynamic-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(V(t.iOS.bundleId.length>0,r,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(V(t.android.packageName.length>0,r,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qc(r){const e=ve(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function CI(r,e,t){const n=ve(r),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&Vo(n,i,t),await Ui(n,i,"getOobCode",lI)}async function DI(r,e,t){await jp($(r),{oobCode:e,newPassword:t}).catch(async n=>{throw n.code==="auth/password-does-not-meet-requirements"&&qc(r),n})}async function kI(r,e){await oI($(r),{oobCode:e})}async function Hp(r,e){const t=$(r),n=await jp(t,{oobCode:e}),i=n.requestType;switch(V(i,t,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":V(n.newEmail,t,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":V(n.mfaInfo,t,"internal-error");default:V(n.email,t,"internal-error")}let s=null;return n.mfaInfo&&(s=rs._fromServerResponse(ve(t),n.mfaInfo)),{data:{email:(n.requestType==="VERIFY_AND_CHANGE_EMAIL"?n.newEmail:n.email)||null,previousEmail:(n.requestType==="VERIFY_AND_CHANGE_EMAIL"?n.email:n.newEmail)||null,multiFactorInfo:s},operation:i}}async function xI(r,e){const{data:t}=await Hp($(r),e);return t.email}async function Wp(r,e,t){if(Ee(r.app))return Promise.reject(De(r));const n=ve(r),o=await Ui(n,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Up).catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&qc(r),l}),c=await rt._fromIdTokenResponse(n,"signIn",o);return await n._updateCurrentUser(c.user),c}function Qp(r,e,t){return Ee(r.app)?Promise.reject(De(r)):No($(r),fn.credential(e,t)).catch(async n=>{throw n.code==="auth/password-does-not-meet-requirements"&&qc(r),n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NI(r,e,t){const n=ve(r),i={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function s(o,c){V(c.handleCodeInApp,n,"argument-error"),c&&Vo(n,o,c)}s(i,t),await Ui(n,i,"getOobCode",uI)}function VI(r,e){const t=jr.parseLink(e);return t?.operation==="EMAIL_SIGNIN"}async function OI(r,e,t){if(Ee(r.app))return Promise.reject(De(r));const n=$(r),i=fn.credentialWithLink(e,t||Fi());return V(i._tenantId===(n.tenantId||null),n,"tenant-id-mismatch"),No(n,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LI(r,e){return de(r,"POST","/v1/accounts:createAuthUri",ue(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function MI(r,e){const t=Oc()?Fi():"http://localhost",n={identifier:e,continueUri:t},{signinMethods:i}=await LI($(r),n);return i||[]}async function FI(r,e){const t=$(r),i={requestType:"VERIFY_EMAIL",idToken:await r.getIdToken()};e&&Vo(t.auth,i,e);const{email:s}=await cI(t.auth,i);s!==r.email&&await r.reload()}async function jI(r,e,t){const n=$(r),s={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await r.getIdToken(),newEmail:e};t&&Vo(n.auth,s,t);const{email:o}=await dI(n.auth,s);o!==r.email&&await r.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function UI(r,e){return de(r,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BI(r,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const n=$(r),s={idToken:await n.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await St(n,UI(n.auth,s));n.displayName=o.displayName||null,n.photoURL=o.photoUrl||null;const c=n.providerData.find(({providerId:l})=>l==="password");c&&(c.displayName=n.displayName,c.photoURL=n.photoURL),await n._updateTokensIfNecessary(o)}function qI(r,e){const t=$(r);return Ee(t.auth.app)?Promise.reject(De(t.auth)):Jp(t,e,null)}function $I(r,e){return Jp($(r),null,e)}async function Jp(r,e,t){const{auth:n}=r,s={idToken:await r.getIdToken(),returnSecureToken:!0};e&&(s.email=e),t&&(s.password=t);const o=await St(r,iI(n,s));await r._updateTokensIfNecessary(o,!0)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zI(r){var e,t;if(!r)return null;const{providerId:n}=r,i=r.rawUserInfo?JSON.parse(r.rawUserInfo):{},s=r.isNewUser||r.kind==="identitytoolkit#SignupNewUserResponse";if(!n&&r?.idToken){const o=(t=(e=Do(r.idToken))===null||e===void 0?void 0:e.firebase)===null||t===void 0?void 0:t.sign_in_provider;if(o){const c=o!=="anonymous"&&o!=="custom"?o:null;return new fr(s,c)}}if(!n)return null;switch(n){case"facebook.com":return new GI(s,i);case"github.com":return new KI(s,i);case"google.com":return new HI(s,i);case"twitter.com":return new WI(s,i,r.screenName||null);case"custom":case"anonymous":return new fr(s,null);default:return new fr(s,n,i)}}class fr{constructor(e,t,n={}){this.isNewUser=e,this.providerId=t,this.profile=n}}class Yp extends fr{constructor(e,t,n,i){super(e,t,n),this.username=i}}class GI extends fr{constructor(e,t){super(e,"facebook.com",t)}}class KI extends Yp{constructor(e,t){super(e,"github.com",t,typeof t?.login=="string"?t?.login:null)}}class HI extends fr{constructor(e,t){super(e,"google.com",t)}}class WI extends Yp{constructor(e,t,n){super(e,"twitter.com",t,n)}}function QI(r){const{user:e,_tokenResponse:t}=r;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:zI(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JI(r,e){return $(r).setPersistence(e)}function YI(r){return eI(r)}async function XI(r,e){return ve(r).validatePassword(e)}function Xp(r,e,t,n){return $(r).onIdTokenChanged(e,t,n)}function Zp(r,e,t){return $(r).beforeAuthStateChanged(e,t)}function ef(r,e,t,n){return $(r).onAuthStateChanged(e,t,n)}function ZI(r){$(r).useDeviceLanguage()}function eE(r,e){return $(r).updateCurrentUser(e)}function tf(r){return $(r).signOut()}function tE(r,e){return ve(r).revokeAccessToken(e)}async function nE(r){return $(r).delete()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(e,t,n){this.type=e,this.credential=t,this.user=n}static _fromIdtoken(e,t){return new Vn("enroll",e,t)}static _fromMfaPendingCredential(e){return new Vn("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var t,n;if(e?.multiFactorSession){if(!((t=e.multiFactorSession)===null||t===void 0)&&t.pendingCredential)return Vn._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(!((n=e.multiFactorSession)===null||n===void 0)&&n.idToken)return Vn._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c{constructor(e,t,n){this.session=e,this.hints=t,this.signInResolver=n}static _fromError(e,t){const n=ve(e),i=t.customData._serverResponse,s=(i.mfaInfo||[]).map(c=>rs._fromServerResponse(n,c));V(i.mfaPendingCredential,n,"internal-error");const o=Vn._fromMfaPendingCredential(i.mfaPendingCredential);return new $c(o,s,async c=>{const l=await c._process(n,o);delete i.mfaInfo,delete i.mfaPendingCredential;const u=Object.assign(Object.assign({},i),{idToken:l.idToken,refreshToken:l.refreshToken});switch(t.operationType){case"signIn":const p=await rt._fromIdTokenResponse(n,t.operationType,u);return await n._updateCurrentUser(p.user),p;case"reauthenticate":return V(t.user,n,"internal-error"),rt._forOperation(t.user,t.operationType,u);default:Xe(n,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}function rE(r,e){var t;const n=$(r),i=e;return V(e.customData.operationType,n,"argument-error"),V((t=i.customData._serverResponse)===null||t===void 0?void 0:t.mfaPendingCredential,n,"argument-error"),$c._fromError(n,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iE(r,e){return de(r,"POST","/v2/accounts/mfaEnrollment:start",ue(r,e))}function sE(r,e){return de(r,"POST","/v2/accounts/mfaEnrollment:finalize",ue(r,e))}function oE(r,e){return de(r,"POST","/v2/accounts/mfaEnrollment:start",ue(r,e))}function aE(r,e){return de(r,"POST","/v2/accounts/mfaEnrollment:finalize",ue(r,e))}function cE(r,e){return de(r,"POST","/v2/accounts/mfaEnrollment:withdraw",ue(r,e))}class zc{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(n=>rs._fromServerResponse(e.auth,n)))})}static _fromUser(e){return new zc(e)}async getSession(){return Vn._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,t){const n=e,i=await this.getSession(),s=await St(this.user,n._process(this.user.auth,i,t));return await this.user._updateTokensIfNecessary(s),this.user.reload()}async unenroll(e){const t=typeof e=="string"?e:e.uid,n=await this.user.getIdToken();try{const i=await St(this.user,cE(this.user.auth,{idToken:n,mfaEnrollmentId:t}));this.enrolledFactors=this.enrolledFactors.filter(({uid:s})=>s!==t),await this.user._updateTokensIfNecessary(i),await this.user.reload()}catch(i){throw i}}}const ja=new WeakMap;function lE(r){const e=$(r);return ja.has(e)||ja.set(e,zc._fromUser(e)),ja.get(e)}const fo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(fo,"1"),this.storage.removeItem(fo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uE=1e3,dE=10;class rf extends nf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=xp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),i=this.localCache[t];n!==i&&e(t,i,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const n=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},s=this.storage.getItem(n);qv()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,dE):i()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},uE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}rf.type="LOCAL";const sf=rf;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of extends nf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}of.type="SESSION";const Gc=of;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hE(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const n=new Oo(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:i});const c=Array.from(o).map(async u=>u(t.origin,s)),l=await hE(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Oo.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lo(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pE{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,l)=>{const u=Lo("",20);i.port1.start();const p=setTimeout(()=>{l(new Error("unsupported_event"))},n);o={messageChannel:i,onMessage(f){const g=f;if(g.data.eventId===u)switch(g.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(g.data.response);break;default:clearTimeout(p),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we(){return window}function fE(r){we().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kc(){return typeof we().WorkerGlobalScope<"u"&&typeof we().importScripts=="function"}async function mE(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function gE(){var r;return((r=navigator?.serviceWorker)===null||r===void 0?void 0:r.controller)||null}function _E(){return Kc()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const af="firebaseLocalStorageDb",yE=1,mo="firebaseLocalStorage",cf="fbase_key";class is{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Mo(r,e){return r.transaction([mo],e?"readwrite":"readonly").objectStore(mo)}function vE(){const r=indexedDB.deleteDatabase(af);return new is(r).toPromise()}function ic(){const r=indexedDB.open(af,yE);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(mo,{keyPath:cf})}catch(i){t(i)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(mo)?e(n):(n.close(),await vE(),e(await ic()))})})}async function Ed(r,e,t){const n=Mo(r,!0).put({[cf]:e,value:t});return new is(n).toPromise()}async function IE(r,e){const t=Mo(r,!1).get(e),n=await new is(t).toPromise();return n===void 0?null:n.value}function bd(r,e){const t=Mo(r,!0).delete(e);return new is(t).toPromise()}const EE=800,bE=3;class lf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ic(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>bE)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Kc()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Oo._getInstance(_E()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await mE(),!this.activeServiceWorker)return;this.sender=new pE(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&!((e=n[0])===null||e===void 0)&&e.fulfilled&&!((t=n[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||gE()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ic();return await Ed(e,fo,"1"),await bd(e,fo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Ed(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>IE(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>bd(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Mo(i,!1).getAll();return new is(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)n.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!n.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),EE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}lf.type="LOCAL";const uf=lf;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TE(r,e){return de(r,"POST","/v2/accounts/mfaSignIn:start",ue(r,e))}function wE(r,e){return de(r,"POST","/v2/accounts/mfaSignIn:finalize",ue(r,e))}function AE(r,e){return de(r,"POST","/v2/accounts/mfaSignIn:finalize",ue(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PE=500,RE=6e4,js=1e12;class SE{constructor(e){this.auth=e,this.counter=js,this._widgets=new Map}render(e,t){const n=this.counter;return this._widgets.set(n,new CE(e,this.auth.name,t||{})),this.counter++,n}reset(e){var t;const n=e||js;(t=this._widgets.get(n))===null||t===void 0||t.delete(),this._widgets.delete(n)}getResponse(e){var t;const n=e||js;return((t=this._widgets.get(n))===null||t===void 0?void 0:t.getResponse())||""}async execute(e){var t;const n=e||js;return(t=this._widgets.get(n))===null||t===void 0||t.execute(),""}}class CE{constructor(e,t,n){this.params=n,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;V(i,"argument-error",{appName:t}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=DE(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},RE)},PE))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function DE(r){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let n=0;n<r;n++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ua=Vp("rcb"),kE=new ts(3e4,6e4);class xE{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=we().grecaptcha)===null||e===void 0)&&e.render)}load(e,t=""){return V(NE(t),e,"argument-error"),this.shouldResolveImmediately(t)&&hd(we().grecaptcha)?Promise.resolve(we().grecaptcha):new Promise((n,i)=>{const s=we().setTimeout(()=>{i(He(e,"network-request-failed"))},kE.get());we()[Ua]=()=>{we().clearTimeout(s),delete we()[Ua];const c=we().grecaptcha;if(!c||!hd(c)){i(He(e,"internal-error"));return}const l=c.render;c.render=(u,p)=>{const f=l(u,p);return this.counter++,f},this.hostLanguage=t,n(c)};const o=`${Qv()}?${Vr({onload:Ua,render:"explicit",hl:t})}`;Fc(o).catch(()=>{clearTimeout(s),i(He(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(!((t=we().grecaptcha)===null||t===void 0)&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function NE(r){return r.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(r)}class VE{async load(e){return new SE(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const df="recaptcha",OE={theme:"light",type:"image"};class LE{constructor(e,t,n=Object.assign({},OE)){this.parameters=n,this.type=df,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=ve(e),this.isInvisible=this.parameters.size==="invisible",V(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof t=="string"?document.getElementById(t):t;V(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new VE:new xE,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),n=t.getResponse(e);return n||new Promise(i=>{const s=o=>{o&&(this.tokenChangeListeners.delete(s),i(o))};this.tokenChangeListeners.add(s),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){V(!this.parameters.sitekey,this.auth,"argument-error"),V(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),V(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(n=>n(t)),typeof e=="function")e(t);else if(typeof e=="string"){const n=we()[e];typeof n=="function"&&n(t)}}}assertNotDestroyed(){V(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){V(Oc()&&!Kc(),this.auth,"internal-error"),await ME(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await xv(this.auth);V(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return V(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function ME(){let r=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}r=()=>e(),window.addEventListener("load",r)}).catch(e=>{throw r&&window.removeEventListener("load",r),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=Zt._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function FE(r,e,t){if(Ee(r.app))return Promise.reject(De(r));const n=ve(r),i=await Fo(n,e,$(t));return new Hc(i,s=>No(n,s))}async function jE(r,e,t){const n=$(r);await xo(!1,n,"phone");const i=await Fo(n.auth,e,$(t));return new Hc(i,s=>Gp(n,s))}async function UE(r,e,t){const n=$(r);if(Ee(n.auth.app))return Promise.reject(De(n.auth));const i=await Fo(n.auth,e,$(t));return new Hc(i,s=>Kp(n,s))}async function Fo(r,e,t){var n;const i=await t.verify();try{V(typeof i=="string",r,"argument-error"),V(t.type===df,r,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){const o=s.session;if("phoneNumber"in s)return V(o.type==="enroll",r,"internal-error"),(await iE(r,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{V(o.type==="signin",r,"internal-error");const c=((n=s.multiFactorHint)===null||n===void 0?void 0:n.uid)||s.multiFactorUid;return V(c,r,"missing-multi-factor-info"),(await TE(r,{mfaPendingCredential:o.credential,mfaEnrollmentId:c,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:o}=await mI(r,{phoneNumber:s.phoneNumber,recaptchaToken:i});return o}}finally{t._reset()}}async function BE(r,e){const t=$(r);if(Ee(t.auth.app))return Promise.reject(De(t.auth));await jc(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e){this.providerId=On.PROVIDER_ID,this.auth=ve(e)}verifyPhoneNumber(e,t){return Fo(this.auth,e,$(t))}static credential(e,t){return Zt._fromVerification(e,t)}static credentialFromResult(e){const t=e;return On.credentialFromTaggedObject(t)}static credentialFromError(e){return On.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:n}=e;return t&&n?Zt._fromTokenResponse(t,n):null}}On.PROVIDER_ID="phone";On.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qn(r,e){return e?bt(e):(V(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wc extends Fr{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return At(e,this._buildIdpRequest())}_linkToIdToken(e,t){return At(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return At(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function qE(r){return zp(r.auth,new Wc(r),r.bypassAuthState)}function $E(r){const{auth:e,user:t}=r;return V(t,e,"internal-error"),$p(t,new Wc(r),r.bypassAuthState)}async function zE(r){const{auth:e,user:t}=r;return V(t,e,"internal-error"),jc(t,new Wc(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hf{constructor(e,t,n,i,s=!1){this.auth=e,this.resolver=n,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:n,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return qE;case"linkViaPopup":case"linkViaRedirect":return zE;case"reauthViaPopup":case"reauthViaRedirect":return $E;default:Xe(this.auth,"internal-error")}}resolve(e){Rt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Rt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GE=new ts(2e3,1e4);async function KE(r,e,t){if(Ee(r.app))return Promise.reject(He(r,"operation-not-supported-in-this-environment"));const n=ve(r);Mr(r,e,Nt);const i=Qn(n,t);return new Tt(n,"signInViaPopup",e,i).executeNotNull()}async function HE(r,e,t){const n=$(r);if(Ee(n.auth.app))return Promise.reject(He(n.auth,"operation-not-supported-in-this-environment"));Mr(n.auth,e,Nt);const i=Qn(n.auth,t);return new Tt(n.auth,"reauthViaPopup",e,i,n).executeNotNull()}async function WE(r,e,t){const n=$(r);Mr(n.auth,e,Nt);const i=Qn(n.auth,t);return new Tt(n.auth,"linkViaPopup",e,i,n).executeNotNull()}class Tt extends hf{constructor(e,t,n,i,s){super(e,t,i,s),this.provider=n,this.authWindow=null,this.pollId=null,Tt.currentPopupAction&&Tt.currentPopupAction.cancel(),Tt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return V(e,this.auth,"internal-error"),e}async onExecution(){Rt(this.filter.length===1,"Popup operations only handle one event");const e=Lo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(He(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(He(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Tt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if(!((n=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||n===void 0)&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(He(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,GE.get())};e()}}Tt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QE="pendingRedirect",Ys=new Map;class JE extends hf{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Ys.get(this.auth._key());if(!e){try{const n=await YE(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}Ys.set(this.auth._key(),e)}return this.bypassAuthState||Ys.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function YE(r,e){const t=ff(e),n=pf(r);if(!await n._isAvailable())return!1;const i=await n._get(t)==="true";return await n._remove(t),i}async function Qc(r,e){return pf(r)._set(ff(e),"true")}function XE(r,e){Ys.set(r._key(),e)}function pf(r){return bt(r._redirectPersistence)}function ff(r){return Js(QE,r.config.apiKey,r.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZE(r,e,t){return eb(r,e,t)}async function eb(r,e,t){if(Ee(r.app))return Promise.reject(De(r));const n=ve(r);Mr(r,e,Nt),await n._initializationPromise;const i=Qn(n,t);return await Qc(i,n),i._openRedirect(n,e,"signInViaRedirect")}function tb(r,e,t){return nb(r,e,t)}async function nb(r,e,t){const n=$(r);if(Mr(n.auth,e,Nt),Ee(n.auth.app))return Promise.reject(De(n.auth));await n.auth._initializationPromise;const i=Qn(n.auth,t);await Qc(i,n.auth);const s=await gf(n);return i._openRedirect(n.auth,e,"reauthViaRedirect",s)}function rb(r,e,t){return ib(r,e,t)}async function ib(r,e,t){const n=$(r);Mr(n.auth,e,Nt),await n.auth._initializationPromise;const i=Qn(n.auth,t);await xo(!1,n,e.providerId),await Qc(i,n.auth);const s=await gf(n);return i._openRedirect(n.auth,e,"linkViaRedirect",s)}async function sb(r,e){return await ve(r)._initializationPromise,mf(r,e,!1)}async function mf(r,e,t=!1){if(Ee(r.app))return Promise.reject(De(r));const n=ve(r),i=Qn(n,e),o=await new JE(n,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}async function gf(r){const e=Lo(`${r.uid}:::`);return r._redirectEventId=e,await r.auth._setRedirectUser(r),await r.auth._persistUserIfCurrent(r),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ob=10*60*1e3;class ab{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!cb(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!_f(e)){const i=((n=e.error.code)===null||n===void 0?void 0:n.split("auth/")[1])||"internal-error";t.onError(He(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ob&&this.cachedEventUids.clear(),this.cachedEventUids.has(Td(e))}saveEventToCache(e){this.cachedEventUids.add(Td(e)),this.lastProcessedEventTime=Date.now()}}function Td(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function _f({type:r,error:e}){return r==="unknown"&&e?.code==="auth/no-auth-event"}function cb(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return _f(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lb(r,e={}){return de(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ub=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,db=/^https?/;async function hb(r){if(r.config.emulator)return;const{authorizedDomains:e}=await lb(r);for(const t of e)try{if(pb(t))return}catch{}Xe(r,"unauthorized-domain")}function pb(r){const e=Fi(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!db.test(t))return!1;if(ub.test(r))return n===r;const i=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fb=new ts(3e4,6e4);function wd(){const r=we().___jsl;if(r?.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function mb(r){return new Promise((e,t)=>{var n,i,s;function o(){wd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{wd(),t(He(r,"network-request-failed"))},timeout:fb.get()})}if(!((i=(n=we().gapi)===null||n===void 0?void 0:n.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=we().gapi)===null||s===void 0)&&s.load)o();else{const c=Vp("iframefcb");return we()[c]=()=>{gapi.load?o():t(He(r,"network-request-failed"))},Fc(`${Yv()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw Xs=null,e})}let Xs=null;function gb(r){return Xs=Xs||mb(r),Xs}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _b=new ts(5e3,15e3),yb="__/auth/iframe",vb="emulator/auth/iframe",Ib={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Eb=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function bb(r){const e=r.config;V(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?Lc(e,vb):`https://${r.config.authDomain}/${yb}`,n={apiKey:e.apiKey,appName:r.name,v:Lr},i=Eb.get(r.config.apiHost);i&&(n.eid=i);const s=r._getFrameworks();return s.length&&(n.fw=s.join(",")),`${t}?${Vr(n).slice(1)}`}async function Tb(r){const e=await gb(r),t=we().gapi;return V(t,r,"internal-error"),e.open({where:document.body,url:bb(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Ib,dontclear:!0},n=>new Promise(async(i,s)=>{await n.restyle({setHideOnLeave:!1});const o=He(r,"network-request-failed"),c=we().setTimeout(()=>{s(o)},_b.get());function l(){we().clearTimeout(c),i(n)}n.ping(l).then(l,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wb={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ab=500,Pb=600,Rb="_blank",Sb="http://localhost";class Ad{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Cb(r,e,t,n=Ab,i=Pb){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const l=Object.assign(Object.assign({},wb),{width:n.toString(),height:i.toString(),top:s,left:o}),u=Ae().toLowerCase();t&&(c=Rp(u)?Rb:t),Ap(u)&&(e=e||Sb,l.scrollbars="yes");const p=Object.entries(l).reduce((g,[I,D])=>`${g}${I}=${D},`,"");if(Bv(u)&&c!=="_self")return Db(e||"",c),new Ad(null);const f=window.open(e||"",c,p);V(f,r,"popup-blocked");try{f.focus()}catch{}return new Ad(f)}function Db(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kb="__/auth/handler",xb="emulator/auth/handler",Nb=encodeURIComponent("fac");async function Pd(r,e,t,n,i,s){V(r.config.authDomain,r,"auth-domain-config-required"),V(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:Lr,eventId:i};if(e instanceof Nt){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",sy(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,f]of Object.entries({}))o[p]=f}if(e instanceof Ur){const p=e.getScopes().filter(f=>f!=="");p.length>0&&(o.scopes=p.join(","))}r.tenantId&&(o.tid=r.tenantId);const c=o;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const l=await r._getAppCheckToken(),u=l?`#${Nb}=${encodeURIComponent(l)}`:"";return`${Vb(r)}?${Vr(c).slice(1)}${u}`}function Vb({config:r}){return r.emulator?Lc(r,xb):`https://${r.authDomain}/${kb}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ba="webStorageSupport";class Ob{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Gc,this._completeRedirectFn=mf,this._overrideRedirectResult=XE}async _openPopup(e,t,n,i){var s;Rt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await Pd(e,t,n,Fi(),i);return Cb(e,o,Lo())}async _openRedirect(e,t,n,i){await this._originValidation(e);const s=await Pd(e,t,n,Fi(),i);return fE(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Rt(s,"If manager is not set, promise should be"),s)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Tb(e),n=new ab(e);return t.register("authEvent",i=>(V(i?.authEvent,e,"invalid-auth-event"),{status:n.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ba,{type:Ba},i=>{var s;const o=(s=i?.[0])===null||s===void 0?void 0:s[Ba];o!==void 0&&t(!!o),Xe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=hb(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return xp()||Pp()||Mc()}}const yf=Ob;class vf{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return ot("unexpected MultiFactorSessionType")}}}class Jc extends vf{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Jc(e)}_finalizeEnroll(e,t,n){return sE(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return wE(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class If{constructor(){}static assertion(e){return Jc._fromCredential(e)}}If.FACTOR_ID="phone";class Ef{static assertionForEnrollment(e,t){return qi._fromSecret(e,t)}static assertionForSignIn(e,t){return qi._fromEnrollmentId(e,t)}static async generateSecret(e){var t;const n=e;V(typeof((t=n.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");const i=await oE(n.user.auth,{idToken:n.credential,totpEnrollmentInfo:{}});return jo._fromStartTotpMfaEnrollmentResponse(i,n.user.auth)}}Ef.FACTOR_ID="totp";class qi extends vf{constructor(e,t,n){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(e,t){return new qi(t,void 0,e)}static _fromEnrollmentId(e,t){return new qi(t,e)}async _finalizeEnroll(e,t,n){return V(typeof this.secret<"u",e,"argument-error"),aE(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){V(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");const n={verificationCode:this.otp};return AE(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n})}}class jo{constructor(e,t,n,i,s,o,c){this.sessionInfo=o,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new jo(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var n;let i=!1;return(Us(e)||Us(t))&&(i=!0),i&&(Us(e)&&(e=((n=this.auth.currentUser)===null||n===void 0?void 0:n.email)||"unknownuser"),Us(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function Us(r){return typeof r>"u"||r?.length===0}var Rd="@firebase/auth",Sd="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lb{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e(n?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){V(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mb(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Fb(r){Fn(new rn("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;V(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const l={apiKey:o,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Np(r)},u=new Hv(n,i,s,l);return tI(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Fn(new rn("auth-internal",e=>{const t=ve(e.getProvider("auth").getImmediate());return(n=>new Lb(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),lt(Rd,Sd,Mb(r)),lt(Rd,Sd,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jb=5*60,Ub=ip("authIdTokenMaxAge")||jb;let Cd=null;const Bb=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>Ub)return;const i=t?.token;Cd!==i&&(Cd=i,await fetch(r,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function bf(r=kc()){const e=Or(r,"auth");if(e.isInitialized())return e.getImmediate();const t=Lp(r,{popupRedirectResolver:yf,persistence:[uf,sf,Gc]}),n=ip("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(n,location.origin);if(location.origin===s.origin){const o=Bb(s.toString());Zp(t,o,()=>o(t.currentUser)),Xp(t,c=>o(c))}}const i=tp("auth");return i&&Mp(t,`http://${i}`),t}function qb(){var r,e;return(e=(r=document.getElementsByTagName("head"))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:document}Wv({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=i=>{const s=He("internal-error");s.customData=i,t(s)},n.type="text/javascript",n.charset="UTF-8",qb().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Fb("Browser");const $b=Object.freeze(Object.defineProperty({__proto__:null,ActionCodeOperation:Ev,ActionCodeURL:jr,AuthCredential:Fr,AuthErrorCodes:wv,EmailAuthCredential:_r,EmailAuthProvider:fn,FacebookAuthProvider:_t,FactorId:_v,GithubAuthProvider:vt,GoogleAuthProvider:yt,OAuthCredential:ht,OAuthProvider:Di,OperationType:Iv,PhoneAuthCredential:Zt,PhoneAuthProvider:On,PhoneMultiFactorGenerator:If,ProviderId:yv,RecaptchaVerifier:LE,SAMLAuthProvider:ho,SignInMethod:vv,TotpMultiFactorGenerator:Ef,TotpSecret:jo,TwitterAuthProvider:It,applyActionCode:kI,beforeAuthStateChanged:Zp,browserLocalPersistence:sf,browserPopupRedirectResolver:yf,browserSessionPersistence:Gc,checkActionCode:Hp,confirmPasswordReset:DI,connectAuthEmulator:Mp,createUserWithEmailAndPassword:Wp,debugErrorMap:Tv,deleteUser:nE,fetchSignInMethodsForEmail:MI,getAdditionalUserInfo:QI,getAuth:bf,getIdToken:Ov,getIdTokenResult:Ep,getMultiFactorResolver:rE,getRedirectResult:sb,inMemoryPersistence:rc,indexedDBLocalPersistence:uf,initializeAuth:Lp,initializeRecaptchaConfig:YI,isSignInWithEmailLink:VI,linkWithCredential:Gp,linkWithPhoneNumber:jE,linkWithPopup:WE,linkWithRedirect:rb,multiFactor:lE,onAuthStateChanged:ef,onIdTokenChanged:Xp,parseActionCodeURL:bI,prodErrorMap:pp,reauthenticateWithCredential:Kp,reauthenticateWithPhoneNumber:UE,reauthenticateWithPopup:HE,reauthenticateWithRedirect:tb,reload:bp,revokeAccessToken:tE,sendEmailVerification:FI,sendPasswordResetEmail:CI,sendSignInLinkToEmail:NI,setPersistence:JI,signInAnonymously:AI,signInWithCredential:No,signInWithCustomToken:SI,signInWithEmailAndPassword:Qp,signInWithEmailLink:OI,signInWithPhoneNumber:FE,signInWithPopup:KE,signInWithRedirect:ZE,signOut:tf,unlink:PI,updateCurrentUser:eE,updateEmail:qI,updatePassword:$I,updatePhoneNumber:BE,updateProfile:BI,useDeviceLanguage:ZI,validatePassword:XI,verifyBeforeUpdateEmail:jI,verifyPasswordResetCode:xI},Symbol.toStringTag,{value:"Module"}));var Dd=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ln,Tf;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,_){function y(){}y.prototype=_.prototype,E.D=_.prototype,E.prototype=new y,E.prototype.constructor=E,E.C=function(b,T,P){for(var v=Array(arguments.length-2),ft=2;ft<arguments.length;ft++)v[ft-2]=arguments[ft];return _.prototype[T].apply(b,v)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,_,y){y||(y=0);var b=Array(16);if(typeof _=="string")for(var T=0;16>T;++T)b[T]=_.charCodeAt(y++)|_.charCodeAt(y++)<<8|_.charCodeAt(y++)<<16|_.charCodeAt(y++)<<24;else for(T=0;16>T;++T)b[T]=_[y++]|_[y++]<<8|_[y++]<<16|_[y++]<<24;_=E.g[0],y=E.g[1],T=E.g[2];var P=E.g[3],v=_+(P^y&(T^P))+b[0]+3614090360&4294967295;_=y+(v<<7&4294967295|v>>>25),v=P+(T^_&(y^T))+b[1]+3905402710&4294967295,P=_+(v<<12&4294967295|v>>>20),v=T+(y^P&(_^y))+b[2]+606105819&4294967295,T=P+(v<<17&4294967295|v>>>15),v=y+(_^T&(P^_))+b[3]+3250441966&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(P^y&(T^P))+b[4]+4118548399&4294967295,_=y+(v<<7&4294967295|v>>>25),v=P+(T^_&(y^T))+b[5]+1200080426&4294967295,P=_+(v<<12&4294967295|v>>>20),v=T+(y^P&(_^y))+b[6]+2821735955&4294967295,T=P+(v<<17&4294967295|v>>>15),v=y+(_^T&(P^_))+b[7]+4249261313&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(P^y&(T^P))+b[8]+1770035416&4294967295,_=y+(v<<7&4294967295|v>>>25),v=P+(T^_&(y^T))+b[9]+2336552879&4294967295,P=_+(v<<12&4294967295|v>>>20),v=T+(y^P&(_^y))+b[10]+4294925233&4294967295,T=P+(v<<17&4294967295|v>>>15),v=y+(_^T&(P^_))+b[11]+2304563134&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(P^y&(T^P))+b[12]+1804603682&4294967295,_=y+(v<<7&4294967295|v>>>25),v=P+(T^_&(y^T))+b[13]+4254626195&4294967295,P=_+(v<<12&4294967295|v>>>20),v=T+(y^P&(_^y))+b[14]+2792965006&4294967295,T=P+(v<<17&4294967295|v>>>15),v=y+(_^T&(P^_))+b[15]+1236535329&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(T^P&(y^T))+b[1]+4129170786&4294967295,_=y+(v<<5&4294967295|v>>>27),v=P+(y^T&(_^y))+b[6]+3225465664&4294967295,P=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(P^_))+b[11]+643717713&4294967295,T=P+(v<<14&4294967295|v>>>18),v=y+(P^_&(T^P))+b[0]+3921069994&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(T^P&(y^T))+b[5]+3593408605&4294967295,_=y+(v<<5&4294967295|v>>>27),v=P+(y^T&(_^y))+b[10]+38016083&4294967295,P=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(P^_))+b[15]+3634488961&4294967295,T=P+(v<<14&4294967295|v>>>18),v=y+(P^_&(T^P))+b[4]+3889429448&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(T^P&(y^T))+b[9]+568446438&4294967295,_=y+(v<<5&4294967295|v>>>27),v=P+(y^T&(_^y))+b[14]+3275163606&4294967295,P=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(P^_))+b[3]+4107603335&4294967295,T=P+(v<<14&4294967295|v>>>18),v=y+(P^_&(T^P))+b[8]+1163531501&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(T^P&(y^T))+b[13]+2850285829&4294967295,_=y+(v<<5&4294967295|v>>>27),v=P+(y^T&(_^y))+b[2]+4243563512&4294967295,P=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(P^_))+b[7]+1735328473&4294967295,T=P+(v<<14&4294967295|v>>>18),v=y+(P^_&(T^P))+b[12]+2368359562&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(y^T^P)+b[5]+4294588738&4294967295,_=y+(v<<4&4294967295|v>>>28),v=P+(_^y^T)+b[8]+2272392833&4294967295,P=_+(v<<11&4294967295|v>>>21),v=T+(P^_^y)+b[11]+1839030562&4294967295,T=P+(v<<16&4294967295|v>>>16),v=y+(T^P^_)+b[14]+4259657740&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(y^T^P)+b[1]+2763975236&4294967295,_=y+(v<<4&4294967295|v>>>28),v=P+(_^y^T)+b[4]+1272893353&4294967295,P=_+(v<<11&4294967295|v>>>21),v=T+(P^_^y)+b[7]+4139469664&4294967295,T=P+(v<<16&4294967295|v>>>16),v=y+(T^P^_)+b[10]+3200236656&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(y^T^P)+b[13]+681279174&4294967295,_=y+(v<<4&4294967295|v>>>28),v=P+(_^y^T)+b[0]+3936430074&4294967295,P=_+(v<<11&4294967295|v>>>21),v=T+(P^_^y)+b[3]+3572445317&4294967295,T=P+(v<<16&4294967295|v>>>16),v=y+(T^P^_)+b[6]+76029189&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(y^T^P)+b[9]+3654602809&4294967295,_=y+(v<<4&4294967295|v>>>28),v=P+(_^y^T)+b[12]+3873151461&4294967295,P=_+(v<<11&4294967295|v>>>21),v=T+(P^_^y)+b[15]+530742520&4294967295,T=P+(v<<16&4294967295|v>>>16),v=y+(T^P^_)+b[2]+3299628645&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(T^(y|~P))+b[0]+4096336452&4294967295,_=y+(v<<6&4294967295|v>>>26),v=P+(y^(_|~T))+b[7]+1126891415&4294967295,P=_+(v<<10&4294967295|v>>>22),v=T+(_^(P|~y))+b[14]+2878612391&4294967295,T=P+(v<<15&4294967295|v>>>17),v=y+(P^(T|~_))+b[5]+4237533241&4294967295,y=T+(v<<21&4294967295|v>>>11),v=_+(T^(y|~P))+b[12]+1700485571&4294967295,_=y+(v<<6&4294967295|v>>>26),v=P+(y^(_|~T))+b[3]+2399980690&4294967295,P=_+(v<<10&4294967295|v>>>22),v=T+(_^(P|~y))+b[10]+4293915773&4294967295,T=P+(v<<15&4294967295|v>>>17),v=y+(P^(T|~_))+b[1]+2240044497&4294967295,y=T+(v<<21&4294967295|v>>>11),v=_+(T^(y|~P))+b[8]+1873313359&4294967295,_=y+(v<<6&4294967295|v>>>26),v=P+(y^(_|~T))+b[15]+4264355552&4294967295,P=_+(v<<10&4294967295|v>>>22),v=T+(_^(P|~y))+b[6]+2734768916&4294967295,T=P+(v<<15&4294967295|v>>>17),v=y+(P^(T|~_))+b[13]+1309151649&4294967295,y=T+(v<<21&4294967295|v>>>11),v=_+(T^(y|~P))+b[4]+4149444226&4294967295,_=y+(v<<6&4294967295|v>>>26),v=P+(y^(_|~T))+b[11]+3174756917&4294967295,P=_+(v<<10&4294967295|v>>>22),v=T+(_^(P|~y))+b[2]+718787259&4294967295,T=P+(v<<15&4294967295|v>>>17),v=y+(P^(T|~_))+b[9]+3951481745&4294967295,E.g[0]=E.g[0]+_&4294967295,E.g[1]=E.g[1]+(T+(v<<21&4294967295|v>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+P&4294967295}n.prototype.u=function(E,_){_===void 0&&(_=E.length);for(var y=_-this.blockSize,b=this.B,T=this.h,P=0;P<_;){if(T==0)for(;P<=y;)i(this,E,P),P+=this.blockSize;if(typeof E=="string"){for(;P<_;)if(b[T++]=E.charCodeAt(P++),T==this.blockSize){i(this,b),T=0;break}}else for(;P<_;)if(b[T++]=E[P++],T==this.blockSize){i(this,b),T=0;break}}this.h=T,this.o+=_},n.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var _=1;_<E.length-8;++_)E[_]=0;var y=8*this.o;for(_=E.length-8;_<E.length;++_)E[_]=y&255,y/=256;for(this.u(E),E=Array(16),_=y=0;4>_;++_)for(var b=0;32>b;b+=8)E[y++]=this.g[_]>>>b&255;return E};function s(E,_){var y=c;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=_(E)}function o(E,_){this.h=_;for(var y=[],b=!0,T=E.length-1;0<=T;T--){var P=E[T]|0;b&&P==_||(y[T]=P,b=!1)}this.g=y}var c={};function l(E){return-128<=E&&128>E?s(E,function(_){return new o([_|0],0>_?-1:0)}):new o([E|0],0>E?-1:0)}function u(E){if(isNaN(E)||!isFinite(E))return f;if(0>E)return S(u(-E));for(var _=[],y=1,b=0;E>=y;b++)_[b]=E/y|0,y*=4294967296;return new o(_,0)}function p(E,_){if(E.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(E.charAt(0)=="-")return S(p(E.substring(1),_));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=u(Math.pow(_,8)),b=f,T=0;T<E.length;T+=8){var P=Math.min(8,E.length-T),v=parseInt(E.substring(T,T+P),_);8>P?(P=u(Math.pow(_,P)),b=b.j(P).add(u(v))):(b=b.j(y),b=b.add(u(v)))}return b}var f=l(0),g=l(1),I=l(16777216);r=o.prototype,r.m=function(){if(k(this))return-S(this).m();for(var E=0,_=1,y=0;y<this.g.length;y++){var b=this.i(y);E+=(0<=b?b:4294967296+b)*_,_*=4294967296}return E},r.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(D(this))return"0";if(k(this))return"-"+S(this).toString(E);for(var _=u(Math.pow(E,6)),y=this,b="";;){var T=G(y,_).g;y=F(y,T.j(_));var P=((0<y.g.length?y.g[0]:y.h)>>>0).toString(E);if(y=T,D(y))return P+b;for(;6>P.length;)P="0"+P;b=P+b}},r.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function D(E){if(E.h!=0)return!1;for(var _=0;_<E.g.length;_++)if(E.g[_]!=0)return!1;return!0}function k(E){return E.h==-1}r.l=function(E){return E=F(this,E),k(E)?-1:D(E)?0:1};function S(E){for(var _=E.g.length,y=[],b=0;b<_;b++)y[b]=~E.g[b];return new o(y,~E.h).add(g)}r.abs=function(){return k(this)?S(this):this},r.add=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],b=0,T=0;T<=_;T++){var P=b+(this.i(T)&65535)+(E.i(T)&65535),v=(P>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);b=v>>>16,P&=65535,v&=65535,y[T]=v<<16|P}return new o(y,y[y.length-1]&-2147483648?-1:0)};function F(E,_){return E.add(S(_))}r.j=function(E){if(D(this)||D(E))return f;if(k(this))return k(E)?S(this).j(S(E)):S(S(this).j(E));if(k(E))return S(this.j(S(E)));if(0>this.l(I)&&0>E.l(I))return u(this.m()*E.m());for(var _=this.g.length+E.g.length,y=[],b=0;b<2*_;b++)y[b]=0;for(b=0;b<this.g.length;b++)for(var T=0;T<E.g.length;T++){var P=this.i(b)>>>16,v=this.i(b)&65535,ft=E.i(T)>>>16,Zr=E.i(T)&65535;y[2*b+2*T]+=v*Zr,U(y,2*b+2*T),y[2*b+2*T+1]+=P*Zr,U(y,2*b+2*T+1),y[2*b+2*T+1]+=v*ft,U(y,2*b+2*T+1),y[2*b+2*T+2]+=P*ft,U(y,2*b+2*T+2)}for(b=0;b<_;b++)y[b]=y[2*b+1]<<16|y[2*b];for(b=_;b<2*_;b++)y[b]=0;return new o(y,0)};function U(E,_){for(;(E[_]&65535)!=E[_];)E[_+1]+=E[_]>>>16,E[_]&=65535,_++}function B(E,_){this.g=E,this.h=_}function G(E,_){if(D(_))throw Error("division by zero");if(D(E))return new B(f,f);if(k(E))return _=G(S(E),_),new B(S(_.g),S(_.h));if(k(_))return _=G(E,S(_)),new B(S(_.g),_.h);if(30<E.g.length){if(k(E)||k(_))throw Error("slowDivide_ only works with positive integers.");for(var y=g,b=_;0>=b.l(E);)y=J(y),b=J(b);var T=K(y,1),P=K(b,1);for(b=K(b,2),y=K(y,2);!D(b);){var v=P.add(b);0>=v.l(E)&&(T=T.add(y),P=v),b=K(b,1),y=K(y,1)}return _=F(E,T.j(_)),new B(T,_)}for(T=f;0<=E.l(_);){for(y=Math.max(1,Math.floor(E.m()/_.m())),b=Math.ceil(Math.log(y)/Math.LN2),b=48>=b?1:Math.pow(2,b-48),P=u(y),v=P.j(_);k(v)||0<v.l(E);)y-=b,P=u(y),v=P.j(_);D(P)&&(P=g),T=T.add(P),E=F(E,v)}return new B(T,E)}r.A=function(E){return G(this,E).h},r.and=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],b=0;b<_;b++)y[b]=this.i(b)&E.i(b);return new o(y,this.h&E.h)},r.or=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],b=0;b<_;b++)y[b]=this.i(b)|E.i(b);return new o(y,this.h|E.h)},r.xor=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],b=0;b<_;b++)y[b]=this.i(b)^E.i(b);return new o(y,this.h^E.h)};function J(E){for(var _=E.g.length+1,y=[],b=0;b<_;b++)y[b]=E.i(b)<<1|E.i(b-1)>>>31;return new o(y,E.h)}function K(E,_){var y=_>>5;_%=32;for(var b=E.g.length-y,T=[],P=0;P<b;P++)T[P]=0<_?E.i(P+y)>>>_|E.i(P+y+1)<<32-_:E.i(P+y);return new o(T,E.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,Tf=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=p,Ln=o}).apply(typeof Dd<"u"?Dd:typeof self<"u"?self:typeof window<"u"?window:{});var Bs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var wf,wi,Af,Zs,sc,Pf,Rf,Sf;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,d,h){return a==Array.prototype||a==Object.prototype||(a[d]=h.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Bs=="object"&&Bs];for(var d=0;d<a.length;++d){var h=a[d];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var n=t(this);function i(a,d){if(d)e:{var h=n;a=a.split(".");for(var m=0;m<a.length-1;m++){var A=a[m];if(!(A in h))break e;h=h[A]}a=a[a.length-1],m=h[a],d=d(m),d!=m&&d!=null&&e(h,a,{configurable:!0,writable:!0,value:d})}}function s(a,d){a instanceof String&&(a+="");var h=0,m=!1,A={next:function(){if(!m&&h<a.length){var C=h++;return{value:d(C,a[C]),done:!1}}return m=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}i("Array.prototype.values",function(a){return a||function(){return s(this,function(d,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function l(a){var d=typeof a;return d=d!="object"?d:a?Array.isArray(a)?"array":d:"null",d=="array"||d=="object"&&typeof a.length=="number"}function u(a){var d=typeof a;return d=="object"&&a!=null||d=="function"}function p(a,d,h){return a.call.apply(a.bind,arguments)}function f(a,d,h){if(!a)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,m),a.apply(d,A)}}return function(){return a.apply(d,arguments)}}function g(a,d,h){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:f,g.apply(null,arguments)}function I(a,d){var h=Array.prototype.slice.call(arguments,1);return function(){var m=h.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function D(a,d){function h(){}h.prototype=d.prototype,a.aa=d.prototype,a.prototype=new h,a.prototype.constructor=a,a.Qb=function(m,A,C){for(var L=Array(arguments.length-2),se=2;se<arguments.length;se++)L[se-2]=arguments[se];return d.prototype[A].apply(m,L)}}function k(a){const d=a.length;if(0<d){const h=Array(d);for(let m=0;m<d;m++)h[m]=a[m];return h}return[]}function S(a,d){for(let h=1;h<arguments.length;h++){const m=arguments[h];if(l(m)){const A=a.length||0,C=m.length||0;a.length=A+C;for(let L=0;L<C;L++)a[A+L]=m[L]}else a.push(m)}}class F{constructor(d,h){this.i=d,this.j=h,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function U(a){return/^[\s\xa0]*$/.test(a)}function B(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function G(a){return G[" "](a),a}G[" "]=function(){};var J=B().indexOf("Gecko")!=-1&&!(B().toLowerCase().indexOf("webkit")!=-1&&B().indexOf("Edge")==-1)&&!(B().indexOf("Trident")!=-1||B().indexOf("MSIE")!=-1)&&B().indexOf("Edge")==-1;function K(a,d,h){for(const m in a)d.call(h,a[m],m,a)}function E(a,d){for(const h in a)d.call(void 0,a[h],h,a)}function _(a){const d={};for(const h in a)d[h]=a[h];return d}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function b(a,d){let h,m;for(let A=1;A<arguments.length;A++){m=arguments[A];for(h in m)a[h]=m[h];for(let C=0;C<y.length;C++)h=y[C],Object.prototype.hasOwnProperty.call(m,h)&&(a[h]=m[h])}}function T(a){var d=1;a=a.split(":");const h=[];for(;0<d&&a.length;)h.push(a.shift()),d--;return a.length&&h.push(a.join(":")),h}function P(a){c.setTimeout(()=>{throw a},0)}function v(){var a=la;let d=null;return a.g&&(d=a.g,a.g=a.g.next,a.g||(a.h=null),d.next=null),d}class ft{constructor(){this.h=this.g=null}add(d,h){const m=Zr.get();m.set(d,h),this.h?this.h.next=m:this.g=m,this.h=m}}var Zr=new F(()=>new r_,a=>a.reset());class r_{constructor(){this.next=this.g=this.h=null}set(d,h){this.h=d,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let ei,ti=!1,la=new ft,eu=()=>{const a=c.Promise.resolve(void 0);ei=()=>{a.then(i_)}};var i_=()=>{for(var a;a=v();){try{a.h.call(a.g)}catch(h){P(h)}var d=Zr;d.j(a),100>d.h&&(d.h++,a.next=d.g,d.g=a)}ti=!1};function Ft(){this.s=this.s,this.C=this.C}Ft.prototype.s=!1,Ft.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ft.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Le(a,d){this.type=a,this.g=this.target=d,this.defaultPrevented=!1}Le.prototype.h=function(){this.defaultPrevented=!0};var s_=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,d=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const h=()=>{};c.addEventListener("test",h,d),c.removeEventListener("test",h,d)}catch{}return a}();function ni(a,d){if(Le.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var h=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=d,d=a.relatedTarget){if(J){e:{try{G(d.nodeName);var A=!0;break e}catch{}A=!1}A||(d=null)}}else h=="mouseover"?d=a.fromElement:h=="mouseout"&&(d=a.toElement);this.relatedTarget=d,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:o_[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&ni.aa.h.call(this)}}D(ni,Le);var o_={2:"touch",3:"pen",4:"mouse"};ni.prototype.h=function(){ni.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Is="closure_listenable_"+(1e6*Math.random()|0),a_=0;function c_(a,d,h,m,A){this.listener=a,this.proxy=null,this.src=d,this.type=h,this.capture=!!m,this.ha=A,this.key=++a_,this.da=this.fa=!1}function Es(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function bs(a){this.src=a,this.g={},this.h=0}bs.prototype.add=function(a,d,h,m,A){var C=a.toString();a=this.g[C],a||(a=this.g[C]=[],this.h++);var L=da(a,d,m,A);return-1<L?(d=a[L],h||(d.fa=!1)):(d=new c_(d,this.src,C,!!m,A),d.fa=h,a.push(d)),d};function ua(a,d){var h=d.type;if(h in a.g){var m=a.g[h],A=Array.prototype.indexOf.call(m,d,void 0),C;(C=0<=A)&&Array.prototype.splice.call(m,A,1),C&&(Es(d),a.g[h].length==0&&(delete a.g[h],a.h--))}}function da(a,d,h,m){for(var A=0;A<a.length;++A){var C=a[A];if(!C.da&&C.listener==d&&C.capture==!!h&&C.ha==m)return A}return-1}var ha="closure_lm_"+(1e6*Math.random()|0),pa={};function tu(a,d,h,m,A){if(Array.isArray(d)){for(var C=0;C<d.length;C++)tu(a,d[C],h,m,A);return null}return h=iu(h),a&&a[Is]?a.K(d,h,u(m)?!!m.capture:!1,A):l_(a,d,h,!1,m,A)}function l_(a,d,h,m,A,C){if(!d)throw Error("Invalid event type");var L=u(A)?!!A.capture:!!A,se=ma(a);if(se||(a[ha]=se=new bs(a)),h=se.add(d,h,m,L,C),h.proxy)return h;if(m=u_(),h.proxy=m,m.src=a,m.listener=h,a.addEventListener)s_||(A=L),A===void 0&&(A=!1),a.addEventListener(d.toString(),m,A);else if(a.attachEvent)a.attachEvent(ru(d.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return h}function u_(){function a(h){return d.call(a.src,a.listener,h)}const d=d_;return a}function nu(a,d,h,m,A){if(Array.isArray(d))for(var C=0;C<d.length;C++)nu(a,d[C],h,m,A);else m=u(m)?!!m.capture:!!m,h=iu(h),a&&a[Is]?(a=a.i,d=String(d).toString(),d in a.g&&(C=a.g[d],h=da(C,h,m,A),-1<h&&(Es(C[h]),Array.prototype.splice.call(C,h,1),C.length==0&&(delete a.g[d],a.h--)))):a&&(a=ma(a))&&(d=a.g[d.toString()],a=-1,d&&(a=da(d,h,m,A)),(h=-1<a?d[a]:null)&&fa(h))}function fa(a){if(typeof a!="number"&&a&&!a.da){var d=a.src;if(d&&d[Is])ua(d.i,a);else{var h=a.type,m=a.proxy;d.removeEventListener?d.removeEventListener(h,m,a.capture):d.detachEvent?d.detachEvent(ru(h),m):d.addListener&&d.removeListener&&d.removeListener(m),(h=ma(d))?(ua(h,a),h.h==0&&(h.src=null,d[ha]=null)):Es(a)}}}function ru(a){return a in pa?pa[a]:pa[a]="on"+a}function d_(a,d){if(a.da)a=!0;else{d=new ni(d,this);var h=a.listener,m=a.ha||a.src;a.fa&&fa(a),a=h.call(m,d)}return a}function ma(a){return a=a[ha],a instanceof bs?a:null}var ga="__closure_events_fn_"+(1e9*Math.random()>>>0);function iu(a){return typeof a=="function"?a:(a[ga]||(a[ga]=function(d){return a.handleEvent(d)}),a[ga])}function Me(){Ft.call(this),this.i=new bs(this),this.M=this,this.F=null}D(Me,Ft),Me.prototype[Is]=!0,Me.prototype.removeEventListener=function(a,d,h,m){nu(this,a,d,h,m)};function Ge(a,d){var h,m=a.F;if(m)for(h=[];m;m=m.F)h.push(m);if(a=a.M,m=d.type||d,typeof d=="string")d=new Le(d,a);else if(d instanceof Le)d.target=d.target||a;else{var A=d;d=new Le(m,a),b(d,A)}if(A=!0,h)for(var C=h.length-1;0<=C;C--){var L=d.g=h[C];A=Ts(L,m,!0,d)&&A}if(L=d.g=a,A=Ts(L,m,!0,d)&&A,A=Ts(L,m,!1,d)&&A,h)for(C=0;C<h.length;C++)L=d.g=h[C],A=Ts(L,m,!1,d)&&A}Me.prototype.N=function(){if(Me.aa.N.call(this),this.i){var a=this.i,d;for(d in a.g){for(var h=a.g[d],m=0;m<h.length;m++)Es(h[m]);delete a.g[d],a.h--}}this.F=null},Me.prototype.K=function(a,d,h,m){return this.i.add(String(a),d,!1,h,m)},Me.prototype.L=function(a,d,h,m){return this.i.add(String(a),d,!0,h,m)};function Ts(a,d,h,m){if(d=a.i.g[String(d)],!d)return!0;d=d.concat();for(var A=!0,C=0;C<d.length;++C){var L=d[C];if(L&&!L.da&&L.capture==h){var se=L.listener,Ne=L.ha||L.src;L.fa&&ua(a.i,L),A=se.call(Ne,m)!==!1&&A}}return A&&!m.defaultPrevented}function su(a,d,h){if(typeof a=="function")h&&(a=g(a,h));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:c.setTimeout(a,d||0)}function ou(a){a.g=su(()=>{a.g=null,a.i&&(a.i=!1,ou(a))},a.l);const d=a.h;a.h=null,a.m.apply(null,d)}class h_ extends Ft{constructor(d,h){super(),this.m=d,this.l=h,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:ou(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ri(a){Ft.call(this),this.h=a,this.g={}}D(ri,Ft);var au=[];function cu(a){K(a.g,function(d,h){this.g.hasOwnProperty(h)&&fa(d)},a),a.g={}}ri.prototype.N=function(){ri.aa.N.call(this),cu(this)},ri.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var _a=c.JSON.stringify,p_=c.JSON.parse,f_=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function ya(){}ya.prototype.h=null;function lu(a){return a.h||(a.h=a.i())}function uu(){}var ii={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function va(){Le.call(this,"d")}D(va,Le);function Ia(){Le.call(this,"c")}D(Ia,Le);var bn={},du=null;function ws(){return du=du||new Me}bn.La="serverreachability";function hu(a){Le.call(this,bn.La,a)}D(hu,Le);function si(a){const d=ws();Ge(d,new hu(d))}bn.STAT_EVENT="statevent";function pu(a,d){Le.call(this,bn.STAT_EVENT,a),this.stat=d}D(pu,Le);function Ke(a){const d=ws();Ge(d,new pu(d,a))}bn.Ma="timingevent";function fu(a,d){Le.call(this,bn.Ma,a),this.size=d}D(fu,Le);function oi(a,d){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},d)}function ai(){this.g=!0}ai.prototype.xa=function(){this.g=!1};function m_(a,d,h,m,A,C){a.info(function(){if(a.g)if(C)for(var L="",se=C.split("&"),Ne=0;Ne<se.length;Ne++){var te=se[Ne].split("=");if(1<te.length){var Fe=te[0];te=te[1];var je=Fe.split("_");L=2<=je.length&&je[1]=="type"?L+(Fe+"="+te+"&"):L+(Fe+"=redacted&")}}else L=null;else L=C;return"XMLHTTP REQ ("+m+") [attempt "+A+"]: "+d+`
`+h+`
`+L})}function g_(a,d,h,m,A,C,L){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+A+"]: "+d+`
`+h+`
`+C+" "+L})}function Zn(a,d,h,m){a.info(function(){return"XMLHTTP TEXT ("+d+"): "+y_(a,h)+(m?" "+m:"")})}function __(a,d){a.info(function(){return"TIMEOUT: "+d})}ai.prototype.info=function(){};function y_(a,d){if(!a.g)return d;if(!d)return null;try{var h=JSON.parse(d);if(h){for(a=0;a<h.length;a++)if(Array.isArray(h[a])){var m=h[a];if(!(2>m.length)){var A=m[1];if(Array.isArray(A)&&!(1>A.length)){var C=A[0];if(C!="noop"&&C!="stop"&&C!="close")for(var L=1;L<A.length;L++)A[L]=""}}}}return _a(h)}catch{return d}}var As={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},mu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ea;function Ps(){}D(Ps,ya),Ps.prototype.g=function(){return new XMLHttpRequest},Ps.prototype.i=function(){return{}},Ea=new Ps;function jt(a,d,h,m){this.j=a,this.i=d,this.l=h,this.R=m||1,this.U=new ri(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new gu}function gu(){this.i=null,this.g="",this.h=!1}var _u={},ba={};function Ta(a,d,h){a.L=1,a.v=Ds(mt(d)),a.m=h,a.P=!0,yu(a,null)}function yu(a,d){a.F=Date.now(),Rs(a),a.A=mt(a.v);var h=a.A,m=a.R;Array.isArray(m)||(m=[String(m)]),xu(h.i,"t",m),a.C=0,h=a.j.J,a.h=new gu,a.g=Ju(a.j,h?d:null,!a.m),0<a.O&&(a.M=new h_(g(a.Y,a,a.g),a.O)),d=a.U,h=a.g,m=a.ca;var A="readystatechange";Array.isArray(A)||(A&&(au[0]=A.toString()),A=au);for(var C=0;C<A.length;C++){var L=tu(h,A[C],m||d.handleEvent,!1,d.h||d);if(!L)break;d.g[L.key]=L}d=a.H?_(a.H):{},a.m?(a.u||(a.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,d)):(a.u="GET",a.g.ea(a.A,a.u,null,d)),si(),m_(a.i,a.u,a.A,a.l,a.R,a.m)}jt.prototype.ca=function(a){a=a.target;const d=this.M;d&&gt(a)==3?d.j():this.Y(a)},jt.prototype.Y=function(a){try{if(a==this.g)e:{const je=gt(this.g);var d=this.g.Ba();const nr=this.g.Z();if(!(3>je)&&(je!=3||this.g&&(this.h.h||this.g.oa()||ju(this.g)))){this.J||je!=4||d==7||(d==8||0>=nr?si(3):si(2)),wa(this);var h=this.g.Z();this.X=h;t:if(vu(this)){var m=ju(this.g);a="";var A=m.length,C=gt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Tn(this),ci(this);var L="";break t}this.h.i=new c.TextDecoder}for(d=0;d<A;d++)this.h.h=!0,a+=this.h.i.decode(m[d],{stream:!(C&&d==A-1)});m.length=0,this.h.g+=a,this.C=0,L=this.h.g}else L=this.g.oa();if(this.o=h==200,g_(this.i,this.u,this.A,this.l,this.R,je,h),this.o){if(this.T&&!this.K){t:{if(this.g){var se,Ne=this.g;if((se=Ne.g?Ne.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!U(se)){var te=se;break t}}te=null}if(h=te)Zn(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Aa(this,h);else{this.o=!1,this.s=3,Ke(12),Tn(this),ci(this);break e}}if(this.P){h=!0;let it;for(;!this.J&&this.C<L.length;)if(it=v_(this,L),it==ba){je==4&&(this.s=4,Ke(14),h=!1),Zn(this.i,this.l,null,"[Incomplete Response]");break}else if(it==_u){this.s=4,Ke(15),Zn(this.i,this.l,L,"[Invalid Chunk]"),h=!1;break}else Zn(this.i,this.l,it,null),Aa(this,it);if(vu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),je!=4||L.length!=0||this.h.h||(this.s=1,Ke(16),h=!1),this.o=this.o&&h,!h)Zn(this.i,this.l,L,"[Invalid Chunked Response]"),Tn(this),ci(this);else if(0<L.length&&!this.W){this.W=!0;var Fe=this.j;Fe.g==this&&Fe.ba&&!Fe.M&&(Fe.j.info("Great, no buffering proxy detected. Bytes received: "+L.length),ka(Fe),Fe.M=!0,Ke(11))}}else Zn(this.i,this.l,L,null),Aa(this,L);je==4&&Tn(this),this.o&&!this.J&&(je==4?Ku(this.j,this):(this.o=!1,Rs(this)))}else L_(this.g),h==400&&0<L.indexOf("Unknown SID")?(this.s=3,Ke(12)):(this.s=0,Ke(13)),Tn(this),ci(this)}}}catch{}finally{}};function vu(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function v_(a,d){var h=a.C,m=d.indexOf(`
`,h);return m==-1?ba:(h=Number(d.substring(h,m)),isNaN(h)?_u:(m+=1,m+h>d.length?ba:(d=d.slice(m,m+h),a.C=m+h,d)))}jt.prototype.cancel=function(){this.J=!0,Tn(this)};function Rs(a){a.S=Date.now()+a.I,Iu(a,a.I)}function Iu(a,d){if(a.B!=null)throw Error("WatchDog timer not null");a.B=oi(g(a.ba,a),d)}function wa(a){a.B&&(c.clearTimeout(a.B),a.B=null)}jt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(__(this.i,this.A),this.L!=2&&(si(),Ke(17)),Tn(this),this.s=2,ci(this)):Iu(this,this.S-a)};function ci(a){a.j.G==0||a.J||Ku(a.j,a)}function Tn(a){wa(a);var d=a.M;d&&typeof d.ma=="function"&&d.ma(),a.M=null,cu(a.U),a.g&&(d=a.g,a.g=null,d.abort(),d.ma())}function Aa(a,d){try{var h=a.j;if(h.G!=0&&(h.g==a||Pa(h.h,a))){if(!a.K&&Pa(h.h,a)&&h.G==3){try{var m=h.Da.g.parse(d)}catch{m=null}if(Array.isArray(m)&&m.length==3){var A=m;if(A[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<a.F)Ls(h),Vs(h);else break e;Da(h),Ke(18)}}else h.za=A[1],0<h.za-h.T&&37500>A[2]&&h.F&&h.v==0&&!h.C&&(h.C=oi(g(h.Za,h),6e3));if(1>=Tu(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else An(h,11)}else if((a.K||h.g==a)&&Ls(h),!U(d))for(A=h.Da.g.parse(d),d=0;d<A.length;d++){let te=A[d];if(h.T=te[0],te=te[1],h.G==2)if(te[0]=="c"){h.K=te[1],h.ia=te[2];const Fe=te[3];Fe!=null&&(h.la=Fe,h.j.info("VER="+h.la));const je=te[4];je!=null&&(h.Aa=je,h.j.info("SVER="+h.Aa));const nr=te[5];nr!=null&&typeof nr=="number"&&0<nr&&(m=1.5*nr,h.L=m,h.j.info("backChannelRequestTimeoutMs_="+m)),m=h;const it=a.g;if(it){const Fs=it.g?it.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Fs){var C=m.h;C.g||Fs.indexOf("spdy")==-1&&Fs.indexOf("quic")==-1&&Fs.indexOf("h2")==-1||(C.j=C.l,C.g=new Set,C.h&&(Ra(C,C.h),C.h=null))}if(m.D){const xa=it.g?it.g.getResponseHeader("X-HTTP-Session-Id"):null;xa&&(m.ya=xa,ae(m.I,m.D,xa))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-a.F,h.j.info("Handshake RTT: "+h.R+"ms")),m=h;var L=a;if(m.qa=Qu(m,m.J?m.ia:null,m.W),L.K){wu(m.h,L);var se=L,Ne=m.L;Ne&&(se.I=Ne),se.B&&(wa(se),Rs(se)),m.g=L}else zu(m);0<h.i.length&&Os(h)}else te[0]!="stop"&&te[0]!="close"||An(h,7);else h.G==3&&(te[0]=="stop"||te[0]=="close"?te[0]=="stop"?An(h,7):Ca(h):te[0]!="noop"&&h.l&&h.l.ta(te),h.v=0)}}si(4)}catch{}}var I_=class{constructor(a,d){this.g=a,this.map=d}};function Eu(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function bu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Tu(a){return a.h?1:a.g?a.g.size:0}function Pa(a,d){return a.h?a.h==d:a.g?a.g.has(d):!1}function Ra(a,d){a.g?a.g.add(d):a.h=d}function wu(a,d){a.h&&a.h==d?a.h=null:a.g&&a.g.has(d)&&a.g.delete(d)}Eu.prototype.cancel=function(){if(this.i=Au(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Au(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let d=a.i;for(const h of a.g.values())d=d.concat(h.D);return d}return k(a.i)}function E_(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var d=[],h=a.length,m=0;m<h;m++)d.push(a[m]);return d}d=[],h=0;for(m in a)d[h++]=a[m];return d}function b_(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var d=[];a=a.length;for(var h=0;h<a;h++)d.push(h);return d}d=[],h=0;for(const m in a)d[h++]=m;return d}}}function Pu(a,d){if(a.forEach&&typeof a.forEach=="function")a.forEach(d,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,d,void 0);else for(var h=b_(a),m=E_(a),A=m.length,C=0;C<A;C++)d.call(void 0,m[C],h&&h[C],a)}var Ru=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function T_(a,d){if(a){a=a.split("&");for(var h=0;h<a.length;h++){var m=a[h].indexOf("="),A=null;if(0<=m){var C=a[h].substring(0,m);A=a[h].substring(m+1)}else C=a[h];d(C,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function wn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof wn){this.h=a.h,Ss(this,a.j),this.o=a.o,this.g=a.g,Cs(this,a.s),this.l=a.l;var d=a.i,h=new di;h.i=d.i,d.g&&(h.g=new Map(d.g),h.h=d.h),Su(this,h),this.m=a.m}else a&&(d=String(a).match(Ru))?(this.h=!1,Ss(this,d[1]||"",!0),this.o=li(d[2]||""),this.g=li(d[3]||"",!0),Cs(this,d[4]),this.l=li(d[5]||"",!0),Su(this,d[6]||"",!0),this.m=li(d[7]||"")):(this.h=!1,this.i=new di(null,this.h))}wn.prototype.toString=function(){var a=[],d=this.j;d&&a.push(ui(d,Cu,!0),":");var h=this.g;return(h||d=="file")&&(a.push("//"),(d=this.o)&&a.push(ui(d,Cu,!0),"@"),a.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&a.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&a.push("/"),a.push(ui(h,h.charAt(0)=="/"?P_:A_,!0))),(h=this.i.toString())&&a.push("?",h),(h=this.m)&&a.push("#",ui(h,S_)),a.join("")};function mt(a){return new wn(a)}function Ss(a,d,h){a.j=h?li(d,!0):d,a.j&&(a.j=a.j.replace(/:$/,""))}function Cs(a,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);a.s=d}else a.s=null}function Su(a,d,h){d instanceof di?(a.i=d,C_(a.i,a.h)):(h||(d=ui(d,R_)),a.i=new di(d,a.h))}function ae(a,d,h){a.i.set(d,h)}function Ds(a){return ae(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function li(a,d){return a?d?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function ui(a,d,h){return typeof a=="string"?(a=encodeURI(a).replace(d,w_),h&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function w_(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Cu=/[#\/\?@]/g,A_=/[#\?:]/g,P_=/[#\?]/g,R_=/[#\?@]/g,S_=/#/g;function di(a,d){this.h=this.g=null,this.i=a||null,this.j=!!d}function Ut(a){a.g||(a.g=new Map,a.h=0,a.i&&T_(a.i,function(d,h){a.add(decodeURIComponent(d.replace(/\+/g," ")),h)}))}r=di.prototype,r.add=function(a,d){Ut(this),this.i=null,a=er(this,a);var h=this.g.get(a);return h||this.g.set(a,h=[]),h.push(d),this.h+=1,this};function Du(a,d){Ut(a),d=er(a,d),a.g.has(d)&&(a.i=null,a.h-=a.g.get(d).length,a.g.delete(d))}function ku(a,d){return Ut(a),d=er(a,d),a.g.has(d)}r.forEach=function(a,d){Ut(this),this.g.forEach(function(h,m){h.forEach(function(A){a.call(d,A,m,this)},this)},this)},r.na=function(){Ut(this);const a=Array.from(this.g.values()),d=Array.from(this.g.keys()),h=[];for(let m=0;m<d.length;m++){const A=a[m];for(let C=0;C<A.length;C++)h.push(d[m])}return h},r.V=function(a){Ut(this);let d=[];if(typeof a=="string")ku(this,a)&&(d=d.concat(this.g.get(er(this,a))));else{a=Array.from(this.g.values());for(let h=0;h<a.length;h++)d=d.concat(a[h])}return d},r.set=function(a,d){return Ut(this),this.i=null,a=er(this,a),ku(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[d]),this.h+=1,this},r.get=function(a,d){return a?(a=this.V(a),0<a.length?String(a[0]):d):d};function xu(a,d,h){Du(a,d),0<h.length&&(a.i=null,a.g.set(er(a,d),k(h)),a.h+=h.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],d=Array.from(this.g.keys());for(var h=0;h<d.length;h++){var m=d[h];const C=encodeURIComponent(String(m)),L=this.V(m);for(m=0;m<L.length;m++){var A=C;L[m]!==""&&(A+="="+encodeURIComponent(String(L[m]))),a.push(A)}}return this.i=a.join("&")};function er(a,d){return d=String(d),a.j&&(d=d.toLowerCase()),d}function C_(a,d){d&&!a.j&&(Ut(a),a.i=null,a.g.forEach(function(h,m){var A=m.toLowerCase();m!=A&&(Du(this,m),xu(this,A,h))},a)),a.j=d}function D_(a,d){const h=new ai;if(c.Image){const m=new Image;m.onload=I(Bt,h,"TestLoadImage: loaded",!0,d,m),m.onerror=I(Bt,h,"TestLoadImage: error",!1,d,m),m.onabort=I(Bt,h,"TestLoadImage: abort",!1,d,m),m.ontimeout=I(Bt,h,"TestLoadImage: timeout",!1,d,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else d(!1)}function k_(a,d){const h=new ai,m=new AbortController,A=setTimeout(()=>{m.abort(),Bt(h,"TestPingServer: timeout",!1,d)},1e4);fetch(a,{signal:m.signal}).then(C=>{clearTimeout(A),C.ok?Bt(h,"TestPingServer: ok",!0,d):Bt(h,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(A),Bt(h,"TestPingServer: error",!1,d)})}function Bt(a,d,h,m,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),m(h)}catch{}}function x_(){this.g=new f_}function N_(a,d,h){const m=h||"";try{Pu(a,function(A,C){let L=A;u(A)&&(L=_a(A)),d.push(m+C+"="+encodeURIComponent(L))})}catch(A){throw d.push(m+"type="+encodeURIComponent("_badmap")),A}}function ks(a){this.l=a.Ub||null,this.j=a.eb||!1}D(ks,ya),ks.prototype.g=function(){return new xs(this.l,this.j)},ks.prototype.i=function(a){return function(){return a}}({});function xs(a,d){Me.call(this),this.D=a,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(xs,Me),r=xs.prototype,r.open=function(a,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=d,this.readyState=1,pi(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(d.body=a),(this.D||c).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,hi(this)),this.readyState=0},r.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,pi(this)),this.g&&(this.readyState=3,pi(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Nu(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Nu(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}r.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var d=a.value?a.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!a.done}))&&(this.response=this.responseText+=d)}a.done?hi(this):pi(this),this.readyState==3&&Nu(this)}},r.Ra=function(a){this.g&&(this.response=this.responseText=a,hi(this))},r.Qa=function(a){this.g&&(this.response=a,hi(this))},r.ga=function(){this.g&&hi(this)};function hi(a){a.readyState=4,a.l=null,a.j=null,a.v=null,pi(a)}r.setRequestHeader=function(a,d){this.u.append(a,d)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],d=this.h.entries();for(var h=d.next();!h.done;)h=h.value,a.push(h[0]+": "+h[1]),h=d.next();return a.join(`\r
`)};function pi(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(xs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Vu(a){let d="";return K(a,function(h,m){d+=m,d+=":",d+=h,d+=`\r
`}),d}function Sa(a,d,h){e:{for(m in h){var m=!1;break e}m=!0}m||(h=Vu(h),typeof a=="string"?h!=null&&encodeURIComponent(String(h)):ae(a,d,h))}function _e(a){Me.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(_e,Me);var V_=/^https?$/i,O_=["POST","PUT"];r=_e.prototype,r.Ha=function(a){this.J=a},r.ea=function(a,d,h,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);d=d?d.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ea.g(),this.v=this.o?lu(this.o):lu(Ea),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(d,String(a),!0),this.B=!1}catch(C){Ou(this,C);return}if(a=h||"",h=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var A in m)h.set(A,m[A]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const C of m.keys())h.set(C,m.get(C));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(h.keys()).find(C=>C.toLowerCase()=="content-type"),A=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(O_,d,void 0))||m||A||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[C,L]of h)this.g.setRequestHeader(C,L);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Fu(this),this.u=!0,this.g.send(a),this.u=!1}catch(C){Ou(this,C)}};function Ou(a,d){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=d,a.m=5,Lu(a),Ns(a)}function Lu(a){a.A||(a.A=!0,Ge(a,"complete"),Ge(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Ge(this,"complete"),Ge(this,"abort"),Ns(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ns(this,!0)),_e.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Mu(this):this.bb())},r.bb=function(){Mu(this)};function Mu(a){if(a.h&&typeof o<"u"&&(!a.v[1]||gt(a)!=4||a.Z()!=2)){if(a.u&&gt(a)==4)su(a.Ea,0,a);else if(Ge(a,"readystatechange"),gt(a)==4){a.h=!1;try{const L=a.Z();e:switch(L){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var h;if(!(h=d)){var m;if(m=L===0){var A=String(a.D).match(Ru)[1]||null;!A&&c.self&&c.self.location&&(A=c.self.location.protocol.slice(0,-1)),m=!V_.test(A?A.toLowerCase():"")}h=m}if(h)Ge(a,"complete"),Ge(a,"success");else{a.m=6;try{var C=2<gt(a)?a.g.statusText:""}catch{C=""}a.l=C+" ["+a.Z()+"]",Lu(a)}}finally{Ns(a)}}}}function Ns(a,d){if(a.g){Fu(a);const h=a.g,m=a.v[0]?()=>{}:null;a.g=null,a.v=null,d||Ge(a,"ready");try{h.onreadystatechange=m}catch{}}}function Fu(a){a.I&&(c.clearTimeout(a.I),a.I=null)}r.isActive=function(){return!!this.g};function gt(a){return a.g?a.g.readyState:0}r.Z=function(){try{return 2<gt(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(a){if(this.g){var d=this.g.responseText;return a&&d.indexOf(a)==0&&(d=d.substring(a.length)),p_(d)}};function ju(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function L_(a){const d={};a=(a.g&&2<=gt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(U(a[m]))continue;var h=T(a[m]);const A=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const C=d[A]||[];d[A]=C,C.push(h)}E(d,function(m){return m.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function fi(a,d,h){return h&&h.internalChannelParams&&h.internalChannelParams[a]||d}function Uu(a){this.Aa=0,this.i=[],this.j=new ai,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=fi("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=fi("baseRetryDelayMs",5e3,a),this.cb=fi("retryDelaySeedMs",1e4,a),this.Wa=fi("forwardChannelMaxRetries",2,a),this.wa=fi("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Eu(a&&a.concurrentRequestLimit),this.Da=new x_,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Uu.prototype,r.la=8,r.G=1,r.connect=function(a,d,h,m){Ke(0),this.W=a,this.H=d||{},h&&m!==void 0&&(this.H.OSID=h,this.H.OAID=m),this.F=this.X,this.I=Qu(this,null,this.W),Os(this)};function Ca(a){if(Bu(a),a.G==3){var d=a.U++,h=mt(a.I);if(ae(h,"SID",a.K),ae(h,"RID",d),ae(h,"TYPE","terminate"),mi(a,h),d=new jt(a,a.j,d),d.L=2,d.v=Ds(mt(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(d.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=d.v,h=!0),h||(d.g=Ju(d.j,null),d.g.ea(d.v)),d.F=Date.now(),Rs(d)}Wu(a)}function Vs(a){a.g&&(ka(a),a.g.cancel(),a.g=null)}function Bu(a){Vs(a),a.u&&(c.clearTimeout(a.u),a.u=null),Ls(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function Os(a){if(!bu(a.h)&&!a.s){a.s=!0;var d=a.Ga;ei||eu(),ti||(ei(),ti=!0),la.add(d,a),a.B=0}}function M_(a,d){return Tu(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=d.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=oi(g(a.Ga,a,d),Hu(a,a.B)),a.B++,!0)}r.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const A=new jt(this,this.j,a);let C=this.o;if(this.S&&(C?(C=_(C),b(C,this.S)):C=this.S),this.m!==null||this.O||(A.H=C,C=null),this.P)e:{for(var d=0,h=0;h<this.i.length;h++){t:{var m=this.i[h];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(d+=m,4096<d){d=h;break e}if(d===4096||h===this.i.length-1){d=h+1;break e}}d=1e3}else d=1e3;d=$u(this,A,d),h=mt(this.I),ae(h,"RID",a),ae(h,"CVER",22),this.D&&ae(h,"X-HTTP-Session-Id",this.D),mi(this,h),C&&(this.O?d="headers="+encodeURIComponent(String(Vu(C)))+"&"+d:this.m&&Sa(h,this.m,C)),Ra(this.h,A),this.Ua&&ae(h,"TYPE","init"),this.P?(ae(h,"$req",d),ae(h,"SID","null"),A.T=!0,Ta(A,h,null)):Ta(A,h,d),this.G=2}}else this.G==3&&(a?qu(this,a):this.i.length==0||bu(this.h)||qu(this))};function qu(a,d){var h;d?h=d.l:h=a.U++;const m=mt(a.I);ae(m,"SID",a.K),ae(m,"RID",h),ae(m,"AID",a.T),mi(a,m),a.m&&a.o&&Sa(m,a.m,a.o),h=new jt(a,a.j,h,a.B+1),a.m===null&&(h.H=a.o),d&&(a.i=d.D.concat(a.i)),d=$u(a,h,1e3),h.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Ra(a.h,h),Ta(h,m,d)}function mi(a,d){a.H&&K(a.H,function(h,m){ae(d,m,h)}),a.l&&Pu({},function(h,m){ae(d,m,h)})}function $u(a,d,h){h=Math.min(a.i.length,h);var m=a.l?g(a.l.Na,a.l,a):null;e:{var A=a.i;let C=-1;for(;;){const L=["count="+h];C==-1?0<h?(C=A[0].g,L.push("ofs="+C)):C=0:L.push("ofs="+C);let se=!0;for(let Ne=0;Ne<h;Ne++){let te=A[Ne].g;const Fe=A[Ne].map;if(te-=C,0>te)C=Math.max(0,A[Ne].g-100),se=!1;else try{N_(Fe,L,"req"+te+"_")}catch{m&&m(Fe)}}if(se){m=L.join("&");break e}}}return a=a.i.splice(0,h),d.D=a,m}function zu(a){if(!a.g&&!a.u){a.Y=1;var d=a.Fa;ei||eu(),ti||(ei(),ti=!0),la.add(d,a),a.v=0}}function Da(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=oi(g(a.Fa,a),Hu(a,a.v)),a.v++,!0)}r.Fa=function(){if(this.u=null,Gu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=oi(g(this.ab,this),a)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ke(10),Vs(this),Gu(this))};function ka(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Gu(a){a.g=new jt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var d=mt(a.qa);ae(d,"RID","rpc"),ae(d,"SID",a.K),ae(d,"AID",a.T),ae(d,"CI",a.F?"0":"1"),!a.F&&a.ja&&ae(d,"TO",a.ja),ae(d,"TYPE","xmlhttp"),mi(a,d),a.m&&a.o&&Sa(d,a.m,a.o),a.L&&(a.g.I=a.L);var h=a.g;a=a.ia,h.L=1,h.v=Ds(mt(d)),h.m=null,h.P=!0,yu(h,a)}r.Za=function(){this.C!=null&&(this.C=null,Vs(this),Da(this),Ke(19))};function Ls(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function Ku(a,d){var h=null;if(a.g==d){Ls(a),ka(a),a.g=null;var m=2}else if(Pa(a.h,d))h=d.D,wu(a.h,d),m=1;else return;if(a.G!=0){if(d.o)if(m==1){h=d.m?d.m.length:0,d=Date.now()-d.F;var A=a.B;m=ws(),Ge(m,new fu(m,h)),Os(a)}else zu(a);else if(A=d.s,A==3||A==0&&0<d.X||!(m==1&&M_(a,d)||m==2&&Da(a)))switch(h&&0<h.length&&(d=a.h,d.i=d.i.concat(h)),A){case 1:An(a,5);break;case 4:An(a,10);break;case 3:An(a,6);break;default:An(a,2)}}}function Hu(a,d){let h=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(h*=2),h*d}function An(a,d){if(a.j.info("Error code "+d),d==2){var h=g(a.fb,a),m=a.Xa;const A=!m;m=new wn(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Ss(m,"https"),Ds(m),A?D_(m.toString(),h):k_(m.toString(),h)}else Ke(2);a.G=0,a.l&&a.l.sa(d),Wu(a),Bu(a)}r.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Ke(2)):(this.j.info("Failed to ping google.com"),Ke(1))};function Wu(a){if(a.G=0,a.ka=[],a.l){const d=Au(a.h);(d.length!=0||a.i.length!=0)&&(S(a.ka,d),S(a.ka,a.i),a.h.i.length=0,k(a.i),a.i.length=0),a.l.ra()}}function Qu(a,d,h){var m=h instanceof wn?mt(h):new wn(h);if(m.g!="")d&&(m.g=d+"."+m.g),Cs(m,m.s);else{var A=c.location;m=A.protocol,d=d?d+"."+A.hostname:A.hostname,A=+A.port;var C=new wn(null);m&&Ss(C,m),d&&(C.g=d),A&&Cs(C,A),h&&(C.l=h),m=C}return h=a.D,d=a.ya,h&&d&&ae(m,h,d),ae(m,"VER",a.la),mi(a,m),m}function Ju(a,d,h){if(d&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=a.Ca&&!a.pa?new _e(new ks({eb:h})):new _e(a.pa),d.Ha(a.J),d}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Yu(){}r=Yu.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function Ms(){}Ms.prototype.g=function(a,d){return new Ze(a,d)};function Ze(a,d){Me.call(this),this.g=new Uu(d),this.l=a,this.h=d&&d.messageUrlParams||null,a=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(a?a["X-WebChannel-Content-Type"]=d.messageContentType:a={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(a?a["X-WebChannel-Client-Profile"]=d.va:a={"X-WebChannel-Client-Profile":d.va}),this.g.S=a,(a=d&&d.Sb)&&!U(a)&&(this.g.m=a),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!U(d)&&(this.g.D=d,a=this.h,a!==null&&d in a&&(a=this.h,d in a&&delete a[d])),this.j=new tr(this)}D(Ze,Me),Ze.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ze.prototype.close=function(){Ca(this.g)},Ze.prototype.o=function(a){var d=this.g;if(typeof a=="string"){var h={};h.__data__=a,a=h}else this.u&&(h={},h.__data__=_a(a),a=h);d.i.push(new I_(d.Ya++,a)),d.G==3&&Os(d)},Ze.prototype.N=function(){this.g.l=null,delete this.j,Ca(this.g),delete this.g,Ze.aa.N.call(this)};function Xu(a){va.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var d=a.__sm__;if(d){e:{for(const h in d){a=h;break e}a=void 0}(this.i=a)&&(a=this.i,d=d!==null&&a in d?d[a]:void 0),this.data=d}else this.data=a}D(Xu,va);function Zu(){Ia.call(this),this.status=1}D(Zu,Ia);function tr(a){this.g=a}D(tr,Yu),tr.prototype.ua=function(){Ge(this.g,"a")},tr.prototype.ta=function(a){Ge(this.g,new Xu(a))},tr.prototype.sa=function(a){Ge(this.g,new Zu)},tr.prototype.ra=function(){Ge(this.g,"b")},Ms.prototype.createWebChannel=Ms.prototype.g,Ze.prototype.send=Ze.prototype.o,Ze.prototype.open=Ze.prototype.m,Ze.prototype.close=Ze.prototype.close,Sf=function(){return new Ms},Rf=function(){return ws()},Pf=bn,sc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},As.NO_ERROR=0,As.TIMEOUT=8,As.HTTP_ERROR=6,Zs=As,mu.COMPLETE="complete",Af=mu,uu.EventType=ii,ii.OPEN="a",ii.CLOSE="b",ii.ERROR="c",ii.MESSAGE="d",Me.prototype.listen=Me.prototype.K,wi=uu,_e.prototype.listenOnce=_e.prototype.L,_e.prototype.getLastError=_e.prototype.Ka,_e.prototype.getLastErrorCode=_e.prototype.Ba,_e.prototype.getStatus=_e.prototype.Z,_e.prototype.getResponseJson=_e.prototype.Oa,_e.prototype.getResponseText=_e.prototype.oa,_e.prototype.send=_e.prototype.ea,_e.prototype.setWithCredentials=_e.prototype.Ha,wf=_e}).apply(typeof Bs<"u"?Bs:typeof self<"u"?self:typeof window<"u"?window:{});const kd="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Se.UNAUTHENTICATED=new Se(null),Se.GOOGLE_CREDENTIALS=new Se("google-credentials-uid"),Se.FIRST_PARTY=new Se("first-party-uid"),Se.MOCK_USER=new Se("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Br="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sn=new Cc("@firebase/firestore");function ar(){return sn.logLevel}function zb(r){sn.setLogLevel(r)}function N(r,...e){if(sn.logLevel<=Y.DEBUG){const t=e.map(Yc);sn.debug(`Firestore (${Br}): ${r}`,...t)}}function Ie(r,...e){if(sn.logLevel<=Y.ERROR){const t=e.map(Yc);sn.error(`Firestore (${Br}): ${r}`,...t)}}function et(r,...e){if(sn.logLevel<=Y.WARN){const t=e.map(Yc);sn.warn(`Firestore (${Br}): ${r}`,...t)}}function Yc(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(r="Unexpected state"){const e=`FIRESTORE (${Br}) INTERNAL ASSERTION FAILED: `+r;throw Ie(e),new Error(e)}function q(r,e){r||j()}function Gb(r,e){r||j()}function O(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class x extends kt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Df{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Se.UNAUTHENTICATED))}shutdown(){}}class Kb{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Hb{constructor(e){this.t=e,this.currentUser=Se.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){q(this.o===void 0);let n=this.i;const i=l=>this.i!==n?(n=this.i,t(l)):Promise.resolve();let s=new ke;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new ke,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},c=l=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new ke)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(n=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(q(typeof n.accessToken=="string"),new Cf(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return q(e===null||typeof e=="string"),new Se(e)}}class Wb{constructor(e,t,n){this.l=e,this.h=t,this.P=n,this.type="FirstParty",this.user=Se.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Qb{constructor(e,t,n){this.l=e,this.h=t,this.P=n}getToken(){return Promise.resolve(new Wb(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Se.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class kf{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Jb{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){q(this.o===void 0);const n=s=>{s.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,N("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>n(s))};const i=s=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(q(typeof t.token=="string"),this.R=t.token,new kf(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class Yb{getToken(){return Promise.resolve(new kf(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xb(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const i=Xb(40);for(let s=0;s<i.length;++s)n.length<20&&i[s]<t&&(n+=e.charAt(i[s]%e.length))}return n}}function H(r,e){return r<e?-1:r>e?1:0}function yr(r,e,t){return r.length===e.length&&r.every((n,i)=>t(n,e[i]))}function xf(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new x(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new x(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new x(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new x(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return fe.fromMillis(Date.now())}static fromDate(e){return fe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new fe(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?H(this.nanoseconds,e.nanoseconds):H(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e){this.timestamp=e}static fromTimestamp(e){return new z(e)}static min(){return new z(new fe(0,0))}static max(){return new z(new fe(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e,t,n){t===void 0?t=0:t>e.length&&j(),n===void 0?n=e.length-t:n>e.length-t&&j(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return $i.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof $i?e.forEach(n=>{t.push(n)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let i=0;i<n;i++){const s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class X extends $i{construct(e,t,n){return new X(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new x(R.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(i=>i.length>0))}return new X(t)}static emptyPath(){return new X([])}}const Zb=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class le extends $i{construct(e,t,n){return new le(e,t,n)}static isValidIdentifier(e){return Zb.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),le.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new le(["__name__"])}static fromServerFormat(e){const t=[];let n="",i=0;const s=()=>{if(n.length===0)throw new x(R.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new x(R.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new x(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=l,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(n+=c,i++):(s(),i++)}if(s(),o)throw new x(R.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new le(t)}static emptyPath(){return new le([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.path=e}static fromPath(e){return new M(X.fromString(e))}static fromName(e){return new M(X.fromString(e).popFirst(5))}static empty(){return new M(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&X.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return X.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new M(new X(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e,t,n,i){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=i}}function oc(r){return r.fields.find(e=>e.kind===2)}function Sn(r){return r.fields.filter(e=>e.kind!==2)}function eT(r,e){let t=H(r.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let n=0;n<Math.min(r.fields.length,e.fields.length);++n)if(t=tT(r.fields[n],e.fields[n]),t!==0)return t;return H(r.fields.length,e.fields.length)}vr.UNKNOWN_ID=-1;class Mn{constructor(e,t){this.fieldPath=e,this.kind=t}}function tT(r,e){const t=le.comparator(r.fieldPath,e.fieldPath);return t!==0?t:H(r.kind,e.kind)}class Ir{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Ir(0,tt.min())}}function Nf(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,i=z.fromTimestamp(n===1e9?new fe(t+1,0):new fe(t,n));return new tt(i,M.empty(),e)}function Vf(r){return new tt(r.readTime,r.key,-1)}class tt{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new tt(z.min(),M.empty(),-1)}static max(){return new tt(z.max(),M.empty(),-1)}}function Zc(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=M.comparator(r.documentKey,e.documentKey),t!==0?t:H(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Of="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Lf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mn(r){if(r.code!==R.FAILED_PRECONDITION||r.message!==Of)throw r;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&j(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new w((n,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(n,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(n,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof w?t:w.resolve(t)}catch(t){return w.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):w.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):w.reject(t)}static resolve(e){return new w((t,n)=>{t(e)})}static reject(e){return new w((t,n)=>{n(e)})}static waitFor(e){return new w((t,n)=>{let i=0,s=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++s,o&&s===i&&t()},l=>n(l))}),o=!0,s===i&&t()})}static or(e){let t=w.resolve(!1);for(const n of e)t=t.next(i=>i?w.resolve(i):n());return t}static forEach(e,t){const n=[];return e.forEach((i,s)=>{n.push(t.call(this,i,s))}),this.waitFor(n)}static mapArray(e,t){return new w((n,i)=>{const s=e.length,o=new Array(s);let c=0;for(let l=0;l<s;l++){const u=l;t(e[u]).next(p=>{o[u]=p,++c,c===s&&n(o)},p=>i(p))}})}static doWhile(e,t){return new w((n,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):n()};s()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new ke,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new ki(e,t.error)):this.V.resolve()},this.transaction.onerror=n=>{const i=el(n.target.error);this.V.reject(new ki(e,i))}}static open(e,t,n,i){try{return new Uo(t,e.transaction(i,n))}catch(s){throw new ki(t,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(N("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new rT(t)}}class ut{constructor(e,t,n){this.name=e,this.version=t,this.p=n,ut.S(Ae())===12.2&&Ie("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return N("SimpleDb","Removing database:",e),Cn(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!op())return!1;if(ut.v())return!0;const e=Ae(),t=ut.S(e),n=0<t&&t<10,i=Mf(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}async M(e){return this.db||(N("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,n)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{n(new ki(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?n(new x(R.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new x(R.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new ki(e,o))},i.onupgradeneeded=s=>{N("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.p.O(o,i.transaction,s.oldVersion,this.version).next(()=>{N("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const c=Uo.open(this.db,e,s?"readonly":"readwrite",n),l=i(c).next(u=>(c.g(),u)).catch(u=>(c.abort(u),w.reject(u))).toPromise();return l.catch(()=>{}),await c.m,l}catch(c){const l=c,u=l.name!=="FirebaseError"&&o<3;if(N("SimpleDb","Transaction failed with error:",l.message,"Retrying:",u),this.close(),!u)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Mf(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class nT{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return Cn(this.B.delete())}}class ki extends x{constructor(e,t){super(R.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function gn(r){return r.name==="IndexedDbTransactionError"}class rT{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(N("SimpleDb","PUT",this.store.name,e,t),n=this.store.put(t,e)):(N("SimpleDb","PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),Cn(n)}add(e){return N("SimpleDb","ADD",this.store.name,e,e),Cn(this.store.add(e))}get(e){return Cn(this.store.get(e)).next(t=>(t===void 0&&(t=null),N("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return N("SimpleDb","DELETE",this.store.name,e),Cn(this.store.delete(e))}count(){return N("SimpleDb","COUNT",this.store.name),Cn(this.store.count())}U(e,t){const n=this.options(e,t),i=n.index?this.store.index(n.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(n.range);return new w((o,c)=>{s.onerror=l=>{c(l.target.error)},s.onsuccess=l=>{o(l.target.result)}})}{const s=this.cursor(n),o=[];return this.W(s,(c,l)=>{o.push(l)}).next(()=>o)}}G(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new w((i,s)=>{n.onerror=o=>{s(o.target.error)},n.onsuccess=o=>{i(o.target.result)}})}j(e,t){N("SimpleDb","DELETE ALL",this.store.name);const n=this.options(e,t);n.H=!1;const i=this.cursor(n);return this.W(i,(s,o,c)=>c.delete())}J(e,t){let n;t?n=e:(n={},t=e);const i=this.cursor(n);return this.W(i,t)}Y(e){const t=this.cursor({});return new w((n,i)=>{t.onerror=s=>{const o=el(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():n()}):n()}})}W(e,t){const n=[];return new w((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void i();const l=new nT(c),u=t(c.primaryKey,c.value,l);if(u instanceof w){const p=u.catch(f=>(l.done(),w.reject(f)));n.push(p)}l.isDone?i():l.K===null?c.continue():c.continue(l.K)}}).next(()=>w.waitFor(n))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.H?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Cn(r){return new w((e,t)=>{r.onsuccess=n=>{const i=n.target.result;e(i)},r.onerror=n=>{const i=el(n.target.error);t(i)}})}let xd=!1;function el(r){const e=ut.S(Ae());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new x("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return xd||(xd=!0,setTimeout(()=>{throw n},0)),n}}return r}class iT{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){N("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{N("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){gn(t)?N("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await mn(t)}await this.X(6e4)})}}class sT{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.te(t,e))}te(e,t){const n=new Set;let i=t,s=!0;return w.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!n.has(o))return N("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next(c=>{i-=c,n.add(o)});s=!1})).next(()=>t-i)}ne(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,n).next(s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.re(i,s)).next(c=>(N("IndexBackfiller",`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}re(e,t){let n=e;return t.changes.forEach((i,s)=>{const o=Vf(s);Zc(o,n)>0&&(n=o)}),new tt(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ie(n),this.se=n=>t.writeSequenceNumber(n))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Qe.oe=-1;function ss(r){return r==null}function zi(r){return r===0&&1/r==-1/0}function Ff(r){return typeof r=="number"&&Number.isInteger(r)&&!zi(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=Nd(e)),e=oT(r.get(t),e);return Nd(e)}function oT(r,e){let t=e;const n=r.length;for(let i=0;i<n;i++){const s=r.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function Nd(r){return r+""}function at(r){const e=r.length;if(q(e>=2),e===2)return q(r.charAt(0)===""&&r.charAt(1)===""),X.emptyPath();const t=e-2,n=[];let i="";for(let s=0;s<e;){const o=r.indexOf("",s);switch((o<0||o>t)&&j(),r.charAt(o+1)){case"":const c=r.substring(s,o);let l;i.length===0?l=c:(i+=c,l=i,i=""),n.push(l);break;case"":i+=r.substring(s,o),i+="\0";break;case"":i+=r.substring(s,o+1);break;default:j()}s=o+2}return new X(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vd=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eo(r,e){return[r,$e(e)]}function jf(r,e,t){return[r,$e(e),t]}const aT={},cT=["prefixPath","collectionGroup","readTime","documentId"],lT=["prefixPath","collectionGroup","documentId"],uT=["collectionGroup","readTime","prefixPath","documentId"],dT=["canonicalId","targetId"],hT=["targetId","path"],pT=["path","targetId"],fT=["collectionId","parent"],mT=["indexId","uid"],gT=["uid","sequenceNumber"],_T=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],yT=["indexId","uid","orderedDocumentKey"],vT=["userId","collectionPath","documentId"],IT=["userId","collectionPath","largestBatchId"],ET=["userId","collectionGroup","largestBatchId"],Uf=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],bT=[...Uf,"documentOverlays"],Bf=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],qf=Bf,tl=[...qf,"indexConfiguration","indexState","indexEntries"],TT=tl,wT=[...tl,"globals"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac extends Lf{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function Pe(r,e){const t=O(r);return ut.F(t._e,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Od(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function _n(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function $f(r,e){const t=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.push(e(r[n],n,r));return t}function zf(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(e,t){this.comparator=e,this.root=t||Ve.EMPTY}insert(e,t){return new oe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ve.BLACK,null,null))}remove(e){return new oe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ve.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(e,n.key);if(i===0)return t+n.left.size;i<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new qs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new qs(this.root,e,this.comparator,!1)}getReverseIterator(){return new qs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new qs(this.root,e,this.comparator,!0)}}class qs{constructor(e,t,n,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ve{constructor(e,t,n,i,s){this.key=e,this.value=t,this.color=n??Ve.RED,this.left=i??Ve.EMPTY,this.right=s??Ve.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,i,s){return new Ve(e??this.key,t??this.value,n??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const s=n(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,n),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Ve.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Ve.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ve.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ve.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw j();const e=this.left.check();if(e!==this.right.check())throw j();return e+(this.isRed()?0:1)}}Ve.EMPTY=null,Ve.RED=!0,Ve.BLACK=!1;Ve.EMPTY=new class{constructor(){this.size=0}get key(){throw j()}get value(){throw j()}get color(){throw j()}get left(){throw j()}get right(){throw j()}copy(e,t,n,i,s){return this}insert(e,t,n){return new Ve(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e){this.comparator=e,this.data=new oe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ld(this.data.getIterator())}getIteratorFrom(e){return new Ld(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(n=>{t=t.add(n)}),t}isEqual(e){if(!(e instanceof re)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=n.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new re(this.comparator);return t.data=e,t}}class Ld{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function rr(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.fields=e,e.sort(le.comparator)}static empty(){return new Je([])}unionWith(e){let t=new re(le.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Je(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return yr(this.fields,e.fields,(t,n)=>t.isEqual(n))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AT(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Gf("Invalid base64 string: "+s):s}}(e);return new ge(t)}static fromUint8Array(e){const t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new ge(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return H(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ge.EMPTY_BYTE_STRING=new ge("");const PT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ct(r){if(q(!!r),typeof r=="string"){let e=0;const t=PT.exec(r);if(q(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:he(r.seconds),nanos:he(r.nanos)}}function he(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Dt(r){return typeof r=="string"?ge.fromBase64String(r):ge.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bo(r){var e,t;return((t=(((e=r?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function qo(r){const e=r.mapValue.fields.__previous_value__;return Bo(e)?qo(e):e}function Gi(r){const e=Ct(r.mapValue.fields.__local_write_time__.timestampValue);return new fe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RT{constructor(e,t,n,i,s,o,c,l,u){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=u}}class on{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new on("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof on&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qt={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},to={nullValue:"NULL_VALUE"};function an(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Bo(r)?4:Kf(r)?9007199254740991:$o(r)?10:11:j()}function pt(r,e){if(r===e)return!0;const t=an(r);if(t!==an(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return Gi(r).isEqual(Gi(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Ct(i.timestampValue),c=Ct(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(i,s){return Dt(i.bytesValue).isEqual(Dt(s.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(i,s){return he(i.geoPointValue.latitude)===he(s.geoPointValue.latitude)&&he(i.geoPointValue.longitude)===he(s.geoPointValue.longitude)}(r,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return he(i.integerValue)===he(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=he(i.doubleValue),c=he(s.doubleValue);return o===c?zi(o)===zi(c):isNaN(o)&&isNaN(c)}return!1}(r,e);case 9:return yr(r.arrayValue.values||[],e.arrayValue.values||[],pt);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(Od(o)!==Od(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!pt(o[l],c[l])))return!1;return!0}(r,e);default:return j()}}function Ki(r,e){return(r.values||[]).find(t=>pt(t,e))!==void 0}function cn(r,e){if(r===e)return 0;const t=an(r),n=an(e);if(t!==n)return H(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return H(r.booleanValue,e.booleanValue);case 2:return function(s,o){const c=he(s.integerValue||s.doubleValue),l=he(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(r,e);case 3:return Md(r.timestampValue,e.timestampValue);case 4:return Md(Gi(r),Gi(e));case 5:return H(r.stringValue,e.stringValue);case 6:return function(s,o){const c=Dt(s),l=Dt(o);return c.compareTo(l)}(r.bytesValue,e.bytesValue);case 7:return function(s,o){const c=s.split("/"),l=o.split("/");for(let u=0;u<c.length&&u<l.length;u++){const p=H(c[u],l[u]);if(p!==0)return p}return H(c.length,l.length)}(r.referenceValue,e.referenceValue);case 8:return function(s,o){const c=H(he(s.latitude),he(o.latitude));return c!==0?c:H(he(s.longitude),he(o.longitude))}(r.geoPointValue,e.geoPointValue);case 9:return Fd(r.arrayValue,e.arrayValue);case 10:return function(s,o){var c,l,u,p;const f=s.fields||{},g=o.fields||{},I=(c=f.value)===null||c===void 0?void 0:c.arrayValue,D=(l=g.value)===null||l===void 0?void 0:l.arrayValue,k=H(((u=I?.values)===null||u===void 0?void 0:u.length)||0,((p=D?.values)===null||p===void 0?void 0:p.length)||0);return k!==0?k:Fd(I,D)}(r.mapValue,e.mapValue);case 11:return function(s,o){if(s===Qt.mapValue&&o===Qt.mapValue)return 0;if(s===Qt.mapValue)return 1;if(o===Qt.mapValue)return-1;const c=s.fields||{},l=Object.keys(c),u=o.fields||{},p=Object.keys(u);l.sort(),p.sort();for(let f=0;f<l.length&&f<p.length;++f){const g=H(l[f],p[f]);if(g!==0)return g;const I=cn(c[l[f]],u[p[f]]);if(I!==0)return I}return H(l.length,p.length)}(r.mapValue,e.mapValue);default:throw j()}}function Md(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return H(r,e);const t=Ct(r),n=Ct(e),i=H(t.seconds,n.seconds);return i!==0?i:H(t.nanos,n.nanos)}function Fd(r,e){const t=r.values||[],n=e.values||[];for(let i=0;i<t.length&&i<n.length;++i){const s=cn(t[i],n[i]);if(s)return s}return H(t.length,n.length)}function Er(r){return cc(r)}function cc(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(t){const n=Ct(t);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(t){return Dt(t).toBase64()}(r.bytesValue):"referenceValue"in r?function(t){return M.fromName(t).toString()}(r.referenceValue):"geoPointValue"in r?function(t){return`geo(${t.latitude},${t.longitude})`}(r.geoPointValue):"arrayValue"in r?function(t){let n="[",i=!0;for(const s of t.values||[])i?i=!1:n+=",",n+=cc(s);return n+"]"}(r.arrayValue):"mapValue"in r?function(t){const n=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of n)s?s=!1:i+=",",i+=`${o}:${cc(t.fields[o])}`;return i+"}"}(r.mapValue):j()}function no(r){switch(an(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=qo(r);return e?16+no(e):16;case 5:return 2*r.stringValue.length;case 6:return Dt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((i,s)=>i+no(s),0)}(r.arrayValue);case 10:case 11:return function(n){let i=0;return _n(n.fields,(s,o)=>{i+=s.length+no(o)}),i}(r.mapValue);default:throw j()}}function jn(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function lc(r){return!!r&&"integerValue"in r}function Hi(r){return!!r&&"arrayValue"in r}function jd(r){return!!r&&"nullValue"in r}function Ud(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function ro(r){return!!r&&"mapValue"in r}function $o(r){var e,t;return((t=(((e=r?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function xi(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const e={mapValue:{fields:{}}};return _n(r.mapValue.fields,(t,n)=>e.mapValue.fields[t]=xi(n)),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=xi(r.arrayValue.values[t]);return e}return Object.assign({},r)}function Kf(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const Hf={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function ST(r){return"nullValue"in r?to:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?jn(on.empty(),M.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?$o(r)?Hf:{mapValue:{}}:j()}function CT(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?jn(on.empty(),M.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Hf:"mapValue"in r?$o(r)?{mapValue:{}}:Qt:j()}function Bd(r,e){const t=cn(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function qd(r,e){const t=cn(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this.value=e}static empty(){return new Oe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!ro(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=xi(t)}setAll(e){let t=le.emptyPath(),n={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,n,i),n={},i=[],t=c.popLast()}o?n[c.lastSegment()]=xi(o):i.push(c.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,n,i)}delete(e){const t=this.field(e.popLast());ro(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return pt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let i=t.mapValue.fields[e.get(n)];ro(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,n){_n(t,(i,s)=>e[i]=s);for(const i of n)delete e[i]}clone(){return new Oe(xi(this.value))}}function Wf(r){const e=[];return _n(r.fields,(t,n)=>{const i=new le([t]);if(ro(n)){const s=Wf(n.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Je(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e,t,n,i,s,o,c){this.key=e,this.documentType=t,this.version=n,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new ce(e,0,z.min(),z.min(),z.min(),Oe.empty(),0)}static newFoundDocument(e,t,n,i){return new ce(e,1,t,z.min(),n,i,0)}static newNoDocument(e,t){return new ce(e,2,t,z.min(),z.min(),Oe.empty(),0)}static newUnknownDocument(e,t){return new ce(e,3,t,z.min(),z.min(),Oe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Oe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Oe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ce&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ce(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e,t){this.position=e,this.inclusive=t}}function $d(r,e,t){let n=0;for(let i=0;i<r.position.length;i++){const s=e[i],o=r.position[i];if(s.field.isKeyField()?n=M.comparator(M.fromName(o.referenceValue),t.key):n=cn(o,t.data.field(s.field)),s.dir==="desc"&&(n*=-1),n!==0)break}return n}function zd(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!pt(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi{constructor(e,t="asc"){this.field=e,this.dir=t}}function DT(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{}class Z extends Qf{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new kT(e,t,n):t==="array-contains"?new VT(e,n):t==="in"?new tm(e,n):t==="not-in"?new OT(e,n):t==="array-contains-any"?new LT(e,n):new Z(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new xT(e,n):new NT(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(cn(t,this.value)):t!==null&&an(this.value)===an(t)&&this.matchesComparison(cn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return j()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ne extends Qf{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new ne(e,t)}matches(e){return br(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function br(r){return r.op==="and"}function uc(r){return r.op==="or"}function nl(r){return Jf(r)&&br(r)}function Jf(r){for(const e of r.filters)if(e instanceof ne)return!1;return!0}function dc(r){if(r instanceof Z)return r.field.canonicalString()+r.op.toString()+Er(r.value);if(nl(r))return r.filters.map(e=>dc(e)).join(",");{const e=r.filters.map(t=>dc(t)).join(",");return`${r.op}(${e})`}}function Yf(r,e){return r instanceof Z?function(n,i){return i instanceof Z&&n.op===i.op&&n.field.isEqual(i.field)&&pt(n.value,i.value)}(r,e):r instanceof ne?function(n,i){return i instanceof ne&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce((s,o,c)=>s&&Yf(o,i.filters[c]),!0):!1}(r,e):void j()}function Xf(r,e){const t=r.filters.concat(e);return ne.create(t,r.op)}function Zf(r){return r instanceof Z?function(t){return`${t.field.canonicalString()} ${t.op} ${Er(t.value)}`}(r):r instanceof ne?function(t){return t.op.toString()+" {"+t.getFilters().map(Zf).join(" ,")+"}"}(r):"Filter"}class kT extends Z{constructor(e,t,n){super(e,t,n),this.key=M.fromName(n.referenceValue)}matches(e){const t=M.comparator(e.key,this.key);return this.matchesComparison(t)}}class xT extends Z{constructor(e,t){super(e,"in",t),this.keys=em("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class NT extends Z{constructor(e,t){super(e,"not-in",t),this.keys=em("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function em(r,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(n=>M.fromName(n.referenceValue))}class VT extends Z{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Hi(t)&&Ki(t.arrayValue,this.value)}}class tm extends Z{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ki(this.value.arrayValue,t)}}class OT extends Z{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ki(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Ki(this.value.arrayValue,t)}}class LT extends Z{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Hi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(n=>Ki(this.value.arrayValue,n))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MT{constructor(e,t=null,n=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.ue=null}}function hc(r,e=null,t=[],n=[],i=null,s=null,o=null){return new MT(r,e,t,n,i,s,o)}function Un(r){const e=O(r);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(n=>dc(n)).join(","),t+="|ob:",t+=e.orderBy.map(n=>function(s){return s.field.canonicalString()+s.dir}(n)).join(","),ss(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>Er(n)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>Er(n)).join(",")),e.ue=t}return e.ue}function os(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!DT(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!Yf(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!zd(r.startAt,e.startAt)&&zd(r.endAt,e.endAt)}function go(r){return M.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function _o(r,e){return r.filters.filter(t=>t instanceof Z&&t.field.isEqual(e))}function Gd(r,e,t){let n=to,i=!0;for(const s of _o(r,e)){let o=to,c=!0;switch(s.op){case"<":case"<=":o=ST(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,c=!1;break;case"!=":case"not-in":o=to}Bd({value:n,inclusive:i},{value:o,inclusive:c})<0&&(n=o,i=c)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){const o=t.position[s];Bd({value:n,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}function Kd(r,e,t){let n=Qt,i=!0;for(const s of _o(r,e)){let o=Qt,c=!0;switch(s.op){case">=":case">":o=CT(s.value),c=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,c=!1;break;case"!=":case"not-in":o=Qt}qd({value:n,inclusive:i},{value:o,inclusive:c})>0&&(n=o,i=c)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){const o=t.position[s];qd({value:n,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(e,t=null,n=[],i=[],s=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function nm(r,e,t,n,i,s,o,c){return new Vt(r,e,t,n,i,s,o,c)}function qr(r){return new Vt(r)}function Hd(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function rl(r){return r.collectionGroup!==null}function mr(r){const e=O(r);if(e.ce===null){e.ce=[];const t=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new re(le.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(u=>{u.isInequality()&&(c=c.add(u.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new Wi(s,n))}),t.has(le.keyField().canonicalString())||e.ce.push(new Wi(le.keyField(),n))}return e.ce}function ze(r){const e=O(r);return e.le||(e.le=im(e,mr(r))),e.le}function rm(r){const e=O(r);return e.he||(e.he=im(e,r.explicitOrderBy)),e.he}function im(r,e){if(r.limitType==="F")return hc(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Wi(i.field,s)});const t=r.endAt?new ln(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new ln(r.startAt.position,r.startAt.inclusive):null;return hc(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function pc(r,e){const t=r.filters.concat([e]);return new Vt(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function yo(r,e,t){return new Vt(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function as(r,e){return os(ze(r),ze(e))&&r.limitType===e.limitType}function sm(r){return`${Un(ze(r))}|lt:${r.limitType}`}function cr(r){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(i=>Zf(i)).join(", ")}]`),ss(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(i=>Er(i)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(i=>Er(i)).join(",")),`Target(${n})`}(ze(r))}; limitType=${r.limitType})`}function cs(r,e){return e.isFoundDocument()&&function(n,i){const s=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(s):M.isDocumentKey(n.path)?n.path.isEqual(s):n.path.isImmediateParentOf(s)}(r,e)&&function(n,i){for(const s of mr(n))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(r,e)&&function(n,i){for(const s of n.filters)if(!s.matches(i))return!1;return!0}(r,e)&&function(n,i){return!(n.startAt&&!function(o,c,l){const u=$d(o,c,l);return o.inclusive?u<=0:u<0}(n.startAt,mr(n),i)||n.endAt&&!function(o,c,l){const u=$d(o,c,l);return o.inclusive?u>=0:u>0}(n.endAt,mr(n),i))}(r,e)}function om(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function am(r){return(e,t)=>{let n=!1;for(const i of mr(r)){const s=FT(i,e,t);if(s!==0)return s;n=n||i.field.isKeyField()}return 0}}function FT(r,e,t){const n=r.field.isKeyField()?M.comparator(e.key,t.key):function(s,o,c){const l=o.data.field(s),u=c.data.field(s);return l!==null&&u!==null?cn(l,u):j()}(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return j()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[i,s]of n)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),i=this.inner[n];if(i===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],e))return n.length===1?delete this.inner[t]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(e){_n(this.inner,(t,n)=>{for(const[i,s]of n)e(i,s)})}isEmpty(){return zf(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jT=new oe(M.comparator);function Ye(){return jT}const cm=new oe(M.comparator);function Ai(...r){let e=cm;for(const t of r)e=e.insert(t.key,t);return e}function lm(r){let e=cm;return r.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function ct(){return Ni()}function um(){return Ni()}function Ni(){return new Ot(r=>r.toString(),(r,e)=>r.isEqual(e))}const UT=new oe(M.comparator),BT=new re(M.comparator);function W(...r){let e=BT;for(const t of r)e=e.add(t);return e}const qT=new re(H);function il(){return qT}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sl(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:zi(e)?"-0":e}}function dm(r){return{integerValue:""+r}}function hm(r,e){return Ff(e)?dm(e):sl(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zo{constructor(){this._=void 0}}function $T(r,e,t){return r instanceof Tr?function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Bo(s)&&(s=qo(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(t,e):r instanceof Bn?fm(r,e):r instanceof qn?mm(r,e):function(i,s){const o=pm(i,s),c=Wd(o)+Wd(i.Pe);return lc(o)&&lc(i.Pe)?dm(c):sl(i.serializer,c)}(r,e)}function zT(r,e,t){return r instanceof Bn?fm(r,e):r instanceof qn?mm(r,e):t}function pm(r,e){return r instanceof wr?function(n){return lc(n)||function(s){return!!s&&"doubleValue"in s}(n)}(e)?e:{integerValue:0}:null}class Tr extends zo{}class Bn extends zo{constructor(e){super(),this.elements=e}}function fm(r,e){const t=gm(e);for(const n of r.elements)t.some(i=>pt(i,n))||t.push(n);return{arrayValue:{values:t}}}class qn extends zo{constructor(e){super(),this.elements=e}}function mm(r,e){let t=gm(e);for(const n of r.elements)t=t.filter(i=>!pt(i,n));return{arrayValue:{values:t}}}class wr extends zo{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Wd(r){return he(r.integerValue||r.doubleValue)}function gm(r){return Hi(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(e,t){this.field=e,this.transform=t}}function GT(r,e){return r.field.isEqual(e.field)&&function(n,i){return n instanceof Bn&&i instanceof Bn||n instanceof qn&&i instanceof qn?yr(n.elements,i.elements,pt):n instanceof wr&&i instanceof wr?pt(n.Pe,i.Pe):n instanceof Tr&&i instanceof Tr}(r.transform,e.transform)}class KT{constructor(e,t){this.version=e,this.transformResults=t}}class pe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new pe}static exists(e){return new pe(void 0,e)}static updateTime(e){return new pe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function io(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class Go{}function _m(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new zr(r.key,pe.none()):new $r(r.key,r.data,pe.none());{const t=r.data,n=Oe.empty();let i=new re(le.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?n.delete(s):n.set(s,o),i=i.add(s)}return new Lt(r.key,n,new Je(i.toArray()),pe.none())}}function HT(r,e,t){r instanceof $r?function(i,s,o){const c=i.value.clone(),l=Jd(i.fieldTransforms,s,o.transformResults);c.setAll(l),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(r,e,t):r instanceof Lt?function(i,s,o){if(!io(i.precondition,s))return void s.convertToUnknownDocument(o.version);const c=Jd(i.fieldTransforms,s,o.transformResults),l=s.data;l.setAll(ym(i)),l.setAll(c),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(r,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Vi(r,e,t,n){return r instanceof $r?function(s,o,c,l){if(!io(s.precondition,o))return c;const u=s.value.clone(),p=Yd(s.fieldTransforms,l,o);return u.setAll(p),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null}(r,e,t,n):r instanceof Lt?function(s,o,c,l){if(!io(s.precondition,o))return c;const u=Yd(s.fieldTransforms,l,o),p=o.data;return p.setAll(ym(s)),p.setAll(u),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(f=>f.field))}(r,e,t,n):function(s,o,c){return io(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(r,e,t)}function WT(r,e){let t=null;for(const n of r.fieldTransforms){const i=e.data.field(n.field),s=pm(n.transform,i||null);s!=null&&(t===null&&(t=Oe.empty()),t.set(n.field,s))}return t||null}function Qd(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&yr(n,i,(s,o)=>GT(s,o))}(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class $r extends Go{constructor(e,t,n,i=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Lt extends Go{constructor(e,t,n,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function ym(r){const e=new Map;return r.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}}),e}function Jd(r,e,t){const n=new Map;q(r.length===t.length);for(let i=0;i<t.length;i++){const s=r[i],o=s.transform,c=e.data.field(s.field);n.set(s.field,zT(o,c,t[i]))}return n}function Yd(r,e,t){const n=new Map;for(const i of r){const s=i.transform,o=t.data.field(i.field);n.set(i.field,$T(s,o,e))}return n}class zr extends Go{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ol extends Go{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class al{constructor(e,t,n,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&HT(s,e,n[i])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Vi(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Vi(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=um();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let c=this.applyToLocalView(o,s.mutatedFields);c=t.has(i.key)?null:c;const l=_m(o,c);l!==null&&n.set(i.key,l),o.isValidDocument()||o.convertToNoDocument(z.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),W())}isEqual(e){return this.batchId===e.batchId&&yr(this.mutations,e.mutations,(t,n)=>Qd(t,n))&&yr(this.baseMutations,e.baseMutations,(t,n)=>Qd(t,n))}}class cl{constructor(e,t,n,i){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=i}static from(e,t,n){q(e.mutations.length===n.length);let i=function(){return UT}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,n[o].version);return new cl(e,t,n,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ll{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QT{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Te,ee;function Im(r){switch(r){default:return j();case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0}}function Em(r){if(r===void 0)return Ie("GRPC error has no .code"),R.UNKNOWN;switch(r){case Te.OK:return R.OK;case Te.CANCELLED:return R.CANCELLED;case Te.UNKNOWN:return R.UNKNOWN;case Te.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case Te.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case Te.INTERNAL:return R.INTERNAL;case Te.UNAVAILABLE:return R.UNAVAILABLE;case Te.UNAUTHENTICATED:return R.UNAUTHENTICATED;case Te.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case Te.NOT_FOUND:return R.NOT_FOUND;case Te.ALREADY_EXISTS:return R.ALREADY_EXISTS;case Te.PERMISSION_DENIED:return R.PERMISSION_DENIED;case Te.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case Te.ABORTED:return R.ABORTED;case Te.OUT_OF_RANGE:return R.OUT_OF_RANGE;case Te.UNIMPLEMENTED:return R.UNIMPLEMENTED;case Te.DATA_LOSS:return R.DATA_LOSS;default:return j()}}(ee=Te||(Te={}))[ee.OK=0]="OK",ee[ee.CANCELLED=1]="CANCELLED",ee[ee.UNKNOWN=2]="UNKNOWN",ee[ee.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ee[ee.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ee[ee.NOT_FOUND=5]="NOT_FOUND",ee[ee.ALREADY_EXISTS=6]="ALREADY_EXISTS",ee[ee.PERMISSION_DENIED=7]="PERMISSION_DENIED",ee[ee.UNAUTHENTICATED=16]="UNAUTHENTICATED",ee[ee.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ee[ee.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ee[ee.ABORTED=10]="ABORTED",ee[ee.OUT_OF_RANGE=11]="OUT_OF_RANGE",ee[ee.UNIMPLEMENTED=12]="UNIMPLEMENTED",ee[ee.INTERNAL=13]="INTERNAL",ee[ee.UNAVAILABLE=14]="UNAVAILABLE",ee[ee.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vo=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bm(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JT=new Ln([4294967295,4294967295],0);function Xd(r){const e=bm().encode(r),t=new Tf;return t.update(e),new Uint8Array(t.digest())}function Zd(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Ln([t,n],0),new Ln([i,s],0)]}class ul{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new Pi(`Invalid padding: ${t}`);if(n<0)throw new Pi(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new Pi(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new Pi(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Ln.fromNumber(this.Ie)}Ee(e,t,n){let i=e.add(t.multiply(Ln.fromNumber(n)));return i.compare(JT)===1&&(i=new Ln([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=Xd(e),[n,i]=Zd(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(n,i,s);if(!this.de(o))return!1}return!0}static create(e,t,n){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new ul(s,i,t);return n.forEach(c=>o.insert(c)),o}insert(e){if(this.Ie===0)return;const t=Xd(e),[n,i]=Zd(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(n,i,s);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class Pi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(e,t,n,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const i=new Map;return i.set(e,ds.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new us(z.min(),i,new oe(H),Ye(),W())}}class ds{constructor(e,t,n,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new ds(n,t,W(),W(),W())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(e,t,n,i){this.Re=e,this.removedTargetIds=t,this.key=n,this.Ve=i}}class Tm{constructor(e,t){this.targetId=e,this.me=t}}class wm{constructor(e,t,n=ge.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=i}}class eh{constructor(){this.fe=0,this.ge=nh(),this.pe=ge.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=W(),t=W(),n=W();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:n=n.add(i);break;default:j()}}),new ds(this.pe,this.ye,e,t,n)}Ce(){this.we=!1,this.ge=nh()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,q(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class YT{constructor(e){this.Le=e,this.Be=new Map,this.ke=Ye(),this.qe=th(),this.Qe=new oe(H)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const n=this.Ge(t);switch(e.state){case 0:this.ze(t)&&n.De(e.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(e.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(n.Ne(),n.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),n.De(e.resumeToken));break;default:j()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((n,i)=>{this.ze(i)&&t(i)})}He(e){const t=e.targetId,n=e.me.count,i=this.Je(t);if(i){const s=i.target;if(go(s))if(n===0){const o=new M(s.path);this.Ue(t,o,ce.newNoDocument(o,z.min()))}else q(n===1);else{const o=this.Ye(t);if(o!==n){const c=this.Ze(e),l=c?this.Xe(c,e,o):1;if(l!==0){this.je(t);const u=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,u)}vo?.et(function(p,f,g,I,D){var k,S,F,U,B,G;const J={localCacheCount:p,existenceFilterCount:f.count,databaseId:g.database,projectId:g.projectId},K=f.unchangedNames;return K&&(J.bloomFilter={applied:D===0,hashCount:(k=K?.hashCount)!==null&&k!==void 0?k:0,bitmapLength:(U=(F=(S=K?.bits)===null||S===void 0?void 0:S.bitmap)===null||F===void 0?void 0:F.length)!==null&&U!==void 0?U:0,padding:(G=(B=K?.bits)===null||B===void 0?void 0:B.padding)!==null&&G!==void 0?G:0,mightContain:E=>{var _;return(_=I?.mightContain(E))!==null&&_!==void 0&&_}}),J}(o,e.me,this.Le.tt(),c,l))}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:s=0}=t;let o,c;try{o=Dt(n).toUint8Array()}catch(l){if(l instanceof Gf)return et("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new ul(o,i,s)}catch(l){return et(l instanceof Pi?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Ie===0?null:c}Xe(e,t,n){return t.me.count===n-this.nt(e,t.targetId)?0:2}nt(e,t){const n=this.Le.getRemoteKeysForTarget(t);let i=0;return n.forEach(s=>{const o=this.Le.tt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.Ue(t,s,null),i++)}),i}rt(e){const t=new Map;this.Be.forEach((s,o)=>{const c=this.Je(o);if(c){if(s.current&&go(c.target)){const l=new M(c.target.path);this.ke.get(l)!==null||this.it(o,l)||this.Ue(o,l,ce.newNoDocument(l,e))}s.be&&(t.set(o,s.ve()),s.Ce())}});let n=W();this.qe.forEach((s,o)=>{let c=!0;o.forEachWhile(l=>{const u=this.Je(l);return!u||u.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(n=n.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));const i=new us(e,t,this.Qe,this.ke,n);return this.ke=Ye(),this.qe=th(),this.Qe=new oe(H),i}$e(e,t){if(!this.ze(e))return;const n=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,n),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,n){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),n&&(this.ke=this.ke.insert(t,n))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new eh,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new re(H),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||N("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new eh),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function th(){return new oe(M.comparator)}function nh(){return new oe(M.comparator)}const XT={asc:"ASCENDING",desc:"DESCENDING"},ZT={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},ew={and:"AND",or:"OR"};class tw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function fc(r,e){return r.useProto3Json||ss(e)?e:{value:e}}function Ar(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Am(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function nw(r,e){return Ar(r,e.toTimestamp())}function be(r){return q(!!r),z.fromTimestamp(function(t){const n=Ct(t);return new fe(n.seconds,n.nanos)}(r))}function dl(r,e){return mc(r,e).canonicalString()}function mc(r,e){const t=function(i){return new X(["projects",i.projectId,"databases",i.database])}(r).child("documents");return e===void 0?t:t.child(e)}function Pm(r){const e=X.fromString(r);return q(Lm(e)),e}function Qi(r,e){return dl(r.databaseId,e.path)}function dt(r,e){const t=Pm(e);if(t.get(1)!==r.databaseId.projectId)throw new x(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new x(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new M(Cm(t))}function Rm(r,e){return dl(r.databaseId,e)}function Sm(r){const e=Pm(r);return e.length===4?X.emptyPath():Cm(e)}function gc(r){return new X(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Cm(r){return q(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function rh(r,e,t){return{name:Qi(r,e),fields:t.value.mapValue.fields}}function Dm(r,e,t){const n=dt(r,e.name),i=be(e.updateTime),s=e.createTime?be(e.createTime):z.min(),o=new Oe({mapValue:{fields:e.fields}}),c=ce.newFoundDocument(n,i,s,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function rw(r,e){return"found"in e?function(n,i){q(!!i.found),i.found.name,i.found.updateTime;const s=dt(n,i.found.name),o=be(i.found.updateTime),c=i.found.createTime?be(i.found.createTime):z.min(),l=new Oe({mapValue:{fields:i.found.fields}});return ce.newFoundDocument(s,o,c,l)}(r,e):"missing"in e?function(n,i){q(!!i.missing),q(!!i.readTime);const s=dt(n,i.missing),o=be(i.readTime);return ce.newNoDocument(s,o)}(r,e):j()}function iw(r,e){let t;if("targetChange"in e){e.targetChange;const n=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:j()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(u,p){return u.useProto3Json?(q(p===void 0||typeof p=="string"),ge.fromBase64String(p||"")):(q(p===void 0||p instanceof Buffer||p instanceof Uint8Array),ge.fromUint8Array(p||new Uint8Array))}(r,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(u){const p=u.code===void 0?R.UNKNOWN:Em(u.code);return new x(p,u.message||"")}(o);t=new wm(n,i,s,c||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const i=dt(r,n.document.name),s=be(n.document.updateTime),o=n.document.createTime?be(n.document.createTime):z.min(),c=new Oe({mapValue:{fields:n.document.fields}}),l=ce.newFoundDocument(i,s,o,c),u=n.targetIds||[],p=n.removedTargetIds||[];t=new so(u,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const i=dt(r,n.document),s=n.readTime?be(n.readTime):z.min(),o=ce.newNoDocument(i,s),c=n.removedTargetIds||[];t=new so([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const i=dt(r,n.document),s=n.removedTargetIds||[];t=new so([],s,i,null)}else{if(!("filter"in e))return j();{e.filter;const n=e.filter;n.targetId;const{count:i=0,unchangedNames:s}=n,o=new QT(i,s),c=n.targetId;t=new Tm(c,o)}}return t}function Ji(r,e){let t;if(e instanceof $r)t={update:rh(r,e.key,e.value)};else if(e instanceof zr)t={delete:Qi(r,e.key)};else if(e instanceof Lt)t={update:rh(r,e.key,e.data),updateMask:uw(e.fieldMask)};else{if(!(e instanceof ol))return j();t={verify:Qi(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(n=>function(s,o){const c=o.transform;if(c instanceof Tr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Bn)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof qn)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof wr)return{fieldPath:o.field.canonicalString(),increment:c.Pe};throw j()}(0,n))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:nw(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:j()}(r,e.precondition)),t}function _c(r,e){const t=e.currentDocument?function(s){return s.updateTime!==void 0?pe.updateTime(be(s.updateTime)):s.exists!==void 0?pe.exists(s.exists):pe.none()}(e.currentDocument):pe.none(),n=e.updateTransforms?e.updateTransforms.map(i=>function(o,c){let l=null;if("setToServerValue"in c)q(c.setToServerValue==="REQUEST_TIME"),l=new Tr;else if("appendMissingElements"in c){const p=c.appendMissingElements.values||[];l=new Bn(p)}else if("removeAllFromArray"in c){const p=c.removeAllFromArray.values||[];l=new qn(p)}else"increment"in c?l=new wr(o,c.increment):j();const u=le.fromServerFormat(c.fieldPath);return new ls(u,l)}(r,i)):[];if(e.update){e.update.name;const i=dt(r,e.update.name),s=new Oe({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(l){const u=l.fieldPaths||[];return new Je(u.map(p=>le.fromServerFormat(p)))}(e.updateMask);return new Lt(i,s,o,t,n)}return new $r(i,s,t,n)}if(e.delete){const i=dt(r,e.delete);return new zr(i,t)}if(e.verify){const i=dt(r,e.verify);return new ol(i,t)}return j()}function sw(r,e){return r&&r.length>0?(q(e!==void 0),r.map(t=>function(i,s){let o=i.updateTime?be(i.updateTime):be(s);return o.isEqual(z.min())&&(o=be(s)),new KT(o,i.transformResults||[])}(t,e))):[]}function km(r,e){return{documents:[Rm(r,e.path)]}}function Ko(r,e){const t={structuredQuery:{}},n=e.path;let i;e.collectionGroup!==null?(i=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=Rm(r,i);const s=function(u){if(u.length!==0)return Om(ne.create(u,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const o=function(u){if(u.length!==0)return u.map(p=>function(g){return{field:Gt(g.field),direction:aw(g.dir)}}(p))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=fc(r,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{_t:t,parent:i}}function xm(r,e,t,n){const{_t:i,parent:s}=Ko(r,e),o={},c=[];let l=0;return t.forEach(u=>{const p=n?u.alias:"aggregate_"+l++;o[p]=u.alias,u.aggregateType==="count"?c.push({alias:p,count:{}}):u.aggregateType==="avg"?c.push({alias:p,avg:{field:Gt(u.fieldPath)}}):u.aggregateType==="sum"&&c.push({alias:p,sum:{field:Gt(u.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:c,structuredQuery:i.structuredQuery},parent:i.parent},ut:o,parent:s}}function Nm(r){let e=Sm(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let i=null;if(n>0){q(n===1);const p=t.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let s=[];t.where&&(s=function(f){const g=Vm(f);return g instanceof ne&&nl(g)?g.getFilters():[g]}(t.where));let o=[];t.orderBy&&(o=function(f){return f.map(g=>function(D){return new Wi(lr(D.field),function(S){switch(S){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(g))}(t.orderBy));let c=null;t.limit&&(c=function(f){let g;return g=typeof f=="object"?f.value:f,ss(g)?null:g}(t.limit));let l=null;t.startAt&&(l=function(f){const g=!!f.before,I=f.values||[];return new ln(I,g)}(t.startAt));let u=null;return t.endAt&&(u=function(f){const g=!f.before,I=f.values||[];return new ln(I,g)}(t.endAt)),nm(e,i,o,s,c,"F",l,u)}function ow(r,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return j()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Vm(r){return r.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=lr(t.unaryFilter.field);return Z.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=lr(t.unaryFilter.field);return Z.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=lr(t.unaryFilter.field);return Z.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=lr(t.unaryFilter.field);return Z.create(o,"!=",{nullValue:"NULL_VALUE"});default:return j()}}(r):r.fieldFilter!==void 0?function(t){return Z.create(lr(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return j()}}(t.fieldFilter.op),t.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(t){return ne.create(t.compositeFilter.filters.map(n=>Vm(n)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return j()}}(t.compositeFilter.op))}(r):j()}function aw(r){return XT[r]}function cw(r){return ZT[r]}function lw(r){return ew[r]}function Gt(r){return{fieldPath:r.canonicalString()}}function lr(r){return le.fromServerFormat(r.fieldPath)}function Om(r){return r instanceof Z?function(t){if(t.op==="=="){if(Ud(t.value))return{unaryFilter:{field:Gt(t.field),op:"IS_NAN"}};if(jd(t.value))return{unaryFilter:{field:Gt(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Ud(t.value))return{unaryFilter:{field:Gt(t.field),op:"IS_NOT_NAN"}};if(jd(t.value))return{unaryFilter:{field:Gt(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Gt(t.field),op:cw(t.op),value:t.value}}}(r):r instanceof ne?function(t){const n=t.getFilters().map(i=>Om(i));return n.length===1?n[0]:{compositeFilter:{op:lw(t.op),filters:n}}}(r):j()}function uw(r){const e=[];return r.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Lm(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e,t,n,i,s=z.min(),o=z.min(),c=ge.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new wt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new wt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new wt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new wt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mm{constructor(e){this.ct=e}}function dw(r,e){let t;if(e.document)t=Dm(r.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=M.fromSegments(e.noDocument.path),i=zn(e.noDocument.readTime);t=ce.newNoDocument(n,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return j();{const n=M.fromSegments(e.unknownDocument.path),i=zn(e.unknownDocument.version);t=ce.newUnknownDocument(n,i)}}return e.readTime&&t.setReadTime(function(i){const s=new fe(i[0],i[1]);return z.fromTimestamp(s)}(e.readTime)),t}function ih(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Io(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=function(s,o){return{name:Qi(s,o.key),fields:o.data.value.mapValue.fields,updateTime:Ar(s,o.version.toTimestamp()),createTime:Ar(s,o.createTime.toTimestamp())}}(r.ct,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:$n(e.version)};else{if(!e.isUnknownDocument())return j();n.unknownDocument={path:t.path.toArray(),version:$n(e.version)}}return n}function Io(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function $n(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function zn(r){const e=new fe(r.seconds,r.nanoseconds);return z.fromTimestamp(e)}function Dn(r,e){const t=(e.baseMutations||[]).map(s=>_c(r.ct,s));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const c=e.mutations[s+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const n=e.mutations.map(s=>_c(r.ct,s)),i=fe.fromMillis(e.localWriteTimeMs);return new al(e.batchId,i,t,n)}function Ri(r){const e=zn(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?zn(r.lastLimboFreeSnapshotVersion):z.min();let n;return n=function(s){return s.documents!==void 0}(r.query)?function(s){return q(s.documents.length===1),ze(qr(Sm(s.documents[0])))}(r.query):function(s){return ze(Nm(s))}(r.query),new wt(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,ge.fromBase64String(r.resumeToken))}function Fm(r,e){const t=$n(e.snapshotVersion),n=$n(e.lastLimboFreeSnapshotVersion);let i;i=go(e.target)?km(r.ct,e.target):Ko(r.ct,e.target)._t;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Un(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:i}}function hl(r){const e=Nm({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?yo(e,e.limit,"L"):e}function qa(r,e){return new ll(e.largestBatchId,_c(r.ct,e.overlayMutation))}function sh(r,e){const t=e.path.lastSegment();return[r,$e(e.path.popLast()),t]}function oh(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:$n(n.readTime),documentKey:$e(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hw{getBundleMetadata(e,t){return ah(e).get(t).next(n=>{if(n)return function(s){return{id:s.bundleId,createTime:zn(s.createTime),version:s.version}}(n)})}saveBundleMetadata(e,t){return ah(e).put(function(i){return{bundleId:i.id,createTime:$n(be(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return ch(e).get(t).next(n=>{if(n)return function(s){return{name:s.name,query:hl(s.bundledQuery),readTime:zn(s.readTime)}}(n)})}saveNamedQuery(e,t){return ch(e).put(function(i){return{name:i.name,readTime:$n(be(i.readTime)),bundledQuery:i.bundledQuery}}(t))}}function ah(r){return Pe(r,"bundles")}function ch(r){return Pe(r,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const n=t.uid||"";return new Ho(e,n)}getOverlay(e,t){return gi(e).get(sh(this.userId,t)).next(n=>n?qa(this.serializer,n):null)}getOverlays(e,t){const n=ct();return w.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&n.set(i,s)})).next(()=>n)}saveOverlays(e,t,n){const i=[];return n.forEach((s,o)=>{const c=new ll(t,o);i.push(this.ht(e,c))}),w.waitFor(i)}removeOverlaysForBatchId(e,t,n){const i=new Set;t.forEach(o=>i.add($e(o.getCollectionPath())));const s=[];return i.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);s.push(gi(e).j("collectionPathOverlayIndex",c))}),w.waitFor(s)}getOverlaysForCollection(e,t,n){const i=ct(),s=$e(t),o=IDBKeyRange.bound([this.userId,s,n],[this.userId,s,Number.POSITIVE_INFINITY],!0);return gi(e).U("collectionPathOverlayIndex",o).next(c=>{for(const l of c){const u=qa(this.serializer,l);i.set(u.getKey(),u)}return i})}getOverlaysForCollectionGroup(e,t,n,i){const s=ct();let o;const c=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return gi(e).J({index:"collectionGroupOverlayIndex",range:c},(l,u,p)=>{const f=qa(this.serializer,u);s.size()<i||f.largestBatchId===o?(s.set(f.getKey(),f),o=f.largestBatchId):p.done()}).next(()=>s)}ht(e,t){return gi(e).put(function(i,s,o){const[c,l,u]=sh(s,o.mutation.key);return{userId:s,collectionPath:l,documentId:u,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Ji(i.ct,o.mutation)}}(this.serializer,this.userId,t))}}function gi(r){return Pe(r,"documentOverlays")}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pw{Pt(e){return Pe(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next(t=>{const n=t?.value;return n?ge.fromUint8Array(n):ge.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(he(e.integerValue));else if("doubleValue"in e){const n=he(e.doubleValue);isNaN(n)?this.dt(t,13):(this.dt(t,15),zi(n)?t.At(0):t.At(n))}else if("timestampValue"in e){let n=e.timestampValue;this.dt(t,20),typeof n=="string"&&(n=Ct(n)),t.Rt(`${n.seconds||""}`),t.At(n.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(Dt(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.dt(t,45),t.At(n.latitude||0),t.At(n.longitude||0)}else"mapValue"in e?Kf(e)?this.dt(t,Number.MAX_SAFE_INTEGER):$o(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):j()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const n=e.fields||{};this.dt(t,55);for(const i of Object.keys(n))this.Vt(i,t),this.Tt(n[i],t)}wt(e,t){var n,i;const s=e.fields||{};this.dt(t,53);const o="value",c=((i=(n=s[o].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.length)||0;this.dt(t,15),t.At(he(c)),this.Vt(o,t),this.Tt(s[o],t)}bt(e,t){const n=e.values||[];this.dt(t,50);for(const i of n)this.Tt(i,t)}yt(e,t){this.dt(t,37),M.fromName(e).path.forEach(n=>{this.dt(t,60),this.Dt(n,t)})}dt(e,t){e.At(t)}ft(e){e.At(2)}}kn.vt=new kn;function fw(r){if(r===0)return 8;let e=0;return!(r>>4)&&(e+=4,r<<=4),!(r>>6)&&(e+=2,r<<=2),!(r>>7)&&(e+=1),e}function lh(r){const e=64-function(n){let i=0;for(let s=0;s<8;++s){const o=fw(255&n[s]);if(i+=o,o!==8)break}return i}(r);return Math.ceil(e/8)}class mw{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ft(n.value),n=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ot(n.value),n=t.next();this.Nt()}Lt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ft(n);else if(n<2048)this.Ft(960|n>>>6),this.Ft(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|n>>>12),this.Ft(128|63&n>>>6),this.Ft(128|63&n);else{const i=t.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ot(n);else if(n<2048)this.Ot(960|n>>>6),this.Ot(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|n>>>12),this.Ot(128|63&n>>>6),this.Ot(128|63&n);else{const i=t.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){const t=this.qt(e),n=lh(t);this.Qt(1+n),this.buffer[this.position++]=255&n;for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Kt(e){const t=this.qt(e),n=lh(t);this.Qt(1+n),this.buffer[this.position++]=~(255&n);for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),n=(128&t[0])!=0;t[0]^=n?255:128;for(let i=1;i<t.length;++i)t[i]^=n?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const i=new Uint8Array(n);i.set(this.buffer),this.buffer=i}}class gw{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class _w{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class _i{constructor(){this.jt=new mw,this.Ht=new gw(this.jt),this.Jt=new _w(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(e,t,n,i){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=i}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new xn(this.indexId,this.documentKey,this.arrayValue,n)}}function $t(r,e){let t=r.indexId-e.indexId;return t!==0?t:(t=uh(r.arrayValue,e.arrayValue),t!==0?t:(t=uh(r.directionalValue,e.directionalValue),t!==0?t:M.comparator(r.documentKey,e.documentKey)))}function uh(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{constructor(e){this.Xt=new re((t,n)=>le.comparator(t.field,n.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Xt=this.Xt.add(n):this.tn.push(n)}}get nn(){return this.Xt.size>1}rn(e){if(q(e.collectionGroup===this.collectionId),this.nn)return!1;const t=oc(e);if(t!==void 0&&!this.sn(t))return!1;const n=Sn(e);let i=new Set,s=0,o=0;for(;s<n.length&&this.sn(n[s]);++s)i=i.add(n[s].fieldPath.canonicalString());if(s===n.length)return!0;if(this.Xt.size>0){const c=this.Xt.getIterator().getNext();if(!i.has(c.field.canonicalString())){const l=n[s];if(!this.on(c,l)||!this._n(this.en[o++],l))return!1}++s}for(;s<n.length;++s){const c=n[s];if(o>=this.en.length||!this._n(this.en[o++],c))return!1}return!0}an(){if(this.nn)return null;let e=new re(le.comparator);const t=[];for(const n of this.tn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new Mn(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new Mn(n.field,0))}for(const n of this.en)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new Mn(n.field,n.dir==="asc"?0:1)));return new vr(vr.UNKNOWN_ID,this.collectionId,t,Ir.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jm(r){var e,t;if(q(r instanceof Z||r instanceof ne),r instanceof Z){if(r instanceof tm){const i=((t=(e=r.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>Z.create(r.field,"==",s)))||[];return ne.create(i,"or")}return r}const n=r.filters.map(i=>jm(i));return ne.create(n,r.op)}function yw(r){if(r.getFilters().length===0)return[];const e=Ic(jm(r));return q(Um(e)),yc(e)||vc(e)?[e]:e.getFilters()}function yc(r){return r instanceof Z}function vc(r){return r instanceof ne&&nl(r)}function Um(r){return yc(r)||vc(r)||function(t){if(t instanceof ne&&uc(t)){for(const n of t.getFilters())if(!yc(n)&&!vc(n))return!1;return!0}return!1}(r)}function Ic(r){if(q(r instanceof Z||r instanceof ne),r instanceof Z)return r;if(r.filters.length===1)return Ic(r.filters[0]);const e=r.filters.map(n=>Ic(n));let t=ne.create(e,r.op);return t=Eo(t),Um(t)?t:(q(t instanceof ne),q(br(t)),q(t.filters.length>1),t.filters.reduce((n,i)=>pl(n,i)))}function pl(r,e){let t;return q(r instanceof Z||r instanceof ne),q(e instanceof Z||e instanceof ne),t=r instanceof Z?e instanceof Z?function(i,s){return ne.create([i,s],"and")}(r,e):hh(r,e):e instanceof Z?hh(e,r):function(i,s){if(q(i.filters.length>0&&s.filters.length>0),br(i)&&br(s))return Xf(i,s.getFilters());const o=uc(i)?i:s,c=uc(i)?s:i,l=o.filters.map(u=>pl(u,c));return ne.create(l,"or")}(r,e),Eo(t)}function hh(r,e){if(br(e))return Xf(e,r.getFilters());{const t=e.filters.map(n=>pl(r,n));return ne.create(t,"or")}}function Eo(r){if(q(r instanceof Z||r instanceof ne),r instanceof Z)return r;const e=r.getFilters();if(e.length===1)return Eo(e[0]);if(Jf(r))return r;const t=e.map(i=>Eo(i)),n=[];return t.forEach(i=>{i instanceof Z?n.push(i):i instanceof ne&&(i.op===r.op?n.push(...i.filters):n.push(i))}),n.length===1?n[0]:ne.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vw{constructor(){this.un=new fl}addToCollectionParentIndex(e,t){return this.un.add(t),w.resolve()}getCollectionParents(e,t){return w.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return w.resolve()}deleteFieldIndex(e,t){return w.resolve()}deleteAllFieldIndexes(e){return w.resolve()}createTargetIndexes(e,t){return w.resolve()}getDocumentsMatchingTarget(e,t){return w.resolve(null)}getIndexType(e,t){return w.resolve(0)}getFieldIndexes(e,t){return w.resolve([])}getNextCollectionGroupToUpdate(e){return w.resolve(null)}getMinOffset(e,t){return w.resolve(tt.min())}getMinOffsetFromCollectionGroup(e,t){return w.resolve(tt.min())}updateCollectionGroup(e,t,n){return w.resolve()}updateIndexEntries(e,t){return w.resolve()}}class fl{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t]||new re(X.comparator),s=!i.has(n);return this.index[t]=i.add(n),s}has(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t];return i&&i.has(n)}getEntries(e){return(this.index[e]||new re(X.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $s=new Uint8Array(0);class Iw{constructor(e,t){this.databaseId=t,this.cn=new fl,this.ln=new Ot(n=>Un(n),(n,i)=>os(n,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const n=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.cn.add(t)});const s={collectionId:n,parent:$e(i)};return ph(e).put(s)}return w.resolve()}getCollectionParents(e,t){const n=[],i=IDBKeyRange.bound([t,""],[xf(t),""],!1,!0);return ph(e).U(i).next(s=>{for(const o of s){if(o.collectionId!==t)break;n.push(at(o.parent))}return n})}addFieldIndex(e,t){const n=yi(e),i=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(t);delete i.indexId;const s=n.add(i);if(t.indexState){const o=sr(e);return s.next(c=>{o.put(oh(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const n=yi(e),i=sr(e),s=ir(e);return n.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=yi(e),n=ir(e),i=sr(e);return t.j().next(()=>n.j()).next(()=>i.j())}createTargetIndexes(e,t){return w.forEach(this.hn(t),n=>this.getIndexType(e,n).next(i=>{if(i===0||i===1){const s=new dh(n).an();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){const n=ir(e);let i=!0;const s=new Map;return w.forEach(this.hn(t),o=>this.Pn(e,o).next(c=>{i&&(i=!!c),s.set(o,c)})).next(()=>{if(i){let o=W();const c=[];return w.forEach(s,(l,u)=>{N("IndexedDbIndexManager",`Using index ${function(B){return`id=${B.indexId}|cg=${B.collectionGroup}|f=${B.fields.map(G=>`${G.fieldPath}:${G.kind}`).join(",")}`}(l)} to execute ${Un(t)}`);const p=function(B,G){const J=oc(G);if(J===void 0)return null;for(const K of _o(B,J.fieldPath))switch(K.op){case"array-contains-any":return K.value.arrayValue.values||[];case"array-contains":return[K.value]}return null}(u,l),f=function(B,G){const J=new Map;for(const K of Sn(G))for(const E of _o(B,K.fieldPath))switch(E.op){case"==":case"in":J.set(K.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return J.set(K.fieldPath.canonicalString(),E.value),Array.from(J.values())}return null}(u,l),g=function(B,G){const J=[];let K=!0;for(const E of Sn(G)){const _=E.kind===0?Gd(B,E.fieldPath,B.startAt):Kd(B,E.fieldPath,B.startAt);J.push(_.value),K&&(K=_.inclusive)}return new ln(J,K)}(u,l),I=function(B,G){const J=[];let K=!0;for(const E of Sn(G)){const _=E.kind===0?Kd(B,E.fieldPath,B.endAt):Gd(B,E.fieldPath,B.endAt);J.push(_.value),K&&(K=_.inclusive)}return new ln(J,K)}(u,l),D=this.In(l,u,g),k=this.In(l,u,I),S=this.Tn(l,u,f),F=this.En(l.indexId,p,D,g.inclusive,k,I.inclusive,S);return w.forEach(F,U=>n.G(U,t.limit).next(B=>{B.forEach(G=>{const J=M.fromSegments(G.documentKey);o.has(J)||(o=o.add(J),c.push(J))})}))}).next(()=>c)}return w.resolve(null)})}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=yw(ne.create(e.filters,"and")).map(n=>hc(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt)),this.ln.set(e,t),t)}En(e,t,n,i,s,o,c){const l=(t!=null?t.length:1)*Math.max(n.length,s.length),u=l/(t!=null?t.length:1),p=[];for(let f=0;f<l;++f){const g=t?this.dn(t[f/u]):$s,I=this.An(e,g,n[f%u],i),D=this.Rn(e,g,s[f%u],o),k=c.map(S=>this.An(e,g,S,!0));p.push(...this.createRange(I,D,k))}return p}An(e,t,n,i){const s=new xn(e,M.empty(),t,n);return i?s:s.Zt()}Rn(e,t,n,i){const s=new xn(e,M.empty(),t,n);return i?s.Zt():s}Pn(e,t){const n=new dh(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(const c of s)n.rn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let n=2;const i=this.hn(t);return w.forEach(i,s=>this.Pn(e,s).next(o=>{o?n!==0&&o.fields.length<function(l){let u=new re(le.comparator),p=!1;for(const f of l.filters)for(const g of f.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?p=!0:u=u.add(g.field));for(const f of l.orderBy)f.field.isKeyField()||(u=u.add(f.field));return u.size+(p?1:0)}(s)&&(n=1):n=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&n===2?1:n)}Vn(e,t){const n=new _i;for(const i of Sn(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=n.Yt(i.kind);kn.vt.It(s,o)}return n.zt()}dn(e){const t=new _i;return kn.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const n=new _i;return kn.vt.It(jn(this.databaseId,t),n.Yt(function(s){const o=Sn(s);return o.length===0?0:o[o.length-1].kind}(e))),n.zt()}Tn(e,t,n){if(n===null)return[];let i=[];i.push(new _i);let s=0;for(const o of Sn(e)){const c=n[s++];for(const l of i)if(this.fn(t,o.fieldPath)&&Hi(c))i=this.gn(i,o,c);else{const u=l.Yt(o.kind);kn.vt.It(c,u)}}return this.pn(i)}In(e,t,n){return this.Tn(e,t,n.position)}pn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].zt();return t}gn(e,t,n){const i=[...e],s=[];for(const o of n.arrayValue.values||[])for(const c of i){const l=new _i;l.seed(c.zt()),kn.vt.It(o,l.Yt(t.kind)),s.push(l)}return s}fn(e,t){return!!e.filters.find(n=>n instanceof Z&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(e,t){const n=yi(e),i=sr(e);return(t?n.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):n.U()).next(s=>{const o=[];return w.forEach(s,c=>i.get([c.indexId,this.uid]).next(l=>{o.push(function(p,f){const g=f?new Ir(f.sequenceNumber,new tt(zn(f.readTime),new M(at(f.documentKey)),f.largestBatchId)):Ir.empty(),I=p.fields.map(([D,k])=>new Mn(le.fromServerFormat(D),k));return new vr(p.indexId,p.collectionGroup,I,g)}(c,l))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((n,i)=>{const s=n.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:H(n.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,n){const i=yi(e),s=sr(e);return this.yn(e).next(o=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(c=>w.forEach(c,l=>s.put(oh(l.indexId,this.uid,o,n)))))}updateIndexEntries(e,t){const n=new Map;return w.forEach(t,(i,s)=>{const o=n.get(i.collectionGroup);return(o?w.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(c=>(n.set(i.collectionGroup,c),w.forEach(c,l=>this.wn(e,i,l).next(u=>{const p=this.Sn(s,l);return u.isEqual(p)?w.resolve():this.bn(e,s,l,u,p)}))))})}Dn(e,t,n,i){return ir(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(n,t.key),documentKey:t.key.path.toArray()})}vn(e,t,n,i){return ir(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(n,t.key),t.key.path.toArray()])}wn(e,t,n){const i=ir(e);let s=new re($t);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.mn(n,t)])},(o,c)=>{s=s.add(new xn(n.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>s)}Sn(e,t){let n=new re($t);const i=this.Vn(t,e);if(i==null)return n;const s=oc(t);if(s!=null){const o=e.data.field(s.fieldPath);if(Hi(o))for(const c of o.arrayValue.values||[])n=n.add(new xn(t.indexId,e.key,this.dn(c),i))}else n=n.add(new xn(t.indexId,e.key,$s,i));return n}bn(e,t,n,i,s){N("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return function(l,u,p,f,g){const I=l.getIterator(),D=u.getIterator();let k=rr(I),S=rr(D);for(;k||S;){let F=!1,U=!1;if(k&&S){const B=p(k,S);B<0?U=!0:B>0&&(F=!0)}else k!=null?U=!0:F=!0;F?(f(S),S=rr(D)):U?(g(k),k=rr(I)):(k=rr(I),S=rr(D))}}(i,s,$t,c=>{o.push(this.Dn(e,t,n,c))},c=>{o.push(this.vn(e,t,n,c))}),w.waitFor(o)}yn(e){let t=1;return sr(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((o,c)=>$t(o,c)).filter((o,c,l)=>!c||$t(o,l[c-1])!==0);const i=[];i.push(e);for(const o of n){const c=$t(o,e),l=$t(o,t);if(c===0)i[0]=e.Zt();else if(c>0&&l<0)i.push(o),i.push(o.Zt());else if(l>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Cn(i[o],i[o+1]))return[];const c=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,$s,[]],l=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,$s,[]];s.push(IDBKeyRange.bound(c,l))}return s}Cn(e,t){return $t(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(fh)}getMinOffset(e,t){return w.mapArray(this.hn(t),n=>this.Pn(e,n).next(i=>i||j())).next(fh)}}function ph(r){return Pe(r,"collectionParents")}function ir(r){return Pe(r,"indexEntries")}function yi(r){return Pe(r,"indexConfiguration")}function sr(r){return Pe(r,"indexState")}function fh(r){q(r.length!==0);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const i=r[n].indexState.offset;Zc(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new tt(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class qe{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new qe(e,qe.DEFAULT_COLLECTION_PERCENTILE,qe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bm(r,e,t){const n=r.store("mutations"),i=r.store("documentMutations"),s=[],o=IDBKeyRange.only(t.batchId);let c=0;const l=n.J({range:o},(p,f,g)=>(c++,g.delete()));s.push(l.next(()=>{q(c===1)}));const u=[];for(const p of t.mutations){const f=jf(e,p.key.path,t.batchId);s.push(i.delete(f)),u.push(p.key)}return w.waitFor(s).next(()=>u)}function bo(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw j();e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */qe.DEFAULT_COLLECTION_PERCENTILE=10,qe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,qe.DEFAULT=new qe(41943040,qe.DEFAULT_COLLECTION_PERCENTILE,qe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),qe.DISABLED=new qe(-1,0,0);class Wo{constructor(e,t,n,i){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=i,this.Fn={}}static lt(e,t,n,i){q(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new Wo(s,t,n,i)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return zt(e).J({index:"userMutationsIndex",range:n},(i,s,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,n,i){const s=ur(e),o=zt(e);return o.add({}).next(c=>{q(typeof c=="number");const l=new al(c,t,n,i),u=function(I,D,k){const S=k.baseMutations.map(U=>Ji(I.ct,U)),F=k.mutations.map(U=>Ji(I.ct,U));return{userId:D,batchId:k.batchId,localWriteTimeMs:k.localWriteTime.toMillis(),baseMutations:S,mutations:F}}(this.serializer,this.userId,l),p=[];let f=new re((g,I)=>H(g.canonicalString(),I.canonicalString()));for(const g of i){const I=jf(this.userId,g.key.path,c);f=f.add(g.key.path.popLast()),p.push(o.put(u)),p.push(s.put(I,aT))}return f.forEach(g=>{p.push(this.indexManager.addToCollectionParentIndex(e,g))}),e.addOnCommittedListener(()=>{this.Fn[c]=l.keys()}),w.waitFor(p).next(()=>l)})}lookupMutationBatch(e,t){return zt(e).get(t).next(n=>n?(q(n.userId===this.userId),Dn(this.serializer,n)):null)}Mn(e,t){return this.Fn[t]?w.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next(n=>{if(n){const i=n.keys();return this.Fn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return zt(e).J({index:"userMutationsIndex",range:i},(o,c,l)=>{c.userId===this.userId&&(q(c.batchId>=n),s=Dn(this.serializer,c)),l.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return zt(e).J({index:"userMutationsIndex",range:t,reverse:!0},(i,s,o)=>{n=s.batchId,o.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return zt(e).U("userMutationsIndex",t).next(n=>n.map(i=>Dn(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=eo(this.userId,t.path),i=IDBKeyRange.lowerBound(n),s=[];return ur(e).J({range:i},(o,c,l)=>{const[u,p,f]=o,g=at(p);if(u===this.userId&&t.path.isEqual(g))return zt(e).get(f).next(I=>{if(!I)throw j();q(I.userId===this.userId),s.push(Dn(this.serializer,I))});l.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new re(H);const i=[];return t.forEach(s=>{const o=eo(this.userId,s.path),c=IDBKeyRange.lowerBound(o),l=ur(e).J({range:c},(u,p,f)=>{const[g,I,D]=u,k=at(I);g===this.userId&&s.path.isEqual(k)?n=n.add(D):f.done()});i.push(l)}),w.waitFor(i).next(()=>this.xn(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1,s=eo(this.userId,n),o=IDBKeyRange.lowerBound(s);let c=new re(H);return ur(e).J({range:o},(l,u,p)=>{const[f,g,I]=l,D=at(g);f===this.userId&&n.isPrefixOf(D)?D.length===i&&(c=c.add(I)):p.done()}).next(()=>this.xn(e,c))}xn(e,t){const n=[],i=[];return t.forEach(s=>{i.push(zt(e).get(s).next(o=>{if(o===null)throw j();q(o.userId===this.userId),n.push(Dn(this.serializer,o))}))}),w.waitFor(i).next(()=>n)}removeMutationBatch(e,t){return Bm(e._e,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.On(t.batchId)}),w.forEach(n,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return w.resolve();const n=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return ur(e).J({range:n},(s,o,c)=>{if(s[0]===this.userId){const l=at(s[1]);i.push(l)}else c.done()}).next(()=>{q(i.length===0)})})}containsKey(e,t){return qm(e,this.userId,t)}Nn(e){return $m(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function qm(r,e,t){const n=eo(e,t.path),i=n[1],s=IDBKeyRange.lowerBound(n);let o=!1;return ur(r).J({range:s,H:!0},(c,l,u)=>{const[p,f,g]=c;p===e&&f===i&&(o=!0),u.done()}).next(()=>o)}function zt(r){return Pe(r,"mutations")}function ur(r){return Pe(r,"documentMutations")}function $m(r){return Pe(r,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Gn(0)}static kn(){return new Gn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ew{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next(t=>{const n=new Gn(t.highestTargetId);return t.highestTargetId=n.next(),this.Qn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.qn(e).next(t=>z.fromTimestamp(new fe(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.qn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.qn(e).next(i=>(i.highestListenSequenceNumber=t,n&&(i.lastRemoteSnapshotVersion=n.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Qn(e,i)))}addTargetData(e,t){return this.Kn(e,t).next(()=>this.qn(e).next(n=>(n.targetCount+=1,this.$n(t,n),this.Qn(e,n))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>or(e).delete(t.targetId)).next(()=>this.qn(e)).next(n=>(q(n.targetCount>0),n.targetCount-=1,this.Qn(e,n)))}removeTargets(e,t,n){let i=0;const s=[];return or(e).J((o,c)=>{const l=Ri(c);l.sequenceNumber<=t&&n.get(l.targetId)===null&&(i++,s.push(this.removeTargetData(e,l)))}).next(()=>w.waitFor(s)).next(()=>i)}forEachTarget(e,t){return or(e).J((n,i)=>{const s=Ri(i);t(s)})}qn(e){return gh(e).get("targetGlobalKey").next(t=>(q(t!==null),t))}Qn(e,t){return gh(e).put("targetGlobalKey",t)}Kn(e,t){return or(e).put(Fm(this.serializer,t))}$n(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.qn(e).next(t=>t.targetCount)}getTargetData(e,t){const n=Un(t),i=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return or(e).J({range:i,index:"queryTargetsIndex"},(o,c,l)=>{const u=Ri(c);os(t,u.target)&&(s=u,l.done())}).next(()=>s)}addMatchingKeys(e,t,n){const i=[],s=Kt(e);return t.forEach(o=>{const c=$e(o.path);i.push(s.put({targetId:n,path:c})),i.push(this.referenceDelegate.addReference(e,n,o))}),w.waitFor(i)}removeMatchingKeys(e,t,n){const i=Kt(e);return w.forEach(t,s=>{const o=$e(s.path);return w.waitFor([i.delete([n,o]),this.referenceDelegate.removeReference(e,n,s)])})}removeMatchingKeysForTargetId(e,t){const n=Kt(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(i)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),i=Kt(e);let s=W();return i.J({range:n,H:!0},(o,c,l)=>{const u=at(o[1]),p=new M(u);s=s.add(p)}).next(()=>s)}containsKey(e,t){const n=$e(t.path),i=IDBKeyRange.bound([n],[xf(n)],!1,!0);let s=0;return Kt(e).J({index:"documentTargetsIndex",H:!0,range:i},([o,c],l,u)=>{o!==0&&(s++,u.done())}).next(()=>s>0)}ot(e,t){return or(e).get(t).next(n=>n?Ri(n):null)}}function or(r){return Pe(r,"targets")}function gh(r){return Pe(r,"targetGlobal")}function Kt(r){return Pe(r,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _h([r,e],[t,n]){const i=H(r,t);return i===0?H(e,n):i}class bw{constructor(e){this.Un=e,this.buffer=new re(_h),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();_h(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class zm{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){N("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){gn(t)?N("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await mn(t)}await this.Hn(3e5)})}}class Tw{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next(n=>Math.floor(t/100*n))}nthSequenceNumber(e,t){if(t===0)return w.resolve(Qe.oe);const n=new bw(t);return this.Jn.forEachTarget(e,i=>n.zn(i.sequenceNumber)).next(()=>this.Jn.Zn(e,i=>n.zn(i))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Jn.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),w.resolve(mh)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),mh):this.Xn(e,t))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let n,i,s,o,c,l,u;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(f=>(f>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),i=this.params.maximumSequenceNumbersToCollect):i=f,o=Date.now(),this.nthSequenceNumber(e,i))).next(f=>(n=f,c=Date.now(),this.removeTargets(e,n,t))).next(f=>(s=f,l=Date.now(),this.removeOrphanedDocuments(e,n))).next(f=>(u=Date.now(),ar()<=Y.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-p}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${s} targets in `+(l-c)+`ms
	Removed ${f} documents in `+(u-l)+`ms
Total Duration: ${u-p}ms`),w.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:f})))}}function Gm(r,e){return new Tw(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ww{constructor(e,t){this.db=e,this.garbageCollector=Gm(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next(n=>t.next(i=>n+i))}er(e){let t=0;return this.Zn(e,n=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,(n,i)=>t(i))}addReference(e,t,n){return zs(e,n)}removeReference(e,t,n){return zs(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return zs(e,t)}nr(e,t){return function(i,s){let o=!1;return $m(i).Y(c=>qm(i,c,s).next(l=>(l&&(o=!0),w.resolve(!l)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.tr(e,(o,c)=>{if(c<=t){const l=this.nr(e,o).next(u=>{if(!u)return s++,n.getEntry(e,o).next(()=>(n.removeEntry(o,z.min()),Kt(e).delete(function(f){return[0,$e(f.path)]}(o))))});i.push(l)}}).next(()=>w.waitFor(i)).next(()=>n.apply(e)).next(()=>s)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return zs(e,t)}tr(e,t){const n=Kt(e);let i,s=Qe.oe;return n.J({index:"documentTargetsIndex"},([o,c],{path:l,sequenceNumber:u})=>{o===0?(s!==Qe.oe&&t(new M(at(i)),s),s=u,i=l):s=Qe.oe}).next(()=>{s!==Qe.oe&&t(new M(at(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function zs(r,e){return Kt(r).put(function(n,i){return{targetId:0,path:$e(n.path),sequenceNumber:i}}(e,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Km{constructor(){this.changes=new Ot(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ce.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?w.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aw{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Pn(e).put(n)}removeEntry(e,t,n){return Pn(e).delete(function(s,o){const c=s.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Io(o),c[c.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.rr(e,n)))}getEntry(e,t){let n=ce.newInvalidDocument(t);return Pn(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(vi(t))},(i,s)=>{n=this.ir(t,s)}).next(()=>n)}sr(e,t){let n={size:0,document:ce.newInvalidDocument(t)};return Pn(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(vi(t))},(i,s)=>{n={document:this.ir(t,s),size:bo(s)}}).next(()=>n)}getEntries(e,t){let n=Ye();return this._r(e,t,(i,s)=>{const o=this.ir(i,s);n=n.insert(i,o)}).next(()=>n)}ar(e,t){let n=Ye(),i=new oe(M.comparator);return this._r(e,t,(s,o)=>{const c=this.ir(s,o);n=n.insert(s,c),i=i.insert(s,bo(o))}).next(()=>({documents:n,ur:i}))}_r(e,t,n){if(t.isEmpty())return w.resolve();let i=new re(Ih);t.forEach(l=>i=i.add(l));const s=IDBKeyRange.bound(vi(i.first()),vi(i.last())),o=i.getIterator();let c=o.getNext();return Pn(e).J({index:"documentKeyIndex",range:s},(l,u,p)=>{const f=M.fromSegments([...u.prefixPath,u.collectionGroup,u.documentId]);for(;c&&Ih(c,f)<0;)n(c,null),c=o.getNext();c&&c.isEqual(f)&&(n(c,u),c=o.hasNext()?o.getNext():null),c?p.$(vi(c)):p.done()}).next(()=>{for(;c;)n(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,n,i,s){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Io(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Pn(e).U(IDBKeyRange.bound(c,l,!0)).next(u=>{s?.incrementDocumentReadCount(u.length);let p=Ye();for(const f of u){const g=this.ir(M.fromSegments(f.prefixPath.concat(f.collectionGroup,f.documentId)),f);g.isFoundDocument()&&(cs(t,g)||i.has(g.key))&&(p=p.insert(g.key,g))}return p})}getAllFromCollectionGroup(e,t,n,i){let s=Ye();const o=vh(t,n),c=vh(t,tt.max());return Pn(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,c,!0)},(l,u,p)=>{const f=this.ir(M.fromSegments(u.prefixPath.concat(u.collectionGroup,u.documentId)),u);s=s.insert(f.key,f),s.size===i&&p.done()}).next(()=>s)}newChangeBuffer(e){return new Pw(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return yh(e).get("remoteDocumentGlobalKey").next(t=>(q(!!t),t))}rr(e,t){return yh(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const n=dw(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(z.min())))return n}return ce.newInvalidDocument(e)}}function Hm(r){return new Aw(r)}class Pw extends Km{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new Ot(n=>n.toString(),(n,i)=>n.isEqual(i))}applyChanges(e){const t=[];let n=0,i=new re((s,o)=>H(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{const c=this.lr.get(s);if(t.push(this.cr.removeEntry(e,s,c.readTime)),o.isValidDocument()){const l=ih(this.cr.serializer,o);i=i.add(s.path.popLast());const u=bo(l);n+=u-c.size,t.push(this.cr.addEntry(e,s,l))}else if(n-=c.size,this.trackRemovals){const l=ih(this.cr.serializer,o.convertToNoDocument(z.min()));t.push(this.cr.addEntry(e,s,l))}}),i.forEach(s=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.cr.updateMetadata(e,n)),w.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next(n=>(this.lr.set(t,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(e,t){return this.cr.ar(e,t).next(({documents:n,ur:i})=>(i.forEach((s,o)=>{this.lr.set(s,{size:o,readTime:n.get(s).readTime})}),n))}}function yh(r){return Pe(r,"remoteDocumentGlobal")}function Pn(r){return Pe(r,"remoteDocumentsV14")}function vi(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function vh(r,e){const t=e.documentKey.path.toArray();return[r,Io(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function Ih(r,e){const t=r.path.toArray(),n=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<n.length-2;++s)if(i=H(t[s],n[s]),i)return i;return i=H(t.length,n.length),i||(i=H(t[t.length-2],n[n.length-2]),i||H(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rw{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wm{constructor(e,t,n,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=i}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(n=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(n!==null&&Vi(n.mutation,i,Je.empty(),fe.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.getLocalViewOfDocuments(e,n,W()).next(()=>n))}getLocalViewOfDocuments(e,t,n=W()){const i=ct();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,n).next(s=>{let o=Ai();return s.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const n=ct();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,W()))}populateOverlays(e,t,n){const i=[];return n.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,n,i){let s=Ye();const o=Ni(),c=function(){return Ni()}();return t.forEach((l,u)=>{const p=n.get(u.key);i.has(u.key)&&(p===void 0||p.mutation instanceof Lt)?s=s.insert(u.key,u):p!==void 0?(o.set(u.key,p.mutation.getFieldMask()),Vi(p.mutation,u,p.mutation.getFieldMask(),fe.now())):o.set(u.key,Je.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((u,p)=>o.set(u,p)),t.forEach((u,p)=>{var f;return c.set(u,new Rw(p,(f=o.get(u))!==null&&f!==void 0?f:null))}),c))}recalculateAndSaveOverlays(e,t){const n=Ni();let i=new oe((o,c)=>o-c),s=W();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(l=>{const u=t.get(l);if(u===null)return;let p=n.get(l)||Je.empty();p=c.applyToLocalView(u,p),n.set(l,p);const f=(i.get(c.batchId)||W()).add(l);i=i.insert(c.batchId,f)})}).next(()=>{const o=[],c=i.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),u=l.key,p=l.value,f=um();p.forEach(g=>{if(!s.has(g)){const I=_m(t.get(g),n.get(g));I!==null&&f.set(g,I),s=s.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,f))}return w.waitFor(o)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.recalculateAndSaveOverlays(e,n))}getDocumentsMatchingQuery(e,t,n,i){return function(o){return M.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):rl(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,i):this.getDocumentsMatchingCollectionQuery(e,t,n,i)}getNextDocuments(e,t,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,i-s.size):w.resolve(ct());let c=-1,l=s;return o.next(u=>w.forEach(u,(p,f)=>(c<f.largestBatchId&&(c=f.largestBatchId),s.get(p)?w.resolve():this.remoteDocumentCache.getEntry(e,p).next(g=>{l=l.insert(p,g)}))).next(()=>this.populateOverlays(e,u,s)).next(()=>this.computeViews(e,l,u,W())).next(p=>({batchId:c,changes:lm(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new M(t)).next(n=>{let i=Ai();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,n,i){const s=t.collectionGroup;let o=Ai();return this.indexManager.getCollectionParents(e,s).next(c=>w.forEach(c,l=>{const u=function(f,g){return new Vt(g,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,u,n,i).next(p=>{p.forEach((f,g)=>{o=o.insert(f,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,n,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,i))).next(o=>{s.forEach((l,u)=>{const p=u.getKey();o.get(p)===null&&(o=o.insert(p,ce.newInvalidDocument(p)))});let c=Ai();return o.forEach((l,u)=>{const p=s.get(l);p!==void 0&&Vi(p.mutation,u,Je.empty(),fe.now()),cs(t,u)&&(c=c.insert(l,u))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sw{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return w.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:be(i.createTime)}}(t)),w.resolve()}getNamedQuery(e,t){return w.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(i){return{name:i.name,query:hl(i.bundledQuery),readTime:be(i.readTime)}}(t)),w.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cw{constructor(){this.overlays=new oe(M.comparator),this.Ir=new Map}getOverlay(e,t){return w.resolve(this.overlays.get(t))}getOverlays(e,t){const n=ct();return w.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&n.set(i,s)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((i,s)=>{this.ht(e,t,s)}),w.resolve()}removeOverlaysForBatchId(e,t,n){const i=this.Ir.get(n);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(n)),w.resolve()}getOverlaysForCollection(e,t,n){const i=ct(),s=t.length+1,o=new M(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,u=l.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===s&&l.largestBatchId>n&&i.set(l.getKey(),l)}return w.resolve(i)}getOverlaysForCollectionGroup(e,t,n,i){let s=new oe((u,p)=>u-p);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>n){let p=s.get(u.largestBatchId);p===null&&(p=ct(),s=s.insert(u.largestBatchId,p)),p.set(u.getKey(),u)}}const c=ct(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((u,p)=>c.set(u,p)),!(c.size()>=i)););return w.resolve(c)}ht(e,t,n){const i=this.overlays.get(n.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(n.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new ll(t,n));let s=this.Ir.get(t);s===void 0&&(s=W(),this.Ir.set(t,s)),this.Ir.set(t,s.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dw{constructor(){this.sessionToken=ge.EMPTY_BYTE_STRING}getSessionToken(e){return w.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,w.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ml{constructor(){this.Tr=new re(Re.Er),this.dr=new re(Re.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const n=new Re(e,t);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(e,t){e.forEach(n=>this.addReference(n,t))}removeReference(e,t){this.Vr(new Re(e,t))}mr(e,t){e.forEach(n=>this.removeReference(n,t))}gr(e){const t=new M(new X([])),n=new Re(t,e),i=new Re(t,e+1),s=[];return this.dr.forEachInRange([n,i],o=>{this.Vr(o),s.push(o.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new M(new X([])),n=new Re(t,e),i=new Re(t,e+1);let s=W();return this.dr.forEachInRange([n,i],o=>{s=s.add(o.key)}),s}containsKey(e){const t=new Re(e,0),n=this.Tr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class Re{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return M.comparator(e.key,t.key)||H(e.wr,t.wr)}static Ar(e,t){return H(e.wr,t.wr)||M.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new re(Re.Er)}checkEmpty(e){return w.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new al(s,t,n,i);this.mutationQueue.push(o);for(const c of i)this.br=this.br.add(new Re(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return w.resolve(o)}lookupMutationBatch(e,t){return w.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=this.vr(n),s=i<0?0:i;return w.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return w.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return w.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Re(t,0),i=new Re(t,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([n,i],o=>{const c=this.Dr(o.wr);s.push(c)}),w.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new re(H);return t.forEach(i=>{const s=new Re(i,0),o=new Re(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],c=>{n=n.add(c.wr)})}),w.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1;let s=n;M.isDocumentKey(s)||(s=s.child(""));const o=new Re(new M(s),0);let c=new re(H);return this.br.forEachWhile(l=>{const u=l.key.path;return!!n.isPrefixOf(u)&&(u.length===i&&(c=c.add(l.wr)),!0)},o),w.resolve(this.Cr(c))}Cr(e){const t=[];return e.forEach(n=>{const i=this.Dr(n);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){q(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let n=this.br;return w.forEach(t.mutations,i=>{const s=new Re(i.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=n})}On(e){}containsKey(e,t){const n=new Re(t,0),i=this.br.firstAfterOrEqual(n);return w.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,w.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xw{constructor(e){this.Mr=e,this.docs=function(){return new oe(M.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,i=this.docs.get(n),s=i?i.size:0,o=this.Mr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return w.resolve(n?n.document.mutableCopy():ce.newInvalidDocument(t))}getEntries(e,t){let n=Ye();return t.forEach(i=>{const s=this.docs.get(i);n=n.insert(i,s?s.document.mutableCopy():ce.newInvalidDocument(i))}),w.resolve(n)}getDocumentsMatchingQuery(e,t,n,i){let s=Ye();const o=t.path,c=new M(o.child("")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:u,value:{document:p}}=l.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||Zc(Vf(p),n)<=0||(i.has(p.key)||cs(t,p))&&(s=s.insert(p.key,p.mutableCopy()))}return w.resolve(s)}getAllFromCollectionGroup(e,t,n,i){j()}Or(e,t){return w.forEach(this.docs,n=>t(n))}newChangeBuffer(e){return new Nw(this)}getSize(e){return w.resolve(this.size)}}class Nw extends Km{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((n,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(n)}),w.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vw{constructor(e){this.persistence=e,this.Nr=new Ot(t=>Un(t),os),this.lastRemoteSnapshotVersion=z.min(),this.highestTargetId=0,this.Lr=0,this.Br=new ml,this.targetCount=0,this.kr=Gn.Bn()}forEachTarget(e,t){return this.Nr.forEach((n,i)=>t(i)),w.resolve()}getLastRemoteSnapshotVersion(e){return w.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return w.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),w.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Lr&&(this.Lr=t),w.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new Gn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,w.resolve()}updateTargetData(e,t){return this.Kn(t),w.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,w.resolve()}removeTargets(e,t,n){let i=0;const s=[];return this.Nr.forEach((o,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),w.waitFor(s).next(()=>i)}getTargetCount(e){return w.resolve(this.targetCount)}getTargetData(e,t){const n=this.Nr.get(t)||null;return w.resolve(n)}addMatchingKeys(e,t,n){return this.Br.Rr(t,n),w.resolve()}removeMatchingKeys(e,t,n){this.Br.mr(t,n);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),w.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),w.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Br.yr(t);return w.resolve(n)}containsKey(e,t){return w.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Qe(0),this.Kr=!1,this.Kr=!0,this.$r=new Dw,this.referenceDelegate=e(this),this.Ur=new Vw(this),this.indexManager=new vw,this.remoteDocumentCache=function(i){return new xw(i)}(n=>this.referenceDelegate.Wr(n)),this.serializer=new Mm(t),this.Gr=new Sw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Cw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.qr[e.toKey()];return n||(n=new kw(t,this.referenceDelegate),this.qr[e.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,n){N("MemoryPersistence","Starting transaction:",e);const i=new Ow(this.Qr.next());return this.referenceDelegate.zr(),n(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,t){return w.or(Object.values(this.qr).map(n=>()=>n.containsKey(e,t)))}}class Ow extends Lf{constructor(e){super(),this.currentSequenceNumber=e}}class Qo{constructor(e){this.persistence=e,this.Jr=new ml,this.Yr=null}static Zr(e){return new Qo(e)}get Xr(){if(this.Yr)return this.Yr;throw j()}addReference(e,t,n){return this.Jr.addReference(n,t),this.Xr.delete(n.toString()),w.resolve()}removeReference(e,t,n){return this.Jr.removeReference(n,t),this.Xr.add(n.toString()),w.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),w.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(i=>this.Xr.add(i.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>n.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return w.forEach(this.Xr,n=>{const i=M.fromPath(n);return this.ei(e,i).next(s=>{s||t.removeEntry(i,z.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(n=>{n?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return w.or([()=>w.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}class To{constructor(e,t){this.persistence=e,this.ti=new Ot(n=>$e(n.path),(n,i)=>n.isEqual(i)),this.garbageCollector=Gm(this,t)}static Zr(e,t){return new To(e,t)}zr(){}jr(e){return w.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Yn(e){const t=this.er(e);return this.persistence.getTargetCache().getTargetCount(e).next(n=>t.next(i=>n+i))}er(e){let t=0;return this.Zn(e,n=>{t++}).next(()=>t)}Zn(e,t){return w.forEach(this.ti,(n,i)=>this.nr(e,n,i).next(s=>s?w.resolve():t(i)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.Or(e,o=>this.nr(e,o,t).next(c=>{c||(n++,s.removeEntry(o,z.min()))})).next(()=>s.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.ti.set(t,e.currentSequenceNumber),w.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.ti.set(n,e.currentSequenceNumber),w.resolve()}removeReference(e,t,n){return this.ti.set(n,e.currentSequenceNumber),w.resolve()}updateLimboDocument(e,t){return this.ti.set(t,e.currentSequenceNumber),w.resolve()}Wr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=no(e.data.value)),t}nr(e,t,n){return w.or([()=>this.persistence.Hr(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.ti.get(t);return w.resolve(i!==void 0&&i>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lw{constructor(e){this.serializer=e}O(e,t,n,i){const s=new Uo("createOrUpgrade",t);n<1&&i>=1&&(function(l){l.createObjectStore("owner")}(e),function(l){l.createObjectStore("mutationQueues",{keyPath:"userId"}),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Vd,{unique:!0}),l.createObjectStore("documentMutations")}(e),Eh(e),function(l){l.createObjectStore("remoteDocuments")}(e));let o=w.resolve();return n<3&&i>=3&&(n!==0&&(function(l){l.deleteObjectStore("targetDocuments"),l.deleteObjectStore("targets"),l.deleteObjectStore("targetGlobal")}(e),Eh(e)),o=o.next(()=>function(l){const u=l.store("targetGlobal"),p={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:z.min().toTimestamp(),targetCount:0};return u.put("targetGlobalKey",p)}(s))),n<4&&i>=4&&(n!==0&&(o=o.next(()=>function(l,u){return u.store("mutations").U().next(p=>{l.deleteObjectStore("mutations"),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Vd,{unique:!0});const f=u.store("mutations"),g=p.map(I=>f.put(I));return w.waitFor(g)})}(e,s))),o=o.next(()=>{(function(l){l.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),n<5&&i>=5&&(o=o.next(()=>this.ni(s))),n<6&&i>=6&&(o=o.next(()=>(function(l){l.createObjectStore("remoteDocumentGlobal")}(e),this.ri(s)))),n<7&&i>=7&&(o=o.next(()=>this.ii(s))),n<8&&i>=8&&(o=o.next(()=>this.si(e,s))),n<9&&i>=9&&(o=o.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)})),n<10&&i>=10&&(o=o.next(()=>this.oi(s))),n<11&&i>=11&&(o=o.next(()=>{(function(l){l.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(l){l.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),n<12&&i>=12&&(o=o.next(()=>{(function(l){const u=l.createObjectStore("documentOverlays",{keyPath:vT});u.createIndex("collectionPathOverlayIndex",IT,{unique:!1}),u.createIndex("collectionGroupOverlayIndex",ET,{unique:!1})})(e)})),n<13&&i>=13&&(o=o.next(()=>function(l){const u=l.createObjectStore("remoteDocumentsV14",{keyPath:cT});u.createIndex("documentKeyIndex",lT),u.createIndex("collectionGroupIndex",uT)}(e)).next(()=>this._i(e,s)).next(()=>e.deleteObjectStore("remoteDocuments"))),n<14&&i>=14&&(o=o.next(()=>this.ai(e,s))),n<15&&i>=15&&(o=o.next(()=>function(l){l.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),l.createObjectStore("indexState",{keyPath:mT}).createIndex("sequenceNumberIndex",gT,{unique:!1}),l.createObjectStore("indexEntries",{keyPath:_T}).createIndex("documentKeyIndex",yT,{unique:!1})}(e))),n<16&&i>=16&&(o=o.next(()=>{t.objectStore("indexState").clear()}).next(()=>{t.objectStore("indexEntries").clear()})),n<17&&i>=17&&(o=o.next(()=>{(function(l){l.createObjectStore("globals",{keyPath:"name"})})(e)})),o}ri(e){let t=0;return e.store("remoteDocuments").J((n,i)=>{t+=bo(i)}).next(()=>{const n={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)})}ni(e){const t=e.store("mutationQueues"),n=e.store("mutations");return t.U().next(i=>w.forEach(i,s=>{const o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return n.U("userMutationsIndex",o).next(c=>w.forEach(c,l=>{q(l.userId===s.userId);const u=Dn(this.serializer,l);return Bm(e,s.userId,u).next(()=>{})}))}))}ii(e){const t=e.store("targetDocuments"),n=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(i=>{const s=[];return n.J((o,c)=>{const l=new X(o),u=function(f){return[0,$e(f)]}(l);s.push(t.get(u).next(p=>p?w.resolve():(f=>t.put({targetId:0,path:$e(f),sequenceNumber:i.highestListenSequenceNumber}))(l)))}).next(()=>w.waitFor(s))})}si(e,t){e.createObjectStore("collectionParents",{keyPath:fT});const n=t.store("collectionParents"),i=new fl,s=o=>{if(i.add(o)){const c=o.lastSegment(),l=o.popLast();return n.put({collectionId:c,parent:$e(l)})}};return t.store("remoteDocuments").J({H:!0},(o,c)=>{const l=new X(o);return s(l.popLast())}).next(()=>t.store("documentMutations").J({H:!0},([o,c,l],u)=>{const p=at(c);return s(p.popLast())}))}oi(e){const t=e.store("targets");return t.J((n,i)=>{const s=Ri(i),o=Fm(this.serializer,s);return t.put(o)})}_i(e,t){const n=t.store("remoteDocuments"),i=[];return n.J((s,o)=>{const c=t.store("remoteDocumentsV14"),l=function(f){return f.document?new M(X.fromString(f.document.name).popFirst(5)):f.noDocument?M.fromSegments(f.noDocument.path):f.unknownDocument?M.fromSegments(f.unknownDocument.path):j()}(o).path.toArray(),u={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(c.put(u))}).next(()=>w.waitFor(i))}ai(e,t){const n=t.store("mutations"),i=Hm(this.serializer),s=new gl(Qo.Zr,this.serializer.ct);return n.U().next(o=>{const c=new Map;return o.forEach(l=>{var u;let p=(u=c.get(l.userId))!==null&&u!==void 0?u:W();Dn(this.serializer,l).keys().forEach(f=>p=p.add(f)),c.set(l.userId,p)}),w.forEach(c,(l,u)=>{const p=new Se(u),f=Ho.lt(this.serializer,p),g=s.getIndexManager(p),I=Wo.lt(p,this.serializer,g,s.referenceDelegate);return new Wm(i,I,f,g).recalculateAndSaveOverlaysForDocumentKeys(new ac(t,Qe.oe),l).next()})})}}function Eh(r){r.createObjectStore("targetDocuments",{keyPath:hT}).createIndex("documentTargetsIndex",pT,{unique:!0}),r.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",dT,{unique:!0}),r.createObjectStore("targetGlobal")}const $a="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class _l{constructor(e,t,n,i,s,o,c,l,u,p,f=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.ui=s,this.window=o,this.document=c,this.ci=u,this.li=p,this.hi=f,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=g=>Promise.resolve(),!_l.D())throw new x(R.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new ww(this,i),this.Ai=t+"main",this.serializer=new Mm(l),this.Ri=new ut(this.Ai,this.hi,new Lw(this.serializer)),this.$r=new pw,this.Ur=new Ew(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Hm(this.serializer),this.Gr=new hw,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,p===!1&&Ie("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new x(R.FAILED_PRECONDITION,$a);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Ur.getHighestSequenceNumber(e))}).then(e=>{this.Qr=new Qe(e,this.ci)}).then(()=>{this.Kr=!0}).catch(e=>(this.Ri&&this.Ri.close(),Promise.reject(e)))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Gs(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(e).next(t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(e)).next(t=>this.isPrimary&&!t?this.bi(e).next(()=>!1):!!t&&this.Di(e).next(()=>!0))).catch(e=>{if(gn(e))return N("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return N("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.ui.enqueueRetryable(()=>this.di(e)),this.isPrimary=e})}wi(e){return Ii(e).get("owner").next(t=>w.resolve(this.vi(t)))}Ci(e){return Gs(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const n=Pe(t,"clientMetadata");return n.U().next(i=>{const s=this.xi(i,18e5),o=i.filter(c=>s.indexOf(c)===-1);return w.forEach(o,c=>n.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?w.resolve(!0):Ii(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new x(R.FAILED_PRECONDITION,$a);return!1}}return!(!this.networkEnabled||!this.inForeground)||Gs(e).U().next(n=>this.xi(n,5e3).find(i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,c=this.networkEnabled===i.networkEnabled;if(s||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&N("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const t=new ac(e,Qe.oe);return this.bi(t).next(()=>this.Ci(t))}),this.Ri.close(),this.qi()}xi(e,t){return e.filter(n=>this.Mi(n.updateTimeMs,t)&&!this.Ni(n.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",e=>Gs(e).U().next(t=>this.xi(t,18e5).map(n=>n.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return Wo.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new Iw(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return Ho.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,n){N("IndexedDbPersistence","Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=function(l){return l===17?wT:l===16?TT:l===15?tl:l===14?qf:l===13?Bf:l===12?bT:l===11?Uf:void j()}(this.hi);let o;return this.Ri.runTransaction(e,i,s,c=>(o=new ac(c,this.Qr?this.Qr.next():Qe.oe),t==="readwrite-primary"?this.wi(o).next(l=>!!l||this.Si(o)).next(l=>{if(!l)throw Ie(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new x(R.FAILED_PRECONDITION,Of);return n(o)}).next(l=>this.Di(o).next(()=>l)):this.Ki(o).next(()=>n(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}Ki(e){return Ii(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new x(R.FAILED_PRECONDITION,$a)})}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Ii(e).put("owner",t)}static D(){return ut.D()}bi(e){const t=Ii(e);return t.get("owner").next(n=>this.vi(n)?(N("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):w.resolve())}Mi(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(Ie(`Detected an update time that is in the future: ${e} > ${n}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;sp()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const n=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return N("IndexedDbPersistence",`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return Ie("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){Ie("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Ii(r){return Pe(r,"owner")}function Gs(r){return Pe(r,"clientMetadata")}function yl(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl{constructor(e,t,n,i){this.targetId=e,this.fromCache=t,this.$i=n,this.Ui=i}static Wi(e,t){let n=W(),i=W();for(const s of t.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new vl(e,t.fromCache,n,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mw{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qm{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return sp()?8:Mf(Ae())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,n,i){const s={result:null};return this.Yi(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Zi(e,t,i,n).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new Mw;return this.Xi(e,t,o).next(c=>{if(s.result=c,this.zi)return this.es(e,t,o,c.size)})}).next(()=>s.result)}es(e,t,n,i){return n.documentReadCount<this.ji?(ar()<=Y.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",cr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),w.resolve()):(ar()<=Y.DEBUG&&N("QueryEngine","Query:",cr(t),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.Hi*i?(ar()<=Y.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",cr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ze(t))):w.resolve())}Yi(e,t){if(Hd(t))return w.resolve(null);let n=ze(t);return this.indexManager.getIndexType(e,n).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=yo(t,null,"F"),n=ze(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(s=>{const o=W(...s);return this.Ji.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,n).next(l=>{const u=this.ts(t,c);return this.ns(t,u,o,l.readTime)?this.Yi(e,yo(t,null,"F")):this.rs(e,u,t,l)}))})))}Zi(e,t,n,i){return Hd(t)||i.isEqual(z.min())?w.resolve(null):this.Ji.getDocuments(e,n).next(s=>{const o=this.ts(t,s);return this.ns(t,o,n,i)?w.resolve(null):(ar()<=Y.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),cr(t)),this.rs(e,o,t,Nf(i,-1)).next(c=>c))})}ts(e,t){let n=new re(am(e));return t.forEach((i,s)=>{cs(e,s)&&(n=n.add(s))}),n}ns(e,t,n,i){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,t,n){return ar()<=Y.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",cr(t)),this.Ji.getDocumentsMatchingQuery(e,t,tt.min(),n)}rs(e,t,n,i){return this.Ji.getDocumentsMatchingQuery(e,n,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fw{constructor(e,t,n,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new oe(H),this._s=new Ot(s=>Un(s),os),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(n)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Wm(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function Jm(r,e,t,n){return new Fw(r,e,t,n)}async function Ym(r,e){const t=O(r);return await t.persistence.runTransaction("Handle user change","readonly",n=>{let i;return t.mutationQueue.getAllMutationBatches(n).next(s=>(i=s,t.ls(e),t.mutationQueue.getAllMutationBatches(n))).next(s=>{const o=[],c=[];let l=W();for(const u of i){o.push(u.batchId);for(const p of u.mutations)l=l.add(p.key)}for(const u of s){c.push(u.batchId);for(const p of u.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(n,l).next(u=>({hs:u,removedBatchIds:o,addedBatchIds:c}))})})}function jw(r,e){const t=O(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const i=e.batch.keys(),s=t.cs.newChangeBuffer({trackRemovals:!0});return function(c,l,u,p){const f=u.batch,g=f.keys();let I=w.resolve();return g.forEach(D=>{I=I.next(()=>p.getEntry(l,D)).next(k=>{const S=u.docVersions.get(D);q(S!==null),k.version.compareTo(S)<0&&(f.applyToRemoteDocument(k,u),k.isValidDocument()&&(k.setReadTime(u.commitVersion),p.addEntry(k)))})}),I.next(()=>c.mutationQueue.removeMutationBatch(l,f))}(t,n,e,s).next(()=>s.apply(n)).next(()=>t.mutationQueue.performConsistencyCheck(n)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(n,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(c){let l=W();for(let u=0;u<c.mutationResults.length;++u)c.mutationResults[u].transformResults.length>0&&(l=l.add(c.batch.mutations[u].key));return l}(e))).next(()=>t.localDocuments.getDocuments(n,i))})}function Xm(r){const e=O(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function Uw(r,e){const t=O(r),n=e.snapshotVersion;let i=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});i=t.os;const c=[];e.targetChanges.forEach((p,f)=>{const g=i.get(f);if(!g)return;c.push(t.Ur.removeMatchingKeys(s,p.removedDocuments,f).next(()=>t.Ur.addMatchingKeys(s,p.addedDocuments,f)));let I=g.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(f)!==null?I=I.withResumeToken(ge.EMPTY_BYTE_STRING,z.min()).withLastLimboFreeSnapshotVersion(z.min()):p.resumeToken.approximateByteSize()>0&&(I=I.withResumeToken(p.resumeToken,n)),i=i.insert(f,I),function(k,S,F){return k.resumeToken.approximateByteSize()===0||S.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=3e8?!0:F.addedDocuments.size+F.modifiedDocuments.size+F.removedDocuments.size>0}(g,I,p)&&c.push(t.Ur.updateTargetData(s,I))});let l=Ye(),u=W();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,p))}),c.push(Zm(s,o,e.documentUpdates).next(p=>{l=p.Ps,u=p.Is})),!n.isEqual(z.min())){const p=t.Ur.getLastRemoteSnapshotVersion(s).next(f=>t.Ur.setTargetsMetadata(s,s.currentSequenceNumber,n));c.push(p)}return w.waitFor(c).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,u)).next(()=>l)}).then(s=>(t.os=i,s))}function Zm(r,e,t){let n=W(),i=W();return t.forEach(s=>n=n.add(s)),e.getEntries(r,n).next(s=>{let o=Ye();return t.forEach((c,l)=>{const u=s.get(c);l.isFoundDocument()!==u.isFoundDocument()&&(i=i.add(c)),l.isNoDocument()&&l.version.isEqual(z.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!u.isValidDocument()||l.version.compareTo(u.version)>0||l.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):N("LocalStore","Ignoring outdated watch update for ",c,". Current version:",u.version," Watch version:",l.version)}),{Ps:o,Is:i}})}function Bw(r,e){const t=O(r);return t.persistence.runTransaction("Get next mutation batch","readonly",n=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e)))}function Pr(r,e){const t=O(r);return t.persistence.runTransaction("Allocate target","readwrite",n=>{let i;return t.Ur.getTargetData(n,e).next(s=>s?(i=s,w.resolve(i)):t.Ur.allocateTargetId(n).next(o=>(i=new wt(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.Ur.addTargetData(n,i).next(()=>i))))}).then(n=>{const i=t.os.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.os=t.os.insert(n.targetId,n),t._s.set(e,n.targetId)),n})}async function Rr(r,e,t){const n=O(r),i=n.os.get(e),s=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",s,o=>n.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!gn(o))throw o;N("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}n.os=n.os.remove(e),n._s.delete(i.target)}function wo(r,e,t){const n=O(r);let i=z.min(),s=W();return n.persistence.runTransaction("Execute query","readwrite",o=>function(l,u,p){const f=O(l),g=f._s.get(p);return g!==void 0?w.resolve(f.os.get(g)):f.Ur.getTargetData(u,p)}(n,o,ze(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,n.Ur.getMatchingKeysForTargetId(o,c.targetId).next(l=>{s=l})}).next(()=>n.ss.getDocumentsMatchingQuery(o,e,t?i:z.min(),t?s:W())).next(c=>(ng(n,om(e),c),{documents:c,Ts:s})))}function eg(r,e){const t=O(r),n=O(t.Ur),i=t.os.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",s=>n.ot(s,e).next(o=>o?o.target:null))}function tg(r,e){const t=O(r),n=t.us.get(e)||z.min();return t.persistence.runTransaction("Get new document changes","readonly",i=>t.cs.getAllFromCollectionGroup(i,e,Nf(n,-1),Number.MAX_SAFE_INTEGER)).then(i=>(ng(t,e,i),i))}function ng(r,e,t){let n=r.us.get(e)||z.min();t.forEach((i,s)=>{s.readTime.compareTo(n)>0&&(n=s.readTime)}),r.us.set(e,n)}async function qw(r,e,t,n){const i=O(r);let s=W(),o=Ye();for(const u of t){const p=e.Es(u.metadata.name);u.document&&(s=s.add(p));const f=e.ds(u);f.setReadTime(e.As(u.metadata.readTime)),o=o.insert(p,f)}const c=i.cs.newChangeBuffer({trackRemovals:!0}),l=await Pr(i,function(p){return ze(qr(X.fromString(`__bundle__/docs/${p}`)))}(n));return i.persistence.runTransaction("Apply bundle documents","readwrite",u=>Zm(u,c,o).next(p=>(c.apply(u),p)).next(p=>i.Ur.removeMatchingKeysForTargetId(u,l.targetId).next(()=>i.Ur.addMatchingKeys(u,s,l.targetId)).next(()=>i.localDocuments.getLocalViewOfDocuments(u,p.Ps,p.Is)).next(()=>p.Ps)))}async function $w(r,e,t=W()){const n=await Pr(r,ze(hl(e.bundledQuery))),i=O(r);return i.persistence.runTransaction("Save named query","readwrite",s=>{const o=be(e.readTime);if(n.snapshotVersion.compareTo(o)>=0)return i.Gr.saveNamedQuery(s,e);const c=n.withResumeToken(ge.EMPTY_BYTE_STRING,o);return i.os=i.os.insert(c.targetId,c),i.Ur.updateTargetData(s,c).next(()=>i.Ur.removeMatchingKeysForTargetId(s,n.targetId)).next(()=>i.Ur.addMatchingKeys(s,t,n.targetId)).next(()=>i.Gr.saveNamedQuery(s,e))})}function bh(r,e){return`firestore_clients_${r}_${e}`}function Th(r,e,t){let n=`firestore_mutations_${r}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}function za(r,e){return`firestore_targets_${r}_${e}`}class Ao{constructor(e,t,n,i){this.user=e,this.batchId=t,this.state=n,this.error=i}static Rs(e,t,n){const i=JSON.parse(n);let s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new x(i.error.code,i.error.message))),o?new Ao(e,t,i.state,s):(Ie("SharedClientState",`Failed to parse mutation state for ID '${t}': ${n}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Oi{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static Rs(e,t){const n=JSON.parse(t);let i,s=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return s&&n.error&&(s=typeof n.error.message=="string"&&typeof n.error.code=="string",s&&(i=new x(n.error.code,n.error.message))),s?new Oi(e,n.state,i):(Ie("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Po{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Rs(e,t){const n=JSON.parse(t);let i=typeof n=="object"&&n.activeTargetIds instanceof Array,s=il();for(let o=0;i&&o<n.activeTargetIds.length;++o)i=Ff(n.activeTargetIds[o]),s=s.add(n.activeTargetIds[o]);return i?new Po(e,s):(Ie("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class Il{constructor(e,t){this.clientId=e,this.onlineState=t}static Rs(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new Il(t.clientId,t.onlineState):(Ie("SharedClientState",`Failed to parse online state: ${e}`),null)}}class Ec{constructor(){this.activeTargetIds=il()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Ga{constructor(e,t,n,i,s){this.window=e,this.ui=t,this.persistenceKey=n,this.ps=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new oe(H),this.started=!1,this.bs=[];const o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Ds=bh(this.persistenceKey,this.ps),this.vs=function(l){return`firestore_sequence_number_${l}`}(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new Ec),this.Cs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.xs=function(l){return`firestore_online_state_${l}`}(this.persistenceKey),this.Os=function(l){return`firestore_bundle_loaded_v2_${l}`}(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Qi();for(const n of e){if(n===this.ps)continue;const i=this.getItem(bh(this.persistenceKey,n));if(i){const s=Po.Rs(n,i);s&&(this.Ss=this.Ss.insert(s.clientId,s))}}this.Ns();const t=this.storage.getItem(this.xs);if(t){const n=this.Ls(t);n&&this.Bs(n)}for(const n of this.bs)this.ws(n);this.bs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.vs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(e){let t=!1;return this.Ss.forEach((n,i)=>{i.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.qs(e,"pending")}updateMutationState(e,t,n){this.qs(e,t,n),this.Qs(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(za(this.persistenceKey,e));if(i){const s=Oi.Rs(e,i);s&&(n=s.state)}}return t&&this.Ks.fs(e),this.Ns(),n}removeLocalQueryTarget(e){this.Ks.gs(e),this.Ns()}isLocalQueryTarget(e){return this.Ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(za(this.persistenceKey,e))}updateQueryState(e,t,n){this.$s(e,t,n)}handleUserChange(e,t,n){t.forEach(i=>{this.Qs(i)}),this.currentUser=e,n.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Us(e)}notifyBundleLoaded(e){this.Ws(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return N("SharedClientState","READ",e,t),t}setItem(e,t){N("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){N("SharedClientState","REMOVE",e),this.storage.removeItem(e)}ws(e){const t=e;if(t.storageArea===this.storage){if(N("SharedClientState","EVENT",t.key,t.newValue),t.key===this.Ds)return void Ie("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.Cs.test(t.key)){if(t.newValue==null){const n=this.Gs(t.key);return this.zs(n,null)}{const n=this.js(t.key,t.newValue);if(n)return this.zs(n.clientId,n)}}else if(this.Fs.test(t.key)){if(t.newValue!==null){const n=this.Hs(t.key,t.newValue);if(n)return this.Js(n)}}else if(this.Ms.test(t.key)){if(t.newValue!==null){const n=this.Ys(t.key,t.newValue);if(n)return this.Zs(n)}}else if(t.key===this.xs){if(t.newValue!==null){const n=this.Ls(t.newValue);if(n)return this.Bs(n)}}else if(t.key===this.vs){const n=function(s){let o=Qe.oe;if(s!=null)try{const c=JSON.parse(s);q(typeof c=="number"),o=c}catch(c){Ie("SharedClientState","Failed to read sequence number from WebStorage",c)}return o}(t.newValue);n!==Qe.oe&&this.sequenceNumberHandler(n)}else if(t.key===this.Os){const n=this.Xs(t.newValue);await Promise.all(n.map(i=>this.syncEngine.eo(i)))}}}else this.bs.push(t)})}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(e,t,n){const i=new Ao(this.currentUser,e,t,n),s=Th(this.persistenceKey,this.currentUser,e);this.setItem(s,i.Vs())}Qs(e){const t=Th(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Us(e){const t={clientId:this.ps,onlineState:e};this.storage.setItem(this.xs,JSON.stringify(t))}$s(e,t,n){const i=za(this.persistenceKey,e),s=new Oi(e,t,n);this.setItem(i,s.Vs())}Ws(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Os,t)}Gs(e){const t=this.Cs.exec(e);return t?t[1]:null}js(e,t){const n=this.Gs(e);return Po.Rs(n,t)}Hs(e,t){const n=this.Fs.exec(e),i=Number(n[1]),s=n[2]!==void 0?n[2]:null;return Ao.Rs(new Se(s),i,t)}Ys(e,t){const n=this.Ms.exec(e),i=Number(n[1]);return Oi.Rs(i,t)}Ls(e){return Il.Rs(e)}Xs(e){return JSON.parse(e)}async Js(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.no(e.batchId,e.state,e.error);N("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Zs(e){return this.syncEngine.ro(e.targetId,e.state,e.error)}zs(e,t){const n=t?this.Ss.insert(e,t):this.Ss.remove(e),i=this.ks(this.Ss),s=this.ks(n),o=[],c=[];return s.forEach(l=>{i.has(l)||o.push(l)}),i.forEach(l=>{s.has(l)||c.push(l)}),this.syncEngine.io(o,c).then(()=>{this.Ss=n})}Bs(e){this.Ss.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ks(e){let t=il();return e.forEach((n,i)=>{t=t.unionWith(i.activeTargetIds)}),t}}class rg{constructor(){this.so=new Ec,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,n){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Ec,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zw{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wh{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){N("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){N("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ks=null;function Ka(){return Ks===null?Ks=function(){return 268435456+Math.round(2147483648*Math.random())}():Ks++,"0x"+Ks.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gw={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kw{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ue="WebChannelConnection";class Hw extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const n=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=n+"://"+t.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(t,n,i,s,o){const c=Ka(),l=this.xo(t,n.toUriEncodedString());N("RestConnection",`Sending RPC '${t}' ${c}:`,l,i);const u={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(u,s,o),this.No(t,l,u,i).then(p=>(N("RestConnection",`Received RPC '${t}' ${c}: `,p),p),p=>{throw et("RestConnection",`RPC '${t}' ${c} failed with error: `,p,"url: ",l,"request:",i),p})}Lo(t,n,i,s,o,c){return this.Mo(t,n,i,s,o)}Oo(t,n,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Br}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}xo(t,n){const i=Gw[t];return`${this.Do}/v1/${n}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,n,i){const s=Ka();return new Promise((o,c)=>{const l=new wf;l.setWithCredentials(!0),l.listenOnce(Af.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case Zs.NO_ERROR:const p=l.getResponseJson();N(Ue,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(p)),o(p);break;case Zs.TIMEOUT:N(Ue,`RPC '${e}' ${s} timed out`),c(new x(R.DEADLINE_EXCEEDED,"Request time out"));break;case Zs.HTTP_ERROR:const f=l.getStatus();if(N(Ue,`RPC '${e}' ${s} failed with status:`,f,"response text:",l.getResponseText()),f>0){let g=l.getResponseJson();Array.isArray(g)&&(g=g[0]);const I=g?.error;if(I&&I.status&&I.message){const D=function(S){const F=S.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf(F)>=0?F:R.UNKNOWN}(I.status);c(new x(D,I.message))}else c(new x(R.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new x(R.UNAVAILABLE,"Connection failed."));break;default:j()}}finally{N(Ue,`RPC '${e}' ${s} completed.`)}});const u=JSON.stringify(i);N(Ue,`RPC '${e}' ${s} sending request:`,i),l.send(t,"POST",u,n,15)})}Bo(e,t,n){const i=Ka(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Sf(),c=Rf(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Oo(l.initMessageHeaders,t,n),l.encodeInitMessageHeaders=!0;const p=s.join("");N(Ue,`Creating RPC '${e}' stream ${i}: ${p}`,l);const f=o.createWebChannel(p,l);let g=!1,I=!1;const D=new Kw({Io:S=>{I?N(Ue,`Not sending because RPC '${e}' stream ${i} is closed:`,S):(g||(N(Ue,`Opening RPC '${e}' stream ${i} transport.`),f.open(),g=!0),N(Ue,`RPC '${e}' stream ${i} sending:`,S),f.send(S))},To:()=>f.close()}),k=(S,F,U)=>{S.listen(F,B=>{try{U(B)}catch(G){setTimeout(()=>{throw G},0)}})};return k(f,wi.EventType.OPEN,()=>{I||(N(Ue,`RPC '${e}' stream ${i} transport opened.`),D.yo())}),k(f,wi.EventType.CLOSE,()=>{I||(I=!0,N(Ue,`RPC '${e}' stream ${i} transport closed`),D.So())}),k(f,wi.EventType.ERROR,S=>{I||(I=!0,et(Ue,`RPC '${e}' stream ${i} transport errored:`,S),D.So(new x(R.UNAVAILABLE,"The operation could not be completed")))}),k(f,wi.EventType.MESSAGE,S=>{var F;if(!I){const U=S.data[0];q(!!U);const B=U,G=B.error||((F=B[0])===null||F===void 0?void 0:F.error);if(G){N(Ue,`RPC '${e}' stream ${i} received error:`,G);const J=G.status;let K=function(y){const b=Te[y];if(b!==void 0)return Em(b)}(J),E=G.message;K===void 0&&(K=R.INTERNAL,E="Unknown error status: "+J+" with message "+G.message),I=!0,D.So(new x(K,E)),f.close()}else N(Ue,`RPC '${e}' stream ${i} received:`,U),D.bo(U)}}),k(c,Pf.STAT_EVENT,S=>{S.stat===sc.PROXY?N(Ue,`RPC '${e}' stream ${i} detected buffering proxy`):S.stat===sc.NOPROXY&&N(Ue,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{D.wo()},0),D}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ig(){return typeof window<"u"?window:null}function oo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hs(r){return new tw(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El{constructor(e,t,n=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=t,this.ko=n,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-n);i>0&&N("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg{constructor(e,t,n,i,s,o,c,l){this.ui=e,this.Ho=n,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new El(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===R.RESOURCE_EXHAUSTED?(Ie(t.toString()),Ie("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,i])=>{this.Yo===t&&this.P_(n,i)},n=>{e(()=>{const i=new x(R.UNKNOWN,"Fetching auth token failed: "+n.message);return this.I_(i)})})}P_(e,t){const n=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{n(()=>this.listener.Eo())}),this.stream.Ro(()=>{n(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{n(()=>this.I_(i))}),this.stream.onMessage(i=>{n(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return N("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(N("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Ww extends sg{constructor(e,t,n,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,i,o),this.serializer=s}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=iw(this.serializer,e),n=function(s){if(!("targetChange"in s))return z.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?z.min():o.readTime?be(o.readTime):z.min()}(e);return this.listener.d_(t,n)}A_(e){const t={};t.database=gc(this.serializer),t.addTarget=function(s,o){let c;const l=o.target;if(c=go(l)?{documents:km(s,l)}:{query:Ko(s,l)._t},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Am(s,o.resumeToken);const u=fc(s,o.expectedCount);u!==null&&(c.expectedCount=u)}else if(o.snapshotVersion.compareTo(z.min())>0){c.readTime=Ar(s,o.snapshotVersion.toTimestamp());const u=fc(s,o.expectedCount);u!==null&&(c.expectedCount=u)}return c}(this.serializer,e);const n=ow(this.serializer,e);n&&(t.labels=n),this.a_(t)}R_(e){const t={};t.database=gc(this.serializer),t.removeTarget=e,this.a_(t)}}class Qw extends sg{constructor(e,t,n,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return q(!!e.streamToken),this.lastStreamToken=e.streamToken,q(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){q(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=sw(e.writeResults,e.commitTime),n=be(e.commitTime);return this.listener.g_(n,t)}p_(){const e={};e.database=gc(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(n=>Ji(this.serializer,n))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jw extends class{}{constructor(e,t,n,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new x(R.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,n,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Mo(e,mc(t,n),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new x(R.UNKNOWN,s.toString())})}Lo(e,t,n,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Lo(e,mc(t,n),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new x(R.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class Yw{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Ie(t),this.D_=!1):N("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xw{constructor(e,t,n,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(o=>{n.enqueueAndForget(async()=>{yn(this)&&(N("RemoteStore","Restarting streams for network reachability change."),await async function(l){const u=O(l);u.L_.add(4),await Gr(u),u.q_.set("Unknown"),u.L_.delete(4),await ps(u)}(this))})}),this.q_=new Yw(n,i)}}async function ps(r){if(yn(r))for(const e of r.B_)await e(!0)}async function Gr(r){for(const e of r.B_)await e(!1)}function Jo(r,e){const t=O(r);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),wl(t)?Tl(t):Hr(t).r_()&&bl(t,e))}function Sr(r,e){const t=O(r),n=Hr(t);t.N_.delete(e),n.r_()&&og(t,e),t.N_.size===0&&(n.r_()?n.o_():yn(t)&&t.q_.set("Unknown"))}function bl(r,e){if(r.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(z.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Hr(r).A_(e)}function og(r,e){r.Q_.xe(e),Hr(r).R_(e)}function Tl(r){r.Q_=new YT({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>r.N_.get(e)||null,tt:()=>r.datastore.serializer.databaseId}),Hr(r).start(),r.q_.v_()}function wl(r){return yn(r)&&!Hr(r).n_()&&r.N_.size>0}function yn(r){return O(r).L_.size===0}function ag(r){r.Q_=void 0}async function Zw(r){r.q_.set("Online")}async function eA(r){r.N_.forEach((e,t)=>{bl(r,e)})}async function tA(r,e){ag(r),wl(r)?(r.q_.M_(e),Tl(r)):r.q_.set("Unknown")}async function nA(r,e,t){if(r.q_.set("Online"),e instanceof wm&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const c of s.targetIds)i.N_.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.N_.delete(c),i.Q_.removeTarget(c))}(r,e)}catch(n){N("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Ro(r,n)}else if(e instanceof so?r.Q_.Ke(e):e instanceof Tm?r.Q_.He(e):r.Q_.We(e),!t.isEqual(z.min()))try{const n=await Xm(r.localStore);t.compareTo(n)>=0&&await function(s,o){const c=s.Q_.rt(o);return c.targetChanges.forEach((l,u)=>{if(l.resumeToken.approximateByteSize()>0){const p=s.N_.get(u);p&&s.N_.set(u,p.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,u)=>{const p=s.N_.get(l);if(!p)return;s.N_.set(l,p.withResumeToken(ge.EMPTY_BYTE_STRING,p.snapshotVersion)),og(s,l);const f=new wt(p.target,l,u,p.sequenceNumber);bl(s,f)}),s.remoteSyncer.applyRemoteEvent(c)}(r,t)}catch(n){N("RemoteStore","Failed to raise snapshot:",n),await Ro(r,n)}}async function Ro(r,e,t){if(!gn(e))throw e;r.L_.add(1),await Gr(r),r.q_.set("Offline"),t||(t=()=>Xm(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{N("RemoteStore","Retrying IndexedDB access"),await t(),r.L_.delete(1),await ps(r)})}function cg(r,e){return e().catch(t=>Ro(r,t,e))}async function Kr(r){const e=O(r),t=un(e);let n=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;rA(e);)try{const i=await Bw(e.localStore,n);if(i===null){e.O_.length===0&&t.o_();break}n=i.batchId,iA(e,i)}catch(i){await Ro(e,i)}lg(e)&&ug(e)}function rA(r){return yn(r)&&r.O_.length<10}function iA(r,e){r.O_.push(e);const t=un(r);t.r_()&&t.V_&&t.m_(e.mutations)}function lg(r){return yn(r)&&!un(r).n_()&&r.O_.length>0}function ug(r){un(r).start()}async function sA(r){un(r).p_()}async function oA(r){const e=un(r);for(const t of r.O_)e.m_(t.mutations)}async function aA(r,e,t){const n=r.O_.shift(),i=cl.from(n,e,t);await cg(r,()=>r.remoteSyncer.applySuccessfulWrite(i)),await Kr(r)}async function cA(r,e){e&&un(r).V_&&await async function(n,i){if(function(o){return Im(o)&&o!==R.ABORTED}(i.code)){const s=n.O_.shift();un(n).s_(),await cg(n,()=>n.remoteSyncer.rejectFailedWrite(s.batchId,i)),await Kr(n)}}(r,e),lg(r)&&ug(r)}async function Ah(r,e){const t=O(r);t.asyncQueue.verifyOperationInProgress(),N("RemoteStore","RemoteStore received new credentials");const n=yn(t);t.L_.add(3),await Gr(t),n&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await ps(t)}async function bc(r,e){const t=O(r);e?(t.L_.delete(2),await ps(t)):e||(t.L_.add(2),await Gr(t),t.q_.set("Unknown"))}function Hr(r){return r.K_||(r.K_=function(t,n,i){const s=O(t);return s.w_(),new Ww(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(r.datastore,r.asyncQueue,{Eo:Zw.bind(null,r),Ro:eA.bind(null,r),mo:tA.bind(null,r),d_:nA.bind(null,r)}),r.B_.push(async e=>{e?(r.K_.s_(),wl(r)?Tl(r):r.q_.set("Unknown")):(await r.K_.stop(),ag(r))})),r.K_}function un(r){return r.U_||(r.U_=function(t,n,i){const s=O(t);return s.w_(),new Qw(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(r.datastore,r.asyncQueue,{Eo:()=>Promise.resolve(),Ro:sA.bind(null,r),mo:cA.bind(null,r),f_:oA.bind(null,r),g_:aA.bind(null,r)}),r.B_.push(async e=>{e?(r.U_.s_(),await Kr(r)):(await r.U_.stop(),r.O_.length>0&&(N("RemoteStore",`Stopping write stream with ${r.O_.length} pending writes`),r.O_=[]))})),r.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Al{constructor(e,t,n,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=i,this.removalCallback=s,this.deferred=new ke,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,i,s){const o=Date.now()+n,c=new Al(e,t,o,i,s);return c.start(n),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new x(R.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Wr(r,e){if(Ie("AsyncQueue",`${e}: ${r}`),gn(r))return new x(R.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e){this.comparator=e?(t,n)=>e(t,n)||M.comparator(t.key,n.key):(t,n)=>M.comparator(t.key,n.key),this.keyedMap=Ai(),this.sortedSet=new oe(this.comparator)}static emptySet(e){return new gr(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof gr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=n.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new gr;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ph{constructor(){this.W_=new oe(M.comparator)}track(e){const t=e.doc.key,n=this.W_.get(t);n?e.type!==0&&n.type===3?this.W_=this.W_.insert(t,e):e.type===3&&n.type!==1?this.W_=this.W_.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.W_=this.W_.remove(t):e.type===1&&n.type===2?this.W_=this.W_.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):j():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,n)=>{e.push(n)}),e}}class Cr{constructor(e,t,n,i,s,o,c,l,u){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=u}static fromInitialDocuments(e,t,n,i,s){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new Cr(e,t,gr.emptySet(t),o,n,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&as(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==n[i].type||!t[i].doc.isEqual(n[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lA{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class uA{constructor(){this.queries=Rh(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,n){const i=O(t),s=i.queries;i.queries=Rh(),s.forEach((o,c)=>{for(const l of c.j_)l.onError(n)})})(this,new x(R.ABORTED,"Firestore shutting down"))}}function Rh(){return new Ot(r=>sm(r),as)}async function Pl(r,e){const t=O(r);let n=3;const i=e.query;let s=t.queries.get(i);s?!s.H_()&&e.J_()&&(n=2):(s=new lA,n=e.J_()?0:1);try{switch(n){case 0:s.z_=await t.onListen(i,!0);break;case 1:s.z_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const c=Wr(o,`Initialization of query '${cr(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.j_.push(e),e.Z_(t.onlineState),s.z_&&e.X_(s.z_)&&Sl(t)}async function Rl(r,e){const t=O(r),n=e.query;let i=3;const s=t.queries.get(n);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function dA(r,e){const t=O(r);let n=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const c of o.j_)c.X_(i)&&(n=!0);o.z_=i}}n&&Sl(t)}function hA(r,e,t){const n=O(r),i=n.queries.get(e);if(i)for(const s of i.j_)s.onError(t);n.queries.delete(e)}function Sl(r){r.Y_.forEach(e=>{e.next()})}var Tc,Sh;(Sh=Tc||(Tc={})).ea="default",Sh.Cache="cache";class Cl{constructor(e,t,n){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=n||{}}X_(e){if(!this.options.includeMetadataChanges){const n=[];for(const i of e.docChanges)i.type!==3&&n.push(i);e=new Cr(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const n=t!=="Offline";return(!this.options._a||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=Cr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Tc.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pA{constructor(e,t){this.aa=e,this.byteLength=t}ua(){return"metadata"in this.aa}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ch{constructor(e){this.serializer=e}Es(e){return dt(this.serializer,e)}ds(e){return e.metadata.exists?Dm(this.serializer,e.document,!1):ce.newNoDocument(this.Es(e.metadata.name),this.As(e.metadata.readTime))}As(e){return be(e)}}class fA{constructor(e,t,n){this.ca=e,this.localStore=t,this.serializer=n,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=dg(e)}la(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.aa.namedQuery)this.queries.push(e.aa.namedQuery);else if(e.aa.documentMetadata){this.documents.push({metadata:e.aa.documentMetadata}),e.aa.documentMetadata.exists||++t;const n=X.fromString(e.aa.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.aa.document&&(this.documents[this.documents.length-1].document=e.aa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}ha(e){const t=new Map,n=new Ch(this.serializer);for(const i of e)if(i.metadata.queries){const s=n.Es(i.metadata.name);for(const o of i.metadata.queries){const c=(t.get(o)||W()).add(s);t.set(o,c)}}return t}async complete(){const e=await qw(this.localStore,new Ch(this.serializer),this.documents,this.ca.id),t=this.ha(this.documents);for(const n of this.queries)await $w(this.localStore,n,t.get(n.name));return this.progress.taskState="Success",{progress:this.progress,Pa:this.collectionGroups,Ia:e}}}function dg(r){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:r.totalDocuments,totalBytes:r.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hg{constructor(e){this.key=e}}class pg{constructor(e){this.key=e}}class fg{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=W(),this.mutatedKeys=W(),this.Aa=am(e),this.Ra=new gr(this.Aa)}get Va(){return this.Ta}ma(e,t){const n=t?t.fa:new Ph,i=t?t.Ra:this.Ra;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,u=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,f)=>{const g=i.get(p),I=cs(this.query,f)?f:null,D=!!g&&this.mutatedKeys.has(g.key),k=!!I&&(I.hasLocalMutations||this.mutatedKeys.has(I.key)&&I.hasCommittedMutations);let S=!1;g&&I?g.data.isEqual(I.data)?D!==k&&(n.track({type:3,doc:I}),S=!0):this.ga(g,I)||(n.track({type:2,doc:I}),S=!0,(l&&this.Aa(I,l)>0||u&&this.Aa(I,u)<0)&&(c=!0)):!g&&I?(n.track({type:0,doc:I}),S=!0):g&&!I&&(n.track({type:1,doc:g}),S=!0,(l||u)&&(c=!0)),S&&(I?(o=o.add(I),s=k?s.add(p):s.delete(p)):(o=o.delete(p),s=s.delete(p)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const p=this.query.limitType==="F"?o.last():o.first();o=o.delete(p.key),s=s.delete(p.key),n.track({type:1,doc:p})}return{Ra:o,fa:n,ns:c,mutatedKeys:s}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((p,f)=>function(I,D){const k=S=>{switch(S){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return j()}};return k(I)-k(D)}(p.type,f.type)||this.Aa(p.doc,f.doc)),this.pa(n),i=i!=null&&i;const c=t&&!i?this.ya():[],l=this.da.size===0&&this.current&&!i?1:0,u=l!==this.Ea;return this.Ea=l,o.length!==0||u?{snapshot:new Cr(this.query,e.Ra,s,o,e.mutatedKeys,l===0,u,!1,!!n&&n.resumeToken.approximateByteSize()>0),wa:c}:{wa:c}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Ph,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=W(),this.Ra.forEach(n=>{this.Sa(n.key)&&(this.da=this.da.add(n.key))});const t=[];return e.forEach(n=>{this.da.has(n)||t.push(new pg(n))}),this.da.forEach(n=>{e.has(n)||t.push(new hg(n))}),t}ba(e){this.Ta=e.Ts,this.da=W();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Cr.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class mA{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class gA{constructor(e){this.key=e,this.va=!1}}class _A{constructor(e,t,n,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Ot(c=>sm(c),as),this.Ma=new Map,this.xa=new Set,this.Oa=new oe(M.comparator),this.Na=new Map,this.La=new ml,this.Ba={},this.ka=new Map,this.qa=Gn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function yA(r,e,t=!0){const n=Yo(r);let i;const s=n.Fa.get(e);return s?(n.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await mg(n,e,t,!0),i}async function vA(r,e){const t=Yo(r);await mg(t,e,!0,!1)}async function mg(r,e,t,n){const i=await Pr(r.localStore,ze(e)),s=i.targetId,o=r.sharedClientState.addLocalQueryTarget(s,t);let c;return n&&(c=await Dl(r,e,s,o==="current",i.resumeToken)),r.isPrimaryClient&&t&&Jo(r.remoteStore,i),c}async function Dl(r,e,t,n,i){r.Ka=(f,g,I)=>async function(k,S,F,U){let B=S.view.ma(F);B.ns&&(B=await wo(k.localStore,S.query,!1).then(({documents:E})=>S.view.ma(E,B)));const G=U&&U.targetChanges.get(S.targetId),J=U&&U.targetMismatches.get(S.targetId)!=null,K=S.view.applyChanges(B,k.isPrimaryClient,G,J);return wc(k,S.targetId,K.wa),K.snapshot}(r,f,g,I);const s=await wo(r.localStore,e,!0),o=new fg(e,s.Ts),c=o.ma(s.documents),l=ds.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",i),u=o.applyChanges(c,r.isPrimaryClient,l);wc(r,t,u.wa);const p=new mA(e,t,o);return r.Fa.set(e,p),r.Ma.has(t)?r.Ma.get(t).push(e):r.Ma.set(t,[e]),u.snapshot}async function IA(r,e,t){const n=O(r),i=n.Fa.get(e),s=n.Ma.get(i.targetId);if(s.length>1)return n.Ma.set(i.targetId,s.filter(o=>!as(o,e))),void n.Fa.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await Rr(n.localStore,i.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(i.targetId),t&&Sr(n.remoteStore,i.targetId),Dr(n,i.targetId)}).catch(mn)):(Dr(n,i.targetId),await Rr(n.localStore,i.targetId,!0))}async function EA(r,e){const t=O(r),n=t.Fa.get(e),i=t.Ma.get(n.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),Sr(t.remoteStore,n.targetId))}async function bA(r,e,t){const n=Vl(r);try{const i=await function(o,c){const l=O(o),u=fe.now(),p=c.reduce((I,D)=>I.add(D.key),W());let f,g;return l.persistence.runTransaction("Locally write mutations","readwrite",I=>{let D=Ye(),k=W();return l.cs.getEntries(I,p).next(S=>{D=S,D.forEach((F,U)=>{U.isValidDocument()||(k=k.add(F))})}).next(()=>l.localDocuments.getOverlayedDocuments(I,D)).next(S=>{f=S;const F=[];for(const U of c){const B=WT(U,f.get(U.key).overlayedDocument);B!=null&&F.push(new Lt(U.key,B,Wf(B.value.mapValue),pe.exists(!0)))}return l.mutationQueue.addMutationBatch(I,u,F,c)}).next(S=>{g=S;const F=S.applyToLocalDocumentSet(f,k);return l.documentOverlayCache.saveOverlays(I,S.batchId,F)})}).then(()=>({batchId:g.batchId,changes:lm(f)}))}(n.localStore,e);n.sharedClientState.addPendingMutation(i.batchId),function(o,c,l){let u=o.Ba[o.currentUser.toKey()];u||(u=new oe(H)),u=u.insert(c,l),o.Ba[o.currentUser.toKey()]=u}(n,i.batchId,t),await Mt(n,i.changes),await Kr(n.remoteStore)}catch(i){const s=Wr(i,"Failed to persist write");t.reject(s)}}async function gg(r,e){const t=O(r);try{const n=await Uw(t.localStore,e);e.targetChanges.forEach((i,s)=>{const o=t.Na.get(s);o&&(q(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?q(o.va):i.removedDocuments.size>0&&(q(o.va),o.va=!1))}),await Mt(t,n,e)}catch(n){await mn(n)}}function Dh(r,e,t){const n=O(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const i=[];n.Fa.forEach((s,o)=>{const c=o.view.Z_(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){const l=O(o);l.onlineState=c;let u=!1;l.queries.forEach((p,f)=>{for(const g of f.j_)g.Z_(c)&&(u=!0)}),u&&Sl(l)}(n.eventManager,e),i.length&&n.Ca.d_(i),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function TA(r,e,t){const n=O(r);n.sharedClientState.updateQueryState(e,"rejected",t);const i=n.Na.get(e),s=i&&i.key;if(s){let o=new oe(M.comparator);o=o.insert(s,ce.newNoDocument(s,z.min()));const c=W().add(s),l=new us(z.min(),new Map,new oe(H),o,c);await gg(n,l),n.Oa=n.Oa.remove(s),n.Na.delete(e),Nl(n)}else await Rr(n.localStore,e,!1).then(()=>Dr(n,e,t)).catch(mn)}async function wA(r,e){const t=O(r),n=e.batch.batchId;try{const i=await jw(t.localStore,e);xl(t,n,null),kl(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await Mt(t,i)}catch(i){await mn(i)}}async function AA(r,e,t){const n=O(r);try{const i=await function(o,c){const l=O(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let p;return l.mutationQueue.lookupMutationBatch(u,c).next(f=>(q(f!==null),p=f.keys(),l.mutationQueue.removeMutationBatch(u,f))).next(()=>l.mutationQueue.performConsistencyCheck(u)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(u,p,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,p)).next(()=>l.localDocuments.getDocuments(u,p))})}(n.localStore,e);xl(n,e,t),kl(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await Mt(n,i)}catch(i){await mn(i)}}async function PA(r,e){const t=O(r);yn(t.remoteStore)||N("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const n=await function(o){const c=O(o);return c.persistence.runTransaction("Get highest unacknowledged batch id","readonly",l=>c.mutationQueue.getHighestUnacknowledgedBatchId(l))}(t.localStore);if(n===-1)return void e.resolve();const i=t.ka.get(n)||[];i.push(e),t.ka.set(n,i)}catch(n){const i=Wr(n,"Initialization of waitForPendingWrites() operation failed");e.reject(i)}}function kl(r,e){(r.ka.get(e)||[]).forEach(t=>{t.resolve()}),r.ka.delete(e)}function xl(r,e,t){const n=O(r);let i=n.Ba[n.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),n.Ba[n.currentUser.toKey()]=i}}function Dr(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Ma.get(e))r.Fa.delete(n),t&&r.Ca.$a(n,t);r.Ma.delete(e),r.isPrimaryClient&&r.La.gr(e).forEach(n=>{r.La.containsKey(n)||_g(r,n)})}function _g(r,e){r.xa.delete(e.path.canonicalString());const t=r.Oa.get(e);t!==null&&(Sr(r.remoteStore,t),r.Oa=r.Oa.remove(e),r.Na.delete(t),Nl(r))}function wc(r,e,t){for(const n of t)n instanceof hg?(r.La.addReference(n.key,e),RA(r,n)):n instanceof pg?(N("SyncEngine","Document no longer in limbo: "+n.key),r.La.removeReference(n.key,e),r.La.containsKey(n.key)||_g(r,n.key)):j()}function RA(r,e){const t=e.key,n=t.path.canonicalString();r.Oa.get(t)||r.xa.has(n)||(N("SyncEngine","New document in limbo: "+t),r.xa.add(n),Nl(r))}function Nl(r){for(;r.xa.size>0&&r.Oa.size<r.maxConcurrentLimboResolutions;){const e=r.xa.values().next().value;r.xa.delete(e);const t=new M(X.fromString(e)),n=r.qa.next();r.Na.set(n,new gA(t)),r.Oa=r.Oa.insert(t,n),Jo(r.remoteStore,new wt(ze(qr(t.path)),n,"TargetPurposeLimboResolution",Qe.oe))}}async function Mt(r,e,t){const n=O(r),i=[],s=[],o=[];n.Fa.isEmpty()||(n.Fa.forEach((c,l)=>{o.push(n.Ka(l,e,t).then(u=>{var p;if((u||t)&&n.isPrimaryClient){const f=u?!u.fromCache:(p=t?.targetChanges.get(l.targetId))===null||p===void 0?void 0:p.current;n.sharedClientState.updateQueryState(l.targetId,f?"current":"not-current")}if(u){i.push(u);const f=vl.Wi(l.targetId,u);s.push(f)}}))}),await Promise.all(o),n.Ca.d_(i),await async function(l,u){const p=O(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",f=>w.forEach(u,g=>w.forEach(g.$i,I=>p.persistence.referenceDelegate.addReference(f,g.targetId,I)).next(()=>w.forEach(g.Ui,I=>p.persistence.referenceDelegate.removeReference(f,g.targetId,I)))))}catch(f){if(!gn(f))throw f;N("LocalStore","Failed to update sequence numbers: "+f)}for(const f of u){const g=f.targetId;if(!f.fromCache){const I=p.os.get(g),D=I.snapshotVersion,k=I.withLastLimboFreeSnapshotVersion(D);p.os=p.os.insert(g,k)}}}(n.localStore,s))}async function SA(r,e){const t=O(r);if(!t.currentUser.isEqual(e)){N("SyncEngine","User change. New user:",e.toKey());const n=await Ym(t.localStore,e);t.currentUser=e,function(s,o){s.ka.forEach(c=>{c.forEach(l=>{l.reject(new x(R.CANCELLED,o))})}),s.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await Mt(t,n.hs)}}function CA(r,e){const t=O(r),n=t.Na.get(e);if(n&&n.va)return W().add(n.key);{let i=W();const s=t.Ma.get(e);if(!s)return i;for(const o of s){const c=t.Fa.get(o);i=i.unionWith(c.view.Va)}return i}}async function DA(r,e){const t=O(r),n=await wo(t.localStore,e.query,!0),i=e.view.ba(n);return t.isPrimaryClient&&wc(t,e.targetId,i.wa),i}async function kA(r,e){const t=O(r);return tg(t.localStore,e).then(n=>Mt(t,n))}async function xA(r,e,t,n){const i=O(r),s=await function(c,l){const u=O(c),p=O(u.mutationQueue);return u.persistence.runTransaction("Lookup mutation documents","readonly",f=>p.Mn(f,l).next(g=>g?u.localDocuments.getDocuments(f,g):w.resolve(null)))}(i.localStore,e);s!==null?(t==="pending"?await Kr(i.remoteStore):t==="acknowledged"||t==="rejected"?(xl(i,e,n||null),kl(i,e),function(c,l){O(O(c).mutationQueue).On(l)}(i.localStore,e)):j(),await Mt(i,s)):N("SyncEngine","Cannot apply mutation batch with id: "+e)}async function NA(r,e){const t=O(r);if(Yo(t),Vl(t),e===!0&&t.Qa!==!0){const n=t.sharedClientState.getAllActiveQueryTargets(),i=await kh(t,n.toArray());t.Qa=!0,await bc(t.remoteStore,!0);for(const s of i)Jo(t.remoteStore,s)}else if(e===!1&&t.Qa!==!1){const n=[];let i=Promise.resolve();t.Ma.forEach((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?n.push(o):i=i.then(()=>(Dr(t,o),Rr(t.localStore,o,!0))),Sr(t.remoteStore,o)}),await i,await kh(t,n),function(o){const c=O(o);c.Na.forEach((l,u)=>{Sr(c.remoteStore,u)}),c.La.pr(),c.Na=new Map,c.Oa=new oe(M.comparator)}(t),t.Qa=!1,await bc(t.remoteStore,!1)}}async function kh(r,e,t){const n=O(r),i=[],s=[];for(const o of e){let c;const l=n.Ma.get(o);if(l&&l.length!==0){c=await Pr(n.localStore,ze(l[0]));for(const u of l){const p=n.Fa.get(u),f=await DA(n,p);f.snapshot&&s.push(f.snapshot)}}else{const u=await eg(n.localStore,o);c=await Pr(n.localStore,u),await Dl(n,yg(u),o,!1,c.resumeToken)}i.push(c)}return n.Ca.d_(s),i}function yg(r){return nm(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function VA(r){return function(t){return O(O(t).persistence).Qi()}(O(r).localStore)}async function OA(r,e,t,n){const i=O(r);if(i.Qa)return void N("SyncEngine","Ignoring unexpected query state notification.");const s=i.Ma.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{const o=await tg(i.localStore,om(s[0])),c=us.createSynthesizedRemoteEventForCurrentChange(e,t==="current",ge.EMPTY_BYTE_STRING);await Mt(i,o,c);break}case"rejected":await Rr(i.localStore,e,!0),Dr(i,e,n);break;default:j()}}async function LA(r,e,t){const n=Yo(r);if(n.Qa){for(const i of e){if(n.Ma.has(i)&&n.sharedClientState.isActiveQueryTarget(i)){N("SyncEngine","Adding an already active target "+i);continue}const s=await eg(n.localStore,i),o=await Pr(n.localStore,s);await Dl(n,yg(s),o.targetId,!1,o.resumeToken),Jo(n.remoteStore,o)}for(const i of t)n.Ma.has(i)&&await Rr(n.localStore,i,!1).then(()=>{Sr(n.remoteStore,i),Dr(n,i)}).catch(mn)}}function Yo(r){const e=O(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=gg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=CA.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=TA.bind(null,e),e.Ca.d_=dA.bind(null,e.eventManager),e.Ca.$a=hA.bind(null,e.eventManager),e}function Vl(r){const e=O(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=wA.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=AA.bind(null,e),e}function MA(r,e,t){const n=O(r);(async function(s,o,c){try{const l=await o.getMetadata();if(await function(I,D){const k=O(I),S=be(D.createTime);return k.persistence.runTransaction("hasNewerBundle","readonly",F=>k.Gr.getBundleMetadata(F,D.id)).then(F=>!!F&&F.createTime.compareTo(S)>=0)}(s.localStore,l))return await o.close(),c._completeWith(function(I){return{taskState:"Success",documentsLoaded:I.totalDocuments,bytesLoaded:I.totalBytes,totalDocuments:I.totalDocuments,totalBytes:I.totalBytes}}(l)),Promise.resolve(new Set);c._updateProgress(dg(l));const u=new fA(l,s.localStore,o.serializer);let p=await o.Ua();for(;p;){const g=await u.la(p);g&&c._updateProgress(g),p=await o.Ua()}const f=await u.complete();return await Mt(s,f.Ia,void 0),await function(I,D){const k=O(I);return k.persistence.runTransaction("Save bundle","readwrite",S=>k.Gr.saveBundleMetadata(S,D))}(s.localStore,l),c._completeWith(f.progress),Promise.resolve(f.Pa)}catch(l){return et("SyncEngine",`Loading bundle failed with ${l}`),c._failWith(l),Promise.resolve(new Set)}})(n,e,t).then(i=>{n.sharedClientState.notifyBundleLoaded(i)})}class dn{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=hs(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Jm(this.persistence,new Qm,e.initialUser,this.serializer)}Ga(e){return new gl(Qo.Zr,this.serializer)}Wa(e){return new rg}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}dn.provider={build:()=>new dn};class FA extends dn{constructor(e){super(),this.cacheSizeBytes=e}ja(e,t){q(this.persistence.referenceDelegate instanceof To);const n=this.persistence.referenceDelegate.garbageCollector;return new zm(n,e.asyncQueue,t)}Ga(e){const t=this.cacheSizeBytes!==void 0?qe.withCacheSize(this.cacheSizeBytes):qe.DEFAULT;return new gl(n=>To.Zr(n,t),this.serializer)}}class Ol extends dn{constructor(e,t,n){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await Vl(this.Ja.syncEngine),await Kr(this.Ja.remoteStore),await this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}za(e){return Jm(this.persistence,new Qm,e.initialUser,this.serializer)}ja(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new zm(n,e.asyncQueue,t)}Ha(e,t){const n=new sT(t,this.persistence);return new iT(e.asyncQueue,n)}Ga(e){const t=yl(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?qe.withCacheSize(this.cacheSizeBytes):qe.DEFAULT;return new _l(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,ig(),oo(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new rg}}class vg extends Ol{constructor(e,t){super(e,t,!1),this.Ja=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Ja.syncEngine;this.sharedClientState instanceof Ga&&(this.sharedClientState.syncEngine={no:xA.bind(null,t),ro:OA.bind(null,t),io:LA.bind(null,t),Qi:VA.bind(null,t),eo:kA.bind(null,t)},await this.sharedClientState.start()),await this.persistence.yi(async n=>{await NA(this.Ja.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())})}Wa(e){const t=ig();if(!Ga.D(t))throw new x(R.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=yl(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Ga(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class hn{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Dh(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=SA.bind(null,this.syncEngine),await bc(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new uA}()}createDatastore(e){const t=hs(e.databaseInfo.databaseId),n=function(s){return new Hw(s)}(e.databaseInfo);return function(s,o,c,l){return new Jw(s,o,c,l)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(n,i,s,o,c){return new Xw(n,i,s,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Dh(this.syncEngine,t,0),function(){return wh.D()?new wh:new zw}())}createSyncEngine(e,t){return function(i,s,o,c,l,u,p){const f=new _A(i,s,o,c,l,u);return p&&(f.Qa=!0),f}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=O(i);N("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await Gr(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}hn.provider={build:()=>new hn};function xh(r,e=10240){let t=0;return{async read(){if(t<r.byteLength){const n={value:r.slice(t,t+e),done:!1};return t+=e,n}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Ie("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jA{constructor(e,t){this.Xa=e,this.serializer=t,this.metadata=new ke,this.buffer=new Uint8Array,this.eu=function(){return new TextDecoder("utf-8")}(),this.tu().then(n=>{n&&n.ua()?this.metadata.resolve(n.aa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(n?.aa)}`))},n=>this.metadata.reject(n))}close(){return this.Xa.cancel()}async getMetadata(){return this.metadata.promise}async Ua(){return await this.getMetadata(),this.tu()}async tu(){const e=await this.nu();if(e===null)return null;const t=this.eu.decode(e),n=Number(t);isNaN(n)&&this.ru(`length string (${t}) is not valid number`);const i=await this.iu(n);return new pA(JSON.parse(i),e.length+n)}su(){return this.buffer.findIndex(e=>e===123)}async nu(){for(;this.su()<0&&!await this.ou(););if(this.buffer.length===0)return null;const e=this.su();e<0&&this.ru("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async iu(e){for(;this.buffer.length<e;)await this.ou()&&this.ru("Reached the end of bundle when more is expected.");const t=this.eu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}ru(e){throw this.Xa.cancel(),new Error(`Invalid bundle format: ${e}`)}async ou(){const e=await this.Xa.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UA{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new x(R.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(i,s){const o=O(i),c={documents:s.map(f=>Qi(o.serializer,f))},l=await o.Lo("BatchGetDocuments",o.serializer.databaseId,X.emptyPath(),c,s.length),u=new Map;l.forEach(f=>{const g=rw(o.serializer,f);u.set(g.key.toString(),g)});const p=[];return s.forEach(f=>{const g=u.get(f.toString());q(!!g),p.push(g)}),p}(this.datastore,e);return t.forEach(n=>this.recordVersion(n)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(e.toString())}delete(e){this.write(new zr(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,n)=>{const i=M.fromPath(n);this.mutations.push(new ol(i,this.precondition(i)))}),await async function(n,i){const s=O(n),o={writes:i.map(c=>Ji(s.serializer,c))};await s.Mo("Commit",s.serializer.databaseId,X.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw j();t=z.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new x(R.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(z.min())?pe.exists(!1):pe.updateTime(t):pe.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(z.min()))throw new x(R.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return pe.updateTime(t)}return pe.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BA{constructor(e,t,n,i,s){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=i,this.deferred=s,this._u=n.maxAttempts,this.t_=new El(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go(async()=>{const e=new UA(this.datastore),t=this.cu(e);t&&t.then(n=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(n)}).catch(i=>{this.lu(i)}))}).catch(n=>{this.lu(n)})})}cu(e){try{const t=this.updateFunction(e);return!ss(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget(()=>(this.uu(),Promise.resolve()))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!Im(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qA{constructor(e,t,n,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=i,this.user=Se.UNAUTHENTICATED,this.clientId=Xc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async o=>{N("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(n,o=>(N("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new ke;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Wr(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Ha(r,e){r.asyncQueue.verifyOperationInProgress(),N("FirestoreClient","Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener(async i=>{n.isEqual(i)||(await Ym(e.localStore,i),n=i)}),e.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=e}async function Nh(r,e){r.asyncQueue.verifyOperationInProgress();const t=await Ll(r);N("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener(n=>Ah(e.remoteStore,n)),r.setAppCheckTokenChangeListener((n,i)=>Ah(e.remoteStore,i)),r._onlineComponents=e}async function Ll(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){N("FirestoreClient","Using user provided OfflineComponentProvider");try{await Ha(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===R.FAILED_PRECONDITION||i.code===R.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;et("Error using user provided cache. Falling back to memory cache: "+t),await Ha(r,new dn)}}else N("FirestoreClient","Using default OfflineComponentProvider"),await Ha(r,new dn);return r._offlineComponents}async function Zo(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(N("FirestoreClient","Using user provided OnlineComponentProvider"),await Nh(r,r._uninitializedComponentsProvider._online)):(N("FirestoreClient","Using default OnlineComponentProvider"),await Nh(r,new hn))),r._onlineComponents}function Ig(r){return Ll(r).then(e=>e.persistence)}function Qr(r){return Ll(r).then(e=>e.localStore)}function Eg(r){return Zo(r).then(e=>e.remoteStore)}function Ml(r){return Zo(r).then(e=>e.syncEngine)}function bg(r){return Zo(r).then(e=>e.datastore)}async function kr(r){const e=await Zo(r),t=e.eventManager;return t.onListen=yA.bind(null,e.syncEngine),t.onUnlisten=IA.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=vA.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=EA.bind(null,e.syncEngine),t}function $A(r){return r.asyncQueue.enqueue(async()=>{const e=await Ig(r),t=await Eg(r);return e.setNetworkEnabled(!0),function(i){const s=O(i);return s.L_.delete(0),ps(s)}(t)})}function zA(r){return r.asyncQueue.enqueue(async()=>{const e=await Ig(r),t=await Eg(r);return e.setNetworkEnabled(!1),async function(i){const s=O(i);s.L_.add(0),await Gr(s),s.q_.set("Offline")}(t)})}function GA(r,e){const t=new ke;return r.asyncQueue.enqueueAndForget(async()=>async function(i,s,o){try{const c=await function(u,p){const f=O(u);return f.persistence.runTransaction("read document","readonly",g=>f.localDocuments.getDocument(g,p))}(i,s);c.isFoundDocument()?o.resolve(c):c.isNoDocument()?o.resolve(null):o.reject(new x(R.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(c){const l=Wr(c,`Failed to get document '${s} from cache`);o.reject(l)}}(await Qr(r),e,t)),t.promise}function Tg(r,e,t={}){const n=new ke;return r.asyncQueue.enqueueAndForget(async()=>function(s,o,c,l,u){const p=new Xo({next:g=>{p.Za(),o.enqueueAndForget(()=>Rl(s,f));const I=g.docs.has(c);!I&&g.fromCache?u.reject(new x(R.UNAVAILABLE,"Failed to get document because the client is offline.")):I&&g.fromCache&&l&&l.source==="server"?u.reject(new x(R.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(g)},error:g=>u.reject(g)}),f=new Cl(qr(c.path),p,{includeMetadataChanges:!0,_a:!0});return Pl(s,f)}(await kr(r),r.asyncQueue,e,t,n)),n.promise}function KA(r,e){const t=new ke;return r.asyncQueue.enqueueAndForget(async()=>async function(i,s,o){try{const c=await wo(i,s,!0),l=new fg(s,c.Ts),u=l.ma(c.documents),p=l.applyChanges(u,!1);o.resolve(p.snapshot)}catch(c){const l=Wr(c,`Failed to execute query '${s} against cache`);o.reject(l)}}(await Qr(r),e,t)),t.promise}function wg(r,e,t={}){const n=new ke;return r.asyncQueue.enqueueAndForget(async()=>function(s,o,c,l,u){const p=new Xo({next:g=>{p.Za(),o.enqueueAndForget(()=>Rl(s,f)),g.fromCache&&l.source==="server"?u.reject(new x(R.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(g)},error:g=>u.reject(g)}),f=new Cl(c,p,{includeMetadataChanges:!0,_a:!0});return Pl(s,f)}(await kr(r),r.asyncQueue,e,t,n)),n.promise}function HA(r,e,t){const n=new ke;return r.asyncQueue.enqueueAndForget(async()=>{try{const i=await bg(r);n.resolve(async function(o,c,l){var u;const p=O(o),{request:f,ut:g,parent:I}=xm(p.serializer,rm(c),l);p.connection.Fo||delete f.parent;const D=(await p.Lo("RunAggregationQuery",p.serializer.databaseId,I,f,1)).filter(S=>!!S.result);q(D.length===1);const k=(u=D[0].result)===null||u===void 0?void 0:u.aggregateFields;return Object.keys(k).reduce((S,F)=>(S[g[F]]=k[F],S),{})}(i,e,t))}catch(i){n.reject(i)}}),n.promise}function WA(r,e){const t=new Xo(e);return r.asyncQueue.enqueueAndForget(async()=>function(i,s){O(i).Y_.add(s),s.next()}(await kr(r),t)),()=>{t.Za(),r.asyncQueue.enqueueAndForget(async()=>function(i,s){O(i).Y_.delete(s)}(await kr(r),t))}}function QA(r,e,t,n){const i=function(o,c){let l;return l=typeof o=="string"?bm().encode(o):o,function(p,f){return new jA(p,f)}(function(p,f){if(p instanceof Uint8Array)return xh(p,f);if(p instanceof ArrayBuffer)return xh(new Uint8Array(p),f);if(p instanceof ReadableStream)return p.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(l),c)}(t,hs(e));r.asyncQueue.enqueueAndForget(async()=>{MA(await Ml(r),i,n)})}function JA(r,e){return r.asyncQueue.enqueue(async()=>function(n,i){const s=O(n);return s.persistence.runTransaction("Get named query","readonly",o=>s.Gr.getNamedQuery(o,i))}(await Qr(r),e))}function YA(r,e){return r.asyncQueue.enqueue(async()=>async function(n,i){const s=O(n),o=s.indexManager,c=[];return s.persistence.runTransaction("Configure indexes","readwrite",l=>o.getFieldIndexes(l).next(u=>function(f,g,I,D,k){f=[...f],g=[...g],f.sort(I),g.sort(I);const S=f.length,F=g.length;let U=0,B=0;for(;U<F&&B<S;){const G=I(f[B],g[U]);G<0?k(f[B++]):G>0?D(g[U++]):(U++,B++)}for(;U<F;)D(g[U++]);for(;B<S;)k(f[B++])}(u,i,eT,p=>{c.push(o.addFieldIndex(l,p))},p=>{c.push(o.deleteFieldIndex(l,p))})).next(()=>w.waitFor(c)))}(await Qr(r),e))}function XA(r,e){return r.asyncQueue.enqueue(async()=>function(n,i){O(n).ss.zi=i}(await Qr(r),e))}function ZA(r){return r.asyncQueue.enqueue(async()=>function(t){const n=O(t),i=n.indexManager;return n.persistence.runTransaction("Delete All Indexes","readwrite",s=>i.deleteAllFieldIndexes(s))}(await Qr(r)))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ag(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vh=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fl(r,e,t){if(!t)throw new x(R.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function Pg(r,e,t,n){if(e===!0&&n===!0)throw new x(R.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function Oh(r){if(!M.isDocumentKey(r))throw new x(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Lh(r){if(M.isDocumentKey(r))throw new x(R.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function ea(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":j()}function Q(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new x(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ea(r);throw new x(R.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}function Rg(r,e){if(e<=0)throw new x(R.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mh{constructor(e){var t,n;if(e.host===void 0){if(e.ssl!==void 0)throw new x(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new x(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Pg("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ag((n=e.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new x(R.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new x(R.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new x(R.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,i){return n.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class fs{constructor(e,t,n,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Mh({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new x(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new x(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Mh(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Df;switch(n.type){case"firstParty":return new Qb(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new x(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=Vh.get(t);n&&(N("ComponentProvider","Removing Datastore"),Vh.delete(t),n.terminate())}(this),Promise.resolve()}}function Sg(r,e,t,n={}){var i;const s=(r=Q(r,fs))._getSettings(),o=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&et("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),r._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),n.mockUserToken){let c,l;if(typeof n.mockUserToken=="string")c=n.mockUserToken,l=Se.MOCK_USER;else{c=W_(n.mockUserToken,(i=r._app)===null||i===void 0?void 0:i.options.projectId);const u=n.mockUserToken.sub||n.mockUserToken.user_id;if(!u)throw new x(R.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new Se(u)}r._authCredentials=new Kb(new Cf(c,l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new xe(this.firestore,e,this._query)}}class ye{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new st(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ye(this.firestore,e,this._key)}}class st extends xe{constructor(e,t,n){super(e,t,qr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ye(this.firestore,null,new M(e))}withConverter(e){return new st(this.firestore,e,this._path)}}function eP(r,e,...t){if(r=$(r),Fl("collection","path",e),r instanceof fs){const n=X.fromString(e,...t);return Lh(n),new st(r,null,n)}{if(!(r instanceof ye||r instanceof st))throw new x(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(e,...t));return Lh(n),new st(r.firestore,null,n)}}function tP(r,e){if(r=Q(r,fs),Fl("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new x(R.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new xe(r,null,function(n){return new Vt(X.emptyPath(),n)}(e))}function xr(r,e,...t){if(r=$(r),arguments.length===1&&(e=Xc.newId()),Fl("doc","path",e),r instanceof fs){const n=X.fromString(e,...t);return Oh(n),new ye(r,null,new M(n))}{if(!(r instanceof ye||r instanceof st))throw new x(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(e,...t));return Oh(n),new ye(r.firestore,r instanceof st?r.converter:null,new M(n))}}function nP(r,e){return r=$(r),e=$(e),(r instanceof ye||r instanceof st)&&(e instanceof ye||e instanceof st)&&r.firestore===e.firestore&&r.path===e.path&&r.converter===e.converter}function jl(r,e){return r=$(r),e=$(e),r instanceof xe&&e instanceof xe&&r.firestore===e.firestore&&as(r._query,e._query)&&r.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fh{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new El(this,"async_queue_retry"),this.Vu=()=>{const n=oo();n&&N("AsyncQueue","Visibility state changed to "+n.visibilityState),this.t_.jo()},this.mu=e;const t=oo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=oo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new ke;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!gn(e))throw e;N("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(n=>{this.Eu=n,this.du=!1;const i=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(n);throw Ie("INTERNAL UNHANDLED ERROR: ",i),n}).then(n=>(this.du=!1,n))));return this.mu=t,t}enqueueAfterDelay(e,t,n){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=Al.createAndSchedule(this,e,t,n,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&j()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,n)=>t.targetTimeMs-n.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function Ac(r){return function(t,n){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of n)if(s in i&&typeof i[s]=="function")return!0;return!1}(r,["next","error","complete"])}class Cg{constructor(){this._progressObserver={},this._taskCompletionResolver=new ke,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rP=-1;class ie extends fs{constructor(e,t,n,i){super(e,t,n,i),this.type="firestore",this._queue=new Fh,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Fh(e),this._firestoreClient=void 0,await e}}}function iP(r,e,t){t||(t="(default)");const n=Or(r,"firestore");if(n.isInitialized(t)){const i=n.getImmediate({identifier:t}),s=n.getOptions(t);if(nn(s,e))return i;throw new x(R.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new x(R.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new x(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return n.initialize({options:e,instanceIdentifier:t})}function Dg(r,e){const t=typeof r=="object"?r:kc(),n=typeof r=="string"?r:e||"(default)",i=Or(t,"firestore").getImmediate({identifier:n});if(!i._initialized){const s=np("firestore");s&&Sg(i,...s)}return i}function me(r){if(r._terminated)throw new x(R.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||kg(r),r._firestoreClient}function kg(r){var e,t,n;const i=r._freezeSettings(),s=function(c,l,u,p){return new RT(c,l,u,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Ag(p.experimentalLongPollingOptions),p.useFetchStreams)}(r._databaseId,((e=r._app)===null||e===void 0?void 0:e.options.appId)||"",r._persistenceKey,i);r._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((n=i.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),r._firestoreClient=new qA(r._authCredentials,r._appCheckCredentials,r._queue,s,r._componentsProvider&&function(c){const l=c?._online.build();return{_offline:c?._offline.build(l),_online:l}}(r._componentsProvider))}function sP(r,e){et("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();return xg(r,hn.provider,{build:n=>new Ol(n,t.cacheSizeBytes,e?.forceOwnership)}),Promise.resolve()}async function oP(r){et("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=r._freezeSettings();xg(r,hn.provider,{build:t=>new vg(t,e.cacheSizeBytes)})}function xg(r,e,t){if((r=Q(r,ie))._firestoreClient||r._terminated)throw new x(R.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new x(R.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:e,_offline:t},kg(r)}function aP(r){if(r._initialized&&!r._terminated)throw new x(R.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new ke;return r._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(n){if(!ut.D())return Promise.resolve();const i=n+"main";await ut.delete(i)}(yl(r._databaseId,r._persistenceKey)),e.resolve()}catch(t){e.reject(t)}}),e.promise}function cP(r){return function(t){const n=new ke;return t.asyncQueue.enqueueAndForget(async()=>PA(await Ml(t),n)),n.promise}(me(r=Q(r,ie)))}function lP(r){return $A(me(r=Q(r,ie)))}function uP(r){return zA(me(r=Q(r,ie)))}function dP(r){return sv(r.app,"firestore",r._databaseId.database),r._delete()}function hP(r,e){const t=me(r=Q(r,ie)),n=new Cg;return QA(t,r._databaseId,e,n),n}function pP(r,e){return JA(me(r=Q(r,ie)),e).then(t=>t?new xe(r,null,t.query):null)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class Ng{constructor(e,t,n){this._userDataWriter=t,this._data=n,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new pn(ge.fromBase64String(e))}catch(t){throw new x(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new pn(ge.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new x(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new le(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function fP(){return new vn("__name__")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new x(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new x(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return H(this._lat,e._lat)||H(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,i){if(n.length!==i.length)return!1;for(let s=0;s<n.length;++s)if(n[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mP=/^__.*__$/;class gP{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new Lt(e,this.data,this.fieldMask,t,this.fieldTransforms):new $r(e,this.data,t,this.fieldTransforms)}}class Vg{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Lt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Og(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw j()}}class na{constructor(e,t,n,i,s,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new na(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:n,xu:!1});return i.Ou(e),i}Nu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:n,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return So(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Og(this.Cu)&&mP.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class _P{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||hs(e)}Qu(e,t,n,i=!1){return new na({Cu:e,methodName:t,qu:n,path:le.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Jn(r){const e=r._freezeSettings(),t=hs(r._databaseId);return new _P(r._databaseId,!!e.ignoreUndefinedProperties,t)}function ra(r,e,t,n,i,s={}){const o=r.Qu(s.merge||s.mergeFields?2:0,e,t,i);Kl("Data must be an object, but it was:",o,n);const c=Fg(n,o);let l,u;if(s.merge)l=new Je(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){const p=[];for(const f of s.mergeFields){const g=Yi(e,f,t);if(!o.contains(g))throw new x(R.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);Ug(p,g)||p.push(g)}l=new Je(p),u=o.fieldTransforms.filter(f=>l.covers(f.field))}else l=null,u=o.fieldTransforms;return new gP(new Oe(c),l,u)}class gs extends In{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof gs}}function Lg(r,e,t){return new na({Cu:3,qu:e.settings.qu,methodName:r._methodName,xu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Ul extends In{_toFieldTransform(e){return new ls(e.path,new Tr)}isEqual(e){return e instanceof Ul}}class Bl extends In{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=Lg(this,e,!0),n=this.Ku.map(s=>Yn(s,t)),i=new Bn(n);return new ls(e.path,i)}isEqual(e){return e instanceof Bl&&nn(this.Ku,e.Ku)}}class ql extends In{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=Lg(this,e,!0),n=this.Ku.map(s=>Yn(s,t)),i=new qn(n);return new ls(e.path,i)}isEqual(e){return e instanceof ql&&nn(this.Ku,e.Ku)}}class $l extends In{constructor(e,t){super(e),this.$u=t}_toFieldTransform(e){const t=new wr(e.serializer,hm(e.serializer,this.$u));return new ls(e.path,t)}isEqual(e){return e instanceof $l&&this.$u===e.$u}}function zl(r,e,t,n){const i=r.Qu(1,e,t);Kl("Data must be an object, but it was:",i,n);const s=[],o=Oe.empty();_n(n,(l,u)=>{const p=ia(e,l,t);u=$(u);const f=i.Nu(p);if(u instanceof gs)s.push(p);else{const g=Yn(u,f);g!=null&&(s.push(p),o.set(p,g))}});const c=new Je(s);return new Vg(o,c,i.fieldTransforms)}function Gl(r,e,t,n,i,s){const o=r.Qu(1,e,t),c=[Yi(e,n,t)],l=[i];if(s.length%2!=0)throw new x(R.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<s.length;g+=2)c.push(Yi(e,s[g])),l.push(s[g+1]);const u=[],p=Oe.empty();for(let g=c.length-1;g>=0;--g)if(!Ug(u,c[g])){const I=c[g];let D=l[g];D=$(D);const k=o.Nu(I);if(D instanceof gs)u.push(I);else{const S=Yn(D,k);S!=null&&(u.push(I),p.set(I,S))}}const f=new Je(u);return new Vg(p,f,o.fieldTransforms)}function Mg(r,e,t,n=!1){return Yn(t,r.Qu(n?4:3,e))}function Yn(r,e){if(jg(r=$(r)))return Kl("Unsupported field value:",e,r),Fg(r,e);if(r instanceof In)return function(n,i){if(!Og(i.Cu))throw i.Bu(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${n._methodName}() is not currently supported inside arrays`);const s=n._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(n,i){const s=[];let o=0;for(const c of n){let l=Yn(c,i.Lu(o));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),o++}return{arrayValue:{values:s}}}(r,e)}return function(n,i){if((n=$(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return hm(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const s=fe.fromDate(n);return{timestampValue:Ar(i.serializer,s)}}if(n instanceof fe){const s=new fe(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Ar(i.serializer,s)}}if(n instanceof ta)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof pn)return{bytesValue:Am(i.serializer,n._byteString)};if(n instanceof ye){const s=i.databaseId,o=n.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:dl(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof ms)return function(o,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(l=>{if(typeof l!="number")throw c.Bu("VectorValues must only contain numeric values.");return sl(c.serializer,l)})}}}}}}(n,i);throw i.Bu(`Unsupported field value: ${ea(n)}`)}(r,e)}function Fg(r,e){const t={};return zf(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):_n(r,(n,i)=>{const s=Yn(i,e.Mu(n));s!=null&&(t[n]=s)}),{mapValue:{fields:t}}}function jg(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof fe||r instanceof ta||r instanceof pn||r instanceof ye||r instanceof In||r instanceof ms)}function Kl(r,e,t){if(!jg(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const n=ea(t);throw n==="an object"?e.Bu(r+" a custom object"):e.Bu(r+" "+n)}}function Yi(r,e,t){if((e=$(e))instanceof vn)return e._internalPath;if(typeof e=="string")return ia(r,e);throw So("Field path arguments must be of type string or ",r,!1,void 0,t)}const yP=new RegExp("[~\\*/\\[\\]]");function ia(r,e,t){if(e.search(yP)>=0)throw So(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new vn(...e.split("."))._internalPath}catch{throw So(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function So(r,e,t,n,i){const s=n&&!n.isEmpty(),o=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(s||o)&&(l+=" (found",s&&(l+=` in field ${n}`),o&&(l+=` in document ${i}`),l+=")"),new x(R.INVALID_ARGUMENT,c+r+l)}function Ug(r,e){return r.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(e,t,n,i,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new ye(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new vP(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(sa("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class vP extends Xi{data(){return super.data()}}function sa(r,e){return typeof e=="string"?ia(r,e):e instanceof vn?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bg(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new x(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Hl{}class Jr extends Hl{}function IP(r,e,...t){let n=[];e instanceof Hl&&n.push(e),n=n.concat(t),function(s){const o=s.filter(l=>l instanceof Xn).length,c=s.filter(l=>l instanceof Yr).length;if(o>1||o>0&&c>0)throw new x(R.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const i of n)r=i._apply(r);return r}class Yr extends Jr{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Yr(e,t,n)}_apply(e){const t=this._parse(e);return $g(e._query,t),new xe(e.firestore,e.converter,pc(e._query,t))}_parse(e){const t=Jn(e.firestore);return function(s,o,c,l,u,p,f){let g;if(u.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new x(R.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){Uh(f,p);const I=[];for(const D of f)I.push(jh(l,s,D));g={arrayValue:{values:I}}}else g=jh(l,s,f)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||Uh(f,p),g=Mg(c,o,f,p==="in"||p==="not-in");return Z.create(u,p,g)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function EP(r,e,t){const n=e,i=sa("where",r);return Yr._create(i,n,t)}class Xn extends Hl{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Xn(e,t)}_parse(e){const t=this._queryConstraints.map(n=>n._parse(e)).filter(n=>n.getFilters().length>0);return t.length===1?t[0]:ne.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i;const c=s.getFlattenedFilters();for(const l of c)$g(o,l),o=pc(o,l)}(e._query,t),new xe(e.firestore,e.converter,pc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function bP(...r){return r.forEach(e=>zg("or",e)),Xn._create("or",r)}function TP(...r){return r.forEach(e=>zg("and",e)),Xn._create("and",r)}class oa extends Jr{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new oa(e,t)}_apply(e){const t=function(i,s,o){if(i.startAt!==null)throw new x(R.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new x(R.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Wi(s,o)}(e._query,this._field,this._direction);return new xe(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new Vt(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function wP(r,e="asc"){const t=e,n=sa("orderBy",r);return oa._create(n,t)}class _s extends Jr{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new _s(e,t,n)}_apply(e){return new xe(e.firestore,e.converter,yo(e._query,this._limit,this._limitType))}}function AP(r){return Rg("limit",r),_s._create("limit",r,"F")}function PP(r){return Rg("limitToLast",r),_s._create("limitToLast",r,"L")}class ys extends Jr{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new ys(e,t,n)}_apply(e){const t=qg(e,this.type,this._docOrFields,this._inclusive);return new xe(e.firestore,e.converter,function(i,s){return new Vt(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)}(e._query,t))}}function RP(...r){return ys._create("startAt",r,!0)}function SP(...r){return ys._create("startAfter",r,!1)}class vs extends Jr{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new vs(e,t,n)}_apply(e){const t=qg(e,this.type,this._docOrFields,this._inclusive);return new xe(e.firestore,e.converter,function(i,s){return new Vt(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,i.startAt,s)}(e._query,t))}}function CP(...r){return vs._create("endBefore",r,!1)}function DP(...r){return vs._create("endAt",r,!0)}function qg(r,e,t,n){if(t[0]=$(t[0]),t[0]instanceof Xi)return function(s,o,c,l,u){if(!l)throw new x(R.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const p=[];for(const f of mr(s))if(f.field.isKeyField())p.push(jn(o,l.key));else{const g=l.data.field(f.field);if(Bo(g))throw new x(R.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+f.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(g===null){const I=f.field.canonicalString();throw new x(R.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${I}' (used as the orderBy) does not exist.`)}p.push(g)}return new ln(p,u)}(r._query,r.firestore._databaseId,e,t[0]._document,n);{const i=Jn(r.firestore);return function(o,c,l,u,p,f){const g=o.explicitOrderBy;if(p.length>g.length)throw new x(R.INVALID_ARGUMENT,`Too many arguments provided to ${u}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const I=[];for(let D=0;D<p.length;D++){const k=p[D];if(g[D].field.isKeyField()){if(typeof k!="string")throw new x(R.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${u}(), but got a ${typeof k}`);if(!rl(o)&&k.indexOf("/")!==-1)throw new x(R.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${u}() must be a plain document ID, but '${k}' contains a slash.`);const S=o.path.child(X.fromString(k));if(!M.isDocumentKey(S))throw new x(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${u}() must result in a valid document path, but '${S}' is not because it contains an odd number of segments.`);const F=new M(S);I.push(jn(c,F))}else{const S=Mg(l,u,k);I.push(S)}}return new ln(I,f)}(r._query,r.firestore._databaseId,i,e,t,n)}}function jh(r,e,t){if(typeof(t=$(t))=="string"){if(t==="")throw new x(R.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!rl(e)&&t.indexOf("/")!==-1)throw new x(R.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(X.fromString(t));if(!M.isDocumentKey(n))throw new x(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return jn(r,new M(n))}if(t instanceof ye)return jn(r,t._key);throw new x(R.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ea(t)}.`)}function Uh(r,e){if(!Array.isArray(r)||r.length===0)throw new x(R.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function $g(r,e){const t=function(i,s){for(const o of i)for(const c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(r.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new x(R.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new x(R.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function zg(r,e){if(!(e instanceof Yr||e instanceof Xn))throw new x(R.INVALID_ARGUMENT,`Function ${r}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class Wl{convertValue(e,t="none"){switch(an(e)){case 0:return null;case 1:return e.booleanValue;case 2:return he(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Dt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw j()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return _n(e,(i,s)=>{n[i]=this.convertValue(s,t)}),n}convertVectorValue(e){var t,n,i;const s=(i=(n=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.map(o=>he(o.doubleValue));return new ms(s)}convertGeoPoint(e){return new ta(he(e.latitude),he(e.longitude))}convertArray(e,t){return(e.values||[]).map(n=>this.convertValue(n,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=qo(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Gi(e));default:return null}}convertTimestamp(e){const t=Ct(e);return new fe(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=X.fromString(e);q(Lm(n));const i=new on(n.get(1),n.get(3)),s=new M(n.popFirst(5));return i.isEqual(t)||Ie(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aa(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}class kP extends Wl{constructor(e){super(),this.firestore=e}convertBytes(e){return new pn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ye(this.firestore,null,t)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xP(r){return new Nr("sum",Yi("sum",r))}function NP(r){return new Nr("avg",Yi("average",r))}function Gg(){return new Nr("count")}function VP(r,e){var t,n;return r instanceof Nr&&e instanceof Nr&&r.aggregateType===e.aggregateType&&((t=r._internalFieldPath)===null||t===void 0?void 0:t.canonicalString())===((n=e._internalFieldPath)===null||n===void 0?void 0:n.canonicalString())}function OP(r,e){return jl(r.query,e.query)&&nn(r.data(),e.data())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Kn extends Xi{constructor(e,t,n,i,s,o){super(e,t,n,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Li(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(sa("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class Li extends Kn{data(e={}){return super.data(e)}}class Hn{constructor(e,t,n,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Jt(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Li(this._firestore,this._userDataWriter,n.key,n,new Jt(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new x(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{const l=new Li(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Jt(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const l=new Li(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Jt(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let u=-1,p=-1;return c.type!==0&&(u=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),p=o.indexOf(c.doc.key)),{type:LP(c.type),doc:l,oldIndex:u,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function LP(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return j()}}function MP(r,e){return r instanceof Kn&&e instanceof Kn?r._firestore===e._firestore&&r._key.isEqual(e._key)&&(r._document===null?e._document===null:r._document.isEqual(e._document))&&r._converter===e._converter:r instanceof Hn&&e instanceof Hn&&r._firestore===e._firestore&&jl(r.query,e.query)&&r.metadata.isEqual(e.metadata)&&r._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kg(r){r=Q(r,ye);const e=Q(r.firestore,ie);return Tg(me(e),r._key).then(t=>Jl(e,r,t))}class En extends Wl{constructor(e){super(),this.firestore=e}convertBytes(e){return new pn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ye(this.firestore,null,t)}}function FP(r){r=Q(r,ye);const e=Q(r.firestore,ie),t=me(e),n=new En(e);return GA(t,r._key).then(i=>new Kn(e,n,r._key,i,new Jt(i!==null&&i.hasLocalMutations,!0),r.converter))}function jP(r){r=Q(r,ye);const e=Q(r.firestore,ie);return Tg(me(e),r._key,{source:"server"}).then(t=>Jl(e,r,t))}function UP(r){r=Q(r,xe);const e=Q(r.firestore,ie),t=me(e),n=new En(e);return Bg(r._query),wg(t,r._query).then(i=>new Hn(e,n,r,i))}function BP(r){r=Q(r,xe);const e=Q(r.firestore,ie),t=me(e),n=new En(e);return KA(t,r._query).then(i=>new Hn(e,n,r,i))}function qP(r){r=Q(r,xe);const e=Q(r.firestore,ie),t=me(e),n=new En(e);return wg(t,r._query,{source:"server"}).then(i=>new Hn(e,n,r,i))}function Hg(r,e,t){r=Q(r,ye);const n=Q(r.firestore,ie),i=aa(r.converter,e,t);return Xr(n,[ra(Jn(n),"setDoc",r._key,i,r.converter!==null,t).toMutation(r._key,pe.none())])}function Ql(r,e,t,...n){r=Q(r,ye);const i=Q(r.firestore,ie),s=Jn(i);let o;return o=typeof(e=$(e))=="string"||e instanceof vn?Gl(s,"updateDoc",r._key,e,t,n):zl(s,"updateDoc",r._key,e),Xr(i,[o.toMutation(r._key,pe.exists(!0))])}function $P(r){return Xr(Q(r.firestore,ie),[new zr(r._key,pe.none())])}function zP(r,e){const t=Q(r.firestore,ie),n=xr(r),i=aa(r.converter,e);return Xr(t,[ra(Jn(r.firestore),"addDoc",n._key,i,r.converter!==null,{}).toMutation(n._key,pe.exists(!1))]).then(()=>n)}function GP(r,...e){var t,n,i;r=$(r);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Ac(e[o])||(s=e[o],o++);const c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Ac(e[o])){const f=e[o];e[o]=(t=f.next)===null||t===void 0?void 0:t.bind(f),e[o+1]=(n=f.error)===null||n===void 0?void 0:n.bind(f),e[o+2]=(i=f.complete)===null||i===void 0?void 0:i.bind(f)}let l,u,p;if(r instanceof ye)u=Q(r.firestore,ie),p=qr(r._key.path),l={next:f=>{e[o]&&e[o](Jl(u,r,f))},error:e[o+1],complete:e[o+2]};else{const f=Q(r,xe);u=Q(f.firestore,ie),p=f._query;const g=new En(u);l={next:I=>{e[o]&&e[o](new Hn(u,g,f,I))},error:e[o+1],complete:e[o+2]},Bg(r._query)}return function(g,I,D,k){const S=new Xo(k),F=new Cl(I,S,D);return g.asyncQueue.enqueueAndForget(async()=>Pl(await kr(g),F)),()=>{S.Za(),g.asyncQueue.enqueueAndForget(async()=>Rl(await kr(g),F))}}(me(u),p,c,l)}function KP(r,e){return WA(me(r=Q(r,ie)),Ac(e)?e:{next:e})}function Xr(r,e){return function(n,i){const s=new ke;return n.asyncQueue.enqueueAndForget(async()=>bA(await Ml(n),i,s)),s.promise}(me(r),e)}function Jl(r,e,t){const n=t.docs.get(e._key),i=new En(r);return new Kn(r,i,e._key,n,new Jt(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HP(r){return Wg(r,{count:Gg()})}function Wg(r,e){const t=Q(r.firestore,ie),n=me(t),i=$f(e,(s,o)=>new vm(o,s.aggregateType,s._internalFieldPath));return HA(n,r._query,i).then(s=>function(c,l,u){const p=new En(c);return new Ng(l,p,u)}(t,r,s))}class WP{constructor(e){this.kind="memory",this._onlineComponentProvider=hn.provider,e?.garbageCollector?this._offlineComponentProvider=e.garbageCollector._offlineComponentProvider:this._offlineComponentProvider=dn.provider}toJSON(){return{kind:this.kind}}}class QP{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=Qg(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class JP{constructor(){this.kind="memoryEager",this._offlineComponentProvider=dn.provider}toJSON(){return{kind:this.kind}}}class YP{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new FA(e)}}toJSON(){return{kind:this.kind}}}function XP(){return new JP}function ZP(r){return new YP(r?.cacheSizeBytes)}function eR(r){return new WP(r)}function tR(r){return new QP(r)}class nR{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=hn.provider,this._offlineComponentProvider={build:t=>new Ol(t,e?.cacheSizeBytes,this.forceOwnership)}}}class rR{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=hn.provider,this._offlineComponentProvider={build:t=>new vg(t,e?.cacheSizeBytes)}}}function Qg(r){return new nR(r?.forceOwnership)}function iR(){return new rR}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sR={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jg{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Jn(e)}set(e,t,n){this._verifyNotCommitted();const i=Ht(e,this._firestore),s=aa(i.converter,t,n),o=ra(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,n);return this._mutations.push(o.toMutation(i._key,pe.none())),this}update(e,t,n,...i){this._verifyNotCommitted();const s=Ht(e,this._firestore);let o;return o=typeof(t=$(t))=="string"||t instanceof vn?Gl(this._dataReader,"WriteBatch.update",s._key,t,n,i):zl(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,pe.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Ht(e,this._firestore);return this._mutations=this._mutations.concat(new zr(t._key,pe.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new x(R.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Ht(r,e){if((r=$(r)).firestore!==e)throw new x(R.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yg extends class{constructor(t,n){this._firestore=t,this._transaction=n,this._dataReader=Jn(t)}get(t){const n=Ht(t,this._firestore),i=new kP(this._firestore);return this._transaction.lookup([n._key]).then(s=>{if(!s||s.length!==1)return j();const o=s[0];if(o.isFoundDocument())return new Xi(this._firestore,i,o.key,o,n.converter);if(o.isNoDocument())return new Xi(this._firestore,i,n._key,null,n.converter);throw j()})}set(t,n,i){const s=Ht(t,this._firestore),o=aa(s.converter,n,i),c=ra(this._dataReader,"Transaction.set",s._key,o,s.converter!==null,i);return this._transaction.set(s._key,c),this}update(t,n,i,...s){const o=Ht(t,this._firestore);let c;return c=typeof(n=$(n))=="string"||n instanceof vn?Gl(this._dataReader,"Transaction.update",o._key,n,i,s):zl(this._dataReader,"Transaction.update",o._key,n),this._transaction.update(o._key,c),this}delete(t){const n=Ht(t,this._firestore);return this._transaction.delete(n._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Ht(e,this._firestore),n=new En(this._firestore);return super.get(e).then(i=>new Kn(this._firestore,n,t._key,i._document,new Jt(!1,!1),t.converter))}}function oR(r,e,t){r=Q(r,ie);const n=Object.assign(Object.assign({},sR),t);return function(s){if(s.maxAttempts<1)throw new x(R.INVALID_ARGUMENT,"Max attempts must be at least 1")}(n),function(s,o,c){const l=new ke;return s.asyncQueue.enqueueAndForget(async()=>{const u=await bg(s);new BA(s.asyncQueue,u,c,o,l).au()}),l.promise}(me(r),i=>e(new Yg(r,i)),n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aR(){return new gs("deleteField")}function Yl(){return new Ul("serverTimestamp")}function Xl(...r){return new Bl("arrayUnion",r)}function cR(...r){return new ql("arrayRemove",r)}function lR(r){return new $l("increment",r)}function uR(r){return new ms(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dR(r){return me(r=Q(r,ie)),new Jg(r,e=>Xr(r,e))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hR(r,e){const t=me(r=Q(r,ie));if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return et("Cannot enable indexes when persistence is disabled"),Promise.resolve();const n=function(s){const o=typeof s=="string"?function(u){try{return JSON.parse(u)}catch(p){throw new x(R.INVALID_ARGUMENT,"Failed to parse JSON: "+p?.message)}}(s):s,c=[];if(Array.isArray(o.indexes))for(const l of o.indexes){const u=Bh(l,"collectionGroup"),p=[];if(Array.isArray(l.fields))for(const f of l.fields){const g=ia("setIndexConfiguration",Bh(f,"fieldPath"));f.arrayConfig==="CONTAINS"?p.push(new Mn(g,2)):f.order==="ASCENDING"?p.push(new Mn(g,0)):f.order==="DESCENDING"&&p.push(new Mn(g,1))}c.push(new vr(vr.UNKNOWN_ID,u,p,Ir.empty()))}return c}(e);return YA(t,n)}function Bh(r,e){if(typeof r[e]!="string")throw new x(R.INVALID_ARGUMENT,"Missing string value for: "+e);return r[e]}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xg{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function pR(r){var e;r=Q(r,ie);const t=qh.get(r);if(t)return t;if(((e=me(r)._uninitializedComponentsProvider)===null||e===void 0?void 0:e._offline.kind)!=="persistent")return null;const n=new Xg(r);return qh.set(r,n),n}function fR(r){Zg(r,!0)}function mR(r){Zg(r,!1)}function gR(r){ZA(me(r._firestore)).then(e=>N("deleting all persistent cache indexes succeeded")).catch(e=>et("deleting all persistent cache indexes failed",e))}function Zg(r,e){XA(me(r._firestore),e).then(t=>N(`setting persistent cache index auto creation isEnabled=${e} succeeded`)).catch(t=>et(`setting persistent cache index auto creation isEnabled=${e} failed`,t))}const qh=new WeakMap;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _R(r){var e;const t=(e=me(Q(r.firestore,ie))._onlineComponents)===null||e===void 0?void 0:e.datastore.serializer;return t===void 0?null:Ko(t,ze(r._query))._t}function yR(r,e){var t;const n=$f(e,(s,o)=>new vm(o,s.aggregateType,s._internalFieldPath)),i=(t=me(Q(r.firestore,ie))._onlineComponents)===null||t===void 0?void 0:t.datastore.serializer;return i===void 0?null:xm(i,rm(r._query),n,!0).request}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vR{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return Zl.instance.onExistenceFilterMismatch(e)}}class Zl{constructor(){this.Uu=new Map}static get instance(){return Hs||(Hs=new Zl,function(t){if(vo)throw new Error("a TestingHooksSpi instance is already set");vo=t}(Hs)),Hs}et(e){this.Uu.forEach(t=>t(e))}onExistenceFilterMismatch(e){const t=Symbol(),n=this.Uu;return n.set(t,e),()=>n.delete(t)}}let Hs=null;(function(e,t=!0){(function(i){Br=i})(Lr),Fn(new rn("firestore",(n,{instanceIdentifier:i,options:s})=>{const o=n.getProvider("app").getImmediate(),c=new ie(new Hb(n.getProvider("auth-internal")),new Jb(n.getProvider("app-check-internal")),function(u,p){if(!Object.prototype.hasOwnProperty.apply(u.options,["projectId"]))throw new x(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new on(u.options.projectId,p)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),lt(kd,"4.7.3",e),lt(kd,"4.7.3","esm2017")})();const en=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Wl,AggregateField:Nr,AggregateQuerySnapshot:Ng,Bytes:pn,CACHE_SIZE_UNLIMITED:rP,CollectionReference:st,DocumentReference:ye,DocumentSnapshot:Kn,FieldPath:vn,FieldValue:In,Firestore:ie,FirestoreError:x,GeoPoint:ta,LoadBundleTask:Cg,PersistentCacheIndexManager:Xg,Query:xe,QueryCompositeFilterConstraint:Xn,QueryConstraint:Jr,QueryDocumentSnapshot:Li,QueryEndAtConstraint:vs,QueryFieldFilterConstraint:Yr,QueryLimitConstraint:_s,QueryOrderByConstraint:oa,QuerySnapshot:Hn,QueryStartAtConstraint:ys,SnapshotMetadata:Jt,Timestamp:fe,Transaction:Yg,VectorValue:ms,WriteBatch:Jg,_AutoId:Xc,_ByteString:ge,_DatabaseId:on,_DocumentKey:M,_EmptyAppCheckTokenProvider:Yb,_EmptyAuthCredentialsProvider:Df,_FieldPath:le,_TestingHooks:vR,_cast:Q,_debugAssert:Gb,_internalAggregationQueryToProtoRunAggregationQueryRequest:yR,_internalQueryToProtoQueryTarget:_R,_isBase64Available:AT,_logWarn:et,_validateIsNotUsedTogether:Pg,addDoc:zP,aggregateFieldEqual:VP,aggregateQuerySnapshotEqual:OP,and:TP,arrayRemove:cR,arrayUnion:Xl,average:NP,clearIndexedDbPersistence:aP,collection:eP,collectionGroup:tP,connectFirestoreEmulator:Sg,count:Gg,deleteAllPersistentCacheIndexes:gR,deleteDoc:$P,deleteField:aR,disableNetwork:uP,disablePersistentCacheIndexAutoCreation:mR,doc:xr,documentId:fP,enableIndexedDbPersistence:sP,enableMultiTabIndexedDbPersistence:oP,enableNetwork:lP,enablePersistentCacheIndexAutoCreation:fR,endAt:DP,endBefore:CP,ensureFirestoreConfigured:me,executeWrite:Xr,getAggregateFromServer:Wg,getCountFromServer:HP,getDoc:Kg,getDocFromCache:FP,getDocFromServer:jP,getDocs:UP,getDocsFromCache:BP,getDocsFromServer:qP,getFirestore:Dg,getPersistentCacheIndexManager:pR,increment:lR,initializeFirestore:iP,limit:AP,limitToLast:PP,loadBundle:hP,memoryEagerGarbageCollector:XP,memoryLocalCache:eR,memoryLruGarbageCollector:ZP,namedQuery:pP,onSnapshot:GP,onSnapshotsInSync:KP,or:bP,orderBy:wP,persistentLocalCache:tR,persistentMultipleTabManager:iR,persistentSingleTabManager:Qg,query:IP,queryEqual:jl,refEqual:nP,runTransaction:oR,serverTimestamp:Yl,setDoc:Hg,setIndexConfiguration:hR,setLogLevel:zb,snapshotEqual:MP,startAfter:SP,startAt:RP,sum:xP,terminate:dP,updateDoc:Ql,vector:uR,waitForPendingWrites:cP,where:EP,writeBatch:dR},Symbol.toStringTag,{value:"Module"}));var IR="firebase",ER="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */lt(IR,ER,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e_="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bR{constructor(e,t,n){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=e.getImmediate({optional:!0}),this.messaging=t.getImmediate({optional:!0}),this.auth||e.get().then(i=>this.auth=i,()=>{}),this.messaging||t.get().then(i=>this.messaging=i,()=>{}),this.appCheck||n.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),n=await this.getMessagingToken(),i=await this.getAppCheckToken(e);return{authToken:t,messagingToken:n,appCheckToken:i}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pc="us-central1";class TR{constructor(e,t,n,i,s=Pc,o){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new bR(t,n,i),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(s);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=Pc}catch{this.customDomain=null,this.region=s}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function wR(r,e,t){r.emulatorOrigin=`http://${e}:${t}`}const $h="@firebase/functions",zh="0.11.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AR="auth-internal",PR="app-check-internal",RR="messaging-internal";function SR(r,e){const t=(n,{instanceIdentifier:i})=>{const s=n.getProvider("app").getImmediate(),o=n.getProvider(AR),c=n.getProvider(RR),l=n.getProvider(PR);return new TR(s,o,c,l,i,r)};Fn(new rn(e_,t,"PUBLIC").setMultipleInstances(!0)),lt($h,zh,e),lt($h,zh,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CR(r=kc(),e=Pc){const n=Or($(r),e_).getImmediate({identifier:e}),i=np("functions");return i&&DR(n,...i),n}function DR(r,e,t){wR($(r),e,t)}SR(fetch.bind(self));const kR={apiKey:"AIzaSyCFU50DeE7JWTSk9cys1ocpUeBDdDQ-8Tg",authDomain:"guitar-lesson-bfea5.firebaseapp.com",projectId:"guitar-lesson-bfea5",storageBucket:"guitar-lesson-bfea5.firebasestorage.app",messagingSenderId:"744496459993",appId:"1:744496459993:web:19e1a6798a9882b14ecec8"},ca=lp(kR),dr=bf(ca),Zi=Dg(ca),xR=CR(ca,"us-central1"),tn=Object.freeze(Object.defineProperty({__proto__:null,auth:dr,db:Zi,default:ca,functions:xR},Symbol.toStringTag,{value:"Module"}));class NR{constructor(){this._currentUser=JSON.parse(localStorage.getItem("gp_user")||"null")}async signUp(e,t){this._validateEmail(e),this._validatePassword(t);try{const n=await Wp(dr,e,t);return await Hg(xr(Zi,"users",n.user.uid),{email:e,plan:"free",xp:0,streak:0,createdAt:Yl(),lessonsCompleted:[],badges:[]}),this._persistUser(n.user),window.dispatchEvent(new CustomEvent("auth:login",{detail:n.user})),n.user}catch(n){throw window.dispatchEvent(new CustomEvent("auth:error",{detail:n})),this._mapError(n)}}async signIn(e,t){this._validateEmail(e),this._validatePassword(t);try{const n=await Qp(dr,e,t);return this._persistUser(n.user),window.dispatchEvent(new CustomEvent("auth:login",{detail:n.user})),n.user}catch(n){throw window.dispatchEvent(new CustomEvent("auth:error",{detail:n})),this._mapError(n)}}async signOut(){await tf(dr),localStorage.removeItem("gp_user"),this._currentUser=null,window.dispatchEvent(new CustomEvent("auth:logout"))}onAuthStateChanged(e){return ef(dr,t=>{this._currentUser=t,t?this._persistUser(t):localStorage.removeItem("gp_user"),e(t)})}getCurrentUser(){return dr.currentUser||this._currentUser}isAuthenticated(){return!!this.getCurrentUser()}_validateEmail(e){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))throw new Error("Email no válido")}_validatePassword(e){if(e.length<6)throw new Error("La contraseña debe tener al menos 6 caracteres")}_persistUser(e){this._currentUser=e,localStorage.setItem("gp_user",JSON.stringify({uid:e.uid,email:e.email}))}_mapError(e){const t={"auth/email-already-in-use":"Este email ya está registrado","auth/invalid-email":"Email no válido","auth/wrong-password":"Contraseña incorrecta","auth/user-not-found":"Usuario no encontrado","auth/too-many-requests":"Demasiados intentos. Intenta más tarde"};return new Error(t[e.code]||e.message)}}const VR=[{name:"C",freq:16.35},{name:"C#",freq:17.32},{name:"D",freq:18.35},{name:"D#",freq:19.45},{name:"E",freq:20.6},{name:"F",freq:21.83},{name:"F#",freq:23.12},{name:"G",freq:24.5},{name:"G#",freq:25.96},{name:"A",freq:27.5},{name:"A#",freq:29.14},{name:"B",freq:30.87}];class OR{constructor(){this._audioCtx=null,this._analyser=null,this._stream=null,this._buffer=null,this._animFrame=null,this._lastEmit=0,this._freqHistory=[],this._running=!1}async start(){if(this._running)return;this._stream=await navigator.mediaDevices.getUserMedia({audio:!0}),this._audioCtx=new AudioContext;const e=this._audioCtx.createMediaStreamSource(this._stream);this._analyser=this._audioCtx.createAnalyser(),this._analyser.fftSize=2048,e.connect(this._analyser),this._buffer=new Float32Array(this._analyser.fftSize),this._running=!0,this._loop()}stop(){this._running=!1,cancelAnimationFrame(this._animFrame),this._stream?.getTracks().forEach(e=>e.stop()),this._audioCtx?.close()}getFrequency(){return this._analyser.getFloatTimeDomainData(this._buffer),Math.sqrt(this._buffer.reduce((t,n)=>t+n*n,0)/this._buffer.length)<.001?null:this._yin(this._buffer,this._audioCtx.sampleRate)}getNoteFromFrequency(e){const t=12*Math.log2(e/440)+69,n=Math.round(t),i=Math.round((t-n)*100),s=Math.floor((n-12)/12),o=(n%12+12)%12;return{nombre:VR[o].name,octava:s,cents:i}}calculateCents(e,t){return Math.round(1200*Math.log2(e/t))}_loop(){if(!this._running)return;this._animFrame=requestAnimationFrame(()=>this._loop());const e=Date.now();if(e-this._lastEmit<100)return;this._lastEmit=e;const t=this.getFrequency();if(!t||t<80||t>400)return;this._freqHistory.push(t),this._freqHistory.length>5&&this._freqHistory.shift();const n=this._freqHistory.reduce((s,o)=>s+o,0)/this._freqHistory.length,i=this.getNoteFromFrequency(n);window.dispatchEvent(new CustomEvent("frequency",{detail:{frequency:n,...i}}))}_yin(e,t){const n=e.length,i=Math.floor(n/2),s=new Float32Array(i);for(let u=1;u<i;u++){let p=0;for(let f=0;f<i;f++){const g=e[f]-e[f+u];p+=g*g}s[u]=p}const o=new Float32Array(i);o[0]=1;let c=0;for(let u=1;u<i;u++)c+=s[u],o[u]=s[u]/(c/u);const l=.1;for(let u=2;u<i;u++)if(o[u]<l){for(;u+1<i&&o[u+1]<o[u];)u++;return t/u}return null}}const Wa={LITE:{id:"guitar_plus_lite_monthly"},PRO:{id:"guitar_plus_pro_monthly"},MAESTRO:{id:"guitar_plus_maestro_monthly"}},Gh="gp_subscription",LR=60*60*1e3;class MR{constructor(){this._apiKey=null,this._userId=null,this._cached=null,this._callbacks=[]}initRevenueCat(e,t){this._userId=e,this._apiKey=t,this._loadFromCache()}async getEntitlements(){if(this._cached&&Date.now()-this._cached.ts<LR)return this._cached.data;if(!this._userId||!this._apiKey)return this._firestoreFallback();try{const e=await this._fetchRevenueCat();return this._saveToCache(e),e}catch{return this._firestoreFallback()}}async getSubscriptionStatus(){const e=await this.getEntitlements(),t=e.expiresAt,n=e.plan!=="free",i=t?Math.max(0,Math.ceil((t-Date.now())/864e5)):0;return{plan:e.plan,expiresAt:t,isActive:n,daysRemaining:i}}async purchaseSubscription(e){if(!this._apiKey)throw new Error("RevenueCat no inicializado");if(!(await fetch(`https://api.revenuecat.com/v1/subscribers/${this._userId}/subscriptions`,{method:"POST",headers:{Authorization:`Bearer ${this._apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({product_id:e})})).ok)throw new Error("Error al procesar compra");this._cached=null;const n=await this.getEntitlements();return this._notify(n),n}async cancelSubscription(){this._cached=null;const e=await this.getEntitlements();this._notify(e)}onSubscriptionChanged(e){return this._callbacks.push(e),()=>{this._callbacks=this._callbacks.filter(t=>t!==e)}}async _fetchRevenueCat(){const e=await fetch(`https://api.revenuecat.com/v1/subscribers/${this._userId}`,{headers:{Authorization:`Bearer ${this._apiKey}`}});if(!e.ok)throw new Error("RevenueCat error");const n=(await e.json()).subscriber?.entitlements||{},i=!!n.maestro?.expires_date,s=i||!!n.pro?.expires_date||!!n.lite?.expires_date,o=i||!!n.pro?.expires_date;let c="free";i?c="maestro":n.pro?.expires_date?c="pro":n.lite?.expires_date&&(c="lite");const l=n[c]?.expires_date||n.pro?.expires_date||null,u=l?new Date(l):null;return{hasPrincipiante:!0,hasIntermedio:s,hasAvanzado:i,noAds:o,plan:c,expiresAt:u}}async _firestoreFallback(){const e={hasPrincipiante:!0,hasIntermedio:!1,hasAvanzado:!1,noAds:!1,plan:"free",expiresAt:null};if(!this._userId)return e;const{doc:t,getDoc:n}=await Ce(async()=>{const{doc:s,getDoc:o}=await Promise.resolve().then(()=>en);return{doc:s,getDoc:o}},void 0),{db:i}=await Ce(async()=>{const{db:s}=await Promise.resolve().then(()=>tn);return{db:s}},void 0);try{const o=(await n(t(i,"users",this._userId))).data()?.plan||"free";return{hasPrincipiante:!0,hasIntermedio:["lite","pro","maestro"].includes(o),hasAvanzado:o==="maestro",noAds:["pro","maestro"].includes(o),plan:o,expiresAt:null}}catch{return e}}_saveToCache(e){this._cached={data:e,ts:Date.now()},localStorage.setItem(Gh,JSON.stringify(this._cached)),window.dispatchEvent(new CustomEvent("subscription:changed",{detail:e}))}_loadFromCache(){const e=localStorage.getItem(Gh);e&&(this._cached=JSON.parse(e))}_notify(e){window.dispatchEvent(new CustomEvent("subscription:changed",{detail:e})),this._callbacks.forEach(t=>t(e))}}const Kh="https://accounts.spotify.com/api/token",FR="https://api.spotify.com/v1",jR=`${window.location.origin}/spotify-callback`,UR={free:0,lite:100,pro:200,maestro:500},BR={criolla:"criolla guitarra",clasica:"classical guitar",flamenco:"flamenco guitar",tango:"tango guitarra"};class qR{constructor(){this._token=null,this._tokenExpiry=null,this._deviceId=null,this._callbacks=[],this._verifier=null}async authenticate(){}async handleCallback(){const e=new URLSearchParams(window.location.search),t=e.get("code"),n=e.get("error");if(!t&&!n)return;const i=window.location.pathname.replace(/\/?spotify-callback\/?$/,"/")+window.location.hash;if(history.replaceState(null,"",i||"/"),n){window.dispatchEvent(new CustomEvent("spotify:error",{detail:n}));return}const s=localStorage.getItem("gp_pkce_verifier");localStorage.removeItem("gp_pkce_verifier");const o=await fetch(Kh,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"authorization_code",code:t,redirect_uri:jR,client_id:"",code_verifier:s})}),c=await o.json();if(!o.ok||!c.access_token){window.dispatchEvent(new CustomEvent("spotify:error",{detail:c.error_description||"Error al obtener token de Spotify"}));return}this._saveToken(c.access_token,c.expires_in),this._scheduleRefresh(c.refresh_token,c.expires_in)}async getPlaylists(e){await this._ensureToken();const t=BR[e]||e;return(await this._request(`/search?q=${encodeURIComponent(t)}&type=playlist&limit=10`)).playlists?.items||[]}async getSongs(e){return await this._ensureToken(),(await this._request(`/playlists/${e}/tracks?limit=50`)).items?.map(n=>n.track)||[]}async playSong(e,t=1){await this._ensureToken(),await this._request("/me/player/play",{method:"PUT",body:JSON.stringify({uris:[e]})}),window.dispatchEvent(new CustomEvent("spotify:playing",{detail:{trackUri:e,tempo:t}}))}async pauseSong(){await this._ensureToken(),await this._request("/me/player/pause",{method:"PUT"}),window.dispatchEvent(new CustomEvent("spotify:paused"))}async resumeSong(){await this._ensureToken(),await this._request("/me/player/play",{method:"PUT"})}setTempo(e){const t=Math.min(1.5,Math.max(.75,e));console.log(`Tempo set to ${t} (simulado — Spotify no soporta nativo)`)}async getCurrentTrack(){return await this._ensureToken(),(await this._request("/me/player/currently-playing"))?.item||null}onTrackChanged(e){this._callbacks.push(e);const t=setInterval(async()=>{const n=await this.getCurrentTrack();e(n)},5e3);return()=>{clearInterval(t),this._callbacks=this._callbacks.filter(n=>n!==e)}}async getAvailableSongs(e){const t=UR[e]||0,n=await this.getPlaylists("clasica");return n.length?(await this.getSongs(n[0].id)).slice(0,t):[]}async _ensureToken(){(!this._token||Date.now()>this._tokenExpiry)&&await this.authenticate()}async _request(e,t={}){const n=await fetch(`${FR}${e}`,{...t,headers:{Authorization:`Bearer ${this._token}`,"Content-Type":"application/json",...t.headers}});if(n.status===401)throw this._token=null,window.dispatchEvent(new CustomEvent("spotify:error",{detail:"Token expirado"})),new Error("Spotify: token expirado");if(!n.ok)throw window.dispatchEvent(new CustomEvent("spotify:error",{detail:n.statusText})),new Error(`Spotify API error: ${n.status}`);return n.status===204?null:n.json()}_saveToken(e,t){this._token=e,this._tokenExpiry=Date.now()+t*1e3-6e4,localStorage.setItem("gp_spotify_token",JSON.stringify({token:e,expiry:this._tokenExpiry}))}_scheduleRefresh(e,t){setTimeout(async()=>{try{const i=await(await fetch(Kh,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:e,client_id:""})})).json();this._saveToken(i.access_token,i.expires_in),this._scheduleRefresh(i.refresh_token||e,i.expires_in)}catch(n){window.dispatchEvent(new CustomEvent("spotify:error",{detail:n.message}))}},(t-120)*1e3)}_generateVerifier(){const e=new Uint8Array(32);return crypto.getRandomValues(e),btoa(String.fromCharCode(...e)).replace(/[+/=]/g,t=>({"+":"-","/":"_","=":""})[t])}async _generateChallenge(e){const t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return btoa(String.fromCharCode(...new Uint8Array(n))).replace(/[+/=]/g,i=>({"+":"-","/":"_","=":""})[i])}}const Qa={banner:"ca-app-pub-3940256099942544/6300978111",interstitial:"ca-app-pub-3940256099942544/1033173712",rewarded:"ca-app-pub-3940256099942544/5224354917"},$R=3,zR=2;class GR{constructor(){this._appId=null,this._exerciseSinceLastAd=0,this._rewardedToday=0,this._rewardedDate=null,this._interstitialLoaded=!1,this._rewardedLoaded=!1}initAdMob(e){this._appId=e;const t=new Date().toDateString(),n=JSON.parse(localStorage.getItem("gp_ads_state")||"{}");this._rewardedToday=n.date===t&&n.rewardedCount||0,this._rewardedDate=t,window.dispatchEvent(new CustomEvent("ads:loaded",{detail:{appId:e}}))}loadBannerAd(e=Qa.banner,t){const n=document.getElementById(t);if(!n)return;const i=document.createElement("div");i.className="ad-banner",i.dataset.adUnit=e,i.innerHTML=`
      <div class="ad-placeholder" style="background:#2a2a3e;text-align:center;padding:8px;font-size:12px;color:#888;">
        📢 Publicidad — <a href="#" onclick="return false;" style="color:#7c6af7">¿Quieres eliminar anuncios?</a>
      </div>
    `,n.appendChild(i),i.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("ads:clicked",{detail:{type:"banner",unitId:e}}))})}loadInterstitialAd(e=Qa.interstitial){this._interstitialLoaded=!0,this._interstitialUnitId=e}showInterstitialAd(){if(!this._interstitialLoaded)return;this._exerciseSinceLastAd=0;const e=document.createElement("div");e.className="ad-interstitial-overlay",e.innerHTML=`
      <div class="ad-interstitial">
        <div class="ad-content">
          <p>📢 Anuncio</p>
          <div class="ad-placeholder">Espacio publicitario</div>
        </div>
        <button class="ad-close" id="ad-close-btn">Cerrar (5s)</button>
      </div>
    `,document.body.appendChild(e);let t=5;const n=e.querySelector("#ad-close-btn"),i=setInterval(()=>{t--,n.textContent=t>0?`Cerrar (${t}s)`:"Cerrar",t<=0&&(clearInterval(i),n.disabled=!1)},1e3);n.disabled=!0,n.addEventListener("click",()=>{e.remove(),window.dispatchEvent(new CustomEvent("ads:clicked",{detail:{type:"interstitial"}}))}),this._interstitialLoaded=!1,this.loadInterstitialAd()}loadRewardedAd(e=Qa.rewarded){this._rewardedLoaded=!0,this._rewardedUnitId=e}showRewardedAd(){return new Promise((e,t)=>{if(!this._rewardedLoaded)return t(new Error("Rewarded ad no cargado"));const n=new Date().toDateString();if(this._rewardedDate!==n&&(this._rewardedToday=0,this._rewardedDate=n),this._rewardedToday>=zR)return t(new Error("Límite diario de anuncios recompensados alcanzado"));const i=document.createElement("div");i.className="ad-rewarded-overlay",i.innerHTML=`
        <div class="ad-rewarded">
          <p>📢 Ver anuncio para ganar XP extra</p>
          <div class="ad-placeholder" style="height:100px;background:#2a2a3e;margin:16px 0;"></div>
          <div id="rewarded-timer">Mirando anuncio... 10s</div>
        </div>
      `,document.body.appendChild(i);let s=10;const o=i.querySelector("#rewarded-timer"),c=setInterval(()=>{s--,o.textContent=s>0?`Mirando anuncio... ${s}s`:"¡Recompensa ganada!",s<=0&&(clearInterval(c),setTimeout(()=>{i.remove(),this._rewardedToday++,this._saveAdsState(),window.dispatchEvent(new CustomEvent("ads:reward",{detail:{amount:50}})),e({rewarded:!0,amount:50})},1e3))},1e3)})}shouldShowAds(e){return e?.plan==="lite"}onExerciseCompleted(e){this.shouldShowAds(e)&&(this._exerciseSinceLastAd++,this._exerciseSinceLastAd>=$R&&(this.loadInterstitialAd(),this.showInterstitialAd()))}_saveAdsState(){localStorage.setItem("gp_ads_state",JSON.stringify({date:this._rewardedDate,rewardedCount:this._rewardedToday}))}}const KR=[{label:"E",note:"E2",freq:82.41},{label:"A",note:"A2",freq:110},{label:"D",note:"D3",freq:146.83},{label:"G",note:"G3",freq:196},{label:"B",note:"B3",freq:246.94},{label:"E",note:"E4",freq:329.63}];class HR{constructor(){this._canvas=null,this._ctx=null,this._selectedString=3,this._lastCents=0}render(){const e=document.getElementById("main-content");e.innerHTML=`
      <div class="tuner-container">
        <div class="frequency-display" id="frequency">0 Hz</div>
        <h2 id="note-name">--</h2>
        <div class="cents-display">
          <span id="cents">0</span> <span class="cents-label">cents</span>
        </div>
        <canvas id="tuner-canvas" width="300" height="150"></canvas>
        <div class="string-selector">
          ${KR.map((t,n)=>`
            <button class="string-btn ${n===this._selectedString?"active":""}"
              data-index="${n}" data-note="${t.note}" title="${t.note}">
              ${t.label}
            </button>
          `).join("")}
        </div>
        <div id="tuner-status" class="tuner-status">🎙️ Escuchando...</div>
      </div>
    `,this._canvas=document.getElementById("tuner-canvas"),this._ctx=this._canvas.getContext("2d"),this._drawNeedle(0),this._attachStringListeners(),window.addEventListener("frequency",t=>{const{frequency:n,nombre:i,octava:s,cents:o}=t.detail;this.updateFrequency(n,`${i}${s}`,o)})}updateFrequency(e,t,n){const i=document.getElementById("frequency"),s=document.getElementById("note-name"),o=document.getElementById("cents");i&&(i.textContent=`${e.toFixed(1)} Hz`,s.textContent=t,o.textContent=n>=0?`+${n}`:`${n}`,this.updateTunerIndicator(n),this.updateStatus(n))}updateTunerIndicator(e){this._ctx&&(this._canvas,this._ctx,this._lastCents+=(e-this._lastCents)*.3,this._drawNeedle(this._lastCents))}updateStatus(e){const t=document.getElementById("tuner-status");if(!t)return;const n=Math.abs(e);n<=5?(t.textContent="🟢 Afinada",t.className="tuner-status tuned"):n<=15?(t.textContent="🟡 Casi afinada",t.className="tuner-status almost"):(t.textContent=e<0?"🔴 Demasiado grave":"🔴 Demasiado aguda",t.className="tuner-status out-of-tune")}getIndicatorColor(e){const t=Math.abs(e);return t<=5?"#22c55e":t<=15?"#eab308":"#ef4444"}_drawNeedle(e){const t=this._canvas,n=this._ctx,i=t.width,s=t.height,o=i/2,c=s-10,l=s-20;n.clearRect(0,0,i,s),n.beginPath(),n.arc(o,c,l,Math.PI,0,!1),n.lineWidth=8,n.strokeStyle="#2a2a3e",n.stroke(),[{from:Math.PI,to:Math.PI*.75,color:"#ef4444"},{from:Math.PI*.75,to:Math.PI*.6,color:"#eab308"},{from:Math.PI*.6,to:Math.PI*.4,color:"#22c55e"},{from:Math.PI*.4,to:Math.PI*.25,color:"#eab308"},{from:Math.PI*.25,to:0,color:"#ef4444"}].forEach(({from:D,to:k,color:S})=>{n.beginPath(),n.arc(o,c,l,D,k,!1),n.strokeStyle=S,n.lineWidth=8,n.stroke()});const p=Math.PI-(e+50)/100*Math.PI,f=this.getIndicatorColor(e),g=o+l*.85*Math.cos(p),I=c-l*.85*Math.sin(p);n.beginPath(),n.moveTo(o,c),n.lineTo(g,I),n.strokeStyle=f,n.lineWidth=3,n.lineCap="round",n.stroke(),n.beginPath(),n.arc(o,c,6,0,Math.PI*2),n.fillStyle=f,n.fill()}_attachStringListeners(){document.querySelectorAll(".string-btn").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".string-btn").forEach(t=>t.classList.remove("active")),e.classList.add("active"),this._selectedString=parseInt(e.dataset.index)})})}}const t_={E4:{cuerda:1,traste:0,dedo:null,label:"Mi agudo",cuerdaNombre:"1ª (E)"},F4:{cuerda:1,traste:1,dedo:1,label:"Fa",cuerdaNombre:"1ª (E)"},"F#4":{cuerda:1,traste:2,dedo:2,label:"Fa#",cuerdaNombre:"1ª (E)"},G4:{cuerda:1,traste:3,dedo:3,label:"Sol",cuerdaNombre:"1ª (E)"},"G#4":{cuerda:1,traste:4,dedo:4,label:"Sol#",cuerdaNombre:"1ª (E)"},B3:{cuerda:2,traste:0,dedo:null,label:"Si",cuerdaNombre:"2ª (B)"},C4:{cuerda:2,traste:1,dedo:1,label:"Do",cuerdaNombre:"2ª (B)"},"C#4":{cuerda:2,traste:2,dedo:2,label:"Do#",cuerdaNombre:"2ª (B)"},D4:{cuerda:2,traste:3,dedo:3,label:"Re",cuerdaNombre:"2ª (B)"},G3:{cuerda:3,traste:0,dedo:null,label:"Sol",cuerdaNombre:"3ª (G)"},"G#3":{cuerda:3,traste:1,dedo:1,label:"Sol#",cuerdaNombre:"3ª (G)"},A3:{cuerda:3,traste:2,dedo:2,label:"La",cuerdaNombre:"3ª (G)"},D3:{cuerda:4,traste:0,dedo:null,label:"Re",cuerdaNombre:"4ª (D)"},"D#3":{cuerda:4,traste:1,dedo:1,label:"Re#",cuerdaNombre:"4ª (D)"},E3:{cuerda:4,traste:2,dedo:2,label:"Mi",cuerdaNombre:"4ª (D)"},F3:{cuerda:4,traste:3,dedo:3,label:"Fa",cuerdaNombre:"4ª (D)"},A2:{cuerda:5,traste:0,dedo:null,label:"La",cuerdaNombre:"5ª (A)"},"A#2":{cuerda:5,traste:1,dedo:1,label:"La#",cuerdaNombre:"5ª (A)"},B2:{cuerda:5,traste:2,dedo:2,label:"Si",cuerdaNombre:"5ª (A)"},C3:{cuerda:5,traste:3,dedo:3,label:"Do",cuerdaNombre:"5ª (A)"},E2:{cuerda:6,traste:0,dedo:null,label:"Mi grave",cuerdaNombre:"6ª (E)"},F2:{cuerda:6,traste:1,dedo:1,label:"Fa",cuerdaNombre:"6ª (E)"},"F#2":{cuerda:6,traste:2,dedo:2,label:"Fa#",cuerdaNombre:"6ª (E)"},G2:{cuerda:6,traste:3,dedo:3,label:"Sol",cuerdaNombre:"6ª (E)"}},WR={1:"Índice",2:"Medio",3:"Anular",4:"Meñique"},QR={1:"#7c6af7",2:"#22c55e",3:"#f59e0b",4:"#ef4444"},JR=["E4","B3","G3","D3","A2","E2"];class YR{render(e,t){const n=document.getElementById(e);if(!n)return;const i=t_[t];n.innerHTML=i?this._buildSVG(i,t):`<p class="fretboard-no-pos">Diagrama no disponible para ${t}</p>`}_buildSVG(e,t){const f=e.traste===0,g=e.traste>3?e.traste-2:0;let I='<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" class="fretboard-svg">';I+='<rect width="280" height="180" fill="#16213e" rx="10"/>',g===0&&(I+=`<rect x="48" y="30" width="5" height="${24*5}" fill="#e2e8f0" rx="2"/>`);for(let S=1;S<=5;S++){const F=48+S*42.4;I+=`<line x1="${F}" y1="30" x2="${F}" y2="${30+24*5}" stroke="#334155" stroke-width="1.5"/>`;const U=g+S;I+=`<text x="${F-42.4/2}" y="20" text-anchor="middle" fill="#64748b" font-size="10">${U}</text>`}for(let S=0;S<6;S++){const F=30+S*24,U=1+S*.35;I+=`<line x1="48" y1="${F}" x2="260" y2="${F}" stroke="#94a3b8" stroke-width="${U}"/>`,I+=`<text x="42" y="${F+4}" text-anchor="end" fill="#64748b" font-size="9">${JR[S]}</text>`}const D=30+(e.cuerda-1)*24;if(f)I+=`<circle cx="34" cy="${D}" r="7" fill="none" stroke="#22c55e" stroke-width="2"/>`,I+=`<text x="34" y="${D+4}" text-anchor="middle" fill="#22c55e" font-size="9">O</text>`;else{const S=48+(e.traste-g-.5)*42.4,F=QR[e.dedo]||"#7c6af7";I+=`<circle cx="${S}" cy="${D}" r="10" fill="${F}" opacity="0.9"/>`,I+=`<text x="${S}" y="${D+4}" text-anchor="middle" fill="white" font-size="10" font-weight="bold">${e.dedo}</text>`}const k=f?`Tocá la ${e.cuerdaNombre} al aire (sin pisar)`:`Dedo ${e.dedo} (${WR[e.dedo]}) en traste ${e.traste}, ${e.cuerdaNombre}`;return I+=`<text x="${280/2}" y="172" text-anchor="middle" fill="#94a3b8" font-size="10">${k}</text>`,I+="</svg>",I}}const XR={sub1:{nombre:"Introducción a la Guitarra",lecciones:[{nombre:"Anatomía de la guitarra",tipo:"theory",objetivo:"Identificar todas las partes de la guitarra",descripcion:`La guitarra tiene estas partes principales que debés conocer:

🎸 **Cuerpo** — la caja de madera que amplifica el sonido (en acústica) o sostiene las pastillas (en eléctrica).

🎵 **Boca o soundhole** — el agujero redondo del centro por donde sale el sonido en la guitarra acústica.

📏 **Mástil o diapasón** — la barra larga donde ponés los dedos para pisar las notas. Tiene trastes metálicos que dividen las notas.

🔢 **Trastes** — las divisiones metálicas del mástil. Cada traste sube medio tono. Traste 1 es el más cercano a la cabeza.

🎯 **Cejuela (nut)** — la pieza blanca al inicio del mástil que sostiene las cuerdas.

🔩 **Clavijero y clavijas** — la parte de arriba donde se enrollan las cuerdas. Las clavijas sirven para afinar.

🎼 **6 cuerdas** (de más gruesa a más fina): **Mi (E2) · La (A2) · Re (D3) · Sol (G3) · Si (B3) · Mi (E4)**

📌 **Puente (bridge)** — la pieza en el cuerpo donde se anclan las cuerdas del lado opuesto al clavijero.

Leé con calma cada parte y tocá tu guitarra para identificarlas en el instrumento real. Cuando las conozcas todas, presioná "Completado".`,ejercicios:[],quiz:[{pregunta:"¿Cómo se llaman las divisiones metálicas del mástil que separan las notas?",opciones:["Clavijas","Trastes","Puentes","Cejuelas"],correcta:1},{pregunta:"¿Cuál es el orden correcto de las cuerdas de más gruesa a más fina?",opciones:["E A D G B E","E B G D A E","A E D G B E","E G D A B E"],correcta:0},{pregunta:"¿Cómo se llama la pieza al inicio del mástil que sostiene las cuerdas?",opciones:["Puente","Traste","Cejuela","Clavijero"],correcta:2},{pregunta:"¿Para qué sirven las clavijas del clavijero?",opciones:["Sostener la correa","Afinar las cuerdas","Amplificar el sonido","Sujetar el puente"],correcta:1},{pregunta:"¿Dónde se anclan las cuerdas en el cuerpo de la guitarra?",opciones:["En la boca","En el mástil","En el puente","En la cejuela"],correcta:2}]},{nombre:"Postura correcta sentado",tipo:"theory",objetivo:"Adoptar postura ergonómica sentado",descripcion:`Una buena postura desde el primer día evita lesiones y hace más fácil tocar.

🪑 **Posición clásica:**
- Sentate en el borde de la silla, sin apoyar la espalda
- La cintura de la guitarra descansa sobre tu **pierna izquierda** (si sos diestro)
- El cuerpo de la guitarra queda ligeramente inclinado hacia arriba
- La cabeza del mástil a la altura de tus ojos o un poco más arriba

🎸 **Posición popular/informal:**
- La guitarra descansa sobre la **pierna derecha**
- Más relajada, ideal para principiantes y música popular
- El mástil en un ángulo de unos 30-45° hacia arriba

✅ **Puntos clave:**
- Espalda recta, hombros relajados — no te encorvés
- El brazo derecho descansa sobre el borde superior del cuerpo
- La muñeca izquierda no apoya en el mástil, los dedos caen perpendiculares a las cuerdas
- Nunca aprietes la guitarra contra el cuerpo con el brazo derecho

Intentá ambas posiciones y elegí la que te resulte más cómoda.`,ejercicios:[],quiz:[{pregunta:"En la posición clásica, ¿sobre qué pierna descansa la guitarra (para un diestro)?",opciones:["Pierna derecha","Pierna izquierda","Cualquiera de las dos","No descansa en las piernas"],correcta:1},{pregunta:"¿Qué ocurre si apretás la guitarra contra el cuerpo con el brazo derecho?",opciones:["Suena mejor","La guitarra se afina sola","Limita el movimiento y genera tensión","Es la postura correcta"],correcta:2},{pregunta:"¿Cómo deben estar los hombros al tocar?",opciones:["Levantados y tensos","Relajados y bajos","Uno más alto que el otro","Hacia adelante"],correcta:1}]},{nombre:"Postura de pie con correa",tipo:"theory",objetivo:"Usar la guitarra de pie sin tensión",descripcion:`Tocar de pie requiere una correa bien ajustada para que la guitarra quede en la misma posición que sentado.

🎸 **Ajuste de la correa:**
- Enganchá la correa en los dos **pines** del cuerpo (uno arriba, uno abajo)
- Regulá la longitud para que la guitarra quede a la altura de tu cadera o abdomen
- **Muy baja** (estilo rockero): se ve bien pero dificulta el freteo → no recomendado para practicar
- **A la altura del cinto**: posición ideal para tocar cómodo y con precisión

✅ **Puntos clave:**
- La postura de pie debe ser igual que sentado — mismos ángulos de brazos y manos
- Repartí el peso en los dos pies, no te apoyes en una pierna
- Verificá que la correa no ejerza tensión en el cuello del instrumento
- Si tu guitarra no tiene pin en el talón del mástil, usá una correa que se ata al clavijero

Practicá ponerte y sacarte la correa hasta que sea automático.`,ejercicios:[],quiz:[{pregunta:"¿A qué altura debería quedar la guitarra al tocar de pie?",opciones:["A la altura de las rodillas","A la altura del cinto/abdomen","Lo más baja posible","A la altura del pecho"],correcta:1},{pregunta:"¿Por qué no es recomendable tocar con la guitarra muy baja para practicar?",opciones:["Se ve mal","Dificulta el freteo y la posición de la mano","Desafina las cuerdas","La correa se rompe"],correcta:1}]},{nombre:"Posición de la mano derecha",tipo:"exercise",objetivo:"Posicionar los dedos sobre las cuerdas",descripcion:`La mano derecha controla el sonido, el ritmo y la dinámica.

🖐 **Con púa:**
- Sostené la púa entre el **pulgar** e **índice**, con solo 2-3mm asomando
- El movimiento viene de la **muñeca**, no solo del dedo
- El codo apoya ligeramente sobre el borde del cuerpo de la guitarra

🖐 **Con dedos (fingerstyle):**
- **p** = pulgar (cuerdas 4, 5, 6 graves)
- **i** = índice (cuerda 3)
- **m** = medio (cuerda 2)
- **a** = anular (cuerda 1)
- Los dedos atacan hacia la palma, no hacia afuera

🎯 **Ejercicio:** Tocá la cuerda Mi aguda (la más fina, E4) con la púa o el dedo índice. El afinador va a detectar si sonó correctamente.`,ejercicios:[{tipo:"nota",esperada:"E4",duracion:10,tolerance:20}]},{nombre:"Posición de la mano izquierda",tipo:"exercise",objetivo:"Pisar correctamente los trastes",descripcion:`La mano izquierda pisa las notas. Hacerlo mal genera ruido y cansancio.

✋ **Reglas de oro:**
- Los dedos caen **perpendiculares** al mástil, bien curvados (como si agarraras una pelota)
- Presioná justo **detrás del traste** (no encima, no lejos)
- El pulgar va detrás del mástil, aproximadamente detrás del dedo medio
- La palma **no** toca el mástil

❌ **Errores comunes:**
- Pulgar por encima del mástil → limita el movimiento de los dedos
- Dedo muy lejos del traste → sonido apagado o buzzing
- Apretar demasiado fuerte → se cansa la mano. Usá solo la presión necesaria

🎯 **Ejercicio:** Pisá el traste 2 de la cuerda La (quinta cuerda) para producir la nota Si (B2). Tocala y verificá que suene limpio con el afinador.`,ejercicios:[{tipo:"nota",esperada:"A2",duracion:10,tolerance:20}]},{nombre:"Afinación básica con afinador",tipo:"exercise",objetivo:"Afinar las 6 cuerdas",descripcion:`Siempre afinar antes de practicar — una guitarra desafinada entrena el oído mal.

🎵 **Las 6 cuerdas al aire (de más gruesa a más fina):**

| Cuerda | Nota | Truco para recordar |
|--------|------|---------------------|
| 6ª (más gruesa) | **Mi (E2)** | "**E**sa cuerda es gruesa" |
| 5ª | **La (A2)** | "**A**rriba del Do" |
| 4ª | **Re (D3)** | "**R**e es la del medio" |
| 3ª | **Sol (G3)** | "Sol **G**rande" |
| 2ª | **Si (B3)** | "Si, sí" |
| 1ª (más fina) | **Mi (E4)** | "**E**s la más fina" |

🎯 **Cómo usar el afinador de Guitar+:**
1. Tocá cada cuerda al aire
2. La aguja y el color te indican si está afinada (🟢), grave (🔴 izq.) o aguda (🔴 der.)
3. Girá la clavija correspondiente hasta que la aguja quede centrada en verde
4. Afinala de grave a aguda: E2 → A2 → D3 → G3 → B3 → E4

🎯 **Ejercicio:** Tocá la cuerda Mi grave (E2) al aire para verificar que el afinador la detecte.`,ejercicios:[{tipo:"nota",esperada:"E2",duracion:15,tolerance:10},{tipo:"nota",esperada:"A2",duracion:15,tolerance:10}]},{nombre:"Introducción a la púa",tipo:"theory",objetivo:"Conocer tipos y uso de la púa",quiz:[{pregunta:"¿Qué grosor de púa se recomienda para principiantes?",opciones:["Muy fina (0.38mm)","Media (0.73-0.88mm)","Muy gruesa (2mm+)","No importa el grosor"],correcta:1},{pregunta:"¿Cuánto debe asomar la púa entre los dedos?",opciones:["1 cm","La mitad","2-3 mm","Toda la púa"],correcta:2},{pregunta:"¿Desde qué parte del brazo debe venir el movimiento al rasguear con púa?",opciones:["Todo el brazo","El codo","La muñeca","Solo los dedos"],correcta:2},{pregunta:'¿Qué significa "down stroke"?',opciones:["Golpe hacia arriba","Golpe hacia abajo","Golpe con el dedo","Apagar las cuerdas"],correcta:1}],descripcion:`La púa (o plectro) es una pequeña pieza con la que golpeás las cuerdas. Parece simple pero tiene mucho impacto en el sonido.

🎸 **Tipos de púa por grosor:**

- **Fina (0.46 - 0.60mm)** — Flexible, ideal para rasgueos. Produce sonido brillante y suave. Buena para principiantes.
- **Media (0.73 - 0.88mm)** — Equilibrio entre flexibilidad y control. La más versátil. ✅ Recomendada para empezar.
- **Gruesa (1.0mm+)** — Rígida, más control sobre las notas, ideal para solistas y metal.

✋ **Cómo sostenerla:**
1. Cerrá el puño suavemente con la mano derecha
2. Apoyá la púa sobre la primera falange del **dedo índice**, con la punta apuntando hacia abajo
3. Cubría con el **pulgar** — dejá solo 2-3mm asomando
4. No la aprietes demasiado — relajá la mano

🎵 **Dirección del golpe:**
- **Down stroke (↓)**: el movimiento más natural, hacia el suelo
- **Up stroke (↑)**: hacia arriba, igual de importante
- Siempre desde la muñeca, no todo el brazo

Conseguí una púa media si no tenés. Son muy baratas y hacen gran diferencia.`,ejercicios:[]},{nombre:"Tu primera nota: Mi (E4)",tipo:"exercise",objetivo:"Tocar la nota Mi en la primera cuerda",descripcion:`¡Tu primera nota real! La nota **Mi agudo (E4)** está en la primera cuerda al aire — sin pisar ningún traste.

🎯 **Cómo tocarla:**
1. Con la mano izquierda, no pisés ningún traste (cuerda al aire)
2. Con la mano derecha, golpeá **solo la primera cuerda** (la más fina)
3. El movimiento debe ser limpio — no toques las demás cuerdas

✅ **Pistas para que salga bien:**
- Usá la púa con un golpe suave hacia abajo
- Si el sonido es apagado, revisá que no estés tocando otra cuerda sin querer
- Esperá que el afinador muestre la nota E — si la aguja está cerca del centro, ¡perfecto!

🎵 **Dato:** Esta nota, Mi (E4) a 329.63 Hz, es la nota más aguda de las cuerdas al aire. Es ideal para empezar porque no hay que pisar nada.

Tocala varias veces hasta que el afinador la detecte consistentemente. 🟢`,ejercicios:[{tipo:"nota",esperada:"E4",duracion:20,tolerance:15}]},{nombre:"Tu primera nota: La (A2)",tipo:"exercise",objetivo:"Tocar la nota La en la quinta cuerda",descripcion:`La nota **La (A2)** es la quinta cuerda al aire — una de las más importantes porque es la referencia para afinar toda la guitarra.

🎯 **Cómo tocarla:**
1. Contá las cuerdas desde arriba: la quinta es la segunda más gruesa
2. No pisés ningún traste — cuerda al aire
3. Golpeá solo esa cuerda con la púa

✅ **Cómo identificar la cuerda correcta:**
- La más gruesa (1ª desde arriba) es Mi grave → **no** es esa
- La segunda más gruesa es **La (A2)** → esa es la que buscás

🎵 **¿Por qué es importante La?**
A 110 Hz, el La es la nota de referencia universal. Cuando un músico dice "dame un La", se refiere a esta nota (o su octava A4 a 440 Hz). Con ella afinamos toda la guitarra de oído.

Tocala varias veces limpiamente y verificá que el afinador detecte la nota A. 🟢`,ejercicios:[{tipo:"nota",esperada:"A2",duracion:20,tolerance:15}]},{nombre:"Resumen: Intro y evaluación",tipo:"exercise",objetivo:"Consolidar postura y primeras notas",descripcion:`¡Llegaste al final del sub-nivel 1! Repasemos todo lo aprendido antes de continuar.

📋 **Checklist de postura:**
- [ ] Espalda recta, hombros relajados
- [ ] Guitarra estable sin apretarla con el brazo
- [ ] Mano izquierda con dedos curvos, pulgar detrás del mástil
- [ ] Mano derecha relajada sosteniendo la púa

🎵 **Las 6 cuerdas al aire que ya conocés:**
E2 · A2 · D3 · G3 · B3 · E4

🎯 **Evaluación:**
Tocá la cuerda **Mi agudo (E4)** y la cuerda **La (A2)** limpiamente, una por vez.
El afinador tiene que detectar cada nota correctamente.

Si lográs 70% o más de accuracy, ¡pasás al siguiente sub-nivel: **Acordes Básicos**! 🎸`,ejercicios:[{tipo:"nota",esperada:"E4",duracion:30,tolerance:10},{tipo:"nota",esperada:"A2",duracion:30,tolerance:10}]}]},sub2:{nombre:"Acordes Básicos",lecciones:[{nombre:"Acorde de Do Mayor (C)",tipo:"exercise",objetivo:"Pisar y sonar el acorde Do Mayor",ejercicios:[{tipo:"acorde",esperada:"C",duracion:20,tolerance:25}]},{nombre:"Acorde de Sol Mayor (G)",tipo:"exercise",objetivo:"Pisar y sonar el acorde Sol Mayor",ejercicios:[{tipo:"acorde",esperada:"G",duracion:20,tolerance:25}]},{nombre:"Acorde de Re Mayor (D)",tipo:"exercise",objetivo:"Pisar y sonar el acorde Re Mayor",ejercicios:[{tipo:"acorde",esperada:"D",duracion:20,tolerance:25}]},{nombre:"Acorde de La Mayor (A)",tipo:"exercise",objetivo:"Pisar y sonar el acorde La Mayor",ejercicios:[{tipo:"acorde",esperada:"A",duracion:20,tolerance:25}]},{nombre:"Acorde de Mi Mayor (E)",tipo:"exercise",objetivo:"Pisar y sonar el acorde Mi Mayor",ejercicios:[{tipo:"acorde",esperada:"E",duracion:20,tolerance:25}]},{nombre:"Cambio Do-Sol",tipo:"exercise",objetivo:"Cambiar entre C y G fluidamente",ejercicios:[{tipo:"acorde",esperada:"C",duracion:10,tolerance:25},{tipo:"acorde",esperada:"G",duracion:10,tolerance:25}]},{nombre:"Cambio Re-La",tipo:"exercise",objetivo:"Cambiar entre D y A fluidamente",ejercicios:[{tipo:"acorde",esperada:"D",duracion:10,tolerance:25},{tipo:"acorde",esperada:"A",duracion:10,tolerance:25}]},{nombre:"Progresión C-G-Am-F",tipo:"exercise",objetivo:"Tocar la progresión básica más popular",ejercicios:[{tipo:"acorde",esperada:"C",duracion:8,tolerance:20},{tipo:"acorde",esperada:"G",duracion:8,tolerance:20}]},{nombre:"Acordes menores: Am, Em, Dm",tipo:"exercise",objetivo:"Dominar los 3 acordes menores básicos",ejercicios:[{tipo:"acorde",esperada:"Am",duracion:15,tolerance:20}]},{nombre:"Evaluación: 5 acordes básicos",tipo:"exercise",objetivo:"Tocar los 5 acordes con cambio fluido",ejercicios:[{tipo:"acorde",esperada:"C",duracion:10,tolerance:15},{tipo:"acorde",esperada:"G",duracion:10,tolerance:15},{tipo:"acorde",esperada:"D",duracion:10,tolerance:15}]}]},sub3:{nombre:"Rasgueo Básico",lecciones:[{nombre:"El rasgueo hacia abajo (Down)",tipo:"video",objetivo:"Dominar el movimiento básico de rasgueo",ejercicios:[]},{nombre:"El rasgueo hacia arriba (Up)",tipo:"exercise",objetivo:"Rasguear hacia arriba con control",ejercicios:[{tipo:"rasgueo",esperada:"up",duracion:15,tolerance:30}]},{nombre:"Patrón D-D-D-D (negras)",tipo:"exercise",objetivo:"Mantener ritmo constante en negras",ejercicios:[{tipo:"rasgueo",esperada:"D",duracion:20,tolerance:25}]},{nombre:"Patrón D-U-D-U",tipo:"exercise",objetivo:"Alternar rasgueo arriba-abajo",ejercicios:[{tipo:"rasgueo",esperada:"DU",duracion:20,tolerance:25}]},{nombre:"Patrón D-D-U-U-D-U",tipo:"exercise",objetivo:"Patrón de 8 tiempos básico",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:25,tolerance:20}]},{nombre:"Rasgueo con apagado (mute)",tipo:"video",objetivo:"Agregar percusión al rasgueo",ejercicios:[]},{nombre:"Ritmo de vals 3/4",tipo:"exercise",objetivo:"Tocar en compás de 3 tiempos",ejercicios:[{tipo:"rasgueo",esperada:"DUU",duracion:20,tolerance:20}]},{nombre:"Rasgueo con cambios de acorde",tipo:"exercise",objetivo:"Rasguear mientras cambias acordes C-G",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:30,tolerance:20}]},{nombre:"Dinámica: piano y forte",tipo:"exercise",objetivo:"Controlar la intensidad del rasgueo",ejercicios:[{tipo:"rasgueo",esperada:"soft",duracion:20,tolerance:25}]},{nombre:"Evaluación: Rasgueo fluido",tipo:"exercise",objetivo:"Demostrar patrón DDUUDU con cambios de acorde",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:40,tolerance:15}]}]},sub4:{nombre:"Técnica de Dedos",lecciones:[{nombre:"Nomenclatura PIMA",tipo:"theory",objetivo:"Conocer la nomenclatura de dedos flamencos",ejercicios:[]},{nombre:"Ejercicio de independencia digital",tipo:"exercise",objetivo:"Mover cada dedo independientemente",ejercicios:[{tipo:"nota",esperada:"E4",duracion:20,tolerance:20}]},{nombre:"Escala cromática con dedo índice",tipo:"exercise",objetivo:"Tocar la escala cromática en posición 1",ejercicios:[{tipo:"nota",esperada:"F4",duracion:20,tolerance:15}]},{nombre:"Ejercicio 1-2-3-4 en trastes",tipo:"exercise",objetivo:"Coordinar los 4 dedos en progresión",ejercicios:[{tipo:"nota",esperada:"G3",duracion:25,tolerance:15}]},{nombre:"Ligado ascendente (Hammer-on)",tipo:"video",objetivo:"Aprender la técnica de hammer-on",ejercicios:[]},{nombre:"Ligado descendente (Pull-off)",tipo:"exercise",objetivo:"Ejecutar pull-offs correctamente",ejercicios:[{tipo:"nota",esperada:"B3",duracion:20,tolerance:20}]},{nombre:"Ejercicio araña (Spider exercise)",tipo:"exercise",objetivo:"Desarrollar velocidad y coordinación",ejercicios:[{tipo:"nota",esperada:"D3",duracion:30,tolerance:15}]},{nombre:"Posición de cejilla media",tipo:"video",objetivo:"Introducción a los acordes de cejilla",ejercicios:[]},{nombre:"Cejilla en traste 2: B Mayor",tipo:"exercise",objetivo:"Tocar primer acorde con cejilla",ejercicios:[{tipo:"acorde",esperada:"B",duracion:20,tolerance:25}]},{nombre:"Evaluación: Técnica digital",tipo:"exercise",objetivo:"Escala cromática y ligados",ejercicios:[{tipo:"nota",esperada:"E4",duracion:30,tolerance:10}]}]},sub5:{nombre:"Notas Sueltas",lecciones:[{nombre:"Las 6 notas al aire",tipo:"exercise",objetivo:"Identificar y tocar E A D G B E",ejercicios:[{tipo:"nota",esperada:"E2",duracion:10,tolerance:15},{tipo:"nota",esperada:"A2",duracion:10,tolerance:15}]},{nombre:"Notas en la cuerda 1 (E)",tipo:"exercise",objetivo:"Tocar F, F#, G, G#, A en la 1ª cuerda",ejercicios:[{tipo:"nota",esperada:"F4",duracion:15,tolerance:15}]},{nombre:"Notas en la cuerda 2 (B)",tipo:"exercise",objetivo:"Tocar C, C#, D, D# en la 2ª cuerda",ejercicios:[{tipo:"nota",esperada:"C4",duracion:15,tolerance:15}]},{nombre:"Notas en la cuerda 3 (G)",tipo:"exercise",objetivo:"Notas en la 3ª cuerda posición abierta",ejercicios:[{tipo:"nota",esperada:"G#3",duracion:15,tolerance:15}]},{nombre:"Escala de Do Mayor (posición 1)",tipo:"exercise",objetivo:"Tocar la escala de Do Mayor completa",ejercicios:[{tipo:"escala",esperada:"C_major",duracion:30,tolerance:15}]},{nombre:"Escala de Sol Mayor",tipo:"exercise",objetivo:"Tocar la escala de Sol Mayor",ejercicios:[{tipo:"escala",esperada:"G_major",duracion:30,tolerance:15}]},{nombre:"Escala pentatónica menor de La",tipo:"exercise",objetivo:"Introducción a la pentatónica",ejercicios:[{tipo:"escala",esperada:"Am_penta",duracion:30,tolerance:15}]},{nombre:"Melodía simple: Cumpleaños Feliz",tipo:"exercise",objetivo:"Tocar melodía reconocible con notas",ejercicios:[{tipo:"nota",esperada:"G3",duracion:5,tolerance:20}]},{nombre:"Lectura de notas en papel",tipo:"theory",objetivo:"Entender el pentagrama básico",ejercicios:[]},{nombre:"Evaluación: Notas y escala Do",tipo:"exercise",objetivo:"Tocar escala completa sin errores",ejercicios:[{tipo:"escala",esperada:"C_major",duracion:40,tolerance:10}]}]},sub6:{nombre:"Lectura de Tablatura",lecciones:[{nombre:"Qué es una tablatura",tipo:"theory",objetivo:"Entender el sistema de tablatura",ejercicios:[]},{nombre:"Leer tabs: números y cuerdas",tipo:"theory",objetivo:"Interpretar números en tablaturas",ejercicios:[]},{nombre:"Tu primera tablatura: Smoke on the Water",tipo:"exercise",objetivo:"Tocar el riff básico",ejercicios:[{tipo:"nota",esperada:"G3",duracion:5,tolerance:20}]},{nombre:"Tabs con técnicas: h, p, b",tipo:"theory",objetivo:"Entender símbolos de técnicas",ejercicios:[]},{nombre:"Tablatura con rasgueo: Knockin on Heavens Door",tipo:"exercise",objetivo:"Combinar tabs y rasgueo",ejercicios:[{tipo:"rasgueo",esperada:"D",duracion:20,tolerance:20}]},{nombre:"Tabs con hammer-on y pull-off",tipo:"exercise",objetivo:"Ejecutar ligados desde tablatura",ejercicios:[{tipo:"nota",esperada:"A2",duracion:20,tolerance:20}]},{nombre:"Riff de 3 cuerdas",tipo:"exercise",objetivo:"Tocar riff que abarca 3 cuerdas",ejercicios:[{tipo:"nota",esperada:"D3",duracion:25,tolerance:15}]},{nombre:"Tabs con posición de cejilla",tipo:"theory",objetivo:"Leer tabs con indicación de cejilla",ejercicios:[]},{nombre:"Canción completa en tabs: Ode to Joy",tipo:"exercise",objetivo:"Completar melodía de 16 compases",ejercicios:[{tipo:"nota",esperada:"E4",duracion:5,tolerance:20}]},{nombre:"Evaluación: Tablatura fluida",tipo:"exercise",objetivo:"Leer y tocar tab sin pausas",ejercicios:[{tipo:"nota",esperada:"G3",duracion:60,tolerance:10}]}]},sub7:{nombre:"Ritmos Simples",lecciones:[{nombre:"El metrónomo: tu mejor amigo",tipo:"theory",objetivo:"Entender el uso del metrónomo",ejercicios:[]},{nombre:"Compás de 4/4: negras y corcheas",tipo:"exercise",objetivo:"Tocar en compás 4/4 con metrónomo",ejercicios:[{tipo:"rasgueo",esperada:"D",duracion:20,tolerance:20}]},{nombre:"Ritmo de cumbia básico",tipo:"exercise",objetivo:"Tocar patrón de cumbia",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:25,tolerance:20}]},{nombre:"Ritmo de rock básico",tipo:"exercise",objetivo:"Patrón de rock en 4/4",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:25,tolerance:20}]},{nombre:"Ritmo de balada",tipo:"exercise",objetivo:"Patrón lento y expresivo",ejercicios:[{tipo:"rasgueo",esperada:"DUU",duracion:20,tolerance:25}]},{nombre:"Síncopas básicas",tipo:"video",objetivo:"Entender y tocar síncopas simples",ejercicios:[]},{nombre:"Ritmo de pop argentino",tipo:"exercise",objetivo:"Patrón popular en música nacional",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:30,tolerance:20}]},{nombre:"Ritmo de reggae",tipo:"exercise",objetivo:"El característico offbeat del reggae",ejercicios:[{tipo:"rasgueo",esperada:"UU",duracion:25,tolerance:20}]},{nombre:"Cambio de ritmo: transiciones",tipo:"exercise",objetivo:"Pasar de un patrón a otro sin parar",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:35,tolerance:15}]},{nombre:"Evaluación: Ritmos variados",tipo:"exercise",objetivo:"Tocar 3 ritmos distintos con cambios",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:45,tolerance:15}]}]},sub8:{nombre:"Arpegios Básicos",lecciones:[{nombre:"Qué es un arpegio",tipo:"theory",objetivo:"Entender la diferencia entre arpegio y acorde",ejercicios:[]},{nombre:"Patrón PIMA en Do Mayor",tipo:"exercise",objetivo:"Arpegio básico sobre acorde C",ejercicios:[{tipo:"arpegio",esperada:"C_arpegio",duracion:20,tolerance:20}]},{nombre:"Arpegio en Sol Mayor",tipo:"exercise",objetivo:"PIMA sobre acorde G",ejercicios:[{tipo:"arpegio",esperada:"G_arpegio",duracion:20,tolerance:20}]},{nombre:"Patrón p-i-m-a-m-i",tipo:"exercise",objetivo:"Arpegio de 6 notas",ejercicios:[{tipo:"arpegio",esperada:"C_arpegio6",duracion:25,tolerance:20}]},{nombre:"Arpegio en La menor",tipo:"exercise",objetivo:"PIMA sobre Am",ejercicios:[{tipo:"arpegio",esperada:"Am_arpegio",duracion:20,tolerance:20}]},{nombre:"Arpegios con cambio de acorde C-G",tipo:"exercise",objetivo:"Mantener el patrón cambiando acordes",ejercicios:[{tipo:"arpegio",esperada:"C_arpegio",duracion:30,tolerance:15}]},{nombre:"Romance de Amor (intro)",tipo:"exercise",objetivo:"Tocar el arpegio clásico más famoso",ejercicios:[{tipo:"arpegio",esperada:"E_arpegio",duracion:30,tolerance:20}]},{nombre:"Dinámica en arpegios",tipo:"exercise",objetivo:"Tocar arpegios con variación de volumen",ejercicios:[{tipo:"arpegio",esperada:"Am_arpegio",duracion:25,tolerance:20}]},{nombre:"Arpegios en posición de cejilla",tipo:"exercise",objetivo:"Arpegio sobre Bm (cejilla traste 2)",ejercicios:[{tipo:"arpegio",esperada:"Bm_arpegio",duracion:25,tolerance:20}]},{nombre:"Evaluación: Arpegios fluidos",tipo:"exercise",objetivo:"PIMA con progresión Am-C-G-E",ejercicios:[{tipo:"arpegio",esperada:"Am_arpegio",duracion:50,tolerance:10}]}]},sub9:{nombre:"Canciones para Principiante",lecciones:[{nombre:"Knockin on Heaven's Door (básico)",tipo:"exercise",objetivo:"Progresión G-D-Am con rasgueo",ejercicios:[{tipo:"acorde",esperada:"G",duracion:8,tolerance:20},{tipo:"acorde",esperada:"D",duracion:8,tolerance:20}]},{nombre:"Wonderwall (intro)",tipo:"exercise",objetivo:"Acordes Em7-G-Dsus4-A7sus4",ejercicios:[{tipo:"acorde",esperada:"Em",duracion:8,tolerance:20}]},{nombre:"La Bamba (ritmo)",tipo:"exercise",objetivo:"Patrón rítmico latinoamericano C-F-G",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:25,tolerance:20}]},{nombre:"House of the Rising Sun",tipo:"exercise",objetivo:"Arpegio Am-C-D-F",ejercicios:[{tipo:"arpegio",esperada:"Am_arpegio",duracion:30,tolerance:20}]},{nombre:"Tears in Heaven (intro)",tipo:"exercise",objetivo:"Fingerpicking básico de Clapton",ejercicios:[{tipo:"arpegio",esperada:"A_arpegio",duracion:30,tolerance:20}]},{nombre:"Creep - Radiohead (acordes)",tipo:"exercise",objetivo:"Progresión G-B-C-Cm",ejercicios:[{tipo:"acorde",esperada:"G",duracion:8,tolerance:20}]},{nombre:"Stand by Me (ritmo)",tipo:"exercise",objetivo:"Groove de 12/8 simplificado",ejercicios:[{tipo:"rasgueo",esperada:"DUU",duracion:25,tolerance:20}]},{nombre:"El Condor Pasa (melodía)",tipo:"exercise",objetivo:"Melodía andina en notas sueltas",ejercicios:[{tipo:"nota",esperada:"D3",duracion:5,tolerance:20}]},{nombre:"Yesterday - Beatles",tipo:"exercise",objetivo:"Progresión clásica con cejilla",ejercicios:[{tipo:"acorde",esperada:"F",duracion:10,tolerance:20}]},{nombre:"Canción libre: tu favorita",tipo:"exercise",objetivo:"Aplicar lo aprendido en una canción propia",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:60,tolerance:20}]}]},sub10:{nombre:"Proyecto Final Principiante",lecciones:[{nombre:"Repaso: Acordes básicos",tipo:"exercise",objetivo:"Los 8 acordes básicos sin errores",ejercicios:[{tipo:"acorde",esperada:"C",duracion:10,tolerance:10},{tipo:"acorde",esperada:"G",duracion:10,tolerance:10}]},{nombre:"Repaso: Arpegios",tipo:"exercise",objetivo:"PIMA sobre C-Am-F-G",ejercicios:[{tipo:"arpegio",esperada:"C_arpegio",duracion:40,tolerance:10}]},{nombre:"Repaso: Rasgueos",tipo:"exercise",objetivo:"3 patrones distintos con cambios",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:40,tolerance:10}]},{nombre:"Evaluación de postura y técnica",tipo:"video",objetivo:"Video de auto-evaluación con checklist",ejercicios:[]},{nombre:"Teoría musical básica",tipo:"theory",objetivo:"Compás, figuras, escala mayor y menor",ejercicios:[]},{nombre:"Canción 1: Tocar completa",tipo:"exercise",objetivo:"Canción de libre elección sin pausas",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:120,tolerance:15}]},{nombre:"Canción 2: Con backing track",tipo:"exercise",objetivo:"Tocar a tiempo con pista de acompañamiento",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:120,tolerance:15}]},{nombre:"Improvisación libre: 2 minutos",tipo:"exercise",objetivo:"Improvisar sobre la pentatónica de Am",ejercicios:[{tipo:"escala",esperada:"Am_penta",duracion:120,tolerance:20}]},{nombre:"Grabación: Tu primera actuación",tipo:"exercise",objetivo:"Grabar 2 minutos de música",ejercicios:[{tipo:"nota",esperada:"E4",duracion:120,tolerance:20}]},{nombre:"¡Graduación Principiante!",tipo:"theory",objetivo:"Certificado de nivel Principiante completado",ejercicios:[]}]}},ZR={sub1:{nombre:"Rasgueo Avanzado",lecciones:[{nombre:"Rasgueo con acento dinámico",tipo:"exercise",objetivo:"Acentuar tiempos fuertes y débiles",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:25,tolerance:15}]},{nombre:"Patrón flamenco básico (golpe)",tipo:"exercise",objetivo:"Incorporar el golpe en el rasgueo",ejercicios:[{tipo:"rasgueo",esperada:"golpe",duracion:25,tolerance:20}]},{nombre:"Rasgueo de 16avos",tipo:"exercise",objetivo:"Velocidad y precisión en semicorcheas",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDUUDUU",duracion:30,tolerance:15}]},{nombre:"Muting selectivo de cuerdas",tipo:"exercise",objetivo:"Apagar cuerdas mientras rasgueas",ejercicios:[{tipo:"rasgueo",esperada:"muted",duracion:25,tolerance:15}]},{nombre:"Fingerstyle rasgueo mixto",tipo:"exercise",objetivo:"Combinar rasgueo y fingerpicking",ejercicios:[{tipo:"rasgueo",esperada:"mixed",duracion:30,tolerance:20}]},{nombre:"Patrón de bossa nova",tipo:"exercise",objetivo:"El ritmo característico de la bossa nova",ejercicios:[{tipo:"rasgueo",esperada:"bossa",duracion:30,tolerance:15}]},{nombre:"Swing y shuffle",tipo:"exercise",objetivo:"Tocar con feel de swing",ejercicios:[{tipo:"rasgueo",esperada:"swing",duracion:30,tolerance:20}]},{nombre:"Polirritmo 2 contra 3",tipo:"theory",objetivo:"Entender polirritmos básicos",ejercicios:[]},{nombre:"Rasgueo a 120 BPM sostenido",tipo:"exercise",objetivo:"Mantener tempo durante 2 minutos",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:120,tolerance:10}]},{nombre:"Evaluación: Rasgueos avanzados",tipo:"exercise",objetivo:"4 patrones distintos sin parar",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:60,tolerance:10}]}]},sub2:{nombre:"Arpegios Intermedios",lecciones:[{nombre:"Arpegio de 6 cuerdas completo",tipo:"exercise",objetivo:"PIMAMI sobre acordes completos",ejercicios:[{tipo:"arpegio",esperada:"E_arpegio6",duracion:25,tolerance:15}]},{nombre:"Arpegio rodante (rolling)",tipo:"exercise",objetivo:"Técnica de arpegio continuo",ejercicios:[{tipo:"arpegio",esperada:"rolling",duracion:25,tolerance:15}]},{nombre:"Trémolo básico",tipo:"exercise",objetivo:"Técnica de trémolo p-a-m-i",ejercicios:[{tipo:"arpegio",esperada:"tremolo",duracion:30,tolerance:20}]},{nombre:"Recuerdos de la Alhambra (intro)",tipo:"exercise",objetivo:"El trémolo más famoso de la guitarra",ejercicios:[{tipo:"arpegio",esperada:"tremolo",duracion:45,tolerance:20}]},{nombre:"Arpegios con bajo en movimiento",tipo:"exercise",objetivo:"Notas de bajo alternadas en arpegio",ejercicios:[{tipo:"arpegio",esperada:"moving_bass",duracion:30,tolerance:15}]},{nombre:"Patrón de Malagueña",tipo:"exercise",objetivo:"Arpegio flamenco básico",ejercicios:[{tipo:"arpegio",esperada:"malaguena",duracion:35,tolerance:15}]},{nombre:"Arpegios en velocidad: 80-100 BPM",tipo:"exercise",objetivo:"Arpegios rápidos y limpios",ejercicios:[{tipo:"arpegio",esperada:"C_arpegio",duracion:60,tolerance:10}]},{nombre:"Técnica Rasgueado español",tipo:"exercise",objetivo:"Rasgueado con todos los dedos",ejercicios:[{tipo:"arpegio",esperada:"rasgueado",duracion:30,tolerance:20}]},{nombre:"Arpegios con adornos (mordentes)",tipo:"exercise",objetivo:"Añadir ornamentos a los arpegios",ejercicios:[{tipo:"arpegio",esperada:"ornamentos",duracion:30,tolerance:15}]},{nombre:"Evaluación: Suite de arpegios",tipo:"exercise",objetivo:"Pieza de 3 minutos con múltiples técnicas",ejercicios:[{tipo:"arpegio",esperada:"Am_arpegio",duracion:180,tolerance:10}]}]},sub3:{nombre:"Guitarra Flamenca Básica",lecciones:[{nombre:"Historia y estructura del flamenco",tipo:"theory",objetivo:"Entender los palos flamencos",ejercicios:[]},{nombre:"El compás de Soleá (12 tiempos)",tipo:"exercise",objetivo:"Dominar el compás más importante",ejercicios:[{tipo:"rasgueo",esperada:"solea",duracion:30,tolerance:20}]},{nombre:"Rumba flamenca básica",tipo:"exercise",objetivo:"Patrón de rumba catalana",ejercicios:[{tipo:"rasgueo",esperada:"rumba",duracion:30,tolerance:15}]},{nombre:"Picado básico",tipo:"exercise",objetivo:"Técnica de picado i-m alternado",ejercicios:[{tipo:"nota",esperada:"E4",duracion:30,tolerance:15}]},{nombre:"Alzapúa básica",tipo:"exercise",objetivo:"Técnica del pulgar en alzapúa",ejercicios:[{tipo:"arpegio",esperada:"alzapua",duracion:30,tolerance:20}]},{nombre:"Bulerías: compás de 12",tipo:"exercise",objetivo:"El palo más rápido del flamenco",ejercicios:[{tipo:"rasgueo",esperada:"bulerias",duracion:30,tolerance:20}]},{nombre:"Tangos flamencos",tipo:"exercise",objetivo:"Patrón de tangos en compás de 4",ejercicios:[{tipo:"rasgueo",esperada:"tangos",duracion:30,tolerance:20}]},{nombre:"Falseta básica de Soleá",tipo:"exercise",objetivo:"Tu primera falseta completa",ejercicios:[{tipo:"nota",esperada:"A2",duracion:45,tolerance:15}]},{nombre:"Posición flamenca de la mano",tipo:"video",objetivo:"Anatomía de la mano en flamenco",ejercicios:[]},{nombre:"Evaluación: Mini-actuación flamenca",tipo:"exercise",objetivo:"Tocar Soleá o Rumba completa",ejercicios:[{tipo:"rasgueo",esperada:"solea",duracion:120,tolerance:10}]}]},sub4:{nombre:"Técnicas de Mano Derecha",lecciones:[{nombre:"Travis picking básico",tipo:"exercise",objetivo:"El patrón de Merle Travis",ejercicios:[{tipo:"arpegio",esperada:"travis",duracion:30,tolerance:15}]},{nombre:"Chet Atkins style",tipo:"exercise",objetivo:"Country fingerpicking avanzado",ejercicios:[{tipo:"arpegio",esperada:"chet",duracion:30,tolerance:15}]},{nombre:"Percusión en la guitarra",tipo:"video",objetivo:"Slap y golpes percusivos",ejercicios:[]},{nombre:"Armónico natural",tipo:"exercise",objetivo:"Producir armónicos en trastes 5, 7, 12",ejercicios:[{tipo:"nota",esperada:"E5",duracion:20,tolerance:25}]},{nombre:"Armónico artificial",tipo:"exercise",objetivo:"Armónicos con técnica de la mano derecha",ejercicios:[{tipo:"nota",esperada:"E5",duracion:25,tolerance:25}]},{nombre:"Whammy bar básico",tipo:"theory",objetivo:"Uso del vibrato con palanca",ejercicios:[]},{nombre:"Palm muting",tipo:"exercise",objetivo:"Apagado con palma en cuerdas agudas",ejercicios:[{tipo:"rasgueo",esperada:"palm_mute",duracion:25,tolerance:15}]},{nombre:"Hybrid picking",tipo:"exercise",objetivo:"Combinar púa y dedos",ejercicios:[{tipo:"arpegio",esperada:"hybrid",duracion:30,tolerance:20}]},{nombre:"Chicken picking",tipo:"exercise",objetivo:"Técnica country de snap",ejercicios:[{tipo:"arpegio",esperada:"chicken",duracion:30,tolerance:20}]},{nombre:"Evaluación: Técnicas diversas",tipo:"exercise",objetivo:"Demostrar 4 técnicas distintas",ejercicios:[{tipo:"arpegio",esperada:"travis",duracion:60,tolerance:10}]}]},sub5:{nombre:"Tapping",lecciones:[{nombre:"Introducción al tapping",tipo:"video",objetivo:"Entender la técnica de Eddie Van Halen",ejercicios:[]},{nombre:"Tapping de 1 dedo (básico)",tipo:"exercise",objetivo:"Tap simple con dedo índice derecho",ejercicios:[{tipo:"nota",esperada:"E4",duracion:20,tolerance:20}]},{nombre:"Lick de tapping: T-8-5",tipo:"exercise",objetivo:"Primer lick de tapping real",ejercicios:[{tipo:"nota",esperada:"D4",duracion:25,tolerance:20}]},{nombre:"Tapping en escala pentatónica",tipo:"exercise",objetivo:"Aplicar tapping en pentatónica de Am",ejercicios:[{tipo:"escala",esperada:"Am_penta",duracion:30,tolerance:15}]},{nombre:"Tapping de 2 manos",tipo:"exercise",objetivo:"Tapping con ambas manos simultáneo",ejercicios:[{tipo:"nota",esperada:"A3",duracion:30,tolerance:20}]},{nombre:"Tapping en 2 cuerdas",tipo:"exercise",objetivo:"Extender el tapping a múltiples cuerdas",ejercicios:[{tipo:"nota",esperada:"E4",duracion:35,tolerance:15}]},{nombre:"Sweep tapping",tipo:"exercise",objetivo:"Combinar sweep picking y tapping",ejercicios:[{tipo:"nota",esperada:"C4",duracion:35,tolerance:20}]},{nombre:"Tapping con legato",tipo:"exercise",objetivo:"Fluidez máxima en tapping",ejercicios:[{tipo:"nota",esperada:"G3",duracion:40,tolerance:15}]},{nombre:"Solo de tapping: Eruption (simplificado)",tipo:"exercise",objetivo:"Tocar sección básica del solo icónico",ejercicios:[{tipo:"nota",esperada:"E4",duracion:60,tolerance:15}]},{nombre:"Evaluación: Tapping técnico",tipo:"exercise",objetivo:"Demostrar tapping limpio a 100 BPM",ejercicios:[{tipo:"nota",esperada:"E4",duracion:60,tolerance:10}]}]},sub6:{nombre:"Bending y Vibrato",lecciones:[{nombre:"Técnica de bending: medio tono",tipo:"exercise",objetivo:"Doblar la cuerda medio tono arriba",ejercicios:[{tipo:"nota",esperada:"G#3",duracion:20,tolerance:15}]},{nombre:"Bending de tono completo",tipo:"exercise",objetivo:"Doblar un tono completo con afinación",ejercicios:[{tipo:"nota",esperada:"A3",duracion:20,tolerance:15}]},{nombre:"Pre-bending (ghost bend)",tipo:"exercise",objetivo:"Doblar antes de pulsar la cuerda",ejercicios:[{tipo:"nota",esperada:"B3",duracion:20,tolerance:20}]},{nombre:"Unison bend",tipo:"exercise",objetivo:"Doblar hasta igualar la nota de otra cuerda",ejercicios:[{tipo:"nota",esperada:"B3",duracion:25,tolerance:10}]},{nombre:"Vibrato clásico de guitarra",tipo:"exercise",objetivo:"Vibrato de muñeca expresivo",ejercicios:[{tipo:"nota",esperada:"E4",duracion:20,tolerance:25}]},{nombre:"Vibrato ancho y estrecho",tipo:"exercise",objetivo:"Controlar la velocidad del vibrato",ejercicios:[{tipo:"nota",esperada:"G3",duracion:20,tolerance:25}]},{nombre:"Slide básico (glissando)",tipo:"exercise",objetivo:"Técnica de slide entre notas",ejercicios:[{tipo:"nota",esperada:"A2",duracion:20,tolerance:20}]},{nombre:"Slide con bottleneck",tipo:"video",objetivo:"Introducción al slide guitar",ejercicios:[]},{nombre:"Lick de blues con bending",tipo:"exercise",objetivo:"Frase de blues expresiva",ejercicios:[{tipo:"nota",esperada:"G3",duracion:40,tolerance:15}]},{nombre:"Evaluación: Expresividad",tipo:"exercise",objetivo:"Solo de 30 segundos con bending y vibrato",ejercicios:[{tipo:"nota",esperada:"E4",duracion:30,tolerance:10}]}]},sub7:{nombre:"Canciones Intermedias",lecciones:[{nombre:"Hotel California (arpegios)",tipo:"exercise",objetivo:"Fingerpicking del intro clásico",ejercicios:[{tipo:"arpegio",esperada:"Bm_arpegio",duracion:45,tolerance:15}]},{nombre:"Sultans of Swing (riffs)",tipo:"exercise",objetivo:"Los riffs principales de Knopfler",ejercicios:[{tipo:"nota",esperada:"D3",duracion:40,tolerance:15}]},{nombre:"Stairway to Heaven (intro)",tipo:"exercise",objetivo:"El intro de fingerpicking más famoso",ejercicios:[{tipo:"arpegio",esperada:"Am_arpegio",duracion:60,tolerance:15}]},{nombre:"Nothing Else Matters (arpegios)",tipo:"exercise",objetivo:"Arpegios de Metallica",ejercicios:[{tipo:"arpegio",esperada:"Em_arpegio",duracion:60,tolerance:15}]},{nombre:"Black Bird - Beatles",tipo:"exercise",objetivo:"Fingerpicking y melodía simultánea",ejercicios:[{tipo:"arpegio",esperada:"G_arpegio",duracion:60,tolerance:15}]},{nombre:"Wish You Were Here",tipo:"exercise",objetivo:"Intro de fingerpicking de Floyd",ejercicios:[{tipo:"arpegio",esperada:"G_arpegio",duracion:60,tolerance:15}]},{nombre:"La Cumparsita (versión guitarra)",tipo:"exercise",objetivo:"Tango clásico adaptado para guitarra",ejercicios:[{tipo:"nota",esperada:"D3",duracion:60,tolerance:15}]},{nombre:"Classical Gas (fragmento)",tipo:"exercise",objetivo:"El clásico de Mason Williams",ejercicios:[{tipo:"arpegio",esperada:"Am_arpegio",duracion:60,tolerance:15}]},{nombre:"Claro de Luna (intro)",tipo:"exercise",objetivo:"Adaptar Beethoven a la guitarra",ejercicios:[{tipo:"arpegio",esperada:"C#m_arpegio",duracion:60,tolerance:15}]},{nombre:"Evaluación: Canción completa",tipo:"exercise",objetivo:"Una canción intermedia de principio a fin",ejercicios:[{tipo:"arpegio",esperada:"Am_arpegio",duracion:180,tolerance:10}]}]},sub8:{nombre:"Improvisación",lecciones:[{nombre:"La escala pentatónica mayor",tipo:"exercise",objetivo:"Pentatónica mayor en posición 1",ejercicios:[{tipo:"escala",esperada:"G_penta",duracion:30,tolerance:15}]},{nombre:"5 posiciones de la pentatónica",tipo:"exercise",objetivo:"Conectar las 5 posiciones en el mástil",ejercicios:[{tipo:"escala",esperada:"Am_penta",duracion:40,tolerance:15}]},{nombre:"La escala de blues",tipo:"exercise",objetivo:"Pentatónica + blue note",ejercicios:[{tipo:"escala",esperada:"blues_scale",duracion:30,tolerance:15}]},{nombre:"Modos griegos: Dorico y Frigio",tipo:"theory",objetivo:"Introducción a los modos",ejercicios:[]},{nombre:"Improvisación sobre backing track blues",tipo:"exercise",objetivo:"Improvisar 2 min sobre blues en A",ejercicios:[{tipo:"escala",esperada:"Am_penta",duracion:120,tolerance:20}]},{nombre:"Frases y licks básicos",tipo:"exercise",objetivo:"5 licks de guitarra icónicos",ejercicios:[{tipo:"nota",esperada:"G3",duracion:40,tolerance:15}]},{nombre:"Llamada y respuesta",tipo:"exercise",objetivo:"Diálogo musical básico",ejercicios:[{tipo:"nota",esperada:"E4",duracion:30,tolerance:20}]},{nombre:"Pentatónica sobre acordes mayores",tipo:"exercise",objetivo:"Adaptar la escala a diferentes acordes",ejercicios:[{tipo:"escala",esperada:"G_penta",duracion:60,tolerance:15}]},{nombre:"Vocabulario de blues: 10 licks",tipo:"exercise",objetivo:"Aprender frases listas para improvisar",ejercicios:[{tipo:"nota",esperada:"A2",duracion:60,tolerance:15}]},{nombre:"Evaluación: Solo de 1 minuto",tipo:"exercise",objetivo:"Solo espontáneo con estructura",ejercicios:[{tipo:"escala",esperada:"Am_penta",duracion:60,tolerance:10}]}]},sub9:{nombre:"Proyecto Intermedio A",lecciones:[{nombre:"Análisis de canción: Hotel California",tipo:"theory",objetivo:"Entender la estructura de una canción",ejercicios:[]},{nombre:"Transcripción básica",tipo:"exercise",objetivo:"Identificar acordes de oído",ejercicios:[{tipo:"acorde",esperada:"G",duracion:15,tolerance:15}]},{nombre:"Arranjo para guitarra sola",tipo:"exercise",objetivo:"Adaptar una canción para guitarra sola",ejercicios:[{tipo:"arpegio",esperada:"C_arpegio",duracion:60,tolerance:15}]},{nombre:"Práctica con metrónomo: 100 BPM",tipo:"exercise",objetivo:"Tocar canción exactamente a 100 BPM",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:120,tolerance:10}]},{nombre:"Grabación con backing track",tipo:"exercise",objetivo:"Primera grabación de calidad",ejercicios:[{tipo:"nota",esperada:"E4",duracion:120,tolerance:15}]},{nombre:"Análisis de tu grabación",tipo:"theory",objetivo:"Auto-evaluación objetiva",ejercicios:[]},{nombre:"Mejorar puntos débiles detectados",tipo:"exercise",objetivo:"Ejercicio personalizado de corrección",ejercicios:[{tipo:"nota",esperada:"A2",duracion:60,tolerance:15}]},{nombre:"Re-grabación mejorada",tipo:"exercise",objetivo:"Grabación con mejoras aplicadas",ejercicios:[{tipo:"nota",esperada:"E4",duracion:120,tolerance:10}]},{nombre:"Preparar repertorio de 2 canciones",tipo:"exercise",objetivo:"Dominar 2 canciones de memoria",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:180,tolerance:10}]},{nombre:"Evaluación final intermedio A",tipo:"exercise",objetivo:"Actuación de las 2 canciones",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:240,tolerance:10}]}]},sub10:{nombre:"Proyecto Intermedio B",lecciones:[{nombre:"Composición: progresiones de acordes",tipo:"theory",objetivo:"Entender cómo crear progresiones",ejercicios:[]},{nombre:"Tu primer riff original",tipo:"exercise",objetivo:"Componer un riff de 4 compases",ejercicios:[{tipo:"nota",esperada:"G3",duracion:60,tolerance:20}]},{nombre:"Estructura canción: verso-estribillo",tipo:"theory",objetivo:"Aprender formas musicales",ejercicios:[]},{nombre:"Componer una progresión de 8 compases",tipo:"exercise",objetivo:"Tu propia progresión con 4 acordes",ejercicios:[{tipo:"acorde",esperada:"C",duracion:8,tolerance:15}]},{nombre:"Añadir melodía a la progresión",tipo:"exercise",objetivo:"Crear melodía sobre tu progresión",ejercicios:[{tipo:"nota",esperada:"E4",duracion:60,tolerance:15}]},{nombre:"Dinámica y expresión",tipo:"exercise",objetivo:"Añadir crescendo y decrescendo",ejercicios:[{tipo:"nota",esperada:"E4",duracion:40,tolerance:20}]},{nombre:"Arreglo: intro-verso-coro-outro",tipo:"exercise",objetivo:"Estructura completa de canción",ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:120,tolerance:15}]},{nombre:"Grabación de tu canción original",tipo:"exercise",objetivo:"Registrar tu primera composición",ejercicios:[{tipo:"nota",esperada:"E4",duracion:180,tolerance:15}]},{nombre:"Revisión y feedback IA",tipo:"exercise",objetivo:"Análisis automático de la grabación",ejercicios:[{tipo:"nota",esperada:"E4",duracion:60,tolerance:15}]},{nombre:"¡Graduación Intermedio!",tipo:"theory",objetivo:"Certificado de nivel Intermedio completado",ejercicios:[]}]}},eS={sub1:{nombre:"Flamenco Completo",lecciones:[{nombre:"Palos flamencos: los 12 esenciales",tipo:"theory",objetivo:"Dominar la teoría de todos los palos"},{nombre:"Soleares completas",tipo:"exercise",objetivo:"Tocar soleá completa con falsetas"},{nombre:"Bulerías virtuosismo",tipo:"exercise",objetivo:"Bulerías a tempo completo (160+ BPM)"},{nombre:"Siguiriyas",tipo:"exercise",objetivo:"El palo más expresivo del flamenco"},{nombre:"Alegrías completas",tipo:"exercise",objetivo:"Alegrías con compás de 12 tiempos"},{nombre:"Fandangos",tipo:"exercise",objetivo:"Fandangos con falsetas y escobilla"},{nombre:"Farruca",tipo:"exercise",objetivo:"Farruca clásica con palmas"},{nombre:"Zambra mora",tipo:"exercise",objetivo:"Palo de origen árabe-andaluz"},{nombre:"Granaina y Media Granaina",tipo:"exercise",objetivo:"Palos libres de Granada"},{nombre:"Evaluación: Actuación flamenca completa",tipo:"exercise",objetivo:"Recital de 10 minutos en palos distintos"}].map(r=>({...r,ejercicios:[{tipo:"rasgueo",esperada:"solea",duracion:60,tolerance:10}]}))},sub2:{nombre:"Virtuosismo",lecciones:[{nombre:"Velocidad: escalas a 200 BPM"},{nombre:"Sweep picking avanzado: arpegios de 6 cuerdas"},{nombre:"Economy picking"},{nombre:"String skipping técnico"},{nombre:"Legato extenso: 4 octavas"},{nombre:"Tapping de 4 dedos"},{nombre:"Polirritmos: 3 contra 4"},{nombre:"Cambios de posición a alta velocidad"},{nombre:"Control de dinámica extrema"},{nombre:"Evaluación: Ejercicio técnico a 160 BPM"}].map(r=>({nombre:r.nombre||r,tipo:"exercise",objetivo:r.nombre||r,ejercicios:[{tipo:"nota",esperada:"E4",duracion:60,tolerance:5}]}))},sub3:{nombre:"Composición",lecciones:[{nombre:"Teoría armónica avanzada"},{nombre:"Modulación y cambios de tonalidad"},{nombre:"Contrapunto básico"},{nombre:"Acordes extendidos: 9ª, 11ª, 13ª"},{nombre:"Progresiones modales"},{nombre:"Composición en modo dórico"},{nombre:"Forma sonata simplificada"},{nombre:"Arreglo para ensamble de guitarras"},{nombre:"Notation: escritura en pentagrama"},{nombre:"Evaluación: Composición de 4 minutos"}].map(r=>({nombre:r.nombre||r,tipo:"theory",objetivo:r.nombre||r,ejercicios:[]}))},sub4:{nombre:"Estilos Mundiales",lecciones:[{nombre:"Jazz: acordes de jazz ii-V-I"},{nombre:"Blues: 12 compases avanzado"},{nombre:"Bossa nova: técnica de João Gilberto"},{nombre:"Celtic guitar: DADGAD tuning"},{nombre:"Fingerstyle country avanzado"},{nombre:"Tango: escuela de Piazzolla"},{nombre:"Música andina: charango adaptado"},{nombre:"Rock progresivo: métricas impares"},{nombre:"Metal: palm muting y riffs técnicos"},{nombre:"Evaluación: Medley de estilos"}].map(r=>({nombre:r.nombre||r,tipo:"exercise",objetivo:r.nombre||r,ejercicios:[{tipo:"nota",esperada:"E4",duracion:60,tolerance:10}]}))},sub5:{nombre:"Jazz en Guitarra",lecciones:[{nombre:"Acordes de jazz: maj7, min7, dom7"},{nombre:"Voicings de jazz en cuerdas altas"},{nombre:"Progresión ii-V-I en todas las tonalidades"},{nombre:"Escala mixolidia"},{nombre:"Escala altered"},{nombre:"Improvisación bebop"},{nombre:"Walking bass en guitarra"},{nombre:"Chord melody básico"},{nombre:"Standard jazz: Autumn Leaves"},{nombre:"Evaluación: Jazz standard completo"}].map(r=>({nombre:r.nombre||r,tipo:"exercise",objetivo:r.nombre||r,ejercicios:[{tipo:"acorde",esperada:"Cmaj7",duracion:30,tolerance:15}]}))},sub6:{nombre:"Teoría Musical Avanzada",lecciones:[{nombre:"Los 7 modos de la escala mayor"},{nombre:"Escalas simétricas: disminuida y aumentada"},{nombre:"Armonía funcional y no funcional"},{nombre:"Reharmonización de standards"},{nombre:"Cromatismo en guitarra"},{nombre:"Análisis: Bach en guitarra"},{nombre:"Politonalidad y atonalismo"},{nombre:"Ritmo: métricas aditivas"},{nombre:"Microtonalismo básico"},{nombre:"Evaluación: Análisis de partitura"}].map(r=>({nombre:r.nombre||r,tipo:"theory",objetivo:r.nombre||r,ejercicios:[]}))},sub7:{nombre:"Grabación en Estudio",lecciones:[{nombre:"Principios de grabación de guitarra"},{nombre:"Microfonía: SM57 y posición"},{nombre:"DI Box: señal limpia"},{nombre:"Plugins de guitarra: Ampli simulado"},{nombre:"Edición de audio básica"},{nombre:"Mezcla: EQ y compresión en guitarra"},{nombre:"Doble tracking (double track)"},{nombre:"Masterización para streaming"},{nombre:"Preparar demo profesional"},{nombre:"Evaluación: Track listo para subir"}].map(r=>({nombre:r.nombre||r,tipo:"theory",objetivo:r.nombre||r,ejercicios:[]}))},sub8:{nombre:"Performance en Vivo",lecciones:[{nombre:"Preparación mental: gestión del nerviosismo"},{nombre:"Setlist y estructura del show"},{nombre:"Configuración de pedalera"},{nombre:"Sonido en vivo: monitor y PA"},{nombre:"Interacción con el público"},{nombre:"Errores en vivo: cómo recuperarse"},{nombre:"Memoria de concierto: tocar sin partitura"},{nombre:"Ensayo general con grabación"},{nombre:"Primera actuación pública simulada"},{nombre:"Evaluación: Actuación de 20 minutos"}].map(r=>({nombre:r.nombre||r,tipo:"exercise",objetivo:r.nombre||r,ejercicios:[{tipo:"rasgueo",esperada:"DDUUDU",duracion:120,tolerance:5}]}))},sub9:{nombre:"Proyectos Artísticos",lecciones:[{nombre:"Componer EP de 4 canciones"},{nombre:"Canción 1: Composición y arreglo"},{nombre:"Canción 2: Grabación"},{nombre:"Canción 3: Mezcla"},{nombre:"Canción 4: Mastering"},{nombre:"Diseño de portada con IA"},{nombre:"Distribución digital: Distrokid/TuneCore"},{nombre:"Estrategia en redes: content para guitarra"},{nombre:"Lanzamiento: playlist pitch"},{nombre:"Evaluación: EP publicado"}].map(r=>({nombre:r.nombre||r,tipo:"theory",objetivo:r.nombre||r,ejercicios:[]}))},sub10:{nombre:"Maestría Total",lecciones:[{nombre:"Audición y análisis crítico avanzado"},{nombre:"Técnicas de enseñanza para el futuro maestro"},{nombre:"Transcripción avanzada: oído absoluto"},{nombre:"Improvisación libre (avant-garde)"},{nombre:"Proyecto final: concierto completo de 30 min"},{nombre:"Auto-producción de videoclip"},{nombre:"Plan de carrera musical"},{nombre:"Portafolio artístico completo"},{nombre:"Mentoría: enseña a un principiante"},{nombre:"¡Graduación Maestro! — Certificado Avanzado"}].map(r=>({nombre:r.nombre||r,tipo:"theory",objetivo:r.nombre||r,ejercicios:[]}))}};function tS(){const r={},e=[{key:"principiante",abbr:"prin",data:XR,planMinimo:"free"},{key:"intermedio",abbr:"inter",data:ZR,planMinimo:"lite"},{key:"avanzado",abbr:"av",data:eS,planMinimo:"maestro"}];for(const{key:t,abbr:n,data:i,planMinimo:s}of e)for(let o=1;o<=10;o++){const c=`sub${o}`,l=i[c];if(l)for(let u=1;u<=10;u++){const p=l.lecciones[u-1]||{},f=`${n}_sub${o}_lec${u}`,g=u>1?`${n}_sub${o}_lec${u-1}`:o>1?`${n}_sub${o-1}_lec10`:null;r[f]={id:f,nivel:t,subnivel:o,leccion:u,nombre:p.nombre||`${l.nombre} — Lección ${u}`,tipo:p.tipo||"exercise",duracion:p.duracion||5,objetivo:p.objetivo||`Objetivo de la lección ${u}`,descripcion:p.descripcion||null,ejercicios:p.ejercicios||[],quiz:p.quiz||null,requiereMinimoAccuracy:70,prerequisito:g,planMinimo:s,videoUrl:null}}}return r}const Be=tS(),Nn=Object.keys(Be);class nS{constructor(){this._audioCtx=null,this._currentLesson=null,this._sessionXP=0,this._pitchListener=null}render(e){this._currentLesson=e,this._sessionXP=0,this._removePitchListener(),e.tipo==="theory"||e.ejercicios?.length===0?e.quiz?.length>0?this._renderTheoryWithQuiz(e):this._renderTheory(e):this._renderExercise(e)}_renderTheoryWithQuiz(e){const t=document.getElementById("main-content"),n=e.descripcion?this._parseMarkdown(e.descripcion):"";t.innerHTML=`
      <div class="lesson-page">
        <div class="lesson-page-header">
          <a class="btn-back" href="#/lessons/${e.nivel}/${e.subnivel}">← Sub-nivel ${e.subnivel}</a>
          <span class="nivel-badge nivel-${e.nivel}">${e.nivel.toUpperCase()}</span>
        </div>

        <div class="lesson-card">
          <div class="lesson-card-meta">
            <span class="tipo-badge tipo-theory">📖 Teoría + Quiz</span>
            <span class="lesson-duration">⏱ ${e.duracion} min</span>
          </div>
          <h1 class="lesson-card-title">${e.nombre}</h1>
          <p class="lesson-card-objetivo">${e.objetivo}</p>
        </div>

        ${n?`<div class="lesson-content">${n}</div>`:""}

        <div class="quiz-section" id="quiz-section">
          <div class="quiz-header">
            <h3>🧠 Quiz — demostrá lo que aprendiste</h3>
            <span class="quiz-progress" id="quiz-progress">Pregunta 1 de ${e.quiz.length}</span>
          </div>
          <div id="quiz-body"></div>
        </div>
      </div>
    `,this._runQuiz(e.quiz)}_runQuiz(e){let t=0,n=0;const i=()=>{const s=e[t],o=document.getElementById("quiz-body"),c=document.getElementById("quiz-progress");o&&(c.textContent=`Pregunta ${t+1} de ${e.length}`,o.innerHTML=`
        <div class="quiz-question">
          <p class="quiz-q-text">${s.pregunta}</p>
          <div class="quiz-options">
            ${s.opciones.map((l,u)=>`
              <button class="quiz-option" data-index="${u}">${l}</button>
            `).join("")}
          </div>
          <div id="quiz-feedback" class="quiz-feedback hidden"></div>
        </div>
      `,o.querySelectorAll(".quiz-option").forEach(l=>{l.addEventListener("click",()=>{const u=parseInt(l.dataset.index),p=u===s.correcta,f=document.getElementById("quiz-feedback");o.querySelectorAll(".quiz-option").forEach((g,I)=>{g.disabled=!0,I===s.correcta?g.classList.add("correct"):I===u&&!p&&g.classList.add("wrong")}),p?(n++,f.textContent="✅ ¡Correcto!",f.className="quiz-feedback correct"):(f.textContent=`❌ Incorrecto. La respuesta era: "${s.opciones[s.correcta]}"`,f.className="quiz-feedback wrong"),f.classList.remove("hidden"),setTimeout(()=>{t++,t<e.length?i():this._showQuizResult(n,e.length)},1500),this.playSound(p?"success":"error")})}))};i()}_showQuizResult(e,t){const n=Math.round(e/t*100),i=n>=60,s=document.getElementById("quiz-body"),o=document.getElementById("quiz-progress");s&&(o.textContent=`Resultado: ${e}/${t}`,s.innerHTML=`
      <div class="quiz-result">
        <div class="quiz-result-icon">${i?"🏆":"💪"}</div>
        <h3>${i?"¡Aprobado!":"Casi — repasá el contenido"}</h3>
        <p class="quiz-score">${e} de ${t} respuestas correctas (${n}%)</p>
        ${i?'<button class="btn-primary btn-quiz-done" id="btn-quiz-done">✅ Completar lección</button>':`<button class="btn-secondary btn-retry-quiz" id="btn-retry-quiz">🔄 Reintentar quiz</button>
             <a class="btn-link" href="#" id="btn-reread">↑ Releer el contenido</a>`}
      </div>
    `,document.getElementById("btn-quiz-done")?.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("exercise:complete",{detail:{accuracy:n}})),this.completeExercise(n,Math.round(n*10))}),document.getElementById("btn-retry-quiz")?.addEventListener("click",()=>{this._runQuiz(this._currentLesson.quiz)}),document.getElementById("btn-reread")?.addEventListener("click",c=>{c.preventDefault(),document.querySelector(".lesson-content")?.scrollIntoView({behavior:"smooth"})}))}_renderTheory(e){const t=document.getElementById("main-content"),n=e.descripcion?this._parseMarkdown(e.descripcion):`<p>${e.objetivo}</p>`;t.innerHTML=`
      <div class="lesson-page">
        <div class="lesson-page-header">
          <a class="btn-back" href="#/lessons/${e.nivel}/${e.subnivel}">← Sub-nivel ${e.subnivel}</a>
          <span class="nivel-badge nivel-${e.nivel}">${e.nivel.toUpperCase()}</span>
        </div>

        <div class="lesson-card">
          <div class="lesson-card-meta">
            <span class="tipo-badge tipo-theory">📖 Teoría</span>
            <span class="lesson-duration">⏱ ${e.duracion} min</span>
          </div>
          <h1 class="lesson-card-title">${e.nombre}</h1>
          <p class="lesson-card-objetivo">${e.objetivo}</p>
        </div>

        <div class="lesson-content">${n}</div>

        <div class="theory-actions">
          <button class="btn-primary btn-complete-theory" id="btn-complete">
            ✅ Lo entendí — Marcar como completado
          </button>
        </div>
      </div>
    `,document.getElementById("btn-complete").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("exercise:complete",{detail:{accuracy:100}})),this.completeExercise(100,100)})}_renderExercise(e){const t=document.getElementById("main-content"),i=e.ejercicios?.[0]?.esperada||"",s=new YR,o=i&&t_[i],c=!!e.descripcion,l=`
      <div class="lesson-page-header">
        <a class="btn-back" href="#/lessons/${e.nivel}/${e.subnivel}">← Sub-nivel ${e.subnivel}</a>
        <span class="nivel-badge nivel-${e.nivel}">${e.nivel.toUpperCase()}</span>
      </div>
      <div class="lesson-card">
        <div class="lesson-card-meta">
          <span class="tipo-badge tipo-exercise">🎸 Teórico-Práctico</span>
          <span class="lesson-duration">⏱ ${e.duracion} min</span>
        </div>
        <h1 class="lesson-card-title">${e.nombre}</h1>
        <p class="lesson-card-objetivo">${e.objetivo}</p>
      </div>
    `;t.innerHTML=`
      <div class="lesson-page">
        ${l}

        <!-- Fase 0: Teoría -->
        <div id="phase-0" class="${c?"":"hidden"}">
          <div class="lesson-content tp-theory-block">
            ${c?this._parseMarkdown(e.descripcion):""}
          </div>
          <div class="tp-phase-actions">
            <div class="tp-phase-label">📖 Paso 1 de 3 — Leé la teoría</div>
            <button class="btn-primary" id="btn-to-position">📍 Entendí, ver posición →</button>
          </div>
        </div>

        <!-- Fase 1: Posición en el mástil -->
        <div id="phase-1" class="${c?"hidden":""}">
          <div class="fretboard-section">
            <h3 class="fretboard-title">📍 Posición en el mástil</h3>
            <p class="fretboard-nota-label">Nota: <strong>${i||"—"}</strong></p>
            <div id="fretboard-container"></div>
            ${o?"":`<p class="fretboard-no-pos">Diagrama no disponible para ${i}</p>`}
          </div>
          <div class="tp-phase-actions">
            <div class="tp-phase-label">🎯 Paso 2 de 3 — Mirá dónde poner el dedo</div>
            <button class="btn-primary btn-ready" id="btn-ready">🎸 Listo, voy a tocar →</button>
            ${c?'<button class="btn-link-sm" id="btn-back-theory">← Releer teoría</button>':""}
          </div>
        </div>

        <!-- Fase 2: Detectar nota -->
        <div id="phase-2" class="hidden">
          <div class="expected-note">
            <p class="expected-label">Nota esperada</p>
            <h3 id="expected-note-name">${i||"—"}</h3>
          </div>
          <div id="feedback-message" class="feedback-message neutral">
            🎙️ Acercá el micrófono y tocá la nota
          </div>
          <div class="progress-section">
            <div class="progress-bar">
              <div class="accuracy-bar" id="accuracy-bar" style="width:0%"></div>
            </div>
            <span id="accuracy-text">0%</span>
          </div>
          <div class="xp-display">⭐ XP de sesión: <span id="session-xp">0</span></div>
          <div class="exercise-controls">
            <button id="btn-play" class="btn-secondary">▶ Escuchar nota</button>
            <button id="btn-hint" class="btn-secondary">📍 Ver posición</button>
            <button id="btn-skip" class="btn-secondary">⏭ Saltar</button>
          </div>
          <div class="tp-phase-label" style="margin-top:12px">🎤 Paso 3 de 3 — Tocá la nota</div>
        </div>
      </div>
    `,o&&s.render("fretboard-container",i);const u=f=>document.getElementById(f)?.classList.remove("hidden"),p=f=>document.getElementById(f)?.classList.add("hidden");document.getElementById("btn-to-position")?.addEventListener("click",()=>{p("phase-0"),u("phase-1")}),document.getElementById("btn-back-theory")?.addEventListener("click",()=>{p("phase-1"),u("phase-0")}),document.getElementById("btn-ready")?.addEventListener("click",()=>{p("phase-1"),u("phase-2"),this._attachControls(),this._listenPitch()}),document.getElementById("btn-hint")?.addEventListener("click",()=>{p("phase-2"),u("phase-1"),this._removePitchListener()})}updateAccuracy(e,t,n){const i=document.getElementById("accuracy-bar"),s=document.getElementById("accuracy-text");if(i)if(i.style.width=`${e}%`,i.style.background=this._accuracyColor(e),s.textContent=`${Math.round(e)}%`,n===t)this.showCorrectFeedback(n);else if(e>40){const o=document.getElementById("feedback-message");o&&(o.textContent=`🟡 Casi... detecté ${n}`,o.className="feedback-message almost")}else this.showIncorrectFeedback()}showCorrectFeedback(e){const t=document.getElementById("feedback-message");if(!t)return;t.textContent=`✓ ¡Correcto! ${e}`,t.className="feedback-message correct",this.playSound("success"),this._sessionXP+=10;const n=document.getElementById("session-xp");n&&(n.textContent=this._sessionXP)}showIncorrectFeedback(){const e=document.getElementById("feedback-message");e&&(e.textContent="✗ Intentá de nuevo — revisá la nota",e.className="feedback-message incorrect",this.playSound("error"))}completeExercise(e,t){this._removePitchListener();const n=document.getElementById("main-content"),i=e>=(this._currentLesson?.requiereMinimoAccuracy||70),s=this._currentLesson?.tipo==="theory";n.innerHTML=`
      <div class="result-screen">
        <div class="result-icon">${i?"🏆":"💪"}</div>
        <h2>${i?s?"¡Lección completada!":"¡Muy bien!":"Seguí practicando"}</h2>
        <p class="result-lesson-name">${this._currentLesson?.nombre||""}</p>
        <div class="result-stats">
          <div class="stat">
            <span class="stat-value">${s?"✓":`${Math.round(e)}%`}</span>
            <span class="stat-label">${s?"Completado":"Accuracy"}</span>
          </div>
          <div class="stat">
            <span class="stat-value">+${t}</span>
            <span class="stat-label">XP ganado</span>
          </div>
        </div>
        <div class="result-actions">
          <button id="btn-next" class="btn-primary">Siguiente lección →</button>
          ${s?"":'<button id="btn-retry" class="btn-secondary">↩ Repetir</button>'}
        </div>
      </div>
    `,this.playSound("success"),document.getElementById("btn-retry")?.addEventListener("click",()=>{this.render(this._currentLesson)}),document.getElementById("btn-next")?.addEventListener("click",()=>{const o=this._currentLesson?.id,c=o?Nn.find(l=>Be[l].prerequisito===o):null;if(c)window.location.hash=`#/exercise/${c}`;else{const l=this._currentLesson;window.location.hash=l?`#/lessons/${l.nivel}/${l.subnivel}`:"#/lessons"}})}playSound(e){this._audioCtx||(this._audioCtx=new AudioContext);const t=this._audioCtx,n=t.createOscillator(),i=t.createGain();n.connect(i),i.connect(t.destination);const s={success:{freq:880,type:"sine",dur:.3},error:{freq:220,type:"sawtooth",dur:.2},almost:{freq:550,type:"triangle",dur:.15}}[e]||{freq:880,type:"sine",dur:.3};n.type=s.type,n.frequency.setValueAtTime(s.freq,t.currentTime),i.gain.setValueAtTime(.3,t.currentTime),i.gain.exponentialRampToValueAtTime(.001,t.currentTime+s.dur),n.start(t.currentTime),n.stop(t.currentTime+s.dur)}_listenPitch(){this._removePitchListener(),this._pitchListener=e=>{const{nombre:t,octava:n}=e.detail,i=this._currentLesson?.ejercicios?.[0]?.esperada;if(!i)return;const s=`${t}${n}`,c=s.toLowerCase().includes(i.toLowerCase())?90+Math.random()*10:Math.random()*35;this.updateAccuracy(c,i,s)},window.addEventListener("frequency",this._pitchListener)}_removePitchListener(){this._pitchListener&&(window.removeEventListener("frequency",this._pitchListener),this._pitchListener=null)}_attachControls(){document.getElementById("btn-play")?.addEventListener("click",()=>window.dispatchEvent(new CustomEvent("exercise:play"))),document.getElementById("btn-skip")?.addEventListener("click",()=>window.dispatchEvent(new CustomEvent("exercise:skip")))}_tipoIcon(e){return{video:"🎬",exercise:"🎸",theory:"📖"}[e]||"🎸"}_accuracyColor(e){return e>=80?"linear-gradient(90deg,#22c55e,#16a34a)":e>=50?"linear-gradient(90deg,#eab308,#ca8a04)":"linear-gradient(90deg,#ef4444,#dc2626)"}_parseMarkdown(e){return e.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/^#{1,3} (.+)$/gm,"<h4>$1</h4>").replace(/^\| (.+) \|$/gm,"").replace(/^- (.+)$/gm,"<li>$1</li>").replace(/(<li>.*<\/li>\n?)+/g,"<ul>$&</ul>").replace(/\[([x ])\]/g,(t,n)=>n==="x"?"☑":"☐").replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>").replace(/^(.)/m,"<p>$1").replace(/$/,"</p>")}}class rS{constructor(){this._currentPeriod="weekly"}renderLeaderboard(e,t,n){this._currentPeriod=n;const i=document.getElementById("main-content");i.innerHTML=`
      <div class="leaderboard-container">
        <h2 class="section-title">🏆 Rankings</h2>
        <div class="tabs">
          <button class="tab-btn ${n==="weekly"?"active":""}" data-period="weekly">Semanal</button>
          <button class="tab-btn ${n==="monthly"?"active":""}" data-period="monthly">Mensual</button>
          <button class="tab-btn ${n==="friends"?"active":""}" data-period="friends">Amigos</button>
        </div>

        <table class="leaderboard-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Usuario</th>
              <th>XP</th>
              <th>Racha 🔥</th>
            </tr>
          </thead>
          <tbody id="leaderboard-body">
            ${this._renderRows(e,t)}
          </tbody>
        </table>

        ${e.length===0?'<p class="empty-state">No hay datos aún. ¡Completa lecciones para aparecer!</p>':""}
      </div>
    `,document.querySelectorAll(".tab-btn").forEach(s=>{s.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("leaderboard:period-change",{detail:s.dataset.period}))})})}renderProfile(e){const t=document.getElementById("main-content");t.innerHTML=`
      <div class="profile-container">
        <div class="profile-header">
          <div class="avatar">${e.avatar||"🎸"}</div>
          <div class="profile-info">
            <h2>${e.displayName||"Guitarrista"}</h2>
            <span class="level-badge">Nivel ${e.level||1}</span>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-value">${e.xp?.toLocaleString()||0}</span>
            <span class="stat-label">XP Total</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">${e.streak||0}🔥</span>
            <span class="stat-label">Racha días</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">${e.lessonsCompleted||0}</span>
            <span class="stat-label">Lecciones</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">${e.accuracy||0}%</span>
            <span class="stat-label">Accuracy media</span>
          </div>
        </div>

        <div class="chart-section">
          <h3>XP esta semana</h3>
          <canvas id="stats-canvas" width="320" height="160"></canvas>
        </div>
      </div>
    `,e.weeklyData&&this.renderStatsChart(e.weeklyData)}renderStatsChart(e){const t=document.getElementById("stats-canvas");if(!t)return;const n=t.getContext("2d"),i=t.width,s=t.height,o={top:20,right:10,bottom:30,left:40},c=i-o.left-o.right,l=s-o.top-o.bottom;n.clearRect(0,0,i,s),n.fillStyle="#1a1a2e",n.fillRect(0,0,i,s);const u=Math.max(...e.map(f=>f.xp),1),p=c/e.length-4;e.forEach(({day:f,xp:g},I)=>{const D=g/u*l,k=o.left+I*(c/e.length)+2,S=o.top+l-D,F=n.createLinearGradient(k,S,k,S+D);F.addColorStop(0,"#7c6af7"),F.addColorStop(1,"#4f46e5"),n.fillStyle=F,n.beginPath(),n.roundRect(k,S,p,D,4),n.fill(),n.fillStyle="#888",n.font="11px sans-serif",n.textAlign="center",n.fillText(f.slice(0,3),k+p/2,s-8),g>0&&(n.fillStyle="#fff",n.fillText(g,k+p/2,S-4))})}_renderRows(e,t){return e.length?e.sort((n,i)=>i.xp-n.xp).slice(0,100).map((n,i)=>{const s=i+1;return`
          <tr class="${n.uid===t?"current-user":""}">
            <td>${s===1?"🥇":s===2?"🥈":s===3?"🥉":s}</td>
            <td>${n.avatar||"🎸"} ${n.displayName||"Anónimo"}</td>
            <td>${n.xp?.toLocaleString()||0}</td>
            <td>${n.streak||0}🔥</td>
          </tr>
        `}).join(""):""}}const Si=[{id:"primer_rasgueo",name:"🎸 Primer Rasgueo",description:"Completa tu primera lección",rarity:"common",icon:"🎸",condition:r=>r.lessonsCompleted>=1},{id:"rasgueador_maestro",name:"🏆 Rasgueador Maestro",description:"10 ejercicios de rasgueo con 90%+ accuracy",rarity:"rare",icon:"🏆",condition:r=>r.rasgueosPerfectos>=10},{id:"semana_de_oro",name:"💎 Semana de Oro",description:"7 días consecutivos de práctica",rarity:"rare",icon:"💎",condition:r=>r.streak>=7},{id:"racha_imparable",name:"🔥 Racha Imparable",description:"30 días consecutivos de práctica",rarity:"epic",icon:"🔥",condition:r=>r.streak>=30},{id:"cazador_de_notas",name:"🎯 Cazador de Notas",description:"100 notas correctas en el afinador",rarity:"common",icon:"🎯",condition:r=>r.correctNotes>=100},{id:"velocidad_relampago",name:"🚀 Velocidad Relámpago",description:"Completa un ejercicio a 1.5x de tempo",rarity:"rare",icon:"🚀",condition:r=>r.maxTempo>=1.5},{id:"virtuoso",name:"👑 Virtuoso",description:"Completa 5 lecciones del nivel Avanzado",rarity:"epic",icon:"👑",condition:r=>r.advancedLessons>=5},{id:"primeros_pasos",name:"👣 Primeros Pasos",description:"Completa el sub-nivel 1 completo",rarity:"common",icon:"👣",condition:r=>r.subnivelCompleted>=1},{id:"afinado",name:"🎵 Siempre Afinado",description:"Usa el afinador 20 veces",rarity:"common",icon:"🎵",condition:r=>r.tunerUses>=20},{id:"estudiante_dedicado",name:"📚 Estudiante Dedicado",description:"Completa 25 lecciones",rarity:"rare",icon:"📚",condition:r=>r.lessonsCompleted>=25},{id:"maestro_de_acordes",name:"🎼 Maestro de Acordes",description:"Completa todas las lecciones de acordes básicos",rarity:"rare",icon:"🎼",condition:r=>r.acordesCompletados>=10},{id:"perfeccionista",name:"💯 Perfeccionista",description:"Obtén 100% de accuracy en una lección",rarity:"epic",icon:"💯",condition:r=>r.maxAccuracy>=100},{id:"maratonista",name:"🏃 Maratonista",description:"Practica más de 2 horas en un día",rarity:"rare",icon:"🏃",condition:r=>r.dailyMinutes>=120},{id:"flamenco_soul",name:"💃 Alma Flamenca",description:"Completa 5 lecciones de Flamenco",rarity:"epic",icon:"💃",condition:r=>r.flamencoLessons>=5},{id:"xp_1000",name:"⭐ Mil Estrellas",description:"Acumula 1,000 XP",rarity:"common",icon:"⭐",condition:r=>r.xp>=1e3},{id:"xp_10000",name:"🌟 Diez Mil Estrellas",description:"Acumula 10,000 XP",rarity:"epic",icon:"🌟",condition:r=>r.xp>=1e4},{id:"spotify_maestro",name:"🎧 DJ Guitarrista",description:"Practica con 10 canciones diferentes de Spotify",rarity:"rare",icon:"🎧",condition:r=>r.spotifySongsUsed>=10},{id:"tapping_pro",name:"⚡ Tapping Pro",description:"Completa las lecciones de tapping con 80%+",rarity:"epic",icon:"⚡",condition:r=>r.tappingAccuracy>=80},{id:"leyenda",name:"🌌 Leyenda",description:"Completa las 300 lecciones",rarity:"legendary",icon:"🌌",condition:r=>r.lessonsCompleted>=300},{id:"guitarra_clasica",name:"🎻 Clásico",description:"Completa el sub-nivel de Guitarra Clásica",rarity:"rare",icon:"🎻",condition:r=>r.clasicaCompleted>=10}],Rc={common:"#9ca3af",rare:"#60a5fa",epic:"#a855f7",legendary:"#f59e0b"},iS=Object.freeze(Object.defineProperty({__proto__:null,BADGES:Si,RARITY_COLORS:Rc},Symbol.toStringTag,{value:"Module"}));class sS{constructor(){this._unlockedIds=new Set(JSON.parse(localStorage.getItem("gp_badges")||"[]"))}checkBadgeProgress(e){const t=[];for(const n of Si)if(!this._unlockedIds.has(n.id))try{n.condition(e)&&(t.push(n),this._unlockedIds.add(n.id))}catch{}return t.length>0&&(this._persistLocal(),t.forEach(n=>{window.dispatchEvent(new CustomEvent("badge:unlocked",{detail:n}))})),t}async unlockBadge(e,t){if(this._unlockedIds.has(e))return;this._unlockedIds.add(e),this._persistLocal(),t&&await Ql(xr(Zi,"users",t),{badges:Xl(e)});const n=Si.find(i=>i.id===e);n&&(window.dispatchEvent(new CustomEvent("badge:unlocked",{detail:n})),this.showBadgeUnlockedModal(n))}showBadgeUnlockedModal(e){const t=document.getElementById("badge-modal");t&&t.remove();const n=document.createElement("div");n.id="badge-modal",n.className="badge-modal",n.innerHTML=`
      <div class="badge-modal-content">
        <div class="badge-modal-icon">${e.icon}</div>
        <h3>¡Badge Desbloqueado!</h3>
        <h4 class="badge-name" style="color:${Rc[e.rarity]}">${e.name}</h4>
        <p class="badge-desc">${e.description}</p>
        <span class="rarity-label rarity-${e.rarity}">${e.rarity.toUpperCase()}</span>
        <div class="badge-actions">
          <button class="btn-primary" id="badge-close">¡Genial!</button>
          <button class="btn-secondary" id="badge-share">Compartir</button>
        </div>
      </div>
    `,document.body.appendChild(n),n.classList.add("badge-modal-enter"),document.getElementById("badge-close")?.addEventListener("click",()=>{n.classList.add("badge-modal-exit"),setTimeout(()=>n.remove(),300)}),document.getElementById("badge-share")?.addEventListener("click",()=>{this.shareBadge(e)}),setTimeout(()=>{n.parentNode&&n.remove()},8e3)}shareBadge(e){const t=`¡Desbloqueé el badge ${e.name} en Guitar+! ${e.description} 🎸 #GuitarPlus`,n=`https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}`;window.open(n,"_blank","noopener,noreferrer")}renderBadgeShowcase(e){const t=document.getElementById("main-content"),n=new Set(e);t.innerHTML=`
      <div class="badges-container">
        <h2>🏅 Mis Badges <span class="badge-count">${e.length}/${Si.length}</span></h2>
        <div class="badges-grid">
          ${Si.map(i=>{const s=n.has(i.id);return`
              <div class="badge-card ${s?"unlocked":"locked"}" title="${i.description}">
                <div class="badge-icon" style="filter:${s?"none":"grayscale(1) opacity(0.4)"}">
                  ${i.icon}
                </div>
                <span class="badge-card-name" style="color:${s?Rc[i.rarity]:"#666"}">
                  ${i.name.replace(i.icon,"").trim()}
                </span>
                ${s?"":'<span class="locked-label">🔒</span>'}
              </div>
            `}).join("")}
        </div>
      </div>
    `}_persistLocal(){localStorage.setItem("gp_badges",JSON.stringify([...this._unlockedIds]))}}class oS{constructor(e){this._auth=e,this._mode="login"}render(e){const t=document.getElementById("main-content")||document.getElementById("app");t.innerHTML=this._buildHTML(),this._attachListeners(e)}_buildHTML(){return`
      <div class="auth-wrapper">
        <div class="auth-card">
          <div class="auth-logo">🎸 Guitar+</div>

          <!-- Tabs login / register -->
          <div class="auth-tabs" id="auth-tabs">
            <button class="auth-tab ${this._mode==="login"?"active":""}" data-mode="login">
              Iniciar sesión
            </button>
            <button class="auth-tab ${this._mode==="register"?"active":""}" data-mode="register">
              Registrarse
            </button>
          </div>

          <!-- Form login -->
          <form id="login-form" class="auth-form ${this._mode!=="login"?"hidden":""}">
            <div class="form-group">
              <label for="login-email">Email</label>
              <input type="email" id="login-email" placeholder="tu@email.com" autocomplete="email" required />
            </div>
            <div class="form-group">
              <label for="login-password">Contraseña</label>
              <input type="password" id="login-password" placeholder="••••••" autocomplete="current-password" required />
            </div>
            <div id="login-error" class="auth-error hidden"></div>
            <button type="submit" class="btn-primary btn-full" id="login-submit">
              Iniciar sesión
            </button>
            <button type="button" class="btn-link" id="btn-forgot">¿Olvidaste tu contraseña?</button>
          </form>

          <!-- Form registro -->
          <form id="register-form" class="auth-form ${this._mode!=="register"?"hidden":""}">
            <div class="form-group">
              <label for="reg-name">Nombre</label>
              <input type="text" id="reg-name" placeholder="Tu nombre" autocomplete="name" required />
            </div>
            <div class="form-group">
              <label for="reg-email">Email</label>
              <input type="email" id="reg-email" placeholder="tu@email.com" autocomplete="email" required />
            </div>
            <div class="form-group">
              <label for="reg-password">Contraseña</label>
              <input type="password" id="reg-password" placeholder="Mínimo 6 caracteres" autocomplete="new-password" required />
              <div class="password-strength" id="pwd-strength"></div>
            </div>
            <div class="form-group">
              <label for="reg-password2">Confirmar contraseña</label>
              <input type="password" id="reg-password2" placeholder="Repite la contraseña" required />
            </div>
            <div id="register-error" class="auth-error hidden"></div>
            <button type="submit" class="btn-primary btn-full" id="register-submit">
              Crear cuenta gratis
            </button>
            <p class="auth-terms">
              Al registrarte aceptas nuestros
              <a href="#/terms">Términos de uso</a> y
              <a href="#/privacy">Política de privacidad</a>.
            </p>
          </form>

          <!-- Form forgot password -->
          <form id="forgot-form" class="auth-form ${this._mode!=="forgot"?"hidden":""}">
            <p class="auth-hint">Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.</p>
            <div class="form-group">
              <label for="forgot-email">Email</label>
              <input type="email" id="forgot-email" placeholder="tu@email.com" required />
            </div>
            <div id="forgot-msg" class="auth-success hidden"></div>
            <div id="forgot-error" class="auth-error hidden"></div>
            <button type="submit" class="btn-primary btn-full">Enviar enlace</button>
            <button type="button" class="btn-link" id="btn-back-login">← Volver al login</button>
          </form>

          <!-- Plan selector (solo en registro) -->
          <div id="plan-selector" class="${this._mode!=="register"?"hidden":""}">
            <p class="plan-label">Empieza con el plan gratuito:</p>
            <div class="plan-cards">
              ${this._planCard("free","🎸 Gratis","$0",["100 lecciones principiante","Afinador básico"],!0)}
              ${this._planCard("lite","🎵 LITE","$0 + ads",["+ 100 lecciones intermedio","Badges + Leaderboard","100 canciones Spotify"],!1)}
              ${this._planCard("pro","⭐ PRO","$4.99/mes",["Sin publicidad","200 canciones Spotify","Análisis IA de postura"],!1)}
            </div>
          </div>

        </div>
      </div>
    `}_planCard(e,t,n,i,s){return`
      <div class="plan-card ${s?"selected":""}" data-plan="${e}">
        <div class="plan-name">${t}</div>
        <div class="plan-price">${n}</div>
        <ul class="plan-features">
          ${i.map(o=>`<li>✓ ${o}</li>`).join("")}
        </ul>
      </div>
    `}_attachListeners(e){document.querySelectorAll(".auth-tab").forEach(t=>{t.addEventListener("click",()=>{this._mode=t.dataset.mode,this.render(e)})}),document.getElementById("login-form")?.addEventListener("submit",async t=>{t.preventDefault(),await this._handleLogin(e)}),document.getElementById("register-form")?.addEventListener("submit",async t=>{t.preventDefault(),await this._handleRegister(e)}),document.getElementById("forgot-form")?.addEventListener("submit",async t=>{t.preventDefault(),await this._handleForgot()}),document.getElementById("btn-forgot")?.addEventListener("click",()=>{this._mode="forgot",this.render(e)}),document.getElementById("btn-back-login")?.addEventListener("click",()=>{this._mode="login",this.render(e)}),document.getElementById("reg-password")?.addEventListener("input",t=>{this._updatePasswordStrength(t.target.value)}),document.querySelectorAll(".plan-card").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".plan-card").forEach(n=>n.classList.remove("selected")),t.classList.add("selected")})})}async _handleLogin(e){const t=document.getElementById("login-submit"),n=document.getElementById("login-error"),i=document.getElementById("login-email").value.trim(),s=document.getElementById("login-password").value;this._setLoading(t,!0),n.classList.add("hidden");try{await this._auth.signIn(i,s),e?.()}catch(o){this._showError(n,o.message)}finally{this._setLoading(t,!1)}}async _handleRegister(e){const t=document.getElementById("register-submit"),n=document.getElementById("register-error"),i=document.getElementById("reg-name").value.trim(),s=document.getElementById("reg-email").value.trim(),o=document.getElementById("reg-password").value,c=document.getElementById("reg-password2").value;if(o!==c)return this._showError(n,"Las contraseñas no coinciden");this._setLoading(t,!0),n.classList.add("hidden");try{const l=await this._auth.signUp(s,o),{doc:u,updateDoc:p}=await Ce(async()=>{const{doc:g,updateDoc:I}=await Promise.resolve().then(()=>en);return{doc:g,updateDoc:I}},void 0),{db:f}=await Ce(async()=>{const{db:g}=await Promise.resolve().then(()=>tn);return{db:g}},void 0);await p(u(f,"users",l.uid),{displayName:i}),e?.()}catch(l){this._showError(n,l.message)}finally{this._setLoading(t,!1)}}async _handleForgot(){const e=document.getElementById("forgot-email").value.trim(),t=document.getElementById("forgot-error"),n=document.getElementById("forgot-msg");t.classList.add("hidden"),n.classList.add("hidden");try{const{sendPasswordResetEmail:i}=await Ce(async()=>{const{sendPasswordResetEmail:o}=await Promise.resolve().then(()=>$b);return{sendPasswordResetEmail:o}},void 0),{auth:s}=await Ce(async()=>{const{auth:o}=await Promise.resolve().then(()=>tn);return{auth:o}},void 0);await i(s,e),n.textContent="✓ Email enviado. Revisa tu bandeja de entrada.",n.classList.remove("hidden")}catch{this._showError(t,"No se pudo enviar el email. Verifica la dirección.")}}_updatePasswordStrength(e){const t=document.getElementById("pwd-strength");if(!t)return;let n=0;e.length>=6&&n++,e.length>=10&&n++,/[A-Z]/.test(e)&&n++,/[0-9]/.test(e)&&n++,/[^A-Za-z0-9]/.test(e)&&n++;const i=["","Muy débil","Débil","Regular","Fuerte","¡Excelente!"],s=["","#ef4444","#f97316","#eab308","#22c55e","#15803d"];t.innerHTML=`
      <div class="strength-bar">
        ${[1,2,3,4,5].map(o=>`<div class="strength-segment ${o<=n?"filled":""}" style="${o<=n?`background:${s[n]}`:""}"></div>`).join("")}
      </div>
      <span style="color:${s[n]};font-size:0.75rem">${i[n]}</span>
    `}_showError(e,t){e.textContent=t,e.classList.remove("hidden")}_setLoading(e,t){e.disabled=t,e.textContent=t?"Cargando...":e.dataset.label||e.textContent,e.dataset.label||(e.dataset.label=e.textContent)}}class aS{constructor(e,t){this._router=e,this._auth=t,this._el=null}mount(){const e=document.createElement("nav");e.id="main-nav",e.className="navbar",document.getElementById("app").prepend(e),this._el=e,this.update()}update(e=null,t="free"){if(!this._el)return;const n=!!e||this._auth.isAuthenticated();this._el.innerHTML=`
      <a class="logo" href="#/">🎸 Guitar+</a>

      <div class="nav-links" id="nav-links">
        <a class="nav-link" href="#/tuner">🎵 Afinador</a>
        <a class="nav-link" href="#/lessons">📚 Lecciones</a>
        ${n?`
          <a class="nav-link" href="#/leaderboard">🏆 Ranking</a>
          <a class="nav-link" href="#/badges">🏅 Badges</a>
          <a class="nav-link" href="#/profile">👤 Perfil</a>
          <button class="nav-btn-plan plan-${t}" id="btn-upgrade">${this._planLabel(t)}</button>
          <button class="nav-btn-logout" id="btn-logout">Salir</button>
        `:`
          <a class="nav-link nav-link-accent" href="#/login">Iniciar sesión</a>
        `}
      </div>

      <button class="nav-hamburger" id="nav-hamburger" aria-label="Menú">☰</button>
    `,document.getElementById("btn-logout")?.addEventListener("click",async()=>{await this._auth.signOut(),this._router.navigate("/login")}),document.getElementById("btn-upgrade")?.addEventListener("click",()=>{this._router.navigate("/plans")}),document.getElementById("nav-hamburger")?.addEventListener("click",()=>{document.getElementById("nav-links")?.classList.toggle("open")});const i=window.location.hash.replace("#","");this._el.querySelectorAll(".nav-link").forEach(s=>{const o=s.getAttribute("href").replace("#","");s.classList.toggle("active",i.startsWith(o)&&o!=="/")})}_planLabel(e){return{free:"⬆ Mejorar plan",lite:"🎵 LITE",pro:"⭐ PRO",maestro:"👑 MAESTRO"}[e]||"⬆ Plan"}}class cS{constructor(e){this._sub=e}async render(){const e=document.getElementById("main-content"),t=await this._sub.getSubscriptionStatus().catch(()=>({plan:"free"}));e.innerHTML=`
      <div class="plans-container">
        <h2 class="plans-title">Elige tu plan</h2>
        <p class="plans-subtitle">Aprende guitarra a tu ritmo — cancela cuando quieras</p>

        <div class="plans-grid">
          ${this._planCard({id:"free",name:"🎸 Gratis",price:"$0",period:"para siempre",current:t.plan==="free",features:["100 lecciones (nivel Principiante)","Afinador visual completo","Ejercicios con feedback","Seguimiento de progreso básico"],cta:"Plan actual",disabled:!0})}
          ${this._planCard({id:"lite",name:"🎵 LITE",price:"$0",period:"+ anuncios",current:t.plan==="lite",badge:"Popular",features:["Todo lo del plan Gratis","100 lecciones Intermedias","Badges + Leaderboard","100 canciones Spotify","Anuncios ocasionales"],cta:t.plan==="lite"?"Plan actual":"Activar LITE",disabled:t.plan==="lite",productId:Wa.LITE.id})}
          ${this._planCard({id:"pro",name:"⭐ PRO",price:"$4.99",period:"/mes",current:t.plan==="pro",badge:"Recomendado",features:["Todo lo de LITE","Sin publicidad","200 canciones Spotify","Análisis IA de postura","Planes personalizados IA"],cta:t.plan==="pro"?"Plan actual":"Suscribirse a PRO",disabled:t.plan==="pro",productId:Wa.PRO.id,highlight:!0})}
          ${this._planCard({id:"maestro",name:"👑 MAESTRO",price:"$9.99",period:"/mes",current:t.plan==="maestro",features:["Todo lo de PRO","500+ canciones Spotify","100 lecciones Avanzadas","Análisis avanzado con IA","Planes IA premium","Todos los ejercicios y estilos"],cta:t.plan==="maestro"?"Plan actual":"Suscribirse a MAESTRO",disabled:t.plan==="maestro",productId:Wa.MAESTRO.id})}
        </div>

        ${t.plan!=="free"&&t.expiresAt?`
          <p class="plan-expiry">Tu plan ${t.plan.toUpperCase()} vence el ${new Date(t.expiresAt).toLocaleDateString("es-AR")}. ${t.daysRemaining} días restantes.</p>
        `:""}

        <div class="plans-guarantee">
          🔒 Pago seguro · Cancela en cualquier momento · Sin permanencia
        </div>
      </div>
    `,document.querySelectorAll(".plan-cta:not([disabled])").forEach(n=>{n.addEventListener("click",()=>this._handlePurchase(n.dataset.productId))})}_planCard({id:e,name:t,price:n,period:i,current:s,badge:o,features:c,cta:l,disabled:u,productId:p,highlight:f}){return`
      <div class="plan-card-full ${f?"plan-highlight":""} ${s?"plan-current":""}">
        ${o?`<div class="plan-badge">${o}</div>`:""}
        <div class="plan-header">
          <h3 class="plan-name-full">${t}</h3>
          <div class="plan-pricing">
            <span class="plan-price-big">${n}</span>
            <span class="plan-period">${i}</span>
          </div>
        </div>
        <ul class="plan-features-full">
          ${c.map(g=>`<li>✓ ${g}</li>`).join("")}
        </ul>
        <button class="plan-cta ${f?"btn-primary":"btn-secondary"}"
          data-plan="${e}"
          data-product-id="${p||""}"
          ${u?"disabled":""}>
          ${l}
        </button>
      </div>
    `}async _handlePurchase(e){if(!e)return;const t=document.querySelector(`[data-product-id="${e}"]`);t&&(t.disabled=!0,t.textContent="Procesando...");try{await this._sub.purchaseSubscription(e),this.render()}catch(n){alert(`Error al procesar: ${n.message}`),t&&(t.disabled=!1,t.textContent="Reintentar")}}}const Ws={principiante:{label:"Principiante",icon:"🌱",color:"#22c55e",plan:"free"},intermedio:{label:"Intermedio",icon:"🎯",color:"#7c6af7",plan:"lite"},avanzado:{label:"Avanzado",icon:"🔥",color:"#f59e0b",plan:"maestro"}},Hh={principiante:["Introducción","Acordes Básicos","Rasgueo Básico","Técnica Dedos","Notas Sueltas","Lectura Tablatura","Ritmos Simples","Arpegios Básicos","Canciones","Proyecto Final"],intermedio:["Rasgueo Avanzado","Arpegios Intermedios","Flamenco Básico","Técnica Mano Derecha","Tapping","Bending y Vibrato","Canciones Intermedias","Improvisación","Proyecto A","Proyecto B"],avanzado:["Flamenco Completo","Virtuosismo","Composición","Estilos Mundiales","Jazz","Teoría Avanzada","Grabación","Performance","Proyectos Artísticos","Maestría Total"]};class lS{constructor(e,t,n){this._engine=e,this._sub=t,this._auth=n}async render(e="principiante",t=null){const n=document.getElementById("main-content"),i=this._auth?.isAuthenticated()||!1,s=i?await this._sub.getSubscriptionStatus().catch(()=>({plan:"free"})):{plan:"free"};t?await this._renderSubnivelView(n,e,parseInt(t),s,i):this._renderNivelView(n,e,s.plan,i)}_renderNivelView(e,t,n,i){e.innerHTML=`
      <div class="lessons-container">
        <div class="nivel-tabs">
          ${Object.entries(Ws).map(([s,o])=>`
            <button class="nivel-tab ${s===t?"active":""}"
              data-nivel="${s}"
              style="${s===t?`border-bottom-color:${o.color}`:""}">
              ${o.icon} ${o.label}
              ${s!=="principiante"&&!i?"🔒":""}
            </button>
          `).join("")}
        </div>

        ${t!=="principiante"&&!i?this._renderAuthWall(t):`<div class="subniveles-grid">
              ${Hh[t].map((s,o)=>{const c=o+1,l=Nn.filter(p=>Be[p].nivel===t&&Be[p].subnivel===c),u=t!=="principiante"&&!this._hasPlan(n,Ws[t].plan);return`
                  <div class="subnivel-card ${u?"locked":""}"
                    data-nivel="${t}" data-subnivel="${c}" data-needs-plan="${u}">
                    <div class="subnivel-number">${c}</div>
                    <div class="subnivel-info">
                      <h3>${s}</h3>
                      <span>${l.length} lecciones</span>
                    </div>
                    ${u?'<span class="lock-icon">🔒</span>':'<span class="arrow-icon">→</span>'}
                  </div>
                `}).join("")}
            </div>`}
      </div>
    `,document.querySelectorAll(".nivel-tab").forEach(s=>{s.addEventListener("click",()=>this.render(s.dataset.nivel))}),document.querySelectorAll(".subnivel-card:not(.locked)").forEach(s=>{s.addEventListener("click",()=>{window.location.hash=`#/lessons/${s.dataset.nivel}/${s.dataset.subnivel}`})}),document.querySelectorAll(".subnivel-card.locked").forEach(s=>{s.addEventListener("click",()=>{window.location.hash="#/plans"})})}_renderAuthWall(e){const t=Ws[e];return`
      <div class="auth-wall">
        <div class="auth-wall-icon">${t.icon}</div>
        <h3>Nivel ${t.label}</h3>
        <p>Creá una cuenta gratuita para acceder a este nivel y guardar tu progreso.</p>
        <div class="auth-wall-actions">
          <a class="btn-primary" href="#/login?mode=register">Crear cuenta gratis</a>
          <a class="btn-secondary" href="#/login">Ya tengo cuenta</a>
        </div>
        <p class="auth-wall-note">✓ Gratis · ✓ Sin tarjeta · ✓ En 30 segundos</p>
      </div>
    `}async _renderSubnivelView(e,t,n,i,s){if(t!=="principiante"&&!s){window.location.hash=`#/lessons/${t}`;return}const o=this._engine.getLessons(t,n),c=Ws[t],l=Hh[t][n-1];e.innerHTML=`
      <div class="lessons-container">
        <div class="subnivel-header">
          <a class="btn-back" href="#/lessons/${t}">← ${c.label}</a>
          <h2>${c.icon} Sub-nivel ${n}: ${l}</h2>
        </div>
        <div class="lessons-list" id="lessons-list">
          <div class="loading-indicator">Cargando lecciones...</div>
        </div>
      </div>
    `;const u=document.getElementById("lessons-list"),p=await Promise.all(o.map(f=>this._engine.canAccessLesson(f.id,i,null)));u.innerHTML=o.map((f,g)=>{const I=p[g],D=this._engine._userProgress?.[f.id],k=D?.passed,S=D?.accuracy;return`
        <div class="lesson-row ${I.canAccess?"":"locked"} ${k?"completed":""}"
          data-lesson-id="${f.id}">
          <div class="lesson-row-left">
            <div class="lesson-number">${f.leccion}</div>
            <div class="lesson-info">
              <h4>${f.nombre}</h4>
              <span class="lesson-meta">${this._tipoLabel(f.tipo)} · ${f.duracion} min</span>
            </div>
          </div>
          <div class="lesson-row-right">
            ${k?`<span class="lesson-accuracy">${Math.round(S)}%</span>`:""}
            ${I.canAccess?k?`<button class="btn-start-lesson btn-repeat" data-id="${f.id}">🔄 Repetir</button>`:`<button class="btn-start-lesson" data-id="${f.id}">▶ Empezar</button>`:`<span class="lesson-lock" title="${I.reason}">🔒</span>`}
          </div>
        </div>
      `}).join(""),document.querySelectorAll(".btn-start-lesson").forEach(f=>{f.addEventListener("click",()=>{window.location.hash=`#/exercise/${f.dataset.id}`})})}_hasPlan(e,t){const n={free:0,lite:1,pro:2,maestro:3};return(n[e]||0)>=(n[t]||0)}_tipoLabel(e){return{video:"🎬 Video",exercise:"🎸 Ejercicio",theory:"📖 Teoría"}[e]||e}}const Wh={free:0,lite:1,pro:2,maestro:3};class uS{constructor(){this._cache={},this._userProgress=JSON.parse(sessionStorage.getItem("gp_progress")||"{}")}getLessons(e,t){return Nn.map(n=>Be[n]).filter(n=>n.nivel===e&&n.subnivel===t).sort((n,i)=>n.leccion-i.leccion)}getLessonDetail(e){return Be[e]||null}async canAccessLesson(e,t,n){const i=Be[e];if(!i)return{canAccess:!1,reason:"Lección no encontrada"};const s=Wh[t?.plan||"free"]||0,o=Wh[i.planMinimo]||0;if(s<o)return{canAccess:!1,reason:`Requiere plan ${{lite:"LITE",pro:"PRO",maestro:"MAESTRO"}[i.planMinimo]||i.planMinimo}`};if(i.prerequisito){const l=(await this._getProgress(n))[i.prerequisito];if(!l||l.accuracy<i.requiereMinimoAccuracy)return{canAccess:!1,reason:`Debes completar "${Be[i.prerequisito]?.nombre}" con al menos ${i.requiereMinimoAccuracy}%`}}return{canAccess:!0,reason:""}}async markLessonComplete(e,t,n){const i=Math.round(t*10),s=t>=(Be[e]?.requiereMinimoAccuracy||70),o={lessonId:e,accuracy:t,xpGained:i,passed:s,completedAt:new Date().toISOString()};return(!this._userProgress[e]||this._userProgress[e].accuracy<t)&&(this._userProgress[e]=o,sessionStorage.setItem("gp_progress",JSON.stringify(this._userProgress))),n&&await Ql(xr(Zi,"users",n),{lessonsCompleted:Xl(e),xp:{increment:i},lastActivity:Yl(),[`lessonProgress.${e}`]:o}),{xpGained:i,passed:s}}getNextLesson(e){if(!Be[e])return null;const n=Nn.find(i=>Be[i].prerequisito===e);return n?Be[n]:null}async getProgress(e,t){const n=Nn.filter(o=>Be[o].nivel===e).length,i=await this._getProgress(t),s=Object.entries(i).filter(([o,c])=>Be[o]?.nivel===e&&c.passed).length;return n>0?Math.round(s/n*100):0}async getLessonsByStatus(e,t){const n=await this._getProgress(e),i=[],s=[],o=[];for(const l of Nn)(await this.canAccessLesson(l,t,e)).canAccess?n[l]?.passed?i.push(l):n[l]&&s.push(l):o.push(l);const c=s[0]||Nn.find(l=>!i.includes(l)&&!o.includes(l))||null;return{completed:i,inProgress:s,locked:o,nextRecommended:c}}async _getProgress(e){if(Object.keys(this._userProgress).length>0)return this._userProgress;if(e)try{const n=(await Kg(xr(Zi,"users",e))).data()?.lessonProgress||{};return this._userProgress=n,sessionStorage.setItem("gp_progress",JSON.stringify(n)),n}catch{return{}}return{}}}class dS{constructor(){this._routes={},this._notFound=null,this._guards=[],this._current=null}on(e,t){return this._routes[e]=t,this}notFound(e){return this._notFound=e,this}addGuard(e){return this._guards.push(e),this}start(){window.addEventListener("hashchange",()=>this._resolve()),window.addEventListener("popstate",()=>this._resolve()),this._resolve()}navigate(e){window.location.hash=e}replace(e){history.replaceState(null,"",`#${e}`),this._resolve()}_resolve(){const e=window.location.hash.replace("#","")||"/",{handler:t,params:n}=this._match(e);for(const i of this._guards){const s=i(e,n);if(s!==!0){this.replace(typeof s=="string"?s:"/");return}}this._current={path:e,params:n},t?t(n):this._notFound&&this._notFound({path:e})}_match(e){for(const[t,n]of Object.entries(this._routes)){const{match:i,params:s}=this._testPattern(t,e);if(i)return{handler:n,params:s}}return{handler:null,params:{}}}_testPattern(e,t){const n=e.split("/").filter(Boolean),i=t.split("/").filter(Boolean);if(n.length!==i.length)return{match:!1};const s={};for(let o=0;o<n.length;o++)if(n[o].startsWith(":"))s[n[o].slice(1)]=decodeURIComponent(i[o]);else if(n[o]!==i[o])return{match:!1};return{match:!0,params:s}}}const nt=new NR,Qh=new OR,Wn=new MR,hS=new qR,pS=new GR,n_=new uS,fS=new HR,Jh=new nS,Ja=new rS,Sc=new sS,Yh=new oS(nt),mS=new cS(Wn),Ya=new lS(n_,Wn,nt),Wt=new dS,We=new aS(Wt,nt);Wt.addGuard((r,e)=>{if(["/login","/plans","/terms","/privacy","/tuner","/"].some(n=>r===n||r.startsWith(n+"/"))||r==="/lessons"||r.startsWith("/lessons/principiante"))return!0;if(r.startsWith("/exercise/")){const n=r.replace("/exercise/","");if(Be[n]?.nivel==="principiante")return!0}return nt.isAuthenticated()?!0:"/login"});Wt.on("/",()=>{Wt.replace("/lessons")}).on("/login",()=>{We.update(),new URLSearchParams(window.location.hash.split("?")[1]||"").get("mode")==="register"&&(Yh._mode="register"),Yh.render(()=>{Wt.navigate("/lessons")})}).on("/tuner",()=>{We.update(),fS.render(),Qh.start().catch(r=>{document.getElementById("tuner-status").textContent=`⚠️ ${r.message}`})}).on("/lessons",()=>{We.update();const r=nt.getCurrentUser();r&&Wn.initRevenueCat(r.uid,""),Ya.render("principiante")}).on("/lessons/:nivel",({nivel:r})=>{We.update(),Ya.render(r)}).on("/lessons/:nivel/:subnivel",({nivel:r,subnivel:e})=>{We.update(),Ya.render(r,e)}).on("/exercise/:lessonId",async({lessonId:r})=>{We.update();const e=Be[r];if(!e)return Wt.navigate("/lessons");const t=await Wn.getSubscriptionStatus().catch(()=>({plan:"free"})),n=await n_.canAccessLesson(r,t,nt.getCurrentUser()?.uid);if(!n.canAccess){vS(n.reason);return}Jh.render(e),Qh.start().catch(console.warn),window.addEventListener("exercise:complete",async i=>{const{accuracy:s}=i.detail,o=nt.getCurrentUser()?.uid,c=Math.round(s*10);o&&(await _S(o,r,s,c),(await yS(o)).forEach(u=>Sc.unlockBadge(u,o)),pS.onExerciseCompleted(t)),Jh.completeExercise(s,c)},{once:!0})}).on("/leaderboard",async()=>{We.update();const r=nt.getCurrentUser()?.uid;try{const{collection:e,query:t,orderBy:n,limit:i,getDocs:s}=await Ce(async()=>{const{collection:p,query:f,orderBy:g,limit:I,getDocs:D}=await Promise.resolve().then(()=>en);return{collection:p,query:f,orderBy:g,limit:I,getDocs:D}},void 0),{db:o}=await Ce(async()=>{const{db:p}=await Promise.resolve().then(()=>tn);return{db:p}},void 0),c=t(e(o,"leaderboard"),n("xp","desc"),i(100)),u=(await s(c)).docs.map((p,f)=>({rank:f+1,...p.data()}));Ja.renderLeaderboard(u,r,"weekly")}catch{Ja.renderLeaderboard([],r,"weekly")}}).on("/badges",async()=>{We.update();const r=nt.getCurrentUser()?.uid,e=r?await(async()=>{const{doc:t,getDoc:n}=await Ce(async()=>{const{doc:o,getDoc:c}=await Promise.resolve().then(()=>en);return{doc:o,getDoc:c}},void 0),{db:i}=await Ce(async()=>{const{db:o}=await Promise.resolve().then(()=>tn);return{db:o}},void 0);return(await n(t(i,"users",r))).data()?.badges||[]})().catch(()=>[]):[];Sc.renderBadgeShowcase(e)}).on("/profile",async()=>{We.update();const r=nt.getCurrentUser()?.uid;if(!r)return Wt.navigate("/login");const{doc:e,getDoc:t}=await Ce(async()=>{const{doc:o,getDoc:c}=await Promise.resolve().then(()=>en);return{doc:o,getDoc:c}},void 0),{db:n}=await Ce(async()=>{const{db:o}=await Promise.resolve().then(()=>tn);return{db:o}},void 0),s=(await t(e(n,"users",r))).data()||{};Ja.renderProfile({displayName:s.displayName||"Guitarrista",xp:s.xp||0,streak:s.streak||0,level:Math.floor((s.xp||0)/1e3)+1,lessonsCompleted:s.lessonsCompleted?.length||0,accuracy:75,weeklyData:IS()})}).on("/plans",()=>{We.update(),mS.render()}).notFound(({path:r})=>{const e=document.getElementById("main-content");e&&(e.innerHTML=`
        <div class="not-found">
          <h2>404 — Página no encontrada</h2>
          <p>La ruta <code>${r}</code> no existe.</p>
          <a class="btn-primary" href="#/lessons">Ir a lecciones</a>
        </div>
      `)});nt.onAuthStateChanged(async r=>{if(r){Wn.initRevenueCat(r.uid,"");const e=await Wn.getSubscriptionStatus().catch(()=>({plan:"free"}));We.update(r,e.plan),/[?&](code|error)=/.test(window.location.search)&&await hS.handleCallback()}else We.update(null,"free")});window.addEventListener("badge:unlocked",r=>{Sc.showBadgeUnlockedModal(r.detail)});window.addEventListener("subscription:changed",async()=>{const r=nt.getCurrentUser();if(r){const e=await Wn.getSubscriptionStatus().catch(()=>({plan:"free"}));We.update(r,e.plan)}});window.addEventListener("spotify:error",r=>{console.warn("Spotify error:",r.detail)});function gS(){const r=document.getElementById("app");let e=document.getElementById("main-content");e||(e=document.createElement("main"),e.id="main-content",r.appendChild(e)),document.getElementById("loading")?.remove(),We.mount(),Wt.start()}async function _S(r,e,t,n){try{const{doc:i,getDoc:s,updateDoc:o,arrayUnion:c,increment:l,serverTimestamp:u}=await Ce(async()=>{const{doc:G,getDoc:J,updateDoc:K,arrayUnion:E,increment:_,serverTimestamp:y}=await Promise.resolve().then(()=>en);return{doc:G,getDoc:J,updateDoc:K,arrayUnion:E,increment:_,serverTimestamp:y}},void 0),{db:p}=await Ce(async()=>{const{db:G}=await Promise.resolve().then(()=>tn);return{db:G}},void 0),f=i(p,"users",r),I=(await s(f)).data()||{},D=I.lastActivity?.toDate?.(),S=D?Math.floor((new Date-D)/864e5):null,F=t>=70;let U=I.streak||0;F&&(U=S===1?U+1:1),await o(f,{xp:l(n),streak:U,lastActivity:u(),...F&&{lessonsCompleted:c(e)},[`lessonProgress.${e}`]:{accuracy:t,xpGained:n,passed:F,completedAt:new Date().toISOString()}});const B=i(p,"leaderboard",r);await o(B,{xp:l(n),streak:U,displayName:I.displayName||"Guitarrista",updatedAt:u()}).catch(async()=>{const{setDoc:G}=await Ce(async()=>{const{setDoc:J}=await Promise.resolve().then(()=>en);return{setDoc:J}},void 0);await G(B,{userId:r,displayName:I.displayName||"Guitarrista",xp:n,streak:U,updatedAt:u()})})}catch(i){console.warn("saveExerciseResult error:",i.message)}}async function yS(r){try{const{doc:e,getDoc:t}=await Ce(async()=>{const{doc:u,getDoc:p}=await Promise.resolve().then(()=>en);return{doc:u,getDoc:p}},void 0),{db:n}=await Ce(async()=>{const{db:u}=await Promise.resolve().then(()=>tn);return{db:u}},void 0),s=(await t(e(n,"users",r))).data()||{},o={lessonsCompleted:(s.lessonsCompleted||[]).length,xp:s.xp||0,streak:s.streak||0},{BADGES:c}=await Ce(async()=>{const{BADGES:u}=await Promise.resolve().then(()=>iS);return{BADGES:u}},void 0),l=new Set(s.badges||[]);return c.filter(u=>!l.has(u.id)&&(()=>{try{return u.condition(o)}catch{return!1}})()).map(u=>u.id)}catch{return[]}}function vS(r){const e=document.getElementById("main-content");e.innerHTML=`
    <div class="blocked-lesson">
      <div class="blocked-icon">🔒</div>
      <h2>Lección bloqueada</h2>
      <p>${r}</p>
      <a class="btn-primary" href="#/plans">Ver planes</a>
      <a class="btn-secondary" href="#/lessons">Volver a lecciones</a>
    </div>
  `}function IS(){return["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"].map(e=>({day:e,xp:Math.floor(Math.random()*200)}))}gS();
