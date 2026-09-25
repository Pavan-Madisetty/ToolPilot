import type { FaqMap } from './types';

export const FAQS: FaqMap = {
  'image-resize': [
    {
      question: 'How do I resize an image without losing quality?',
      answer:
        'Upload the image, keep the aspect ratio lock on, enter the new width or height and download. Making an image smaller keeps it sharp, while enlarging it beyond its original pixel size always softens detail because the browser has to invent pixels.',
    },
    {
      question: 'How do I resize an image to a specific width and height in pixels?',
      answer:
        'Select your image, then type the target width and height in pixels. With the ratio lock on, changing one value updates the other automatically. Unlock it if you need exact dimensions that differ from the original proportions, but the picture will be stretched.',
    },
    {
      question: 'Which export format should I choose: WebP, JPEG or PNG?',
      answer:
        'Use JPEG for photos that must work everywhere, WebP for websites where smaller files matter, and PNG for screenshots, logos or anything with sharp edges or transparency. The tool exports all three, and the quality slider applies to WebP and JPEG but not PNG.',
    },
    {
      question: 'Why is my resized image bigger in file size than the original?',
      answer:
        'File size depends on format and quality as well as pixel dimensions. Exporting a JPEG as PNG, or keeping quality at a high setting, can produce a larger file even at fewer pixels. Try WebP or JPEG at about 70 to 85 percent quality and compare the size shown after processing.',
    },
    {
      question: 'Are my images uploaded when I resize them online?',
      answer:
        'No. The image is drawn onto a canvas and re-encoded by your own browser, so the file is never sent to a server. That also means it works offline once the page has loaded, and large images are limited only by your device memory.',
    },
    {
      question: 'Image resizer vs image compressor: what is the difference?',
      answer:
        'A resizer changes the pixel dimensions of a picture, for example 4000 by 3000 down to 1200 by 900. A compressor keeps the dimensions and lowers the file size by reducing quality. For web use you often want both, and this tool lets you change size and quality together.',
    },
  ],

  'image-compress': [
    {
      question: 'How do I compress a JPG or PNG image without losing quality?',
      answer:
        'Upload the image and lower the quality slider gradually while watching the preview. Around 70 to 85 percent usually cuts the file size a lot with little visible change. Strictly lossless compression is not what this tool does, so some detail is always traded for size.',
    },
    {
      question: 'How do I reduce an image to under 100 KB or 200 KB?',
      answer:
        'Drag the quality slider down in steps of 5 and check the compressed size shown next to the preview until it fits your limit. If quality alone is not enough, shrink the pixel dimensions first with the image resizer, since fewer pixels means a much smaller file.',
    },
    {
      question: 'What happens when I compress a PNG?',
      answer:
        'PNG files are converted to JPG so the quality slider can shrink them, and the download is named with a .jpg extension. This usually saves a lot on photos, but transparency is not kept, so do not use it for logos or graphics that need a transparent background.',
    },
    {
      question: 'Does compressing an image change its dimensions?',
      answer:
        'No. The output keeps the original width and height in pixels; only the encoding quality changes. JPG and WebP files stay in their own format. If you also need smaller dimensions, run the image through the resizer as a separate step.',
    },
    {
      question: 'Is it safe to compress private photos with this tool?',
      answer:
        'Yes. Compression happens in your browser using canvas, so the photo is never uploaded to a server. You can even disconnect from the internet after the page loads. Files above 50 MB are rejected, which keeps the page responsive on most devices.',
    },
    {
      question: 'Lossy vs lossless compression: which should I use for images?',
      answer:
        'Lossy compression, used by JPG and WebP, discards detail the eye rarely notices and gives much smaller files, ideal for photos. Lossless keeps every pixel and suits screenshots and text graphics, but saves less. This tool applies lossy compression through its quality slider.',
    },
  ],

  'image-crop': [
    {
      question: 'How do I crop an image online for free?',
      answer:
        'Upload your image, choose Free or a preset ratio, then position and size the crop box with the sliders and click Apply Crop. Preview the result and download it. The crop is calculated on your device, so nothing is uploaded.',
    },
    {
      question: 'How do I crop a photo to a square 1:1 for Instagram or a profile picture?',
      answer:
        'Pick the 1:1 ratio and the crop box snaps to a square. Adjust the X and Y position sliders to frame the subject, then apply the crop. The tool also offers 16:9 and 4:3 presets for video thumbnails and slides.',
    },
    {
      question: 'What file format does the cropped image download as?',
      answer:
        'The cropped image is saved as a PNG named cropped_image.png, whatever the original format was. PNG is lossless so the crop keeps full quality, but a photo can end up larger than the original JPG. Run it through the image compressor if you need a smaller file.',
    },
    {
      question: 'Does cropping reduce the image quality?',
      answer:
        'No. Cropping copies the selected pixels at their original resolution, so the cropped area is as sharp as it was in the source. The picture only looks lower resolution if the crop is small and you then display it larger than its pixel size.',
    },
    {
      question: 'Why can I not move the crop box exactly where I want?',
      answer:
        'The crop area is controlled with sliders for position and size, and each is limited so the box stays inside the image. Reduce the width or height first to free up room, then move the position. Presets such as 16:9 also fix the proportions until you switch back to Free.',
    },
    {
      question: 'Crop vs resize: which one should I use?',
      answer:
        'Crop removes parts of the picture and keeps the pixels that remain unchanged, while resize scales the whole picture up or down. Crop first to get the framing you want, then resize if you also need particular dimensions or a smaller file.',
    },
  ],

  'qr-generator': [
    {
      question: 'How do I create a QR code for a website link for free?',
      answer:
        'Paste your URL into the text box and the QR code appears instantly. Pick colors, size and error correction if you like, then click download to save a PNG. There is no watermark, and the code is generated in your browser, so nothing is sent to a server.',
    },
    {
      question: 'Which QR error correction level should I choose: L, M, Q or H?',
      answer:
        'Higher levels survive more damage but make the code denser. Approximate recovery is about 7 percent for L, 15 percent for M, 25 percent for Q and 30 percent for H. Use M for clean screens, and Q or H for printed codes that may get scratched or have a logo placed over them.',
    },
    {
      question: 'How much data can a QR code hold?',
      answer:
        'The largest QR code can hold up to about 7,089 digits, 4,296 alphanumeric characters or roughly 2,953 bytes of text at the lowest error correction level. Higher levels reduce that capacity, and longer content produces a denser code that is harder to scan.',
    },
    {
      question: 'How do I make a WiFi QR code?',
      answer:
        'Type the standard WiFi format into the text box, for example WIFI:T:WPA;S:NetworkName;P:YourPassword;; and the generated code can be scanned by most modern phones to join the network. The tool encodes whatever text you enter, so the format has to be typed exactly.',
    },
    {
      question: 'Why will my QR code not scan?',
      answer:
        'The usual causes are low contrast, an inverted or very light foreground color, a code printed too small, or too much text. Keep a dark code on a light background, leave the quiet border around it, use at least 2 cm when printing, and test with a phone before printing many copies.',
    },
    {
      question: 'Do QR codes made here expire, and what size is the download?',
      answer:
        'The code holds your text directly, so it never expires and needs no account. When you link to a URL, it works as long as that page does. You can choose 128 to 512 pixels and the file downloads as a PNG.',
    },
  ],

  'barcode-generator': [
    {
      question: 'How do I generate a barcode online for free?',
      answer:
        'Type your text or number into the content box and the barcode preview updates live. Then click Download to save it as an SVG file. Generation runs in your browser, so no data is uploaded and no account is needed.',
    },
    {
      question: 'Which barcode format does this generator create?',
      answer:
        'It creates Code 128, using character set B, and the text you enter is converted to uppercase. It does not create EAN-13 or UPC-A retail barcodes. Code 128 suits inventory labels, shipping and asset tags where you control the numbering.',
    },
    {
      question: 'What characters can I put in a Code 128 barcode?',
      answer:
        'Code 128 set B supports standard printable ASCII characters, meaning letters, digits, spaces and common symbols. Accented letters, emoji and other non-ASCII characters are rejected with an error message. This tool also converts lowercase letters to uppercase.',
    },
    {
      question: 'EAN-13 vs UPC-A vs Code 128: what is the difference?',
      answer:
        'EAN-13 has 13 digits and is used worldwide on retail products, and UPC-A has 12 digits and is used mainly in North America. Code 128 is a compact alphanumeric format for internal use. Retail EAN and UPC numbers must be issued through GS1, so you cannot invent them.',
    },
    {
      question: 'Why is my barcode not scanning?',
      answer:
        'Check that the bars are printed dark on a light background, that the barcode is not shrunk too small, and that there is blank space on both sides of it. A vector SVG stays sharp at any size, so scale it up rather than stretching a screenshot before you print.',
    },
    {
      question: 'Can I use the barcode for products sold in stores?',
      answer:
        'Not for retail shelves. Stores and marketplaces normally require an official EAN or UPC number from GS1, which this tool does not produce. Code 128 barcodes from this generator are best for internal stock control, boxes, documents and event passes.',
    },
  ],

  'jpg-converter': [
    {
      question: 'How do I convert PNG to JPG for free?',
      answer:
        'Upload your PNG, set the quality (90 percent by default), and click download to get a .jpg file. The conversion happens in your browser, so the image is not uploaded. The same steps work for WebP, GIF and BMP files.',
    },
    {
      question: 'What happens to transparent areas when converting to JPG?',
      answer:
        'JPG cannot store transparency, so transparent areas are filled with solid white. If you need to keep the transparency, stay with PNG or WebP instead. Placing the image on a different background color before converting is not offered here.',
    },
    {
      question: 'What JPG quality setting should I use?',
      answer:
        'For photos, 80 to 90 percent gives a good balance of sharpness and file size, and 70 percent is often fine for web pages. Going below about 60 percent tends to show blocky artifacts. Use the slider to compare sizes for your own image.',
    },
    {
      question: 'Which image formats can I convert to JPG here?',
      answer:
        'You can upload PNG, WebP, GIF and BMP files and receive a JPG. A GIF becomes a single still image, not an animation, because JPG does not support animation. Files larger than 50 MB are refused.',
    },
    {
      question: 'Will converting PNG to JPG make the file smaller?',
      answer:
        'Usually yes for photographs, often by a large margin, because JPG uses lossy compression. For flat graphics, screenshots or text, a JPG can be larger and look fuzzier around edges. Compare the downloaded size with the original before replacing it.',
    },
    {
      question: 'JPG vs PNG: which format should I use?',
      answer:
        'Use JPG for photographs and images with smooth color gradients, where small files matter more than perfect detail. Use PNG for logos, screenshots, diagrams and anything needing transparency or crisp edges, since it is lossless. Converting between them repeatedly can reduce quality.',
    },
  ],

  'webp-converter': [
    {
      question: 'How do I convert JPG or PNG to WebP?',
      answer:
        'Upload your JPG, PNG, GIF or BMP image, set the quality (85 percent by default) and download the .webp file. The conversion runs in your browser, so nothing is uploaded, and a browser that supports WebP encoding is needed.',
    },
    {
      question: 'Is WebP smaller than JPG and PNG?',
      answer:
        'Typically yes. WebP files are commonly cited as around 25 to 35 percent smaller than JPEG at similar visual quality, and often smaller than PNG for graphics too. Results vary by image, so check the size of your converted file.',
    },
    {
      question: 'Do all browsers and apps support WebP?',
      answer:
        'All current major browsers display WebP, including Chrome, Firefox, Safari and Edge. Support in older browsers, email clients and some editing or upload tools can be patchy, so keep a JPG or PNG copy if the file has to open everywhere.',
    },
    {
      question: 'Does WebP conversion keep transparency?',
      answer:
        'WebP supports transparency, so a PNG with a transparent background usually stays transparent after conversion. This tool re-encodes the image through your browser canvas, so check the preview or open the download to confirm before publishing.',
    },
    {
      question: 'What WebP quality should I choose?',
      answer:
        'Around 75 to 85 percent is a sensible default for photos on websites and gives a large saving with little visible loss. Use higher values for detailed images and lower values for thumbnails. Compare the file sizes and look at the result before deciding.',
    },
    {
      question: 'How do I convert WebP back to JPG or PNG?',
      answer:
        'Use the Image to JPG converter, which accepts WebP files, or open the WebP in an image editor and export it as PNG. This is handy when a website, printer or older app refuses WebP files.',
    },
  ],

  'color-palette': [
    {
      question: 'How do I get the colors from an image?',
      answer:
        'Upload an image and the tool automatically extracts a palette of dominant colors. Choose 4, 6, 8 or 10 colors from the dropdown. Each swatch shows HEX, RGB and HSL values, and you can click one to copy it. Nothing is uploaded, since it runs in your browser.',
    },
    {
      question: 'How does the color palette extractor work?',
      answer:
        'It shrinks the image to a small sample, ignores mostly transparent pixels, then groups similar colors together with a clustering method and averages each group. The result is the representative dominant colors, not an exact list of every color in the image.',
    },
    {
      question: 'How do I find the HEX code of a color in a picture?',
      answer:
        'Upload the picture and click the swatch closest to the shade you want. The HEX code, for example #4648d4, is copied to your clipboard and also shown as RGB and HSL. This gives dominant colors, so it will not pick out one exact pixel.',
    },
    {
      question: 'Why does the palette not include a small accent color?',
      answer:
        'Dominant colors reflect how much of the image each color covers, so tiny details may be merged into a larger group. Try a higher color count, such as 10, or crop the image to the region you care about and extract again.',
    },
    {
      question: 'Can I use the extracted colors for branding or website design?',
      answer:
        'Yes. Copy the HEX or RGB values into your CSS, Figma or design tool. Extracted colors are a great starting point, but check contrast for text, since WCAG recommends at least 4.5 to 1 for normal body text.',
    },
    {
      question: 'What is the difference between HEX, RGB and HSL?',
      answer:
        'They describe the same color in different ways. HEX is a compact code like #ff8800, RGB gives red, green and blue values from 0 to 255, and HSL uses hue, saturation and lightness, which makes it easier to make a color lighter or darker by hand.',
    },
  ],

  'favicon-generator': [
    {
      question: 'How do I make a favicon.ico from an image or logo?',
      answer:
        'Upload a square PNG or JPG of your logo and the tool generates favicon.ico and the PNG sizes for you. Download each file and place them in your website root. The image is processed in your browser, so it is not uploaded.',
    },
    {
      question: 'What favicon sizes do I need?',
      answer:
        'This tool creates favicon.ico (32 by 32 pixels), 16 by 16 and 32 by 32 PNGs for browser tabs, a 180 by 180 Apple touch icon for iOS, and 192 by 192 and 512 by 512 Android icons. That covers the common requirements for most websites.',
    },
    {
      question: 'What is the best image to use for a favicon?',
      answer:
        'Use a simple, high-contrast, square image of at least 512 by 512 pixels. The tool scales your image to each square size, so a non-square logo will be stretched. Crop it to a square first, and avoid fine text, which becomes unreadable at 16 pixels.',
    },
    {
      question: 'How do I add the favicon to my website?',
      answer:
        'Upload the files to your site root, then add link tags in the head of your HTML, such as a link with rel icon pointing to /favicon.ico, and a link with rel apple-touch-icon pointing to the 180 pixel PNG. Browsers cache favicons, so a hard refresh may be needed to see changes.',
    },
    {
      question: 'Why is my favicon not showing up?',
      answer:
        'Browsers cache favicons aggressively, so clear the cache or open the site in a private window. Also check the file path, that the file is actually served, and that your link tag is in the head. Search engines can take days or weeks to refresh their own icon.',
    },
    {
      question: 'Is favicon.ico or a PNG better?',
      answer:
        'Modern browsers work well with PNG icons, but favicon.ico remains the traditional fallback that many tools and older browsers request automatically at the site root. Providing both, along with an Apple touch icon, is the safest approach and is what this tool outputs.',
    },
  ],

  'prompt-builder': [
    {
      question: 'What is an AI prompt builder and how does it work?',
      answer:
        'It turns a few fields, namely role, task, tone and constraints, into a structured prompt you can paste into any chatbot. It fills a fixed template with your inputs in your browser. It does not send your text to ChatGPT, Gemini or Claude, and it does not call any AI service.',
    },
    {
      question: 'How do I write a good prompt for ChatGPT or Claude?',
      answer:
        'Be specific: say who the AI should act as, what the exact task is, the tone you want and the format of the answer. Add constraints such as length or output type. The builder lays these parts out under clear headings, which tends to give more consistent replies.',
    },
    {
      question: 'Can I use the generated prompt with ChatGPT, Gemini and Claude?',
      answer:
        'Yes. The output is plain text, so copy it and paste it into any chat assistant. It is not tied to one model, though different assistants may respond a little differently to the same prompt, so adjust the wording if the first reply is off target.',
    },
    {
      question: 'What should I put in the constraints field?',
      answer:
        'Add practical rules for the answer, for example a maximum of 3 paragraphs, return only JSON, format as a markdown list, or avoid jargon. The tool adds your constraint to its built-in rules, which ask for a direct response without filler or closing pleasantries.',
    },
    {
      question: 'Can I use a role that is not in the list?',
      answer:
        'Yes. Choose Custom Role and type any role, such as UX Designer or Financial Advisor. The prompt will start by telling the AI to act as that role. A precise role helps, but it does not give the AI qualifications or guarantee that its facts are correct.',
    },
    {
      question: 'Does the prompt builder use AI to write my prompt?',
      answer:
        'No. It is a template that inserts your role, task, tone and constraints into a fixed structure, so the same inputs always produce the same prompt. That keeps it fast, free and private, but it will not rewrite or improve your task description for you.',
    },
  ],

  'email-writer': [
    {
      question: 'How do I write a professional email quickly?',
      answer:
        'Enter the recipient name, choose a purpose such as follow-up, meeting request, status update or apology, add a few key points and pick a tone. The tool builds a subject line and email body you can copy and edit before sending.',
    },
    {
      question: 'Does this email writer use ChatGPT or another AI service?',
      answer:
        'No. It fills ready-made templates with your details in your browser, so the wording is predictable and your notes are not sent anywhere. Read and personalise the draft, since a template cannot know the details of your situation.',
    },
    {
      question: 'What kinds of emails can I generate?',
      answer:
        'The built-in purposes are follow-up, request a meeting, status update and apology or delay notification. There is also a custom purpose option that produces a general email with your topic in the subject. Tones include professional, casual, urgent and friendly.',
    },
    {
      question: 'How do I write a follow-up email that gets a reply?',
      answer:
        'Keep it short, refer to the earlier conversation, and make one clear request with a suggested time frame. List your key points as bullets in the tool and it adds them to the message. Then edit the placeholder at the end and replace it with your name.',
    },
    {
      question: 'Why does my email draft contain text in square brackets?',
      answer:
        'Square brackets such as [Your Name] or [Insert point 1 here] are placeholders for details the tool does not know. Fill in your name and key points before copying, or replace them manually in your email app so nothing incomplete is sent.',
    },
    {
      question: 'How do I copy the email into Gmail or Outlook?',
      answer:
        'Use the Copy Full Email button, which copies the subject line followed by the body. Paste it into a new message, move the subject line into the subject field, and review the text before sending. Nothing is sent from this page.',
    },
  ],

  'resume-builder': [
    {
      question: 'How do I make an ATS-friendly resume?',
      answer:
        'Pick the ATS template, which uses a single column, plain headings and no graphics, and list standard sections such as Summary, Experience, Education and Skills. Use normal fonts and simple bullet points, and include keywords from the job description where they honestly apply.',
    },
    {
      question: 'How do I download my resume as a PDF?',
      answer:
        'Click Print PDF, and in your browser print dialog choose Save as PDF as the destination. The page is set to A4 with margins. The exact dialog varies by browser, so switch off headers and footers there if you do not want a date or address printed on the page.',
    },
    {
      question: 'Which resume template should I choose?',
      answer:
        'There are several templates, including Classic, Executive, Serif, Creative, Corporate and a high-compliance ATS layout. Choose ATS when applying through online portals, and use the designed ones when sending a PDF directly to a person. Either way, keep the design simple and readable.',
    },
    {
      question: 'Are my resume details saved or uploaded?',
      answer:
        'The resume is built entirely in your browser and is not uploaded. It also does not appear to be stored between visits, so copy the Markdown version or save your PDF before closing the tab. Do not rely on the page to keep your draft.',
    },
    {
      question: 'How long should a resume be, and what should it include?',
      answer:
        'One page is the usual guideline for early or mid-career candidates, and two pages can suit longer careers. Include contact details, a short summary, achievements with results or numbers where possible, education and relevant skills. Skip photos and personal details unless your country expects them.',
    },
    {
      question: 'How do I format bullet points in the work experience section?',
      answer:
        'Write each role as Job Title | Company (Period), then start each achievement on a new line with a dash, using a strong action verb and a result if you have one. The builder shows these as a list in the preview and Markdown copy.',
    },
  ],

  'cover-letter': [
    {
      question: 'How do I write a cover letter quickly?',
      answer:
        'Enter your name, the job title and company, list two or three achievements and choose a tone. The tool assembles a full letter with greeting, introduction, achievements and closing. Copy it, then edit it so it speaks to the specific role and company.',
    },
    {
      question: 'Is this cover letter generator powered by AI?',
      answer:
        'No. It uses fixed templates for each tone and inserts your details, so it does not call ChatGPT or any cloud AI, and your information stays in your browser. You will get a solid structure, but you should personalise it with real detail about the company.',
    },
    {
      question: 'What tone should I use in a cover letter?',
      answer:
        'The tool offers Professional, Confident, Casual and Creative. Choose Professional for corporate, legal or finance roles, Confident for results-driven positions, and Casual or Creative for startups and design roles. When unsure, choose a professional tone.',
    },
    {
      question: 'How long should a cover letter be?',
      answer:
        'Aim for about half a page to one page, roughly 250 to 400 words. Recruiters often skim, so lead with why you fit the role and back it up with two or three concrete achievements, which are the section this tool asks for.',
    },
    {
      question: 'What should I put in the achievements box?',
      answer:
        'List short results, one per line, such as improved page speed and raised conversions by 20 percent. Numbers make claims believable. The tool turns each line into a bullet in the letter, and adds a dash if you leave it out.',
    },
    {
      question: 'How do I save or send the letter I generated?',
      answer:
        'Use Copy Letter, paste it into Word, Google Docs or your email, and format it there. The page has no PDF download, so export from your word processor. Replace any placeholder text before you send it.',
    },
  ],

  'html-to-pdf': [
    {
      question: 'How do I convert HTML to PDF for free?',
      answer:
        'Paste your HTML and CSS into the editors, check the live preview, then click Print / Save as PDF. In the print dialog that opens, choose Save as PDF as the destination. The conversion uses your browser, so the code is not uploaded to a server.',
    },
    {
      question: 'Why does the tool open a print dialog instead of downloading a PDF directly?',
      answer:
        'It uses your browser built-in print engine, which renders HTML and CSS accurately and keeps text selectable. The trade-off is that you finish by choosing Save as PDF in the dialog, and small differences in the output can occur between browsers.',
    },
    {
      question: 'How do I set the page size and margins of the PDF?',
      answer:
        'Add CSS in the CSS editor, for example @page { size: A4; margin: 20mm; }. Browsers honour this in the print dialog, though you may need to set the paper size and margins there too. Use a print media query to hide elements you do not want in the PDF.',
    },
    {
      question: 'Why are my background colors or images missing from the PDF?',
      answer:
        'Browsers often skip backgrounds when printing to save ink. Enable the Background graphics option in the print dialog, or add print-color-adjust: exact in your CSS. Images must be reachable by the browser, so relative file paths on your computer will not load.',
    },
    {
      question: 'Can I include external CSS, fonts or images?',
      answer:
        'You can write CSS directly in the CSS editor, and public https image or font URLs may load if the host allows it. The preview runs in a sandbox, so do not count on scripts running there. Inline styles and embedded data URIs are the most reliable choices.',
    },
    {
      question: 'How do I stop text being cut across pages?',
      answer:
        'Use CSS page-break rules such as break-inside: avoid on cards, tables rows and images, and break-before: page where you want a new page to start. Support varies slightly by browser, so check the preview and the print dialog before saving.',
    },
  ],

  'image-to-pdf': [
    {
      question: 'How do I convert JPG or PNG images to a PDF?',
      answer:
        'Add your images, arrange them in the order you want, choose page size, orientation and margin, then click the button to open the print dialog and select Save as PDF. Each image becomes a page. The images are handled in your browser and are not uploaded.',
    },
    {
      question: 'How do I combine multiple images into one PDF?',
      answer:
        'Select several images at once, or add more later. Use the up and down arrows to reorder them and the remove button to delete any, and all of them go into a single PDF with one image per page. JPG, PNG and WebP are supported.',
    },
    {
      question: 'What is the difference between A4 and Letter page size?',
      answer:
        'A4 is 210 by 297 mm and is the standard in most countries, while US Letter is 8.5 by 11 inches and is used in the United States and Canada. Choose the one your printer or recipient expects. Images are scaled to fit inside the page without being cropped.',
    },
    {
      question: 'Why does my PDF have white borders around the images?',
      answer:
        'Images are fitted inside the page without distortion, so a picture with a different shape from the paper leaves blank space. Set the margin to None for the widest image, and choose the orientation that matches your images, such as landscape for wide photos.',
    },
    {
      question: 'How do I keep the PDF file size small?',
      answer:
        'The size mostly depends on the source images, so shrink or compress large photos first with the image compressor or resizer. Phone photos of several megabytes each can make a heavy PDF. The exact file size can also depend on your browser print engine.',
    },
    {
      question: 'Do I need to install anything to save the PDF?',
      answer:
        'No. The tool uses the print dialog built into your browser, where you choose Save as PDF as the destination. Turn off headers and footers in the dialog if you do not want extra text like the page address or date on each page.',
    },
  ],

  'markdown-to-pdf': [
    {
      question: 'How do I convert a Markdown file to PDF?',
      answer:
        'Paste or type your Markdown, check the preview, choose page size and orientation, and click the print button. In the browser print dialog, select Save as PDF. Rendering happens on your device, so your notes are not uploaded anywhere.',
    },
    {
      question: 'Which Markdown features are supported?',
      answer:
        'The tool renders GitHub-flavoured Markdown, including headings, bold and italic, lists, nested lists, task lists, tables, fenced code blocks, links, images and strikethrough. The HTML output is sanitised for safety, so scripts and unsafe elements are removed.',
    },
    {
      question: 'Can I make a PDF in Letter size or landscape?',
      answer:
        'Yes. Switch the page size between A4 and Letter and the orientation between portrait and landscape before printing. Landscape is useful for wide tables. Page margins are fixed at 20 mm in the export.',
    },
    {
      question: 'Why does my Markdown table or code block look different in the PDF?',
      answer:
        'Tables are set to full width with automatic column sizing and code blocks wrap long lines, so very wide content may look different from your editor. Check the preview first and consider landscape orientation for wide tables.',
    },
    {
      question: 'Does the PDF have selectable text and working links?',
      answer:
        'Generally yes. Because the PDF is created by your browser print engine rather than a screenshot, text is normally selectable and searchable, and links are usually clickable. The exact behaviour can vary slightly between browsers and PDF viewers.',
    },
    {
      question: 'Markdown to PDF vs HTML to PDF: which one should I use?',
      answer:
        'Use Markdown to PDF for notes, documentation and reports written in Markdown, where the tool applies clean default styling. Use HTML to PDF when you need full control of the layout with your own HTML and CSS.',
    },
  ],

  'pdf-metadata': [
    {
      question: 'What is PDF metadata?',
      answer:
        'PDF metadata is descriptive information stored inside a PDF, such as title, author, subject, keywords, creator application and creation and modification dates. It appears in the Document Properties of PDF viewers and can be used by search tools and screen readers.',
    },
    {
      question: 'Does this page actually edit or compress my PDF?',
      answer:
        'Not yet. The page currently offers a preview of the workflow with title, author, subject, keyword and optimisation settings, but it does not rewrite your file, so nothing you enter is saved into a PDF. For real page-level changes use the merge, split and rotate tools.',
    },
    {
      question: 'How can I see or change a PDF title and author?',
      answer:
        'Most desktop PDF viewers show them under File then Properties or Document Properties. Editing usually needs an editor such as Adobe Acrobat, or a command-line tool like exiftool, and changes are saved by writing a new copy of the file.',
    },
    {
      question: 'How do I remove author name and other hidden data from a PDF?',
      answer:
        'Open the PDF in an editor that supports Sanitize or Remove Hidden Information, or clear the properties fields and save a new copy. Also check the original document, since the author name may live in the Word or design file too.',
    },
    {
      question: 'Does PDF metadata affect SEO?',
      answer:
        'A little. Search engines can use the PDF title property as the title in results when it is set, so a descriptive title is better than something like Document1.pdf. Metadata is a minor factor compared with the actual content and links to the file.',
    },
    {
      question: 'How do I reduce the size of a PDF file?',
      answer:
        'Large images are the usual cause, so downsample or compress them in a PDF editor or before you create the PDF. Removing unused pages also helps. The split tool on this site can extract only the pages you need into a smaller new PDF.',
    },
  ],

  'image-to-base64': [
    {
      question: 'How do I convert an image to Base64?',
      answer:
        'Drop or select your image and the tool immediately shows its Base64 data URI. Use the tabs to switch between Data URI, raw Base64, a CSS background rule and an HTML img tag, then copy the one you need. Nothing leaves your browser.',
    },
    {
      question: 'What is a Base64 data URI and how do I use it in HTML or CSS?',
      answer:
        'A data URI embeds the image itself in text, starting with data:image/png;base64, so it needs no separate file. Paste it into an img src attribute or a CSS url() value. The CSS and HTML tabs give you ready-to-paste snippets.',
    },
    {
      question: 'Why is the Base64 text bigger than my image file?',
      answer:
        'Base64 represents binary data using text characters, which increases the size by about 33 percent. It also cannot be cached separately from the page. The tool shows the original size next to the text size so you can compare.',
    },
    {
      question: 'When should I use Base64 images and when should I avoid them?',
      answer:
        'Base64 suits tiny icons, placeholders and emails or single-file demos where one less request helps. Avoid it for large photos because it inflates page weight and slows rendering. The tool warns you when the encoded output gets large.',
    },
    {
      question: 'What is the difference between the Data URI and the raw Base64 output?',
      answer:
        'The Data URI includes the prefix data:image/type;base64, and works directly in src and url(). The raw Base64 is just the encoded characters with no prefix, which is what many APIs and JSON fields expect. Add the prefix yourself if a browser needs it.',
    },
    {
      question: 'Can I convert Base64 back to an image?',
      answer:
        'This tool only goes from image to Base64. To reverse it, paste the full data URI into your browser address bar to view the image and save it, or use a Base64 decoder that outputs a file.',
    },
  ],

  'image-flip-rotate': [
    {
      question: 'How do I rotate an image online?',
      answer:
        'Upload the image, click 90 degrees left or right, or drag the angle slider for any angle from minus 180 to 180 degrees, then pick a format and download. Rotation is processed on your device, so the image is never uploaded.',
    },
    {
      question: 'How do I flip or mirror an image horizontally or vertically?',
      answer:
        'Click Flip horizontal to mirror the image left to right, or Flip vertical to turn it upside down along the horizontal axis. Each button toggles on and off, and you can combine flipping with rotation before downloading.',
    },
    {
      question: 'Why do I get empty corners when I rotate by an angle like 30 degrees?',
      answer:
        'A tilted image no longer fits its old rectangle, so the canvas grows to hold the whole picture and the corners are left empty. They are transparent in PNG or WebP output and filled white if you export as JPEG.',
    },
    {
      question: 'Which export format keeps the best quality after rotating?',
      answer:
        'PNG keeps every pixel and preserves transparency, so it is the safest choice. WebP and JPEG are lossy and produce smaller files, and the tool exports them at a fixed high quality of roughly 92 percent. Choose JPEG for photos where size matters.',
    },
    {
      question: 'Why is my photo sideways after uploading, and how do I fix it?',
      answer:
        'Some phone photos rely on orientation data instead of rotated pixels, and viewers can disagree about it. Preview it here, then use the 90 degree buttons until it looks right and download a new copy that has the rotation built into the pixels.',
    },
    {
      question: 'Does rotating an image reduce its quality?',
      answer:
        'Rotating by exact 90 degree steps keeps the sharpness, apart from re-encoding if you save as JPEG or WebP. Rotating by other angles resamples pixels and can soften edges slightly. Export as PNG to avoid additional compression loss.',
    },
  ],

  'image-filters': [
    {
      question: 'How do I make a photo black and white online?',
      answer:
        'Upload the photo and click the Black and white preset, or drag the grayscale slider to 100 percent. Adjust contrast to taste, then choose a format and download. The edit happens in your browser and the original file is not modified.',
    },
    {
      question: 'Which adjustments does the image filter tool offer?',
      answer:
        'You can adjust brightness, contrast, saturation, grayscale, sepia, blur, hue rotation and invert, and start from presets such as Black and white, Vintage, Vivid, Cool and Faded. The preview updates live as you move each slider.',
    },
    {
      question: 'How do I add a sepia or vintage effect to a picture?',
      answer:
        'Choose the Vintage preset, or raise the sepia slider and lower contrast slightly while adding a little brightness. Sepia gives the warm brown tone associated with old photographs. Reset returns every slider to its default.',
    },
    {
      question: 'Are the filters applied to the downloaded file, not just the preview?',
      answer:
        'Yes. The download applies the same settings at the image original resolution. Some browsers, notably Safari, use a slower fallback that may not render blur or hue changes identically, so open the exported file to check the result.',
    },
    {
      question: 'What format should I export filtered images in?',
      answer:
        'Use PNG for full quality, JPEG for smaller photo files or WebP for the best size on websites. The tool saves JPEG and WebP at a fixed high quality. If you export JPEG, any transparent areas are filled white.',
    },
    {
      question: 'Can I undo a filter or go back to the original?',
      answer:
        'Yes. Click the Original preset or the reset button to set every slider back to its default. Your source file is never overwritten, because the tool downloads a separate edited copy with the word filtered added to the file name.',
    },
  ],

  'pdf-merge': [
    {
      question: 'How do I merge PDF files for free without uploading them?',
      answer:
        'Add two or more PDFs, put them in order with the arrow buttons and click Merge. The combined merged.pdf is created and downloaded inside your browser, so your documents never leave your device, and no sign-up or watermark is involved.',
    },
    {
      question: 'How do I change the order of pages when merging PDFs?',
      answer:
        'Each file appears in a list with move up and move down buttons, and the merged PDF follows that order with all pages of each file kept together. To interleave individual pages, split the files first and merge the parts in the order you need.',
    },
    {
      question: 'Why does merging fail with a password-protected PDF?',
      answer:
        'The tool cannot open encrypted PDFs and shows a message that the file is password-protected. Remove the password in a PDF viewer or editor you trust, save an unprotected copy and add that copy instead. A damaged file produces a separate error.',
    },
    {
      question: 'Is there a limit on how many PDFs or pages I can merge?',
      answer:
        'The tool sets no page limit, but each file is limited to 50 MB and the work uses your device memory, so very large batches can be slow on phones. If the browser struggles, merge in smaller groups and then merge the results.',
    },
    {
      question: 'Will merging PDFs reduce the quality or change the layout?',
      answer:
        'No. Pages are copied as they are into the new document, so text stays selectable and images are not recompressed. Features that belong to a whole document, such as bookmarks or form fields, may not be carried across.',
    },
    {
      question: 'How do I merge PDFs on a phone?',
      answer:
        'Open this page in your mobile browser, add each PDF from your files app and tap Merge. It works on modern phones, but big files can be slow depending on device memory. The result is downloaded to your usual downloads folder.',
    },
  ],

  'pdf-split': [
    {
      question: 'How do I extract specific pages from a PDF?',
      answer:
        'Upload the PDF, stay on the Extract pages tab, enter the pages you want such as 1-3, 5, 8- and click Extract to new PDF. A new PDF containing only those pages is downloaded. The original file is left unchanged.',
    },
    {
      question: 'How do I split a PDF into separate pages or equal parts?',
      answer:
        'Switch to the split tab and set how many pages each part should have. Setting it to 1 gives one file per page. The tool lists each part with its own Download button, so you download the pieces one by one rather than as a single ZIP.',
    },
    {
      question: 'What page range format does the tool accept?',
      answer:
        'Separate pages or ranges with commas. Use 5 for a single page, 1-3 for a range and 8- to mean page 8 to the end, for example 1-3, 5, 8-. The page count of your document is shown so you can avoid numbers that are out of range.',
    },
    {
      question: 'Can I split a password-protected PDF?',
      answer:
        'No. The tool cannot open encrypted files and will say the PDF is password-protected. Remove the password with a viewer or editor that you trust, save an unprotected copy, and then upload that copy here.',
    },
    {
      question: 'Are my PDFs uploaded to a server when I split them?',
      answer:
        'No. The file is read and rewritten by code running in your browser, so it never leaves your device and the tool keeps working without a connection once the page has loaded. Files above 50 MB are refused.',
    },
    {
      question: 'Split vs extract: what is the difference?',
      answer:
        'Extract creates one new PDF from the pages you choose, which suits taking out a chapter or a signature page. Split cuts the whole document into consecutive parts of a set size. Both keep the original page content unchanged.',
    },
  ],

  'pdf-rotate': [
    {
      question: 'How do I rotate a PDF and save it permanently?',
      answer:
        'Upload the PDF, choose 90 degrees left, 90 degrees right or 180 degrees, and click Rotate and download. The new file has the rotation saved in it, so it opens the right way up in any viewer. The original file is not changed.',
    },
    {
      question: 'How do I rotate only some pages of a PDF?',
      answer:
        'Enter the pages in the optional Pages field, for example 2, 4-6, and only those pages are rotated. Leave the field empty to rotate every page. The tool does not show page thumbnails, so check the page numbers in a viewer first.',
    },
    {
      question: 'Why are my PDF pages upside down or sideways?',
      answer:
        'Scans and phone camera apps often produce pages with the wrong orientation. Rotate the affected pages by 90 or 180 degrees here and download a corrected copy. If the pages are already rotated in a viewer, that rotation is not saved unless you export it.',
    },
    {
      question: 'Does rotating a PDF change its quality or text?',
      answer:
        'No. The tool changes only the rotation setting of each page, so text stays selectable and images are not recompressed. It can be applied repeatedly, and the angles add up, for example two 90 degree turns give 180.',
    },
    {
      question: 'Can I rotate a password-protected PDF?',
      answer:
        'No. Encrypted files cannot be opened by this tool, and it will show a message asking you to remove the password first. Save an unprotected copy with a PDF viewer or editor that you trust and upload that.',
    },
    {
      question: 'Are my PDF files uploaded when I rotate them?',
      answer:
        'No. The rotation is applied by code running in your browser and the finished file is created locally, so your document never reaches a server. Files above 50 MB are refused.',
    },
  ],

  'text-summarizer': [
    {
      question: 'How do I summarize a long article or text for free?',
      answer:
        'Paste the text into the box, then use the slider to choose how many sentences you want, from 1 to 10. The summary appears straight away and shows what percentage of the original it covers. Copy it with one click. Nothing is uploaded.',
    },
    {
      question: 'Does this summarizer use AI like ChatGPT?',
      answer:
        'No. It is an extractive summariser that scores sentences by how frequently their important words appear in the text, then keeps the top-scoring ones in their original order. No AI model or online service is used, so it never rewrites or paraphrases your text.',
    },
    {
      question: 'What is extractive vs abstractive summarization?',
      answer:
        'Extractive summarization selects existing sentences from the source, so every line is a quote and cannot add facts that were not there. Abstractive summarization, used by large language models, writes new sentences and can paraphrase, but can also introduce errors.',
    },
    {
      question: 'Why is my summary choppy or missing context?',
      answer:
        'Because it picks separate sentences, links such as however or pronouns like this may lose their meaning. Try a higher sentence count, and use the summary as a guide to the key points rather than polished prose. Rewrite by hand for publishing.',
    },
    {
      question: 'Does the summarizer work in languages other than English?',
      answer:
        'It is designed for English. Its word matching looks for Latin letters and uses an English stop-word list, so text in other scripts may not summarise well or may return nothing. Other Latin-script languages can work partly but are not tuned.',
    },
    {
      question: 'How long does the text need to be?',
      answer:
        'It needs at least a few complete sentences. If your text has fewer sentences than the number you request, the tool simply returns them all. Very short fragments of 15 characters or fewer are ignored, and it works best on articles and reports of several paragraphs.',
    },
  ],

  'keyword-extractor': [
    {
      question: 'How do I find the most frequent keywords in a text?',
      answer:
        'Paste your text and the tool lists the most-used words with their count and density, ranked from most to least frequent. Use the slider to show 5 to 50 keywords and click Copy list to copy them as comma-separated text.',
    },
    {
      question: 'What is keyword density and what is a good percentage?',
      answer:
        'Keyword density is how often a word appears as a share of all counted words. There is no official ideal, and search engines do not reward hitting a target. A word repeated far more than natural writing would suggests is a sign of stuffing.',
    },
    {
      question: 'Are common words like the and and counted?',
      answer:
        'No. The tool ignores a built-in list of English stop words such as the, and, with and would, plus any word shorter than three letters. That keeps the results focused on meaningful terms. Density is calculated using the remaining words only.',
    },
    {
      question: 'Can I use this to check my blog post for SEO?',
      answer:
        'Yes, as a quick check. Paste the post and see whether your main topic word appears among the top results. It counts single words, not phrases, and does not judge search intent or competition, so treat it as a helpful gut check rather than a full SEO audit.',
    },
    {
      question: 'Does the keyword extractor support other languages?',
      answer:
        'It is built for English. It matches words made of the letters a to z and uses an English stop-word list, so accented characters and non-Latin scripts are split or ignored. For other languages results may be incomplete.',
    },
    {
      question: 'Does it find keyword phrases or only single words?',
      answer:
        'Only single words. Each word is counted on its own, in lowercase, so Apple and apple are grouped together. If you need phrases, look at your top single words and check how they appear together in your copy.',
    },
  ],
};
