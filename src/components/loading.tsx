import { HtmlHTMLAttributes } from "react";
import styles from "../styles/loading.module.scss";

export interface Props extends HtmlHTMLAttributes<SVGElement> {}

export default function Spinner({ className, ...rest }: Props) {
  return (
    <span className={styles.loader}>
      <svg
        {...rest}
        className={`${styles.loader} ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 18 18"
        fill="none"
      >
        <circle
          className={styles.strokeStyle}
          cx="8.96529"
          cy="8.96529"
          r="7.46529"
          strokeWidth="3"
        />
        <path
          className={styles.fillStyle}
          d="M7.84473 17.9305V15C7.84473 15 11 15 13 13.5C15.2413 11.2587 15 8.40491 15 8.40491H17.9307C17.9307 15.6892 12.3274 18.4909 7.84473 17.9305Z"
        />
      </svg>
    </span>
  );
}
