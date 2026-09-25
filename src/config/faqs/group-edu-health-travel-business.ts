import type { FaqMap } from './types';

export const FAQS: FaqMap = {
  'scientific-calculator': [
    {
      question: 'What functions does the scientific calculator support?',
      answer:
        'It supports the four basic operations, powers (x^y), square root, sin, cos, tan, base-10 log, natural log (ln), factorial, the constants pi and e, and brackets. You can type with the keyboard or use the on-screen keys, and unclosed brackets are closed automatically when you calculate.',
    },
    {
      question: 'How do I switch between degrees and radians on a scientific calculator?',
      answer:
        'Use the DEG and RAD buttons above the keypad; the display shows which mode is active. Degrees split a full circle into 360, radians into 2 times pi (about 6.283). In RAD mode, sin(pi/2) gives 1. Always check the mode before using sin, cos or tan, because the same number gives very different answers in each.',
    },
    {
      question: 'What is the difference between log and ln?',
      answer:
        'log is the base-10 logarithm and ln is the natural logarithm, which uses base e (about 2.71828). For example, log(1000) = 3 because 10 to the power 3 is 1000, while ln(e) = 1. Use log for powers of ten and ln for growth and decay problems.',
    },
    {
      question: 'How do I calculate a factorial on this calculator?',
      answer:
        'Press the fact key and enter a whole number, for example fact(5) = 5 x 4 x 3 x 2 x 1 = 120. Factorial only works for whole numbers of 0 or more, and 0! is 1. Values above 170 exceed the largest number a browser can store, so the result shows as Infinity.',
    },
    {
      question: 'Does the scientific calculator follow the order of operations?',
      answer:
        'Yes. Expressions are evaluated with standard precedence: brackets first, then powers, then multiplication and division, then addition and subtraction. For example, 2 + 3 x 4 = 14, not 20. Add brackets, such as (2 + 3) x 4 = 20, whenever you want a different order.',
    },
    {
      question: 'Does the calculator keep a history of my calculations?',
      answer:
        'Yes. Your last 20 calculations are listed beside the keypad with their DEG or RAD mode, and you can click one to load it again. The history is saved only in your own browser storage and can be cleared with the clear history button, or by clearing your browser data.',
    },
  ],

  'age-calculator': [
    {
      question: 'How do I calculate my exact age in years, months and days?',
      answer:
        'Enter your date of birth and the tool subtracts it from today, borrowing days and months where needed. For example, someone born on 15 August 2000 is 26 years, 1 month and 11 days old on 26 September 2026. The tool also shows total days, weeks, months and hours lived.',
    },
    {
      question: 'Can I calculate age on a past or future date instead of today?',
      answer:
        'Yes. Change the reference date field to any date on or after the date of birth, such as an exam cut-off, a job application deadline or a school admission date. The birth date cannot be later than the reference date, or the tool shows a validation message.',
    },
    {
      question: 'How does the age calculator count months and days?',
      answer:
        'It counts whole calendar years first, then whole months, then leftover days. If the reference day of the month is earlier than the birth day, it borrows one month and adds the number of days in the month before the reference date. Check your form or rulebook if it defines age differently.',
    },
    {
      question: 'How do I find how many days until my next birthday?',
      answer:
        'The result panel shows a countdown in days to your next birthday and the weekday it falls on, based on the reference date. If the reference date is your birthday, it is marked as today. Birthdays are matched by month and day, so the year of birth does not affect the countdown.',
    },
    {
      question: 'How many days old am I, and how is that calculated?',
      answer:
        'Total days lived is the number of whole days between your date of birth and the reference date, with both set to midnight. Weeks are that figure divided by 7 and rounded down. Hours are total days times 24, so they count complete days only, not the time of day you were born.',
    },
    {
      question: 'What is the difference between age in years and exact age?',
      answer:
        'Age in years is only the completed years, such as 26. Exact age adds the extra months and days, such as 26 years, 1 month, 11 days. Exact age matters for age-limit eligibility rules, where a cut-off date decides whether you qualify. Check the official rule for the exact reference date.',
    },
  ],

  'percentage-calculator': [
    {
      question: 'How do I calculate what percentage one number is of another?',
      answer:
        'Divide the part by the whole and multiply by 100. For example, 25 out of 200 is 25 / 200 x 100 = 12.5%. In the tool, use the "X is what % of Y" card, enter 25 and 200, and it shows 12.5% instantly. Y cannot be zero.',
    },
    {
      question: 'How do I find X% of a number?',
      answer:
        'Multiply the number by the percentage divided by 100. For example, 10% of 200 is 200 x 10 / 100 = 20. The "What is X% of Y" card does this as you type, and works with decimals such as 7.5% of 480, which is 36.',
    },
    {
      question: 'How is percentage increase or decrease calculated?',
      answer:
        'Subtract the old value from the new one, divide by the old value, then multiply by 100. Going from 150 to 180 gives (180 - 150) / 150 x 100 = 20% increase. A negative result is shown as a decrease. The starting value cannot be zero.',
    },
    {
      question: 'How do I add or subtract a percentage from a number?',
      answer:
        'To add a percentage, multiply the number by (1 + percentage / 100); to subtract, multiply by (1 - percentage / 100). Adding 10% to 200 gives 220, and subtracting 10% gives 180. This is the quickest way to work out a price after a markup or a discount.',
    },
    {
      question: 'Why is a 50% increase followed by a 50% decrease not back to the start?',
      answer:
        'Because each percentage applies to a different base. Start with 100, add 50% to reach 150, then subtract 50% of 150 (which is 75) to end at 75, not 100. To undo a 50% rise you need a 33.3% fall. Percentage changes are not symmetrical.',
    },
    {
      question: 'What is the difference between percentage points and percent?',
      answer:
        'A percentage point is the plain difference between two percentages, while percent change is relative to the starting value. If a rate rises from 4% to 5%, that is 1 percentage point, but a 25% increase (1 / 4 x 100). This calculator computes percent change between two values.',
    },
  ],

  'cgpa-calculator': [
    {
      question: 'How is CGPA converted to percentage?',
      answer:
        'This calculator uses Percentage = CGPA x multiplier, and the default multiplier for the 10-point scale is 9.5, the CBSE-style conversion. A CGPA of 9.0 gives 9.0 x 9.5 = 85.5%. Universities differ, so change the multiplier if yours states another factor, such as 10 or a formula in your university rules.',
    },
    {
      question: 'How do I calculate CGPA from semester grades?',
      answer:
        'Multiply each course grade point by its credits, add them all up, and divide by the total credits across all semesters. For example, credits 4, 3, 3 with grade points 9, 8, 10 give (36 + 24 + 30) / 10 = 9.0. The tool also shows the SGPA of each semester and the overall CGPA.',
    },
    {
      question: 'What is the difference between SGPA and CGPA?',
      answer:
        'SGPA is the grade point average for one semester, while CGPA covers all semesters together, weighted by credits. CGPA is not the plain average of your SGPAs unless every semester has the same total credits. This tool computes both from the courses you enter.',
    },
    {
      question: 'Is the 9.5 multiplier the same for every university?',
      answer:
        'No. 9.5 is a widely used convention, but universities and boards set their own rules, and some use CGPA x 10 or a different formula. Check your official handbook or ask your exam office, then type that number into the multiplier box. The tool follows whatever multiplier you enter.',
    },
    {
      question: 'Can I use the CGPA calculator for a 4.0 scale?',
      answer:
        'Yes. Switch to the 4.0 scale and the grade options change to values such as A (4.0), A- (3.7) and B+ (3.3). The default percentage multiplier then becomes 25, which maps 4.0 to 100%. That is a rough approximation, not an official conversion, so confirm with your institution.',
    },
    {
      question: 'How many semesters and courses can I add?',
      answer:
        'You can add as many semesters as you need, each with as many courses as you like, and remove any of them. Every course has its own credits and grade, so credit-weighted results stay correct even when subjects carry different credits. Results update live as you change values.',
    },
  ],

  'gpa-calculator': [
    {
      question: 'How do I calculate GPA from letter grades and credit hours?',
      answer:
        'Convert each letter grade to grade points, multiply by its credit hours, add these up, then divide by total credits. For example, A (4.0) x 3, B+ (3.3) x 4 and A- (3.7) x 3 give (12 + 13.2 + 11.1) / 10 = 3.63.',
    },
    {
      question: 'What grade point values does the GPA calculator use?',
      answer:
        'On the 4.0 scale: A+ and A are 4.0, A- 3.7, B+ 3.3, B 3.0, B- 2.7, C+ 2.3, C 2.0, C- 1.7, D+ 1.3, D 1.0 and F 0.0. A 10-point option (O = 10 down to F = 0) is also available. Some schools weight A+ differently, so check your own policy.',
    },
    {
      question: 'What is the difference between GPA and CGPA?',
      answer:
        'GPA is the average grade points for a set of courses, usually one semester or term. CGPA is the cumulative average across all terms, weighted by credits. This tool gives a single GPA for the courses listed, so for cumulative results add every course, or use the CGPA calculator.',
    },
    {
      question: 'Do credit hours change how much a grade affects my GPA?',
      answer:
        'Yes. A grade in a 4-credit course counts four times as much as the same grade in a 1-credit course. For example, an F in a 4-credit class with an A in a 3-credit class gives 12 / 7 = 1.71, not the simple average of 2.0. That is why the tool asks for credits.',
    },
    {
      question: 'What is considered a good GPA?',
      answer:
        'It depends on the school, course and goal. On a 4.0 scale, 3.0 is often treated as a solid B average, and 3.5 or above is usually seen as strong, but scholarship, graduate and employer cut-offs vary. Check the specific requirement of the programme you are targeting.',
    },
    {
      question: 'Are repeated courses or pass/fail grades handled?',
      answer:
        'No special policy is built in. The tool averages exactly the rows you enter. If your school replaces a repeated grade, remove the old course row; if a pass/fail course is excluded from GPA, leave it out. Your registrar decides how those grades officially count.',
    },
  ],

  'unit-converter': [
    {
      question: 'Which units can I convert with this unit converter?',
      answer:
        'It covers four categories: length (m, km, cm, mm, mi, yd, ft, in), weight (kg, g, mg, lbs, oz, stone), temperature (Celsius, Fahrenheit, Kelvin) and area (m2, km2, ft2, yd2, acre, hectare). Other categories such as volume, speed or currency are not included.',
    },
    {
      question: 'How do I convert Celsius to Fahrenheit?',
      answer:
        'Multiply the Celsius value by 9/5 and add 32. So 100 degrees C is 100 x 9/5 + 32 = 212 degrees F, and 37 degrees C is 98.6 degrees F. Pick Temperature, then Celsius and Fahrenheit, and type the value. Kelvin is Celsius plus 273.15.',
    },
    {
      question: 'How many feet are in a metre, and how many kilometres in a mile?',
      answer:
        'One metre is about 3.28084 feet, and one mile is about 1.609 kilometres (1609.34 metres). In the tool, choose Length, pick the from and to units, and enter your value. All conversions run instantly in your browser as you type.',
    },
    {
      question: 'How do I convert kg to pounds?',
      answer:
        'Multiply kilograms by 2.20462 to get pounds. For example, 70 kg is about 154.3 lbs. To go back, divide pounds by 2.20462. Choose Weight, set kg as the from unit and lbs as the to unit, then enter the number.',
    },
    {
      question: 'How accurate are the conversions?',
      answer:
        'Conversion factors are rounded to about five or six significant digits, for example 1 m = 3.28084 ft. That is precise enough for everyday, cooking, travel and study use, but not for engineering, surveying or scientific work that needs exact defined values.',
    },
    {
      question: 'How do I convert acres and hectares to square metres?',
      answer:
        'One hectare is exactly 10,000 square metres, and one acre is about 4,046.86 square metres. So one hectare is about 2.471 acres. Choose Area, then select acres or hectares as the from unit and square metres as the to unit.',
    },
  ],

  'bmi-calculator': [
    {
      question: 'How is BMI calculated?',
      answer:
        'BMI is weight in kilograms divided by height in metres squared. For example, 70 kg at 1.75 m gives 70 / (1.75 x 1.75) = 22.9. The tool accepts kg and cm, or pounds and feet and inches, and converts imperial units before calculating.',
    },
    {
      question: 'What is a healthy BMI range?',
      answer:
        'This tool uses the standard adult categories: under 18.5 underweight, 18.5 to 24.9 normal, 25 to 29.9 overweight, and 30 or above obese. It also shows the weight range that matches BMI 18.5 to 24.9 for your height, for example about 53.5 to 72.0 kg at 170 cm.',
    },
    {
      question: 'Is BMI accurate for athletes and muscular people?',
      answer:
        'Not always. BMI uses only height and weight, so it cannot tell muscle from fat, and a muscular person can land in the overweight range with low body fat. It is a screening number, not a diagnosis. A doctor can assess body composition, waist size and other health markers.',
    },
    {
      question: 'What is the difference between BMI and body fat percentage?',
      answer:
        'BMI compares weight to height, while body fat percentage estimates how much of your weight is fat. Two people with the same BMI can have very different body fat. BMI is quicker to check; body fat percentage says more about composition but needs measurements to estimate.',
    },
    {
      question: 'Does the same BMI range apply to children and older adults?',
      answer:
        'The categories here are the standard adult ones. Children and teens are assessed against age and sex growth charts, and some guidance uses different cut-offs for older adults or certain ethnic groups. This is general information, not medical advice; ask a doctor about your own situation.',
    },
    {
      question: 'What should I do if my BMI is outside the normal range?',
      answer:
        'Treat it as a prompt for a conversation, not a verdict. A BMI below 18.5 or above 25 can be worth discussing with a doctor or registered dietitian, who can look at your overall health, diet, activity and family history. This tool gives an estimate only and is not medical advice.',
    },
  ],

  'bmr-calculator': [
    {
      question: 'What is BMR and how is it calculated?',
      answer:
        'BMR (basal metabolic rate) is the energy your body uses at complete rest. This tool uses the Mifflin-St Jeor equation: men 10 x kg + 6.25 x cm - 5 x age + 5; women 10 x kg + 6.25 x cm - 5 x age - 161. For a 25-year-old man at 70 kg and 170 cm, that is about 1,643 kcal per day.',
    },
    {
      question: 'Which BMR formula does this calculator use?',
      answer:
        'It uses Mifflin-St Jeor, not Harris-Benedict or Katch-McArdle. Mifflin-St Jeor is widely used because it is simple and needs only sex, age, weight and height. Results from other formulas can differ by a few percent, so treat all of them as estimates.',
    },
    {
      question: 'How do I get my daily calorie needs from BMR?',
      answer:
        'Multiply BMR by an activity factor: 1.2 sedentary, 1.375 lightly active, 1.55 moderately active, 1.725 very active, 1.9 extra active. The tool lists all of these. With a BMR of 1,642.5 and factor 1.55, daily needs are about 2,546 kcal.',
    },
    {
      question: 'What is the difference between BMR and TDEE?',
      answer:
        'BMR is calories burned at rest; TDEE (total daily energy expenditure) adds movement, exercise and digestion. TDEE is BMR multiplied by an activity factor, so it is always higher. The activity table in this tool shows each level, which is your estimated TDEE.',
    },
    {
      question: 'Is a BMR calculator accurate?',
      answer:
        'It is a population-based estimate, so your real value can differ by several percent depending on muscle mass, genetics, hormones and health. Use it as a starting point and adjust based on how your weight responds. It is not medical advice; see a doctor or dietitian for personal guidance.',
    },
    {
      question: 'Can I enter weight in pounds and height in feet and inches?',
      answer:
        'Yes. Switch to Imperial and enter pounds and feet plus inches; the tool converts them to kilograms and centimetres (1 lb = 0.45359237 kg, 1 in = 2.54 cm) before applying the formula. The result is the same as entering the metric equivalent.',
    },
  ],

  'calorie-calculator': [
    {
      question: 'How many calories should I eat per day to maintain my weight?',
      answer:
        'Your maintenance calories are your BMR multiplied by an activity factor from 1.2 to 1.9. For a 25-year-old man at 70 kg and 170 cm with moderate activity, BMR is about 1,643 and maintenance is about 2,546 kcal. This is an estimate, so watch your actual weight trend.',
    },
    {
      question: 'How many calories should I cut to lose weight?',
      answer:
        'The tool shows targets 250, 500 and 1,000 kcal below maintenance, described as roughly 0.25, 0.5 and 1 kg lost per week. Using 2,546 maintenance, a 500 kcal deficit is 2,046 kcal. Large deficits are not right for everyone; check with a doctor or dietitian first.',
    },
    {
      question: 'How do I gain weight with this calorie calculator?',
      answer:
        'The tool adds 250 kcal for mild gain or 500 kcal for gain above your maintenance figure, estimated at about 0.25 kg and 0.5 kg per week. With 2,546 maintenance, that gives 2,796 and 3,046 kcal. Real results vary by person, so adjust over several weeks.',
    },
    {
      question: 'Which formula does the calorie calculator use?',
      answer:
        'It calculates BMR with the Mifflin-St Jeor equation from your sex, age, weight and height, then multiplies by the activity level you pick. If you already know your BMR, you can switch to direct entry and type it in instead.',
    },
    {
      question: 'How do I choose the right activity level?',
      answer:
        'Pick based on a typical week: sedentary is little exercise (1.2), lightly active is 1 to 3 days (1.375), moderately active 3 to 5 days (1.55), very active 6 to 7 days (1.725), and extra active is very hard exercise or a physical job (1.9). Most people overestimate, so choose the lower option if unsure.',
    },
    {
      question: 'Is the 500 calorie deficit rule accurate for everyone?',
      answer:
        'It is a rough rule of thumb, not a guarantee. It assumes about 3,500 kcal per pound of body weight, which is a simplification, and the body adapts as weight drops. Use the numbers as a starting point and speak to a doctor or registered dietitian for personal advice.',
    },
  ],

  'timezone-converter': [
    {
      question: 'How do I convert IST to EST or other time zones?',
      answer:
        'Add IST and the target zone to the list and the tool shows the same moment in each, with the UTC offset. India Standard Time is UTC+5:30, so 9:00 IST is 03:30 UTC, which is 22:30 the previous day in US Eastern Standard Time (UTC-5). The tool applies the right offset automatically.',
    },
    {
      question: 'Does the time zone converter handle daylight saving time?',
      answer:
        'Yes. It uses your browser time zone database, so zones such as New York, London, Paris and Sydney switch between standard and daylight time on the selected date. India, Japan, Singapore and Dubai do not observe daylight saving, so their offsets stay the same all year.',
    },
    {
      question: 'How can I find a good meeting time across time zones?',
      answer:
        'Add every participant location, then drag the time slider for any one zone. All other zones update together, and each shows day or night, so you can spot a slot that falls inside working hours for everyone. Change the date field to check a different day.',
    },
    {
      question: 'Which time zones are available?',
      answer:
        'The tool offers 24 popular zones, including UTC, India, US Eastern, Central, Mountain, Pacific and Arizona, London, Paris, Moscow, Dubai, Singapore, Hong Kong, Jakarta, Shanghai, Tokyo, Seoul, Sydney, Auckland, Cairo, Johannesburg, Sao Paulo, Istanbul and Hawaii. You can add or remove zones.',
    },
    {
      question: 'What is the difference between UTC and GMT?',
      answer:
        'UTC is the modern global time standard, while GMT is the time zone at the 0 degree meridian used in the UK in winter. They match to within about a second for everyday use. The UK switches to British Summer Time (UTC+1) in summer, but UTC never changes.',
    },
    {
      question: 'Why does the converted time show a different date?',
      answer:
        'When zones are many hours apart, the same moment can fall on different calendar days. For example, 9:00 in India on the 10th is 22:30 on the 9th in New York in winter. Each row shows its own local date, so check it when scheduling calls or deadlines.',
    },
  ],

  'fuel-cost': [
    {
      question: 'How do I calculate the fuel cost of a trip?',
      answer:
        'Divide the distance by your vehicle mileage to get the fuel needed, then multiply by the fuel price. For 300 km at 15 km/L and a price of 96.5 per litre, that is 300 / 15 = 20 L, and 20 x 96.5 = 1,930 in total.',
    },
    {
      question: 'How do I split fuel costs between passengers?',
      answer:
        'Enter the number of people and the tool divides the total trip cost equally. Using 1,930 for the trip and 3 people gives about 643.33 each. It splits evenly and does not include tolls, parking or vehicle wear.',
    },
    {
      question: 'Does the fuel cost calculator work in miles and gallons?',
      answer:
        'Yes. Switch to Imperial to enter distance in miles, efficiency in miles per gallon (MPG) and price per gallon. The formula is the same: gallons needed = miles / MPG, then multiplied by the price per gallon. Metric mode uses km, km/L and price per litre.',
    },
    {
      question: 'Is the distance for a one-way or a round trip?',
      answer:
        'The tool calculates for whatever distance you enter and has no separate round-trip switch. For a return journey, enter the total distance both ways, or double the one-way figure yourself. The fuel needed and cost then cover the full journey.',
    },
    {
      question: 'What mileage should I enter for my car?',
      answer:
        'Use real-world figures from your own fill-ups if you can, since the company-claimed number is usually higher than what you get. Highway speeds, city traffic, air conditioning, load and tyre pressure all change it. A realistic value gives a more reliable trip estimate.',
    },
    {
      question: 'Which currency does the fuel price use?',
      answer:
        'Any. The tool does not convert currencies, so the total is in the same currency you type for the fuel price. Enter the per-litre or per-gallon price you actually pay at the pump, and the result is in that currency.',
    },
  ],

  'invoice-generator': [
    {
      question: 'How do I create an invoice and download it as PDF?',
      answer:
        'Fill in your business and client details, add line items with rate, quantity and tax percentage, then open the preview and click Print / Save PDF. In the print dialog choose Save as PDF as the destination. The invoice is built and printed in your browser using the A4 layout.',
    },
    {
      question: 'What details should an invoice include?',
      answer:
        'Typically your business name and address, the client details, a unique invoice number, the invoice and due dates, an itemised list with quantity and price, tax, the total, and payment terms. Requirements vary by country, so check the rules that apply to your business.',
    },
    {
      question: 'How does the invoice generator calculate tax and the total?',
      answer:
        'Each line amount is rate x quantity. Tax for a line is that amount times its tax percentage, and the grand total is the subtotal plus total tax. For example, one item at 1,000 x 2 with 18% tax is a 2,000 subtotal, 360 tax and 2,360 total.',
    },
    {
      question: 'Which currencies can I use on an invoice?',
      answer:
        'You can choose INR, USD, EUR or GBP. The currency changes the symbol and number formatting only; it does not convert amounts between currencies. Enter your prices in the currency you select.',
    },
    {
      question: 'Can I add a signature and notes to my invoice?',
      answer:
        'Yes. You can add notes or payment terms, and turn on a signature block that is typed, drawn or uploaded as an image, with a label such as Authorised Signatory. The signature and notes appear in the preview and in the printed PDF.',
    },
    {
      question: 'What is the difference between an invoice and a quotation?',
      answer:
        'A quotation is an offer of price before work or sale, which the client can accept or decline. An invoice is a request for payment after goods or services are delivered. If you need a price offer first, use the quotation generator, then issue an invoice once the work is agreed.',
    },
  ],

  'gst-invoice': [
    {
      question: 'How is GST calculated on an invoice?',
      answer:
        'For each item, taxable value = quantity x price, and GST = taxable value x GST rate. Example: 15,000 at 18% is 2,700 GST, and 2 x 45,000 at 12% is 10,800. The subtotal is 105,000, total GST 13,500, and the grand total 118,500.',
    },
    {
      question: 'What is the difference between CGST, SGST and IGST?',
      answer:
        'For a sale within one state, the GST is split equally into CGST and SGST, so 18% becomes 9% + 9%. For a sale between states, the whole amount is charged as IGST. Use the Transaction Type selector to switch between intra-state and inter-state.',
    },
    {
      question: 'Which GST rates does the tool offer, and are they current?',
      answer:
        'The dropdown offers 0%, 5%, 12%, 18% and 28%. GST rates vary by item and are revised by the GST Council, so check the official GST rate schedule for the current rate on your goods or services before issuing the invoice. This tool does not give tax advice.',
    },
    {
      question: 'Is this GST invoice generator GST-compliant?',
      answer:
        'It lays out the usual fields: seller and buyer GSTIN, invoice number and date, HSN, taxable value and tax split. It does not validate GSTINs, e-invoicing or place-of-supply rules. Confirm the requirements for your business with the official GST portal or a tax professional.',
    },
    {
      question: 'What is an HSN code and do I need it on an invoice?',
      answer:
        'HSN (Harmonised System of Nomenclature) is a standard code that classifies goods, and services use SAC codes. The tool has an HSN field per item. Whether it is mandatory, and how many digits, depends on your turnover, so check the official GST guidelines.',
    },
    {
      question: 'How do I save the GST invoice as a PDF?',
      answer:
        'Click the Print button and choose Save as PDF in your browser print dialog. The page prints only the invoice, hiding the input forms. Everything is generated in your browser, so nothing needs to be uploaded.',
    },
  ],

  'roi-calculator': [
    {
      question: 'How do I calculate ROI?',
      answer:
        'ROI = (amount returned - amount invested) / amount invested x 100. If you invest 100,000 and get back 150,000, the net profit is 50,000 and ROI is 50%. The tool shows net profit, total ROI and annualised ROI from the amounts and period you enter.',
    },
    {
      question: 'What is annualised ROI (CAGR)?',
      answer:
        'Annualised ROI is the steady yearly growth rate that would turn your investment into the final amount: (returned / invested) ^ (1 / years) - 1. For 100,000 growing to 150,000 in 3 years, it is 1.5^(1/3) - 1, about 14.47% per year, not 50% / 3.',
    },
    {
      question: 'Why is annualised ROI not simply total ROI divided by years?',
      answer:
        'Because returns compound. A 50% total gain over 3 years averages 16.7% if you just divide, but the compounding rate is about 14.47%. The compound figure is the fairer way to compare investments held for different lengths of time.',
    },
    {
      question: 'What is a good ROI?',
      answer:
        'There is no single answer; it depends on the risk, the time period and your alternatives. A 10% ROI over one year and over five years mean very different things. Compare annualised ROI with what a safe option pays, and remember past results do not guarantee future returns.',
    },
    {
      question: 'Can I enter the investment period in months?',
      answer:
        'Yes. Choose months or years as the period type. Months are divided by 12 before annualising, so 18 months is 1.5 years. Using a period of zero gives no annualised figure, so enter a positive duration.',
    },
    {
      question: 'Does ROI include fees, taxes and inflation?',
      answer:
        'Only if you include them. The tool uses the amounts you type, so subtract brokerage, fees and taxes from the returned amount to get a net figure. Inflation is not adjusted, so the real purchasing power gain is lower than the ROI shown. This is not financial or tax advice.',
    },
  ],

  'profit-margin': [
    {
      question: 'How do I calculate profit margin?',
      answer:
        'Profit margin = (selling price - cost) / selling price x 100. With a cost of 100 and a selling price of 150, profit is 50 and the margin is 50 / 150 x 100 = 33.33%. Enter cost and selling price in the tool and it shows profit, margin and markup together.',
    },
    {
      question: 'What is the difference between margin and markup?',
      answer:
        'Margin is profit as a percentage of the selling price; markup is profit as a percentage of cost. The same 50 profit on a cost of 100 is a 33.33% margin but a 50% markup. Margin can never reach 100%, while markup has no upper limit.',
    },
    {
      question: 'How do I find the selling price for a target margin?',
      answer:
        'Divide the cost by (1 - target margin). For a cost of 100 and a 40% margin, the price is 100 / 0.6 = 166.67. Use the Target Margin mode in the tool to get this and the matching markup, which is about 66.67%.',
    },
    {
      question: 'Which profit margin does this calculator work out?',
      answer:
        'It works from cost price and selling price, so the margin shown is the gross margin on that item, before overheads, salaries, interest and taxes. Net or operating margin needs your wider business costs, which this tool does not take as inputs.',
    },
    {
      question: 'Can I get the price from a target markup instead of margin?',
      answer:
        'Yes. Choose Target Markup, enter the cost and markup percentage, and the price is cost x (1 + markup / 100). A 50% markup on 100 gives 150, which the tool also shows as a 33.33% margin.',
    },
    {
      question: 'What is a good profit margin?',
      answer:
        'It depends heavily on the industry. Retail, services and software often work with very different typical margins, so compare against businesses like yours rather than a single number. Also allow for overheads and taxes, which the gross margin shown here does not include.',
    },
  ],

  'break-even': [
    {
      question: 'How do I calculate the break-even point in units?',
      answer:
        'Break-even units = fixed costs / (selling price per unit - variable cost per unit). With fixed costs of 50,000, a price of 50 and a variable cost of 30, the contribution is 20 per unit, so you need 50,000 / 20 = 2,500 units.',
    },
    {
      question: 'How do I calculate break-even revenue?',
      answer:
        'Break-even revenue = fixed costs / contribution margin ratio, where the ratio is (price - variable cost) / price. Here the ratio is 20 / 50 = 0.4, so revenue is 50,000 / 0.4 = 125,000, which equals 2,500 units x 50.',
    },
    {
      question: 'What is the difference between break-even units and break-even revenue?',
      answer:
        'Break-even units is how many items you must sell to cover all costs; break-even revenue is the sales value at that point. They describe the same point: units x price = revenue. Units suit production planning, revenue suits sales targets.',
    },
    {
      question: 'What is contribution margin?',
      answer:
        'Contribution margin is the selling price minus the variable cost per unit. It is the amount each sale contributes toward covering fixed costs and then profit. In the example, a price of 50 and variable cost of 30 leaves a contribution of 20 per unit, or 40% of the price.',
    },
    {
      question: 'What counts as a fixed cost and what counts as a variable cost?',
      answer:
        'Fixed costs stay the same however much you sell, such as rent, salaries and insurance. Variable costs change with each unit, such as materials, packaging and per-order shipping. Splitting them correctly is the biggest factor in an accurate break-even figure.',
    },
    {
      question: 'Why does the break-even calculator show a warning?',
      answer:
        'If the selling price is not higher than the variable cost, each sale loses money or earns nothing towards fixed costs, so no break-even point exists. Raise the price, cut variable costs, or both, until the price is above the variable cost per unit.',
    },
  ],

  'quotation-generator': [
    {
      question: 'How do I create a price quotation for a client?',
      answer:
        'Enter your company and client details, a quotation number and date, then add each item or service with quantity and price. Set a valid-until date, then use Print to save the page as a PDF. The quotation is built in your browser and ready to send.',
    },
    {
      question: 'How are discount and tax calculated on the quotation?',
      answer:
        'Each line is quantity x price, then the line discount percentage is subtracted, and tax is applied on the discounted amount. For a 10,000 line with 5% discount and 18% tax: discount 500, taxable 9,500, tax 1,710, so the line total is 11,210.',
    },
    {
      question: 'What should be included in a quotation?',
      answer:
        'A clear description of goods or services, quantities, unit prices, any discount, tax, the total, the date, and how long the price is valid. Adding delivery, payment terms and contact details helps avoid disputes. Legal requirements differ, so check what applies to you.',
    },
    {
      question: 'What is the difference between a quotation and a proforma invoice?',
      answer:
        'A quotation is a price offer that the client may accept, while a proforma invoice is a preliminary bill sent before delivery, often to arrange payment or paperwork. Neither is a final tax invoice. This tool creates quotations with a validity date.',
    },
    {
      question: 'How long should a quotation stay valid?',
      answer:
        'It depends on how quickly your costs or availability change; 15 to 30 days is common. Use the Valid Until field to state it clearly, so both sides know until when the quoted prices hold. This is a business practice, not a legal rule.',
    },
    {
      question: 'Can I set a different tax rate for each item?',
      answer:
        'Yes. Every row has its own discount percentage and tax percentage, so items can carry different rates. The totals show subtotal, total discount, total tax and grand total. Check the applicable rate for each product with the official tax authority.',
    },
  ],

  'markup-calculator': [
    {
      question: 'How do I calculate markup percentage?',
      answer:
        'Markup % = (selling price - cost) / cost x 100. If an item costs 800 and sells for 1,000, profit is 200 and markup is 200 / 800 x 100 = 25%. Choose the Cost + Price tab, enter both values, and the tool also shows the margin.',
    },
    {
      question: 'What is the difference between markup and margin?',
      answer:
        'Markup is profit divided by cost, while margin is profit divided by selling price. A 25% markup on 800 gives a price of 1,000 and a margin of 20%. Margin is always smaller than markup for the same profit, which is why the two are often confused.',
    },
    {
      question: 'How do I convert a margin percentage to a markup percentage?',
      answer:
        'Markup = margin / (100 - margin) x 100. A 20% margin gives 20 / 80 = 25% markup, and a 50% margin gives 100% markup. The tool does this for you in the Cost + Margin tab, where you enter the cost and target margin.',
    },
    {
      question: 'How do I find the selling price from cost and markup?',
      answer:
        'Selling price = cost x (1 + markup / 100). At a cost of 800 and markup of 25%, the price is 800 x 1.25 = 1,000. Use the Cost + Markup % tab to get the price, profit and the matching margin.',
    },
    {
      question: 'Why can margin not be 100% or more?',
      answer:
        'Margin is profit as a share of price, and profit is always smaller than the price when there is a cost. A 100% margin would need a cost of zero, so the calculator rejects margins at or above 100%. Markup has no such limit.',
    },
    {
      question: 'Should I price my products on markup or margin?',
      answer:
        'Either can work, but be consistent. Retail and trading businesses often set prices by markup on cost, while finance teams and investors usually report margin. Use the tool to translate between them, and remember that overheads are not part of either figure here.',
    },
  ],

  'email-signature': [
    {
      question: 'How do I add an HTML email signature to Gmail or Outlook?',
      answer:
        'Fill in your details, click Copy signature, then open your email settings and paste it into the signature box. If your email client blocks rich copy, use Copy HTML and paste the code where your client supports HTML signatures. Menu names differ by client, so look in the signature settings.',
    },
    {
      question: 'What should I include in a professional email signature?',
      answer:
        'Keep it short: full name, job title, company, one phone number, your email, and a website. This tool covers all of these, plus an optional address and an accent colour. Extras such as long quotes and many links tend to make signatures look cluttered.',
    },
    {
      question: 'Does the signature work in all email clients?',
      answer:
        'It uses a simple table layout with inline styles, which most email clients render reliably. Some clients and mobile apps still strip or restyle signatures, so send yourself a test message. The signature contains text and links only, with no images.',
    },
    {
      question: 'Can I add my logo or a photo to the signature?',
      answer:
        'No. This generator makes a text-only signature with an accent colour. Image links in email are often blocked or shown as attachments, which is why a clean text signature is more reliable. You can add an image later in your email client if it supports one.',
    },
    {
      question: 'Are the links in the signature safe?',
      answer:
        'Yes. The tool escapes the text you enter and only builds links using http, https, mailto and tel, so unsafe schemes are dropped. Links for phone, email and website are created for you from the fields.',
    },
    {
      question: 'Can I change the colour of my email signature?',
      answer:
        'Yes. Use the accent colour picker; the colour is applied to the vertical divider line, your job title and the website link. The preview updates instantly, and the chosen colour is included in the copied HTML.',
    },
  ],

  'meeting-cost': [
    {
      question: 'How do I calculate the cost of a meeting?',
      answer:
        'Multiply attendees by the average hourly cost per person, then by the meeting length in hours. Six people at 1,500 per hour for 60 minutes is 6 x 1,500 = 9,000. The tool shows this planned cost and a live counter that grows while the meeting runs.',
    },
    {
      question: 'How does the live meeting cost counter work?',
      answer:
        'Press Start meeting and the counter adds cost every second, based on attendees times the hourly cost. You can pause, resume and reset it. With 9,000 per hour, the cost rises by about 150 every minute. It runs only in your browser.',
    },
    {
      question: 'How do I convert an annual salary to an hourly cost?',
      answer:
        'Choose Year as the rate type and the tool divides the annual figure by 2,000 working hours. An annual cost of 20,00,000 becomes 1,000 per hour. It is a simple approximation, so enter an hourly cost directly if you know a more accurate figure.',
    },
    {
      question: 'Should I use salary or total employee cost?',
      answer:
        'Total cost to the company is a fairer basis because it includes benefits, taxes and overheads, not just salary. Salary alone will understate the real cost. Either way, the result is a rough estimate to prompt better meeting habits, not an accounting figure.',
    },
    {
      question: 'How can I reduce the cost of meetings?',
      answer:
        'Invite only those who need to decide or contribute, set an agenda, and shorten the slot. Cutting a 60-minute meeting to 30 minutes halves the cost, and removing 2 of 6 attendees reduces it by one third. Showing the live counter can also keep discussions focused.',
    },
    {
      question: 'Does the meeting cost calculator include the time people spend preparing?',
      answer:
        'No. It only counts the meeting length you enter, multiplied by the attendees and their average cost. Preparation, follow-up work and the cost of interrupting other tasks are not included, so the real cost of a meeting is usually higher than the figure shown.',
    },
  ],

  'quadratic-solver': [
    {
      question: 'How do I solve a quadratic equation?',
      answer:
        'Enter the coefficients a, b and c of ax2 + bx + c = 0, and the tool applies the quadratic formula x = (-b +/- sqrt(b2 - 4ac)) / 2a. For x2 - 3x + 2 = 0, the discriminant is 1 and the roots are x = 2 and x = 1.',
    },
    {
      question: 'What is the discriminant and what does it tell me?',
      answer:
        'The discriminant is b2 - 4ac. If it is positive, there are two different real roots; if zero, one repeated real root; if negative, two complex roots. For x2 - 3x + 2 = 0, it is 9 - 8 = 1, so there are two real roots.',
    },
    {
      question: 'Does the solver handle complex roots?',
      answer:
        'Yes. When the discriminant is negative, roots are shown in the form p + qi and p - qi. For example, x2 + 2x + 5 = 0 has discriminant -16 and roots -1 + 2i and -1 - 2i. The tool also still shows the vertex.',
    },
    {
      question: 'How do I find the vertex of a parabola?',
      answer:
        'The vertex x-coordinate is -b / 2a, and the y-coordinate is c - b2 / 4a. For x2 - 3x + 2, the vertex is (1.5, -0.25). The solver shows it next to the roots. It is the minimum point when a is positive and the maximum when a is negative.',
    },
    {
      question: 'What happens if a is zero?',
      answer:
        'The equation is no longer quadratic, so the tool solves it as a linear equation bx + c = 0, giving x = -c / b, and labels it so. If both a and b are zero, there is no equation to solve, and you are asked to enter valid coefficients.',
    },
    {
      question: 'Can I enter decimals and negative numbers as coefficients?',
      answer:
        'Yes. Coefficients can be negative or decimal values such as 0.5 or -2.25. Roots are shown to about 10 significant digits. Signs matter, so enter -3 for a term like -3x rather than 3.',
    },
  ],

  'prime-factorization': [
    {
      question: 'How do I find the prime factors of a number?',
      answer:
        'Divide the number by the smallest prime that fits, repeat with the quotient, and continue until you reach 1. Enter 360 and the tool shows 360 = 2 cubed x 3 squared x 5. It also tells you whether the number is prime and how many divisors it has.',
    },
    {
      question: 'How do I check whether a number is prime?',
      answer:
        'A prime has exactly two divisors: 1 and itself. Enter the number and the "Is it prime?" box shows Yes or No; a prime factorisation with a single prime raised to the power 1 means it is prime. For example, 97 is prime and 91 (7 x 13) is not.',
    },
    {
      question: 'How do I find the GCD (HCF) of numbers?',
      answer:
        'The greatest common divisor is the largest number that divides all of them, found with the Euclidean algorithm. For 48, 180 and 36 the GCD is 12. Enter two or more positive whole numbers, separated by commas or spaces, in the GCD and LCM card.',
    },
    {
      question: 'How do I find the LCM of numbers?',
      answer:
        'The LCM is the smallest number that all of them divide into. For two numbers it is a x b / GCD. For 48, 180 and 36 the LCM is 720. If the result is too large to be exact, the tool shows Too large.',
    },
    {
      question: 'How is the number of divisors calculated?',
      answer:
        'Add 1 to each prime exponent and multiply the results. Since 360 = 2^3 x 3^2 x 5^1, divisors = (3 + 1)(2 + 1)(1 + 1) = 24. The tool shows this count for the number you factorise.',
    },
    {
      question: 'How large a number can the prime factorisation tool handle?',
      answer:
        'It works on whole numbers from 2 up to 9,007,199,254,740,991 (2^53 - 1), the largest integer a browser can represent exactly. Numbers with very large prime factors can take a little longer to factorise. Decimals, negatives and 0 or 1 are not accepted.',
    },
  ],

  'statistics-calculator': [
    {
      question: 'How do I calculate mean, median and mode?',
      answer:
        'Mean is the sum divided by the count, median is the middle value when sorted, and mode is the most frequent value. For 12, 15, 15, 18, 21, 24, 24, 24, 30: sum 183, mean 20.33, median 21, mode 24. Paste your numbers and the tool shows all three.',
    },
    {
      question: 'What is the difference between sample and population standard deviation?',
      answer:
        'Population standard deviation divides the squared deviations by n, and sample standard deviation divides by n - 1. For the example data set, they are 5.44 and 5.77. Use the sample version when your data is a subset of a larger group, and population when you have every value.',
    },
    {
      question: 'How are quartiles Q1 and Q3 calculated?',
      answer:
        'The tool sorts the data and uses linear interpolation between neighbouring values at the 25% and 75% positions. Textbooks and some software use other quartile methods, so Q1 and Q3 can differ slightly from your class notes. The median is the same in every method.',
    },
    {
      question: 'What if my data set has no mode?',
      answer:
        'If every value appears only once, there is no mode and the tool shows None. If several values tie for the highest frequency, all of them are listed. A data set can therefore have no mode, one mode or several.',
    },
    {
      question: 'How do I enter my data?',
      answer:
        'Type or paste numbers separated by commas, spaces or new lines, for example straight from a spreadsheet column. Anything that is not a number is ignored and listed in a warning. Results update as you type, and no upload is needed.',
    },
    {
      question: 'What is the difference between mean and median?',
      answer:
        'The mean is the arithmetic average and is pulled by extreme values, while the median is the middle value and resists outliers. In 1, 2, 3, 4, 100 the mean is 22 but the median is 3. Compare both to see whether your data is skewed.',
    },
  ],

  'speed-distance-time': [
    {
      question: 'What is the formula for speed, distance and time?',
      answer:
        'Speed = distance / time, distance = speed x time, and time = distance / speed. At 60 km/h, 450 km takes 450 / 60 = 7.5 hours, or 7 h 30 m. Use the tabs to solve for time, speed or distance, in kilometres or miles.',
    },
    {
      question: 'How do I calculate travel time for a journey?',
      answer:
        'Divide the distance by your average speed. The tool shows the answer in hours and minutes, and if you enter a departure time it also gives an estimated arrival. Leaving at 08:00 for a 7 h 30 m trip gives 15:30.',
    },
    {
      question: 'How do I calculate average speed?',
      answer:
        'Divide total distance by total time taken, including hours and minutes. Covering 150 km in 2 hours 30 minutes is 150 / 2.5 = 60 km/h. Use the Find speed tab and enter distance, hours and minutes.',
    },
    {
      question: 'Does the estimated arrival time include stops and traffic?',
      answer:
        'No. It assumes you travel at a constant speed with no breaks, so the result is a best case. Add time for rest stops, fuel, traffic and border or security checks. If the trip crosses midnight, the arrival is marked with the number of days later.',
    },
    {
      question: 'Can I use miles instead of kilometres?',
      answer:
        'Yes. Switch the unit to Miles and enter distance in miles and speed in miles per hour. The formulas are the same, and results are labelled with the unit you chose. The tool does not convert between km and miles, so use the same unit for every input.',
    },
    {
      question: 'How do I convert minutes into decimal hours for speed calculations?',
      answer:
        'Divide the minutes by 60 and add the hours. For example, 2 hours 30 minutes is 2.5 hours, and 45 minutes is 0.75 hours. The tool takes hours and minutes separately and does this conversion for you.',
    },
  ],

  'trip-budget': [
    {
      question: 'How do I plan a trip budget?',
      answer:
        'List every expected cost by category, such as transport, stay, food, activities and shopping, and add them up. The planner starts with sample categories that you can rename, edit or remove, and shows the total plus cost per person and per day.',
    },
    {
      question: 'How is the cost per person and per day calculated?',
      answer:
        'Per person = total / number of travellers, and per day = total / number of days. With a total of 63,000 for 2 travellers over 5 days, that is 31,500 per person and 12,600 per day. Travellers and days are set to at least 1.',
    },
    {
      question: 'Can I set a spending limit for my trip?',
      answer:
        'Yes. Enter a budget cap and the planner shows how far you are under or over it. For example, a cap of 70,000 against a total of 63,000 shows 7,000 under budget. The cap is optional.',
    },
    {
      question: 'Which currency does the trip budget planner use?',
      answer:
        'It shows amounts in Indian rupees (₹) and does not convert currencies. For a foreign trip, convert your estimates to rupees first, or enter figures in any single currency and read the totals as that currency.',
    },
    {
      question: 'Is my trip budget saved?',
      answer:
        'Yes, in your own browser only. Your categories, amounts, travellers, days and cap are stored locally and restored when you return on the same device and browser. Clearing site data removes them. Nothing is sent to a server.',
    },
    {
      question: 'What categories should I include in a trip budget?',
      answer:
        'Common ones are transport, accommodation, food, local travel, activities, shopping, visas or insurance, and an emergency buffer. The tool starts with five and you can add more. A buffer of some extra amount for surprises is a sensible addition.',
    },
  ],

  'water-intake': [
    {
      question: 'How much water should I drink per day?',
      answer:
        'This calculator gives a general guideline of about 35 mL per kg of body weight, plus extra for exercise and hot weather. A 70 kg person gets 2,450 mL, or about 2.5 L a day, before adjustments. Needs vary; ask a doctor about personal advice.',
    },
    {
      question: 'How does exercise change my water intake?',
      answer:
        'The tool adds 350 mL for every 30 minutes of exercise. For a 70 kg person doing 30 minutes daily, the target rises from 2.45 L to 2.8 L. Intense or long sessions, or heavy sweating, may need more than this simple estimate.',
    },
    {
      question: 'Does hot or humid weather increase my water needs?',
      answer:
        'Yes. Turning on the hot or humid climate switch adds 0.5 L to your daily target. So 2.8 L becomes 3.3 L. It is a rough allowance, and you may need more if you sweat a lot or spend long periods outdoors.',
    },
    {
      question: 'Does the recommended amount include water from food and other drinks?',
      answer:
        'Yes. The figure is total fluid intake, so it includes water from food, tea, coffee, milk and other drinks. Water from plain drinking is only part of it. The tool also shows the amount in 250 mL glasses and ounces.',
    },
    {
      question: 'Can I drink too much water?',
      answer:
        'Yes, though it is uncommon. Drinking far more than your body needs, especially very quickly, can dilute blood sodium, which is medically serious. Use the figure as a guide, drink to thirst, and check with a doctor if you have kidney, heart or other health conditions.',
    },
    {
      question: 'Does the calculator work in pounds?',
      answer:
        'Yes. Choose lb as the unit and the weight is converted to kg (1 lb = 0.45359237 kg) before the calculation. Weights between 20 and 300 kg (about 45 to 660 lb) are accepted. Results are shown in litres, 250 mL glasses and ounces.',
    },
  ],

  'ideal-weight': [
    {
      question: 'How is ideal body weight calculated with the Devine formula?',
      answer:
        'Devine gives 50 kg for men and 45.5 kg for women at 5 feet (152.4 cm), plus 2.3 kg for every extra inch of height. At 170 cm, that is about 65.9 kg for a man and 61.4 kg for a woman. It is only a rough guide.',
    },
    {
      question: 'What is a healthy weight range for my height?',
      answer:
        'The tool also shows the weight range that matches a BMI of 18.5 to 24.9 for your height. At 170 cm it is about 53.5 to 72.0 kg. This range is wider and often more practical than one single ideal number. It is general information, not medical advice.',
    },
    {
      question: 'Why do the Devine result and the BMI range differ?',
      answer:
        'They use different methods. Devine is a 1970s formula built on height and sex, while the BMI range is a broad band of weights considered healthy for a height. A person can be within the BMI range and still differ from the Devine number without any concern.',
    },
    {
      question: 'Does ideal weight depend on age, frame size or muscle?',
      answer:
        'The formulas here use only height and sex. They ignore age, frame size, bone density and muscle mass, so an athlete or a person with a large frame may be healthy well above the figure. Use it as a rough reference and consult a doctor for your own target.',
    },
    {
      question: 'What height range does the ideal weight calculator accept?',
      answer:
        'Heights from 100 to 250 cm. For people under 5 feet, the Devine formula here does not go below its base value, which is 50 kg for men and 45.5 kg for women. Enter height in centimetres; the result is also shown in pounds.',
    },
    {
      question: 'Is ideal body weight the same as a weight-loss goal?',
      answer:
        'Not necessarily. Ideal weight formulas describe a statistical reference, not a personal target. A safe goal depends on your health, body composition and history, so discuss it with a doctor or registered dietitian rather than treating a formula as a prescription.',
    },
  ],

  'body-fat-calculator': [
    {
      question: 'How does the U.S. Navy body fat method work?',
      answer:
        'It estimates body fat from tape measurements instead of a scale. For men it uses height, neck and waist, and for women it adds hip, with a logarithmic formula. The calculator takes these in centimetres and returns a percentage, plus fat and lean mass if you enter weight.',
    },
    {
      question: 'How do I measure my neck, waist and hips correctly?',
      answer:
        'Use a soft tape, standing relaxed. Measure the neck just below the larynx, the waist at the navel (the tool asks for it there), and for women the hips at their widest point. Keep the tape level and snug without squeezing, and measure to the nearest 0.5 cm.',
    },
    {
      question: 'How accurate is the Navy body fat calculator?',
      answer:
        'It is an estimate, typically within about 3 to 4 percentage points, and is not a medical measurement. Tape placement, hydration and body shape all affect it. DEXA scans or clinical assessments are more precise. Use it to track trends, not for diagnosis.',
    },
    {
      question: 'What is a healthy body fat percentage?',
      answer:
        'The tool labels results using ranges. For men: under 6% essential fat, 6 to 14% athletic, 14 to 18% fitness, 18 to 25% average, above that above average. For women the cut-offs are 14, 21, 25 and 32%. These are general ranges, not medical advice.',
    },
    {
      question: 'What is the difference between BMI and body fat percentage?',
      answer:
        'BMI uses only height and weight, so it cannot tell muscle from fat. Body fat percentage estimates how much of your weight is fat, so it can separate a muscular person from one with excess fat. Neither is a diagnosis on its own.',
    },
    {
      question: 'Why does the calculator say to check my measurements?',
      answer:
        'The formula needs a waist larger than the neck (for women, waist plus hip larger than neck), and realistic values in centimetres. If the inputs are impossible or the result is outside 0 to 70%, the tool does not show a number. Re-measure and re-enter.',
    },
  ],

  'heart-rate-zones': [
    {
      question: 'How do I calculate my heart rate zones?',
      answer:
        'This tool uses the Karvonen method: max heart rate = 220 - age, reserve = max - resting rate, and each zone = resting + reserve x a percentage. For age 30 and resting 60, max is 190, reserve 130, and Zone 2 (60 to 70%) is 138 to 151 bpm.',
    },
    {
      question: 'What is the Karvonen formula?',
      answer:
        'Karvonen sets target heart rate as resting heart rate + (max heart rate - resting heart rate) x intensity. It personalises zones using your resting pulse, so two people the same age get different zones if their resting rates differ.',
    },
    {
      question: 'What are the five heart rate zones?',
      answer:
        'The tool shows Zone 1 (50 to 60% of reserve, very light), Zone 2 (60 to 70%, endurance), Zone 3 (70 to 80%, aerobic), Zone 4 (80 to 90%, threshold) and Zone 5 (90 to 100%, maximum). For age 30 and resting 60, Zone 3 is 151 to 164 bpm.',
    },
    {
      question: 'How do I measure my resting heart rate?',
      answer:
        'Check it first thing in the morning, before getting up or having caffeine. Find your pulse at the wrist or neck, count beats for 30 seconds and double it, and average a few days. Many adults fall somewhere between 60 and 100 bpm, but it varies.',
    },
    {
      question: 'Is 220 minus age an accurate maximum heart rate?',
      answer:
        'It is a rough population estimate, and real maximums vary by many beats either way between individuals. Other formulas exist. Use the zones as a guide, and if you need an exact figure, a supervised test with a professional is more reliable.',
    },
    {
      question: 'Is it safe to train in the higher heart rate zones?',
      answer:
        'That depends on your health. Zones 4 and 5 are hard efforts. This is general information, not medical advice; see a doctor before starting intense training, especially if you have heart or blood pressure concerns, are new to exercise or take medication.',
    },
  ],
};
