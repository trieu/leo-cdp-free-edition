# All Tag Codes for Ecommerce

## Leo CDP [Core JS loader]

* Go to Journey Data Hub -> Journey Data Flow
* Click Data Observer
* Find the Touchpoint Hub for data tracking, click the button "Tracking JS Code" to get all JS

## Track Event [item-view]

```
<script> 
  setTimeout(function(){
    if(typeof leoCdpTrackedProducts === "object") {
       leoCdpTrackedProducts.forEach(function (item) {
         var productId = item.productId;
         if (typeof productId === "string") {
           var idType = item.idType || "external_ID";
           var eventData = { "productIds": productId, "idType": idType};
           LeoObserver.recordEventItemView(eventData);
         }
       });
     } else {
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

## Update Contact Profile

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