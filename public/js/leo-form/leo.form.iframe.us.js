// ------------ LEO Form JS ------------------
(function () {
  var errorMsg = "<p> Name, Email and Phone Number are required information </p>";
  var successInfo =
    '<div class="alert alert-success" style="margin-top: 20px" ><strong>Success!</strong> Your data is submitted successfully.</div>';

  if (typeof window.LeoForm === "undefined") {
    var extractRootDomain = function (url) {
      try {
        return new URL(url).hostname.split(".").slice(-2).join(".");
      } catch (e) {}
      return "";
    };

    var LeoForm = {};

    LeoForm.render = function (formId, holderId, contentKeywords) {
      var formSelector = jQuery("#" + formId);
      formSelector.jsonForm({
        schema: {
          firstName: {
            type: "string",
            title: "Your First Name",
            required: true,
          },
          lastName: {
            type: "string",
            title: "Your Last Name",
            required: true,
          },
          email: {
            type: "email",
            title: "Your Email",
            required: true,
          },
          phone: {
            type: "number",
            title: "Your Phone",
            required: true,
          },
          genderStr: {
            type: "string",
            title: "Your Gender",
            enum: ["Unknown", "Male", "Female"],
          },
          workingHistory: {
            type: "string",
            title: "Company name:",
            required: false,
          },
          contentKeywords: {
            type: "array",
            title: "Select all categories you want to update information: ",
            items: {
              type: "string",
              title: "Option",
              enum: Object.keys(contentKeywords),
            },
          },
        },
        form: [
          { key: "firstName" },
          { key: "lastName" },
          { key: "email" },
          { key: "phone" },
          {
            "key": "genderStr",
            "titleMap": {
              "Male": "Male",
              "Female": "Female",
              "Unknown": "Unknown"
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
                title: "Submit",
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
  '<div id="subscription_placeholder" style="width:100%"> <h3> Newsletter Subscription Form </h3> ';
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
