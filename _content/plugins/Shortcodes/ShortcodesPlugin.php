<?php

use PieCrust\PieCrustPlugin;
use PieCrust\Formatters\ShortcodesFormatter;
use PieCrust\IPieCrust;

class ShortcodesPlugin extends PieCrustPlugin
{
    public function getName()
    {
        return 'Shortcodes';
    }

    public function getFormatters()
    {
        require_once(__DIR__.'/src/ShortcodesFormatter.php');
        return [ new ShortcodesFormatter() ];
    }
}
