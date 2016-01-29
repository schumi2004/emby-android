!function(){function e(){function e(e){e=$.extend(e,{userId:Dashboard.getCurrentUserId(),deviceId:ApiClient.deviceId(),accessToken:ApiClient.accessToken(),serverAddress:ApiClient.serverAddress(),receiverName:b.getFriendlyName()});var n=AppSettings.maxChromecastBitrate();n&&(e.maxBitrate=n),require(["chromecasthelpers"],function(n){n.getServerAddress(ApiClient).then(function(n){e.serverAddress=n,t(e)})})}function t(e){C.sendText(JSON.stringify(e))}function n(){var e={};return e.playerName=M,e.playableMediaTypes=["Audio","Video"],e.isLocalPlayer=!1,e.appName=M,e.supportedCommands=["VolumeUp","VolumeDown","Mute","Unmute","ToggleMute","SetVolume","SetAudioStreamIndex","SetSubtitleStreamIndex","DisplayContent","SetRepeatMode","EndSession"],e}function a(e){var t=n();return t.name=t.deviceName=e.getFriendlyName(),t.id=e.getId(),t}function o(e){e=(e||"").toLowerCase();var t=[];return t.push("nexusplayer"),t.filter(function(t){return-1!=e.replace(" ","").indexOf(t)}).length>0}function i(){return ConnectSDKHelper.getDeviceList().filter(function(e){return e.hasService(ConnectSDK.Services.Chromecast)||o(e.getModelName())||o(e.getFriendlyName())})}function r(){var e=A.lastPlayerData||{};return e=e.PlayState||{},null==e.VolumeLevel?100:e.VolumeLevel}function s(e){if("playbackerror"==e.type){var t=e.data;setTimeout(function(){Dashboard.alert({message:Globalize.translate("MessagePlaybackError"+t),title:Globalize.translate("HeaderPlaybackError")})},300)}else"connectionerror"==e.type?setTimeout(function(){Dashboard.alert({message:Globalize.translate("MessageChromecastConnectionError"),title:Globalize.translate("HeaderError")})},300):e.type&&0==e.type.indexOf("playback")&&Events.trigger(T,e.type,[e.data])}function u(e){s("string"==typeof e?JSON.parse(e):e)}function c(){}function l(e,t){C=e,e.setWebAppSessionListener(),b=t,D=t.getId(),A.lastPlayerData={},MediaController.setActivePlayer(M,a(t)),m()}function d(e,t,n){var a=t.acquire();a.on("message",u),a.on("disconnect",c),n||browserInfo.safari?a.connect().success(function(){l(a,e)}).error(f):l(a,e)}function m(){e({options:{},command:"Identify"})}function f(){p()}function p(){var e=C;e&&(e.off("message"),e.off("disconnect"),e.disconnect(),e.release(),C=null),A.lastPlayerData={}}function y(e){e.getWebAppLauncher().launchWebApp(x).success(function(t){d(e,t,!0)}).error(function(e){})}function g(e,t,n){e.getWebAppLauncher().joinWebApp(x).success(function(t){d(e,t,!1)}).error(function(a){return t?void g(e,!1,!0):void(n&&y(e))})}function v(e){C&&p(),g(e,!1,!0)}function h(e){e.off("ready"),A.lastPlayerData={},v(e)}function I(e,t){var n=C;n&&n.close();var a=b;a&&(e&&a.getWebAppLauncher().closeWebApp(x),a.disconnect()),p(),b=null,t||(D=null)}function P(e,t){var n=i().filter(function(t){return t.getId()==e})[0];n?A.tryPair({id:e}):t&&setTimeout(function(){P(e,!1)},2e3)}function S(){var e=D;e&&setTimeout(function(){P(e,!0)},0)}var C,b,D,A=this,M="Chromecast",x="2D4B1DA3";A.name=M,A.getItemsForPlayback=function(e){var t=Dashboard.getCurrentUserId();return e.Ids&&1==e.Ids.split(",").length?new Promise(function(n){ApiClient.getItem(t,e.Ids.split(",")).then(function(e){n({Items:[e],TotalRecordCount:1})})}):(e.Limit=e.Limit||100,e.ExcludeLocationTypes="Virtual",ApiClient.getItems(t,e))};var T={};Events.on(T,"playbackstart",function(e,t){var n=A.getPlayerStateInternal(t);Events.trigger(A,"playbackstart",[n])}),Events.on(T,"playbackstop",function(e,t){var n=A.getPlayerStateInternal(t);Events.trigger(A,"playbackstop",[n]),A.lastPlayerData={}}),Events.on(T,"playbackprogress",function(e,t){var n=A.getPlayerStateInternal(t);Events.trigger(A,"positionchange",[n])}),A.play=function(e){Dashboard.getCurrentUser().then(function(){e.items?A.playWithCommand(e,"PlayNow"):A.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(t){e.items=t.Items,A.playWithCommand(e,"PlayNow")})})},A.playWithCommand=function(t,n){return t.items?(t.items=t.items.map(function(e){return{Id:e.Id,Name:e.Name,Type:e.Type,MediaType:e.MediaType,IsFolder:e.IsFolder}}),void e({options:t,command:n})):void ApiClient.getItem(Dashboard.getCurrentUserId(),t.ids[0]).then(function(e){t.items=[e],A.playWithCommand(t,n)})},A.unpause=function(){e({command:"Unpause"})},A.pause=function(){e({command:"Pause"})},A.shuffle=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(e){A.playWithCommand({items:[e]},"Shuffle")})},A.instantMix=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(e){A.playWithCommand({items:[e]},"InstantMix")})},A.canQueueMediaType=function(e){return"Audio"==e},A.queue=function(e){A.playWithCommnd(e,"PlayLast")},A.queueNext=function(e){A.playWithCommand(e,"PlayNext")},A.stop=function(){e({command:"Stop"})},A.displayContent=function(t){e({options:t,command:"DisplayContent"})},A.mute=function(){e({command:"Mute"})},A.unMute=function(){A.setVolume(r()+2)},A.toggleMute=function(){var e=A.lastPlayerData||{};e=e.PlayState||{},e.IsMuted?A.unMute():A.mute()},A.getTargets=function(){return new Promise(function(e){e(i().map(a))})},A.seek=function(t){t=parseInt(t),t/=1e7,e({options:{position:t},command:"Seek"})},A.setAudioStreamIndex=function(t){e({options:{index:t},command:"SetAudioStreamIndex"})},A.setSubtitleStreamIndex=function(t){e({options:{index:t},command:"SetSubtitleStreamIndex"})},A.nextTrack=function(){e({options:{},command:"NextTrack"})},A.previousTrack=function(){e({options:{},command:"PreviousTrack"})},A.beginPlayerUpdates=function(){},A.endPlayerUpdates=function(){},A.volumeDown=function(){e({options:{},command:"VolumeDown"})},A.setRepeatMode=function(t){e({options:{RepeatMode:t},command:"SetRepeatMode"})},A.volumeUp=function(){e({options:{},command:"VolumeUp"})},A.setVolume=function(t){t=Math.min(t,100),t=Math.max(t,0),e({options:{volume:t},command:"SetVolume"})},A.getPlayerState=function(){return new Promise(function(e){var t=A.getPlayerStateInternal();e(t)})},A.lastPlayerData={},A.getPlayerStateInternal=function(e){return e=e||A.lastPlayerData,A.lastPlayerData=e,e},A.tryPair=function(e){return new Promise(function(t,n){var a=i().filter(function(t){return t.getId()==e.id})[0];a?A.tryPairWithDevice(a,t,n):n()})},A.tryPairWithDevice=function(e){e.on("disconnect",function(){e.off("ready"),e.off("disconnect")}),e.isReady()?h(e):(e.on("ready",function(){h(e)}),e.connect())},A.endSession=function(){A.stop(),setTimeout(function(){I(!0,!1)},1e3)},document.addEventListener("resume",S,!1)}MediaController.registerPlayer(new e)}();