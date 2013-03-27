<?php
/**
 * Created by JetBrains PhpStorm.
 * User: nigel.daley
 * Date: 3/26/13
 * Time: 1:12 PM
 * To change this template use File | Settings | File Templates.
 */

require_once("../../config.php");


global $CFG, $USER, $DB, $OUTPUT;





require_once("./db/install.php");

xmldb_local_kaltura_install();

get_coursemodule_from_id