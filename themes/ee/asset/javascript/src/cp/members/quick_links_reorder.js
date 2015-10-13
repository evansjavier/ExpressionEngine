/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2015, EllisLab, Inc.
 * @license		https://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 3.0
 * @filesource
 */

(function($) {

"use strict";

$(document).ready(function() {

	$('table').eeTableReorder({
		afterSort: function(row) {
			$.ajax({
				url: EE.quick_links.reorder_url,
				data: {'order': $('input[name="order[]"]').serialize() },
				type: 'POST',
				dataType: 'json',
				success: function(result) {
					$('table tbody').empty().append($(result.success).find('tr:has(td)'));
				},
				error: function(xhr, text, error) {
					// Let the user know something went wrong
					if ($('body > .banner').size() == 0) {
						$('body').prepend(EE.alert.reorder_ajax_fail);
					}
				}
			});
		}
	});

});

})(jQuery);