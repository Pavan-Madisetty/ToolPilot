import type { FaqMap } from './types';

export const FAQS: FaqMap = {
  'word-counter': [
    {
      question: 'How does an online word counter count words?',
      answer:
        "This word counter splits your text wherever there is whitespace (spaces, tabs or line breaks) and counts each resulting chunk as one word. So 'well-known' and \"don't\" each count as one word, and numbers count too. It also shows characters, sentences, reading time and your five most frequent words.",
    },
    {
      question: 'How many words is 1000 characters?',
      answer:
        'About 150 to 200 words. Average English words run roughly 5 letters plus a space, so about 6 characters each, and 1000 characters comes to around 165 words. Long technical words lower the count and short words raise it, so paste your actual text to get an exact number.',
    },
    {
      question: 'Does the character count include spaces?',
      answer:
        'Yes. The Characters figure is the full length of your text, including spaces, tabs and line breaks. If a form asks for a limit without spaces, subtract the spaces yourself. Emoji and some symbols can count as two characters because of how browsers measure text length.',
    },
    {
      question: 'How is reading time calculated?',
      answer:
        'Reading time is your word count divided by 200 words per minute, rounded up to the next whole minute, with a minimum of 1 minute. So 500 words shows about 3 minutes. Many adults read 200 to 250 words per minute on screen, so treat it as a rough estimate.',
    },
    {
      question: 'Why is my sentence count different from what I expected?',
      answer:
        'Sentences are counted by splitting on full stops, question marks and exclamation marks. Decimals like 3.14, abbreviations like Dr. and web addresses each add an extra split, and text with no end punctuation counts as one sentence. Treat the number as an approximation for messy text.',
    },
    {
      question: 'What does the keyword density list show?',
      answer:
        'It lists your five most repeated words, with the number of times each appears and its share of the total word count. Words of one or two letters are ignored and case and punctuation are stripped. It is a quick way to spot overused words or check that a target keyword appears naturally.',
    },
  ],

  'case-converter': [
    {
      question: 'What is the difference between camelCase and snake_case?',
      answer:
        'camelCase joins words with no separator and capitalises each word after the first, like userFirstName. snake_case keeps everything lowercase and joins words with underscores, like user_first_name. Programming languages differ: JavaScript usually favours camelCase, while Python and database columns often use snake_case.',
    },
    {
      question: 'How do I convert text to camelCase?',
      answer:
        "Type or paste words separated by spaces, then press camelCase. 'hello world example' becomes 'helloWorldExample'. The first letter is lowercased, each later word is capitalised and the spaces are removed. The result replaces your text in the box, and the Copy button copies it.",
    },
    {
      question: 'What case styles does this converter support?',
      answer:
        'It converts to UPPERCASE, lowercase, camelCase, snake_case and kebab-case. Each button rewrites the text in the input box, so use Clear or retype if you want to start over. There is no undo, so copy your original text first if you need to keep it.',
    },
    {
      question: 'How do I convert text to kebab-case?',
      answer:
        "Enter your words and press kebab-case. Spaces become hyphens and letters become lowercase, so 'My Blog Post Title' turns into 'my-blog-post-title'. Kebab-case is common in URLs, CSS class names and file names. Punctuation is not removed, so clean it first if you need a strict slug.",
    },
    {
      question: 'Why does snake_case not split my camelCase words?',
      answer:
        "The snake_case and kebab-case buttons only replace spaces and lowercase the text, so 'helloWorld' becomes 'helloworld', not 'hello_world'. To convert between styles, first put spaces between the words, for example 'hello World', and then apply the case you want.",
    },
    {
      question: 'Why does camelCase not work on my snake_case text?',
      answer:
        "The camelCase button treats spaces as word breaks, and an underscore is not treated as one. 'hello_world' stays 'hello_world'. Replace the underscores or hyphens with spaces first ('hello world'), then press camelCase to get 'helloWorld'.",
    },
  ],

  'slug-generator': [
    {
      question: 'What is a URL slug?',
      answer:
        "A slug is the readable last part of a web address that identifies a page, such as 'best-pizza-recipes' in example.com/blog/best-pizza-recipes. It is normally lowercase, uses hyphens between words and avoids spaces and symbols so the link is easy to read, share and type.",
    },
    {
      question: 'How do I turn a title into a slug?',
      answer:
        "Paste your title into Source Text. With the default options it lowercases the text, replaces spaces with hyphens and strips special characters. 'Learn React TypeScript in 2026! @Productivity' becomes 'learn-react-typescript-in-2026-productivity'. Then press Copy Slug.",
    },
    {
      question: 'Should slugs use hyphens or underscores?',
      answer:
        'Hyphens are the usual choice. Google recommends hyphens for separating words in URLs because it treats them as word separators, whereas underscores can join words together. This tool converts spaces to hyphens, though it leaves any underscores you typed in place.',
    },
    {
      question: 'What happens to accented letters and non-English characters?',
      answer:
        "With Remove Special Characters on, only letters A to Z, digits, hyphens and underscores are kept. Accented and non-Latin letters are removed rather than transliterated, so 'café' becomes 'caf'. Type the plain version yourself, such as 'cafe', before generating.",
    },
    {
      question: 'What do the three slug options do?',
      answer:
        'Convert to Lowercase makes every letter lowercase. Remove Special Characters strips punctuation and symbols. Replace Spaces turns whitespace into single hyphens and trims hyphens from the ends. Turning Replace Spaces off leaves spaces in the output, which is usually not what a URL needs.',
    },
    {
      question: 'How long should a URL slug be?',
      answer:
        'Aim for a few meaningful words, roughly 3 to 6, that describe the page. Short slugs are easier to read and share, and shorter URLs are less likely to be cut off in results. There is no strict limit, but drop filler words like the, and and of where the meaning stays clear.',
    },
  ],

  'text-diff': [
    {
      question: 'How do I compare two texts and see the differences?',
      answer:
        'Paste the original text on the left and the changed version on the right. The Diff Output below compares them line by line. Unchanged lines appear grey, removed lines are red with a minus sign, and added lines are green with a plus sign. It updates as you type.',
    },
    {
      question: 'Does this diff tool compare by line or by word?',
      answer:
        'By line, and by position. Line 1 is compared with line 1, line 2 with line 2, and so on. A line that differs is shown as one removed line and one added line, with no highlighting of the individual words that changed inside it.',
    },
    {
      question: 'Why does one inserted line mark everything after it as changed?',
      answer:
        'Because lines are matched by position, not aligned by content. If you insert a line near the top, every later line shifts down and no longer matches its counterpart. For best results compare texts with the same line structure, or compare shorter sections at a time.',
    },
    {
      question: 'Can I compare code or configuration files with it?',
      answer:
        'Yes, for short files. Paste both versions and the monospaced output shows which lines differ, including changes in indentation or trailing spaces. For long files with inserted or moved blocks, a dedicated diff tool that aligns matching lines, like Git, will give cleaner results.',
    },
    {
      question: 'What do the red and green lines mean in a diff?',
      answer:
        'Red lines starting with a minus sign exist only in the original text, so they were removed or changed. Green lines starting with a plus sign exist only in the modified text, so they were added or are the new wording. Grey lines are identical in both.',
    },
    {
      question: 'Is whitespace or letter case ignored when comparing?',
      answer:
        'No. The comparison is an exact match, so an extra space, a different capital letter or a different line ending makes that line show as changed. If you want to ignore formatting differences, tidy both texts first, for example with the Remove Spaces tool.',
    },
  ],

  'markdown-editor': [
    {
      question: 'What Markdown syntax does this editor support?',
      answer:
        'It renders GitHub-flavoured Markdown, including headings, bold and italic, lists, task lists, tables, fenced code blocks, blockquotes, links, images and strikethrough. Headings get automatic anchor IDs. The preview is sanitised, so scripts and unsafe HTML are stripped out.',
    },
    {
      question: 'How do I open and save a Markdown file?',
      answer:
        'Press Open file, or drag a file onto the editor. It accepts .md, .markdown, .mdown and .txt files. Press Save .md to download your text as a Markdown file. Everything happens in your browser, so nothing is uploaded.',
    },
    {
      question: 'Is my Markdown saved automatically?',
      answer:
        'No. The editor does not store your text between visits, so refreshing or closing the tab loses unsaved work. Press Save .md to download a copy regularly. If you paste in a long document, save it before you leave the page.',
    },
    {
      question: 'How do I get the HTML from my Markdown?',
      answer:
        'Use the Copy HTML button in the preview pane to copy the generated HTML to your clipboard. You can then paste it into a CMS, an email template or a web page. The HTML is sanitised, and links that start with http open in a new tab.',
    },
    {
      question: 'What is the difference between Markdown and HTML?',
      answer:
        'Markdown is a lightweight way to write formatted text using plain characters, such as a hash for a heading or asterisks for bold. HTML is the markup language browsers use. Markdown is faster to write and read, and it is converted to HTML for display.',
    },
    {
      question: 'What do the Edit, Split and Preview modes do?',
      answer:
        'Edit shows only the writing area, Preview shows only the rendered result, and Split shows both side by side so you can watch the preview update as you type. Split view is available on wider screens only, so phones use Edit and Preview.',
    },
  ],

  'text-to-emoji': [
    {
      question: 'How do I translate text into emojis?',
      answer:
        "Choose Word Translation and type a sentence. Words that match the built-in dictionary are replaced with an emoji, so 'I love pizza' becomes 'I ❤️ 🍕'. Words with no match stay as normal text. Press Copy to use the result in a chat or post.",
    },
    {
      question: 'Which words can be turned into emojis?',
      answer:
        'The dictionary has about 70 common words, such as love, heart, cat, dog, pizza, coffee, fire, star, rocket, party and music. Matching is for whole words, ignoring capitals and surrounding punctuation, so plural forms like cats are not matched. Rarer words are left as they are.',
    },
    {
      question: 'What is the Block Letter Speller?',
      answer:
        'It spells your text using emoji-style block characters instead of regular letters, for example numbers become keycap digits like 1️⃣ and question marks become ❓. It is meant for decorative captions. Only some letters and symbols have a block version, and the rest stay as normal characters.',
    },
    {
      question: 'Why do some letters stay plain in the block speller?',
      answer:
        'The block speller has emoji-style versions for letters A to Q, the digits 0 to 9, and the symbols ? and !. Other letters and punctuation are passed through unchanged. It can look uneven on words that use later letters of the alphabet.',
    },
    {
      question: 'Will the emojis look the same on every device?',
      answer:
        'No. Each platform, such as Apple, Google, Samsung or Windows, draws its own emoji artwork, so the same character looks slightly different between devices. Very new emojis can show as an empty box on older systems. The underlying character is the same, so it always copies correctly.',
    },
    {
      question: 'Can I use the output on social media and in messages?',
      answer:
        'Yes. The output is plain Unicode text, so you can paste it into Instagram, WhatsApp, X, email or a document. Some block characters may render differently or fall back to plain letters in apps with limited emoji support, so preview it before you post.',
    },
  ],

  'stylish-text': [
    {
      question: 'How does a stylish text generator work?',
      answer:
        'It swaps ordinary letters for look-alike characters from Unicode, such as bold, script, gothic, double-struck, bubble and fullwidth letters. Because these are real text characters, not font files, you can copy and paste them into bios, captions and chats without installing anything.',
    },
    {
      question: 'How do I use fancy fonts in Instagram or WhatsApp?',
      answer:
        'Type your text, choose the style you like and press Copy, then paste it into your bio, name, caption or chat. It works on most apps because they display Unicode, though some fields or older devices may filter certain characters, so check the result after pasting.',
    },
    {
      question: 'Why do some styled letters appear as boxes?',
      answer:
        'A box or question mark means the device or app has no font that contains that Unicode character. Common styles like bold and italic are widely supported, while rarer ones such as gothic and script are more likely to break on older systems. Try a different style if it happens.',
    },
    {
      question: 'Are fancy text fonts bad for accessibility and SEO?',
      answer:
        'They can be. Screen readers may spell out styled characters or skip them, and search engines and in-app search may not match them to normal words. Use them for short decorative text like a nickname, and keep important content, headings and links in plain text.',
    },
    {
      question: 'Which characters get converted?',
      answer:
        'Only the letters A to Z, in upper and lower case, and the digits 0 to 9 are converted. Spaces, punctuation, accented letters and other scripts are left unchanged. The page also offers decorative brackets, symbols and effects such as strikethrough and upside-down text.',
    },
    {
      question: 'Are these real fonts or Unicode symbols?',
      answer:
        'They are Unicode symbols, not fonts. A font changes how ordinary letters are drawn, while these are different characters that only look like styled letters. That is why they survive copy and paste, but they cannot be restyled with font settings in a word processor.',
    },
  ],

  'emoji-search': [
    {
      question: 'How do I copy an emoji from this page?',
      answer:
        'Search by name or keyword, or pick a category, then click an emoji to copy it to your clipboard. A confirmation appears once it is copied. Paste it anywhere with Ctrl+V or Cmd+V, or by long-pressing on a phone.',
    },
    {
      question: 'How do I search for an emoji by name?',
      answer:
        "Type a word into the search box, such as happy, cat, fire or heart. The search matches emoji names, categories and keywords, so 'lol' finds the laughing faces and 'party' finds celebration emojis. You can also narrow the results with the category buttons, such as Food or Travel.",
    },
    {
      question: 'How do I change the skin tone of an emoji?',
      answer:
        'Pick a tone from the Tone selector before you copy. The tone is added to the emojis that support it, which here are the hand and gesture emojis such as thumbs up, wave, clap and folded hands. Other emojis, such as faces and animals, copy unchanged.',
    },
    {
      question: 'Does this page include every emoji?',
      answer:
        'No. It is a curated set of about 90 popular emojis across categories like smileys, gestures, animals, food, travel, objects and symbols. It is quick for everyday use, but it is not the complete Unicode emoji list, so a very specific or brand-new emoji may not be listed.',
    },
    {
      question: 'Why does an emoji look different on my phone?',
      answer:
        'Emoji are standard characters, but each company draws its own artwork. The same emoji can look different on iPhone, Android and Windows. What you copy is the character itself, so the recipient sees it in their own device style.',
    },
    {
      question: 'Why can I not copy an emoji to my clipboard?',
      answer:
        'Copying uses your browser clipboard feature, which needs a secure page and can be blocked by browser or privacy settings. If nothing copies, allow clipboard access for the site or try another browser. You can also select the emoji and copy it manually.',
    },
  ],

  'pdf-to-markdown': [
    {
      question: 'How do I convert a PDF to Markdown?',
      answer:
        'Drop a PDF onto the upload area or click to browse, then wait while the text is extracted page by page. When it finishes, press Copy to copy the Markdown. The file is read inside your browser, and the page states a maximum size of 25 MB.',
    },
    {
      question: 'Can it convert a scanned PDF or an image-only PDF?',
      answer:
        'No. The tool reads the text layer that already exists in the PDF and does not do OCR. A scanned document is just pictures of pages, so it will produce little or no text. Run it through an OCR tool first to add a text layer, then convert it.',
    },
    {
      question: 'Will headings, tables and lists be preserved?',
      answer:
        'Not automatically. The tool extracts plain text, starts a new line when the vertical position changes, and adds a Page heading (## Page 1, ## Page 2 and so on) for each page. It does not detect headings, bullet lists, tables or images, so expect to add that formatting yourself.',
    },
    {
      question: 'Why is the text order wrong or the layout messy?',
      answer:
        'PDFs store text in positioned fragments rather than in reading order. Multi-column pages, sidebars, headers, footers and footnotes can come out interleaved or repeated. Cleaning the result in a Markdown editor is usually needed for complex layouts.',
    },
    {
      question: 'Is my PDF uploaded to a server?',
      answer:
        'No. Extraction runs locally with a PDF reader bundled into the page, so your document is processed on your own device. That makes it suitable for private files, although very large or complex PDFs may take longer to process on a slow computer.',
    },
    {
      question: 'What is the difference between converting a PDF to Markdown and to Word?',
      answer:
        'Markdown is plain text with simple formatting marks, ideal for notes, documentation and content management systems. Word keeps page layout, fonts and images. Since this tool outputs text only, it suits reusing the words of a PDF, not reproducing its design.',
    },
  ],

  'numbers-to-words': [
    {
      question: 'How do I write a number in words?',
      answer:
        "Type the number into the box with English Words selected and the spelled-out result appears. 1234 becomes 'one thousand two hundred thirty-four'. Tens and units are joined with a hyphen, as in forty-five, and you can copy the result with one click.",
    },
    {
      question: 'How are decimals and negative numbers converted?',
      answer:
        "Negatives start with 'minus', and decimals are read digit by digit after 'point'. So 12345.67 becomes 'twelve thousand three hundred forty-five point six seven', and -5 becomes 'minus five'. Zeros after the point are read as 'zero'.",
    },
    {
      question: 'How large a number can it convert?',
      answer:
        'The English converter goes up to the trillions, with the scale words thousand, million, billion and trillion. JavaScript numbers lose precision beyond about 15 significant digits, so extremely long numbers may not convert exactly. For cheque-sized amounts it is reliable.',
    },
    {
      question: 'Does it add the word and, as in one hundred and five?',
      answer:
        "No. It uses the American style with no 'and', so 105 is 'one hundred five'. British English usually adds 'and' after hundreds ('one hundred and five'). If you need that style, insert the word yourself after copying the result.",
    },
    {
      question: 'How do I convert a number to Chinese characters?',
      answer:
        'Switch to Chinese Characters and enter the number. It gives the Simplified Chinese numeral with a pinyin reading, so 12345 becomes 一万二千三百四十五. It uses everyday numerals like 一 二 三, not the formal financial forms used on cheques, such as 壹 貳 叁.',
    },
    {
      question: 'Can I use it to write cheque amounts with currency?',
      answer:
        'It only converts the number itself and does not add currency names like dollars or rupees, or the word only. For a cheque, copy the words it produces and add the currency and cents wording your bank expects. The decimal part is read digit by digit, not as cents.',
    },
  ],

  'detect-language': [
    {
      question: 'How does the language detector work?',
      answer:
        'It checks which writing systems appear in the text and counts common function words such as the, el, der or et for each supported language, then picks the language with the highest score. It is a lightweight heuristic that runs in your browser, not a machine-learning model.',
    },
    {
      question: 'Which languages can it identify?',
      answer:
        'It supports 13 languages: English, Spanish, French, German, Italian, Portuguese, Dutch, Russian, Arabic, Chinese, Japanese, Korean and Hindi. Text in other languages may be matched to the closest listed one or reported as unknown.',
    },
    {
      question: 'Why does a short sentence give the wrong language?',
      answer:
        'Short text has too few clues. Detection relies on common words and character sets, so a phrase with none of the known words scores nothing. Paste at least a full sentence or two. Names, brand terms and mixed-language text can also mislead the result.',
    },
    {
      question: 'What does the confidence percentage mean?',
      answer:
        'It is a simple score derived from how many matching characters and common words were found, scaled from 40% to 100%. It is not a statistical probability. A higher value means more evidence in your text, and a low value means you should treat the guess with caution.',
    },
    {
      question: 'Can it tell Spanish from Portuguese or Chinese from Japanese?',
      answer:
        'Often, but not always. Related languages share many words, so short Spanish and Portuguese texts can be confused. Japanese is recognised by its kana characters, but a text written only in kanji looks like Chinese to the tool. Longer text gives better results.',
    },
    {
      question: 'What does Unknown (likely English) mean?',
      answer:
        'It means none of the supported languages scored any matches, for example because the text is very short, is numbers or symbols only, or is in an unsupported language. The tool then shows English as a low-confidence fallback, so do not treat it as a real detection.',
    },
  ],

  'remove-spaces': [
    {
      question: 'How do I remove extra spaces between words?',
      answer:
        'Choose Collapse Double Spaces and paste your text. Every run of spaces or tabs is replaced with a single space, so \'too    many   spaces\' becomes \'too many spaces\'. Line breaks are left in place, and you can copy the cleaned text with one click.',
    },
    {
      question: 'How do I remove all line breaks from text?',
      answer:
        'Select Remove Line Breaks. Every line break is replaced with a space and any repeated whitespace is collapsed, giving you one continuous paragraph. This is handy for text copied from a PDF or email where each line ends with a hard return.',
    },
    {
      question: 'What is the difference between Strip All Spaces and Collapse?',
      answer:
        'Collapse keeps one space between words, so the text stays readable. Strip All Spaces removes every whitespace character, including spaces, tabs and line breaks, so words run together like \'helloworld\'. Use Strip All for codes and numbers, and Collapse for normal prose.',
    },
    {
      question: 'How do I remove spaces at the start and end of each line?',
      answer:
        'Use Trim Lines. It removes leading and trailing spaces and tabs from every line while keeping the line breaks and the spaces between words. It is useful for cleaning indented text, copied lists and CSV-style data.',
    },
    {
      question: 'How can I remove blank lines between paragraphs?',
      answer:
        'Remove Line Breaks joins everything into one line, which also removes the blank lines. If you want to keep separate lines but drop empty ones, the Sort & Dedupe Lines tool has a Remove empty lines switch that does exactly that.',
    },
    {
      question: 'Does it remove non-breaking spaces or invisible characters?',
      answer:
        'The Strip All Spaces and Remove Line Breaks options use whitespace matching, which normally covers non-breaking spaces as well as regular ones. The Collapse and Trim Lines options are more limited. Zero-width and other invisible characters may remain, so check the output if the source is web text.',
    },
  ],

  'read-math-expressions': [
    {
      question: 'How do I read a math equation out loud in words?',
      answer:
        "Type the expression, for example 2 + 3 = 5. It is converted to 'two plus three equals five'. Numbers are spelled out and operators are replaced with words. You can copy the wording or press the speaker button to hear it read aloud.",
    },
    {
      question: 'Which symbols does it understand?',
      answer:
        "It handles plus, minus, multiply (* or x), divide (/), equals, the caret for powers and parentheses. So 3^2 reads 'three to the power of two'. Other symbols such as square roots, fractions, integrals or Greek letters are not translated and are dropped.",
    },
    {
      question: 'Why does the letter x read as multiplied by?',
      answer:
        "The letter x is treated as a multiplication sign, so 2x3 reads 'two multiplied by three'. If x is a variable in your equation, such as x + 1, the spoken text will be wrong. Use another letter for variables, or edit the wording after copying it.",
    },
    {
      question: 'How does it read decimals and large numbers?',
      answer:
        "Decimals are read digit by digit after the word point, so 3.14 becomes 'three point one four'. Whole numbers are spelled out with hundreds, thousands, millions and billions, so 1250 is 'one thousand two hundred fifty'. Numbers beyond the billions are not supported.",
    },
    {
      question: 'Can it speak the expression aloud?',
      answer:
        'Yes. The speaker button uses your browser built-in speech synthesis to read the words out loud. Which voice you hear, and how good it sounds, depends on your device and browser. If you hear nothing, check your volume and that your device has a speech voice installed.',
    },
    {
      question: 'Who is this useful for?',
      answer:
        'It helps with writing accessible math descriptions, preparing captions or scripts, checking how an equation is phrased, and learning how to say expressions in English. It handles simple arithmetic-style expressions, not full mathematical notation.',
    },
  ],

  'date-converter': [
    {
      question: 'How do I convert a Gregorian date to a Hijri date?',
      answer:
        'Pick the date in the Gregorian calendar picker and the Hijri (Islamic) date appears below with its month name and the AH suffix. The Persian solar (Shamsi) date is shown as well. Choose a language button to change how the dates are written, then copy the result.',
    },
    {
      question: 'Is the Hijri date exact?',
      answer:
        'It is a calculated date, not an observed one. The tool uses an arithmetic Islamic calendar formula, while religious dates such as the start of Ramadan or Eid depend on local moon sighting or official calendars, so the real date can differ by a day or two. Confirm important dates with your local authority.',
    },
    {
      question: 'Which calendars and languages are supported?',
      answer:
        'Input is the Gregorian calendar, and output includes the Hijri Islamic calendar and the Persian solar calendar. You can view results in English, Chinese, Spanish, French and Arabic. The full Gregorian date, with weekday, is formatted in the language you select.',
    },
    {
      question: 'What is the Persian solar (Shamsi) calendar?',
      answer:
        'It is the solar calendar used officially in Iran and Afghanistan, whose year starts at the spring equinox with Farvardin. Its year is about 621 or 622 years behind the Gregorian year count. The tool shows the date with SH after it and lists the month names such as Farvardin and Esfand.',
    },
    {
      question: 'What is the difference between Gregorian and Hijri calendars?',
      answer:
        'The Gregorian calendar is solar with 365 or 366 days a year. The Hijri calendar is lunar with 12 months of 29 or 30 days, about 354 days a year, so its dates drift about 11 days earlier against the Gregorian year and holidays move through the seasons.',
    },
    {
      question: 'Can I convert a Hijri date back to Gregorian?',
      answer:
        'No. This tool converts in one direction only, starting from a Gregorian date you choose. For the reverse, try different Gregorian dates until the Hijri result matches the one you need, or use a dedicated Hijri-to-Gregorian converter.',
    },
  ],

  pomodoro: [
    {
      question: 'What is the Pomodoro Technique?',
      answer:
        'It is a time management method created by Francesco Cirillo in the late 1980s. You work in focused 25-minute blocks called pomodoros, take a 5-minute break after each, and after four blocks take a longer break of about 15 to 30 minutes. The name comes from his tomato-shaped kitchen timer.',
    },
    {
      question: 'How do I use this Pomodoro timer?',
      answer:
        'Press Start on the Work Focus timer, which defaults to 25 minutes, and focus until it rings. It then switches to a 5-minute Short Break, and you press Start again to run it. You can also switch modes yourself, skip ahead or reset the current timer.',
    },
    {
      question: 'Can I change the 25/5 timing?',
      answer:
        'Yes. The work, short break and long break lengths are editable in the settings, with defaults of 25, 5 and 15 minutes. Changes apply to the timer straight away. The lengths reset to those defaults when you reload the page, though your completed-session stats are kept.',
    },
    {
      question: 'How many pomodoros should I do in a day?',
      answer:
        'There is no fixed number. Many people aim for 4 to 8, which is roughly 2 to 3 and a half hours of focused work. Four pomodoros plus three 5-minute breaks takes about 115 minutes. Start small and adjust to your energy and the kind of task.',
    },
    {
      question: 'Are my focus stats saved?',
      answer:
        'The completed sessions and total focus minutes are saved in your browser local storage on this device, so they remain after you close the tab. They are not synced between devices and can be lost if you clear site data. A Reset button clears them. A session counts only when a work timer reaches zero.',
    },
    {
      question: 'Does the timer keep running in a background tab?',
      answer:
        'Keep the tab open, as the timer runs on the page itself and stops if you close it. Browsers can slow timers in background tabs, especially on phones or with battery saving on, so it can drift slightly. A chime and an on-screen message mark the end of each session, and you can mute the sound.',
    },
  ],

  stopwatch: [
    {
      question: 'How do I use the online stopwatch and record laps?',
      answer:
        'Press Start to begin timing and Pause to stop. While it is running, press Lap to record a split. Each lap shows its own lap time and the cumulative total, and newer laps appear at the top of the list. Reset clears the time and all laps.',
    },
    {
      question: 'How precise is the stopwatch?',
      answer:
        'It displays minutes, seconds and hundredths of a second (mm:ss.cc). It measures elapsed time using the browser high-resolution clock, so the reading stays accurate even if the display updates slowly. Human reaction time when you press the buttons is the biggest source of error.',
    },
    {
      question: 'What is the difference between lap time and total time?',
      answer:
        'Lap time is the time since the previous lap, or since the start for the first lap. Total (cumulative) time is the running time from the start. If you record laps at 1:00 and 2:30, the second lap time is 1:30 and the total is 2:30.',
    },
    {
      question: 'Does it highlight my fastest and slowest lap?',
      answer:
        'Yes. Once you have recorded at least two laps, the fastest and slowest laps are marked so you can compare your pacing at a glance. This is useful for running, swimming or any repeated task.',
    },
    {
      question: 'Are my laps saved if I close the page?',
      answer:
        'No. Times and laps are kept only while the page is open and are not saved to your browser. Reloading or closing the tab clears them, so note down or copy your results before leaving.',
    },
    {
      question: 'Does the stopwatch go past 60 minutes?',
      answer:
        'It keeps counting, but it shows minutes rather than switching to hours, so 75 minutes appears as 75:00.00. It works for long sessions as long as the tab stays open. For a countdown to a set time, use the Countdown Timer instead.',
    },
  ],

  countdown: [
    {
      question: 'How do I set a countdown timer for a specific time?',
      answer:
        'Use Duration mode to enter hours, minutes and seconds, then press Start. For example, 0 hours, 10 minutes, 0 seconds counts down 10 minutes. Pause and resume are available while it runs, and an alarm chime sounds when it reaches zero.',
    },
    {
      question: 'How do I count down to a date, like a birthday or event?',
      answer:
        'Switch to Target Date / Time, pick a future date and time, and press Start. The timer counts down the seconds between now and that moment in your device local time zone. A date in the past shows an error asking for a future date and time.',
    },
    {
      question: 'What is the longest countdown I can set?',
      answer:
        'Duration mode accepts up to 23 hours, 59 minutes and 59 seconds. For anything longer, such as several days, use Target Date / Time, which has no fixed upper limit other than the dates your browser date picker allows.',
    },
    {
      question: 'Will the timer keep running if I leave the tab or close the browser?',
      answer:
        'Keep the page open. The countdown runs in the page, is not saved, and is lost if you close or reload the tab. Browsers may also slow timers in background tabs, so for an important deadline check the time again when you come back.',
    },
    {
      question: 'Will there be a sound when the countdown ends?',
      answer:
        'Yes. A chime plays when the timer reaches zero and repeats until you dismiss it. Sound depends on your device volume and browser audio settings, so on a phone that is muted or locked you might not hear it.',
    },
    {
      question: 'What is the difference between a countdown timer and a stopwatch?',
      answer:
        'A countdown timer starts from a set time and counts down to zero, then signals you. A stopwatch starts at zero and counts up so you can measure how long something takes. Use a countdown for deadlines, cooking and exams, and a stopwatch for timing an activity.',
    },
  ],

  todo: [
    {
      question: 'How do I use this to-do list?',
      answer:
        'Type a task, choose a priority of low, medium or high, optionally add a due date, and press Add. Click the circle beside a task to mark it done. Use the filters for All, Active, Completed or High priority, and choose a sort order for the list.',
    },
    {
      question: 'Where are my to-do tasks stored?',
      answer:
        'Tasks are saved in your browser local storage on this device only. There is no account or cloud sync, so they will not appear on your phone or another browser, and clearing site data or using a private window can erase them. Keep a copy of anything important elsewhere.',
    },
    {
      question: 'How does priority sorting work?',
      answer:
        'With Priority sorting, high-priority tasks appear first, then medium, then low. You can also sort by due date, with the earliest deadline first and undated tasks last, or alphabetically. The High filter shows only your high-priority items.',
    },
    {
      question: 'How do I remove finished tasks?',
      answer:
        'Use the option to clear completed tasks, which deletes every task marked done after a confirmation. You can also delete a single task with its trash icon. Deleted tasks cannot be recovered, because nothing is kept on a server.',
    },
    {
      question: 'Why do I see sample tasks the first time?',
      answer:
        'On your first visit the list starts with a few example tasks to show how it works, such as one marked done and two still pending. Delete them, or clear completed tasks, when you are ready to add your own.',
    },
    {
      question: 'Does the to-do list send reminders or notifications?',
      answer:
        'No. Due dates are shown on each task, but the tool does not send alerts or emails. Check the list regularly, or sort by due date so the nearest deadlines are at the top. For a timed reminder, pair it with the Countdown Timer.',
    },
  ],

  checklist: [
    {
      question: 'How do I create a checklist online?',
      answer:
        'Type an item and press Enter, or use Bulk Add to paste several items with one per line. Tick items off as you finish them, and watch the progress percentage update. It works for packing lists, shopping lists, onboarding steps or any routine.',
    },
    {
      question: 'How do I reuse a checklist?',
      answer:
        'Press Reset Checks to untick every item while keeping the list itself. That lets you run the same routine again, such as a weekly review or a travel packing list. Clear All deletes all items after a confirmation.',
    },
    {
      question: 'Is my checklist saved, and where?',
      answer:
        'Yes, automatically, in your browser local storage on this device. It is still there when you return, but it does not sync across devices and can disappear if you clear site data or use a private window. There is no account.',
    },
    {
      question: 'Can I share a checklist with someone else?',
      answer:
        'Not through a link. The checklist lives only in your own browser, and the tool has no sharing feature or accounts. To share it, copy the item text and send it in a message or document, or paste it into their Bulk Add box.',
    },
    {
      question: 'How do I add many checklist items at once?',
      answer:
        'Open the Bulk Add box, paste your items with one per line, and press the add button. Each non-empty line becomes an unchecked item, and blank lines are skipped. This is quick when moving a list from notes or a spreadsheet column.',
    },
    {
      question: 'What is the difference between a checklist and a to-do list?',
      answer:
        'A checklist is a reusable set of steps you run through repeatedly, such as a launch or packing list, so it is reset and reused. A to-do list holds one-off tasks with priorities and due dates that you finish and remove.',
    },
  ],

  notes: [
    {
      question: 'How do I use this online notes app?',
      answer:
        'Press the add button to create a note, give it a title and write in the editor. Your notes list appears on the left and you can search titles and text. Notes save automatically as you type. Switch to Preview to see formatted text and use Copy Content to copy the note.',
    },
    {
      question: 'Where are my notes stored?',
      answer:
        'In your browser local storage on this device. Nothing is uploaded, so the notes are private, but they exist only in this browser. They are not synced to other devices and will be lost if you clear site data or use a private window. Copy important notes elsewhere as a backup.',
    },
    {
      question: 'Does the notes app support Markdown formatting?',
      answer:
        'Yes. You write in plain text with Markdown, using hashes for headings, asterisks for bold and italic, and dashes for bullets. The Preview tab renders the formatting. It uses a basic renderer, so advanced Markdown such as tables may not display fully.',
    },
    {
      question: 'Can I organise notes into folders?',
      answer:
        'No. Notes are kept as a single searchable list, and there are no folders or tags. Put a keyword or prefix in the note title and use the search box to filter by it.',
    },
    {
      question: 'Is there a limit to how many notes I can keep?',
      answer:
        'There is no set count, but browser local storage is limited to a few megabytes per site, so it suits text notes and not large volumes. If saving ever fails, the app keeps working for the session but may not store the latest changes, so copy anything critical.',
    },
    {
      question: 'What are the two example notes I see at first?',
      answer:
        'A first-time visit starts with two sample notes, Project Ideas and Meeting Notes, to show the editor and Markdown preview. You can edit or delete them once you have started your own notes.',
    },
  ],

  'habit-tracker': [
    {
      question: 'How does the habit tracker work?',
      answer:
        'Add a habit with a name, a category, a colour and a frequency of daily or weekly. The tracker shows the current week from Monday to Sunday, and you tick the days you completed it. It then updates your streak and a summary of completion rates.',
    },
    {
      question: 'How is a habit streak calculated?',
      answer:
        'For a daily habit, the streak is the number of consecutive days you completed it, counting back from today. If you have not ticked today yet, it still counts from yesterday so your streak is not lost until the day ends. A missed day resets it to zero.',
    },
    {
      question: 'What is the difference between daily and weekly habits?',
      answer:
        'A daily habit needs a check-in every day to keep the streak going. A weekly habit is complete for a week, running Monday to Sunday, if you log it at least once in that week, and its streak counts consecutive completed weeks.',
    },
    {
      question: 'Where is my habit data saved?',
      answer:
        'Your habits and check-ins are stored in your browser local storage on this device. There is no account or cloud backup, so the data does not follow you to another browser or phone and can be lost if you clear site data. Deleting a habit also deletes its history.',
    },
    {
      question: 'How long does it take to build a habit?',
      answer:
        'It varies. A widely cited University College London study found it took people 66 days on average for a new behaviour to become automatic, with a range from 18 to 254 days. Consistency matters more than perfection, so use streaks as motivation, not pressure.',
    },
    {
      question: 'How many habits should I track at once?',
      answer:
        'Start with one to three. Trying to change too much at once makes it harder to stick to any of them. Choose small, specific habits, such as walking 10 minutes, and add more after the first ones feel routine.',
    },
  ],

  'random-number': [
    {
      question: 'How do I generate a random number between 1 and 100?',
      answer:
        'Set Minimum to 1, Maximum to 100 and Quantity to 1, then press generate. Both ends of the range are included, so 1 and 100 can both appear. Increase the quantity to get up to 1000 numbers at once, and choose ascending or descending sorting if you want them ordered.',
    },
    {
      question: 'Are the numbers truly random?',
      answer:
        'They come from the browser Math.random function, which is pseudo-random. That is fine for games, raffles, sampling and choosing examples, but it is not designed for security. Do not use it for passwords, keys or anything where predictability could be exploited.',
    },
    {
      question: 'How do I generate random numbers without duplicates?',
      answer:
        'Turn off Allow Duplicates. The tool then draws each number from the range without putting it back, so every result is unique, like drawing lottery balls. The quantity cannot exceed the size of the range, so 10 unique numbers from 1 to 5 shows an error.',
    },
    {
      question: 'Can it generate decimals or negative numbers?',
      answer:
        'Negative numbers work, for example a minimum of -10 and a maximum of 10. It produces whole numbers only, because the minimum and maximum are rounded down to integers. For decimals, generate a large range and divide, such as 0 to 1000 divided by 1000.',
    },
    {
      question: 'How is this different from the Dice Roller?',
      answer:
        'This tool picks integers from any range you choose, such as 1 to 1000, in bulk, using Math.random. The Dice Roller is fixed to standard dice sizes and coin flips, and uses the browser cryptographic random source. Use this for custom ranges and lists.',
    },
    {
      question: 'What is the maximum quantity I can generate?',
      answer:
        'Up to 1000 numbers in one go. If you ask for duplicates to be off, the quantity must also fit within your range. Results are shown together, ready to copy. Press generate again for a fresh set.',
    },
  ],

  'color-converter': [
    {
      question: 'How do I convert HEX to RGB?',
      answer:
        'Paste the hex code into the input and the RGB values appear straight away. Each pair of hex digits is one channel, so #6366f1 is 63, 66 and f1 in hex, which is rgb(99, 102, 241) in decimal. The tool also shows HSL, HSV and CMYK for the same colour.',
    },
    {
      question: 'What formats can I type in?',
      answer:
        'Enter a 3-digit or 6-digit hex code with or without the hash, an rgb() or rgba() value, three comma-separated numbers, or an hsl() value. Eight-digit hex codes with an alpha channel are not supported, and any transparency in rgba() or hsla() is not carried into the results.',
    },
    {
      question: 'What is the difference between HSL and HSV?',
      answer:
        'Both describe a colour by hue, saturation and a third value. HSL uses lightness, where 0% is black, 100% is white and 50% is the pure colour. HSV uses value, meaning brightness, where 100% is the brightest version of the hue. HSL is common in CSS, and HSV in colour pickers.',
    },
    {
      question: 'What does a 3-digit hex colour like #f60 mean?',
      answer:
        'It is shorthand where each digit is doubled, so #f60 equals #ff6600. It only works when each channel has two identical digits. The converter expands 3-digit codes automatically and shows the full 6-digit version.',
    },
    {
      question: 'Is the CMYK value accurate for printing?',
      answer:
        'It is a mathematical conversion from RGB, not a colour-managed print conversion. Real printers use ICC profiles for specific inks and paper, so colours can look different on paper. Use the CMYK numbers as a starting point and check a proof for critical work.',
    },
    {
      question: 'Which colour format should I use in CSS?',
      answer:
        'Any of them works. HEX is the most common and compact, RGB is readable when you need transparency with rgba, and HSL is the easiest to adjust by hand because you can change lightness or saturation without recalculating the whole colour.',
    },
  ],

  'date-difference': [
    {
      question: 'How do I calculate the number of days between two dates?',
      answer:
        'Choose a Start Date and an End Date and the tool shows the difference straight away in years, months and days, plus total days, weeks, hours and minutes. For example, 10 July 2026 to 17 July 2026 is 7 days, or 1 week.',
    },
    {
      question: 'What does Include End Date do?',
      answer:
        'It adds one extra day so both the start and end days are counted. Without it, 10 July to 17 July is 7 days. With it, the same dates give 8 days. Use it for things like hotel nights versus days on site, or leave periods where both days count.',
    },
    {
      question: 'Does it count business days or weekends?',
      answer:
        'No. It counts every calendar day, including weekends and holidays. If you need working days, subtract the weekends and holidays yourself. Total hours and minutes are simply the day count times 24 and 1440.',
    },
    {
      question: 'What if the end date is before the start date?',
      answer:
        'The tool swaps the two dates and shows a positive gap, flagging that the order was reversed, so you still get the correct length of time. You can therefore enter the dates in either order, for example when calculating how long ago something happened.',
    },
    {
      question: 'How are months and years worked out?',
      answer:
        'It counts whole calendar years and months from the start date, then the remaining days, borrowing from the previous month when needed. Because months have different lengths, the months-and-days breakdown can differ slightly from what you get by dividing days by 30.',
    },
    {
      question: 'What are the +7 days and +1 month buttons for?',
      answer:
        'They are shortcuts that set the End Date relative to your Start Date, for example 30 days later, 3 months later, or the end of the year. Use them to quickly see a deadline or end date and its total number of days without picking it by hand.',
    },
  ],

  'discount-calculator': [
    {
      question: 'How do I calculate a discount percentage?',
      answer:
        'Enter the original price and the percentage off. The sale price is the original price multiplied by one minus the discount rate. For example, 20% off 1000 saves 200, so you pay 800. The tool shows the savings and the final price instantly, and amounts appear in rupees.',
    },
    {
      question: 'How does an extra discount on top of a discount work?',
      answer:
        'Switch on the additional discount. The second percentage is applied to the already-reduced price, not the original one. So 20% off then an extra 10% off 1000 gives 720, which is 28% off in total, not 30%.',
    },
    {
      question: 'Can I add tax or GST to the final price?',
      answer:
        'Yes. Enter a tax rate and it is added to the discounted price. For example, 18% tax on a sale price of 720 adds 129.60, giving a total of 849.60. Leave the rate at 0 if you only need the discount.',
    },
    {
      question: 'How do I work out the percentage saved from two prices?',
      answer:
        'The tool starts from a percentage, but you can find it by hand: subtract the sale price from the original, divide by the original and multiply by 100. For example, an item reduced from 800 to 600 saves 200, which is 25%. Then enter 25% to confirm the numbers.',
    },
    {
      question: 'Which currency does the discount calculator use?',
      answer:
        'Amounts are shown in Indian rupees with Indian digit grouping, such as 1,00,000. The maths is the same for any currency, so you can use the numbers for dollars, pounds or euros, just ignoring the rupee symbol.',
    },
    {
      question: 'Are 50% off and buy one get one free the same?',
      answer:
        'Effectively yes for two identical items, because you pay for one and get two, which is 50% off each. But buy one get one free forces you to buy two, while a 50% discount lets you buy a single item cheaper. This calculator handles the percentage-off version.',
    },
  ],

  'text-sorter': [
    {
      question: 'How do I sort a list alphabetically online?',
      answer:
        'Paste your list with one item per line, and choose A to Z as the order. The sorted result appears on the right, ready to copy. The sort is natural, so item 2 comes before item 10, and case is ignored by default.',
    },
    {
      question: 'How do I remove duplicate lines?',
      answer:
        'Keep Remove duplicates switched on. The first occurrence of each line is kept and later repeats are dropped, and the result heading shows how many lines were removed. With Ignore case on, Apple and apple count as the same line.',
    },
    {
      question: 'What sort orders are available?',
      answer:
        'A to Z, Z to A, shortest first, numeric, reverse of the current order, and shuffle. Numeric sorting reads the number at the start of each line, and lines with no number are treated as 0. Reverse simply flips the current line order without sorting it.',
    },
    {
      question: 'How do I sort numbers correctly?',
      answer:
        'Choose Numeric so 9 comes before 10. With the standard A to Z option, this tool also compares digits as numbers, but plain text sorting elsewhere would put 10 before 9. Lines that start with letters are treated as 0 in Numeric mode.',
    },
    {
      question: 'How do I randomise the order of a list?',
      answer:
        'Choose Shuffle and press Shuffle again for a fresh order. It uses the browser Math.random, which is fine for casual mixing but not for auditable draws. For picking a single winner, the Random Picker Wheel uses a stronger random source.',
    },
    {
      question: 'What do Trim whitespace and Remove empty lines do?',
      answer:
        'Trim whitespace removes spaces at the start and end of every line, so an item with a stray space is not treated as different. Remove empty lines drops blank lines from the output. Both are on by default, and you can switch them off to keep the layout exactly.',
    },
  ],

  'find-replace': [
    {
      question: 'How do I find and replace text in bulk?',
      answer:
        'Paste your text, type what to find and what to replace it with, and the result updates immediately with the number of replacements. Every match is replaced at once, and the Copy button copies the new text. Your original text in the box is not changed.',
    },
    {
      question: 'Is find and replace case-sensitive?',
      answer:
        'Not by default. It matches the word in any capitalisation, so the finds The, the and THE. Turn on Match case to only replace exact matches. The replacement is inserted exactly as typed and does not copy the capitalisation of the matched text.',
    },
    {
      question: 'How do I use regex in find and replace?',
      answer:
        'Turn on Regular expression, then use standard JavaScript patterns. In the replacement, $1, $2 and so on insert captured groups and $& inserts the whole match. For example, finding (\\w+)@(\\w+) and replacing with $2 at $1 rearranges the parts. Invalid patterns show an error.',
    },
    {
      question: 'What does the Whole word option do?',
      answer:
        'It only matches the search term when it stands alone as a word. Searching for cat with Whole word on leaves concatenate and category unchanged, while replacing the separate word cat. It works with regular expressions too.',
    },
    {
      question: 'Why does ^ or $ only match the start or end of the whole text?',
      answer:
        'The search does not use multiline mode, so ^ and $ anchor to the start and end of all your text, not to each line. To work with line breaks, match them directly with \\n in regex mode. Line-by-line clean-up may be easier with the Remove Spaces tool.',
    },
    {
      question: 'How do I replace special characters like a dot or parenthesis?',
      answer:
        'Leave Regular expression off and type the character as it is. In normal mode everything is matched literally, so a full stop, dollar sign or bracket is treated as plain text. You only need to escape special characters with a backslash when regex mode is on.',
    },
  ],

  'readability-checker': [
    {
      question: 'What is a good Flesch Reading Ease score?',
      answer:
        'Aim for about 60 to 70 for general web content, which is plain English understood by 13 to 15 year olds. Scores of 90 or more are very easy, 80 to 90 easy, 50 to 60 fairly difficult, 30 to 50 difficult, and below 30 very difficult. Higher means easier to read.',
    },
    {
      question: 'How is the Flesch Reading Ease score calculated?',
      answer:
        'It is 206.835 minus 1.015 times the average words per sentence, minus 84.6 times the average syllables per word. Short sentences and short words raise the score, and long ones lower it. The tool displays it on a scale clamped between 0 and 100.',
    },
    {
      question: 'What does the Flesch-Kincaid grade level mean?',
      answer:
        'It estimates the US school grade needed to understand the text, using sentence length and syllables per word. A grade of 8 means an average 13 to 14 year old should follow it. Many writers aim for grade 8 or lower for the general public.',
    },
    {
      question: 'What is the Gunning Fog Index?',
      answer:
        'It is another readability estimate, calculated as 0.4 times the sum of the average sentence length and the percentage of complex words with three or more syllables. The result approximates the years of formal education needed. Lower is easier, and a score around 12 is roughly high-school senior level.',
    },
    {
      question: 'How can I improve my readability score?',
      answer:
        'Shorten your sentences, prefer everyday words over long ones, and split long paragraphs. Cutting the average sentence from 25 to 15 words can raise the Flesch score noticeably. Re-check as you edit, since the scores update live.',
    },
    {
      question: 'Does the tool work for languages other than English?',
      answer:
        'It is designed for English text. Syllable counting is an approximation based on English letter patterns, and the formulas were built for English, so results for other languages are unreliable. Even in English, treat the numbers as a guide, not a precise measure of quality.',
    },
  ],

  'eisenhower-matrix': [
    {
      question: 'What is the Eisenhower Matrix?',
      answer:
        'It is a prioritisation tool that sorts tasks into four quadrants by urgency and importance: Do first (urgent and important), Schedule (important, not urgent), Delegate (urgent, not important) and Eliminate (neither). It is named after Dwight D. Eisenhower, who was known for this way of deciding priorities.',
    },
    {
      question: 'How do I use this Eisenhower Matrix tool?',
      answer:
        'Type a task, pick a quadrant from the dropdown and press Add task. Tick the box to mark a task done, or use the small menu next to it to move it to another quadrant. Delete tasks with the trash icon, and use Clear completed to remove all the done tasks.',
    },
    {
      question: 'Are my tasks saved?',
      answer:
        'Yes, in your browser local storage on this device. There is no account, and tasks do not sync to other devices or browsers. Clearing site data or using a private window can delete them, so keep a separate copy of anything essential.',
    },
    {
      question: 'How do I decide if a task is urgent or important?',
      answer:
        'Urgent tasks demand immediate attention and have a near deadline or consequence. Important tasks contribute to your long-term goals or values. Ask whether it must be done now, and whether it moves your goals forward. Most planning, exercise and learning tasks are important but not urgent.',
    },
    {
      question: 'What should go in the Delegate quadrant?',
      answer:
        'Tasks that are urgent but do not need your particular skills, such as routine requests, scheduling or some emails. Hand them to someone else, or automate them. If no one can take them on, shrink them to the minimum, or move them to Eliminate if they do not matter.',
    },
    {
      question: 'Can I drag tasks between quadrants?',
      answer:
        'There is no drag and drop. Instead, each task has a dropdown that moves it to any of the four quadrants in one step. This also works well on touch screens, where dragging can be fiddly.',
    },
  ],

  'random-picker': [
    {
      question: 'How do I pick a random name from a list?',
      answer:
        'Type or paste one name per line in the Options box, then press Spin the wheel. The wheel spins for a few seconds and stops on a winner, which is shown below it. You need at least two options, and the wheel supports up to 60.',
    },
    {
      question: 'Is the wheel spin actually random?',
      answer:
        'Yes. The winner is chosen with the browser cryptographically secure random source, crypto.getRandomValues, using a method that avoids bias, and the wheel is then animated to land on that result. The animation cannot change the outcome, and every option has an equal chance.',
    },
    {
      question: 'How do I pick multiple winners without repeats?',
      answer:
        'Switch on Remove winner after each spin. Each winner is deleted from the list after it is announced, so the next spin picks from those remaining. Spin again as many times as you need winners, and note the results as you go.',
    },
    {
      question: 'How many options can the wheel hold?',
      answer:
        'Up to 60 options, one per line. Blank lines are ignored and extra lines beyond 60 are dropped. With many options the slice labels get small and long names are shortened, but the selection is still equally fair for each one.',
    },
    {
      question: 'Can I use the wheel for a giveaway or classroom draw?',
      answer:
        'Yes, it is well suited to casual raffles, choosing a student, or deciding where to eat. For draws with legal or prize requirements, follow the rules of your local jurisdiction or platform. It runs on your device and does not keep a record of results.',
    },
    {
      question: 'Why does the wheel not spin when I press the button?',
      answer:
        'The button is disabled with fewer than two options, or while a spin is in progress, so add another line to the list. If your device has Reduce Motion enabled, the wheel skips the animation and shows the winner immediately.',
    },
  ],

  'hours-calculator': [
    {
      question: 'How do I calculate hours worked with a lunch break?',
      answer:
        'Enter the start time, end time and break minutes for each day. The tool subtracts the break from the time between start and end. For 9:00 to 17:30 with a 30-minute break, you get 8 hours, and the weekly total updates as you edit.',
    },
    {
      question: 'How do I convert hours and minutes to decimal hours?',
      answer:
        'Divide the minutes by 60 and add them to the hours. 7 hours 45 minutes is 7.75 hours, because 45 divided by 60 is 0.75. The tool shows both the hours-and-minutes total and the decimal hours figure, which payroll systems and timesheets usually need.',
    },
    {
      question: 'Does it handle overnight shifts?',
      answer:
        'Yes. If the end time is earlier than the start time, it assumes the shift crossed midnight and adds 24 hours. So 22:00 to 06:00 is counted as 8 hours before any break is subtracted. It treats each row as a single shift of less than 24 hours.',
    },
    {
      question: 'How is overtime pay calculated?',
      answer:
        'Enter an hourly rate and an overtime threshold, which defaults to 40 hours. Hours above the threshold in your total are paid at 1.5 times the rate. For example, at rate 200 with 45 hours, pay is 40 times 200 plus 5 times 300, which is 9,500 in rupees.',
    },
    {
      question: 'Can I add more days or change the day labels?',
      answer:
        'Yes. The table starts with Monday to Friday, and you can rename any day label, remove a row with the trash icon, or press Add day to include weekends or extra shifts. Add or remove rows to match your pay period.',
    },
    {
      question: 'Are my timesheet entries saved?',
      answer:
        'No. The entries live only on the page and are cleared when you reload or close it, and nothing is stored or uploaded. Write down the totals before you leave. The pay figure is an estimate that assumes 1.5 times overtime and ignores taxes and deductions.',
    },
  ],

  'dice-coin': [
    {
      question: 'How do I roll dice online?',
      answer:
        'Open Roll dice, enter how many dice to roll, choose the number of sides and press Roll. You can roll 1 to 10 dice at once, and each die shows its own result with the total below. Available sizes are d4, d6, d8, d10, d12, d20 and d100.',
    },
    {
      question: 'Is this dice roller fair?',
      answer:
        'Yes. It uses the browser cryptographically secure generator, crypto.getRandomValues, and discards values that would cause modulo bias, so every face is equally likely. Each roll is independent of the last, which means there are no streaks or hidden patterns.',
    },
    {
      question: 'What are d4, d6, d20 and d100 dice?',
      answer:
        'The number after d is how many sides the die has. A d6 is the standard cube, a d20 is the twenty-sided die widely used in tabletop role-playing games, and a d100 gives 1 to 100, often for percentage rolls. Each result ranges from 1 up to the number of sides.',
    },
    {
      question: 'How do I flip a coin online?',
      answer:
        'Switch to Flip coins and press Flip. A single coin shows Heads or Tails. Increase the number of coins, up to 100, to see the counts of Heads and Tails. Each flip has an equal 50% chance.',
    },
    {
      question: 'What is the probability of rolling a 7 with two dice?',
      answer:
        'It is 1 in 6, or about 16.7%. Of the 36 equally likely combinations of two six-sided dice, 6 add up to 7, namely 1 and 6, 2 and 5, 3 and 4 and their reverses. That makes 7 the most common total for two dice.',
    },
    {
      question: 'Can I roll two different types of dice at the same time?',
      answer:
        'Not in one roll. All dice in a single roll have the same number of sides. To combine types, roll one set, note the total, then change the sides and roll the other, adding the totals yourself.',
    },
  ],

  'text-to-speech': [
    {
      question: 'How do I make my computer read text out loud?',
      answer:
        'Type or paste your text, pick a voice, and press Speak. You can adjust the speed and pitch, and pause, resume or stop at any time. It uses the speech engine built into your browser and operating system, and it does not need an account or any software.',
    },
    {
      question: 'Why are the available voices different on my device?',
      answer:
        'The voice list comes from your operating system and browser, so Windows, macOS, Android, iOS and Linux each offer different voices and languages. Some voices may need to be downloaded in your system settings. The list can also take a moment to load when the page opens.',
    },
    {
      question: 'Can I download the speech as an MP3 or audio file?',
      answer:
        'No. The tool plays the speech live through your speakers and does not produce an audio file. To save it, you would need to record your device audio with another program, or use a service that specifically exports audio.',
    },
    {
      question: 'How do I make the voice faster or slower?',
      answer:
        'Use the Speed slider, which runs from 0.5 times to 2 times normal speed, with 1 as the default. Pitch has its own slider from 0.5 to 2. The changes apply the next time you press Speak, and not all voices respond equally to them.',
    },
    {
      question: 'Is my text sent to a server when it is read aloud?',
      answer:
        'The page itself does not upload your text. Speech is produced by your browser and system voices. However, some voices, especially network or cloud voices offered by your browser or device vendor, may process text through that vendor service, so pick a local voice for sensitive text.',
    },
    {
      question: 'Why is there no sound, or it does not work in my browser?',
      answer:
        'Check that your volume is up and the device is not muted, and try a different voice. Speech synthesis is supported in current Chrome, Edge, Safari and Firefox, but some browsers have no voices installed. If your browser lacks the feature, the page will show a notice saying so.',
    },
  ],

  'device-info': [
    {
      question: 'What is my screen resolution?',
      answer:
        'Open this page and read the Screen resolution row, shown as width by height in pixels, such as 1920 × 1080. It reports your screen as the browser sees it. On high-density displays it is usually in CSS pixels, so it can be smaller than the physical pixel count.',
    },
    {
      question: 'What is the difference between screen resolution and viewport size?',
      answer:
        'Screen resolution is the size of your whole display. Viewport is the visible area inside your browser window where a page is drawn, excluding toolbars, and it changes when you resize the window or rotate a phone. Web designers use the viewport for responsive layouts.',
    },
    {
      question: 'What is device pixel ratio?',
      answer:
        'It is the number of physical screen pixels used for each CSS pixel. A standard display is 1, while many laptops and phones show 2 or 3, which is why their images look sharper. Browser zoom can also change the value.',
    },
    {
      question: 'What information does this page show about my browser and device?',
      answer:
        'It shows screen, available screen and viewport size, pixel ratio, colour depth, orientation, colour scheme, reduced motion, touch points, language, time zone, CPU threads, device memory, connection, platform and the user agent string. You can copy it all at once.',
    },
    {
      question: 'Why do some rows show n/a?',
      answer:
        'Browsers only expose some details. Device memory and network connection info are available mainly in Chromium-based browsers, and privacy settings can hide or round values. Some browsers also deliberately report generic values to limit fingerprinting.',
    },
    {
      question: 'Does this page show my IP address or location?',
      answer:
        'No. It only reads what your browser exposes on the page, such as screen and language, and does not make any network request to look up your IP address or location. The values are read locally and are not sent anywhere.',
    },
  ],
};
