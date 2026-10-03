import { Abstract, Correspondence, Fig, H2, H3, Items, Para, Paper, TitleBlock } from '@/components/paper/Paper'

export default function OttPaper() {
  return (
    <Paper
      id="ott"
      sheets={[
        <>
          <TitleBlock id="ott" kicker="The playground" tags="Multi device · 3 days" />
          <Abstract>
            While using an OTT platform, I ran into a situation where, despite staying within usage limits, I was still restricted from
            accessing my own account. That moment made me think there has to be a better way. So I decided to explore how it could be fixed.
          </Abstract>
          <Fig
            n={1}
            src="ott-fig1.webp"
            w={1400}
            h={709}
            eager
            alt="A phone asking whether to switch devices with a 2-hour delay, a TV showing a QR code for temporary access, and a phone listing plan members who each have their own account"
          >
            The proposal at a glance: switching devices, temporary access on a TV by QR code, and a plan where every member has their own
            account.
          </Fig>
          <H2 n="1">Problem statement</H2>
          <p>
            Many users still share OTT accounts with friends and family, with a single account often being used by 8–10 people, far beyond
            intended usage limits. While platforms introduce restrictions to curb this behaviour, they often end up impacting legitimate
            users as well, without fully solving the underlying issue of account sharing.
          </p>
        </>,
        <>
          <H2 n="2">User behaviour</H2>
          <Items>
            <li>Streaming accounts are treated as a communal asset often shared casually beyond the household.</li>
            <li>
              In spite of sharing accounts, people have a sense of ownership since they still have personalised &amp; private profiles.
            </li>
            <li>People find sharing accounts to be a harmless norm, not a violation.</li>
            <li>Most users regularly switch between different devices like TVs, phones, and laptops.</li>
          </Items>
          <H2 n="3">Current solutions</H2>
          <p>Here is what Amazon Prime and Netflix have implemented as their current solution.</p>
          <H3 n="3.1">Amazon Prime</H3>
          <Fig
            n={2}
            src="ott-prime-devices.webp"
            w={1100}
            h={636}
            width={80}
            alt="Amazon Prime’s registered devices page, and a prompt warning that only two devices can be removed every 30 days"
          >
            Prime’s registered devices; only two can be removed every 30 days.
          </Fig>
          <p>
            Amazon enforces a strict device limit by restricting the number of devices that can be registered to a single account, including
            phones, tablets, and TVs. This means that if one user connects three devices (i.e. Phone, iPad, Laptop), only two additional
            devices or users can access Amazon Prime under the same account.
          </p>
          <p>
            Additionally, users are allowed to remove registered devices only twice per month, making it difficult to simply rotate devices
            to bypass the limit.
          </p>
          <p>
            As a result, even legitimate users can quickly hit these restrictions, since the system caps devices rather than individual
            users.
          </p>
        </>,
        <>
          <Fig
            n={3}
            src="ott-prime-limit.webp"
            w={1100}
            h={636}
            width={80}
            alt="Prime Video on a phone showing ‘Device limit reached. Buy another Prime membership to watch on more devices.’"
          >
            Prime Video blocks playback once the device limit is reached.
          </Fig>
          <H3 n="3.2">Netflix</H3>
          <Fig
            n={4}
            src="ott-netflix-household.webp"
            w={1200}
            h={694}
            width={80}
            alt="Netflix on a phone: ‘Your device isn’t part of the Netflix Household for this account’, with buttons to watch temporarily or sign out"
          >
            Netflix’s household check, with the option to watch temporarily.
          </Fig>
          <p>
            Netflix restricts account usage to a single household, allowing account sharing only among people living at the same address.
          </p>
          <p>
            However, the platform also offers an option to grant temporary access to a device outside the household for up to two weeks.
            While intended for travel scenarios, this feature can also be used as a workaround for sharing accounts beyond a single
            household, making restrictions ineffective.
          </p>
        </>,
        <>
          <H2 n="4">Solution philosophy</H2>
          <Items numbered>
            <li>Enable flexibility for users who comply with usage guidelines.</li>
            <li>Introduce friction for unauthorised sharing without compromising core user experience.</li>
            <li>Encourage formalisation of account sharing through structured access controls.</li>
            <li>Unlock new revenue opportunities through improved usage governance and monetisation strategies.</li>
          </Items>
          <H2 n="5">My solution</H2>
          <p>
            The following screens illustrate the proposed solution. Rather than redesigning Netflix from scratch, these are conceptual
            modifications built on top of the existing interface to demonstrate the ideas.
          </p>
          <H3 n="5.1">Everyone has a personal account</H3>
          <Fig
            n={5}
            src="ott-members.webp"
            w={1200}
            h={694}
            width={80}
            alt="A Netflix plan members screen listing the owner and two members, beside an edit profile screen for one member’s account"
          >
            Plan members, each with an account of their own.
          </Fig>
          <p>
            Inspired by Spotify’s Family Plan, where one user subscribes and invites others while each member retains a separate,
            independent account.
          </p>
          <Para>Expected impact.</Para>
          <Items>
            <li>Eliminates the practice of sharing email IDs and passwords for access.</li>
            <li>
              Ensures every user has their own account, with a single profile and watchlist, reinforcing privacy at the account level rather
              than just the profile level.
            </li>
          </Items>
        </>,
        <>
          <H3 n="5.2">Account level restrictions</H3>
          <Fig
            n={6}
            src="ott-devices-per-member.webp"
            w={1100}
            h={636}
            width={80}
            alt="Plan members screen with a phone and a TV icon beside each member, showing which devices they’re signed in on"
          >
            Each member’s phone and TV, at a glance.
          </Fig>
          <p>
            A new set of account-level restrictions is introduced to reduce unauthorised account sharing while maintaining a smooth user
            experience:
          </p>
          <Items>
            <li>Each account can be logged into one mobile device (phone or tablet) and one TV at any given time.</li>
            <li>
              Each account can stream on only one device at a time, while allowing up to four linked accounts to stream simultaneously
              across four devices.
            </li>
            <li>
              A household-based rule applies, ensuring the registered mobile and TV for an account remain within the same household,
              preventing cross-location sharing across device types.
            </li>
          </Items>
          <Fig
            n={7}
            src="ott-switch.webp"
            w={1100}
            h={636}
            width={80}
            alt="A prompt asking ‘Switch devices?’ with a 2-hour activation delay, and a sign-in confirmation counting down until the new device is active"
          >
            Switching to a new device: a second switch in a week waits out a 2-hour cooldown.
          </Fig>
        </>,
        <>
          <Items>
            <li>
              Logging in on a new mobile device or TV will automatically log the user out of the previously connected device of the same
              type.
            </li>
            <li>
              Switching between different phones or TVs more than once within a week will trigger a 2-hour cooldown period before the new
              device can be activated.
            </li>
          </Items>
          <Para>Expected outcome.</Para>
          <p>
            These constraints introduce controlled friction for unauthorised users, encouraging them to transition toward individual
            subscriptions without disrupting legitimate usage.
          </p>
          <H3 n="5.3">Temporary access</H3>
          <Fig
            n={8}
            src="ott-temporary.webp"
            w={1100}
            h={636}
            width={80}
            alt="A TV in a living room showing Netflix steps for temporary access next to a QR code"
          >
            Temporary access on a TV: scan the QR code with the Netflix app.
          </Fig>
          <p>
            Users can grant temporary 4-hour access to a TV or laptop by scanning a QR code, provided both devices are connected to the same
            Wi-Fi network.
          </p>
          <Para>Expected impact.</Para>
          <p>
            This enables flexible, short-term device sharing within a trusted environment while preventing the formation of long-term
            account sharing habits.
          </p>
        </>,
        <>
          <H3 n="5.4">Kids Mode in every account</H3>
          <Fig
            n={9}
            src="ott-kids.webp"
            w={1100}
            h={636}
            width={80}
            alt="An edit profile screen with a Kids Mode switch, and a prompt asking for the account password to exit Kids Mode"
          >
            Kids Mode is a switch on the account; leaving it asks for the account password.
          </Fig>
          <p>
            Instead of maintaining a separate Kids Profile, users can simply switch their account into Kids Mode when handing the device
            over to a child.
          </p>
          <Para>Expected impact.</Para>
          <p>
            This removes the need for managing separate profiles on streaming platforms, offering a faster, more seamless way to enable
            child-safe viewing.
          </p>
          <H3 n="5.5">Multiple accounts for common devices</H3>
          <Fig
            n={10}
            src="ott-tv-accounts.webp"
            w={1100}
            h={636}
            width={80}
            alt="A TV showing Netflix’s ‘Select your account’ screen with four saved accounts"
          >
            A shared TV with each member’s account saved.
          </Fig>
          <p>
            Shared devices such as TVs can support multiple saved accounts, enabling each household member to seamlessly access their own
            account without repeated logins or manual switching.
          </p>
        </>,
        <>
          <H3 n="5.6">Tag along upgrades</H3>
          <Fig
            n={11}
            src="ott-tag-along.webp"
            w={1100}
            h={636}
            width={80}
            alt="Plan members screen with an ‘Add another account’ card offering an extra account for ₹225 a month"
          >
            Adding another account to an existing plan.
          </Fig>
          <p>Subscription owners can add an extra account for an additional 30–35% of the base subscription price.</p>
          <Para>Expected impact.</Para>
          <Items>
            <li>Offers a low-friction alternative to account sharing for families and groups of friends.</li>
            <li>Creates a clear upsell opportunity within the existing customer base, increasing revenue per user.</li>
          </Items>
          <Correspondence>Do you want more details on this solution? Let’s connect and discuss, reach out to me at</Correspondence>
        </>,
      ]}
    />
  )
}
