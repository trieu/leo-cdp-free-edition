'use strict';var mainDashboardFunnelHeight=420,mainDashboardWidth=850,dashboardFontSize=14,flowNetworkGraph=!1,dashboardDataModel=!1,currentJourneyMapId="",initPrimaryDashboard=function(){window.mainDashboardFunnelHeight=420;window.mainDashboardWidth=850;window.dashboardFontSize=14;window.flowNetworkGraph=!1;window.dashboardDataModel=!1;window.currentJourneyMapId="";loadJourneyMapList(!1,function(b){currentJourneyMapId=b;showDashboardReport(!0)},!0);setupTabPanels();updateProfileChartWrapper();initDateFilterComponent(!1,
null,null,45);showDashboardReport(!0)},updateProfileChartWrapper=function(){var b=$("#profile_funnel_wrapper"),a=$(window).width();1500<a&&1650>a?b.css("width","90%"):1650<a&&1750>a?b.css("width","96%"):1750<a&&b.css("width","98%");b=$(window).height();var d=a/b;1.7<=d&&2.3>d&&1400<a&&700<b?(mainDashboardFunnelHeight=b-(Math.floor(window.innerHeight/3)+186),dashboardFontSize=15):2.3<=d&&1400<a&&700<b&&(mainDashboardFunnelHeight=b-(Math.floor(window.innerHeight/3)+116),dashboardFontSize=16);mainDashboardWidth=
0<window.pageWrapperWidth?.7*window.pageWrapperWidth:mainDashboardWidth},showDashboardReport=function(b){var a=getDateFilterValues(),d=a.beginFilterDate;$("#beginReportDate").text((new moment(d)).format(defaultDateFormat));d=a.endFilterDate;$("#endReportDate").text((new moment(d)).format(defaultDateFormat));var k={block:{highlight:!0,fill:{type:"gradient"}},chart:{curve:{enabled:!0,height:32},height:mainDashboardFunnelHeight,bottomWidth:.64,bottomPinch:2,width:4*mainDashboardFunnelHeight/3},tooltip:{enabled:!0},
label:{fontSize:dashboardFontSize+"px"},events:{click:{block:function(c){console.log(c.label.raw)}}}},l=function(){var c=dashboardDataModel.profileTotalStats;$("#profile_total_stats").empty();$("#marketing_metrics_holder").empty();$("#sales_metrics_holder").empty();$("#cx_metrics_holder").empty();for(var g=0;g<c.length;g++){var e=c[g],f=e.collectorKey,h=e.collectorCount;e=e.flowType;0===e?$("#profile_total_stats").append('\x3cdiv class\x3d"stats_item" \x3e '+f+" : "+h+" \x3c/div\x3e"):1===e?$("#marketing_metrics_holder").append('\x3cdiv class\x3d"stats_item" \x3e '+
f+" : "+h+" \x3c/div\x3e"):2===e?$("#sales_metrics_holder").append('\x3cdiv class\x3d"stats_item" \x3e '+f+" : "+h+" \x3c/div\x3e"):3===e&&$("#cx_metrics_holder").append('\x3cdiv class\x3d"stats_item" \x3e '+f+" : "+h+" \x3c/div\x3e")}c=dashboardDataModel.profileFunnelData;g=[];for(f=0;f<c.length;f++){h=c[f];e=(new Number(h.collectorCount)).toLocaleString();var m=getColorCodeProfileFunnel(f+1);g.push([h.collectorKey,e,m])}(new D3Funnel("#profile_funnel")).draw(g,k);$("#profile_journey_funnel").empty();
c=dashboardDataModel.journeyStatsData;0!==c.length&&(c={labels:journeyLabel5A,subLabels:["VISITOR PROFILE","CONTACT PROFILE"],colors:[["#D6EAF8","#85C1E9","#3498DB"],["#B7F0B7","#8CF08C","#5CF45C"]],values:c},g=$("#profile_journey_funnel").parent().width(),(new FunnelGraph({container:"#profile_journey_funnel",gradientDirection:"horizontal",data:c,displayPercent:!0,direction:"horizontal",width:g,height:350,subLabelValue:"percent"})).draw())};!1===dashboardDataModel||!0===b?($("#primary_dashboard_loader").show(),
$("#primary_dashboard").hide(),a.journeyMapId=currentJourneyMapId,LeoAdminApiUtil.getSecuredData(baseLeoAdminUrl+"/cdp/analytics360/dashboard-primary",a,function(c){$("#primary_dashboard_loader").hide();$("#primary_dashboard").show();0===c.httpCode&&""===c.errorMessage?(dashboardDataModel=c.data,l(),showTouchpointHubReport(a),setTimeout(function(){showTouchpointItemReport(a);showJourneyFlowReport(a,"flow_network_report_wrapper")},3100)):LeoAdminApiUtil.logErrorPayload(c)})):l()};
function showTouchpointHubReport(b){$("#observer_report_wrapper").html('\x3cdiv class\x3d"loader"\x3e\x3c/div\x3e');b.touchpointType=-1;b.startIndex=0;b.numberResult=22;LeoAdminApiUtil.getSecuredData(baseLeoAdminUrl+"/cdp/analytics360/touchpoint-hub-report",b,function(a){if("object"===typeof a.data&&""===a.errorMessage){var d=mainDashboardWidth;d=$("\x3ccanvas/\x3e").width(d).height(600);var k=$("#observer_report_wrapper");showProfileEventBubbleChart("Touchpoint Hub Report",k,d,a.data);setTimeout(function(){$("#observer_report_table").jsGrid({editing:!1,
paging:!1,width:"100%",height:"auto",data:a.data,fields:[{name:"name",title:"Touchpoint Hub Domain",align:"center",type:"text"},{name:"profileCount",title:"Total Profile",type:"number",align:"center",width:60},{name:"eventCount",title:"Total Event",type:"number",align:"center",width:60}]})},1E3)}else LeoAdminApiUtil.logErrorPayload(a)})}
function showTouchpointItemReport(b){$("#touchpoint_report_wrapper").html('\x3cdiv class\x3d"loader"\x3e\x3c/div\x3e');b.touchpointType=-1;b.startIndex=0;b.numberResult=22;LeoAdminApiUtil.getSecuredData(baseLeoAdminUrl+"/cdp/analytics360/touchpoint-report",b,function(a){if("object"===typeof a.data&&""===a.errorMessage){var d=mainDashboardWidth;d=$("\x3ccanvas/\x3e").width(d).height(800);var k=$("#touchpoint_report_wrapper");showProfileEventBubbleChart("Touchpoint Item Report",k,d,a.data,"touchpoint");
$("#touchpoint_report_table").jsGrid({editing:!1,paging:!1,width:"100%",height:"auto",data:a.data,fields:[{name:"touchpoint.name",title:"Touchpoint Item Name",align:"center",type:"text"},{name:"profileCount",title:"Total Profile",type:"number",align:"center",width:60},{name:"eventCount",title:"Total Event",type:"number",align:"center",width:60}]})}else LeoAdminApiUtil.logErrorPayload(a)})};