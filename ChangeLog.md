# Changelog for LEO CDP

## TODO Feature Plan for the next release 2022-11-06

- [Done] import tool to upload event data as CSV file in LEO CDP Admin
- [In Plan => 2022-11-07] new UI for journey map report

## Feature Plan for the final beta release 1.0 - 2024-05-13

#### Tasks

- [In Plan] Automated Campaign
- [In Plan] Using Jupyter notebook to update profile CLV, RFM score and Credit Scoring 
- [In Plan] LEO Tag JS to link FB user and Google user
- [In Plan] Segment Activation: sending email directly with SMTP from LEO CDP
- [In Plan] Custom Dashboard using Apache Superset
- [In Plan] System User Notification when a campaign / segment is updated or created
- [In Plan] web form in leocdp.com for new clients, to try free LEO CDP version with docker
- [In Plan] use cases for retail, education and media
- [In Plan] video, slide and update document for version 1.0
- [In Plan] Apply RFM model https://github.com/USPA-Technology/crm-rfm-modeling

#### Make 8 videos to learning LEO CDP quickly 

* LEO CDP 101 for data-driven business https://www.youtube.com/watch?v=vkETmFDUor4
* How to Unify Customer Data : https://www.youtube.com/watch?v=ejpOKE1bQCs
* How to deliver personalized web experiences: https://www.youtube.com/watch?v=mzWkTZqxvHs
* How to send personalized email with SendInBlue and LEO CDP
* How to build personalized communication with OneSignal and LEO CDP
* How to do data science with Google Colab and LEO CDP
* How to setup LEO CDP
* How to monitor system

## [0.9.0] - 2024-07-20

### Added

- [API] save purchase event with application ID, transaction Status (tsstatus) and message
- [User Login] add show password checkbox
- [Core CDP] set leoCdpLicenseKey=free_for_dataism as default for FREE VERSION
- [Asset Item] search by name for product items, content items, slides, template 
- [Event API] add new parameters: tsdiscount (TRANSACTION_DISCOUNT) , tspayment (TRANSACTION_PAYMENT)
- [Data Source] add process webhook event from Zalo OA: save profile, follow and unfollow event
- [Core CDP] add webhook to receive data from third-party data sources: KiotViet, Zalo, Facebook
- [Profile] add getBySocialMediaIds for the save profile API, data from Facebook, Zalo or Tiktok
- [Core] add core AutomatedFlow Java models
- [Campaign] add MarketingAutomation, parsing JSON of Automated Flow Rules
- [Campaign UI] show automated flow using mermaid.js
- [Admin UI] show menu user guide
- [Campaign] UI to listing campaigns
- [Profile] show duplicate profile to merge data manually
- [Segment] new operators to compare the date of birth of profile with current date
- [Segment] add event tracking date filters
- [Profile] can view profile details using Visitor ID
- [LEO ChatBot] using Visitor ID in profile as chatbot session
- [LEO ChatBot] using Google PaLM 2 as default AI model
- [Profile] can filter tracking events by touchpoint's name, using ArangoDB query
- [Profile2Product] add discount and discountCode for dynamic pricing model 
- [Profile List] add filter by CRM ID and Fingerprint ID (FingerprintJS)
- [Feedback Survey] Collect feedback data in shared devices, automatically create new profile when submit feedback form
- [DailyReportUnit] add year, month, day and hour as attributes to build reports
- [Profile] a profile can be verified in Leo Admin to improve data quality score
- [Segment] a segment can be applied jupyter notebook for CLV scoring, RFM scoring and advanced analytics
- auto tracking links and buttons for leo data observer
- [Text Editor] can convert markdown code to HTML, when copy from ChatGPT or Bing Chat
- [Segment UI] add button to remove all recommended contents / products
- add shell script to start a cluster of ArangoDB
- [Leo Bot] can create new presentation from answer
- [Digital Asset] add presentation group, add presentation editor and viewer
- [Leo Bot] can create new content from answer
- [Leo Bot] add chatgpt as personal assistant
- [LeoCdpLicense] simplify process to easier upgrade
- [Data Service] New data connector protocol
- [Data Service] tool for administration; create, update and delete a connector
- [Data Service] Data Activation with time scheduler
- [Data Service] add EmailMarketingConnector

### Fixed

- [Profile] can not remove selected profiles in CDP admin
- [Segment] fix show update time in local format of profile in segment 
- [CDP Admin] improve and fix bugs when Ajax load large JSON (profiles in segment)
- [Segment] improve performance when query and load macthed profiles in segment
- [Tracking Event] fix bugs when save data from API
- [Segment] do not load all product items, use input text 
- [Profile] fix and improve show ordered items of purchase action event in Profile
- [Core CDP] fix and improve GeoLocation Service
- [Core CDP] fix and improve the processor of Webhook Data Event
- [Core CDP] update profile from web session with only email or phone
- [Core CDP] fix bugs data deduplication
- [Core CDP] check webhook URL with secured token, fix bugs
- [Profile API] update to save profile with social media profile Id, application Id, loyalty Id
- [Profile API] update error message, can not save profile with email and phone, save from specified event observer
- [De-duplication] fix Top duplicate profiles and refactoring code
- [User Authorization]
- [Data Deduplication] improve UI UX in profile list and profile info
- update and ranking
- check status of Activation Rule before run a scheduled job
- fix bugs update profile for non-admin system user 
- fix and improve LEO Chatbot, the smart assistant for end-user
- load event data of profile, with selected journey ID
- all event data with SCORING_PROSPECT_METRIC must update prospect score in profile
- fix when search profile by keywords
- fix and improve UI UX of LEO Chatbot to answer question, create content and presentation
- add rel="noreferrer" in ahref to avoid add referrer from admin domain
- fix when update profile in Admin
- fix bug Last-seen Touchpoint + sorting profile meta data
- improve UI/UX, fix search and filter tracking events in profile report, 
- fix filter profiles with date, type and ID
- fix & code refactoring: ProfileApiHandler and EventApiHandler
- [Profile] set secondaryPhones and secondaryEmails from API should parse as a token list
- [Profile] fix and improve auto merge duplicated profile automatically
- [Profile] the length of profile.notes only have maximum 3000 characters
- [Tracking Event] must set state = 1 before insert event into database
- fix bugs and improve performance of reports in journey flow and profile
- fix and improve performance of reports in dashboard and profile reports
- fix bugs duplicated lead score when merge duplicated profiles
- fix slow performance when loading profile details and reports
- fix bugs for presentation item viewer
- fix bugs for content personalization
- fix bugs set headline images in content post
- fix bugs when upgrade SendInBlue (Brevo) sib-api-v3-sdk to version 7.0.0
- fix bugs: list system user for admin management and data authorization
- improve UI and UX: User Login Editor, Info and listing
- fix bugs show recommended contents for end-user
- fix bugs: show data connector only for admin and superadmin

### Changed

- [Profile Info] improve UI UX to show Journey Maps, Segment and Labels of profile 
- [Observer] add fields: jobTitles, personalProblems when update profile from web
- [CDP Admin] improve UI of profile and segment
- [Profile] merge profile scores (totalCreditScore,totalTransactionValue...) from external scoring model, non-computable from Event Metric
- [Product] improve import data
- [Segment] Authorized user can export profile or connect to segment raw JSON data
- [Core] update setup document
- [Core] remove easy-rules java lib, add MVEL for dynamic rules in campaign
- [Campaign] refactoring model
- [Profile] UI of report
 -[System User Login] update capcha text generation
- [Profile] improve UI UX of profile
- [Core CDP] refactoring to support SaaS
- [Profile] improve UI UX of profile
- [Journey Map] improve UI UX 
- [Profile] update UI to show profile scores, prepare show score report of journey map
- [Profile] do not merge profile automatically when save profile from web sources
- [Profile] improve UI and UX of profile filter
- [Activation] improve UI UX of activation rules
- [Activation] using Java quartz-scheduler as main backend for job scheduling
- the Event Time Series is default report of profile details
- Leo Observer JS should tracking action event and send data using HTTP POST
- improve UI UX of Admin system: all save buttons must in the same style
- improve UI UX of Leo Chatbot
- upgrade user_agent_parsers
- [profile] show purchased items directly in profile info
- refactoring [Data Connector] to [Data Service] to scale customer data computation in multiple ways
- add View link for asset items in group details
- update UI/UX of content item 
- add more fields in profile data quality scoring 
- improve UI/UX of profile info, system login
- improve UI/UX of asset group and profile reports 
- upgrade javascripts of admin, remove sortablejs
- update TouchpointType, change from LEO_DATABASE to DATA_OBSERVER
- improve UI of filtering profiles by dates
- update UI of Data Journey Map, improve UX
- improve UI UX of event metric management and event daily report
- no auto merge duplicated profiles, user should do this action in admin manually
- refactoring javascript in customer-journey-flow.html
- skip how leo-bot when no config httpLeoBotDomain
- show profile funnel as default report in admin dashboard
- improve raw HTML editor of product, content, presentation 
- upgrade codemirror from 5.65.13 to 6.65.7
- improve UI and UX of content editor, product editor
- upgrade core Java libraries
- upgrade arangodb java driver
- update init-connector-configs.json when setup new system
- [Data Service] update UI and UX for easier administration
- [Segment] update UX and UI of data activation in segment
- [Profile] load data from all journey, then filter

## [0.8.9] - 2023-01-12

### Added

- [Data Journey Map] QR code touchpoint hub
- [profile list] filter By Segment Name
- [Data Journey Map] generate access token API for all event observers, improve UI observer
- [Profile Deduplication] can use a profile as primary data source to deduplicate and merge
- [Profile Search] can enter keywords and search by email or phone
- [Profile Import] can set Touchpoint Hub for imported profile 
- [Product Calalog] refactoring tracking purchased products, shopping products
- [Data Journey Map] load report data from the graph of Profile and Touchpoint Hub, improve UI report of journey
- [Touchpoint Data Hub] save event in graph, add graph Profile2TouchpointHub
- [Data Journey Map] show report
- [Profile List] can filter by visitor or lead or customer
- [Data Journey Map] improve UI and add 3 touchpoint hubs: Visitor Report, Lead Report, Customer Report
- [Profile] link Google Analytics and LEO CDP: mapping visitor to user id
-  Show report in Data Journey Map
- [static file] improve performance, need to set enableCachingViewTemplates=true in leocdp-metadata.properties
- [Profile Import] add option overwriteOldData to clear old data and update new personal information
- [Profile] import tracking events with CSV file and improve UI/UX of profile editor
- [Profile Editor] add notes as new data field, improve UX/UI
- [Short URL Link] user can subscribe newsletter form before going to the landing page 
- [Survey] export CX rating data as CSV file
- [Survey Form] can add custom CSS in the head tag of HTML
- [User Login] save and load, select multiple user groups
- [Data Personalization] add recommended items and can remove recommended items in segment and asset group
- [Event Data Report] filter event time series by journey map and event matrix report
- [Profile Report] add event matrix report
- [Journey Report] using chartjs-chart-matrix for data journey reporting (https://chartjs-chart-matrix.pages.dev/samples/category.html)
- [Digital Asset] add contact lead form to collect profile data
- [Profile Editor] admin can add or remove a data journey map of a specific profile
- [Login Account Editor] manage viewable and editable profiles, manage viewable and editable segments, manage authorization of journey map
- [Profile UI] add checkbox to select and delete profile in list
- [Profile Model] add field: permanentLocation
- [Data Journey Map] update authorization of journey, load authorized journey in Account Login Editor
- [Profile] admin can delete non-active profiles with 1 button, import data auto find and set saleAgentEmail 
- [Report] add touchpoint flow network in profile info, default dashboard
- [Report] add bar chart for Engaged Touchpoint, Touchpoint Observer, Event Metric and Referral Channel
- [Report] add journey map report in profile
- [Report] add Observer Report in main dashboard
- [LEO Data Pipeline] implement to process batch data from kafka and write data into database
- [Event Metric] add showInObserverJS to show/hide event tracking JS method in Leo Observer JavaScript
- [Data Funnel] add STAGE_TERMINATED_CUSTOMER
- [DEVOPS] add kafdrop as UI tool to monitor Kafka 
- [Profile Model] add new field: applicationIds
- [Touchpoint] data query and reporting in admin dashboard
- [Chrome Ext] test data observer in sandbox
- [Data Journey] main report and profile
- [Data Journey] can manage multiple journey map for a customer profile
- [Data Processor] observer can save tracking event in Kafka, data is processed in different worker
- [LEO JS SDK] parse UTM data and mapping into profile data model
- [Profile] support compute data quality using saved profile attribute configs
- [UI] can not delete profile that has event data stream
- [UI] Filter by profile status
- [Data Deduplication] merge context session keys for duplicated profiles
- [Data Segmentation] implement 2 new operators: data_equals, data_contains
- [UI] add sortable list by Data Quality Score, Journey Score and Updated At in Profile Data Management
- [SystemEvent] to tracking user account activities, login for security monitoring
- [Data Model] AbstractProfile
- [User Authorization] improve security check for Segment model and Profile model
- [Authorization] add 2 new roles: customer data viewer and editor, add SystemUserRole
- [Profile] add secondary emails and phones when merge duplicated profile data
- [Profile] add industryDataModels in leocdp-metadata.properties to show profile data for specific industry
- [Data Asset] add Short URL Link as new asset category
- [Event]  save Touchpoint Name and URL in Tracking Event
- [Segment] add new authorized viewers and authorized editors in segment builder and details
- [Segment]  data segmentation with tracking event, touchpoint, device
- [Java Lib] upgrade core java library deps
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

- refactoring and optimize profile identity resolution
- [Data Journey] fix bugs when tracking short-link-click, load observer from media unit
- [Asset Item] can not save and update keywords , sort by updatedAt field
- [Journey Map] can not save data with totalProfile is null
- [Event Reporting] improve AQL for performance, duplicated rating event
- [Data Service] fix overriding old data when upgrade system, improve SendInBlue connector
- [Tracking Event] fix when import and improve UI
- [Profile API] fix bugs and use journeyMapIds to set multiple journey map
- [Profile API] refactoring and can set journey maps from API
- [Profile API] fix bugs when profile email is empty, must not merge visitor into update data
- [Profile API] fix can not save profile with only customer name and phone number
- [Asset Group] hide remove recommended items
- [Segment Details] should load journey maps and then render UI
- [Survey] user can skip some rating questions
- [Segment Builder] can not filter profiles with multiple journey maps
- [DailyReportUnit] add indexing for journeyMapId
- [Profile 360 Analytics Report] show all data from all journey
- [Journey] update authorization should update profile authorization
- [UX] improve UI/UX of feedback survey 
- [Segment] update Ref Segment in profile and keep authorizedEditors, authorizedEditors
- [Segment] UI and query data is not correctly when set journey map in visual query builder
- [Profile] edit profile with better data authorization UI/UX
- [Report] touchpoint hub in dashboard and profile
- [Profile] fix bugs of De-duplicate profile
- [Event] ref touchpoint domain should extract from URL
- [Data Journey] improve and fix bugs profile model
- [Segment] CSV data exporting is JSON if segment'size larger than 100, not CSV
- [UI] sorting fields in segment list
- fix bugs load and save primaryPhone, add input type for telephone
- fix bugs synch data to mailchimp, improve data quality scoring configs
- [backend] fix bugs of data authorization when delete a segment
- [backend] segment dashboard should load data faster
- [backend] import profile with data validation rules
- [backend] save new profile from web is not worked
- [Login] User Session in Redis is expired, the Admin UI should let user login again

### Changed

- [Segment UI] refactoring for new features: campaign and notebook
- [Profile Search] improve UX and UI, highlight search keywords in profile table list
- [Profile] after inserting or updating profile, the system would run data deduplication job
- [JVM] add jdbi3 and PostgresSQL library
- [Profile API] improve performance with data queue, class: JobUpdateProfileByJson
- caching query and improve performance of customer data report and loading journey map
- uprade core java libraries 
- improve Segment UI and Data Journey Map UI
- [Customer Data Report] show profile sources as default tab
- [Survey] auto set height when survey iframe is fully loaded
- [LEO Survey] only get QR code and Web Form URL in journey map
- [LEO CDP API] refactoring to use header for tokens 
- improve UX and UI
- rename profile status from DELETED to REMOVED when status code == -4
- apply cache and improve performance of product recommendation
- [TrackingEvent] add touchpoint data fields
- [UI] caching handlebar templates to improve performance
- [UI] improve touchpoint report: add legend and title
- [UI] restructure and improve UI/UX of admin dashboard
- [UI] improve UI and UX of profile listing in segment
- upgrade core java libraries: Google Cloud, AWS, arangodb driver
- [UI] improve UI of load events in profile
- [shell script] refactoring code
- [UI] improve UI and UX of System Login
- Improve User Authorization 
- [Scoring Rule] profile data quality scoring rule
- [UI] UI to show profile with data quality score > 200
- [UI] User Login Management
- [UI] improve UI for segment and profile
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
- rename forMarketingActivation to forSegmentActivation
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
