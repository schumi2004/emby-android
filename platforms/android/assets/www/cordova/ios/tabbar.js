!function(){function a(a){if(c)return void(c=!1);switch(a){case"Favorites":Dashboard.navigate("favorites.html");break;case"Library":Dashboard.navigate("index.html");break;case"Search":Dashboard.navigate("search.html");break;case"NowPlaying":Dashboard.navigate("nowplaying.html");break;case"Sync":Dashboard.navigate("mysync.html");break;case"LiveTv":Dashboard.navigate("livetv.html");break;case"Settings":Dashboard.navigate("mypreferencesmenu.html?userId="+Dashboard.getCurrentUserId())}}function e(){for(var e=[{name:"Library",label:Globalize.translate("ButtonLibrary"),image:"tabbar/tab-library.png",options:{}},{name:"LiveTv",label:Globalize.translate("HeaderLiveTV"),image:"tabbar/tab-livetv.png",options:{}},{name:"Favorites",label:Globalize.translate("ButtonFavorites"),image:"tabButton:Favorites",options:{}},{name:"Search",label:Globalize.translate("ButtonSearch"),image:"tabButton:Search",options:{}},{name:"NowPlaying",label:Globalize.translate("ButtonNowPlaying"),image:"tabbar/tab-nowplaying.png",options:{}},{name:"Sync",label:Globalize.translate("ButtonSync"),image:"tabbar/tab-sync.png",options:{}},{name:"Settings",label:Globalize.translate("ButtonSettings"),image:"tabbar/tab-settings.png",options:{}}],t=0;t<e.length;t++){var n=e[t];TabBar.createItem(n.name,n.label,n.image,a,n.options)}TabBar.showItems(),b=!0,c=!0,TabBar.selectItem("Library")}function t(){b&&TabBar.show()}function n(a){return window.ApiClient?void ApiClient.getUserViews({},a.Id).then(function(e){i(a,e.Items)},function(){i(a,[])}):void i(a,[])}function i(a,e){var n=["Library"];e.filter(function(a){return"livetv"==a.CollectionType}).length&&n.push("LiveTv"),n.push("Favorites"),n.push("Search"),n.push("NowPlaying"),a.Policy.EnableSync&&Dashboard.capabilities().SupportsSync&&n.push("Sync"),n.push("Settings"),TabBar.showNamedItems(n),setTimeout(t,500)}function o(){Dashboard.getCurrentUserId()&&Dashboard.getCurrentUser().then(n)}function r(){if(b){var a=function(){TabBar.hide()};g?(g=!1,setTimeout(a,1e3)):a()}}function s(a,e,t){e.NowPlayingItem&&"Video"==e.NowPlayingItem.MediaType&&t.isLocalPlayer&&r()}function l(a,e,n){e.NowPlayingItem&&"Video"==e.NowPlayingItem.MediaType&&n.isLocalPlayer&&t()}var b=!1,c=!1,g=!0;e(),Events.on(ConnectionManager,"localusersignedin",function(a,e){n(e)}),Events.on(ConnectionManager,"localusersignedout",r),Events.on(MediaController,"beforeplaybackstart",s),Events.on(MediaController,"playbackstop",l),o()}();