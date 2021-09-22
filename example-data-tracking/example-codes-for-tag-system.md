# All Tag Codes for Ecommerce

code snippets for this document https://knowledge.leocdp.net/2021/08/leo-cdp-and-google-tag-manager.html

## Leo CDP [Core JS loader]

* Go to Journey Data Hub -> Journey Data Flow
* Click Data Observer
* Find the Touchpoint Hub for data tracking, click the button "Tracking JS Code" to get all JS

## Example dataLayer (meta-data about event tracking) for Leo JS Tracking Code

### Event: page-view

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
    "siteName": "The name of ecommerce website",
    "entityCreated": "1581657801",
    "entityLangcode": "en",
    "entityStatus": "1",
    "entityUid": "1",
    "entityUuid": "6ddd407b-e12a-4a40-b9bf-e834dd052e3d",
    "entityBundle": "home_page",
    "entityTitle": "Home Page",
    "userUid": "372",
    "firstName": "Trieu", // if no login, set empty string
    "lastName": "Nguyen", // if no login, set empty string
    "email": "trieu@leocdp.com", // if no login, set empty string
    "phone":"+840903"
}); 
</script>
```

### Event: [content-view]

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
    "siteName": "The name of ecommerce website",
    "entityCreated": "1581657801",
    "entityLangcode": "en",
    "entityStatus": "1",
    "entityUid": "1",
    "entityUuid": "6ddd407b-e12a-4a40-b9bf-e834dd052e3d",
    "entityBundle": "article", // or "news" or "blog"
    "entityTitle": "The Solution to The Human Resources Problem in Young Enterprises",
    "userUid": "372",
    "firstName": "Trieu", // if no login, set empty string
    "lastName": "Nguyen", // if no login, set empty string
    "email": "trieu@leocdp.com", // if no login, set empty string
    "phone":"+840903"
}); 
</script>
```

### Event: [item-view]

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
    "siteName": "The name of ecommerce website",
    "entityCreated": "1581657801",
    "entityLangcode": "en",
    "entityStatus": "1",
    "entityUid": "1",
    "entityUuid": "6ddd407b-e12a-4a40-b9bf-e834dd052e3d",
    "entityBundle": "commerce_product", // default value for product item tracking
    "entityTitle": "High-tech Publication - Software Sector", // product name
    "entityQuantity": 1, // default number item in shopping cart
    "userUid": "372",
    "firstName": "Trieu", // if no login, set empty string
    "lastName": "Nguyen", // if no login, set empty string
    "email": "trieu@leocdp.com", // if no login, set empty string
    "phone":"+840903"
}); 
</script>
```

### Event: [add-to-cart]

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
    "siteName": "The name of ecommerce website",
    "entityCreated": "1581657801",
    "entityLangcode": "en",
    "entityStatus": "1",
    "entityUid": "1",
    "entityUuid": "6ddd407b-e12a-4a40-b9bf-e834dd052e3d",
    "entityBundle": "commerce_product", // default value for product item tracking
    "entityTitle": "High-tech Publication - Software Sector", // product name
    "entityQuantity": 1, // default number item in shopping cart
    "userUid": "372",
    "firstName": "Trieu", // if no login, set empty string
    "lastName": "Nguyen", // if no login, set empty string
    "email": "trieu@leocdp.com", // if no login, set empty string
    "phone":"+840903"
}); 
</script>
```

### Event: [order-checkout] and [purchase]

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
    "siteName": "The name of ecommerce website",
    "entityCreated": "1581657801",
    "entityLangcode": "en",
    "entityStatus": "1",
    "entityUid": "1",
    "entityUuid": "08d01865-f275-4b8d-bb9a-528f96b2bee0",
    "entityBundle": "commerce_product", // default value for product item tracking
    "entityTitle": "Talentnet-Mercer Local-plus Report 2021", // product name
    "entityQuantity": 1, // Quantity item in shopping cart
    "entityPrice": 38720000, // price of product
    "entityCurrency": "VND", // currency of product
    "userUid": "372"
}); 
window.dataLayer.push({
    "siteName": "The name of ecommerce website",
    "entityCreated": "1581657801",
    "entityLangcode": "en",
    "entityStatus": "1",
    "entityUid": "1",
    "entityUuid": "6ddd407b-e12a-4a40-b9bf-e834dd052e3d",
    "entityBundle": "commerce_product", // default value for product item tracking
    "entityTitle": "High-tech Publication - Software Sector", // product name
    "entityQuantity": 2, //  Quantity item in shopping cart
    "entityPrice": 77000000, // price of product
    "entityCurrency": "VND", // currency of product
    "userUid": "372"
});
</script>
```
---

## Set this Code when your website is loaded, after the Leo Tracking JS Code

```
<script> 
  setTimeout(function(){
    var checkLeoEventTracking = function(e) {
        // item-view for product analytics
        if(typeof e.siteName === "string" ) {
          // user info
          var userUid = e.userUid || "";
          var email = e.email || "";
          var firstName = e.firstName || "";
          var lastName = e.lastName || "";
          var phone = e.phone || "";
          
          window.srcTouchpointName = encodeURIComponent(e.entityTitle || document.title);
          if(e.entityType === "commerce_product") { 
            var productId = e.entityUuid;
            if (typeof productId === "string") {
              var eventData = { "productIds": productId, "idType": "external_ID"};
              eventData["primaryPhone"] = phone;
              eventData["primaryEmail"] = email;
              eventData["firstName"] = firstName;
              eventData["lastName"] = lastName;
              eventData["ecommerceUserId"] = userUid;
              LeoObserver.recordEventItemView(eventData);
            }
          }
          // content-view for content analytics
          else if(e.entityBundle === "article") { 
              // content-view
              var contentId = e.entityUuid;
              if (typeof contentId === "string") {
                var eventData = { "keywords": keywords, "contentId": contentId};
                eventData["primaryPhone"] = phone;
                eventData["primaryEmail"] = email;
                eventData["firstName"] = firstName;
                eventData["lastName"] = lastName;
                eventData["ecommerceUserId"] = userUid;
                LeoObserver.recordEventContentView(eventData);
              }
          }  
          // page-view for web analytics
          else {
            LeoObserver.recordEventPageView()
          }
        }
    }

    var leoCdpAddToCart = function(e) {
      if(e.entityType === "commerce_product") { 
        var productId = e.entityUuid;
        window.srcTouchpointName = encodeURIComponent(e.entityTitle || document.title);
        if (typeof productId === "string") {
          // user info
          var userUid = e.userUid || "";
          var email = e.email || "";
          var firstName = e.firstName || "";
          var lastName = e.lastName || "";
          var phone = e.phone || "";

          var idType =  "external_ID";
          var quantity = 1;
          var currency = "VND";
          var eventName = "add-to-cart";
          var productItem = { "itemtId": productId, "idType": idType, quantity: quantity };
          
          var eventData = { "productIds": productId, "idType": idType };
          eventData["primaryPhone"] = phone;
          eventData["primaryEmail"] = email;
          eventData["firstName"] = firstName;
          eventData["lastName"] = lastName;
          eventData["ecommerceUserId"] = userUid;

          var shoppingItems = [];
          shoppingItems.push(productItem);
          LeoObserverProxy.recordConversionEvent(eventName, eventData,"", shoppingItems,0, currency);
        }
      }
    }

    if( typeof window.dataLayer === "object" ) { 
      window.dataLayer.forEach(checkLeoEventTracking);

      // auto listen click event of addToCart button
      var addToCartSelector = 'input[class*="button--add-to-cart"]';
      var addToCartButton = document.querySelector(addToCartSelector);
      if(typeof addToCartButton === 'object' ) {
        addToCartButton.addEventListener("click", function(){
            window.dataLayer.forEach(leoCdpAddToCart);  
        });
      }
    }
  },999)
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
          // user info
          var userUid = e.userUid || "";
          var email = e.email || "";
          var firstName = e.firstName || "";
          var lastName = e.lastName || "";
          var phone = e.phone || "";

          var idType =  "external_ID";
          var quantity = 1;
          var currency = "VND";
          var eventName = "order-checkout";
          var productItem = { "itemtId": productId, "idType": idType, quantity: quantity };
          
          var eventData = { "productIds": productId, "idType": idType };
          eventData["primaryPhone"] = phone;
          eventData["primaryEmail"] = email;
          eventData["firstName"] = firstName;
          eventData["lastName"] = lastName;
          eventData["ecommerceUserId"] = userUid;

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
          // user info
          var userUid = e.userUid || "";
          var email = e.email || "";
          var firstName = e.firstName || "";
          var lastName = e.lastName || "";
          var phone = e.phone || "";

          var idType =  "external_ID";
          var quantity = 1;
          var currency = "VND";
          var eventName = "purchase";
          var productItem = { "itemtId": productId, "idType": idType, quantity: quantity };
          
          var eventData = { "productIds": productId, "idType": idType };
          eventData["primaryPhone"] = phone;
          eventData["primaryEmail"] = email;
          eventData["firstName"] = firstName;
          eventData["lastName"] = lastName;
          eventData["ecommerceUserId"] = userUid;

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