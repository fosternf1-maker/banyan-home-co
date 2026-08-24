import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & {
  title?: string;
};

export function BanyanMark({ title, className, ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <g fill="currentColor" stroke="currentColor">
        <ellipse cx="32" cy="24.5" rx="13.1" ry="5.6" />
        <ellipse cx="32" cy="20.9" rx="10.3" ry="5" />
        <ellipse cx="20.8" cy="23.6" rx="8.1" ry="4.5" />
        <ellipse cx="43.3" cy="23.6" rx="8.1" ry="4.5" />
        <ellipse cx="13.6" cy="25.9" rx="5.4" ry="3.1" />
        <ellipse cx="50.5" cy="25.9" rx="5.4" ry="3.1" />
        <ellipse cx="25.8" cy="18.4" rx="5.9" ry="3.4" />
        <ellipse cx="38.8" cy="18.9" rx="5.2" ry="2.9" />
        <ellipse cx="32" cy="27.2" rx="9.9" ry="3.6" />
        <path d="M29.7 25h4.7l1.5 20.2h-7.7Z" />
        <line
          x1="11.4"
          y1="26.8"
          x2="11.4"
          y2="37.1"
          strokeWidth="0.71"
          strokeLinecap="round"
        />
        <line
          x1="14.9"
          y1="26.8"
          x2="14.9"
          y2="42"
          strokeWidth="0.99"
          strokeLinecap="round"
        />
        <line
          x1="17.6"
          y1="26.8"
          x2="17.6"
          y2="35.3"
          strokeWidth="0.61"
          strokeLinecap="round"
        />
        <line
          x1="23.5"
          y1="26.8"
          x2="23.5"
          y2="43.9"
          strokeWidth="1.32"
          strokeLinecap="round"
        />
        <line
          x1="26.7"
          y1="26.8"
          x2="26.7"
          y2="38"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <line
          x1="37.4"
          y1="26.8"
          x2="37.4"
          y2="43"
          strokeWidth="1.13"
          strokeLinecap="round"
        />
        <line
          x1="41"
          y1="26.8"
          x2="41"
          y2="36.2"
          strokeWidth="0.66"
          strokeLinecap="round"
        />
        <line
          x1="46.9"
          y1="26.8"
          x2="46.9"
          y2="40.7"
          strokeWidth="0.95"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="26.8"
          x2="50"
          y2="37.5"
          strokeWidth="0.71"
          strokeLinecap="round"
        />
        <line
          x1="53.6"
          y1="26.8"
          x2="53.6"
          y2="34.4"
          strokeWidth="0.61"
          strokeLinecap="round"
        />
        <path d="M19.5 25v20.2" strokeWidth="2.17" strokeLinecap="round" />
        <path d="M44.6 25v20.2" strokeWidth="2.17" strokeLinecap="round" />
      </g>
    </svg>
  );
}
