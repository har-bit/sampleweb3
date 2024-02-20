"use strict";(self.webpackChunkreact_modal_quick_start=self.webpackChunkreact_modal_quick_start||[]).push([[734],{3379:e=>{e.exports=function(){let{mustBeMetaMask:e=!1,silent:t=!1,timeout:i=3e3}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(){if("boolean"!==typeof e)throw new Error("@metamask/detect-provider: Expected option 'mustBeMetaMask' to be a boolean.");if("boolean"!==typeof t)throw new Error("@metamask/detect-provider: Expected option 'silent' to be a boolean.");if("number"!==typeof i)throw new Error("@metamask/detect-provider: Expected option 'timeout' to be a number.")}();let n=!1;return new Promise((s=>{function a(){if(n)return;n=!0,window.removeEventListener("ethereum#initialized",a);const{ethereum:i}=window;if(!i||e&&!i.isMetaMask){const n=e&&i?"Non-MetaMask window.ethereum detected.":"Unable to detect window.ethereum.";!t&&console.error("@metamask/detect-provider:",n),s(null)}else s(i)}window.ethereum?a():(window.addEventListener("ethereum#initialized",a,{once:!0}),setTimeout((()=>{a()}),i))}))}},6503:(e,t,i)=>{i.d(t,{d:()=>s});var n=i(3411);class s extends n.J5{async init(e){this.chainConfig||(this.chainConfig=(0,n.h2)(n.EN.EIP155,1))}async authenticateUser(){if(!this.provider||this.status!==n.MP.CONNECTED)throw n.RM.notConnectedError();const{chainNamespace:e,chainId:t}=this.chainConfig,i=await this.provider.request({method:"eth_accounts"});if(i&&i.length>0){const s=(0,n.Cb)(i[0],this.name);if(s){if(!(0,n.$E)(s))return{idToken:s}}const a={domain:window.location.origin,uri:window.location.href,address:i[0],chainId:parseInt(t,16),version:"1",nonce:Math.random().toString(36).slice(2),issuedAt:(new Date).toISOString()},r=await(0,n.tV)(a,e),o=await this.provider.request({method:"personal_sign",params:[r,i[0]]}),h=await(0,n.rn)(e,o,r,this.name,this.sessionTime,this.clientId,this.web3AuthNetwork);return(0,n.Fr)(i[0],this.name,h),{idToken:h}}throw n.RM.notConnectedError("Not connected with wallet, Please login/connect first")}async disconnectSession(){super.checkDisconnectionRequirements();const e=await this.provider.request({method:"eth_accounts"});e&&e.length>0&&(0,n.qz)(e[0],this.name)}async disconnect(){this.rehydrated=!1,this.emit(n.n2.DISCONNECTED)}}},9734:(e,t,i)=>{i.d(t,{MetamaskAdapter:()=>h});var n=i(5305),s=i(3379),a=i.n(s),r=i(3411),o=i(6503);class h extends o.d{constructor(){super(...arguments),(0,n.Z)(this,"adapterNamespace",r.yk.EIP155),(0,n.Z)(this,"currentChainNamespace",r.EN.EIP155),(0,n.Z)(this,"type",r.hN.EXTERNAL),(0,n.Z)(this,"name",r.rW.METAMASK),(0,n.Z)(this,"status",r.MP.NOT_READY),(0,n.Z)(this,"metamaskProvider",null)}get provider(){return this.status!==r.MP.NOT_READY&&this.metamaskProvider?this.metamaskProvider:null}set provider(e){throw new Error("Not implemented")}async init(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(await super.init(e),super.checkInitializationRequirements(),this.metamaskProvider=await a()({mustBeMetaMask:!0,silent:!0,timeout:1e3}),!this.metamaskProvider)throw r.Ty.notInstalled("Metamask extension is not installed");this.status=r.MP.READY,this.emit(r.n2.READY,r.rW.METAMASK);try{r.cM.debug("initializing metamask adapter"),e.autoConnect&&(this.rehydrated=!0,await this.connect())}catch(t){this.emit(r.n2.ERRORED,t)}}async connect(){if(super.checkConnectionRequirements(),!this.metamaskProvider)throw r.RM.notConnectedError("Not able to connect with metamask");const{ethereum:e}=window,t=Boolean("isPhantom"in e);if(e&&e.isMetaMask&&t){if(e.providers&&e.providers.length>0){const t=e.providers.find((e=>e.isMetaMask&&!e.overrideIsMetaMask));t&&e.setProvider(t)}}else if(e&&(e.providers||[]).length>0){const t=e.providers.find((e=>e.isMetaMask));t&&e.setSelectedProvider(t)}this.status=r.MP.CONNECTING,this.emit(r.n2.CONNECTING,{adapter:r.rW.METAMASK});try{await this.metamaskProvider.request({method:"eth_requestAccounts"});const{chainId:e}=this.metamaskProvider;if(e!==this.chainConfig.chainId&&(await this.addChain(this.chainConfig,!0),await this.switchChain(this.chainConfig,!0)),this.status=r.MP.CONNECTED,!this.provider)throw r.RM.notConnectedError("Failed to connect with provider");const t=()=>{var e;this.disconnect(),null===(e=this.provider)||void 0===e||e.removeListener("disconnect",t)};return this.provider.on("disconnect",t),this.emit(r.n2.CONNECTED,{adapter:r.rW.METAMASK,reconnected:this.rehydrated}),this.provider}catch(i){if(this.status=r.MP.READY,this.rehydrated=!1,this.emit(r.n2.ERRORED,i),i instanceof r.up)throw i;throw r.RM.connectionError("Failed to login with metamask wallet")}}async disconnect(){var e;let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{cleanup:!1};await super.disconnectSession(),null===(e=this.provider)||void 0===e||e.removeAllListeners(),t.cleanup?(this.status=r.MP.NOT_READY,this.metamaskProvider=null):this.status=r.MP.READY,await super.disconnect()}async getUserInfo(){if(this.status!==r.MP.CONNECTED)throw r.RM.notConnectedError("Not connected with wallet, Please login/connect first");return{}}async addChain(e){var t;let i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];super.checkAddChainRequirements(e,i),await(null===(t=this.metamaskProvider)||void 0===t?void 0:t.request({method:"wallet_addEthereumChain",params:[{chainId:e.chainId,chainName:e.displayName,rpcUrls:[e.rpcTarget],blockExplorerUrls:[e.blockExplorer],nativeCurrency:{name:e.tickerName,symbol:e.ticker,decimals:e.decimals||18}}]})),this.addChainConfig(e)}async switchChain(e){var t;let i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];super.checkSwitchChainRequirements(e,i),await(null===(t=this.metamaskProvider)||void 0===t?void 0:t.request({method:"wallet_switchEthereumChain",params:[{chainId:e.chainId}]})),this.setAdapterSettings({chainConfig:this.getChainConfig(e.chainId)})}}}}]);
//# sourceMappingURL=734.dd3aeb3a.chunk.js.map