import { Abstract, Correspondence, Fig, H2, H3, Link, Paper, Para, PieFigure, Table, TitleBlock } from '@/components/paper/Paper'
import { LINKS } from '@/content/links'

export default function LumoraPaper() {
  return (
    <Paper
      id="lumora"
      sheets={[
        <>
          <TitleBlock id="lumora" kicker="The playground" tags="Vibe coded · 1 week" />
          <Abstract cta={<Link href={LINKS.lumoraDemo}>Try the demo</Link>}>
            This is a demo that I’ve built using ChatGPT &amp; Figma’s vibe coding tool Figma Make in a week. None of the designs showcased
            are designed by me manually, I’ve simply guided the AI agent to create designs as per the product’s requirements.
          </Abstract>
          <Fig
            n={1}
            src="lumora-fig1.webp"
            w={1400}
            h={467}
            eager
            alt="Three Lumora screens: a landing page reading ‘Clarity for every financial decision’, a dashboard showing total wealth, and the AI advisor chat"
          >
            Lumora: the landing page, the dashboard, and the AI advisor.
          </Fig>
          <H2 n="1">Problem statement &amp; market gap</H2>
          <p>
            Access to quality financial guidance tailored to an individual’s income, liabilities, assets, and life goals often requires
            expertise that is out of reach for the average middle-class person.
          </p>
          <p>
            While platforms like YouTube and online courses offer valuable principles and general best practices, they fall short when it
            comes to applying those insights to the user’s real-world financial context.
          </p>
          <p>
            This gap between generic advice and contextual decision-making often leads to suboptimal financial choices, increasing financial
            stress, and long-term burden ultimately limiting people from living their lives with true financial freedom and confidence.
          </p>
        </>,
        <>
          <H2 n="2">Market research</H2>
          <Para>How many people fall into the trap of bad loans since they didn’t understand the terms?</Para>
          <p>
            ~60% of indebted borrowers in one large sample were unable to repay loans (struggling or defaulting). This suggests financial
            illiteracy and opaque terms &amp; conditions contribute to higher bad-loan rates.
          </p>
          <Para>How many people have no idea how to best use their credit cards?</Para>
          <p>
            Only 34% of Indian credit-card users in a survey were literate about card terms, implying 66% of the ~77 million cardholders
            (≈50.8 million people) have significant knowledge gaps about how to use cards responsibly.
          </p>
          <Para>How many people still don’t know how to manage their finances?</Para>
          <p>
            Only 27% of adults in RBI’s NCFE survey qualified as “financially literate”, meaning about 73% (≈1.04 billion people) likely
            lack skills like budgeting and saving. Corroborating this, a Times of India poll found only 57.6% of respondents budgeted and
            tracked expenses regularly.
          </p>
          <PieFigure
            n={2}
            pies={[
              { value: 60, label: 'Struggling to pay or defaulting', rest: 'Paying back loans in a timely manner' },
              {
                value: 66,
                label: 'Not literate enough to benefit from a credit card',
                rest: 'Know how to use credit cards well enough to benefit from it',
              },
              {
                value: 73,
                label: 'Not financially literate & lack skills like budgeting and saving',
                rest: 'Qualified as “financially literate” in RBI’s NCFE survey',
              },
            ]}
          >
            (a) Indebted borrowers and their loans. (b) Indian credit-card users. (c) Adults in RBI’s NCFE survey.
          </PieFigure>
        </>,
        <>
          <H2 n="3">Solution philosophy</H2>
          <p>
            Lumora is an AI-powered financial advisor that combines advanced intelligence with a deep understanding of a user’s complete
            financial health including investments, assets, liabilities, loans, insurance, dependents, expenses, and lifestyle choices.
          </p>
          <p>
            By integrating this contextual understanding with proven financial principles, Lumora delivers highly personalized, actionable
            guidance that helps users make smarter decisions and build long-term financial well-being.
          </p>
          <H2 n="4">Product features</H2>
          <p>Up next are a few features that I built into this AI generated demo to provide the user with holistic financial advice.</p>
          <H3 n="4.1">Portfolio Insights, showcasing impact of real world activities</H3>
          <Fig
            n={3}
            src="lumora-insights.webp"
            w={1200}
            h={694}
            width={80}
            alt="Portfolio insight cards over the portfolio view, each naming an asset, the insight and a suggestion"
          >
            Portfolio Insights: market events, each tied to an asset the user holds.
          </Fig>
          <p>
            The Portfolio Insights section surfaces real-world events such as geopolitical conflicts, changes in taxation policies,
            regulatory updates, or industry-wide legal shifts and translates them into clear, actionable implications for the user’s
            portfolio.
          </p>
          <p>
            It helps users understand not just what is happening in the world, but how those events could directly impact their investments
            and financial decisions.
          </p>
        </>,
        <>
          <H3 n="4.2">Loan threat analyser, protect yourself against unfair loan terms</H3>
          <Fig
            n={4}
            src="lumora-loan.webp"
            w={1200}
            h={694}
            width={80}
            alt="Loan risk analysis showing a threat score of 85, a risk breakdown, and a cost and optimisation panel"
          >
            The Loan Threat Analyser: a risk score for the loan, what drives it, and what it really costs.
          </Fig>
          <p>
            The Loan Threat Analyser is one of the key tools within the application designed to help users evaluate the true long-term
            impact of borrowing decisions. It ensures users don’t unknowingly commit to loans that could lead to unsustainable debt or
            financial strain over time.
          </p>
          <H3 n="4.3">My benefits, ensure you utilise all your assets to the fullest</H3>
          <Fig
            n={5}
            src="lumora-benefits.webp"
            w={1200}
            h={694}
            width={80}
            alt="My Benefits screen listing unused lounge access, a free health check-up and credit card usage tips, with an offer to unlock credit against investments"
          >
            My Benefits: perks from the user’s own cards, policies and investments.
          </Fig>
          <p>Most users are often unaware of the full range of benefits available to them when they actually need them.</p>
        </>,
        <>
          <p>
            This module helps bridge that gap by surfacing and explaining the various perks users can access through their credit cards,
            insurance policies, and investment portfolios - such as lounge access, e-commerce discounts, preventive health check-ups, and
            loans against assets.
          </p>
          <p>
            By combining this information with a user’s spending patterns and financial behaviour, the system can deliver more relevant,
            personalised recommendations that help them unlock real, often overlooked value from their existing financial ecosystem.
          </p>
          <H3 n="4.4">AI Chat, ask queries and get context rich responses</H3>
          <Fig
            n={6}
            src="lumora-chat.webp"
            w={1200}
            h={694}
            width={80}
            alt="Lumora AI chat with past conversations on the left and suggested questions such as ‘Am I on track with my goals?’"
          >
            AI Chat, with suggested questions drawn from the user’s finances.
          </Fig>
          <p>
            Users can ask questions to the AI and receive responses that are deeply personalized based on their complete financial context -
            including investments, risk appetite, age, loans, and other relevant factors, along with guidance grounded in established
            financial best practices.
          </p>
          <p>
            Unlike a general-purpose chat model like ChatGPT, this system operates with full awareness of the user’s financial profile,
            enabling it to deliver highly contextual, situation-specific advice rather than generic responses.
          </p>
        </>,
        <>
          <H3 n="4.5">Financial Decision Simulator, see how decisions would play out</H3>
          <Fig
            n={7}
            src="lumora-simulator.webp"
            w={1200}
            h={694}
            width={80}
            alt="Simulator screen asking ‘What decision would you like to simulate?’ with options: prepay loan vs invest, rent vs buy a home, lump sum vs EMI"
          >
            The simulator: prepay a loan or invest, rent or buy, lump sum or EMI.
          </Fig>
          <p>
            This enables users to simulate multiple approaches to the same financial situation, compare the advantages and drawbacks of
            each, and make more informed, well-considered decisions.
          </p>
          <H3 n="4.6">Context Window, define an ever evolving context window for your financial advisor</H3>
          <Fig
            n={8}
            src="lumora-context.webp"
            w={1200}
            h={694}
            width={80}
            alt="Profile screen with personal details, dependants, income, monthly expenses, investments, physical assets, loans and insurance"
          >
            The Context Window: everything the advisor knows about the user, in one place.
          </Fig>
          <p>
            Users can connect their financial ecosystem by linking investment accounts, uploading loan related documents, and defining
            personal details such as family members, dependents, age, occupation, income, and expenses. This comprehensive context enables
            the AI to generate highly accurate, situation-aware responses.
          </p>
        </>,
        <>
          <p>
            Some of this information is captured through one-time manual inputs, while other data is continuously updated via live APIs,
            ensuring the system stays current without requiring constant user intervention.
          </p>
          <H2 n="5">Revenue generation models</H2>
          <Table
            n={1}
            caption="How Lumora could make money."
            head={['Model', 'How it works']}
            rows={[
              [
                'Subscription plans',
                'Certain features would be restricted, along with a capped usage of AI tokens. To unlock full access and extended usage, users would need to subscribe to a monthly or yearly plan.',
              ],
              [
                'Partner recommendations',
                'We can offer personalised credit card and insurance recommendations to users through our partner ecosystem, based on their financial needs and spending patterns. If a user completes a purchase or sign-up through these recommendations, we earn a commission.',
              ],
              [
                'Loan against assets',
                'We can offer loans against users’ linked assets such as mutual funds and stocks. Based on the integration model, revenue can be generated either through commissions or interest on the facilitated lending.',
              ],
            ]}
          />
          <Correspondence>Do you want more details on this product? Let’s connect and discuss, reach out to me at</Correspondence>
        </>,
      ]}
    />
  )
}
