function isValidData(obj){
	return typeof obj === "string" || typeof obj === "number"; 
}

function isObject(obj){
	return typeof obj === "object"; 
}

function isFunction(obj){
	return typeof obj === "function"; 
}

var latitude = 0, longitude = 0;
function queryLocationCode(callback){
	if (typeof navigator.geolocation === "object") {
		navigator.geolocation.getCurrentPosition(function(p){  
			// the code for https://plus.codes/
			latitude = p.coords.latitude;
			longitude = p.coords.longitude;
			var locationCode = OpenLocationCode.encode(latitude, longitude, OpenLocationCode.CODE_PRECISION_EXTRA);
			if(isFunction(callback)) {
				callback(locationCode);
			}
		});
	} else {
		if(isFunction(callback)) {
			callback("");
		}
	}
}

JSONForm.fieldTypes['htmlsnippet'] = {
  template: '<%=node.value%>'
};

// ------------ LEO Form ------------------

window.surveyTemplateModel = false;
window.totalRatingQuestions = 0;

// init global data
var formSchema = {}, formModel = [], callbacks = [];

function initFeedbackSurvey(){
	var model = JSON.parse($('#surveyJsonMetaData').val());
	model.Rating_Question_List = typeof model.Rating_Question_List === "object" ? model.Rating_Question_List : [];
	// set as global var
	window.surveyTemplateModel = model;
	console.log(model);
	
	var isEnglish = model.Language == null || model.Language === "en";
	var placeholderPrefix = "";
	var defaultTextPlaceholder = "";
	if(model.Language === "vn") {
		placeholderPrefix = "";
		defaultTextPlaceholder = "";
		moment.locale('vi')
	}
	
	// BEGIN data fields for FORM
	formModel.push({"type": "htmlsnippet", "value": '<ol type="I" class="mgl38">'})
	
	if( isValidData(model.Header) ){
		$('#Header').html(model.Header);
	}
	
	if( isValidData(model.Description) ){
		$('#Description').show().html('<i class="fa fa-info-circle event-get-code" style="font-size:1.2em" aria-hidden="true"></i> ' + model.Description);
	}
	
	if( isValidData(model.Header_Image_URL) ){
		$('#Header_Image_URL').attr("src",model.Header_Image_URL).show();
	}
	
	// Survey_URL
	if( isValidData(model.Survey_URL) ){
		var text = model.Survey_URL_Text || model.Survey_URL;
		var value = '<div class="alert alert-description" ><i class="fa fa-info-circle event-get-code" style="font-size:1.1em" aria-hidden="true"></i> <a target="_blank" href="' + model.Survey_URL + '"  >' + text + "</a></div>";
		formModel.push({"type": "htmlsnippet", "value": value})
	}
	
	if( isValidData(model.Footer) ) {
		$('#Footer').html(model.Footer);
	}
	
	if( isValidData(model.Footer_Image_URL) ){
		$('#Footer_Image_URL').attr("src",model.Footer_Image_URL).show();
	}
	
	// group
	if( isValidData(model.Group_Label) && isObject(model.Group_Options) ) {
		formSchema["Group"] = {
			      "type": "string",
			      "title": model.Group_Label,
			      "required": true,
			      "enum": model.Group_Options
		}
		formModel.push({ "key": "Group",  "type": "radios" , "fieldHtmlClass" : "leo_form_input" });
	}
	
	// Product_Item
	if( isValidData(model.Product_Item) ){
		var html = '<h4 id="product_item" class="evaluatedItem" data-item-id="' + model.Product_Item_ID + '" >' + model.Product_Item + '</h4>';
		formModel.push({"type": "htmlsnippet", "value": html})
	}
	// Content_Item
	else if( isValidData(model.Content_Item) ){
		var html = '<h4 id="content_item" class="evaluatedItem" data-item-id="' + model.Content_Item_ID + '" >' + model.Content_Item + '</h4>';
		formModel.push({"type": "htmlsnippet", "value": html})
	}
	// Touchpoint_Item
	else if( isValidData(model.Touchpoint_Item) ){
		var html = '<h4 id="touchpoint_item" class="evaluatedItem" data-item-id="' + model.Touchpoint_Item_ID + '" >' + model.Touchpoint_Item + '</h4>';
		formModel.push({"type": "htmlsnippet", "value": html})
	}
	
	// Survey_Image_URL
	if( isValidData(model.Survey_Image_URL) ){
		formModel.push({"type": "htmlsnippet", "value": '<img id="survey_img" alt="" src="' + model.Survey_Image_URL + '"  />'})
	}
	
	// Evaluated_Object
	if( isValidData(model.Evaluated_Object) ) {
		formSchema["Evaluated_Object"] = {
		      "type": "string",
		      "required": true,
		      "title": model.Evaluated_Object
		};
		formModel.push({ "key": "Evaluated_Object", "type": "text", "fieldHtmlClass" : "leo_form_input", "placeholder" :  placeholderPrefix + model.Evaluated_Object });
		
		callbacks.push(function(){
			var objects = [];
			console.log(model.Evaluated_Object_Suggested_Items);
			for(var i in model.Evaluated_Object_Suggested_Items){
				var text = model.Evaluated_Object_Suggested_Items[i];
				if(typeof text === "string") {
					objects.push({ value: text, data: text});
				}
			}
			// auto-suggestion
			$('input[name="Evaluated_Object"]').autocomplete({
			    lookup: objects,
			    onSelect: function (suggestion) {
			    	console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
			    }
			});
		})
	}
	
	// Evaluated_Person
	if(model.Evaluated_Person) {
		formSchema["Evaluated_Person"] = {
		      "type": "string",
		      "required": true,
		      "title": model.Evaluated_Person
		};
		formModel.push({ "key": "Evaluated_Person", "type": "text", "fieldHtmlClass" : "leo_form_input" , "placeholder" :  placeholderPrefix + model.Evaluated_Person });
		
		callbacks.push(function(){
			var objects = [];
			console.log(model.Evaluated_Person_Suggested_Items);
			for(var i in model.Evaluated_Person_Suggested_Items){
				var text = model.Evaluated_Person_Suggested_Items[i];
				if(typeof text === "string") {
					objects.push({ value: text, data: text});
				}
			}
			$('input[name="Evaluated_Person"]').autocomplete({
			    lookup: objects,
			    onSelect: function (suggestion) {
			        console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
			    }
			});
		})
	}
	
	// Decision Maker
	if( isValidData(model.Decision_Maker_Label) && isObject(model.Decision_Maker_Options) ) {
		formSchema["decisionMakers"] = {
			      "type": "string",
			      "title": model.Decision_Maker_Label,
			      "required": true,
			      "enum": model.Decision_Maker_Options
		}
		formModel.push({ "key": "decisionMakers", "type": "checkboxes", "fieldHtmlClass" : "leo_form_input" });
	}
	
	// Survey Original Source
	if( isValidData(model.Survey_Original_Source_Label) && isObject(model.Survey_Original_Source_Options) ) {
		formSchema["originalSources"] = {
			      "type": "string",
			      "title": model.Survey_Original_Source_Label,
			      "required": true,
			      "enum": model.Survey_Original_Source_Options
		}
		formModel.push({ "key": "originalSources",  "type": "radios", "fieldHtmlClass" : "leo_form_input" });
	}
	
	// Survey Media Sources
	if( isValidData(model.Survey_Media_Source_Label) && isObject(model.Survey_Media_Source_Options) ) {
		formSchema["mediaSources"] = {
			      "type": "string",
			      "title": model.Survey_Media_Source_Label,
			      "required": true,
			      "enum": model.Survey_Media_Source_Options
		}
		formModel.push({ "key": "mediaSources",  "type": "checkboxes", "fieldHtmlClass" : "leo_form_input" });
	} 
	
	if(isEnglish) {
		// Profile_First_Name_Label
		if(model.Profile_First_Name_Label) {
			formModel.push({ "type": "help", "helpvalue": "<b>Personal Information</b>"});
			formSchema["profileFirstName"] = {
			      "type": "string",
			      "required": true,
			      "title": model.Profile_First_Name_Label
			};
			formModel.push({ "key": "profileFirstName", "type": "text", "fieldHtmlClass" : "leo_form_input" , "placeholder" : placeholderPrefix + model.Profile_First_Name_Label});
		}
		
		// Profile_Last_Name_Label
		if(model.Profile_Last_Name_Label) {
			formSchema["profileLastName"] = {
			      "type": "string",
			      "required": true,
			      "title": model.Profile_Last_Name_Label
			};
			formModel.push({ "key": "profileLastName", "type": "text", "fieldHtmlClass" : "leo_form_input" , "placeholder" : placeholderPrefix + model.Profile_Last_Name_Label});
		}
	}
	else {
		// Profile_Last_Name_Label
		if(model.Profile_Last_Name_Label) {
			if(model.Language === "vn") {
				formModel.push({ "type": "help", "helpvalue": "<b>Thông tin cá nhân</b>"});
			}
			formSchema["profileLastName"] = {
			      "type": "string",
			      "required": true,
			      "title": model.Profile_Last_Name_Label
			};
			formModel.push({ "key": "profileLastName", "type": "text", "fieldHtmlClass" : "leo_form_input" , "placeholder" : placeholderPrefix + model.Profile_Last_Name_Label});
		}
		
		// Profile_First_Name_Label
		if(model.Profile_First_Name_Label) {
			formSchema["profileFirstName"] = {
			      "type": "string",
			      "required": true,
			      "title": model.Profile_First_Name_Label
			};
			formModel.push({ "key": "profileFirstName", "type": "text", "fieldHtmlClass" : "leo_form_input" , "placeholder" : placeholderPrefix + model.Profile_First_Name_Label});
		}
	}
	
	// Profile_Gender
	if( isObject(model.Profile_Gender) ) {
		var obj = model.Profile_Gender;
		formSchema["profileGender"] = {
			      "type": "string",
			      "title": obj.label,
			      "required": false,
			      "enum": obj.choices
		}
		formModel.push({ "key": "profileGender", "type": "radios", "fieldHtmlClass" : "leo_form_input" });
		
		callbacks.push(function(){
			$('input[name="profileGender"]').each(function(){ 
				var v = $(this).val();
				if(v === "Female"){
					$(this).val(0);
					if(model.Language === "vn") {
						var html = $(this).parent().html().replace("Female","Nữ");
						$(this).parent().html(html)
					}
				}
				else if(v === "Male"){
					$(this).val(1);
					if(model.Language === "vn") {
						var html = $(this).parent().html().replace("Male","Nam");
						$(this).parent().html(html)
					}
				} 
				else if(v === "Unknown"){
					$(this).val(7);
					if(model.Language === "vn") {
						var html = $(this).parent().html().replace("Unknown","Không biết");
						$(this).parent().html(html);
					}
				} 
			})
		})
	} 
	
	// email
	if(model.Profile_Email_Label) {
		formSchema["profileEmail"] = {
		      "type": "string",
		      "required": true,
		      "title": model.Profile_Email_Label
		};
		formModel.push({ "key": "profileEmail", "type": "email", "fieldHtmlClass" : "leo_form_input" , "placeholder" : placeholderPrefix + model.Profile_Email_Label });
	}
	
	// phone
	if(model.Profile_Phone_Label) {
		formSchema["profilePhone"] = {
		      "type": "string",
		      "required": true,
		      "title": model.Profile_Phone_Label
		};
		formModel.push({ "key": "profilePhone", "type": "tel", "fieldHtmlClass" : "leo_form_input" , "placeholder" : placeholderPrefix + model.Profile_Phone_Label });
	}
	
	// BEGIN ------ profileDateOfBirth OR profileAge OR profileAgeGroup --------
	// profileDateOfBirth
	if(model.Profile_Birth_Date_Label) {
		formSchema["profileDateOfBirth"] = {
		      "type": "string",
		      "required": false,
		      "title": model.Profile_Birth_Date_Label
		};
		formModel.push({ "key": "profileDateOfBirth", "type": "date", "fieldHtmlClass" : "leo_form_input", "placeholder" : placeholderPrefix + model.Profile_Birth_Date_Label });
		
		callbacks.push(function(){
			$("input[name='profileDateOfBirth']").on("change", function() {
				if(this.value != ""){
					 this.setAttribute("data-date", moment(this.value, "YYYY-MM-DD").format("DD, MMMM, YYYY"))
				}
			}).trigger("change")
		})
	} 
	// profileAge
	else if(model.Profile_Age_Label) {
		formSchema["profileAge"] = {
		      "type": "integer",
		      "required": false,
		      "minimum": 13,
		      "maximum": 99,
		      "title": model.Profile_Age_Label
		};
		formModel.push({ "key": "profileAge", "fieldHtmlClass" : "leo_form_input",  "placeholder" : placeholderPrefix + model.Profile_Age_Label });
	}
	// profileAgeGroup
	else if( isObject(model.Profile_Age_Group) ) {
		var obj = model.Profile_Age_Group;
		formSchema["profileAgeGroup"] = {
			      "type": "string",
			      "title": obj.label,
			      "required": false,
			      "enum": obj.choices
		}
		formModel.push({ "key": "profileAgeGroup", "fieldHtmlClass" : "leo_form_input", "type": "radios" });
		// convert to integer value for ProfileAgeGroup
		callbacks.push(function(){
			$('input[name="profileAgeGroup"]').each(function(){ 
				var v = $(this).val(); 
				if(v === "[18 - 24]") {
					 $(this).val(3);
				}
				else if(v === "[25 - 34]") {
					 $(this).val(4);
				}
				else if(v === "[35 - 44]") {
					 $(this).val(5);
				}
				else if(v === "[45 - 54]") {
					 $(this).val(6);
				}
				else if(v === "[55 - 64]") {
					 $(this).val(7);
				}
				else if(v === "[65 - 74]") {
					 $(this).val(8);
				}
				else if(v === "[75 - 99]") {
					 $(this).val(9);
				}
			})
		})
	} 
	// END ------ profileDateOfBirth OR profileAge OR profileAgeGroup --------
	
	// Profile_Living_Location_Label
	if( model.Profile_Living_Location_Label ) {
		formSchema["profileLivingLocation"] = {
		      "type": "string",
		      "title": model.Profile_Living_Location_Label
		};
		formModel.push({ "key": "profileLivingLocation", "fieldHtmlClass" : "leo_form_input", "type": "textarea" , "placeholder" :  placeholderPrefix + model.Profile_Living_Location_Label });
	}
	
	// Profile_Location_Code_Label
	if( model.Profile_Location_Code_Label ) {
		formSchema["profileLocationCode"] = {
		      "type": "string",
		      "title": model.Profile_Location_Code_Label
		};
		formModel.push({ "key": "profileLocationCode", "fieldHtmlClass" : "leo_form_input", "type": "text" , "placeholder" : "Plus Code" });
		callbacks.push(function(){
			$('input[name="profileLocationCode"]').focusin(function(){
				var node = $(this);
				queryLocationCode(function(locCode){
					if(locCode != "") {
						node.val(locCode);
						var pNode = node.parent();
						
						// Plus Code
						$('#location_code_url').remove();
						var url = 'https://plus.codes/' + locCode;
						var aNode = $('<a/>').attr('id','location_code_url').attr("href", url).attr('target','_blank').html(url);
						pNode.prepend(aNode);
						
						// Location Map
						$('#map_location').remove();
						var iframeHtml = '<div id="map_location"></div>';
						pNode.append(iframeHtml);
						
						var mymap = L.map('map_location').setView([latitude, longitude], 16);
						L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
						    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						}).addTo(mymap);
						L.marker([latitude, longitude]).addTo(mymap);
						L.circle([latitude, longitude], {
						    color: 'red',
						    fillColor: '#f03',
						    fillOpacity: 0.3,
						    radius: 20
						}).addTo(mymap);
					}
				});
			});
		})
	}
	
	// Ext ID
	if( model.Ext_ID ) {
		formSchema["ext_id"] = {
		      "type": "string",
		      "title": model.Ext_ID
		};
		formModel.push({ "key": "ext_id", "fieldHtmlClass" : "leo_form_input", "type": "text" , "placeholder" : placeholderPrefix + model.Ext_ID });
	}
	
	// Profile_Extra_Attributes
	if( model.Profile_Extra_Attributes ) {
		model.Profile_Extra_Attributes.forEach(function(e){
			if( isValidData(e.key) && isValidData(e.label) && isValidData(e.inputType) ) {
				var field = "profileExtAttribute_" + e.key;
				formSchema[field] = {
				      "type": "string",
				      "title": e.label
				};
				formModel.push({ "key": field, "fieldHtmlClass" : "leo_form_input", "type": e.inputType , "placeholder" : defaultTextPlaceholder});
			}
		});
	}

	// Rating Quesions
	if( model.Rating_Question_Guide ){
		formModel.push({ "type": "help", "helpvalue": "<b>" + model.Rating_Question_Guide + "</b>"});
	}		
	// Questions
	var ratingQuestionLength = Object.keys(model.Rating_Question_List).length;
	for (var questionGroup in model.Rating_Question_List ) {
		if(ratingQuestionLength > 1){
			formModel.push({ "type": "help", "helpvalue": "<li class='question_group'>"+questionGroup+"</li>" });
		} else {
			formModel.push({ "type": "help", "helpvalue": "<div class='question_group'>"+questionGroup+"</div>" });
		}
		
		var list = model.Rating_Question_List[questionGroup];
		list.forEach(function(e){
			formSchema[e] = {
				      "type": "string",
				      "title": e,
				      "required": true,
				      "enum": model.Rating_Choices
			}
			formModel.push({ "key": e, "fieldHtmlClass" : "leo_form_input",  "type": "radiobuttons", "activeClass": "btn-success" });
			totalRatingQuestions++;
		});
	}
	
	// Survey_Extra_Question_Guide
	if( model.Survey_Extra_Question_Guide) {
		if(ratingQuestionLength > 1){
			formModel.push({ "type": "help", "helpvalue": "<li class='question_group'>" + model.Survey_Extra_Question_Guide + "</li>" });
		}
		else {
			formModel.push({ "type": "help", "helpvalue": "<div class='question_group'>" + model.Survey_Extra_Question_Guide + "</div>" });
		}
	}
	
	// Multiple_Choice_Question_List
	if( isObject(model.Multiple_Choice_Question_List) ) {
		for(var key in model.Multiple_Choice_Question_List) {
			var field = "multipleChoiceQuestion_" + key;
			var obj = model.Multiple_Choice_Question_List[key];
			formSchema[field] = { 
				      "type": "array",
				      "title": obj.label,
				      "required": true,
				      "items": {
				          "type": "string",
				          "title": "Option",
				          "enum": obj.choices
				       }
			}
			formModel.push({ "key": field, "fieldHtmlClass" : "leo_form_input", "type": "checkboxes" , "htmlClass" : field});
		}
	} 
	
	// Single_Choice_Question_List
	if( isObject(model.Single_Choice_Question_List) ) {
		for(var key in model.Single_Choice_Question_List) {
			var field = "singleChoiceQuestion_" + key;
			var obj = model.Single_Choice_Question_List[key];
			formSchema[field] = {
				      "type": "string",
				      "title": obj.label,
				      "required": true,
				      "enum": obj.choices
			}
			formModel.push({ "key": field, "fieldHtmlClass" : "leo_form_input", "type": "radios" , "htmlClass" : field});
		}
	} 
	
	// comment
	if(model.Comment_Label) {
		formSchema["comment"] = {
		      "type": "string",
		      "title": model.Comment_Label
		};
		formModel.push({ "key": "comment", "fieldHtmlClass" : "leo_form_input", "type": "textarea" , "placeholder" : defaultTextPlaceholder});
	}
	
	// Survey_Extra_Text_Questions
	if( model.Survey_Extra_Text_Questions ) {
		model.Survey_Extra_Text_Questions.forEach(function(e){
			if( isValidData(e.key) && isValidData(e.label) ) {
				var field = "extraTextQuestion_" + e.key;
				formSchema[field] = { "type": "string", "title": e.label };
				formModel.push({ "key": field, "fieldHtmlClass" : "leo_form_input", "type": "textarea" , "placeholder" : defaultTextPlaceholder, "htmlClass" : field});
			}
		});
	}
	
	// OK button
	formModel.push({
		"type" : "actions",
		"items" : [ {
			"type" : "submit",
			"title" : ' OK '
		}]	
	})
	
	// END data fields for FORM
	formModel.push({"type": "htmlsnippet", "value": '</ol>'})
	
	// process form schema into HTML
	LeoForm.process('survey_placeholder',formSchema, formModel, callbacks);
	
	// add background for UX
	$('div.form-group').each(function(){ 
		var n = $(this).attr('class').replace('form-group jsonform-error-','').length; 
		if(n > 0) $(this).addClass('form-background');
	})
	$('#survey_placeholder').show();
	
	// convert MD link into a[href]
	$("div.radio label").each(function(){ 
		var text = $(this).html(); $(this).html( marked.parseInline(text) ) 
	})
}

(function() {
	if (typeof window.LeoForm === "undefined") {
        var extractRootDomain = function(url){
        	try {
        		var toks = new URL(url).hostname.split('.');
        		return toks.slice(-1 * (toks.length - 1)).join('.');
        	} catch(e) {} return "";
        };

		function process(holderId, formSchema, formModel, callbacks) {
			var formSelector = jQuery('#form_leo_survey');
			formSelector.jsonForm({ schema : formSchema, form: formModel, onSubmit : onSubmitForm });
			jQuery('#' + holderId).show();
			
			for(var i in callbacks) {
				var f = callbacks[i];
				if(typeof f === "function") {
					f();
					console.log(f)
				}
			}
		}

		var LeoForm = {};
		LeoForm.process = process;
		window.LeoForm = LeoForm;
	}
})();

// --------------------------------------------------------------------------------------------------------------------------------------------------------- //


var onSubmitForm = function(errors, formData) {
	if (errors) {
		console.log(errors)
		jQuery('#leo_form_error').html(JSON.stringify(errors)).show().delay(5000).fadeOut('slow');
		
	} 
	else if(preview){
		jQuery('#leo_form_error').html("Can not submit data in preview mode !").show().delay(5000).fadeOut('slow');
	}
	else {
		console.log("---------------onSubmitForm -----------------");
		console.log(surveyTemplateModel);
		console.log(formData);
		
		var submitModel = {};
		
		// header
		submitModel["header"] = isValidData(surveyTemplateModel.Header) ? surveyTemplateModel.Header : "";
		
		// refTouchpointId
		submitModel["refTouchpointId"] = isValidData(surveyTemplateModel.Touchpoint_Item_ID) ? surveyTemplateModel.Touchpoint_Item_ID : "";
		
		// refProductItemId
		submitModel["refProductItemId"] = isValidData(surveyTemplateModel.Product_Item_ID) ? surveyTemplateModel.Product_Item_ID : "";

		// refContentItemId
		submitModel["refContentItemId"] = isValidData(surveyTemplateModel.Content_Item_ID) ? surveyTemplateModel.Content_Item_ID : "";
		
		// evaluatedItem
		submitModel["evaluatedItem"] = $('.evaluatedItem').text().trim();
		
		// group
		submitModel["group"] = isValidData(formData.Group) ?  formData.Group : "";
		
		// decisionMakers
		submitModel["decisionMakers"] = isValidData(formData.decisionMakers) ? [formData.decisionMakers] : [];
		
		// originalSources
		submitModel["originalSources"] = isValidData(formData.originalSources) ? [formData.originalSources] : [];
		
		// mediaSources
		submitModel["mediaSources"] = isValidData(formData.decisionMakers) ? [formData.decisionMakers] : [];
		
		// evaluatedObject
		submitModel["evaluatedObject"] = isValidData(formData.Evaluated_Object) ? formData.Evaluated_Object : "";
		
		// evaluatedPerson
		submitModel["evaluatedPerson"] = isValidData(formData.Evaluated_Person) ? formData.Evaluated_Person : "";
		
		// timePeriod
		submitModel["timePeriod"] = isValidData(surveyTemplateModel.Time_Period) ? surveyTemplateModel.Time_Period : new Date().toDateString();
		
		// personal profile fields in string 
		submitModel["profileFirstName"] =  isValidData(formData.profileFirstName) ? formData.profileFirstName : "";
		submitModel["profileLastName"] =  isValidData(formData.profileLastName) ? formData.profileLastName : "";
		submitModel["profileEmail"] = isValidData(formData.profileEmail) ? formData.profileEmail : "";
		submitModel["profilePhone"] = isValidData(formData.profilePhone) ? formData.profilePhone : "";
		submitModel["profileDateOfBirth"] = isValidData(formData.profileDateOfBirth) ? formData.profileDateOfBirth : "";
		
		// personal profile fields in number 
		submitModel["profileGender"] = isValidData(formData.profileGender) ? parseInt(formData.profileGender) : -1;
		submitModel["profileAge"] = isValidData(formData.profileAge) ? parseInt(formData.profileAge) : -1;
		submitModel["profileAgeGroup"] = isValidData(formData.profileAgeGroup) ? parseInt(formData.profileAgeGroup) : -1;
		
		// profile fields in location and GPS
		submitModel["profileLivingLocation"] = isValidData(formData.profileLivingLocation) ? formData.profileLivingLocation : "";
		if( isValidData(formData.profileLocationCode) ) {
			submitModel["profileLocationCode"] =  formData.profileLocationCode;
			submitModel["geoLatitude"] = latitude;
			submitModel["geoLongitude"] = longitude;
		}
		else {
			formData.profileLocationCode = "";
			submitModel["geoLatitude"] = -1;
			submitModel["geoLongitude"] = -1;
		}
		
		// ratingQuestionAnswer for CX scoring 
		var totalRatingAnswers = 0;
		submitModel["ratingQuestionAnswer"] = {};
		for (var questionGroup in surveyTemplateModel.Rating_Question_List ){
			submitModel["ratingQuestionAnswer"][questionGroup] = {};
			var list = surveyTemplateModel.Rating_Question_List[questionGroup];
			list.forEach(function(key) {
			  	//console.log(key + " " + formData[key] );
			  	var val = isValidData( formData[key] )? formData[key].trim() : "";
			  	if(val != "") {
			  		submitModel["ratingQuestionAnswer"][questionGroup][key] = val;
					totalRatingAnswers++;
			  	}
			});
		}
		
		// comment
		submitModel["comment"] = isValidData(formData.comment) ? formData.comment : "";
		
		// profileExtAttributes, extraTextQuestionsAnswer, singleChoiceQuestionAnswer, multipleChoiceQuestionAnswer
		submitModel["profileExtAttributes"] = {};
		submitModel["extraTextQuestionsAnswer"] = {};
		submitModel["singleChoiceQuestionAnswer"] = {};
		submitModel["multipleChoiceQuestionAnswer"] = {};
		_.each(formData, function(value, key) { 
			if( key.indexOf('profileExtAttribute_')===0 ){
				var objKey = key.replace("profileExtAttribute_","");
				submitModel["profileExtAttributes"][objKey] = value;
			}
			else if( key.indexOf('singleChoiceQuestion_')===0 ){
				var objKey = key.replace("singleChoiceQuestion_","");
				var question = $('div.'+key+' > label').text().trim();
				var answers = [value];
				var questionAnswer = {"key" : objKey, "question" : question, "answers" : answers}
				submitModel["singleChoiceQuestionAnswer"][objKey] = questionAnswer;
			}
			else if( key.indexOf('multipleChoiceQuestion_')===0 ){
				var objKey = key.replace("multipleChoiceQuestion_","");
				var question = $('div.'+key+' > label').text().trim();
				var answers = value;
				var questionAnswer = {"key" : objKey, "question" : question, "answers" : answers}
				submitModel["multipleChoiceQuestionAnswer"][objKey] = questionAnswer;
			}
			else if( key.indexOf('extraTextQuestion_')===0 ){
				var objKey = key.replace("extraTextQuestion_","");
				var question = $('div.'+key+' > label').text().trim();
				var answers = [value];
				var questionAnswer = {"key" : objKey, "question" : question, "answers" : answers}
				submitModel["extraTextQuestionsAnswer"][objKey] = questionAnswer;
			}
		});
		
		console.log("totalRatingQuestions " + totalRatingQuestions)
		console.log("totalRatingAnswers " + totalRatingAnswers)
		console.log(submitModel);
		
		var justSubmitProfileData = surveyTemplateModel.Rating_Question_List.length === 0;
		if(totalRatingQuestions > 0 || justSubmitProfileData){
			if(totalRatingQuestions > totalRatingAnswers) {
				var errorMsg = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please answer all ' + totalRatingQuestions +' questions !';
				jQuery('#leo_form_error').html(errorMsg).show().delay(5000).fadeOut('slow');
			} 
			else {
				var okMsg = "Thank you for your feedback data !";
				if(surveyTemplateModel.Language === "vn") {
					okMsg = "Cảm ơn bạn về những thông tin phản hồi !";
				} 
				var successInfoHtml = '<div class="alert alert-success"><i class="fa fa-check-circle" aria-hidden="true"></i> ' + okMsg + ' </div>';
				
				jQuery('#survey_placeholder').hide().parent().append(successInfoHtml).show();
				
				submitModel["refTemplateId"] = refTemplateId;
				submitModel["feedbackType"] = feedbackTypeAsText;
				LeoObserverProxy.recordFeedbackEvent(submitEventName, submitModel);
				
				// go to top
				window.scrollTo(0,0);
			}
		}
		else {
			var errorMsg = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> There are some errors !';
			jQuery('#leo_form_error').html(errorMsg).show().delay(5000).fadeOut('slow');
		}
	}
}