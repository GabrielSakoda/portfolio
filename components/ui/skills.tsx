"use client";
import { memo } from 'react';
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiPhp,
  SiMysql,
  SiGithub,
  SiPython,
  SiLaravel,
} from "react-icons/si";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const abilityArray = [
  {
    name: "React.js",
    icon: <SiReact className="scale-150 max-lg:scale-100" />,
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="scale-150 max-lg:scale-100" />,
  },
  {
    name: "Tailwind",
    icon: <SiTailwindcss className="scale-150 max-lg:scale-100" />,
  },
  {
    name: "JavaScript",
    icon: <SiJavascript className="scale-150 max-lg:scale-100" />,
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="scale-150 max-lg:scale-100" />,
  },
  { name: "HTML", icon: <SiHtml5 className="scale-150 max-lg:scale-100" /> },
  { name: "CSS", icon: <SiCss3 className="scale-150 max-lg:scale-100" /> },
  { name: "Git", icon: <SiGithub className="scale-150 max-lg:scale-100" /> },
  { name: "PHP", icon: <SiPhp className="scale-150 max-lg:scale-100" /> },
  { name: "MySQL", icon: <SiMysql className="scale-150 max-lg:scale-100" /> },
  { name: "Python", icon: <SiPython className="scale-150 max-lg:scale-100" /> },
  { name: "Laravel", icon: <SiLaravel className="scale-150 max-lg:scale-100" /> },
] as const;

const AbilityItem = memo(({ ability, theme }: { ability: typeof abilityArray[number]; theme: string | undefined }) => (
  <li className="flex gap-[1rem]">
    <div className="flex items-center gap-3">
      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
        {ability.icon}
      </span>
      <p className={cn(
        "text-xl max-lg:text-[1rem]",
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      )}>
        {ability.name}
      </p>
    </div>
  </li>
));

AbilityItem.displayName = 'AbilityItem';

const AbilityList = memo(({ theme }: { theme: string | undefined }) => (
  <ul className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused] max-w-none">
    {abilityArray.map((ability, index) => (
      <AbilityItem key={ability.name} ability={ability} theme={theme} />
    ))}
  </ul>
));

AbilityList.displayName = 'AbilityList';

const Ability = () => {
  const { theme } = useTheme();

  return (
    <div className="group flex overflow-hidden p-2 [--duration:30s] [--gap:1.4rem] [gap:var(--gap)] flex-row relative mt-6 cursor-default">
      <AbilityList theme={theme} />
      <AbilityList theme={theme} />
      <AbilityList theme={theme} />

      <div className={`pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r ${theme === 'dark' ? 'from-black' : 'from-gray-50'} to-transparent duration-500`}></div>
      <div className={`pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l ${theme === 'dark' ? 'from-black' : 'from-gray-50'} to-transparent duration-500`}></div>
    </div>
  );
};

export default memo(Ability);
