import Image from 'next/image';

import styles from './styles/Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src='/img/site/me.jpg'
          alt='An image showing Guilherme'
          width={300}
          height={300}
        />
      </div>

      <h1>Hi, I'm Guilherme!</h1>

      <p>
        I blog about web development, especially frontend framework like Angular
        or React.
      </p>
    </section>
  );
};

export default Hero;
