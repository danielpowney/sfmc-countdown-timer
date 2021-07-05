jQuery(document).ready(function() {  
	
	var sdk = new window.sfdc.BlockSDK();

	//sdk.triggerAuth('cf5a804f-c6e5-4a12-8291-b1e1333cb9cc');
	jQuery("#sfmcct-generate-btn").on('click', function() {

		var endDate = jQuery("#sfmcct-end-date").val();

		// See here https://www.salesforce.com/video/3621716/
		// test here https://blocktester.herokuapp.com/
		sdk.setContent( endDate, function (content) { });
	});

});