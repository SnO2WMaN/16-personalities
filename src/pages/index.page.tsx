import clsx from 'clsx';
import {NextPage} from 'next';
import React, {useState, useMemo} from 'react';
import Head from 'next/head';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';

import {Personality} from './personality';
import {Slot} from './Slot';

import {useTranslation} from '~/i18n/useTranslation';

export type UrlQuery = Record<string, never>;
export type PageProps = Record<string, never>;

export const Page: NextPage<PageProps> = ({...props}) => {
  const [personality, setPersonality] = useState<Personality | null>(null);
  const {LL} = useTranslation();

  const tweetUrl = useMemo(() => {
    if (personality) {
      const url = new URL('https://16-personalities.vercel.app/');
      url.searchParams.set('type', personality);

      const tweetUrl = new URL('http://twitter.com/share');
      tweetUrl.searchParams.set(
        'text',
        LL.tweetText({type: personality, job: LL.job[personality]()}),
      );
      tweetUrl.searchParams.set('url', url.toString());
      return tweetUrl.toString();
    } else return null;
  }, [LL, personality]);

  return (
    <>
      <Head>
        <title>{LL.head.title()}</title>
        <meta property="og:title" content={LL.head.title()} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://16-personalities.vercel.app/"
        />
        <meta name="twitter:title" content={LL.head.title()} />
        <meta name="twitter:creator" content="@SnO2WMaN" />
        <meta property="og:description" content={LL.head.description()} />
        <meta name="twitter:card" content="summary" />
      </Head>
      <main
        className={clsx(
          ['w-full', 'min-h-screen'],
          ['py-16'],
          ['flex', 'flex-col', 'items-center'],
        )}
      >
        <h1 className={clsx('text-2xl')}>{LL.title()}</h1>
        <ul className={clsx('mt-8')}>
          <li>
            <a
              className={clsx('text-blue-500', 'underline')}
              target="_blank"
              href="https://www.16personalities.com/ja/%E6%80%A7%E6%A0%BC%E3%82%BF%E3%82%A4%E3%83%97"
              rel="noreferrer"
            >
              {LL.listTextJa()}
            </a>
          </li>
        </ul>
        <Slot className={clsx('mt-8')} setPersonality={setPersonality} />
        {personality && (
          <>
            <p className={clsx('mt-8', 'text-lg')}>
              {LL.result({
                type: personality,
                job: LL.job[personality](),
              })}
            </p>
            <a
              className={clsx('text-blue-500', 'underline', 'mt-1')}
              target="_blank"
              href={LL.typeLink({
                type: personality.toLowerCase(),
              })}
              rel="noreferrer"
            >
              {LL.typeText({
                type: personality,
                job: LL.job[personality](),
              })}
            </a>
          </>
        )}
        {tweetUrl && (
          <a
            className={clsx(
              'rounded-sm',
              'mt-8',
              ['bg-twitter-1', 'text-white'],
              ['font-bold'],
              ['px-4', 'py-2'],
            )}
            target="_blank"
            href={tweetUrl}
            rel="noreferrer"
          >
            <FontAwesomeIcon fixedWidth icon={faTwitter} />
            <span className={clsx('ml-2')}>{LL.tweetLinkText()}</span>
          </a>
        )}
      </main>
    </>
  );
};
export default Page;
