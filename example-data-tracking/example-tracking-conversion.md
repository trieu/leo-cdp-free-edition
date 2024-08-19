# All Tag Codes for Ecommerce

code snippets for this document https://knowledge.leocdp.net/2021/08/leo-cdp-and-google-tag-manager.html

## Data Context

* You have a ecommerce website
* You imported all product metadata into LEO CDP Admin (Data Activation Hub -> Data Asset Categories -> Product Item Catalogs)
* Your product URL: https://example.com/eshop/high-tech-publication-software-sector
* The URI of product is the external_ID for data mapping

## Track Event [add-to-cart]

```javascript
var productId = location.pathname.replace("/eshop/","")
var idType = "external_ID";
var quantity =  1;
var currency =  "VND";
var eventName = "add-to-cart";

var transactionId = "";
var eventData = { "productIds": productId, "idType": idType };
var shoppingItems = [{ "itemId": productId, "idType": idType, quantity: quantity }];

LeoObserverProxy.recordConversionEvent(eventName, eventData,transactionId, shoppingItems,0, currency);
```

## Track Event [order-checkout]

```javascript
var productId = location.pathname.replace("/eshop/","")
var idType = "external_ID";
var quantity =  1;
var currency =  "VND";
var eventName = "order-checkout";

var transactionId = "";
var eventData = { "productIds": productId, "idType": idType };
var shoppingItems = [{ "itemId": productId, "idType": idType, quantity: quantity }];

LeoObserverProxy.recordConversionEvent(eventName, eventData,transactionId, shoppingItems,0, currency);
```


## Track Event [purchase] OK with verified transaction data

```javascript
var productId = location.pathname.replace("/eshop/","")
var idType = "external_ID";
var quantity =  1;
var currency =  "VND";
var eventName = "purchase";

var transactionId = "order-1234";
var eventData = { "productIds": productId, "idType": idType };
var shoppingItems = [{ "itemId": productId, "idType": idType, quantity: quantity }];

LeoObserverProxy.recordConversionEvent(eventName, eventData,transactionId, shoppingItems,0, currency);
```