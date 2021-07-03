// ------------ LEO Form JS ------------------
(function () {
  var errorMsg = "<p> Tên họ, email và số điện thoại là thông tin bắt buộc </p>";
  var successInfo =
    '<div class="alert alert-success"><strong> Thông tin bạn đã được ghi nhận thành công.</strong></div>';

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
          firstname: {
            type: "string",
            title: "Tên",
            required: true,
          },
          lastname: {
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
            title: "Tên công ty đang công tác:",
            required: false,
          },
          contentKeywords: {
            type: "array",
            title: "Thông tin bạn quan tâm và cần chúng tôi tư vấn: ",
            items: {
              type: "string",
              title: "Option",
              enum: Object.keys(contentKeywords),
            },
          },
        },
        form: [
          { key: "lastname" },
          { key: "firstname" },
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
              formData.firstname !== "" &&
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
  '<div id="subscription_placeholder" style="width:100%"> <h3> Đăng ký thông tin tư vấn </h3> ';
  leoFormDiv += '<form id="leo_registration_form"></form>';
  leoFormDiv += ' <div id="leo_form_error" class="alert alert-danger" style="display: none;"></div> </div>';

setTimeout(function () {
  var selector = jQuery("body");
  if (selector.length > 0) {
    selector.html(leoFormDiv);

    var contentKeywords = {
      "san-pham-cho-vay": "SẢN PHẨM CHO VAY",
      "san-pham-the": "SẢN PHẨM THẺ"
    };

    contentKeywords = parent.leoFormContentKeywords || contentKeywords;

    LeoForm.render(
      "leo_registration_form",
      "subscription_placeholder",
      contentKeywords
    );
  }
}, 600);
