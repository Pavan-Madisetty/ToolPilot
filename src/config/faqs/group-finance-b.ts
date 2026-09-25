import type { FaqMap } from './types';

export const FAQS: FaqMap = {
  'inflation-calculator': [
    {
      question: 'How do you calculate the future value of money with inflation?',
      answer:
        'Future cost = current amount x (1 + inflation rate)^years. For example, ₹1,00,000 at 6% inflation for 10 years becomes 1,00,000 x 1.06^10, which is about ₹1,79,085. That is what you would need in the future to buy what ₹1,00,000 buys today.',
    },
    {
      question: 'How much will ₹1 lakh be worth after 10 years at 6% inflation?',
      answer:
        "Its buying power falls to about ₹55,839. The tool divides today's amount by (1 + rate)^years: 1,00,000 / 1.06^10 is roughly 55,839. The rupees are still there, but they buy only about 56% of what they buy today.",
    },
    {
      question: 'What is the difference between future value and purchasing power in this calculator?',
      answer:
        "Future value is the larger amount you would need later to buy the same goods you can buy today. Purchasing power is what today's amount will be worth in that future year's prices. They are two views of the same inflation rate, one multiplying and the other dividing.",
    },
    {
      question: 'What inflation rate should I use for long-term planning?',
      answer:
        'Use a rate that reflects your own costs, since inflation differs by country, period and category such as education or healthcare. The tool lets you pick 1% to 20%. Check your central bank or statistics office for recent figures, and try a few rates to see the range.',
    },
    {
      question: 'Why does inflation matter for savings kept in a bank account?',
      answer:
        'If your savings earn less than inflation, their real value shrinks. At 6% inflation, money earning 4% loses about 2% of buying power a year. Compare your interest rate with the inflation rate to judge your real return. This is general information, not financial advice.',
    },
    {
      question: 'Does this calculator predict actual future prices?',
      answer:
        'No. It assumes one constant inflation rate every year, which is a simplification. Real inflation moves up and down, and different goods rise at different speeds. Treat the result as an illustration of how compounding erodes money, not as a forecast.',
    },
  ],

  'budget-planner': [
    {
      question: 'How do I make a monthly budget using this budget planner?',
      answer:
        'Enter your monthly net (take-home) income, then set amounts for housing, food, utilities, transport and leisure. The tool adds the expenses, subtracts them from income and shows what is left as savings, plus a chart of where the money goes.',
    },
    {
      question: 'How is savings rate calculated in a budget?',
      answer:
        'Savings rate = (income - total expenses) / income x 100. With ₹80,000 income and ₹55,000 of expenses, savings are ₹25,000, which is a 31.3% savings rate. The planner shows this figure beside your net savings.',
    },
    {
      question: 'What is the 50/30/20 budget rule?',
      answer:
        'It is a popular guideline: about 50% of take-home pay for needs, 30% for wants and 20% for savings or debt repayment. It is a starting point, not a rule. You can compare your planner split with these shares and adjust for your city, income and goals.',
    },
    {
      question: 'Should I enter gross salary or take-home pay in a budget?',
      answer:
        'Use take-home (net) pay, the money that actually reaches your bank account after tax and deductions such as provident fund. Budgeting on gross salary overstates what you can spend and makes the savings figure look better than it really is.',
    },
    {
      question: 'What happens if my expenses are higher than my income?',
      answer:
        'This planner shows net savings as zero rather than a negative number, so check the expense total against income yourself. If expenses exceed income, trim the flexible categories such as leisure or food, or look for ways to raise income.',
    },
    {
      question: 'Which expenses are missing from a basic monthly budget?',
      answer:
        'Irregular costs are often forgotten: insurance premiums, school fees, festivals, travel, repairs and medical bills. This planner covers five categories, so spread yearly costs over twelve months and fold them into the closest category, such as utilities.',
    },
  ],

  'gratuity-calculator': [
    {
      question: 'How is gratuity calculated in India?',
      answer:
        'Gratuity = (15 x last drawn monthly salary x years of service) / 26. Salary means basic plus dearness allowance. For ₹50,000 and 5 years, it is 15 x 50,000 x 5 / 26, which is about ₹1,44,231. The 26 stands for working days in a month.',
    },
    {
      question: 'Who is eligible for gratuity under the Payment of Gratuity Act?',
      answer:
        'Generally an employee needs at least 5 years of continuous service with the employer, and it is payable on retirement, resignation, or termination. The 5-year condition is usually waived for death or disablement. Rules can change, so confirm with your HR or the current Act.',
    },
    {
      question: 'How are months of service rounded for gratuity?',
      answer:
        'The usual practice is that a part year of more than six months counts as a full year, and six months or less is ignored. This calculator simply rounds your years to the nearest whole number, so treat borderline cases such as exactly 6 months with care.',
    },
    {
      question: 'Is gratuity taxable?',
      answer:
        'Gratuity is exempt from tax up to a limit under Section 10(10) of the Income Tax Act, and the amount above the limit is taxable. This tool uses a ₹20,00,000 limit to show exempt and taxable parts. Limits and rules can change, so check the current Income Tax provisions.',
    },
    {
      question: 'Which salary is used to calculate gratuity: CTC, gross or basic?',
      answer:
        'It uses last drawn basic salary plus dearness allowance, not CTC or gross pay. Allowances such as HRA, bonus and special allowance are normally left out. Enter only basic plus DA in the tool, or the result will come out too high.',
    },
    {
      question: 'Why is 26 used in the gratuity formula instead of 30?',
      answer:
        'The Act treats a month as 26 working days, so a day of pay is monthly salary / 26. Fifteen days of that pay per year of service gives 15/26 of a month. Some employers not covered by the Act use a different basis, so check your appointment terms.',
    },
  ],

  'stock-average-calculator': [
    {
      question: 'How do you calculate the average price of a stock bought at different prices?',
      answer:
        'Average price = total money spent / total shares bought. If you buy 10 shares at ₹150 and 20 at ₹140, you spend ₹1,500 + ₹2,800 = ₹4,300 for 30 shares, so the average is about ₹143.33. Add one row per purchase in the tool.',
    },
    {
      question: 'Is the average price the same as the average of the buy prices?',
      answer:
        'No. It is weighted by quantity. The simple average of 150 and 140 is 145, but you bought more at 140, so your true average is 143.33. Always use total cost divided by total quantity, which is how this calculator works.',
    },
    {
      question: 'What does averaging down mean?',
      answer:
        'Averaging down means buying more of a stock after its price falls, which lowers your average cost. Buy 100 at ₹100 and 100 more at ₹60 and your average becomes ₹80. It does not lower risk, since the price can keep falling. This is not advice to buy.',
    },
    {
      question: 'What price does the stock need to reach for me to break even?',
      answer:
        'You break even when the selling price equals your average buy price, before charges. Brokerage, taxes and other costs raise the true break-even a little, so add those separately, for example with a brokerage calculator.',
    },
    {
      question: 'Does this calculator include brokerage and charges in the average?',
      answer:
        'No. It uses only quantity times price for each buy row. If you want charges in your cost, add them to the price per share yourself or work them out separately. Your broker statement will show the exact cost basis for tax purposes.',
    },
    {
      question: 'Can I use this average price calculator for mutual funds or crypto?',
      answer:
        'Yes, the arithmetic is the same for anything bought in several lots: total spent divided by total units. Enter units as quantity and price as the price per unit. The price field is labelled in ₹, so use the same currency for all lots.',
    },
  ],

  'brokerage-calculator': [
    {
      question: 'How is brokerage calculated for stock trading?',
      answer:
        'Brokerage is normally a percentage of the trade value or a flat fee, depending on your broker. This tool assumes the lower of 0.05% of turnover or ₹20 on each buy and sell. Your broker may charge differently, so check its brokerage plan.',
    },
    {
      question: 'What charges does this brokerage calculator include?',
      answer:
        'Brokerage, STT, exchange transaction charges, SEBI charges, stamp duty and GST on brokerage plus exchange charges. It does not include depository (DP) charges or capital gains tax. All the rates used are fixed assumptions in the tool.',
    },
    {
      question: 'What is the difference between delivery and intraday charges?',
      answer:
        'Delivery means holding shares beyond the day, and intraday means squaring off the same day. In this tool, delivery STT is 0.1% on buy and sell, while intraday STT is 0.025% on the sell side only. Stamp duty is also lower for intraday.',
    },
    {
      question: 'What is STT in share trading?',
      answer:
        'STT is Securities Transaction Tax, a tax charged by the government on trades on recognised exchanges. It is collected through your broker on top of brokerage. The rate depends on the trade type and can change, so check the current official rate.',
    },
    {
      question: 'How much are total charges on a ₹1,000 buy and ₹1,100 sell of 100 shares?',
      answer:
        'For delivery, this tool gives total charges of about ₹280, of which STT is ₹210. Gross profit of ₹10,000 becomes net profit of about ₹9,720. As intraday, the same trade costs only about ₹86 in charges under the tool assumptions.',
    },
    {
      question: 'Why does my broker contract note show different charges from this calculator?',
      answer:
        'Brokers differ in brokerage plans, and exchange charges, STT and stamp duty rates are revised from time to time. The tool uses fixed assumptions and covers only equity delivery and intraday. Treat it as an estimate, and rely on your contract note.',
    },
  ],

  'tip-calculator': [
    {
      question: 'How do I calculate a tip on a restaurant bill?',
      answer:
        'Tip = bill amount x tip percentage / 100. On a $100 bill, a 15% tip is $15, so the total is $115. Enter the bill, choose a percentage, and the calculator shows the tip and the total with tip.',
    },
    {
      question: 'How much should I tip at a restaurant?',
      answer:
        'Customs differ by country. In the United States 15% to 20% is common for table service, while in many other places tipping is smaller or optional. Some restaurants add a service charge already. The tool offers 10, 15, 18, 20 and 25 percent buttons, plus a custom field.',
    },
    {
      question: 'How do I split a bill and a tip evenly between friends?',
      answer:
        'Add the tip to the bill, then divide by the number of people. For a $100 bill with a 15% tip split 2 ways, each person pays $115 / 2 = $57.50. Set the number of people and the tool shows each share and each personal tip.',
    },
    {
      question: 'Should I tip on the pre-tax or the after-tax amount?',
      answer:
        'Both are common, and neither is wrong. Tipping on the pre-tax subtotal gives a smaller tip. This calculator applies the percentage to whatever bill amount you enter, so enter the subtotal or the total, depending on which you prefer.',
    },
    {
      question: 'How can I quickly work out a 15% or 20% tip in my head?',
      answer:
        'For 10%, move the decimal point one place left. For 20%, double that. For 15%, take 10% and add half of it. On $64, 10% is $6.40, 20% is $12.80, and 15% is $6.40 + $3.20 = $9.60.',
    },
    {
      question: 'Does the tip calculator work in other currencies?',
      answer:
        'The arithmetic works for any currency, since a percentage is the same everywhere. However, the tool labels and formats amounts in US dollars. Just enter the number from your own bill and read the result as your local currency.',
    },
  ],

  'bill-splitter': [
    {
      question: 'How do you split a bill with tax and tip evenly?',
      answer:
        'Total = bill + tip + tax, then divide by the number of people. With a $120 bill, 15% tip ($18) and 8% tax ($9.60), the total is $147.60, so 4 people each pay $36.90. The splitter shows each of these amounts.',
    },
    {
      question: 'Does the bill splitter divide the bill equally or by custom shares?',
      answer:
        'It divides the total equally among everyone. It does not assign different shares per person. If someone ordered more, split their part out first, and run the remaining shared items through the calculator for everyone else.',
    },
    {
      question: 'How is the tip calculated in this bill splitter?',
      answer:
        'Both tip and sales tax are calculated as percentages of the bill amount you enter, not one on top of the other. So tip is bill x tip% and tax is bill x tax%. Enter the pre-tax subtotal as the bill amount if you want a pre-tax tip.',
    },
    {
      question: 'What is the difference between a bill splitter and a tip calculator?',
      answer:
        'A tip calculator focuses on the tip and the total after tip. A bill splitter also adds sales tax and divides the final total between people. Use the splitter when tax matters, and the tip calculator for a quick tip on a single amount.',
    },
    {
      question: 'How do I split a bill fairly when some people ordered more?',
      answer:
        'An equal split is simplest but can feel unfair. A fairer way is to give each person their own items plus an equal share of shared dishes, tax and tip. This tool splits equally, so use it for the shared part or for groups that agree to split evenly.',
    },
    {
      question: 'What if the bill does not divide evenly into cents?',
      answer:
        'The per-person amount is rounded for display to two decimals. For example, $100 divided by 3 shows $33.33, so three payments come to $99.99. Someone can round up by a cent, or the tip can absorb the difference.',
    },
  ],

  'expense-tracker': [
    {
      question: 'How do I track my daily expenses with this expense tracker?',
      answer:
        'Type an expense name, the amount in ₹, choose a category and click Add Expense. Each entry is added to the log and the total is updated. You can delete any entry from the list if you make a mistake.',
    },
    {
      question: 'Which expense categories are available?',
      answer:
        'There are five: Food and Groceries, Housing and Rent, Bills and Utilities, Transport and Fuel, and Other Miscellaneous. Each entry is tagged with its category in the log, and the total covers all entries.',
    },
    {
      question: 'Are my expenses saved if I close or refresh the page?',
      answer:
        'The tracker keeps entries in the open page and does not send them to a server. Do not rely on it as a permanent record. Note down your totals elsewhere before closing or reloading the page, since the list may reset.',
    },
    {
      question: 'What is the difference between an expense tracker and a budget planner?',
      answer:
        'An expense tracker records what you actually spent, item by item. A budget planner sets what you plan to spend against your income. Using both lets you compare plan and reality, and see where your spending drifts from the plan.',
    },
    {
      question: 'How often should I record my expenses?',
      answer:
        'Recording daily, or at least weekly, works best because small purchases are easy to forget. Adding entries soon after paying keeps the log accurate. At the end of the month, compare the total with your planned budget.',
    },
    {
      question: 'What is the best way to reduce spending after tracking expenses?',
      answer:
        'Look at the biggest entries and at frequent small ones first. Fixed costs such as rent are hard to cut, so start with flexible categories like food delivery or impulse buys. Setting a monthly target per category makes progress easy to measure.',
    },
  ],

  'savings-planner': [
    {
      question: 'How much do I need to save every month to reach a savings goal?',
      answer:
        'Monthly deposit = goal x r / ((1 + r)^n - 1), where r is the monthly rate and n is the number of months. To reach ₹10,00,000 in 10 years at 8% a year, you need about ₹5,466 a month. Enter goal, years and rate in the planner.',
    },
    {
      question: 'Does the savings planner assume deposits at the start or end of the month?',
      answer:
        'It assumes deposits at the end of each month (an ordinary annuity), with interest compounded monthly at the annual rate divided by 12. Depositing at the start of each month would earn slightly more, so your real result could differ a little.',
    },
    {
      question: 'How much of my savings goal comes from interest?',
      answer:
        'It depends on the rate and time. In the ₹10,00,000, 10-year, 8% example, deposits are about ₹6.56 lakh and interest about ₹3.44 lakh. The longer the period, the larger the interest share, because earlier deposits keep compounding.',
    },
    {
      question: 'What interest rate should I enter in a savings planner?',
      answer:
        'Use a rate you can reasonably expect from where you will keep the money, such as a bank deposit, and be cautious. Rates change over time and market-linked returns are not guaranteed. Try a lower rate as well to see the effect on the deposit.',
    },
    {
      question: 'Is it better to save for a goal for longer or to save more each month?',
      answer:
        'Saving for longer usually needs a much smaller monthly amount because of compounding. At 8%, ₹10 lakh needs about ₹5,466 a month over 10 years, but about ₹2,000 a month over 20 years. Try different years in the planner to compare.',
    },
    {
      question: 'Does the savings planner include inflation or tax?',
      answer:
        'No. It shows the nominal amount needed and ignores inflation and taxes on interest. In the future, prices will be higher, so a goal may need a bigger target. Use the inflation calculator to adjust your target amount first.',
    },
  ],

  'net-worth-calculator': [
    {
      question: 'How do you calculate net worth?',
      answer:
        'Net worth = total assets - total liabilities. If your assets are ₹18,50,000 (cash, investments, property and other) and your loans and dues are ₹6,70,000, your net worth is ₹11,80,000. Enter each item in the calculator to see this figure.',
    },
    {
      question: 'What counts as an asset and what counts as a liability?',
      answer:
        'Assets are things you own that have value: cash, bank balances, investments, property, vehicles and jewellery. Liabilities are what you owe: home loan, other loans, credit card dues and other bills. The tool has four fields for each.',
    },
    {
      question: 'Can net worth be negative?',
      answer:
        'Yes. If your liabilities exceed your assets, the net worth is negative, which is common early in life with education loans or a new mortgage. What matters is the direction: growing assets and shrinking debt push the number up over time.',
    },
    {
      question: 'What is the debt-to-asset ratio shown in the net worth calculator?',
      answer:
        'It is total liabilities divided by total assets, shown as a percentage. With ₹6,70,000 of liabilities against ₹18,50,000 of assets, it is about 36.2%. A lower ratio means less of what you own is financed by debt.',
    },
    {
      question: 'Should I include my house and car in my net worth?',
      answer:
        'Usually yes, at a realistic current market value, and include the matching loan as a liability. Cars lose value quickly, so use a resale value rather than the purchase price. Many people also track net worth without the home they live in.',
    },
    {
      question: 'How often should I recalculate my net worth?',
      answer:
        'Once or twice a year is enough for most people, or every quarter if you actively invest. Use the same method each time so the numbers are comparable. Note that investment and property values move, so the figure is an estimate.',
    },
  ],

  'gold-investment-calculator': [
    {
      question: 'How do I calculate my return on gold investment?',
      answer:
        'Profit = (sell price - buy price) x grams. Buying 10 g at ₹6,000 a gram and selling at ₹7,500 gives ₹75,000 - ₹60,000 = ₹15,000. Enter grams, your buy and sell prices per gram, and how long you held the gold.',
    },
    {
      question: 'How is the annual return (CAGR) on gold calculated?',
      answer:
        'CAGR = (final value / initial value)^(1 / years) - 1. Gold that goes from ₹60,000 to ₹75,000 in 3 years grows by (1.25)^(1/3) - 1, which is about 7.72% a year. The calculator shows this as the annualised return.',
    },
    {
      question: 'Does the gold calculator use live gold prices?',
      answer:
        'No. It does not fetch prices. You enter the buy and sell price per gram yourself, for example from a jeweller bill or a price you expect. Rates change every day, so use your actual purchase price.',
    },
    {
      question: 'Does the calculator include making charges, GST or tax?',
      answer:
        'No. It uses only the per-gram prices you enter. Jewellery usually has making charges and GST that you cannot recover on resale, and capital gains tax may apply on profit. Add those to your buy price manually and check the current tax rules.',
    },
    {
      question: 'Is gold a good hedge against inflation?',
      answer:
        'Gold has often kept value over long periods, but its price can stay flat or fall for years, so it is not guaranteed to beat inflation. Use the tool with your own numbers to compare its CAGR with the inflation rate. This is not investment advice.',
    },
    {
      question: 'What is the difference between absolute return and CAGR for gold?',
      answer:
        'Absolute return is the total gain over the whole holding period, such as 25% in the example. CAGR spreads that gain into an average yearly rate, about 7.72% for 3 years. Use CAGR to compare gold with investments held for different lengths of time.',
    },
  ],

  'crypto-profit-calculator': [
    {
      question: 'How do I calculate crypto profit or loss?',
      answer:
        'Coins bought = investment / buy price. Sale value = coins x sell price. Profit = sale value - investment. Investing ₹50,000 at ₹40,00,000 a coin gives 0.0125 coins, worth ₹56,250 at ₹45,00,000, so the gross profit is ₹6,250.',
    },
    {
      question: 'How is crypto taxed in India in this calculator?',
      answer:
        'The tool applies a flat tax rate, 30% by default, to any profit on the sale, with no deduction except the buy cost. On the ₹6,250 profit, that is ₹1,875 tax and ₹4,375 net. Rules such as surcharge and cess are not modelled, so check the current law.',
    },
    {
      question: 'What is 1% TDS on crypto and is it included?',
      answer:
        'India has a 1% TDS on the sale value of virtual digital assets, and the tool mentions it. It is not deducted in the results, and it is not an extra tax, because it can be adjusted against your final tax liability. Check the current Income Tax rules.',
    },
    {
      question: 'Can I set off crypto losses against other gains?',
      answer:
        'The tool notes that under Indian rules a loss on one crypto asset cannot be set off against gains from another. When the sale price is below the buy price, the calculator shows zero tax and a negative net result. Confirm with a tax professional.',
    },
    {
      question: 'Does the crypto profit calculator include exchange fees?',
      answer:
        'No. It only uses your buy price, sell price and investment, so trading fees, network fees and spreads are not deducted. Real profit will be lower than shown. For accuracy, add fees into your buy price or reduce your sell price.',
    },
    {
      question: 'Are crypto returns guaranteed?',
      answer:
        'No. Crypto prices are volatile and you can lose part or all of your money. The calculator only does the arithmetic on prices you enter. It does not fetch live prices or predict them, and this is not investment advice.',
    },
  ],

  'subscription-tracker': [
    {
      question: 'How do I calculate the total cost of my monthly subscriptions?',
      answer:
        'Add up all monthly fees and add each annual fee divided by 12. For example, ₹649 + ₹119 monthly plus a ₹1,499 yearly plan (about ₹125 a month) comes to about ₹893 a month. The tracker does this for you.',
    },
    {
      question: 'How do I find out what my subscriptions cost per year?',
      answer:
        'Multiply each monthly fee by 12 and add the annual fees as they are. ₹649 a month costs ₹7,788 a year, so the full example (₹649 + ₹119 monthly, ₹1,499 annual) is ₹10,715 a year. The tool shows both totals.',
    },
    {
      question: 'Is an annual plan cheaper than paying monthly?',
      answer:
        'Often, but check the numbers. Divide the annual price by 12 and compare it with the monthly price. A ₹1,499 yearly plan is about ₹125 a month. It only saves money if you will actually use the service for the whole year.',
    },
    {
      question: 'Can I add annual and monthly subscriptions together?',
      answer:
        'Yes. Choose Monthly or Annual as the billing cycle for each entry. The tracker converts everything into a monthly equivalent and a yearly equivalent, and shows both for each subscription in the breakdown table.',
    },
    {
      question: 'How can I find forgotten subscriptions?',
      answer:
        'Check your bank and card statements and your phone app-store subscriptions for recurring charges, and search your email for receipts. Add each one here to see the total, then cancel those you no longer use.',
    },
    {
      question: 'Does this tracker remind me before renewals or include tax?',
      answer:
        'No. It does not send reminders, track renewal dates or add GST. It totals the costs you type in. Enter the final price you are actually charged so the totals reflect what leaves your account.',
    },
  ],

  'credit-card-emi': [
    {
      question: 'How is credit card EMI calculated?',
      answer:
        'EMI = P x r x (1 + r)^n / ((1 + r)^n - 1), where P is the amount, r is the monthly rate (annual rate / 12) and n is the number of months. For ₹50,000 at 18% for 12 months, the EMI is about ₹4,584.',
    },
    {
      question: 'How much interest will I pay on a ₹50,000 credit card EMI at 18%?',
      answer:
        'Over 12 months you repay about ₹55,008 in total, so the interest is about ₹5,008. Adjust the rate and tenure in the calculator. A longer tenure lowers the monthly EMI but raises the total interest.',
    },
    {
      question: 'Are processing fees and GST included in this EMI calculation?',
      answer:
        'No. The tool computes interest only. Many banks add a processing fee and 18% GST on the fee and on interest, which raises your real cost. Check your card issuer terms for the exact charges before you convert.',
    },
    {
      question: 'Is credit card EMI better than paying the full amount?',
      answer:
        'Paying the full statement amount on time avoids interest, so it is cheaper. EMI helps only if you cannot pay at once. The calculator shows the total interest you would pay by choosing EMI, which is the cost of spreading the payment.',
    },
    {
      question: 'What is the difference between credit card EMI and a personal loan?',
      answer:
        'Both use the same EMI formula, but rates and fees differ. Card EMI rates may be higher than personal loan rates and often carry a processing fee, while a loan may need a fresh application. Compare the total cost, not just the EMI.',
    },
    {
      question: 'Does the calculator show a month-by-month breakdown?',
      answer:
        'Yes. A chart shows how much of each month payment is principal and how much is interest, and an amortization table below lists each month. Early EMIs carry more interest, and the principal share rises as the balance falls.',
    },
  ],

  'mutual-fund-calculator': [
    {
      question: 'How is SIP return calculated?',
      answer:
        'Maturity value = P x [((1 + i)^n - 1) / i] x (1 + i), where P is the monthly amount, i is the annual rate / 12 and n is the number of months. ₹5,000 a month at 12% for 10 years gives about ₹11.62 lakh on ₹6 lakh invested. Market returns are not guaranteed.',
    },
    {
      question: 'How do I calculate the future value of a lump sum mutual fund investment?',
      answer:
        'Future value = amount x (1 + annual return)^years. ₹1,00,000 at 12% for 10 years becomes 1,00,000 x 1.12^10, which is about ₹3,10,585. Choose Lump Sum in the calculator, enter the amount, expected return and tenure.',
    },
    {
      question: 'SIP vs lump sum: which is better?',
      answer:
        'Neither is always better. A SIP spreads money over many months, which suits regular income and averages out price swings. A lump sum can grow more if the market rises soon after, but it faces more timing risk. Use the tool to compare both.',
    },
    {
      question: 'What return rate should I enter for a mutual fund calculator?',
      answer:
        'The rate is your assumption, not a promise. Past returns do not guarantee future returns, and equity, debt and hybrid funds behave differently. A conservative rate gives a safer estimate, so try a few rates to see the range of outcomes.',
    },
    {
      question: 'Does the mutual fund calculator include expense ratio, exit load and tax?',
      answer:
        'No. The result is a gross estimate using one constant rate, so expense ratio, exit load and capital gains tax are not deducted. If you enter a rate net of the expense ratio, the result is closer to reality.',
    },
    {
      question: 'Why does the SIP result assume monthly compounding but lump sum yearly?',
      answer:
        'In SIP mode, the annual rate is divided by 12 and applied monthly to each instalment, invested at the start of the month. In lump sum mode, the rate compounds once a year. Because of these methods, the two modes are not exactly comparable at the same rate.',
    },
  ],

  'loan-comparison': [
    {
      question: 'How do I compare two loan offers?',
      answer:
        'Compare the monthly EMI, the total interest and the total repayment for each loan, not just the rate. Enter amount, rate and tenure for Loan A and Loan B, and the tool shows the difference in EMI, interest and total cost, with a chart.',
    },
    {
      question: 'How much difference does a 0.7% higher interest rate make on a 15-year loan?',
      answer:
        'On ₹20,00,000 over 15 years, 8.5% gives an EMI of about ₹19,695, while 9.2% gives about ₹20,524. The higher rate costs about ₹830 more a month and roughly ₹1.49 lakh more in total.',
    },
    {
      question: 'Is a lower EMI always the better loan?',
      answer:
        'No. A lower EMI often comes from a longer tenure, which increases total interest. Compare total repayment as well. The tool shows both, so you can see the trade-off between an affordable monthly payment and the overall cost.',
    },
    {
      question: 'Does the loan comparison tool include processing fees and prepayment charges?',
      answer:
        'No. It calculates EMI and interest from the amount, rate and tenure only. Processing fees, insurance, foreclosure or prepayment charges are not included, so add them yourself when comparing the true cost of each offer.',
    },
    {
      question: 'Can I compare loans with different amounts or tenures?',
      answer:
        'Yes. Each loan has its own amount, rate and tenure sliders, so you can compare, for example, 15 years against 20 years. Total interest can differ a lot when the tenures differ, so read the total repayment figure too.',
    },
    {
      question: 'How many loans can I compare at once?',
      answer:
        'The tool compares two options side by side, Loan A and Loan B. To compare more offers, run them in pairs, keep the best one as Loan A, and swap the challenger into Loan B each time.',
    },
  ],

  'lumpsum-calculator': [
    {
      question: 'How do I calculate the future value of a lump sum investment?',
      answer:
        'Future value = principal x (1 + annual rate)^years. ₹5,00,000 at 12% for 10 years becomes 5,00,000 x 1.12^10, which is about ₹15,52,924, so the estimated gain is about ₹10,52,924. The calculator also charts the yearly growth.',
    },
    {
      question: 'How does compounding affect a lump sum investment?',
      answer:
        'Each year you earn returns on the earlier returns, so growth speeds up. In this tool, ₹5,00,000 at 12% reaches about ₹8.81 lakh in 5 years but about ₹15.53 lakh in 10 years, so the second five years add far more than the first five.',
    },
    {
      question: 'What is the difference between lumpsum and SIP?',
      answer:
        'A lump sum is a single one-time investment, while a SIP invests a fixed amount every month. A lump sum has all its money working from day one. A SIP spreads the entry over time. The best choice depends on when your money is available.',
    },
    {
      question: 'Are the lump sum calculator results guaranteed?',
      answer:
        'No. The tool assumes a constant rate every year, but real market returns vary and can be negative in some years. Use it for planning and illustration only. The estimated returns exclude taxes, fees and inflation.',
    },
    {
      question: 'How long does it take for a lump sum to double?',
      answer:
        'A quick estimate is the Rule of 72: years to double is about 72 divided by the annual return. At 12%, that is about 6 years. Compounding exactly at 12% gives 1.12^6 = 1.97, so it is a little short of double after 6 years.',
    },
    {
      question: 'Does this lump sum calculator compound yearly or monthly?',
      answer:
        'It compounds once a year at the rate you enter, using future value = amount x (1 + rate)^years. If your investment compounds more often, such as monthly, the real result would be slightly higher at the same nominal rate.',
    },
  ],

  'swp-calculator': [
    {
      question: 'What is a Systematic Withdrawal Plan (SWP)?',
      answer:
        'An SWP lets you withdraw a fixed amount from an investment at regular intervals, usually monthly, while the rest stays invested. This calculator models that: it adds a month of growth to the balance, then takes out your withdrawal.',
    },
    {
      question: 'How long will my corpus last with an SWP?',
      answer:
        'It depends on the corpus, the withdrawal, and the return. For ₹50,00,000 at 8% with ₹50,000 withdrawn monthly, the money lasts about 13 years and 10 months. The tool reports how many months the balance lasts.',
    },
    {
      question: 'How much can I withdraw every month without touching the principal?',
      answer:
        'If withdrawals are no more than the monthly growth, the principal stays intact. At 8% a year, ₹50,00,000 earns about ₹33,333 in the first month (5,000,000 x 0.08 / 12). That holds only if returns are steady, which markets do not guarantee.',
    },
    {
      question: 'What is the difference between SWP and SIP?',
      answer:
        'A SIP puts money into an investment regularly to build a corpus. An SWP takes money out regularly from an existing corpus to provide income. They are opposite flows, and people often use a SIP while earning and an SWP after retirement.',
    },
    {
      question: 'Does the SWP calculator include tax, inflation or fund charges?',
      answer:
        'No. It assumes a constant return and a fixed withdrawal, and ignores tax on gains, inflation and expense ratio. In practice, part of each withdrawal may be taxed as capital gains, so check the current tax rules.',
    },
    {
      question: 'What happens when the corpus runs out?',
      answer:
        'The tool shows a warning with the number of years and months your money lasts, and the last withdrawal is limited to what is left. You can lower the monthly amount, raise the corpus, or shorten the period until the balance lasts.',
    },
  ],

  'cagr-calculator': [
    {
      question: 'How do you calculate CAGR?',
      answer:
        'CAGR = (ending value / beginning value)^(1 / years) - 1. An investment growing from ₹1,00,000 to ₹2,50,000 in 5 years has 2.5^(0.2) - 1, which is about 20.11% a year. Enter both values and the years in the calculator.',
    },
    {
      question: 'What is the difference between CAGR and absolute return?',
      answer:
        'Absolute return is the total percentage gain: (end - begin) / begin. In the example above it is 150%. CAGR converts that into a smoothed yearly rate, 20.11%. CAGR lets you compare investments held for different lengths of time.',
    },
    {
      question: 'Is CAGR the same as the average annual return?',
      answer:
        'No. A simple average adds yearly returns and divides by the years, ignoring compounding. CAGR is the single constant rate that would grow the starting value to the ending value. It is usually lower than the simple average when returns are volatile.',
    },
    {
      question: 'Why does the CAGR calculator say to enter valid values?',
      answer:
        'CAGR needs a beginning value, an ending value and a number of years that are all above zero, because it takes a ratio and a fractional power. A zero or negative value has no meaningful CAGR, so the tool asks you to correct it.',
    },
    {
      question: 'Can I use CAGR for SIPs or investments with several deposits?',
      answer:
        'Not accurately. CAGR assumes a single starting amount and no additions or withdrawals in between. For regular investments such as SIPs, a return measure that accounts for the timing of each cash flow, like XIRR, is more appropriate.',
    },
    {
      question: 'Does CAGR show how risky an investment was?',
      answer:
        'No. CAGR only reflects the start and end values, hiding the ups and downs in between. Two investments can share a CAGR of 12% while one fell sharply along the way. Past CAGR also does not guarantee future returns.',
    },
  ],
};
