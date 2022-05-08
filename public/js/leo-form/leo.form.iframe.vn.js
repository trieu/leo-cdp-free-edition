// ------------ LEO Form JS ------------------
(function () {
  var errorMsg = "<p> Tên họ, email và số điện thoại là thông tin bắt buộc </p>";
  var successInfo =
    '<div class="alert alert-success" style="margin-top: 20px" ><strong> Thông tin bạn đã được ghi nhận thành công.</strong></div>';

  if (typeof window.LeoForm === "undefined") {
      var extractRootDomain = function(url){
      	try {
      		var toks = new URL(url).hostname.split('.');
      		return toks.slice(-1 * (toks.length - 1)).join('.');
      	} catch(e) {} return "";
      };

    var LeoForm = {};

    LeoForm.render = function (formId, holderId, contentKeywords) {
      var formSelector = jQuery("#" + formId);
      formSelector.jsonForm({
        schema: {
          firstName: {
            type: "string",
            title: "Tên",
            required: true,
          },
          lastName: {
            type: "string",
            title: "Họ",
            required: true,
          },
          email: {
            type: "email",
            title: "Email",
            required: true,
          },
          phone: {
            type: "number",
            title: "Số điện thoại",
            default: 84,
            required: true,
          },
          genderStr: {
            type: "string",
            title: "Giới tính",
            enum: ["Unknown", "Male", "Female"],
          },
          workingHistory: {
	          type: "string",
	          title: "Company name:",
	          required: false,
	      },
          contentKeywords: {
            type: "array",
            title: "Thông tin bạn quan tâm: ",
            items: {
              type: "string",
              title: "Option",
              enum: Object.keys(contentKeywords),
            },
          },
        },
        form: [
          { key: "lastName" },
          { key: "firstName" },
          { key: "email" },
          { key: "phone" },
          {
            "key": "genderStr",
            "titleMap": {
              "Male": "Nam",
              "Female": "Nữ",
              "Unknown": "Không xác định"
            }
          },
          { key: "workingHistory" },
          {
            key: "contentKeywords",
            type: "checkboxes",
            titleMap: contentKeywords,
          },
          {
            type: "actions",
            items: [
              {
                type: "submit",
                title: "Gửi thông tin",
              },
            ],
          },
        ],
        onSubmit: function (errors, formData) {
          if (errors) {
            console.log(errors);
            jQuery("#leo_form_error")
              .html(JSON.stringify(errors))
              .show()
              .delay(5000)
              .fadeOut("slow");
          } else {
            if (
              formData.firstName !== "" &&
              formData.email !== "" &&
              formData.phone !== ""
            ) {
              var extData = {};
              extData.contentKeywords = formData.contentKeywords.concat([]);
              delete formData.contentKeywords;

              // metadata
              formData.webformProvider = "LeoForm";

              var win = parent;
              formData.obsid = win.leoObserverId;
              formData.tpname = win.srcTouchpointName;
              formData.tpurl = win.srcTouchpointUrl;
              formData.tprefurl = win.document.referrer;
              formData.tprefdomain = extractRootDomain(win.document.referrer);
              //console.log(formData)

              var LeoObserverProxy = win.LeoObserverProxy;
              if (LeoObserverProxy) {
            	  LeoObserverProxy.updateProfileBySession(formData, extData);
              }

              jQuery("#" + holderId)
                .empty()
                .html(successInfo)
                .show()
                .delay(7000)
                .fadeOut("slow");
            } else {
              jQuery("#leo_form_error")
                .html(errorMsg)
                .show()
                .delay(7000)
                .fadeOut("slow");
            }
          }
        },
      });
      jQuery("#" + holderId).show();
    };

    window.LeoForm = LeoForm;
  }
})();

var leoFormDiv =
  '<div id="subscription_placeholder" style="width:100%"> <h3> Đăng ký thông tin </h3> ';
  leoFormDiv += '<form id="leo_registration_form"></form>';
  leoFormDiv += ' <div id="leo_form_error" class="alert alert-danger" style="display: none;"></div> </div>';

setTimeout(function () {
  var selector = jQuery("body");
  if (selector.length > 0) {
    selector.html(leoFormDiv);

    var contentKeywords = {
      "bigdata-ai" :"Big Data & A.I", 
      "business" : "Business", 
      "industry-4.0" : "Industry 4.0", 
      "marketing" :  "MARKETING"
    };

    contentKeywords = parent.leoFormContentKeywords || contentKeywords;

    LeoForm.render(
      "leo_registration_form",
      "subscription_placeholder",
      contentKeywords
    );
  }
}, 800);
