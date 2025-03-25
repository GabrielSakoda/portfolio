"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

const technologies = [
  { icon: '/react.svg', name: 'React.js' },
  { icon: '/nextjs.svg', name: 'Next.js' },
  { icon: '/tailwind.svg', name: 'Tailwind' },
  { icon: '/javascript.svg', name: 'JavaScript' },
  { icon: '/typescript.svg', name: 'TypeScript' },
  { icon: '/html.svg', name: 'HTML' },
  { icon: '/css.svg', name: 'CSS' },
  { icon: '/php.svg', name: 'PHP' },
  { icon: '/laravel.svg', name: 'Laravel' },
  { icon: '/mysql.svg', name: 'MySQL' }
];

const firstRow = technologies.slice(0, Math.ceil(technologies.length / 2));
const secondRow = technologies.slice(Math.ceil(technologies.length / 2));

const TechCard = ({
  icon,
  name,
}: {
  icon: string;
  name: string;
}) => {
  return (
    <div
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-50/[.1] bg-gray-50/[.1] hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <Image
          src={icon}
          alt={name}
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
        />
        <div className="flex flex-col">
          <span className="text-lg font-medium text-gray-300">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};

export function TechMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((tech, index) => (
          <TechCard key={index} {...tech} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((tech, index) => (
          <TechCard key={index} {...tech} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black"></div>
    </div>
  );
} 