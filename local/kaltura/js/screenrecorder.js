// new objects and functions added for setting tags and category
// by m.stubbs@mmu.ac.uk 2013-01-21

// default category
kalturaScreenRecord.default_category = {};

kalturaScreenRecord.set_default_category = function(txt) {
	default_category = txt;
}

kalturaScreenRecord.get_default_category = function(txt) {
	return default_category;
}

// default tags
kalturaScreenRecord.default_tags = {};

kalturaScreenRecord.set_default_tags = function(txt) {
	default_tags = txt;
}

kalturaScreenRecord.get_default_tags = function() {
	return default_tags;
}


// callback function that will be called by library before loading the widget
// this function removes description and tags from UI
// modified by m.stubbs@mmu.ac.uk 2013-01-21
function setCategoryAndTags(objOptions) {
    console.log("object before change");
    console.log(objOptions);
    objOptions['kaltura.submit.title.value'] = '';
    objOptions['kaltura.submit.description.enabled'] = true;
    objOptions['kaltura.submit.description.value'] = '';
    objOptions['kaltura.submit.tags.enabled'] = true;
    objOptions['kaltura.submit.tags.value'] = kalturaScreenRecord.get_default_tags();
    objOptions['kaltura.category'] = kalturaScreenRecord.get_default_category();
    console.log("object after change");
    console.log(objOptions);
    return objOptions;
}


// setting callback to override some kaltura options
kalturaScreenRecord.setModifyKalturaOptionsCallback(setCategoryAndTags);


kalturaScreenRecord.UploadCompleteCallBack = function(entryId) {
    var data      = new Array();
    var media_obj = new Object();
    
    media_obj.entryId  = entryId;
    media_obj.uniqueID = null;
    
    data[0] = media_obj 
     
    onContributionWizardAfterAddEntry(data);
    
    //alert("Kaltura KSR uploadCompleteCallBack: created entry with ID ["+entryId+"]");
}

kalturaScreenRecord.downloadCallBack = function(percent) {

    var progress_bar_container = document.getElementById('progress_bar_container');
    var progress_bar = document.getElementById('progress_bar');
    var slider_border = document.getElementById('slider_border');
    
    if (100 != parseInt(percent)) {

        slider_border.style.border = "1px solid #000000";
        progress_bar_container.style.visibility = 'visible';
        
        
        if ('1px solid #000000' != progress_bar.style.borderRight) {
            progress_bar.style.borderRight = '1px solid #000000';
        }
        
        progress_bar.style.width = percent + '%';
    
    } else {

        progress_bar.style.width = '0%'; 
        progress_bar_container.style.visibility = 'hidden';
        slider_border.style.border = "1px solid #FFFFFF";

    }
}

/**
 * set the ID of a DOM element in your page where the error message would appear if java is not detected.
 * It's innerHTML will be set to the error message.
 * The error messages can be defined using the setDetectText* functions, or simply use the default.
 * If this is not defined and callback is not defined - error will be written to console.log
 */
kalturaScreenRecord.setDetectResultErrorMessageElementId = function(id) {
    this.detectResultError.errorMessageDomId = id /*screenrecorder_btn_container*/;
    
}

/**
 * set the text that would appear/returned if detected that java is disabled in browser
 */
kalturaScreenRecord.setDetectTextJavaDisabled = function(txt) {
    this.detectTexts.javaDisabled = txt;
    //document.getElementById('progress_bar_container').style.visibility = 'hidden';
}

/**
 * set the text that would appear/returned if detected Mac Lion which requires java to be installed
 */
kalturaScreenRecord.setDetectTextmacLionNeedsInstall = function(txt) {
    this.detectTexts.macLionNeedsInstall = txt;
    //document.getElementById('progress_bar_container').style.visibility = 'hidden';
}

/**
 * set the text that would appear/returned if no java was detected
 */
kalturaScreenRecord.setDetectTextjavaNotDetected = function(txt) {
    this.detectTexts.javaNotDetected = txt;
    //document.getElementById('progress_bar_container').style.visibility = 'hidden';
}

/**
 * set a custom callback function name to be called if detect could not find java.
 * If defined, that function will be called and other functionality will not happen (display of error message).
 * That function should expect a single string parameter with the keyword-description of the error.
 * Available keywords: javaDisabled, macLionNeedsInstall, javaNotDetected
 */
kalturaScreenRecord.setDetectResultErrorCustomCallback = function(funcName) {this.detectResultError.customCallback = funcName;}

/**
 *
 */
kalturaScreenRecord.startCallBack = function (result) {
    console.log("Kaltura KSR startCallBack: called " + result + ".");
    
    if (!result) {
        console.log("Kaltura KSR startCallBack: failed to load widget.");
    }
    
    var progress_bar_container = document.getElementById('progress_bar_container');
    progress_bar_container.style.visibility = 'hidden';
    
}