<?php

namespace EllisLab\ExpressionEngine\Model\Template;

use EllisLab\ExpressionEngine\Service\Model\FileSyncedModel;
use EllisLab\ExpressionEngine\Library\Filesystem\Filesystem;

/**
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2014, EllisLab, Inc.
 * @license		https://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 3.0
 * @filesource
 */

// ------------------------------------------------------------------------

/**
 * ExpressionEngine Snippet Model
 *
 * @package		ExpressionEngine
 * @subpackage	Template
 * @category	Model
 * @author		EllisLab Dev Team
 * @link		http://ellislab.com
 */
class Snippet extends FileSyncedModel {

	protected static $_primary_key = 'snippet_id';
	protected static $_table_name = 'snippets';

	protected static $_relationships = array(
		'Site' => array(
			'type' => 'BelongsTo'
		)
	);

	protected $snippet_id;
	protected $site_id;
	protected $snippet_name;
	protected $snippet_contents;
	protected $edit_date;

	/**
	 * Get the full filesystem path to the snippet file
	 *
	 * @return String Filesystem path to the snippet file
	 */
	public function getFilePath()
	{
		if ($this->snippet_name == '')
		{
			return NULL;
		}

		$basepath = PATH_TMPL;

		if (ee()->config->item('save_tmpl_files') != 'y' || $basepath == '')
		{
			return NULL;
		}

		$this->ensureFolderExists();

		$path = $this->getFolderPath();
		$file = $this->snippet_name;
		$ext  = '.html';

		if ($path == '' || $file == '' || $ext == '')
		{
			return NULL;
		}

		return $path.'/'.$file.$ext;
	}

	/**
	 * Get the old snippet path, so that we can delete it if
	 * the path changed.
	 */
	protected function getPreviousFilePath($previous)
	{
		$backup_site = $this->site_id;
		$backup_name = $this->snippet_name;

		$previous = array_merge($this->getValues(), $previous);

		$this->site_id = $previous['site_id'];
		$this->snippet_name = $previous['snippet_name'];

		$path = $this->getFilePath();

		$this->site_id = $backup_site;
		$this->snippet_name = $backup_name;

		return $path;
	}

	/**
	 * Get the data to be stored in the file
	 */
	protected function serializeFileData()
	{
		return $this->snippet_contents;
	}

	/**
	 * Set the model based on the data in the file
	 */
	protected function unserializeFileData($str)
	{
		$this->setProperty('snippet_contents', $str);
	}

	/**
	 * Make the last modified time available to the parent class
	 */
	public function getModificationTime()
	{
		return $this->edit_date;
	}

	/**
	 * Allow our parent class to set the modification time
	 */
	public function setModificationTime($mtime)
	{
		$this->setProperty('edit_date', $mtime);
	}

	/**
	 * Get the full folder path
	 */
	protected function getFolderPath()
	{
		if ($this->snippet_name == '')
		{
			return NULL;
		}

		$basepath = PATH_TMPL;

		if (ee()->config->item('save_tmpl_files') != 'y' || $basepath == '')
		{
			return NULL;
		}

		if ($this->site_id == 0)
		{
			return $basepath.'_global_snippets';
		}

		$site = ee()->config->item('site_short_name');
		return $basepath.$site.'/snippets';
	}

	/**
	 * Make sure the folder exists
	 */
	protected function ensureFolderExists()
	{
		$fs = new Filesystem();
		$path = $this->getFolderPath();

		if (isset($path) && ! $fs->isDir($path))
		{
			$fs->mkDir($path, FALSE);
		}
	}

}
