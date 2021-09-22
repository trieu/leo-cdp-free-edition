# Changelog for LEO CDP

## [0.8.8] - 2021-09-22 18h

### Added new features 

- Ads By Leo CDP: auto update ranking of "add-to-cart" items
- optimize flow for ecommerce by tracking events in shopping cart
- the free quota of Leo CDP is 500 profiles
- merge Feedback Survey data into Profile data automatically
- allow start multiple leo-admin in a sample server (multiple hosts)
- add more survey template tags in Feedback Form Editor and Feedback Form Loader
- add Geolocation loader in feedback survey form to collect location data of profile
- UI: add checkbox "Delete all profiles in the segment" in delete segment modal box
- user can delete all profiles in segment if check on the checkbox "Delete all profiles"

### Updated backend

- add XssFilterUtil to filter all HTML tags and JS tags in raw data of FeedbackEvent 
- Event Metric in data funnel: save and delete
- Redis cache utils for LEO CDP: ObserverRedisCacheUtil, AdminRedisCacheUtil, SchedulerRedisCacheUtil
- add new methods in EventMetric: isMarketingMetric, isBusinessMetric, isExperienceMetric
- improve JobUpdateProfile
- improve FeedbackEvent model for Survey Analytics and Customer Analytics
- add ProfileAgeGroup to classify profile by age group

### Fixed bugs

- default UI for content hub leo-cdp
- fix GeoLocationUtil for Google Cloud Proxy, can not get correct IP
- the value of collectDirectly in Leo Observer should be checked 
- CSS width of survey preview is too small , set 1024px as default 
- fix XSS script hacked into eventData in customer-profile-info.html
- update profile funnel stage is not correctly, case happy-customer and returning-visitor

### Changed

- Profile Info UI: hide Event Data if no data
- update config to start leo-admin, can start with default httpRoutingConfigAdmin
- update ContactType in profile model to improve profile merge algorithm 
- rename graph from cdp_purchased_product_graph to Profile2Conversion
- rename edge collection from cdp_profile2purchasedproduct to cdp_profile2conversion
- remove totalEvent, rename totalScore into eventScore in ProfileGraphEdge
- rename groupIds to assetGroupIds in ProfileGraphEdge
- System Settings menu is put at the top for Admin Role
- rename forMarketingActivation to forSegmentDataActivation
- Profile Model, refactoring code and update: purchasedItemIds, shoppingItemIds, shoppingCartItems+-


---

## [0.8.7] - 2021-08-27

- fix critical issues when tracking touchpoint with no name
- improve level index for leo observer, default touchpoint hub update
- improve profile getting by primary keys, insert and update in background
- update shell script to start workers
- allow tracking purchase event without transaction code ID
- add synch product data from LEO Observer JS
- add checkbox: auto tracking option in JavaScript Code
- fix bugs update user info after user-login event
- update from baseAdminApi to baseLeoAdminUrl
- update use baseLeoAdminUrl to build full URL for QR code images
- allow set headline product image with file uploader, improve UI
- fix bugs check and create QR code image for asset templates: survey, landing page
- fix bugs survey UI to load proxy.min.js
- improve UX of admin dashboard
- improve UX of asset management, product editor

---

## [0.8.6] - 2021-08-16

- fix critical issues when direct input profile
- improve segment UI and UX: using tabs and activation buttons
- improve profile data merge algorithm to de-duplicate data
- improve CX Dashboard: Rating and Survey
- improve UI and UX of profile management, profile info and profile editor
- improve the backend of profile scoring and profile data management
- improve visual segment query builder
- add new Feedback Survey Report
- add accept-tracking in Journey Data Funnel
- add fields for profile model: Living City, Living State, Living Country, ZipCode, Keywords for Product Marketing, Next Best Actions
- add segment data activation:  synch data using connectors
- add 2 default data connectors: SendInBlue and MailChimp
- add model to detect all profiles in Shopping Cart Abandoners
- add Personalization Widget and the data API to show recommended items
- simplify the process to set-up new Leo CDP instance

---

## [0.8.5] - 2021-07-02

- add Event Data Dashboard
- add CX Data Dashboard
- improve Journey Data Funnel
- improve UI/UX Journey Data Flow, refactoring into using data model: Touchpoint Hub
- add Event Data Report of Profile
- add Customer Feedbacks UI Flow and backend
- add Data Purpose for Segmentation, improve UI/UX Segment Details, Segment Builder
- add Feedback Form Editor
- update UI System Configuration

---

## [0.8.3] - 2021-04-06

- CX plugins

---

## [0.8.2] - 2021-04-04

- CX metrics add for testing
- CX reporting in profile
- CX form to collect survey data

---

## [0.8.1] - 2021-03-26

- Add Loyalty point
- Improve Segmentation with profile type and scoring models
- refactoring profile scoring data
- remove Service Item, use only Product Item to store data of physical goods, digital goods and subscription services
- Exporting data of profiles in segment using CSV format
- add 2 fields in profile UI: date of birth and nationality

---

## [0.7.1] - 2020-09-25

- Init changelog file
- upgrade Java ArangoDB driver into version 6.7.5
- added support of `leotech.system.util.CaptchaUtil` for human verification at login and in `leotech.system.common.SecuredWebDataHandler`
- allow specifying LOCAL, DEV and PRO environment in `leotech.starter.MainHttpStarter` and `leotech.starter.LeoDataObserverStarter`
