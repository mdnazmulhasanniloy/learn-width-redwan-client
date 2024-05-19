// app/not-found.js

import Link from "next/link";
import styles from "./not-found.module.css"; // Import custom styles if you have them

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.description}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/">
        <span className={styles.link}>Go back to Home</span>
      </Link>
    </div>
  );
}
