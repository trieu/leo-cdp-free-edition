// ------------ LEO Form ------------------
(function() {
  
	var errorMsg = '<p> Your name, your email, phone are required information </p>';
	var successInfo = '<div class="alert alert-success"><strong>Success!</strong> Your data is submitted successfully.</div>';
	
    if (typeof window.LeoForm === "undefined") {
    	var extractRootDomain = function(url){
         	try {
         	    return new URL(url).hostname.split('.').slice(-2).join('.');
         	} catch(e) {} return "";
    	}
    	
    	function render(formId, holderId, contentKeywords){
    		var formSelector = jQuery('#'+formId);
    		formSelector.jsonForm({
    	         schema: {
    	           firstName: {
    	             type: 'string',
    	             title: 'Your First Name',
    	             required: true
    	           },
    	           lastName: {
      	             type: 'string',
      	             title: 'Your Last Name',
      	             required: true
      	           },
    	           email: {
    	               type: 'email',
    	               title: 'Your Email',
    	               required: true
    	           },
    	           phone: {
    	               "type": "number",
    	               "title": "Your Phone",
    	               "default": 84,
    	               required: true
    	           },
    	           genderStr: {
    	               "type": "string",
    	               "title": "Your Gender",
    	               "enum": [ "Unknown", "Male", "Female"]
    	           },
    	           contentKeywords: {
	        	      "type": "array",
	        	      "title": "Select all categories you want to update information: ",
	        	      "items": {
	        	          "type": "string",
	        	          "title": "Option",
	        	          "enum": Object.keys(contentKeywords)
	        	      }
	        	    }
    	         },
    		     form: [
    		          {"key": "firstName"},
    		          {"key": "lastName"},
    		          {"key": "email"},
    		          {"key": "phone"},
    		          {
    		            "key": "genderStr",
    		            "type": "radios"
    		          },
    		          { "key": "contentKeywords" , "type": "checkboxes", "titleMap": contentKeywords },
    		          {
			              "type": "actions",
			              "items": [
			                {
			                  "type": "submit",
			                  "title": "Submit"
			                }
			              ]
		               }
    		       ]
    	         ,
    	         onSubmit: function (errors, formData) {
    	           if (errors) {
                     console.log(errors)
    	             jQuery('#leo_form_error').html(JSON.stringify(errors)).show().delay(5000).fadeOut('slow');;
    	           }
    	           else {
    	          	 if(formData.firstName !== '' && formData.email !== '' && formData.phone !== ''){
    	          		 var extData = {};
    	          		 extData.contentKeywords = formData.contentKeywords.concat([]);
    	          		 delete formData.contentKeywords;
    	          		 
    	          		 // metadata
    	          		 formData.webformProvider = "LeoForm";
    	          		 formData.obsid = window.leoObserverId;
    	          		 formData.tpname = window.srcTouchpointName;
    	          		 formData.tpurl = window.srcTouchpointUrl;
    	          		 formData.tprefurl = document.referrer;
    	          		 formData.tprefdomain = extractRootDomain(document.referrer);
    	          		 
    	          		 LeoObserverProxy.updateProfileBySession(formData, extData);
    	          		 jQuery('#'+holderId).empty().html(successInfo).show().delay(7000).fadeOut('slow');
    	          	 } else {
    	          		 jQuery('#leo_form_error').html(errorMsg).show().delay(7000).fadeOut('slow');
    	          	 }
    	           }
    	         }
    	       });
    	      jQuery('#'+holderId).show();
    	}

    	var LeoForm = {};
    	LeoForm.render = render;
        window.LeoForm = LeoForm;
    }
})();