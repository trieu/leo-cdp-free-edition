# All Tag Codes for Ecommerce

code snippets for this document https://knowledge.leocdp.net/2021/08/leo-cdp-and-google-tag-manager.html

## Leo CDP [Core JS loader]

* Go to Journey Data Hub -> Journey Data Flow
* Click Data Observer
* Find the Touchpoint Hub for data tracking, click the button "Tracking JS Code" to get all JS

## Track Event [user-login] and update contact profile for web visitor
```
<script>
  setTimeout(function(){
    var t1 = typeof window.leoCdpUpdateUserInfo;
    var t2 = typeof window.LeoObserverProxy;
    if(t1 === "object" && t2 === "object"){
      if(typeof leoCdpUpdateUserInfo["email"] === "string") {
        LeoObserverProxy.updateProfileBySession(leoCdpUpdateUserInfo)
      }
    } else {
       console.log("typeof leoCdpUpdateUserInfo" + t1);
       console.log("typeof LeoObserverProxy" + t2);
    }
  },2200)
</script>
```

## Track Events [item-view] [page-view] [content-view]

```
<script> 
  setTimeout(function(){
    if(typeof leoCdpTrackedProducts === "object") {
      // item-view for product tracking
       leoCdpTrackedProducts.forEach(function (item) {
         var productId = item.productId;
         if (typeof productId === "string") {
           var idType = item.idType || "external_ID";
           var eventData = { "productIds": productId, "idType": idType};
           LeoObserver.recordEventItemView(eventData);
         }
       });
     } 
     else if(typeof leoCdpTrackedContents === "object") {
       // content-view for specific content tracking
        leoCdpTrackedContents.forEach(function (node) {
         var contentId = node.contentId;
         if (typeof contentId === "string") {
           var keywords = node.keywords || "";
           var eventData = { "keywords": keywords, "contentId": contentId};
           LeoObserver.recordEventContentView(eventData);
         }
       });
     }
     else {
       // page-view
       LeoObserver.recordEventPageView()
     }
  },1000)
</script>
```

## Track Event [add-to-cart]

```
<script> 
  setTimeout(function(){
    if(typeof leoCdpTrackedProducts === "object") {
       leoCdpTrackedProducts.forEach(function (item) {
                var productId = item.productId;
                if (typeof productId === "string") {
                    var idType = item.idType || "external_ID";
                    var quantity = item.quantity || 1;
                    var currency = item.currency || "USD";
                    var eventName = "add-to-cart";
                    var model = { "itemtId": productId, "idType": idType, quantity: quantity };
                    
                    var eventData = { "productIds": productId, "idType": idType };
                    var shoppingItems = [];
                    shoppingItems.push(model);
                    LeoObserverProxy.recordConversionEvent(eventName, eventData,"", shoppingItems,0, currency);
                    console.log('leoTrackEventAddToCart', shoppingItems);
                }
       });
     }
  },1200)
</script>
```

## Track Event [order-checkout]

```
<script> 
  setTimeout(function(){
    if(typeof leoCdpTrackedProducts === "object") {
       leoCdpTrackedProducts.forEach(function (item) {
                var productId = item.productId;
                if (typeof productId === "string") {
                    var idType = item.idType || "external_ID";
                    var quantity = item.quantity || 1;
                    var currency = item.currency || "USD";
                    var eventName = "order-checkout";
                    var model = { "itemtId": productId, "idType": idType, quantity: quantity };
                    
                    var eventData = { "productIds": productId, "idType": idType };
                    var shoppingItems = [];
                    shoppingItems.push(model);
                    LeoObserverProxy.recordConversionEvent(eventName, eventData,"", shoppingItems,0, currency);
                    console.log('leoTrackEventAddToCart', shoppingItems);
                }
       });
     }
  },1200)
</script>
```

## Track Event [purchase]

```
<!-- Track Event [purchase] -->
    <script>
setTimeout(function(){
      if (typeof leoCdpTrackedProducts === "object") {
        leoCdpTrackedProducts.forEach(function (item) {
          var productId = item.productId;
          if (typeof productId === "string") {
            var idType = item.idType || "external_ID";
            var quantity = item.quantity || 1;
            var currency = item.currency || "USD";
            var eventName = "purchase";
            var model = { "itemtId": productId, "idType": idType, quantity: quantity };

            var eventData = { "productIds": productId, "idType": idType };
            var shoppingItems = [];
            shoppingItems.push(model);
            var transId = typeof window.transactionId === "string" ? window.transactionId : "";
            
            LeoObserverProxy.recordConversionEvent(eventName, eventData, transId, shoppingItems, 0, currency);
            console.log('leoTrackEventAddToCart', transId, shoppingItems);
          }
        })
      }
},1000)
</script>
```