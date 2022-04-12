# Changelog for LEO CDP

## Feature Plan for the final release [1.0.0] - 2022-05-01

### TODO for version [1.0.0]

#### High priority

- [In Progress] Profile Finance Data Report
- [In Progress] Profile Journey Flow Report
- [In Progress] Segment Data Synch with time scheduler
- [In Progress] Profile Data Scoring with Jupyter notebook
- [In Progress] Segment Activation: sending email directly with SMTP from LEO CDP
- [In Progress] Can create new observed event in LEO CDP Admin

#### Low priority

- [In Progress] Segment Activation: sending web push notification directly from LEO CDP
- [In Progress] Segment Activation: sending SMS directly from LEO CDP
- [In Progress] Data Reporting with Jupyter notebook
- [In Progress] New Data Connector and connector protocol

## [0.9.0] - 2022-04-30

### Added 

- [Data Deduplication] merge context session keys for duplicated profiles
- [Data Segmentation] implement 2 new operators: data_filter_equals, data_filter_contains
- [UI] add sortable list by Data Quality Score, Journey Score and Updated At in Profile Data Management
- [SystemTrackedEvent] to tracking user account activities, login for security monitoring
- [Data Model] AbstractProfile
- [Data Authorization] improve security check for Segment model and Profile model
- [UI] add new authorized viewers and authorized editors in segment builder and details
- [UI] user login information
- [In Progress] BusinessAccount for B2B CDP

### Changed

- [UI] improve UI and UX of System Login
- Improve Data Authorization 
- [Scoring Rule] profile data quality scoring rule
- [UI] UI to show profile with data quality score > 200
- [UI] User Login Management

### Fixed 

- [UI] sorting fields in segment list

## [0.8.9] - 2022-04-05

### Added 

- save Touchpoint Name and URL in Tracking Event
- data segmentation with tracking event, touchpoint, device
- upgrade core java library deps
- upgrade system command-line tool
- Get CX tracking code at touchpoint hub
- new template survey "Khảo sát ý kiến người dùng về giao diện của website" to collect feedback data
- add new TouchpointHubType.INPUT_DATA_SOURCE: can import profile data directly from Redis
- [UI] segment: Data Activation Purposes
- [UI] profile: re-design UI and UX for better navigation
- [backend] segment: Data Activation with scheduled data job
- [Segment] Data Exporting and Data Connection
- Observer API: to import profile directly, push and pull event data using Server-to-Server API
- Custom Data Fields for profile model
- added STATE_CHECKED for TrackingEvent.state
- added imageUrls and videoUrls for TrackingEvent
- [IO] show event image in Event Data Stream of Profile, 
- [JavaScript] added lightbox2 as default library to zoom in images

### Fixed 

- [backend] segment dashboard should load data faster
- [backend] import profile with data validation rules
- [backend] save new profile from web is not worked
- [Login] User Session in Redis is expired, the Admin UI should let user login again

### Changed

- [UI] refresh segment data should update segment size and Reference Key in all matched profiles
- [UI] UI to track CX rating data
- [UI] upgrade chartjs version 3.7.1
- [UI] show highlight profile with data quality score from 25 points
- [UI] move personalization for segment into a separate tab
- [UI] improve UX of profile editor
- [UI] segment tabs
- [UI] main navigation menu
- [UI] improve usability of profile reporting and profile editor
- [UI] CX dashboard
- update new profile-default-avatar.png
- update ContactType : rename HUMAN_CONTACT to BUSINESS_CONTACT
- upgrade core Google, AWS libraries into latest versionn


## [0.8.8] - 2021-10-04

### Added new features 

- Ads By Leo: increase ranking "add-to-cart" items and decrease ranking "purchase" items
- optimize flow for ecommerce by tracking events in shopping cart
- the free quota of Leo CDP is 500 profiles
- merge Feedback Survey data into Profile data automatically
- allow start multiple leo-admin in a sample server (multiple hosts)
- add more survey template tags in Feedback Form Editor and Feedback Form Loader
- add Geolocation loader in feedback survey form to collect location data of profile
- UI: add checkbox "Delete all profiles in the segment" in delete segment modal box
- user can delete all profiles in segment if check on the checkbox "Delete all profiles"
- update profile info from Event Stream
- email marketing to send personalized product directly to contact
- Segment builder, new fields: referrerChannels, lastTouchpoint__name, lastTouchpoint__url, shoppingItemIds, purchasedItemIds
- Segment UI: allow sorting and search
- show locationCode in Profile Info and Profile Editor
- auto convert transaction event of product in VND to USD

### Updated backend

- add XssFilterUtil to filter all HTML tags and JS tags in raw data of FeedbackEvent 
- Event Metric in data funnel: save and delete
- Redis cache utils for LEO CDP: ObserverRedisCacheUtil, AdminRedisCacheUtil, SchedulerRedisCacheUtil
- add new methods in EventMetric: isMarketingMetric, isBusinessMetric, isExperienceMetric
- improve JobUpdateProfile
- improve FeedbackEvent model for Survey Analytics and Customer Analytics
- add ProfileAgeGroup to classify profile by age group
- upgrade query-builder java lib for new operators
- update new fields in DataFilter class: searchValue, sortField, sortAsc
- add new class CurrencyConverterUtil

### Fixed bugs

- default UI for content hub leo-cdp
- fix GeoLocationUtil for Google Cloud Proxy, can not get correct IP
- the value of collectDirectly in Leo Observer should be checked 
- CSS width of survey preview is too small , set 1024px as default 
- fix XSS script hacked into eventData in customer-profile-info.html
- update profile funnel stage is not correctly, case happy-customer and returning-visitor
- classified profile is more correctly

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
- upgrade jsonform 2.2.5 in Leo Feedback Survey, add form-background for UX in survey form

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
