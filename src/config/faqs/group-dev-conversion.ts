import type { FaqMap } from './types';

export const FAQS: FaqMap = {
  'json-formatter': [
    {
      question: 'How do I format and validate JSON online?',
      answer: 'Paste your JSON into the input box and the tool parses it immediately. Valid JSON is shown as a collapsible tree and as formatted text, while invalid JSON shows an error so you can find the problem. You can pick a 2 or 4 space indent and copy or download the result.',
    },
    {
      question: 'How do I minify JSON?',
      answer: 'Switch to the Minified tab, or use the minify action, to remove all spaces and line breaks from valid JSON. The data itself is unchanged, only the whitespace is removed, which makes the text smaller for APIs, config files or URLs.',
    },
    {
      question: 'Why does my JSON say invalid or unexpected token?',
      answer: 'The most common causes are a trailing comma after the last item, single quotes instead of double quotes, unquoted keys, comments, and curly smart quotes pasted from a document. JSON requires double quotes for every key and string. The repair button fixes smart quotes and trailing commas for you.',
    },
    {
      question: 'Can I sort JSON keys alphabetically?',
      answer: 'Yes. Turn on the sort keys option and object keys are ordered alphabetically at every level of nesting in the formatted and minified output. Arrays keep their original order. This is handy for comparing two JSON documents or producing stable diffs.',
    },
    {
      question: 'What is the difference between JSON and a JavaScript object?',
      answer: 'JSON is a strict text format, while a JavaScript object literal is code. JSON needs double-quoted keys and strings and does not allow comments, trailing commas, undefined, functions or single quotes. Text that works in JavaScript source often fails JSON validation for these reasons.',
    },
    {
      question: 'Can I open a JSON file instead of pasting it?',
      answer: 'Yes. Use the upload button to load a .json file from your device into the editor, then format, search the tree or minify it. The file is read by your browser and is not sent to a server. Very large files can be slow to render as a tree because every node is drawn.',
    },
  ],

  base64: [
    {
      question: 'Is Base64 encryption?',
      answer: 'No. Base64 is an encoding, not encryption. It converts bytes into 64 printable characters so binary data can travel through text-only systems, and anyone can decode it instantly without a key. Never use Base64 to hide passwords, tokens or other secrets.',
    },
    {
      question: 'How do I decode a Base64 string?',
      answer: 'Choose Decode, paste the Base64 text and the original text appears. For example, aGVsbG8= decodes to hello. If the input is not valid Base64 the tool shows an error instead, so check for missing characters, stray spaces or truncated padding.',
    },
    {
      question: 'How do I encode text or a file to Base64?',
      answer: 'In Encode mode type or paste text and the Base64 output updates live. For example, Hello, World! becomes SGVsbG8sIFdvcmxkIQ==. You can also drop a file onto the tool to get its Base64 form. Text is encoded as UTF-8, so accented letters and emoji work.',
    },
    {
      question: 'Why does Base64 output end with = or == ?',
      answer: 'The equals signs are padding. Base64 encodes 3 bytes as 4 characters, so when the input length is not a multiple of 3 the output is padded with one or two = characters to reach a multiple of 4. Padding carries no data and some systems omit it.',
    },
    {
      question: 'Why is Base64 output larger than the original?',
      answer: 'Base64 output is about one third larger than the input, because every 3 bytes become 4 characters (a 33 percent increase). For example, 300 bytes of data become 400 characters. This overhead is the price of making binary data safe to put in text formats such as JSON, email or HTML.',
    },
    {
      question: 'Can I decode a Base64 image?',
      answer: 'Yes. Paste a data:image URI, or a long raw Base64 string that looks like an image, in Decode mode and the tool shows a preview and a download link. Raw strings without a data: prefix are previewed as PNG, so other formats may not display correctly this way.',
    },
  ],

  'url-encoder': [
    {
      question: 'What is URL encoding (percent encoding)?',
      answer: 'URL encoding replaces characters that are not allowed or have special meaning in a URL with a percent sign and two hex digits. A space becomes %20 and & becomes %26. Non-ASCII characters are first converted to UTF-8 bytes, so e-acute becomes %C3%A9.',
    },
    {
      question: 'What is the difference between encodeURI and encodeURIComponent?',
      answer: 'encodeURIComponent encodes almost everything, including / ? & = # and :, so it is right for a single query value. encodeURI leaves those structural characters alone so a whole URL stays usable. In this tool, Encode All Characters uses encodeURIComponent and turning it off uses encodeURI.',
    },
    {
      question: 'How do I decode a URL with %20 in it?',
      answer: 'Switch to Decode, paste the URL and the percent codes are converted back, so %20 becomes a space and %26 becomes &. If you see a URI malformed error, the text contains a stray % that is not followed by two hex digits, or an invalid UTF-8 sequence.',
    },
    {
      question: 'Should a space be %20 or a plus sign?',
      answer: 'In a URL path, use %20. A plus sign means a space only in form-style query strings (application/x-www-form-urlencoded). This tool follows JavaScript, so it produces %20 for spaces and leaves a plus as %2B when encoding all characters.',
    },
    {
      question: 'Which characters are not encoded?',
      answer: 'With encodeURIComponent behaviour, letters, digits and the characters - _ . ! ~ * \' ( ) are left as they are. Everything else is percent-encoded. With encodeURI behaviour the reserved characters ; , / ? : @ & = + $ # also stay unchanged.',
    },
    {
      question: 'Why does my link break when I encode the whole URL with Encode All on?',
      answer: 'Encoding a full URL with encodeURIComponent also encodes the colon and slashes, so https://example.com becomes https%3A%2F%2Fexample.com, which is no longer a clickable link. Encode only the query values with Encode All, or encode a whole URL with that option turned off.',
    },
  ],

  'jwt-decoder': [
    {
      question: 'How do I decode a JWT?',
      answer: 'Paste the token, which has three parts separated by dots, and the tool shows the decoded header and payload as JSON. A JWT is just Base64URL text, so decoding needs no key. The third part is the signature and cannot be read as JSON.',
    },
    {
      question: 'Does decoding a JWT verify its signature?',
      answer: 'No. Decoding only reveals the header and payload, which anyone can read. Verifying needs the secret or public key on your server and must be done there before you trust any claim. A token that decodes fine may still be forged or tampered with.',
    },
    {
      question: 'What are the three parts of a JSON Web Token?',
      answer: 'A JWT is header.payload.signature. The header states the token type and signing algorithm such as HS256, the payload holds claims like sub, name and exp, and the signature is computed over the first two parts using a secret or private key.',
    },
    {
      question: 'What do exp, iat and nbf mean in a JWT?',
      answer: 'They are registered claims holding Unix timestamps in seconds. exp is when the token expires, iat is when it was issued and nbf is the time before which it must not be accepted. For example, iat 1516239022 is 2018-01-18 01:30:22 UTC.',
    },
    {
      question: 'Why does my JWT show as invalid?',
      answer: 'The tool expects exactly three dot-separated parts whose first two decode to valid text. Common problems are a missing part, a copied Bearer prefix or quotation marks, line breaks in the middle, and truncated tokens. Remove the word Bearer and any extra characters, then paste again.',
    },
    {
      question: 'Is a JWT encrypted?',
      answer: 'A normal signed JWT (JWS) is not encrypted. Its payload is only Base64URL encoded, so anyone holding the token can read it. Do not put passwords or private data in the claims. Encrypted tokens (JWE) exist but have a different five-part format that this tool does not decode.',
    },
  ],

  'uuid-generator': [
    {
      question: 'What is a UUID and what is it used for?',
      answer: 'A UUID (universally unique identifier) is a 128-bit value written as 32 hex digits in the form 8-4-4-4-12, such as 123e4567-e89b-12d3-a456-426614174000. It is used for database keys, request IDs and file names where IDs must be created without a central counter.',
    },
    {
      question: 'What is the difference between UUID v1 and v4?',
      answer: 'Version 4 is built from random numbers, while version 1 is built from a timestamp plus a node value. This tool offers v4 and v1. Random v4 is the usual choice because it reveals nothing about when or where it was made.',
    },
    {
      question: 'Are the generated UUIDs really unique?',
      answer: 'A v4 UUID has 122 random bits, so the chance of two colliding is negligible for practical purposes. The tool uses the browser crypto.randomUUID function when available. Its v1 option is a simplified time-based generator with a random node, so do not treat it as a standards-strict v1.',
    },
    {
      question: 'How do I generate multiple UUIDs at once?',
      answer: 'Choose a quantity, pick the version and click generate to get a list you can copy in one go. Options let you switch to uppercase or remove the hyphens, which is useful for systems that store the 32 characters as a plain string.',
    },
    {
      question: 'UUID vs GUID: is there a difference?',
      answer: 'They are effectively the same thing. GUID is the name Microsoft uses for the same 128-bit identifier format, and the values are interchangeable. Some Microsoft tools show GUIDs in uppercase or with braces, which is only a display difference.',
    },
    {
      question: 'Are UUIDs safe to use as secrets or tokens?',
      answer: 'A UUID is an identifier, not a secret. Do not rely on one as a password, API key or session token by itself. A random v4 UUID is hard to guess, but a v1 UUID contains a timestamp and is more predictable, and UUIDs are often exposed in URLs and logs.',
    },
  ],

  'hash-generator': [
    {
      question: 'Which hash algorithms does this tool generate?',
      answer: 'It generates MD5, SHA-1, SHA-256 and SHA-512 hashes of the text you type, all at once and updated as you type. SHA-1, SHA-256 and SHA-512 use your browser Web Crypto API, and MD5 is computed by built-in JavaScript code.',
    },
    {
      question: 'What is the SHA-256 or MD5 hash of hello?',
      answer: 'For the lowercase text hello, MD5 is 5d41402abc4b2a76b9719d911017c592 and SHA-256 is 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824. Changing even one character, such as Hello with a capital H, produces a completely different hash.',
    },
    {
      question: 'Can I use MD5 or SHA-1 to store passwords?',
      answer: 'No. MD5 and SHA-1 are broken for security purposes and fast to brute force, and even SHA-256 is too fast for passwords on its own. Store passwords with a slow, salted algorithm such as bcrypt, scrypt or Argon2. Plain hashes are fine for checksums and non-security fingerprints.',
    },
    {
      question: 'Can a hash be decrypted or reversed?',
      answer: 'No. A hash is a one-way function that produces a fixed-length fingerprint, so the original text cannot be computed back from it. Websites that appear to reverse hashes are only looking up common inputs in large precomputed tables, which is why weak short passwords are cracked easily.',
    },
    {
      question: 'Why does my hash not match the one from another tool?',
      answer: 'Hashes are sensitive to every byte of input. A trailing newline, extra space, different capitalisation or different line endings changes the result. Text is hashed as UTF-8 here, so a tool using another encoding will give a different value for non-ASCII characters.',
    },
    {
      question: 'How long is each hash output?',
      answer: 'MD5 gives 128 bits, shown as 32 hex characters. SHA-1 gives 160 bits (40 characters), SHA-256 gives 256 bits (64 characters) and SHA-512 gives 512 bits (128 characters). The length is fixed and does not depend on how long the input text is.',
    },
  ],

  'regex-tester': [
    {
      question: 'How do I test a regular expression online?',
      answer: 'Enter your pattern, type or paste a test string and every match is highlighted immediately with a running count. Use the global toggle to find all matches instead of only the first, and the case-insensitive toggle to ignore letter case.',
    },
    {
      question: 'Which regex flavor does this tester use?',
      answer: 'It runs the JavaScript (ECMAScript) regular expression engine built into your browser. Syntax such as lookahead, named groups and lazy quantifiers works, but features from other flavors, like Python inline flags or PCRE recursion, may not, so results can differ from your language.',
    },
    {
      question: 'Why does my regex only find one match?',
      answer: 'Without the global flag, a regex stops after the first match. Turn on Global Search (g) to highlight every match in the text. If you still see too few matches, check that the pattern is not anchored with ^ or $ and that case sensitivity is what you expect.',
    },
    {
      question: 'What does an Invalid regular expression error mean?',
      answer: 'The pattern has a syntax problem in JavaScript, such as an unclosed bracket or parenthesis, a quantifier with nothing before it like *abc, or an unescaped special character. Escape literal characters like . ? + ( ) [ ] with a backslash.',
    },
    {
      question: 'What is the difference between greedy and lazy matching?',
      answer: 'Greedy quantifiers like .* match as much as possible, while lazy ones like .*? match as little as possible. On the text <b>one</b><b>two</b>, the pattern <b>.*</b> matches the whole string, but <b>.*?</b> matches each tag pair separately.',
    },
    {
      question: 'How do I match a literal dot or other special character?',
      answer: 'Put a backslash before it. A plain . matches any character, so use \\. to match a real full stop. The same applies to * + ? ( ) [ ] { } | ^ $ and the backslash itself. Inside a character class such as [.] most of these are already literal.',
    },
  ],

  'timestamp-converter': [
    {
      question: 'How do I convert a Unix timestamp to a date?',
      answer: 'Enter the timestamp in seconds and click Convert to Date. You get the local time, UTC time and ISO 8601 string. For example, 1700000000 is 2023-11-14T22:13:20Z. Milliseconds are not detected here, so a 13-digit value must first be divided by 1000.',
    },
    {
      question: 'What is a Unix timestamp (epoch time)?',
      answer: 'It is the number of seconds that have passed since 00:00:00 UTC on 1 January 1970, not counting leap seconds. Systems use it because it is one timezone-independent number that is easy to store, compare and sort.',
    },
    {
      question: 'How do I convert a date to a Unix timestamp?',
      answer: 'Pick a date and time in the date converter and it returns the timestamp in whole seconds. The date is read in your local timezone, so the same clock time gives a different timestamp in different zones. For exact results, choose a time whose UTC value you know.',
    },
    {
      question: 'Is my timestamp in seconds or milliseconds?',
      answer: 'Look at the digits. Current timestamps in seconds have 10 digits, such as 1700000000, while milliseconds have 13, such as 1700000000000. This tool expects seconds, so if you paste milliseconds the date will be far in the future or wrong.',
    },
    {
      question: 'What is the Year 2038 problem?',
      answer: 'Systems storing Unix time as a signed 32-bit integer overflow at 03:14:07 UTC on 19 January 2038, when the value passes 2,147,483,647 seconds. Modern 64-bit systems and JavaScript are not affected, but old embedded devices and databases may be.',
    },
    {
      question: 'Do Unix timestamps have a timezone?',
      answer: 'No. A Unix timestamp is always counted from a UTC moment, so the same number is the same instant everywhere. Only the human-readable display changes with the timezone. That is why the converter shows local time, UTC and ISO output for the same value.',
    },
  ],

  'alternative-timestamps': [
    {
      question: 'How does this tool detect the timestamp format?',
      answer: 'It looks at what you paste. Digit-only input of up to 10 digits is treated as Unix seconds, up to 13 as milliseconds, up to 16 as microseconds and longer as nanoseconds. Anything else is parsed as a date string, such as an ISO 8601 value, and the detected format is displayed.',
    },
    {
      question: 'How do I convert a 13-digit timestamp?',
      answer: 'Paste it as is. A 13-digit number is treated as Unix milliseconds, so 1700000000000 gives 2023-11-14T22:13:20Z. The result is displayed in Unix seconds, milliseconds, ISO 8601, UTC and a timezone of your choice, including UTC, local, EST, PST and IST.',
    },
    {
      question: 'What is the difference between Unix, LDAP, Chrome, NTP and Cocoa timestamps?',
      answer: 'They count from different starting dates. Unix counts seconds from 1970-01-01, NTP from 1900-01-01, Cocoa from 2001-01-01, and GPS from 1980-01-06. LDAP/Windows FILETIME counts 100-nanosecond ticks and Chrome counts microseconds, both from 1601-01-01.',
    },
    {
      question: 'How do I convert an LDAP or Chrome timestamp to Unix time?',
      answer: 'Convert the unit and subtract the epoch offset. For Chrome, divide microseconds by 1,000,000 then subtract 11,644,473,600 seconds, the gap between 1601 and 1970. For LDAP, divide by 10,000,000 first. This tool then reads the resulting Unix value directly.',
    },
    {
      question: 'What is the offset for NTP and Cocoa timestamps?',
      answer: 'Subtract 2,208,988,800 seconds from an NTP timestamp to get Unix seconds, since 1900 is that far before 1970. A Cocoa (Apple) timestamp counts from 2001-01-01, so add 978,307,200 seconds to convert it to Unix time.',
    },
    {
      question: 'What does a Unix microsecond or nanosecond timestamp look like?',
      answer: 'Microsecond timestamps have 16 digits, such as 1700000000000000, and nanosecond ones have 19. The tool divides down to milliseconds because JavaScript dates only store millisecond precision, so any digits finer than a millisecond are dropped in the displayed date.',
    },
  ],

  'color-picker': [
    {
      question: 'How do I convert HEX to RGB?',
      answer: 'Split the six hex digits into three pairs and read each pair as a base-16 number. For #6366f1, 63 is 99, 66 is 102 and f1 is 241, so the color is rgb(99, 102, 241). Type the HEX into the tool and RGB and HSL update instantly.',
    },
    {
      question: 'How do I convert RGB to HEX?',
      answer: 'Convert each of the red, green and blue values (0 to 255) to two hex digits and join them with a leading #. For example rgb(255, 0, 0) becomes #ff0000 and rgb(0, 128, 255) becomes #0080ff. The tool does this as you move the RGB inputs.',
    },
    {
      question: 'What is the difference between RGB and HSL?',
      answer: 'RGB mixes red, green and blue light amounts, while HSL describes a color as hue (0 to 360 degrees on the color wheel), saturation and lightness in percent. HSL is easier to adjust by hand, for example to make a shade lighter you only change L.',
    },
    {
      question: 'What color formats does the tool support?',
      answer: 'It converts between HEX, RGB and HSL, and each value can be copied. HEX must be a full six-digit value such as #6366f1 to be applied, so shorthand forms like #fff need to be expanded to #ffffff first. It does not include an alpha (transparency) channel.',
    },
    {
      question: 'How do I get a lighter or darker shade of a color?',
      answer: 'Change the lightness value in HSL while keeping hue and saturation the same. Raising L toward 100 percent gives lighter tints, lowering it toward 0 gives darker shades. Changing HEX or RGB values directly is much less predictable.',
    },
    {
      question: 'Why does my HEX color not update?',
      answer: 'The tool only applies a HEX value that matches # followed by exactly six hex digits, meaning 0 to 9 and a to f. Three-digit shorthand, missing # inside an incomplete entry, or letters beyond f are ignored until the value is valid.',
    },
  ],

  'sql-formatter': [
    {
      question: 'How do I format a SQL query online?',
      answer: 'Paste your SQL, choose an indent size of 2 spaces, 4 spaces or tabs, and click format. Keywords such as SELECT, FROM, WHERE and JOIN are set in uppercase and major clauses are placed on separate lines with nested parentheses indented.',
    },
    {
      question: 'Does the SQL formatter change what my query does?',
      answer: 'No, formatting only changes whitespace, line breaks and the case of recognised keywords. Table names, column names and string values are kept as written. Still, review the output before running it, because a formatter is not a SQL parser and does not validate your query.',
    },
    {
      question: 'Which SQL dialects are supported?',
      answer: 'It uses a general-purpose keyword-based approach rather than a dialect-specific parser, so it works well for common SELECT, INSERT, UPDATE, DELETE and CREATE TABLE statements in MySQL, PostgreSQL, SQL Server and others. Unusual vendor syntax may be laid out imperfectly.',
    },
    {
      question: 'Why are my SQL keywords in uppercase?',
      answer: 'Formatting converts recognised keywords to uppercase, which is a common convention that makes them stand out from table and column names. SQL keywords are case-insensitive, so this does not affect how the query runs.',
    },
    {
      question: 'Does formatting SQL make it run faster?',
      answer: 'No. Whitespace and line breaks are ignored by the database, so a formatted query has the same execution plan and speed as a minified one. Formatting only makes a query easier to read, review and debug. To speed a query up you need better indexes or a rewritten query.',
    },
    {
      question: 'How do I make a long SQL query easier to read?',
      answer: 'Format it so every clause starts on its own line, then use a consistent indent so AND, OR and ON conditions are visibly nested under their parent clause. Formatting is also useful before code review or when you paste a query into documentation.',
    },
  ],

  'diff-checker': [
    {
      question: 'How do I compare two texts or files online?',
      answer: 'Paste the original text on the left and the changed version on the right, then click compare. The result lists each line as unchanged, added or removed with line numbers, so you can spot differences at a glance. It is useful for code, config files, contracts and drafts.',
    },
    {
      question: 'Does the diff work line by line or by character?',
      answer: 'It compares line by line. If any character in a line changes, the old line is shown as removed and the new line as added, rather than highlighting the exact changed word inside the line. Split long lines first if you need finer detail.',
    },
    {
      question: 'Why does a line show as changed when it looks identical?',
      answer: 'Invisible differences count. Trailing spaces, tabs versus spaces, different line endings (Windows CRLF versus Unix LF), or lookalike Unicode characters make lines unequal. Clean up whitespace in both versions and compare again to see whether the difference disappears.',
    },
    {
      question: 'What do the added and removed colors mean?',
      answer: 'Added lines exist only in the modified text, while removed lines exist only in the original text. Unchanged lines appear in both. This is the same idea as a Git diff, where lines marked with a plus are added and lines marked with a minus are deleted.',
    },
    {
      question: 'Can I compare code with this tool?',
      answer: 'Yes. It works with any plain text, including source code, JSON, SQL and configuration files. Format both versions the same way first, for example with a JSON formatter, so that layout differences are not reported as changes.',
    },
    {
      question: 'How is a diff checker different from Git diff?',
      answer: 'Git diff compares files inside a repository and tracks history, while this tool compares two pieces of text you paste in, with no repository needed. It is quicker for a one-off comparison, but it does not handle binary files or a three-way merge.',
    },
  ],

  'password-generator': [
    {
      question: 'How do I generate a strong password?',
      answer: 'Choose a length and the character types you want, then generate. A length of 16 or more with uppercase, lowercase, numbers and symbols is a strong choice. Length matters most, since each extra character multiplies the number of guesses an attacker needs.',
    },
    {
      question: 'How long should a password be?',
      answer: 'At least 12 characters for ordinary accounts and 16 or more for important ones such as email, banking and password managers. This tool supports lengths from 6 to 64 characters. Use a unique password for every account rather than reusing one.',
    },
    {
      question: 'What does Exclude Similar Characters do?',
      answer: 'It removes characters that are easy to confuse when read or typed by hand, such as the letters O and I, lowercase l and the digits 0 and 1. That helps when you must type a password from a screen or paper, and it only slightly reduces the number of possible passwords.',
    },
    {
      question: 'Which symbols can the password contain?',
      answer: 'When symbols are enabled, they are drawn from the set ! @ # $ % ^ & * ( ) _ + - = [ ] { } | ; : , . < > ? Some websites reject certain symbols, so if a site refuses your password, turn symbols off and increase the length instead.',
    },
    {
      question: 'Is a generated password better than one I make up?',
      answer: 'Usually yes, because people tend to choose predictable words, names and patterns that attackers try first. A randomly generated password has no such pattern. For your most important accounts, a dedicated password manager is the best place to generate and store it.',
    },
    {
      question: 'Does every password include each selected character type?',
      answer: 'Yes. For each type you switch on, at least one character of that type is guaranteed, and the remaining characters are random from the combined set. The characters are then shuffled so the guaranteed ones do not always sit at the start.',
    },
  ],

  'lorem-ipsum': [
    {
      question: 'What is Lorem Ipsum?',
      answer: 'Lorem Ipsum is placeholder text used in design and publishing to show how a layout looks before real content is ready. It is based on scrambled Latin from a work by Cicero, so it has natural-looking word lengths without distracting readers with meaning.',
    },
    {
      question: 'How do I generate Lorem Ipsum text?',
      answer: 'Choose how many paragraphs, sentences or words you want (1 to 100), choose the unit and click generate. Then copy the text. You can also switch the standard header option on to start with the classic Lorem ipsum opening line.',
    },
    {
      question: 'Is Lorem Ipsum real Latin?',
      answer: 'Not exactly. It is derived from passages of Cicero written in 45 BC, but the words were altered, shuffled and cut so the result is mostly nonsense Latin. The classic opening words echo the Latin phrase dolorem ipsum, meaning pain itself.',
    },
    {
      question: 'Why use placeholder text instead of real copy?',
      answer: 'Placeholder text lets reviewers judge typography, spacing and layout without being distracted by the content. It also keeps unfinished drafts from being mistaken for final copy. Replace it with real text before publishing, since search engines and readers value real content.',
    },
    {
      question: 'Is Lorem Ipsum bad for SEO?',
      answer: 'Leaving it on a live page is bad, because it gives search engines and visitors no useful content and can look unfinished. Use it only on mockups, templates and staging sites. Search for the word lorem before you publish so none is left behind.',
    },
    {
      question: 'Can I get a specific number of words?',
      answer: 'Yes. Set the unit to Words and enter a count from 1 to 100 to get exactly that many words. Use Sentences or Paragraphs for longer blocks. The words are randomly picked each time, so clicking generate again produces different text.',
    },
  ],

  'gradient-generator': [
    {
      question: 'How do I create a CSS gradient?',
      answer: 'Choose linear or radial, pick two colors, set their stop positions and, for linear, the angle. The preview updates live and the CSS is generated for you. Copy it and use it as a background value, for example linear-gradient(135deg, #6366f1 0%, #ec4899 100%).',
    },
    {
      question: 'What is the difference between linear and radial gradients?',
      answer: 'A linear gradient blends colors along a straight line at an angle you choose, while a radial gradient spreads colors outward from a center point in a circle. Linear is common for banners and buttons, and radial suits glows, spotlights and vignettes.',
    },
    {
      question: 'What do the angle values mean in a linear gradient?',
      answer: '0deg runs from bottom to top, 90deg runs left to right, 180deg runs top to bottom and 270deg runs right to left. The default 135deg produces a diagonal from the top left to the bottom right. The slider covers 0 to 360 degrees.',
    },
    {
      question: 'What are color stop positions?',
      answer: 'A stop position is the percentage along the gradient line where a color reaches full strength. With stops at 0 percent and 100 percent the blend fills the whole area. Moving the first stop to 30 percent holds the first color solid until 30 percent, then blends.',
    },
    {
      question: 'How do I use the generated gradient in my CSS?',
      answer: 'Paste it as the value of the background or background-image property, for example background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%); Modern browsers support this syntax without prefixes. Add a solid background-color first as a fallback for old browsers.',
    },
    {
      question: 'Does the generator support more than two colors?',
      answer: 'No, this tool builds two-color linear and radial gradients. If you need three or more colors, or conic gradients, copy the generated CSS and add extra color stops by hand, for example linear-gradient(90deg, red 0%, yellow 50%, green 100%).',
    },
  ],

  'cron-builder': [
    {
      question: 'What is a cron expression and how is it written?',
      answer: 'A cron expression schedules a recurring job. The standard form has five fields separated by spaces: minute, hour, day of month, month and day of week. For example, 0 9 * * 1-5 runs at 09:00 on weekdays. An asterisk means every value.',
    },
    {
      question: 'How do I run a cron job every 5 minutes?',
      answer: 'Use */5 * * * *, where */5 in the minute field means every 5th minute (0, 5, 10 and so on). Select Every 5 minutes in the minute dropdown and the expression, its plain-English description and the upcoming run times are shown.',
    },
    {
      question: 'What is the difference between 5-field and 6-field cron?',
      answer: 'Classic Unix cron has five fields. Some systems, such as Quartz, Spring and certain cloud schedulers, add a seconds field at the start, and some add a year. This builder outputs the standard five-field format, so check your scheduler documentation before pasting into a six-field system.',
    },
    {
      question: 'How do I schedule a job for weekdays only?',
      answer: 'Set the day of week field to 1-5, where 0 or 7 is Sunday and 1 is Monday in most cron implementations. For example, 30 8 * * 1-5 runs at 08:30 every Monday to Friday. Day-of-week numbering can differ slightly between systems, so test it.',
    },
    {
      question: 'What does */2 or 0,6 mean in cron?',
      answer: 'A slash is a step: */2 in the hour field means every 2 hours (0, 2, 4 and so on). A comma lists specific values: 0,6 in the day of week field means Sunday and Saturday. A hyphen defines a range, so 1-5 covers Monday through Friday.',
    },
    {
      question: 'What timezone does a cron expression use?',
      answer: 'A cron expression has no timezone of its own. It runs in the timezone of the server or scheduler that executes it, often UTC on cloud platforms. Check your platform setting, and remember daylight saving changes can skip or repeat a local-time job.',
    },
  ],

  'markdown-preview': [
    {
      question: 'How do I preview Markdown online?',
      answer: 'Type or paste Markdown on one side and the rendered result appears live on the other. It supports headings, lists, links, images, tables, task lists, fenced code blocks and strikethrough. You can copy the generated HTML from the tool when you need it.',
    },
    {
      question: 'Which Markdown flavor does the previewer support?',
      answer: 'It renders GitHub Flavored Markdown (GFM) using the marked library. That includes tables, task lists, strikethrough and fenced code blocks. Extras from other flavors, such as footnotes or math, are not guaranteed to render.',
    },
    {
      question: 'How do I make a table in Markdown?',
      answer: 'Separate columns with pipes and add a divider row of hyphens under the header, for example | Name | Age | on one line, then | --- | --- |, then each row. Colons in the divider set alignment, so :--- is left, :---: is centered and ---: is right.',
    },
    {
      question: 'How do I add a line break in Markdown?',
      answer: 'End a line with two spaces or a backslash, or leave a blank line to start a new paragraph. A single newline inside a paragraph is normally joined into one line, which this previewer follows, so lines will not break unless you use one of these methods.',
    },
    {
      question: 'Is the HTML from Markdown sanitized?',
      answer: 'Yes. The rendered output is cleaned with DOMPurify, which removes scripts and other unsafe HTML before it is displayed. That protects you when previewing content pasted from elsewhere, though you should still sanitize again in your own site before publishing user-supplied Markdown.',
    },
    {
      question: 'How do I write a code block in Markdown?',
      answer: 'Wrap the code in lines of three backticks, and optionally add a language name after the opening backticks, such as ```js. For a short inline snippet, put a single backtick on each side of the code. Indenting lines by four spaces also creates a code block.',
    },
  ],

  'length-converter': [
    {
      question: 'How many centimeters are in an inch?',
      answer: 'One inch is exactly 2.54 centimeters, by international definition. So 6 inches is 15.24 cm and 72 inches (6 feet) is 182.88 cm. To go the other way, divide centimeters by 2.54.',
    },
    {
      question: 'How do I convert feet to meters?',
      answer: 'Multiply feet by 0.3048, since 1 foot is exactly 0.3048 meters. For example, 6 feet is 1.8288 meters. To convert meters to feet, divide by 0.3048. The tool does this instantly and shows the equivalent in every other length unit too.',
    },
    {
      question: 'How many kilometers are in a mile?',
      answer: 'One mile is exactly 1.609344 kilometers. So 5 miles is 8.04672 km, and 100 km is about 62.137 miles. The tool uses the international mile (1,609.344 meters), not the older US survey mile.',
    },
    {
      question: 'Which length units can I convert?',
      answer: 'Millimeters, centimeters, meters, kilometers, inches, feet, yards and miles. All conversions go through meters using exact factors: 1 inch is 0.0254 m, 1 foot is 0.3048 m, 1 yard is 0.9144 m and 1 mile is 1,609.344 m. Results show up to 6 decimal places.',
    },
    {
      question: 'How many feet are in a yard, and inches in a foot?',
      answer: 'There are 3 feet in a yard and 12 inches in a foot, so a yard is 36 inches. In metric terms, 1 yard is exactly 0.9144 meters, which is 91.44 centimeters.',
    },
    {
      question: 'Why is my converted value rounded?',
      answer: 'The tool shows up to 6 decimal places, so very small or very long results are rounded for display. The underlying factors are exact, so a conversion such as 1 mile to inches gives 63,360 with no rounding error.',
    },
  ],

  'weight-converter': [
    {
      question: 'How do I convert pounds to kilograms?',
      answer: 'Multiply pounds by 0.45359237, since 1 pound is exactly 0.45359237 kg. For example, 180 lb is about 81.647 kg. As a rough mental shortcut, divide pounds by 2.2. To convert kilograms to pounds, divide kg by 0.45359237.',
    },
    {
      question: 'How many grams are in an ounce?',
      answer: 'One avoirdupois ounce is 28.349523125 grams, commonly rounded to 28.35 g. There are 16 ounces in a pound, which is why 16 times 28.349523125 gives 453.59237 g. This is the ounce used for food and body weight, not the troy ounce used for gold.',
    },
    {
      question: 'Which weight units are supported?',
      answer: 'Milligrams, grams, kilograms, metric tons, ounces, pounds and stones. Everything converts through grams: 1 kg is 1,000 g, 1 metric ton is 1,000 kg, 1 lb is 453.59237 g and 1 stone is 14 pounds, or about 6.35 kg.',
    },
    {
      question: 'What is the difference between a metric ton and a US ton?',
      answer: 'A metric ton (tonne) is 1,000 kg, about 2,204.6 lb. A US short ton is 2,000 lb, about 907 kg. The tool offers the metric ton only, so use pounds for short tons: 2,000 lb converts to about 907.185 kg.',
    },
    {
      question: 'How many pounds are in a stone?',
      answer: 'One stone is 14 pounds, which is about 6.35 kg. The stone is used mainly in the UK and Ireland for body weight, so a person of 11 stone weighs 154 pounds or about 69.85 kg.',
    },
    {
      question: 'What is the difference between mass and weight?',
      answer: 'Mass is the amount of matter, measured in kilograms, while weight is the force of gravity on that mass. In everyday use both words mean the same thing, and these converters treat pounds, kilograms and ounces as units of mass on Earth.',
    },
  ],

  'temperature-converter': [
    {
      question: 'How do I convert Celsius to Fahrenheit?',
      answer: 'Multiply the Celsius value by 9/5 (1.8) and add 32. For example, 25 degrees C is 25 x 1.8 + 32 = 77 degrees F. Water freezes at 0 C (32 F) and boils at 100 C (212 F) at standard atmospheric pressure.',
    },
    {
      question: 'How do I convert Fahrenheit to Celsius?',
      answer: 'Subtract 32 and multiply by 5/9. For example, 98.6 degrees F becomes (98.6 - 32) x 5/9 = 37 degrees C, normal body temperature. The tool shows the formula it used, so you can follow the arithmetic step by step.',
    },
    {
      question: 'How do I convert Celsius to Kelvin?',
      answer: 'Add 273.15 to the Celsius value. So 0 degrees C is 273.15 K and 100 degrees C is 373.15 K. Kelvin has no degree symbol, and absolute zero, the lowest possible temperature, is 0 K or -273.15 C (-459.67 F).',
    },
    {
      question: 'At what temperature are Celsius and Fahrenheit equal?',
      answer: 'They are equal at -40 degrees. Using F = C x 1.8 + 32, setting F equal to C gives C = -40, so -40 C is the same temperature as -40 F. It is the only point where the two scales agree.',
    },
    {
      question: 'What are room temperature and body temperature in Celsius and Fahrenheit?',
      answer: 'Room temperature is commonly taken as 20 C, which is 68 F or 293.15 K. Normal human body temperature is about 37 C, which is 98.6 F or 310.15 K. These reference points are also listed on the page for quick comparison.',
    },
    {
      question: 'Can a temperature go below zero Kelvin?',
      answer: 'No. Zero Kelvin is absolute zero, the point where particles have minimal thermal motion, so nothing can be colder. A value below 0 K is physically meaningless, and the equivalent limits are -273.15 C and -459.67 F.',
    },
  ],

  'data-storage-converter': [
    {
      question: 'How many MB are in a GB?',
      answer: 'In decimal (SI) terms, 1 GB is 1,000 MB. In binary terms, 1 GiB is 1,024 MiB. Use the toggle to choose Decimal (1000) or Binary (1024). Drive makers and networks use decimal, while operating systems and memory often use binary.',
    },
    {
      question: 'What is the difference between GB and GiB?',
      answer: 'A gigabyte (GB) is 1,000,000,000 bytes, while a gibibyte (GiB) is 1,073,741,824 bytes (1,024 cubed). The gap is about 7.4 percent and grows at larger sizes. In the tool, the binary option gives the GiB-style calculation for the same unit labels.',
    },
    {
      question: 'Why does my 500 GB drive show less space on my computer?',
      answer: 'The drive is measured in decimal gigabytes, but some operating systems report binary units. 500 x 10^9 bytes divided by 1,024 cubed is about 465.66 GiB, which is the figure you see. No space is missing, it is just a different unit.',
    },
    {
      question: 'Which storage units can I convert?',
      answer: 'Bytes, kilobytes, megabytes, gigabytes, terabytes and petabytes. The tool works in bytes and lets you choose decimal factors (each step is 1,000 times bigger) or binary factors (each step is 1,024 times bigger). It does not include bits, so multiply bytes by 8 for bits.',
    },
    {
      question: 'How many bytes are in a kilobyte?',
      answer: 'Under the decimal (SI) definition, 1 KB is 1,000 bytes. Under the binary definition, 1 KiB is 1,024 bytes. Use the decimal option for storage marketing and networking figures and the binary option when working with memory or file sizes shown by many operating systems.',
    },
    {
      question: 'What is the difference between megabits and megabytes?',
      answer: 'A byte is 8 bits, so 1 megabyte equals 8 megabits. Internet speeds are usually quoted in megabits per second, while file sizes are in megabytes. A 100 Mbps connection therefore downloads at most about 12.5 MB of data per second.',
    },
  ],

  'html-entity-encoder': [
    {
      question: 'What are HTML entities?',
      answer: 'HTML entities are codes that represent characters with special meaning or that are hard to type in HTML. They start with & and end with a semicolon, such as &lt; for <, &amp; for & and &copy; for the copyright sign. Numeric forms like &#169; also work.',
    },
    {
      question: 'How do I escape HTML special characters?',
      answer: 'Paste the text in Encode mode. The five characters & < > " and \' are replaced with &amp; &lt; &gt; &quot; and &#39;. For example, <p>Fish & Chips</p> becomes &lt;p&gt;Fish &amp; Chips&lt;/p&gt;, which browsers show as text instead of running it as markup.',
    },
    {
      question: 'How do I decode HTML entities back to text?',
      answer: 'Switch to Decode and paste the text. Named entities such as &amp; and &copy;, and numeric ones like &#233; or &#xE9;, are converted to real characters. Only a common set of named entities is recognised, so a rare name may stay as is.',
    },
    {
      question: 'What does Encode non-ASCII characters do?',
      answer: 'When it is on, every character above code point 126 is written as a numeric entity, so é becomes &#233; and the pound sign becomes &#163;. This is useful for systems that cannot handle UTF-8. When it is off, those characters are left as they are.',
    },
    {
      question: 'Does escaping HTML prevent XSS attacks?',
      answer: 'Escaping user input before inserting it into HTML text is a core defence against cross-site scripting, but context matters. Attributes, URLs, JavaScript and CSS need their own escaping rules. Use your framework built-in escaping instead of doing it by hand where possible.',
    },
    {
      question: 'What is the difference between &nbsp; and a normal space?',
      answer: 'A non-breaking space (&nbsp;) looks like a space but stops a line from wrapping there, and browsers do not collapse several of them into one. A normal space can be collapsed and wrapped. On decoding, this tool turns &nbsp; into a regular space character.',
    },
  ],

  'json-csv-converter': [
    {
      question: 'How do I convert JSON to CSV?',
      answer: 'Paste a JSON array of objects, choose JSON to CSV and copy or download the result. The keys become the header row and each object becomes a row. For [{"name":"Asha","age":29}] the output is a header line name,age followed by Asha,29.',
    },
    {
      question: 'How does the tool handle nested JSON?',
      answer: 'Nested objects are flattened into columns with combined keys. For example, {"address":{"city":"Pune"}} becomes a column named address.city with the value Pune. Different objects can have different keys, and the header includes every key found, with blanks where a row lacks one.',
    },
    {
      question: 'How do I convert CSV to JSON?',
      answer: 'Choose CSV to JSON, paste your data and make sure the first row holds the column names. Each following row becomes an object, giving an array of objects. All values are output as strings, so numbers such as 29 appear as "29".',
    },
    {
      question: 'Which delimiters are supported?',
      answer: 'Comma, semicolon, tab and pipe. Choose semicolon for many European Excel exports, where commas are decimal separators, and tab for TSV files. Values containing the delimiter, a quote or a newline are wrapped in double quotes, with inner quotes doubled.',
    },
    {
      question: 'Why does my CSV open with garbled columns in Excel?',
      answer: 'Excel decides the delimiter from your regional settings, so a comma file can open in one column in regions that use semicolons. Export using the delimiter your Excel expects, or import the file through Data, From Text/CSV and choose the delimiter.',
    },
    {
      question: 'What happens to arrays inside JSON objects?',
      answer: 'Nested structures are flattened using their key paths, so array items become separate numbered columns rather than separate rows. Deeply nested data may produce a very wide table. If you need one row per array item, reshape the JSON before converting.',
    },
  ],

  'chmod-calculator': [
    {
      question: 'What does chmod 755 mean?',
      answer: 'chmod 755 gives the owner read, write and execute permission (7), and the group and others read and execute only (5 each). In symbolic form that is rwxr-xr-x. It is the usual setting for scripts, programs and directories that others must be able to enter.',
    },
    {
      question: 'What does chmod 644 mean?',
      answer: 'chmod 644 gives the owner read and write (6), and the group and others read only (4 each), shown as rw-r--r--. It is the common setting for ordinary files such as web pages and documents that should not be executable.',
    },
    {
      question: 'How do chmod octal numbers work?',
      answer: 'Each digit is the sum of read = 4, write = 2 and execute = 1, and the three digits are for owner, group and others in that order. So 7 = 4+2+1 is full access, 6 = 4+2 is read and write, 5 = 4+1 is read and execute, and 0 is no access.',
    },
    {
      question: 'How do I use the chmod calculator?',
      answer: 'Tick the read, write and execute boxes for owner, group and others, or type a three-digit octal value such as 640. The tool shows the octal number, the symbolic string like rw-r-----, and a ready-to-copy command such as chmod 640 file.sh with your file name.',
    },
    {
      question: 'Is chmod 777 safe?',
      answer: 'Usually not. 777 lets every user on the system read, write and execute the file, which is a security risk, especially on web servers. Prefer 755 for directories and programs and 644 for files, and give write access only to the owner or a specific group.',
    },
    {
      question: 'What permission should a private SSH key or secret file have?',
      answer: 'Use 600 (rw-------) for a private file so only the owner can read and write it, and 700 for a private directory. SSH refuses to use a private key that other users can read, so chmod 600 is the standard fix for that permissions error.',
    },
  ],

  'url-parser': [
    {
      question: 'How do I break a URL into its parts?',
      answer: 'Paste the URL and the tool lists its protocol, username, password, hostname, port, origin, path, query string and hash, plus a table of query parameters. For example, https://example.com:8080/a/b?x=1#top has host example.com, port 8080, path /a/b, query ?x=1 and hash #top.',
    },
    {
      question: 'What is the difference between host and hostname?',
      answer: 'The hostname is only the domain name, like example.com. The host includes the port when one is given, like example.com:8080. This tool shows the hostname and the port as separate lines, along with the origin, which combines protocol, hostname and port.',
    },
    {
      question: 'How do I read query parameters from a URL?',
      answer: 'Everything after the question mark and before any hash is the query string, made of name=value pairs separated by &. The parser lists each pair on its own row. A repeated key, like tag=a&tag=b, appears as two entries, and values are shown decoded.',
    },
    {
      question: 'What happens if I paste a URL without https://?',
      answer: 'The tool assumes https:// in front, so example.com/page?x=1 is parsed as https://example.com/page?x=1. If the text starts with another scheme such as ftp: or mailto:, it is used as is. Text that cannot form a valid URL shows an invalid message.',
    },
    {
      question: 'Why is my URL port empty?',
      answer: 'A port is shown only when the URL states one that differs from the default for its protocol. HTTPS uses 443 and HTTP uses 80 by default, so https://example.com:443/ shows an empty port. Default ports are dropped by the standard URL parser.',
    },
    {
      question: 'Should I put a username and password in a URL?',
      answer: 'Avoid it. Credentials in a URL such as https://user:pass@example.com can leak through browser history, server logs and referrer headers, and many browsers now warn about or block them. Send credentials in headers or a login form instead.',
    },
  ],

  'area-converter': [
    {
      question: 'How many square feet are in a square meter?',
      answer: 'One square meter is about 10.7639 square feet, because 1 ft2 is exactly 0.09290304 m2. So 1,000 sq ft is 92.90304 m2. To convert square meters to square feet, divide by 0.09290304.',
    },
    {
      question: 'How many square feet are in an acre?',
      answer: 'One acre is 43,560 square feet, which is 4,046.8564224 square meters. It is also about 0.4047 hectares. The tool includes acres, hectares, square feet, square yards and other units for both metric and imperial land measurement.',
    },
    {
      question: 'How many square meters are in a hectare?',
      answer: 'One hectare is exactly 10,000 square meters, which is a square 100 m by 100 m. A hectare is about 2.471 acres, and 100 hectares make one square kilometer.',
    },
    {
      question: 'Does the tool support cents and gunthas?',
      answer: 'Yes, it includes the Indian land units cent (40.468564224 m2) and guntha (101.17141056 m2), alongside acres and hectares. One acre is 100 cents, and one acre is 40 gunthas. Local land units vary by state in India, so confirm the definition used in your records.',
    },
    {
      question: 'Why is a square foot not the same as a linear foot?',
      answer: 'A linear foot measures length along one line, while a square foot measures area, a 1 ft by 1 ft square. You cannot convert between them without another dimension. A 10 ft by 12 ft room is 120 square feet, not 22 feet.',
    },
    {
      question: 'How do I convert square inches to square centimeters?',
      answer: 'Multiply by 6.4516, because 1 square inch is exactly 0.00064516 square meters, or 6.4516 cm2. This is 2.54 squared, since area factors are the square of the length factor. For example, 10 in2 is 64.516 cm2.',
    },
  ],

  'volume-converter': [
    {
      question: 'How many milliliters are in a cup?',
      answer: 'A US cup is about 236.588 milliliters. This tool uses the US customary cup, so 2 cups is about 473.18 mL, which equals 1 US pint. Metric cups used in Australia and elsewhere are 250 mL, so check the cup type your recipe uses.',
    },
    {
      question: 'How many liters are in a gallon?',
      answer: 'A US gallon is 3.785411784 liters, and a UK (imperial) gallon is 4.54609 liters. The tool has both, so 5 US gallons is about 18.927 liters. The difference matters for fuel economy figures, since a UK gallon is about 20 percent larger.',
    },
    {
      question: 'What is the difference between a US gallon and a UK gallon?',
      answer: 'A US gallon holds 3.785 liters and a UK imperial gallon holds 4.546 liters. Their pints and quarts also differ, because the US gallon is 128 US fluid ounces and the imperial gallon is 160 imperial fluid ounces. Make sure you pick the right one.',
    },
    {
      question: 'How many teaspoons are in a tablespoon?',
      answer: 'There are 3 US teaspoons in 1 US tablespoon. In metric, 1 US teaspoon is about 4.93 mL and 1 US tablespoon is about 14.79 mL. There are also 2 tablespoons in 1 US fluid ounce.',
    },
    {
      question: 'How many cubic centimeters are in a milliliter?',
      answer: 'They are equal: 1 cm3 is exactly 1 mL, and 1,000 mL make 1 liter or 1,000 cm3. One cubic meter is 1,000 liters. This is why the medical and engineering worlds use cc and mL interchangeably.',
    },
    {
      question: 'Are fluid ounces the same as ounces of weight?',
      answer: 'No. A fluid ounce measures volume (1 US fl oz is about 29.57 mL), while an ounce measures weight (about 28.35 g). For water they are close, but for other ingredients such as flour or honey a cup of the same volume weighs very different amounts.',
    },
  ],

  'speed-converter': [
    {
      question: 'How do I convert km/h to mph?',
      answer: 'Divide km/h by 1.609344, or multiply by 0.621371. For example, 100 km/h is about 62.14 mph. To convert mph to km/h, multiply by 1.609344, so 60 mph is about 96.56 km/h.',
    },
    {
      question: 'How do I convert km/h to m/s?',
      answer: 'Divide km/h by 3.6, since 1 km/h is 1,000 meters in 3,600 seconds. So 90 km/h is 25 m/s. To go from m/s to km/h, multiply by 3.6. This tool applies these factors exactly.',
    },
    {
      question: 'How fast is one knot?',
      answer: 'One knot is one nautical mile per hour, exactly 1.852 km/h or about 1.15078 mph. It is 0.514444 m/s. Knots are used for ships and aircraft, so a vessel doing 20 knots is moving at 37.04 km/h.',
    },
    {
      question: 'What speed is Mach 1?',
      answer: 'This tool uses Mach 1 as 340.29 m/s, the speed of sound in air at sea level and 15 degrees C, which is about 1,225 km/h or 761 mph. The real speed of sound falls with lower temperature and altitude, so Mach 1 is not a constant speed.',
    },
    {
      question: 'Which speed units can I convert?',
      answer: 'Meters per second, kilometers per hour, miles per hour, knots, feet per second, Mach and the speed of light. Everything is converted through meters per second, where 1 mph is exactly 0.44704 m/s and 1 ft/s is exactly 0.3048 m/s.',
    },
    {
      question: 'How many mph is 100 km/h?',
      answer: 'About 62.14 mph. Since 1 mile is 1.609344 km, dividing 100 by 1.609344 gives 62.137. A quick approximation is to multiply km/h by 0.62. The other way, 100 mph is about 160.93 km/h.',
    },
  ],

  'time-converter': [
    {
      question: 'How many seconds are in a day?',
      answer: 'There are 86,400 seconds in a day, from 24 hours times 60 minutes times 60 seconds. A week is 604,800 seconds. These are exact for a standard day and ignore leap seconds.',
    },
    {
      question: 'How do I convert hours to minutes?',
      answer: 'Multiply hours by 60. For example, 2.5 hours is 150 minutes. Decimal hours are not hours and minutes, so 2.5 hours is 2 hours 30 minutes. Enter the decimal value in the tool and it converts it directly.',
    },
    {
      question: 'How long is a month or a year in this converter?',
      answer: 'Months and years vary in real life, so the tool uses averages. A year is 365.2425 days (31,556,952 seconds), the Gregorian average, and a month is one twelfth of that, about 30.437 days (2,629,746 seconds). For a specific calendar span, count actual days.',
    },
    {
      question: 'Which time units can I convert?',
      answer: 'Milliseconds, seconds, minutes, hours, days, weeks, months, years and decades. The tool converts through seconds, so 1 hour is 3,600 seconds, 1 week is 604,800 seconds and 1 decade is 315,569,520 seconds using the average year.',
    },
    {
      question: 'How many days are in a year?',
      answer: 'A common year has 365 days and a leap year has 366. The Gregorian calendar average is 365.2425 days, which this converter uses. That means 1 year is about 52.18 weeks rather than exactly 52.',
    },
    {
      question: 'How do I convert decimal hours to hours and minutes?',
      answer: 'Keep the whole number as hours and multiply the decimal part by 60 for minutes. For example, 1.75 hours is 1 hour and 0.75 x 60 = 45 minutes. This matters for timesheets and payroll, where 7.5 hours means 7 hours 30 minutes.',
    },
  ],

  'number-base-converter': [
    {
      question: 'How do I convert decimal to binary?',
      answer: 'Repeatedly divide the number by 2 and read the remainders from last to first. For example, 255 becomes 11111111. In the tool, enter the number with input base 10 and the binary, octal, hexadecimal, base 32 and base 36 forms appear together.',
    },
    {
      question: 'How do I convert hexadecimal to decimal?',
      answer: 'Set the input base to 16 and type the hex digits, or multiply each digit by a power of 16. For example, ff is 15 x 16 + 15 = 255, and 1a is 26. The letters a to f stand for 10 to 15.',
    },
    {
      question: 'What bases does the converter support?',
      answer: 'Any base from 2 to 36. Digits above 9 use the letters a to z, so base 36 uses every digit and letter. Quick rows show binary, octal, decimal, hexadecimal, base 32 and base 36, plus one custom output base of your choice.',
    },
    {
      question: 'Can it convert very large numbers exactly?',
      answer: 'Yes. It uses arbitrary-precision integers, so numbers far beyond the normal 2^53 limit of JavaScript numbers convert without rounding. Negative integers work as well. Fractions and decimals with a point are not supported, only whole numbers.',
    },
    {
      question: 'Why does it say not a valid number?',
      answer: 'A digit in your input is not allowed in the chosen input base. For instance 2 is invalid in binary, 8 is invalid in octal and g is invalid in hexadecimal. Check the input base selector, and remove any prefix like 0x or 0b, which the tool does not recognise.',
    },
    {
      question: 'What is the binary or hex value of 255?',
      answer: '255 in decimal is 11111111 in binary, 377 in octal and ff in hexadecimal. It is the largest value of one byte (2^8 minus 1), which is why hex color codes use ff as the maximum for each of red, green and blue.',
    },
  ],

  'roman-numeral-converter': [
    {
      question: 'How do I convert a number to a Roman numeral?',
      answer: 'Enter a whole number from 1 to 3999 and the Roman numeral is shown. The value is built from the symbols I=1, V=5, X=10, L=50, C=100, D=500 and M=1000. For example, 2026 is MMXXVI, and 1994 is MCMXCIV.',
    },
    {
      question: 'How do I convert a Roman numeral to a number?',
      answer: 'Switch to Roman to Number and type the numeral, such as MMXXVI. Add symbol values from left to right, but when a smaller symbol comes before a larger one, subtract it. So IV is 4 and XC is 90. The tool accepts only standard forms.',
    },
    {
      question: 'Why can the converter only go up to 3999?',
      answer: 'Standard Roman numerals use M as the largest symbol and repeat a symbol at most three times, so the largest number is MMMCMXCIX, which is 3999. Larger values need a vinculum bar over a letter to multiply by 1000, which is not part of the basic system.',
    },
    {
      question: 'Why is IIII not accepted?',
      answer: 'The tool accepts only standard subtractive notation, so 4 is IV rather than IIII, and 9 is IX. Some clock faces use IIII, but non-canonical spellings like IIII or VX are rejected as invalid so results are unambiguous.',
    },
    {
      question: 'How do you write 4, 9, 40, 90, 400 and 900 in Roman numerals?',
      answer: 'They use subtraction: 4 is IV, 9 is IX, 40 is XL, 90 is XC, 400 is CD and 900 is CM. A smaller symbol placed before a larger one is subtracted from it, and only I, X and C are used in this way.',
    },
    {
      question: 'Is there a Roman numeral for zero?',
      answer: 'No. The Romans had no symbol for zero, and the standard system starts at 1. Some medieval writers used the Latin word nulla, but it is not part of ordinary numerals, so this tool covers 1 to 3999 only.',
    },
  ],
};
