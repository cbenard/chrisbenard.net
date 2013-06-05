<?php

require_once(PieCrust\PieCrustDefaults::APP_DIR.'/../../libs/markdown/markdown-extra/markdown.php');

class Shortcodes extends MarkdownExtra_Parser
{
    public function __construct()
    {
        $this->document_gamut += array(
            'doMessageBlocks' => 1,
        );

        parent::MarkdownExtra_Parser();
    }

    public function doMessageBlocks($text)
    {
        $edited = str_replace("\n", 'zxcvbasdfgqwerttrewqgfdsabvcxz', $text);
        $edited = str_replace('[/message]', "[/message]\n", $edited);
        preg_match_all('^\[message (\w+)\](.+)\[/message\]^', $edited, $matches);

        if (empty($matches[0])) {
            return $text;
        }

        foreach ($matches[0] as $key => $matched) {
            $div = '<div class="alert alert-' . $matches[1][$key] . '">' . $matches[2][$key] . '</div>';

            $edited = str_replace($matched, $div, $edited);
        }

        $edited = str_replace('zxcvbasdfgqwerttrewqgfdsabvcxz', "\n", $edited);

        return $edited;
    }

	public function _doCodeBlocks_callback($matches) {
		$codeblock = $matches[1];

		$codeblock = $this->outdent($codeblock);
		$codeblock = htmlspecialchars($codeblock, ENT_NOQUOTES);

		# trim leading newlines and trailing newlines
		$codeblock = preg_replace('/\A\n+|\n+\z/', '', $codeblock);

        if ($language = $this->hasLanguageTag($codeblock)) {
            $codeblock = str_replace("[code-{$language}]\n", '', $codeblock);
            $language = "class=\"language-{$language}\"";
        }

        $codeblock = $this->replaceTildesWithStrikethrough($codeblock);

		$codeblock = "<pre class=\"prettyprint\"><code {$language}>{$codeblock}\n</code></pre>";
		return "\n\n".$this->hashBlock($codeblock)."\n\n";
	}

    public function hasLanguageTag($code)
    {
        preg_match('/\[code\-(.*)\]/', $code, $matches);

        if (empty($matches[0])) {
            return false;
        }

        return strtolower($matches[1]);
    }

    public function replaceTildesWithStrikethrough($code)
    {
        preg_match_all('/(~~)(.*)(~~)/', $code, $matches);

        if (empty($matches[0])) {
            return $code;
        }

        foreach ($matches[0] as $key => $matched) {
            $code = str_replace($matched, "<strike>{$matches[2][$key]}</strike>", $code);
        }

        return $code;
    }
}
