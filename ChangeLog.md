# Changelog

All notable changes to this Leo CDP project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.8.7] - 2021-08-25

- fix critical issues when tracking touchpoint with no name
- improve level index for leo observer, default touchpoint hub update
- improve profile getting by primary keys, insert and update in background
- update shell script to start workers
- allow tracking purchase event without transaction code ID

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

## [0.8.3] - 2021-04-06

- CX plugins

## [0.8.2] - 2021-04-04

- CX metrics add for testing
- CX reporting in profile
- CX form to collect survey data

## [0.8.1] - 2021-03-26

- Add Loyalty point
- Improve Segmentation with profile type and scoring models
- refactoring profile scoring data
- remove Service Item, use only Product Item to store data of physical goods, digital goods and subscription services
- Exporting data of profiles in segment using CSV format
- add 2 fields in profile UI: date of birth and nationality

## [0.7.1] - 2020-09-25

- Init changelog file
- upgrade Java ArangoDB driver into version 6.7.5
- added support of `leotech.system.util.CaptchaUtil` for human verification at login and in `leotech.system.common.SecuredWebDataHandler`
- allow specifying LOCAL, DEV and PRO environment in `leotech.starter.MainHttpStarter` and `leotech.starter.LeoDataObserverStarter`
