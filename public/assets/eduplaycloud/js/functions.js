/**
 * Show blockUI
 *
 * @return void
 */
function showLoader() {
    $.blockUI({
        message: '<img src="' + site_url + '/assets/eduplaycloud/image/loader.gif" alt="Loading" width="100" />',
        centerY: false,
        centerX: false,
        css: {
            border: 'none',
            backgroundColor: 'none'
        }
    });
}

/**
 * Hide blockUI
 *
 * @return void
 */
function hideLoader() {
    $.unblockUI();
}
