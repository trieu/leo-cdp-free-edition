(function (holderId, lang) {
    if(typeof holderId !== 'string'){
        console.error('window.leoFormDomHolderId is not defined')
        return;
    }
    lang = lang || 'us';

    // FIXME
    var cdnUrl = 'https://cdn.jsdelivr.net/gh/USPA-Technology/leo-cdp-static-files/js/leo-form/';
    var formSchemaUrl = cdnUrl + 'leo.form.iframe.' + lang + '.js';
    var jsForm = '<script src="' + formSchemaUrl + '"><\/script>'

    var cssStr = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">';
    var jsStr = '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"><\/script>';
    jsStr += '<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.11.0/underscore-min.js"><\/script>';
    jsStr += '<script src="https://cdnjs.cloudflare.com/ajax/libs/jsonform/2.2.1/jsonform.js"><\/script>';

    var pIframeId = 'leo_frame_' + holderId;
    var holder = document.getElementById(holderId);
    if (holder) {
        var height = 770;
        var width = holder.offsetWidth > 640 ? holder.offsetWidth : 640;
        
        var iframeNode = document.createElement("iframe");
        iframeNode.setAttribute('style', 'margin:0 auto!important; padding:0!important');
        iframeNode.setAttribute('width', width);
        iframeNode.setAttribute('height', height);
        iframeNode.setAttribute('src', 'about:blank');
        iframeNode.setAttribute('frameborder', '0');
        iframeNode.setAttribute('marginwidth', '0');
        iframeNode.setAttribute('marginheight', '0');
        iframeNode.setAttribute('vspace', '0');
        iframeNode.setAttribute('hspace', '0');
        iframeNode.setAttribute('allowtransparency', 'true');
        iframeNode.setAttribute('scrolling', 'no');
        iframeNode.setAttribute('allowfullscreen', 'true');
        iframeNode.setAttribute('id', pIframeId);

        //must append iframe before get contentDocument
        holder.appendChild(iframeNode);

        var adDoc = iframeNode.contentDocument || iframeNode.contentWindow.document;
        adDoc.write(cssStr);
        adDoc.write(jsStr);
        adDoc.write('<script> var pIframeId = "' + pIframeId + '" ;<\/script>');
        adDoc.write(jsForm);
        adDoc.close();
    }
})(window.leoFormDomHolderId, window.leoFormLanguage);