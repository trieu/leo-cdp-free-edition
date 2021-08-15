
if(typeof jQuery === 'undefined' ) {
	var jsSrc = 'https://code.jquery.com/jquery-3.5.1.min.js';
    var jsNode = document.createElement('script');
    jsNode.async = true;
    jsNode.src = jsSrc;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(jsNode, s);
}


function addLeoCdpPurchasingButton(source, productId, idType, selector) {
	console.log("addLeoCdpPurchasingButton",source, productId, idType);
	
	var leoBuyBtnStyle = 'button.leocdp_buy_btn { border: none; color: white; padding: 12px 30px; text-align: center; font-size: 18px; margin: 4px 2px; cursor: pointer;}';
	leoBuyBtnStyle += 'button.leocdp_buy_btn:hover{background-color:orange} button.leocdp_buy_btn:focus{background-color:gray} ';
	
	var holderNode = selector ? selector : jQuery("body");
	holderNode.prepend('<style> '+ leoBuyBtnStyle + '</style>');
	holderNode.prepend('<div id="leo_test_holder" style="padding:20px;text-align:right;"></div>');
	
	var btn = jQuery('<button class="leocdp_buy_btn" type="button" onclick="leoPurchasingSimulation(this)" style="background-color: #4CAF50" >Buy Button <br>(LEO CDP)</button> ');
	btn.data('source',source);
	btn.data('productId',productId);
	btn.data('idType',idType);
	jQuery('#leo_test_holder').append(btn)
}

// 
var crUrl = location.href;
var referrerUrl = document.referrer;

function leoPurchasingSimulation(node){
	var source = jQuery(node).data('source');
	var productId =  jQuery(node).data('productId');
	var idType =  jQuery(node).data('idType');
	
	jQuery(node).attr('disabled','disabled').css('background-color','#696969');
	console.log("leoPurchasingSimulation",source, productId, idType)
	
	var transactionId, shoppingCartItems;
	source = source.toUpperCase()
	transactionId = source+ "_demo_"+ new Date().getTime();
	shoppingCartItems = [{"itemtId": productId, "idType" : idType, quantity : 1}];
	leoTrackEventPurchasedOK(transactionId, shoppingCartItems);
	alert(' leoPurchasingSimulation source ' + source + ' transactionId ' + transactionId);
}

function dataTracking() {
	
	// Amazon 
	if(crUrl.indexOf('.amazon.com') > 0 ) {
		// item-view tracking
		 
		var placeYourOrder = jQuery('#placeYourOrder');
		var sessionProductId = localStorage.getItem('sessionProductId')
		var sessionIdType = localStorage.getItem('sessionIdType')
		
		if(crUrl.indexOf('/gp/product/') > 0 || crUrl.indexOf('/dp/') > 0 ) {
			var productId = jQuery('#printEditionIsbn_feature_div > div > div:nth-child(1) > span:nth-child(2)').text().trim();
			var idType = 'ISBN-13';
			if(productId === '') {
				var arr = jQuery('#detailBullets_feature_div ul:first li').text().trim().split('\n');
				arr.forEach(function(item, index){
					var toks = item.split('-');
					if( toks.length === 2 && item.length === 14 ) {
						if( parseInt(toks[0]) > 0) {
							productId = item;
						}
					}
				});
				if(productId === ''){
					productId = jQuery('input[name^="ASIN"]').val();
					idType = 'ASIN';
				}
			}
			console.log("Amazon productId " + productId)
			if(productId !== '') {
				
				leoTrackEventProductView([productId], idType);
				
				jQuery('#add-to-wishlist-button-submit').click(function(){
					leoTrackEventLikeProduct([productId], idType)
				})
				jQuery('#add-to-cart-button').click(function(){
					leoTrackEventAddToCart([productId], idType)
					
					localStorage.setItem('sessionProductId',productId)
					localStorage.setItem('sessionIdType',idType)
				});
				
				jQuery('#title').append('<div id="cx_demo"></div>')
				
				addFeedbackPlugin('cx_demo');
				
				var btnSelector = jQuery('#buyNow').parent().empty();
				if(btnSelector.length === 0){
					btnSelector = jQuery('#checkoutButtonId').parent();
				}
				addLeoCdpPurchasingButton('amazon', productId, idType, btnSelector);
				
			} else {
				leoTrackEventPageView();
			}
		} 
		else if(crUrl.indexOf('handlers/display.html')>0 && placeYourOrder.length === 1 
				&& typeof sessionProductId === 'string' && typeof sessionIdType === 'string') {
				addLeoCdpPurchasingButton('amazon', sessionProductId, sessionIdType, placeYourOrder.parent());
				placeYourOrder.remove()
				localStorage.removeItem('sessionProductId');
				localStorage.removeItem('sessionIdType');
		}
		// listing page tracking
		else {
			leoTrackEventPageView();
		}
		return true;
	} 
	
	// Neta Book 
	else if (crUrl.indexOf('https://www.netabooks.vn') === 0 ) { 
		// item-view tracking
		var selector = jQuery('div.product-price');
		if(selector.length > 0 && typeof dataLayer === "object" ) {
			dataLayer.forEach(function(e){ 
				if(e.ecomm_prodid) {
					console.log("dataLayer for ecomm ",e) 
					
					var productId = e.ecomm_prodid;
					var productPrice = e.ecomm_totalvalue;
					var idType = "external_ID";
					
					leoTrackEventProductView([productId], idType);
					
					addLeoCdpPurchasingButton('netabooks', productId, idType, $('a.btn-buy').parent());
					
					jQuery(".btn-addmore").click(function(){
						leoTrackEventAddToCart([productId], idType);
					})
				}
			});
		} 
		// listing page tracking
		else {
			leoTrackEventPageView();
		}
		return true;
	}
	
	// Shopee
	else if (crUrl.indexOf('https://shopee.vn') === 0) {
		
		var ldNodes = $('script[type="application/ld+json"]');
		
		// item-view tracking
		if(ldNodes.length > 1) {
			var productMetadata = JSON.parse(ldNodes[1].innerHTML)
			var idType = 'external_ID';
			var productId = productMetadata.productID;
			window.srcTouchpointName = encodeURIComponent(document.title);
			
			leoTrackEventProductView([productId], idType);
		}
		// listing page tracking
		else {
			leoTrackEventPageView();
		}
		return true;
	}
	
	// Manning Book Publisher
	else if (crUrl.indexOf('https://www.manning.com') === 0 ) { 
		// item-view tracking
		if(crUrl.indexOf('https://www.manning.com/books/') === 0 ) {
			if(typeof viewContentPayload === "object" ) {
				var idType = 'ISBN-13';
				var productId = viewContentPayload.isbn;
				
				leoTrackEventProductView([productId], idType);
				
				jQuery('button.add-to-cart').click(function(){
					leoTrackEventAddToCart([productId], idType)
					addLeoCdpPurchasingButton('manning', productId, idType);
				});
			}
		} 
		// listing page tracking
		else {
			leoTrackEventPageView();
		}
		return true;
	}
	
	// AEON shop
	else if (crUrl.indexOf('https://aeoneshop.com') === 0) {
		var arr = jQuery('span[class="pro_sku sku-pro"]').text().split(':');
		
		// item-view tracking
		if(arr.length === 2) {
			var idType = 'SKU';
			var productId = arr[1].trim();
			
			leoTrackEventProductView([productId], idType);
			
			jQuery('#add-cart-detail-fly').click(function(){
				leoTrackEventAddToCart([productId], idType)
			});
		}
		// listing page tracking
		else {
			leoTrackEventPageView();
		}
		return true;
	}
	
	// ACFC
	else if (crUrl.indexOf('https://www.acfc.com.vn') === 0) {
		
		if(crUrl.indexOf('.html') > 0 ) {
			var idType = 'SKU';
			var productId = jQuery('div[itemprop="sku"]').text().trim();
			if(productId !== '' ) {
				
				leoTrackEventProductView([productId], idType);
				
				jQuery('#product-addtocart-button').click(function(){
					leoTrackEventAddToCart([productId], idType)
				});
			}
		} else {
			leoTrackEventPageView();
		}
		return true;
	}
	
	// Phong Vu
	else if (crUrl.indexOf('https://phongvu.vn') === 0) {
		
		if(crUrl.indexOf('.html') > 0 ) {
			var idType = 'SKU';
			var ldJson = JSON.parse(jQuery('script[type="application/ld+json"]').text());
			var productId = ldJson.sku;
			if(productId !== '' ) {
				
				leoTrackEventProductView([productId], idType);
				
				jQuery('button[data-content-name="addToCart"]').click(function(){
					leoTrackEventAddToCart([productId], idType);
					
					addLeoCdpPurchasingButton('phongvu', productId, idType);
				});
			}
		} else {
			leoTrackEventPageView();
		}
		return true;
	}
	
	// YouTube
	else if (crUrl.indexOf('https://www.youtube.com') === 0) {
		
		if(crUrl.indexOf('https://www.youtube.com/watch') === 0 ) {
			var idType = 'YOUTUBE_VID';
			var arr = location.href.split('v=');
			if(arr.length > 0) {
				var videoId = arr[1].trim();
				
				if("G6eeR7wd58w" === videoId){
					var aNode = jQuery('<br> <a style="color:yellow" />').text("Aqua City").attr("href","https://datahub4talentnet.leocdp.net/ct/2nAhK6vM4doyZy9rZrMNjd");
					jQuery('h1[class="title style-scope ytd-video-primary-info-renderer"]').append(aNode);
				}
				
				var eventData = {"videoId": videoId,"idType":idType};
				
				leoTrackEventContentView(eventData);
				
				jQuery('#top-level-buttons .force-icon-button').first().click(function(){ 
					LeoObserverProxy.recordActionEvent("like", eventData);
				})
			}
		} else {
			leoTrackEventPageView();
		}
		return true;
	}
	
	// EDX
	else if( crUrl.indexOf('edx.org') > 0 ) {
		// demo for https://learning.edx.org/course/course-v1:AdelaideX+BigDataX+3T2017/home
		setTimeout(function(){
			if( crUrl.indexOf('learning.edx.org/course') > 0 ) {
				var npsBtn = '<a class="nav-item flex-shrink-0 nav-link" href="javascript:loadLeoFormNPS()" style="">NPS Survey</a>';
				jQuery('#main-content > div.course-tabs-navigation.mb-3 > div > nav').append(jQuery(npsBtn));
				
				// 
				if(jQuery('#unit-iframe').length === 1){
					loadLeoFormCSAT();
				}
			}
		},3000);
		
		//
		leoTrackEventPageView();
	}
	
	// VNUK
	else if( crUrl.indexOf('vnuk.udn.vn') > 0 ) {
		loadLeoFormCES();
		leoTrackEventPageView();
	}
	
	// talentnet
	else if( crUrl.indexOf('talentnet.vn') > 0 ) {
		leoTrackEventPageView();
		var name = jQuery('.user-nav-links a.nav-link:eq(1)').text();
		if(name === "Trieu Nguyen") {
			if( crUrl.indexOf('/events/') > 0 ) {
				var eventData = {}
				LeoObserverProxy.recordViewEvent("join-workshop", eventData);
			}
		}
	}
	
	// klook.com
	else if( crUrl.indexOf('klook.com') > 0 ) {
		var content = jQuery('meta[property="og:type"]').attr('content');
		var ldNodes = $('script[type="application/ld+json"]');
		
		if(content === "product" && ldNodes.length > 0){

			var idType = 'SKU';
			var productId = jQuery('meta[name="twitter:app:url:iphone"]').attr("content").replace('klook://activity/','');
			window.srcTouchpointName = encodeURIComponent(productMetadata.name);
			leoTrackEventProductView([productId], idType);	
		}
		else {
			leoTrackEventPageView();
		}
	}
	
	// ticketmaster.com
	else if( crUrl.indexOf('ticketmaster.com') > 0 ) {
		leoTrackEventPageView();
	}
	
	// aquacity.com.vn
	else if( crUrl.indexOf('aquacity.com.vn') > 0 ) {
		leoTrackEventPageView();
	}
	
	// --------- NEWS -----------
	
	// https://lifestyle.vn/nam-truffle-sieu-dat-do-am-thuc-thuong-luu-va-gioi-hoang-toc/
	else if( crUrl.indexOf('lifestyle.vn') > 0 ) {
		leoTrackEventPageView();
		showRecommenderBox(".td-is-sticky")
	}
	
	
	// https://vn.yahoo.com/
	else if( crUrl.indexOf('vn.yahoo.com') > 0 ) {
		leoTrackEventPageView();
		showRecommenderBox("#Aside")
	}

	else if (crUrl.indexOf('https://thanhnien.vn/') === 0 || crUrl.indexOf('https://vnexpress.net/') === 0 
			|| crUrl.indexOf('https://tuoitre.vn/') === 0 || crUrl.indexOf('https://medium.com/') === 0 ) {
		// pageview tracking
		leoTrackEventPageView();
		return true;
	}
	return false;
}

function leoObserverProxyReady(session) {
   //LEO JS is ready
   if( dataTracking() ) {
	   console.log("LEOCDP Chrome Test App, dataTracking is called OK ")
   } else {
	   console.log("LEOCDP Chrome Test App, dataTracking is called FAILED ")
   }
   initCaptureAllClickEventsInPage();
}

/// LEO OBSERVER CODE

(function() {
    // LEO Web Code for channel: Affiliate Marketing
	window.leoObserverLogDomain = "datahub4talentnet.leocdp.net";
	window.leoObserverCdnDomain = "datahub4talentnet.leocdp.net/public";
	
	if(location.hostname.indexOf("talentnet.vn")>=0){
		window.leoObserverId = "4FCDZnHwU4EaNyYkRe8JLU";
	}
	else {
		window.leoObserverId = "4sdIIrlvJtgTD3PZcFqE2T";
	}
	
	
	
	window.srcTouchpointName = encodeURIComponent(document.title);
	window.srcTouchpointUrl = encodeURIComponent(location.href);

	var leoproxyJsPath = '/js/leo-observer/leo.proxy.js';
    var src = location.protocol + '//' + window.leoObserverCdnDomain + leoproxyJsPath;
    var jsNode = document.createElement('script');
    jsNode.async = true;
    jsNode.src = src;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(jsNode, s);
})();

function leoTrackEventPageView() {
	LeoObserverProxy.recordViewEvent("page-view");
}

function leoTrackEventContentView(eventData) {
	if(typeof eventData === "object") {
		LeoObserverProxy.recordViewEvent("content-view", eventData);
	} else {
		console.log('Invalid params for leoTrackEventContentView')
	}
}

function leoTrackEventProductView(productIdList, idType) {
	if(typeof productIdList === "object" && typeof idType === "string") {
		var productIds = productIdList.join(";");
		var eventData = {"productIds": productIds, "idType":idType};
		console.log('leoTrackEventProductView', eventData)
		LeoObserverProxy.recordActionEvent("item-view", eventData);
	} else {
		console.log('Invalid params for leoTrackEventProductView')
	}
}

function leoTrackEventLikeProduct(productIdList, idType) {
	if(typeof productIdList === "object" && typeof idType === "string") {
		var productIds = productIdList.join(";");
		var eventData = {"productIds": productIds, "idType":idType};
		console.log('leoTrackEventLikeProduct', eventData)
		LeoObserverProxy.recordActionEvent("like", eventData);
	} else {
		console.log('Invalid params for leoTrackEventLikeProduct')
	}
}

function leoTrackEventAddToCart(productIdList, idType) {
	if(typeof productIdList === "object" && typeof idType === "string" ) {		
		var productIds = productIdList.join(";");
		var eventData = {"productIds": productIds, "idType":idType};
		var shoppingCartItems = [];
		productIdList.forEach(function(productId) {
			shoppingCartItems.push({"itemtId": productId, "idType" : idType, quantity : 1})
		})
		LeoObserverProxy.recordConversionEvent("add-to-cart", eventData , "", shoppingCartItems, 0, "USD");
		console.log('leoTrackEventAddToCart', shoppingCartItems)
	} else {
		console.log('Invalid params for leoTrackEventAddToCart')
	}
}

function leoTrackEventOrderCheckout(productIdList, idType) {
	if(typeof productIdList === "object" && typeof idType === "string" ) {
		var productIds = productIdList.join(";");
		var eventData = {"productIds": productIds, "idType":idType};
		var shoppingCartItems = [];
		productIdList.forEach(function(productId) {
			shoppingCartItems.push({"itemtId": productId, "idType" : idType, quantity : 1})
		})
		LeoObserverProxy.recordConversionEvent("order-checkout", eventData , "", shoppingCartItems, -1, "USD");
		console.log('leoTrackEventOrderCheckout', shoppingCartItems)
	} else {
		console.log('Invalid params for leoTrackEventOrderCheckout')
	}
}

function leoTrackEventPurchasedOK(transactionId, shoppingCartItems) {
	if( typeof transactionId === "string"  && typeof shoppingCartItems === "object") {
		console.log('leoTrackEventPurchasedOK', transactionId, shoppingCartItems)
		LeoObserverProxy.recordConversionEvent("purchase", {} , transactionId, shoppingCartItems, -1, "USD");
	} else {
		console.log('Invalid params for leoTrackEventPurchasedOK')
	}
}

function loadLeoFormCES(){
	var svf = document.title;
	var tprefurl = location.href;
	var url  = 'https://demotrack.leocdp.net/webform?tprefurl=' + tprefurl + '&svt=CES&_t=' + new Date().getTime();
	var iframe = '<div class="leocdp_iframe" > <iframe class="leocdp_iframe_small" src="'+url+'"></iframe> </div>';
	jQuery('#kingster-page-wrapper > div.kingster-bottom-page-builder-container.kingster-container > div > div > div > div.kingster-single-social-share.kingster-item-rvpdlr').append(iframe)
}

function loadLeoFormCSAT(){
	var svf = document.title;
	var tprefurl = location.href;
	var url  = 'https://demotrack.leocdp.net/webform?tprefurl=' + tprefurl + '&svt=CSAT&_t=' + new Date().getTime();
	var iframe = '<div class="leocdp_iframe_container"> <iframe class="leocdp_iframe_responsive" src="'+url+'"></iframe> </div>';
	
	jQuery('div.unit-iframe-wrapper').append(iframe)
}

function loadLeoFormNPS(){
	var svf = document.title;
	var tprefurl = location.href;
	var url  = 'https://demotrack.leocdp.net/webform?tprefurl=' + tprefurl + '&svt=NPS&_t=' + new Date().getTime();
	var iframe = '<div class="leocdp_iframe_container"> <iframe class="leocdp_iframe_responsive" src="'+url+'"></iframe> </div>';
	jQuery('#main-content > div.container-fluid').html(iframe)
}


function initCaptureAllClickEventsInPage() {
	window.captureEvents(Event.CLICK);
  	window.onclick = function(e){
  		var domain = 'https://shopee.vn';
  		if(e.path[0] && crUrl.indexOf(domain) === 0 ) {
  			var clickPath = getDomNodeSelector(e.path[0]);
  			console.log( clickPath )
  			var html = "<h3 style='font-size:18px'>Leo Observer, tracking clicked element: "+clickPath+"</h3>";
  	  	  	jQuery("body").prepend(html)
  	  	  			
  			var idxBtn =  clickPath.lastIndexOf("button>");
  			if(idxBtn >= 0){
  				idxBtn += "button".length;
  				var clickPathButton = clickPath.substr(0,idxBtn);
  				console.log( clickPathButton )
  	  	  		// TODO
  	  	  		var autoClickTrackingMap = {"html>body>div>div>div>div>div>div>div>div>div>div>div>button":true}
  	  	  		if( autoClickTrackingMap[clickPathButton]) {
  	  	  			var html = "<h1 style='font-size:24px'>Leo Observer, tracking clicked button : "+clickPathButton+"</h1>";
  	  	  			jQuery("body").prepend(html);
  	  	  			
  	  	  			// Shopee add-to-cart
	  	  	  		
	  	  			var ldNodes = $('script[type="application/ld+json"]');
	  	  			// item-view tracking
	  	  			if(ldNodes.length > 1) {
	  	  				var productMetadata = JSON.parse(ldNodes[1].innerHTML)
	  	  				var idType = 'external_ID';
	  	  				var productId = productMetadata.productID;
	  	  				window.srcTouchpointName = encodeURIComponent(document.title);
	  	  				leoTrackEventAddToCart([productId], idType);
	  	  			}
		  	  		
  	  	  		}
  			}
  	  		
  		}
  	}
}
	
function getDomNodeSelector(context) {
	let index, pathSelector, localName;

  	if (context == null || context == "null") throw "not an dom reference";
  	// call getIndexDomNode function
  	index = getIndexDomNode(context);

  	while (context.tagName) {
	  	// selector path
	  	pathSelector = context.localName + (pathSelector ? ">" + pathSelector : "");
    	context = context.parentNode;
  	}
  	// selector path for nth of type
  	pathSelector = pathSelector + `:nth-of-type(${index})`;
  	return pathSelector;
}

// get index for nth of type element
function getIndexDomNode(node) {
	let i = 1;
	let tagName = node.tagName;
	while (node.previousSibling) {
		node = node.previousSibling;
		var check = tagName.toLowerCase() == node.tagName.toLowerCase();
		if ( node.nodeType === 1 && check ) {
			i++;
		}
	}
	return i;
}

function showRecommenderBox(selectorStr){
	setTimeout(function(){
		LeoObserverProxy.synchLeoVisitorId(function(vid) {
			// url
			var cb = Math.floor(Math.random() * 100000);
			var src = "https://demotrack.leocdp.net/ris/html/products?visid=" + vid;
			src += ("&tpurl=" + encodeURIComponent(location.href) );
			src += ("&cb=" + cb );
			// width and height
			var h = '700px';
			var w = '300px';
			// append DOM
			var f = document.createElement('iframe');
			f.setAttribute("src", src);
			f.setAttribute("style", "width:"+w+"; height:"+h+"; overflow-y:scroll; margin:auto; display:block; border:none;");
			f.setAttribute("frameBorder", "0");
			var s = document.getElementById('leo_recommender_box');
		    s.parentNode.insertBefore(f, s);
		})
	},860);
	var s = jQuery(selectorStr).empty().append(jQuery('<div id="leo_recommender_box" ></div>'));
	s.css("background-color","#fff").css("position","sticky").css("top","90px")
}

function addFeedbackPlugin(domId){
	//  Feedback/Survey Form Collector for Customer Feedback Score (CFS) form
    var svf = document.title;
	var tprefurl = location.href;
	var tplFeedbackType = "RATING";
	
	var url  = 'https://datahub4talentnet.leocdp.net/webform?tplid=3fAuyEgUn0OncHFlO7tnxu';
	url = url + "&tplfbt=" + tplFeedbackType;
	url = url + "&tpname=" + encodeURIComponent(document.title);
	url = url + "&tpurl=" + encodeURIComponent(location.href);
	url = url + "&cb=" + new Date().getTime();
	
	// container
	var divWrapper = document.createElement("div"); 
	var cssDiv = "position: relative; width:100%; overflow: hidden;  height: 100px ";
	divWrapper.setAttribute("style",cssDiv);
	
	// iframe 
	var iframe = document.createElement("iframe"); 
	var cssIframe = "position: absolute; top:0; left:0; bottom:0; right:0; width:100%; border: none; overflow: hidden; height: 100px ";
	iframe.setAttribute("style",cssIframe);
	iframe.setAttribute("src",url);
	divWrapper.appendChild(iframe);
	
	var referenceNode = document.getElementById(domId);
	referenceNode.parentNode.insertBefore(divWrapper, referenceNode.nextSibling);
}