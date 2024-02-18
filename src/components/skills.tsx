import React, { useState } from 'react';
import { skills } from '../pages/api/skills';
import Styles from "./skills.module.css";


function Next({ next, onClick }: { next: boolean, onClick: () => void }) {
  return (
    <div className={`${Styles.nextPrevious} ${next ? Styles.forwardAngle : Styles.backwardAngle}`} onClick={onClick}>
      <svg width='100' height='86.6' viewBox='0 0 100 86.6' xmlns='http://www.w3.org/2000/svg'>
        <path d='M50 0 L100 86.6 H0 Z'></path>
      </svg>
    </div>
  )
}

function Skill({ icon, name, description, animation, level, tabIndex }: { icon: string, name: string, description: string, level: number, animation: string, tabIndex: number }) {
  return (
    <div className={Styles.skill} tabIndex={tabIndex}>
      <div className={Styles.skillHeader}>
        <div className={Styles.skillIcon}>{icon}</div>
        <div className={Styles.skillName}>{name}</div>
      </div>
      <div className={Styles.skillBox}>
        <div className={Styles.skillBar}>
          <div className={`${Styles.skillFill} ${animation}`} style={{ width: level + "%" }}></div>
          <div className={Styles.textBox}>
            <p>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div >
  )
}

function SkillCard({ id, title, description, skills, fade }: { id: string, title: string, description: string, skills: any[], fade: boolean }) {
  const animations = [Styles.fill, Styles.fillEarlyAcceleration, Styles.fillLateAcceleration, Styles.fillEaseInOut];
  const selector = (index: number) => index > animations.length - 1 ? animations[animations.length - 1] : animations[index];
  return (
    <div id={id} className={`${Styles.skillCard} ${fade ? Styles.fade : ''}`}>
      <div className={Styles.skillTitle}>{title}</div>
      <div className={Styles.nextSkill}></div>
      <div className={Styles.skillDescription}>
        <p>{description}</p>
      </div>
      {(skills ?? []).map((skill, index) => <Skill key={index} tabIndex={index} {...skill} animation={selector(index)} />)}
      <slot />
    </div>
  )
}

export default function Skills() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);

  const currentSkill = skills[current];

  function handleNext(direction: number) {
    setFade(true);
    const nextIndex = () => {
      const lastIndex = skills.length - 1;
      if (direction > 0) {
        return current === lastIndex ? 0 : Math.min(current + direction, lastIndex);
      } else if (direction < 0) {
        return current === 0 ? lastIndex : Math.max(current + direction, 0);
      }
      return current;
    }
    setTimeout(() => { setCurrent(nextIndex()); setFade(false); }, 400);
  }

  return (
    <div className={Styles.skillReel}>
      <Next next={false} onClick={() => handleNext(-1)} />
      <SkillCard fade={fade} {...currentSkill} />
      <Next next={true} onClick={() => handleNext(1)} />
    </div>
  )
}
