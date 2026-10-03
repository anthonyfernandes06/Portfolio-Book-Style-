import { Abstract, Correspondence, Fig, H2, H3, Items, Paper, Table, TitleBlock } from '@/components/paper/Paper'

export default function SpotifyPaper() {
  return (
    <Paper
      id="spotify"
      sheets={[
        <>
          <TitleBlock id="spotify" kicker="The playground" tags="Experiment · 1 week" />
          <Abstract>
            One day, while casually listening to music on my way home, I found myself wondering… what if Spotify could feel like a DJ
            curating the experience in real time? That simple thought sparked the idea for this case study.
          </Abstract>
          <Fig
            n={1}
            src="spotify-fig1.webp"
            w={1400}
            h={709}
            eager
            alt="Three phone screens from Spotify DJ Mode: the DJ queue, the song now playing, and a pop-up saying a suggested song doesn’t fit the vibe"
          >
            Spotify DJ Mode: the DJ queue, the song that’s playing, and a guest’s suggestion that doesn’t fit the mood.
          </Fig>
          <H2 n="1">Problem statement</H2>
          <p>
            People often use streaming platforms to play music at house parties, but relying on autoplaying playlists can lead to uneven
            experiences; boring sections of songs, tracks running longer than they should, and abrupt shifts in tempo between songs that
            disrupt the mood on the dance floor.
          </p>
          <p>
            This led me to wonder: what if Spotify had a “DJ Mode” that intelligently played the most engaging parts of songs and structured
            the queue to maintain a consistent energy flow, ensuring a seamless and uninterrupted party experience?
          </p>
        </>,
        <>
          <H2 n="2">Understanding what DJs do</H2>
          <p>A DJ doesn’t just play songs back-to-back. They:</p>
          <Items>
            <li>Match the rhythm between tracks</li>
            <li>Play the most energetic, dance-worthy sections of each song</li>
            <li>Gradually build momentum instead of shifting energy abruptly</li>
          </Items>
          <p>
            Their goal is to preserve the groove of the crowd. A great DJ doesn’t jump from 0 to 100 between tracks, they ease people in,
            steadily raise the energy, and keep the dance floor engaged for longer.
          </p>
          <H2 n="3">Feature ideas</H2>
          <p>Here’s what Spotify’s DJ mode could look like.</p>
          <H3 n="3.1">Playlist management features</H3>
          <Fig
            n={2}
            src="spotify-start.webp"
            w={1100}
            h={636}
            width={88}
            alt="A Spotify playlist called Fun Viberzz with a ‘Play in DJ Mode’ option above the track list"
          >
            Any playlist can be played in DJ Mode.
          </Fig>
          <p>Spotify DJ Mode could:</p>
          <Items>
            <li>Re-arrange songs based on tempo &amp; energy</li>
            <li>Match beats &amp; make smooth transitions</li>
            <li>Play the chorus and fun sections of the song</li>
            <li>Move to the next song before the crowd gets bored</li>
          </Items>
        </>,
        <>
          <Fig
            n={3}
            src="spotify-queue.webp"
            w={1200}
            h={694}
            width={88}
            alt="The Spotify DJ Mode queue beside the now-playing controls for the current song"
          >
            The DJ queue, and the song playing from it.
          </Fig>
          <H3 n="3.2">Crowd involvement</H3>
          <Fig
            n={4}
            src="spotify-crowd.webp"
            w={1100}
            h={636}
            width={88}
            alt="Two pop-ups for a suggested song: ‘Great Choice’, saying it will play after two other songs, and ‘Don’t Kill the Vibe’, saying the song doesn’t fit the mood"
          >
            A guest’s suggestion: a good fit is queued to play two songs later; one that doesn’t fit is flagged.
          </Fig>
          <p>People suggesting songs is a common part of house parties. With DJ Mode, that still stays.</p>
          <p>
            Guests can add songs to a shared queue, and DJ Mode can intelligently place them as the next, second, or third track depending
            on how well they fit the current vibe.
          </p>
          <p>If a suggestion feels completely off, the system can flag it instead of breaking the flow.</p>
        </>,
        <>
          <H2 n="4">Why Spotify can build this feature</H2>
          <Table
            n={1}
            caption="What Spotify already has."
            head={['Advantage', 'What it means for DJ Mode']}
            rows={[
              [
                'Existing algorithm',
                'Spotify has already built an algorithm to recommend songs based on mood, type of music etc. The same can be extended for this feature.',
              ],
              [
                'Data on engagement',
                'Spotify would have data on which parts of the songs people skip and which parts of the songs are replayed.',
              ],
              ['Behavioural insights', 'Spotify has data on what kind of music people normally listen to.'],
            ]}
          />
          <Correspondence>Do you want more details on this idea? Let’s connect and discuss, reach out to me at</Correspondence>
        </>,
      ]}
    />
  )
}
