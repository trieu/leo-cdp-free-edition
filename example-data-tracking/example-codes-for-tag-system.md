# All Tag Codes for Ecommerce

code snippets for this document https://knowledge.leocdp.net/2021/08/leo-cdp-and-google-tag-manager.html

## Leo CDP [Core JS loader]

* Go to Journey Data Hub -> Journey Data Flow
* Click Data Observer
* Find the Touchpoint Hub for data tracking, click the button "Tracking JS Code" to get all JS


## Track Code for Events [item-view] [page-view] [content-view]

```
<script> 
  setTimeout(function(){
    var checkLeoEventTracking = function(e) {
        // item-view for product analytics
        if(typeof e.siteName === "string" ) {
          var userUid = e.userUid || "";
          window.srcTouchpointName = encodeURIComponent(e.entityTitle || document.title);
          if(e.entityType === "commerce_product") { 
            var productId = e.entityUuid;
            if (typeof productId === "string") {
              var eventData = { "productIds": productId, "idType": "external_ID", "userUid": userUid};
              LeoObserver.recordEventItemView(eventData);
            }
          }
          // content-view for content analytics
          else if(e.entityBundle === "article") { 
              // content-view
              var contentId = e.entityUuid;
              if (typeof contentId === "string") {
                var eventData = { "keywords": keywords, "contentId": contentId, "userUid": userUid};
                LeoObserver.recordEventContentView(eventData);
              }
          }  
          // page-view for web analytics
          else {
            LeoObserver.recordEventPageView()
          }
        }
    }

    if( typeof window.dataLayer === "object" ) { 
      window.dataLayer.forEach(checkLeoEventTracking);  
    }
  },999)
</script>
```

## Track Code for Event [add-to-cart]

```
<script> 
    var leoCdpAddToCart = function(e) {
      if(e.entityType === "commerce_product") { 
        var productId = e.entityUuid;
        window.srcTouchpointName = encodeURIComponent(e.entityTitle || document.title);
        if (typeof productId === "string") {
          var userUid = e.userUid || "";
          var idType =  "external_ID";
          var quantity = 1;
          var currency = "VND";
          var eventName = "add-to-cart";
          var productItem = { "itemtId": productId, "idType": idType, quantity: quantity };
          
          var eventData = { "productIds": productId, "idType": idType, "userUid": userUid };
          var shoppingItems = [];
          shoppingItems.push(productItem);
          LeoObserverProxy.recordConversionEvent(eventName, eventData,"", shoppingItems,0, currency);
        }
      }
    }
    if( typeof window.dataLayer === "object" ) { 
      window.dataLayer.forEach(leoCdpAddToCart);  
    }
</script>
```

## Track Event [order-checkout]

```
<script> 
    var leoCdpOrderCheckout = function(e) {
      if(e.entityType === "commerce_product") { 
        var productId = e.entityUuid;
        window.srcTouchpointName = encodeURIComponent(e.entityTitle || document.title);
        if (typeof productId === "string") {
          var userUid = e.userUid || "";
          var idType =  "external_ID";
          var quantity = 1;
          var currency = "VND";
          var eventName = "order-checkout";
          var productItem = { "itemtId": productId, "idType": idType, quantity: quantity };
          
          var eventData = { "productIds": productId, "idType": idType, "userUid": userUid };
          var shoppingItems = [];
          shoppingItems.push(productItem);
          LeoObserverProxy.recordConversionEvent(eventName, eventData,"", shoppingItems,0, currency);
        }
      }
    }
    if( typeof window.dataLayer === "object" ) { 
      window.dataLayer.forEach(leoCdpOrderCheckout);  
    }
</script>
```

## Track Event [purchase]

```
<!-- Track Event [purchase] -->
<script>
    var leoCdpPurchase = function(e) {
      if(e.entityType === "commerce_product") { 
        var productId = e.entityUuid;
        var transactionId = e.transactionId || "";
        window.srcTouchpointName = encodeURIComponent(e.entityTitle || document.title);
        if (typeof productId === "string") {
          var userUid = e.userUid || "";
          var idType =  "external_ID";
          var quantity = 1;
          var currency = "VND";
          var eventName = "purchase";
          var productItem = { "itemtId": productId, "idType": idType, quantity: quantity };
          
          var eventData = { "productIds": productId, "idType": idType, "userUid": userUid };
          var shoppingItems = [];
          shoppingItems.push(productItem);
          LeoObserverProxy.recordConversionEvent(eventName, eventData, transactionId, shoppingItems, 0, currency);
        }
      }
    }
    if( typeof window.dataLayer === "object" ) { 
      window.dataLayer.forEach(leoCdpPurchase);  
    }
</script>
```