import type { FaqMap } from './types';

export const FAQS: FaqMap = {
  'emi-calculator': [
    {
      question: 'How is EMI calculated?',
      answer:
        'EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100) and n is the number of monthly instalments. For example, ₹10,00,000 at 8.5% for 10 years (120 months) gives an EMI of about ₹12,399, a total repayment of about ₹14,87,828 and total interest of about ₹4,87,828.',
    },
    {
      question: 'How do I use this EMI calculator and download the repayment schedule?',
      answer:
        'Set the loan amount, annual interest rate and tenure in years using the sliders. The EMI, total interest, total payment and a principal-versus-interest pie chart update instantly. Below that you get an amortization schedule, which you can view monthly or yearly, and export as a CSV file that opens in Excel or Google Sheets.',
    },
    {
      question: 'How does loan tenure change my EMI and total interest?',
      answer:
        'A longer tenure lowers the EMI but raises the total interest, because you owe the balance for more months. On ₹10,00,000 at 8.5%, a 10-year loan has an EMI of about ₹12,399 and interest of about ₹4.88 lakh, while a 20-year loan has an EMI of about ₹8,678 but interest of about ₹10.83 lakh.',
    },
    {
      question: 'Why is most of my early EMI interest and not principal?',
      answer:
        'Interest is charged on the outstanding balance, which is highest at the start. On ₹10,00,000 at 8.5%, the first month interest is ₹10,00,000 × 8.5% ÷ 12 = about ₹7,083, so only about ₹5,315 of the ₹12,399 EMI reduces the principal. As the balance falls, the interest share shrinks and the principal share grows.',
    },
    {
      question: 'How can I reduce my EMI?',
      answer:
        'You can lower the EMI by borrowing less (a bigger down payment), choosing a longer tenure, or getting a lower interest rate, for example by negotiating or moving the loan to a cheaper lender. Note that a longer tenure reduces the monthly outgo but increases the total interest you pay over the life of the loan.',
    },
    {
      question: 'What does the EMI calculator not include?',
      answer:
        'The result covers only principal and interest at a fixed rate. It does not include processing fees, GST on fees, insurance premiums, part-prepayment or foreclosure charges, or changes in a floating rate. It also assumes equal monthly instalments starting one month after the loan begins, so treat it as a close estimate and confirm exact figures with your lender.',
    },
  ],

  'home-loan-calculator': [
    {
      question: 'How do I calculate the EMI for a ₹50 lakh home loan?',
      answer:
        'Use EMI = P × r × (1+r)^n / ((1+r)^n − 1) with r as the monthly rate and n as the months. For ₹50,00,000 at 8.5% over 20 years, the EMI is about ₹43,391, the total repayment is about ₹1.04 crore and the interest is about ₹54.14 lakh. Enter your own amount, rate and tenure to see your figures.',
    },
    {
      question: 'Is it better to take a 15-year or 20-year home loan?',
      answer:
        'A 15-year loan has a higher EMI but far less interest. On ₹50,00,000 at 8.5%, 15 years means an EMI of about ₹49,237 and interest of about ₹38.63 lakh, while 20 years means about ₹43,391 and about ₹54.14 lakh. Pick the shortest tenure whose EMI you can pay comfortably alongside your other expenses.',
    },
    {
      question: 'How much does a 0.5% higher interest rate cost on a home loan?',
      answer:
        'On ₹50,00,000 over 20 years, moving from 8.5% to 9% raises the EMI from about ₹43,391 to about ₹44,986, roughly ₹1,595 more each month. Over the full term that adds about ₹3.83 lakh in interest. Even small rate differences matter on long tenures, so compare offers before you sign.',
    },
    {
      question: 'What costs are not included in the home loan calculator?',
      answer:
        'The calculator shows only the EMI, interest and total repayment for the loan amount you enter. Your down payment, stamp duty, registration charges, processing fee, valuation and legal fees, and home or life insurance are separate costs. It also assumes a constant interest rate, whereas floating-rate loans can change your EMI or tenure.',
    },
    {
      question: 'Are there tax benefits on a home loan in India?',
      answer:
        'Indian income tax law has provisions for deductions on home loan interest and principal repayment, but they generally apply only under the old tax regime, and the limits and conditions are revised from time to time. This calculator does not compute tax savings, so check the current Income Tax Act rules or ask a tax professional.',
    },
    {
      question: 'How much home loan can I get for my salary?',
      answer:
        'Lenders usually cap your total EMIs at a share of your monthly income (often around 40-60%), and also check your credit score, age, job stability and property value. This page calculates the EMI for a loan you choose. To estimate the maximum loan for your income, try the Loan Eligibility Calculator on Toolskyt.',
    },
  ],

  'car-loan-calculator': [
    {
      question: 'How is car loan EMI calculated?',
      answer:
        'Car loan EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly rate and n is the number of months. For ₹10,00,000 at 9.5% over 7 years, the EMI is about ₹16,344 and the total interest is about ₹3.73 lakh, so you repay about ₹13.73 lakh in all.',
    },
    {
      question: 'Should I take a 5-year or 7-year car loan?',
      answer:
        'A 5-year loan costs more each month but much less in interest. On ₹10,00,000 at 9.5%, 5 years gives an EMI of about ₹21,002 and interest of about ₹2.60 lakh, while 7 years gives about ₹16,344 and about ₹3.73 lakh. Since cars lose value with time, many buyers prefer the shortest tenure they can afford.',
    },
    {
      question: 'How does a down payment affect my car loan EMI?',
      answer:
        'The loan amount is roughly the on-road price minus your down payment, so a larger down payment lowers the EMI and the total interest. For example, a ₹12,00,000 on-road price with a ₹2,00,000 down payment means a ₹10,00,000 loan. Enter the loan amount, not the car price, in the calculator.',
    },
    {
      question: 'What is the difference between a car loan and a personal loan for buying a car?',
      answer:
        'A car loan is secured against the vehicle, which the lender holds a claim on until you repay, so it usually carries a lower interest rate than an unsecured personal loan. A personal loan is more flexible about how you spend the money but is generally costlier. Compare the total interest on both in the calculators before choosing.',
    },
    {
      question: 'Are interest rates different for new and used car loans?',
      answer:
        'Used car loans usually have higher interest rates and shorter maximum tenures than new car loans, because the lender sees more risk. Rates and terms vary by lender, your credit profile and the vehicle. Enter the rate you are actually offered in the calculator rather than a headline rate.',
    },
    {
      question: 'What does the car loan calculator leave out?',
      answer:
        'It calculates EMI, total interest and total repayment on the amount and rate you enter. It does not add processing fees, GST on fees, insurance, registration and road tax, or foreclosure charges. Ask the lender for the full cost of the loan, and keep in mind that the on-road price is higher than the ex-showroom price.',
    },
  ],

  'personal-loan-calculator': [
    {
      question: 'How is personal loan EMI calculated?',
      answer:
        'EMI = P × r × (1+r)^n / ((1+r)^n − 1), where r is the annual rate divided by 12 and 100, and n is the number of months. For a ₹5,00,000 loan at 12% over 5 years, the EMI is about ₹11,122 and the total interest is about ₹1.67 lakh, so you repay about ₹6.67 lakh in total.',
    },
    {
      question: 'Why are personal loan interest rates higher than home or car loans?',
      answer:
        'A personal loan is unsecured, meaning there is no house or vehicle the lender can claim if you stop paying. Lenders price that extra risk into the rate. Your income, credit score and employer profile also affect the rate you are offered, so use the calculator with the rate on your actual offer letter.',
    },
    {
      question: 'How much interest do I save with a shorter personal loan tenure?',
      answer:
        'A lot. On ₹5,00,000 at 12%, a 5-year loan has an EMI of about ₹11,122 and interest of about ₹1.67 lakh, while a 3-year loan has an EMI of about ₹16,607 and interest of about ₹0.98 lakh. Choose the shortest tenure whose EMI fits comfortably in your monthly budget.',
    },
    {
      question: 'How much personal loan can I get on my salary?',
      answer:
        'Lenders look at your net income, existing EMIs, credit score and employment history, and often limit total EMIs to a portion of your income. This page calculates EMI for an amount you choose. To estimate the maximum loan your income supports, use the Loan Eligibility Calculator on Toolskyt.',
    },
    {
      question: 'What charges apply to a personal loan besides interest?',
      answer:
        'Lenders often charge a processing fee, GST on that fee, and sometimes insurance, late payment penalties and part-payment or foreclosure charges. This calculator shows only principal and interest, so add those fees when comparing offers. Ask for the total cost of the loan, not just the headline interest rate.',
    },
    {
      question: 'Does prepaying a personal loan reduce the total interest?',
      answer:
        'Yes, in general. Interest is charged on the outstanding balance, so paying part of the principal early reduces the interest you owe from then on. Check whether your lender charges a prepayment or foreclosure fee, since it can cancel out part of the saving. This calculator does not model prepayments.',
    },
  ],

  'education-loan-calculator': [
    {
      question: 'How is education loan EMI calculated with a moratorium?',
      answer:
        'The calculator adds the interest that accrues during the moratorium (course) period to the loan balance, then computes EMI on that larger balance using EMI = P × r × (1+r)^n / ((1+r)^n − 1). For ₹20,00,000 at 10.5% with a 1-year moratorium and 10 years of repayment, the EMI is about ₹29,961.',
    },
    {
      question: 'What is a moratorium period in an education loan?',
      answer:
        'A moratorium is the period, usually the course duration plus a grace period set by the lender, during which you are not required to pay EMIs. Interest still builds up on the loan during this time. Set the moratorium slider to your course length, from 0 to 5 years, and the tenure slider to your planned repayment period.',
    },
    {
      question: 'Is it worth paying interest during the moratorium?',
      answer:
        'Paying it keeps your balance from growing, which lowers later EMIs. On ₹20,00,000 at 10.5% over 10 years of repayment, a 1-year moratorium with interest added to the loan gives an EMI of about ₹29,961, versus about ₹26,987 if no interest builds up. Compare the total cost yourself, since paying early also strains your budget while studying.',
    },
    {
      question: 'Does interest compound during the moratorium in this calculator?',
      answer:
        'Yes. This calculator adds each month of interest to the balance during the moratorium, so it grows on a compounding basis. Some lenders instead charge simple interest during the course period or let you pay it monthly. Check your sanction letter for how your lender treats it and adjust your expectations accordingly.',
    },
    {
      question: 'Can I claim a tax deduction on education loan interest?',
      answer:
        'In India, Section 80E has generally allowed a deduction for interest paid on a loan for higher education of the borrower, spouse or children, for a limited number of years and only under the old tax regime. Rules change, so check the current Income Tax Act or a tax professional. This calculator does not compute tax savings.',
    },
    {
      question: 'How is an education loan different from a personal loan?',
      answer:
        'An education loan is meant for tuition and related costs, and it typically offers a moratorium so you start paying after the course. Personal loans usually start EMIs immediately and are unsecured. Rates, collateral needs, and tax treatment differ by lender and loan type, so compare the total repayment for both in the calculators.',
    },
  ],

  'loan-eligibility-calculator': [
    {
      question: 'How is loan eligibility calculated?',
      answer:
        'This calculator finds the EMI you can afford as 50% of net monthly income minus existing EMIs, then converts it to a loan amount with P = EMI × ((1+r)^n − 1) / (r × (1+r)^n). With ₹80,000 income, ₹15,000 existing EMIs, 8.5% and 20 years, the maximum EMI is ₹25,000 and the eligible loan is about ₹28.8 lakh.',
    },
    {
      question: 'What is FOIR and why do banks use it?',
      answer:
        'FOIR (Fixed Obligation to Income Ratio) is the share of your monthly income that goes to fixed debt payments such as EMIs. Banks use it to test whether you can afford a new loan. This calculator applies a fixed 50% limit, but actual lender limits vary with your income, credit profile and loan type.',
    },
    {
      question: 'How can I increase my loan eligibility?',
      answer:
        'Close or reduce existing EMIs, choose a longer tenure, or look for a lower rate. In the calculator, clearing the ₹15,000 EMI raises the eligible amount from about ₹28.8 lakh to about ₹40.3 lakh, and a 30-year tenure instead of 20 raises it to about ₹32.5 lakh. Adding a co-applicant with income can also help.',
    },
    {
      question: 'Which income should I enter in the loan eligibility calculator?',
      answer:
        'Enter your net monthly take-home income, meaning what reaches your bank account after tax and deductions, as the input is labelled net monthly income. Lenders may assess gross or net income and may include other verified sources, so their figure can differ. Include only stable, documented income for a realistic estimate.',
    },
    {
      question: 'Why does my bank offer a different amount than this calculator?',
      answer:
        'This is a simple estimate based on income, existing EMIs, rate and tenure. Banks also consider your credit score, age, job type and stability, the loan-to-value limit on the property or asset, and their own policy limits. Treat the result as a starting point and confirm eligibility with the lender.',
    },
    {
      question: 'What is the difference between a loan eligibility calculator and an EMI calculator?',
      answer:
        'An EMI calculator starts with a loan amount and tells you the monthly payment. An eligibility calculator works the other way round: it starts with your income and obligations and estimates the largest loan you could take. Use eligibility first to find your range, then the EMI calculator to check the exact payments.',
    },
  ],

  'sip-calculator': [
    {
      question: 'How is SIP return calculated?',
      answer:
        'The calculator uses the future value formula FV = P × [((1+i)^n − 1) / i] × (1+i), where P is the monthly amount, i is the monthly rate (annual rate ÷ 12 ÷ 100) and n is the number of months. For ₹5,000 a month at 12% for 10 years, you invest ₹6,00,000 and the projected value is about ₹11.62 lakh.',
    },
    {
      question: 'Are SIP returns guaranteed?',
      answer:
        'No. Returns on SIPs in mutual funds depend on market performance and can be lower than expected or even negative. The calculator assumes a constant annual return that you enter, so the result is only a projection, not a promise. Try several rates, such as 8%, 10% and 12%, to see a range of outcomes.',
    },
    {
      question: 'How much will ₹5,000 a month in SIP become in 15 years?',
      answer:
        'At an assumed 12% annual return, ₹5,000 a month for 15 years grows to about ₹25.23 lakh from ₹9,00,000 invested. Actual mutual fund returns vary from year to year and are not guaranteed, so use the calculator to test lower assumptions as well.',
    },
    {
      question: 'What is the difference between SIP and lump sum investment?',
      answer:
        'A SIP invests a fixed amount at regular intervals, usually monthly, while a lump sum invests the full amount at once. SIPs spread your buying across market highs and lows and suit regular income. A lump sum has more time in the market if invested early. This calculator projects the SIP case only.',
    },
    {
      question: 'Does the SIP calculator account for inflation, taxes or fund charges?',
      answer:
        'No. It shows the nominal projected value based on your assumed return. Inflation reduces what the money buys, and taxes on gains and fund expense ratios can reduce your net return. Enter a return rate after allowing for these, or compare the result with your inflation-adjusted goal.',
    },
    {
      question: 'What is the difference between SIP and RD?',
      answer:
        'An RD (recurring deposit) is a bank deposit with a fixed interest rate, so its maturity value is known in advance. A SIP invests in market-linked mutual funds, so the value can rise or fall. Both involve regular monthly amounts. Compare them using the SIP and RD calculators with assumed rates.',
    },
  ],

  'fd-calculator': [
    {
      question: 'How is FD maturity amount calculated?',
      answer:
        'Maturity amount A = P × (1 + r/n)^(n×t), where P is the deposit, r is the annual rate, n is the compounding periods per year and t is the tenure in years. For ₹1,00,000 at 7.1% for 5 years compounded quarterly, A is about ₹1,42,175, so the interest earned is about ₹42,175.',
    },
    {
      question: 'Does compounding frequency affect FD returns?',
      answer:
        'Yes, more frequent compounding gives a slightly higher maturity amount. For ₹1,00,000 at 7.1% for 5 years, yearly compounding gives about ₹1,40,912, quarterly about ₹1,42,175 and monthly about ₹1,42,469. Banks commonly compound FDs quarterly, but check your bank. The calculator lets you choose monthly, quarterly, half-yearly or yearly.',
    },
    {
      question: 'Is FD interest taxable?',
      answer:
        'In India, FD interest is generally added to your income and taxed at your slab rate, and banks may deduct TDS when interest crosses a threshold. Limits and rates change, so check the current rules or your bank. This calculator shows the pre-tax maturity amount and does not deduct tax or TDS.',
    },
    {
      question: 'What is the difference between cumulative and non-cumulative FD?',
      answer:
        'A cumulative FD reinvests the interest and pays everything at maturity, which is what this calculator shows through compounding. A non-cumulative FD pays interest at regular intervals, such as monthly or quarterly, so there is no compounding and the payout differs. Choose based on whether you need regular income.',
    },
    {
      question: 'What FD interest rate should I enter?',
      answer:
        'Use the rate your bank has offered for your tenure and category, since FD rates differ by bank, tenure and depositor type, and change over time. The calculator does not fetch current bank rates. Its default of 7.1% is only an example, and it accepts rates from 1% to 15%.',
    },
    {
      question: 'How is FD different from RD?',
      answer:
        'In a fixed deposit you invest a lump sum once for a fixed term. In a recurring deposit you invest a fixed amount every month. FD interest starts accruing on the full amount from day one, while RD interest builds up as instalments are added. Use the FD or RD calculator depending on how you plan to save.',
    },
  ],

  'rd-calculator': [
    {
      question: 'How is RD maturity amount calculated?',
      answer:
        'Each monthly deposit earns interest, compounded quarterly, from the month it is deposited until maturity, and the maturity value is the sum of all deposits with their interest. For ₹5,000 a month at 6.8% for 5 years, you deposit ₹3,00,000 and the calculator shows about ₹3,57,771 at maturity. Banks may differ slightly in method.',
    },
    {
      question: 'How much will I get on an RD of ₹5,000 per month for 5 years?',
      answer:
        'At 6.8% with quarterly compounding, an RD of ₹5,000 a month for 5 years gives a maturity amount of about ₹3.58 lakh on total deposits of ₹3,00,000, so about ₹57,771 is interest. Your bank may pay a different rate, so enter the rate quoted for your tenure.',
    },
    {
      question: 'What happens if I miss an RD instalment?',
      answer:
        'Banks generally charge a small penalty for a late or missed RD instalment and may close the account if several are missed, but the rules vary by bank. This calculator assumes every instalment is paid on time, so a missed payment means your actual maturity amount will be lower.',
    },
    {
      question: 'What is the difference between RD and SIP?',
      answer:
        'An RD gives a fixed interest rate agreed with the bank, so the maturity value is predictable. A SIP invests monthly in market-linked mutual funds, where returns are not guaranteed. RD suits safety-first, short or medium goals. SIP suits longer horizons where you can tolerate market swings.',
    },
    {
      question: 'Is RD interest taxable?',
      answer:
        'In India, interest earned on an RD is generally taxable as income, and banks may deduct TDS above a threshold. Limits and rules change, so check the current rules. This calculator shows the maturity amount before any tax or TDS.',
    },
    {
      question: 'Why is my bank RD maturity different from the calculator?',
      answer:
        'Banks may compound at different intervals, round interest by their own rules, or credit instalments on set dates. This calculator assumes quarterly compounding, which is common in India, and equal monthly deposits made on time. Small differences are normal, so confirm the exact figure with your bank.',
    },
  ],

  'ppf-calculator': [
    {
      question: 'How is PPF maturity amount calculated?',
      answer:
        'Each year, interest is added to the opening balance plus your deposit, then compounded yearly: balance = (previous balance + yearly deposit) × (1 + rate). This calculator uses a fixed 7.1% rate. Depositing ₹50,000 each year for 15 years gives a maturity amount of about ₹13.56 lakh on ₹7,50,000 invested.',
    },
    {
      question: 'What is the PPF interest rate and does this calculator update it?',
      answer:
        'The government notifies the PPF rate, which has been reviewed quarterly. This calculator uses a fixed 7.1% and does not fetch current rates, so your actual maturity value will differ if the rate changes. Check the current rate on the India Post or your bank website before relying on the figure.',
    },
    {
      question: 'What is the maximum amount I can invest in PPF each year?',
      answer:
        'The PPF limit has been ₹1.5 lakh per financial year, with a minimum of ₹500, but rules can change. If you invest ₹1,50,000 every year for 15 years at 7.1%, this calculator shows about ₹40.68 lakh. Confirm the current limit with your bank or post office.',
    },
    {
      question: 'Is PPF interest and maturity amount tax-free?',
      answer:
        'Under current Indian tax rules, PPF has generally been treated as tax-exempt at the deposit (subject to the old regime limits), interest and maturity stages, which is why it is called EEE. Tax laws change, so verify the current position. This calculator does not compute tax.',
    },
    {
      question: 'Can I extend PPF beyond 15 years?',
      answer:
        'Yes, a PPF account can generally be extended in blocks of 5 years after the initial 15-year term, with or without further contributions, subject to the current rules. The tenure slider runs from 15 to 50 years, so you can see how the balance keeps compounding after the first 15 years.',
    },
    {
      question: 'Why does my PPF balance differ from the calculator?',
      answer:
        'The calculator assumes the whole yearly deposit is made at the start of the year and a constant 7.1% rate. Real PPF interest is calculated monthly on the lowest balance between the 5th and month-end and credited yearly, and rates change. A deposit made later in the year will earn less.',
    },
  ],

  'epf-calculator': [
    {
      question: 'How is EPF corpus calculated?',
      answer:
        'Each month the calculator adds your 12% employee share and the 3.67% employer share of basic salary (plus DA) to the balance, then adds interest at 8.15% a year on a monthly basis. Salary grows by your chosen annual increment, and the corpus is projected up to retirement at age 58.',
    },
    {
      question: 'How much of my employer contribution goes to EPF?',
      answer:
        'Of the employer 12%, about 3.67% goes to your EPF account and the remaining 8.33% goes to the Employees Pension Scheme (EPS). This calculator credits 3.67% of basic salary to EPF. In practice, EPS is calculated on wages up to a ceiling, so your actual split may differ. Check your payslip and passbook.',
    },
    {
      question: 'What EPF interest rate does this calculator use?',
      answer:
        'It uses a fixed 8.15% a year. The EPF rate is declared by the government each financial year and can change, so it does not match every year. It also does not fetch live data, so compare with the latest rate declared by EPFO before relying on the projected corpus.',
    },
    {
      question: 'Which salary should I enter in the EPF calculator?',
      answer:
        'Enter your monthly basic salary plus dearness allowance (DA), since EPF contributions are based on that and not on your full CTC or gross pay. For example, if basic plus DA is ₹50,000, your employee contribution is 12% of it, which is ₹6,000 per month, before any increment.',
    },
    {
      question: 'What is the difference between EPF and PPF?',
      answer:
        'EPF is linked to employment: both you and your employer contribute a percentage of salary. PPF is a voluntary savings scheme you open yourself, with a yearly deposit limit and a 15-year term. Interest rates and tax rules differ for each. Use the EPF and PPF calculators to compare projections.',
    },
    {
      question: 'Does the EPF calculator include tax or withdrawals?',
      answer:
        'No. It projects a corpus assuming contributions continue every month until age 58, with no withdrawals, job gaps or tax. In real life, partial withdrawals, career breaks and tax rules on interest can change the result. Treat the figure as an estimate, not a guarantee.',
    },
  ],

  'retirement-calculator': [
    {
      question: 'How much money do I need to retire?',
      answer:
        'The calculator inflates your current monthly expenses to retirement age, then works out the corpus that can fund those expenses until your life expectancy, using a post-retirement return adjusted for inflation. For ₹40,000 a month today, age 30 to 60, 6% inflation and 8% post-retirement return, the target is about ₹5.45 crore.',
    },
    {
      question: 'How does the retirement calculator work out monthly savings?',
      answer:
        'It calculates the monthly saving that grows to your target corpus at your expected pre-retirement return: savings = corpus × r / ((1+r)^n − 1), where r is the monthly return and n is the months until retirement. In the default case, about ₹15,607 a month for 30 years at 12% reaches the target.',
    },
    {
      question: 'Why does inflation matter in retirement planning?',
      answer:
        'Inflation raises your living costs every year, so today\'s ₹40,000 a month will not cover the same lifestyle in 30 years. At 6% inflation, ₹40,000 becomes about ₹2.30 lakh a month at age 60. Ignoring inflation makes the target corpus much too small.',
    },
    {
      question: 'What return and life expectancy should I assume?',
      answer:
        'Use conservative, realistic assumptions. Markets are unpredictable, so a high pre-retirement return may not happen, and a low life expectancy risks running out of money. The defaults are 12% before retirement, 8% after retirement and life expectancy of 85. Try lower returns and a later age to see how sensitive the result is.',
    },
    {
      question: 'What is the difference between pre-retirement and post-retirement returns?',
      answer:
        'Pre-retirement return applies while you are saving and can be higher because you can take more market risk. Post-retirement return applies to the corpus while you are withdrawing money and is usually lower because safety matters more. The calculator uses each in a different step, so set them separately.',
    },
    {
      question: 'What does the retirement calculator not consider?',
      answer:
        'It does not include existing savings, EPF or pension income, taxes, healthcare shocks or changes in expenses at retirement. It also assumes steady returns and that expenses rise with inflation. Use it as a rough guide and consider seeking advice from a qualified financial planner.',
    },
  ],

  'gst-calculator': [
    {
      question: 'How do I calculate GST on a price?',
      answer:
        'To add GST: GST amount = price × rate ÷ 100, and total = price + GST. For a ₹10,000 item at 18%, GST is ₹1,800 and the total is ₹11,800. Enter the amount, choose or type a rate, and keep the Add GST (Exclusive) option on.',
    },
    {
      question: 'How do I calculate the original price from a GST-inclusive amount?',
      answer:
        'Switch off Add GST to treat your amount as GST-inclusive. The base price is inclusive amount ÷ (1 + rate ÷ 100), and GST is the inclusive amount minus the base price. For ₹11,800 at 18%, the base is ₹10,000 and GST is ₹1,800. Do not simply subtract 18% of ₹11,800, which would give a wrong answer.',
    },
    {
      question: 'What is the difference between CGST, SGST and IGST?',
      answer:
        'For a sale within one state, GST is split equally between the Centre (CGST) and the State (SGST), so 18% becomes 9% plus 9%. For a sale between states, the full amount is charged as IGST. The total GST is the same either way. The calculator shows the split and has an Interstate IGST option.',
    },
    {
      question: 'Which GST rate applies to my product or service?',
      answer:
        'The GST Council sets rates by product and service category, and it revises them from time to time, so check the current rate for your HSN or SAC code on the official GST portal or with your accountant. The calculator gives quick presets of 5%, 12%, 18% and 28% and lets you type any custom rate.',
    },
    {
      question: 'How do I calculate GST for multiple items or invoices?',
      answer:
        'Calculate each item at its own rate and add the results, because different items in one invoice can carry different rates. If everything is at the same rate, you can total the base prices first, then apply the rate once. The calculator handles one amount and rate at a time.',
    },
    {
      question: 'Is GST the same as input tax credit?',
      answer:
        'No. GST is the tax charged on a sale. Input tax credit (ITC) is a credit that registered businesses can claim for GST paid on purchases used for business, offsetting GST they collect on sales, subject to conditions. This calculator only works out the GST amount on a price and does not compute ITC.',
    },
  ],

  'income-tax-calculator': [
    {
      question: 'How is income tax calculated under the new tax regime?',
      answer:
        'Take gross income, subtract the standard deduction of ₹75,000, apply the slab rates to the taxable income, and add 4% health and education cess. For ₹15,00,000 gross, taxable income is ₹14,25,000, slab tax is ₹1,25,000 and cess is ₹5,000, so the total is ₹1,30,000, using the slabs coded in this tool.',
    },
    {
      question: 'Does this calculator cover the old tax regime?',
      answer:
        'No. It applies the new regime slabs for FY 2024-25 with the ₹75,000 standard deduction, and does not include old regime deductions such as 80C, HRA or home loan interest. It also does not add surcharge for very high incomes. Tax slabs change with each Budget, so verify against the current official rules.',
    },
    {
      question: 'What are the new regime tax slabs used here?',
      answer:
        'The tool uses: up to ₹3 lakh nil, ₹3-7 lakh 5%, ₹7-10 lakh 10%, ₹10-12 lakh 15%, ₹12-15 lakh 20% and above ₹15 lakh 30%, plus 4% cess. Slabs are revised in Union Budgets, so check the Income Tax Department website for the current financial year before filing.',
    },
    {
      question: 'What is the Section 87A rebate?',
      answer:
        'Section 87A is a rebate that can reduce your tax to zero if your taxable income is within a set limit. This calculator applies it when taxable income is ₹7,00,000 or less, in line with FY 2024-25. The limit has been revised in later Budgets, so check the current limit and your eligibility.',
    },
    {
      question: 'What is the difference between the old and new tax regime?',
      answer:
        'The old regime has higher slab rates but allows many deductions and exemptions, such as 80C, HRA, home loan interest and 80D. The new regime has lower slab rates and fewer deductions. Which one saves more depends on your deductions, so compare both, and note that this tool computes only the new regime.',
    },
    {
      question: 'Is the calculator result my final tax liability?',
      answer:
        'No, it is an estimate. It works from one gross income figure and does not include capital gains, other income, TDS already deducted, employer contributions, surcharge or advance tax. Use it for planning, and verify with your Form 16, the official e-filing portal or a chartered accountant.',
    },
  ],

  'salary-calculator': [
    {
      question: 'How do I calculate in-hand salary from CTC?',
      answer:
        'Divide annual CTC by 12 for monthly gross, then subtract the employee PF, professional tax and monthly income tax. For a ₹12,00,000 CTC, this tool shows gross ₹1,00,000, PF ₹6,000, professional tax ₹200 and income tax about ₹5,958, leaving about ₹87,842 in hand per month.',
    },
    {
      question: 'What salary structure does this calculator assume?',
      answer:
        'It assumes basic pay is 50% of monthly gross, HRA is 50% of basic (25% of gross), employee PF is 12% of basic, professional tax is a flat ₹200 when gross is above ₹15,000, and the remainder is other allowances. Your real payslip can differ, so use this as an estimate.',
    },
    {
      question: 'Why is my take-home salary less than CTC divided by 12?',
      answer:
        'CTC usually includes employer costs such as employer PF, gratuity, insurance and variable pay that do not reach you monthly. Your payslip also deducts employee PF, professional tax and TDS. This calculator treats CTC as gross salary and does not model employer-side items, so your real take-home may be lower.',
    },
    {
      question: 'Which tax regime does the salary calculator use?',
      answer:
        'It applies the new tax regime slabs with a ₹75,000 standard deduction and 4% cess, spread evenly across 12 months. It does not include old regime deductions, the Section 87A rebate or other tax-saving investments. Your employer\'s TDS may differ, so confirm with your payroll team.',
    },
    {
      question: 'What is the difference between gross salary and net salary?',
      answer:
        'Gross salary is your pay before deductions, including basic, HRA and allowances. Net salary, or take-home pay, is what remains after deductions such as PF, professional tax and income tax (TDS). In this calculator, gross is CTC ÷ 12 and net in-hand is gross minus those three deductions.',
    },
    {
      question: 'Is professional tax the same in every state?',
      answer:
        'No. Professional tax is levied by state governments, and some states do not charge it at all. Slabs and monthly amounts differ. This calculator uses a flat ₹200 per month when gross salary is above ₹15,000, so your actual deduction may vary by state.',
    },
  ],

  'hra-calculator': [
    {
      question: 'How is HRA exemption calculated?',
      answer:
        'The exempt HRA is the lowest of: actual HRA received, 50% of basic salary for metro cities (40% for non-metro), and rent paid minus 10% of basic salary. Example: basic ₹50,000, HRA ₹25,000, rent ₹20,000 in a metro. The three amounts are ₹25,000, ₹25,000 and ₹15,000 per month, so ₹15,000 is exempt and ₹10,000 is taxable.',
    },
    {
      question: 'Which cities count as metro for HRA?',
      answer:
        'This calculator treats Delhi, Mumbai, Kolkata and Chennai as metro cities, which qualify for the 50% limit. Other cities use 40%. City classifications for HRA are set by the tax rules and may be revised, so confirm the current list with the Income Tax Department or your employer.',
    },
    {
      question: 'Is HRA exemption available in the new tax regime?',
      answer:
        'No. The Section 10(13A) HRA exemption is generally available only under the old tax regime. Under the new regime, the HRA you receive is fully taxable. This calculator shows only the old regime exemption, so compare regimes before deciding which one to choose for the year.',
    },
    {
      question: 'What documents do I need to claim HRA?',
      answer:
        'Usually rent receipts or a rent agreement, your landlord\'s name and address, and the landlord\'s PAN if annual rent exceeds ₹1 lakh. Employers set their own proof deadlines, so submit the documents to your payroll team. You can also claim it while filing your return, if it was not claimed through your employer.',
    },
    {
      question: 'Which salary should I enter as basic in the HRA calculator?',
      answer:
        'Enter your monthly basic salary. If your pay includes dearness allowance that forms part of retirement benefits, it is generally included in salary for this purpose, so check your payslip and tax rules. This calculator uses the basic figure you type, so it does not add other allowances or bonuses.',
    },
    {
      question: 'Can I claim HRA if I pay rent to my parents?',
      answer:
        'Generally yes, if you actually pay rent to them, they own the house and they declare the rent as income in their tax return. You should keep proof of payment, such as bank transfers, and a rent agreement. Rules and scrutiny vary, so consult a tax professional for your situation.',
    },
  ],

  'compound-interest-calculator': [
    {
      question: 'What is the compound interest formula?',
      answer:
        'A = P × (1 + r/n)^(n×t), where P is the principal, r is the annual rate as a decimal, n is the number of compounding periods per year and t is the years. For ₹1,00,000 at 10% compounded yearly for 5 years, A is about ₹1,61,051, so the interest is about ₹61,051.',
    },
    {
      question: 'How does compounding frequency change the result?',
      answer:
        'More frequent compounding earns slightly more. For 100,000 at 10% for 5 years, yearly compounding gives about 161,051 and monthly gives about 164,531. The gap grows with higher rates and longer periods. This calculator lets you choose annual, bi-annual, quarterly, monthly or daily compounding.',
    },
    {
      question: 'What is the Rule of 72?',
      answer:
        'The Rule of 72 is a quick estimate of how long money takes to double under compound interest: years to double ≈ 72 ÷ annual rate in percent. At 8%, it is about 9 years, and at 12%, about 6 years. It is an approximation, so use the calculator for exact projections.',
    },
    {
      question: 'What is the difference between simple and compound interest?',
      answer:
        'Simple interest is earned only on the original principal, while compound interest is earned on the principal plus previously earned interest. For 100,000 at 10% over 5 years, simple interest gives 50,000 of interest but compound interest (yearly) gives about 61,051. The gap widens over time.',
    },
    {
      question: 'Can I add monthly contributions and tax in this calculator?',
      answer:
        'Yes. Besides the initial deposit, rate, years and compounding frequency, you can enter a monthly contribution and a tax rate on interest, which is deducted from each year\'s interest. It shows the final balance, total contributions, interest earned and tax paid, with a chart or year-by-year table view.',
    },
    {
      question: 'Why do results show dollars?',
      answer:
        'This calculator formats amounts in US dollars ($), but the maths is currency-neutral. If you use rupees, pounds or any other currency, read the figures in that currency, since the same numbers and percentages apply. Enter the rate in percent per year and choose the compounding that matches your account.',
    },
  ],

  'simple-interest-calculator': [
    {
      question: 'What is the simple interest formula?',
      answer:
        'Simple interest SI = P × R × T ÷ 100, where P is the principal, R is the annual rate in percent and T is the time in years. Total amount = P + SI. For ₹1,00,000 at 10% for 5 years, SI = 1,00,000 × 10 × 5 ÷ 100 = ₹50,000, and the total is ₹1,50,000.',
    },
    {
      question: 'How do I calculate simple interest for months or days?',
      answer:
        'Convert the time into years: months ÷ 12, or days ÷ 365. For ₹1,00,000 at 12% for 6 months, T = 0.5, so SI = 1,00,000 × 12 × 0.5 ÷ 100 = ₹6,000. This calculator takes time in whole years, so do this conversion yourself for shorter periods.',
    },
    {
      question: 'What is the difference between simple and compound interest?',
      answer:
        'Simple interest is calculated only on the original principal, so it grows by the same amount each year. Compound interest is calculated on the principal plus accumulated interest, so it grows faster. On ₹1,00,000 at 10% for 5 years, simple gives ₹1,50,000 while yearly compounding gives about ₹1,61,051.',
    },
    {
      question: 'How do I find the rate or time if I know the interest?',
      answer:
        'Rearrange the formula: R = SI × 100 ÷ (P × T) and T = SI × 100 ÷ (P × R). For example, if ₹1,00,000 earns ₹50,000 in 5 years, R = 50,000 × 100 ÷ (1,00,000 × 5) = 10% per year. The calculator computes the interest and total from principal, rate and time.',
    },
    {
      question: 'Where is simple interest used in real life?',
      answer:
        'It is used in some short-term loans, informal lending, certain bonds and school-level maths problems, where interest is not added back to the principal. Bank deposits and most EMI loans work differently: FDs generally compound, and loans charge interest on the reducing balance. Always check how the lender or bank calculates it.',
    },
    {
      question: 'Does this simple interest calculator show a yearly breakdown?',
      answer:
        'It shows the principal, the simple interest and the total amount, plus a chart of how the total amount and the interest grow each year over your chosen period of up to 30 years. Because the interest is simple, the line rises by the same amount every year.',
    },
  ],

  'currency-converter': [
    {
      question: 'How is currency conversion calculated?',
      answer:
        'This converter changes your amount into US dollars and then into the target currency: converted = amount ÷ rate of source × rate of target, with rates quoted per 1 USD. Using its built-in rate of 83.5 INR per USD, 100 USD is 8,350 INR. It also lists the amount in each other supported currency.',
    },
    {
      question: 'Are the exchange rates live?',
      answer:
        'No. The rates are fixed, indicative values stored in the tool, not live market rates, because the tool runs entirely in your browser without fetching data. Use it for rough estimates only, and check the current rate with your bank, card issuer or a live market source before making any transaction.',
    },
    {
      question: 'Which currencies does this converter support?',
      answer:
        'It supports eight currencies: US dollar (USD), Indian rupee (INR), euro (EUR), British pound (GBP), Japanese yen (JPY), Australian dollar (AUD), Canadian dollar (CAD) and Singapore dollar (SGD). You can convert between any two of them and see the amount in all the others at the same time.',
    },
    {
      question: 'How do I convert between two currencies that are not USD?',
      answer:
        'Divide the amount by the source currency rate per USD, then multiply by the target rate. This is called a cross rate. With this tool\'s rates of 0.92 EUR and 0.78 GBP per USD, 100 EUR is 100 ÷ 0.92 × 0.78, or about 84.78 GBP. The converter does this automatically.',
    },
    {
      question: 'Why is the rate my bank gives different from the converter?',
      answer:
        'Banks and money transfer services usually add a margin to the market (mid-market) rate and may charge fees, and rates move all day. Card networks, airports and exchange counters also differ. This converter shows an indicative rate only, so compare the final amount you receive, not just the rate.',
    },
    {
      question: 'What is the difference between the buying rate and the selling rate?',
      answer:
        'The buying rate is what a bank or exchange pays you when you sell foreign currency to it, and the selling rate is what it charges you when you buy foreign currency. The selling rate is higher, and the gap is its spread. This converter shows one indicative rate, not separate buy and sell rates.',
    },
  ],
};
