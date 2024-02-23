import type { FC } from 'react';

import styles from './TypographyExample.module.scss';

enum HeadingSize {
  H1 = '6rem',
  H2 = '3.75rem',
  H3 = '3rem',
  H4 = '2.125rem',
}

enum TextStyle {
  REGULAR_TEXT = 'Regular',
  BOLD_TEXT = 'Bold',
  ITALIC_TEXT = 'Italic',
}

enum FontWeight {
  REGULAR_TEXT_WEIGHT = '400',
  BOLD_TEXT_WEIGHT = '600',
}

const fontFamily = 'Arial, Helvetica, Sans-serif';

export const TypographyExample: FC = () => (
  <div id={styles['typography-main']}>
    <section>
      <h1>
        H1 / {fontFamily} / {HeadingSize.H1}
      </h1>
      <h2>
        H2 / {fontFamily} / {HeadingSize.H2}
      </h2>
      <h3>
        H3 / {fontFamily} / {HeadingSize.H3}
      </h3>
      <h4>
        H4 / {fontFamily} / {HeadingSize.H4}
      </h4>
    </section>
    <section>
      <p>
        Text / {fontFamily} / {TextStyle.REGULAR_TEXT} /{' '}
        {FontWeight.REGULAR_TEXT_WEIGHT}
      </p>
      <p id={styles.bold}>
        Text / {fontFamily} / {TextStyle.BOLD_TEXT} /{' '}
        {FontWeight.BOLD_TEXT_WEIGHT}
      </p>
      <p id={styles.italic}>
        Text / {fontFamily} / {TextStyle.ITALIC_TEXT} /{' '}
        {FontWeight.REGULAR_TEXT_WEIGHT}
      </p>
    </section>
  </div>
);
