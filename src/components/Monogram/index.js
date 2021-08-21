import classNames from 'classnames';
import { useId } from 'hooks';
import './index.css';

function Monogram({ highlight, className, ...props }) {
  const id = useId();
  const clipId = `monogram-clip-${id}`;

  return (
    <svg
      aria-hidden
      className={classNames('monogram', className)}
      width="15"
      height="5"
      viewBox="0 0 15 5"
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M0 0.996094H512V512.996H0V0.996094Z" fill="black" />
          <path
            d="M228.992 118.848C191.739 131.265 143.103 308.219 123.441 395.144L284.872 140.579L228.992 118.848Z"
            fill="white"
            stroke="white"
          />
          <path
            d="M360.968 385.204L291.482 148.656L256 204.836L360.968 385.204Z"
            fill="white"
            stroke="white"
          />
          <path
            d="M297.209 284.317L277.262 251.792L221.141 276.623L133.996 394.543L297.209 284.317Z"
            fill="white"
            stroke="white"
          />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className="monogram__highlight" width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
}

export default Monogram;
