// file uploader plugin
FilePond.registerPlugin(
	FilePondPluginImagePreview,
	FilePondPluginImageResize,
	FilePondPluginImageCrop,
	FilePondPluginImageExifOrientation,
	FilePondPluginFileValidateSize,
	FilePondPluginFileValidateType
);
// global configs
FilePond.setOptions({
	allowDrop: false,
	allowPaste: false,
	allowMultiple: false,
	allowFileTypeValidation: true
});

var setupUploaderWidget = function (refObjectClass, refObjectKey, domSelector, callback, acceptedFileTypes) {
	var fileUploaderUrl = window.baseUploadApi || '';
	var usersession = lscache.get('usersession');
	var inputNode = document.querySelector(domSelector);
	if (usersession && inputNode) {
		// check is image upload or file upload
		var isImageUploader = $(inputNode).attr('name') === 'image';
		var labelAction = isImageUploader ? 'Image' : "File";
		var headerObj = {
			'leouss': usersession,
			'refObjectClass': refObjectClass,
			'refObjectKey': refObjectKey
		};
		var urlStr = "/file-uploader";
		
		var processUploader = {
			url: urlStr,
			method: 'POST',
			headers: headerObj,
			withCredentials: false,
			onload: function (response) {
				var rs = JSON.parse(response);
				if (typeof callback === 'function') {
					callback(rs);
				}
				return true;
			},
			onerror: function (response) {
				console.error(response)
				return response.data;
			}
		}

		var serverConfig = {
			url: fileUploaderUrl,
			process: processUploader,
			revert: null,
			restore: null,
			load: null,
			fetch: null
		};
		var option = {};
		if (isImageUploader) {
			option = {
				labelIdle: '<span class="filepond--label-action"> Select an image file</span>',
				acceptedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
				fileValidateTypeDetectType: (source, type) => new Promise((resolve, reject) => {
					// Do custom type detection here and return with
					// promise
					console.log('fileValidateTypeDetectType ', type);
					resolve(type);
				}),
				server: serverConfig
			}
		} else {
			option = {
				labelIdle: '<span class="filepond--label-action"> Select a file </span>',
				acceptedFileTypes: acceptedFileTypes || ['image/png', 'image/jpeg', 'image/gif','image/tiff',
					'text/plain', 'text/csv', 'application/pdf', 'application/doc', 'application/docx',
					'application/pptx', 'application/ppt', 'application/rtf', 'application/xlsx', 'application/xls',
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
					"application/vnd.openxmlformats-officedocument.presentationml.presentation"
				],
				fileValidateTypeDetectType: (source, type) => new Promise((resolve, reject) => {
					console.log('fileValidateTypeDetectType ', source, type);
					resolve(type);
				}),
				server: serverConfig
			}
		}
		FilePond.create(inputNode, option);
	} else {
		console.error("usersession is null");
	}
}