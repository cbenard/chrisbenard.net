<?php

namespace PieCrust\Formatters;

use PieCrust\IPieCrust;

class ShortcodesFormatter implements IFormatter
{
    protected $pieCrust;
    protected $parser;
    
    public function initialize(IPieCrust $pieCrust)
    {
        $this->pieCrust = $pieCrust;
        $this->parser = null;
    }
    
    public function getPriority()
    {
        return IFormatter::PRIORITY_DEFAULT;
    }

    public function isExclusive()
    {
        return true;
    }
    
    public function supportsFormat($format)
    {
        return strtolower($format) == 'shortcodes';
    }
    
    public function format($text)
    {
        if ($this->parser == null)
        {
            require_once (__DIR__.'/Shortcodes.php');
            $this->parser = new \Shortcodes;
        }

        $this->parser->fn_id_prefix = '';
        $executionContext = $this->pieCrust->getEnvironment()->getExecutionContext();
        if ($executionContext != null)
        {
            $page = $executionContext->getPage();
            if ($page && !$executionContext->isMainPage())
            {
                $footNoteId = $page->getUri();
                $this->parser->fn_id_prefix = $footNoteId . "-";
            }
        }
        return $this->parser->transform($text);
    }
}
