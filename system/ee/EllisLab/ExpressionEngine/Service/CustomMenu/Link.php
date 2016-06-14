<?php

namespace EllisLab\ExpressionEngine\Service\CustomMenu;

/**
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2016, EllisLab, Inc.
 * @license		https://expressionengine.com/license
 * @link		https://ellislab.com
 * @since		Version 3.4
 * @filesource
 */

// ------------------------------------------------------------------------

/**
 * ExpressionEngine Database Connection
 *
 * @package		ExpressionEngine
 * @subpackage	CP\CustomMenu
 * @category	Service
 * @author		EllisLab Dev Team
 * @link		https://ellislab.com
 */
class Link {

	public $title;
	public $url;

	/**
	 * Create a new menu item
	 *
	 * @param String $title Text of the menu item
	 * @param Mixed $url URL string or CP/URL object
	 */
	public function __construct($title, $url)
	{
		$this->title = $title;
		$this->url = $url;
	}

	/**
	 * Is this a submenu?
	 *
	 * @return bool False
	 */
	public function isSubmenu()
	{
		return FALSE;
	}
}
