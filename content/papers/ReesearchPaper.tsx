import { Abstract, Correspondence, Fig, H2, H3, Items, Link, Paper, Table, TitleBlock } from '@/components/paper/Paper'
import { LINKS } from '@/content/links'

export default function ReesearchPaper() {
  return (
    <Paper
      id="reesearch"
      sheets={[
        <>
          <TitleBlock id="reesearch" kicker="Some of my work" tags="Web application · AI tool" />
          <Abstract cta={<Link href={LINKS.researchAiDemo}>View Product</Link>}>
            Reesearch AI is an in-house product being developed at Yellow Slice with the goal of leveraging AI to transform the research
            process. It aims to accelerate planning, streamline data analysis, and enable faster, more effective collection of insights.
          </Abstract>
          <Fig
            n={1}
            src="reesearch-fig1.webp"
            w={1400}
            h={467}
            eager
            alt="Three Reesearch AI screens: AI-generated insights for a survey, the landing page reading ‘Make better decisions with faster research’, and a survey overview with demographics"
          >
            Reesearch AI: insights from a survey, the landing page, and a survey overview.
          </Fig>
          <H2 n="1">Problem statement</H2>
          <p>
            Research is often a time-intensive process, with significant effort spent across three key stages: planning the study,
            recruiting the right participants, and conducting as well as analyzing the data. This complexity often discourages product,
            business, and marketing teams from conducting research unless it is absolutely necessary, leading to missed opportunities for
            informed decision-making.
          </p>
        </>,
        <>
          <H2 n="2">My role</H2>
          <Items numbered>
            <li>Define product direction, core feature set, and long-term roadmap.</li>
            <li>Plan and manage weekly sprints.</li>
            <li>Translated user testing feedback into actionable product enhancements.</li>
            <li>Lead QA for both design and development outputs to maintain quality standards.</li>
            <li>Coordinate cross-functionally between design and engineering teams.</li>
          </Items>
          <H2 n="3">Product vision</H2>
          <p>
            At its current stage, Reesearch AI helps reduce time across two of the three major stages of research:{' '}
            <em>research planning</em> and <em>data analysis</em>. The next phase of the product will expand this by introducing{' '}
            <em>participant recruitment</em>, enabling time savings across the full research lifecycle.
          </p>
          <p>
            The long-term vision for Reesearch AI is to become the go-to platform for end-to-end research, supporting both{' '}
            <em>qualitative and quantitative workflows</em>.
          </p>
          <p>
            Beyond surveys, the platform is being designed to be <em>context-aware</em>, bringing together insights from multiple sources
            such as documents, previous research, and external inputs to help teams uncover deeper, more meaningful findings in one place.
          </p>
          <H2 n="4">Product features</H2>
          <p>
            Up next are the core features built into the product, this will give you a glimpse into what we have built into Reesearch AI so
            far.
          </p>
          <H3 n="4.1">AI based survey creation</H3>
          <Fig
            n={2}
            src="reesearch-prompt.webp"
            w={1200}
            h={694}
            width={80}
            alt="The Reesearch AI landing page with a box to describe the survey you want to build"
          >
            Start by describing what you want to learn.
          </Fig>
        </>,
        <>
          <Fig
            n={3}
            src="reesearch-form.webp"
            w={1200}
            h={694}
            width={80}
            alt="A form titled ‘Build a survey using Reesearch AI’ with survey category, objective, description and optional extra context"
          >
            The guided form: category, objective, a description, and more context if you have it.
          </Fig>
          <p>
            Reesearch AI enables users to create surveys using AI through a guided, structured input flow. Instead of relying on a single
            prompt, the system collects key contextual information via a concise yet detailed form, ensuring the AI has enough depth and
            clarity to generate high-quality, relevant, and effective surveys.
          </p>
          <H3 n="4.2">Survey builder</H3>
          <Fig
            n={4}
            src="reesearch-builder.webp"
            w={1200}
            h={694}
            width={80}
            alt="The survey builder with question groups on the left and an editable single-select question on the right"
          >
            The survey builder, with questions in editable groups.
          </Fig>
        </>,
        <>
          <Fig
            n={5}
            src="reesearch-logic.webp"
            w={1200}
            h={694}
            width={80}
            alt="A screener question with correct answers marked, and a survey logic map connecting question groups"
          >
            Screener questions, and the logic that routes participants between groups.
          </Fig>
          <p>
            The AI-generated survey is passed into a survey builder where users can directly refine and edit it as needed. The builder
            enables them to define survey logic, add screener questions, and configure validations, ensuring the survey is both structured
            and execution-ready.
          </p>
          <H3 n="4.3">AI generated survey insights</H3>
          <Fig
            n={6}
            src="reesearch-insights.webp"
            w={1200}
            h={694}
            width={80}
            alt="Reesearch AI insights about employee interest at work, each followed by suggestions"
          >
            Insights from the responses, each with suggestions to act on.
          </Fig>
          <p>
            Reesearch AI helps users identify patterns and generate actionable insights from collected survey responses. By streamlining the
            analysis process, it significantly reduces the time teams spend interpreting data and enables faster, more informed
            decision-making.
          </p>
        </>,
        <>
          <H3 n="4.4">AI summaries</H3>
          <Fig
            n={7}
            src="reesearch-summary.webp"
            w={1200}
            h={694}
            width={80}
            alt="Open-ended answers to a satisfaction question, followed by a Research AI summary of the responses"
          >
            Open-ended answers, summarised.
          </Fig>
          <p>
            Text-based responses collected from participants are presented alongside structured summaries, helping surface the key themes,
            patterns, and insights emerging from the data.
          </p>
          <H3 n="4.5">AI chat to deep dive into insights</H3>
          <Fig
            n={8}
            src="reesearch-chat.webp"
            w={1200}
            h={694}
            width={80}
            alt="Reesearch AI Chat answering a question comparing how men and women responded about work-life balance"
          >
            Asking the AI chat about the results.
          </Fig>
          <p>
            The AI chat enables users to ask targeted, context-specific questions about their data, allowing them to quickly extract
            insights and clarify doubts related to their research findings.
          </p>
        </>,
        <>
          <H2 n="5">Revenue generation models</H2>
          <Table
            n={1}
            caption="How Reesearch AI makes money."
            head={['Model', 'How it works']}
            rows={[
              [
                'Subscription service',
                'Users can subscribe to the platform to unlock premium features, including higher response limits, increased AI token usage, and the ability to create and publish multiple surveys, among other advanced capabilities.',
              ],
              [
                'Credit top-ups',
                'Users on any paid plans can purchase additional credits once they run out, allowing them to continue using AI features seamlessly without interruption.',
              ],
              [
                'Pay per participant',
                'We plan to build a participant network within the product that enables companies to quickly and efficiently reach their target audience without the usual time overhead of recruitment. In this model, we charge on a per-participant basis for each completed survey response.',
              ],
            ]}
          />
          <Correspondence>Do you want more details on this project? Let’s connect and discuss, reach out to me at</Correspondence>
        </>,
      ]}
    />
  )
}
