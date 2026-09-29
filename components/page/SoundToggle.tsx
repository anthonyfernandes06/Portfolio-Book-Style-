'use client'
import { useEffect, useState } from 'react'
import { isSoundOn, onSoundChange, setSoundOn } from '@/lib/sound'
import s from '@/content/pages/pages.module.css'

/** A typed line on the inside cover: `sound: on` / `sound: off`. */
export default function SoundToggle() {
  const [on, setOn] = useState(true)
  useEffect(() => {
    setOn(isSoundOn())
    return onSoundChange(setOn)
  }, [])
  return (
    <button className={s.soundToggle} onClick={() => setSoundOn(!on)} aria-pressed={on} aria-label="Page-turn sound">
      sound: <span className={s.soundState}>{on ? 'on' : 'off'}</span>
    </button>
  )
}
