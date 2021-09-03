import clsx from 'clsx';
import React, {useState, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';

import {Char1, Char2, Char3, Char4, Personality} from './personality';

import {useTranslation} from '~/i18n/useTranslation';

export const ReelItem: React.FC = ({children}) => (
  <div
    className={clsx(
      ['w-[64px]', 'h-[64px]'],
      ['text-2xl', 'font-bold', 'font-mono'],
      ['select-none'],
      ['flex', 'justify-center', 'items-center'],
    )}
  >
    {children}
  </div>
);

export const Reel: React.VFC<
  {
    className?: string;
  } & (
    | {char: Char1 | null; chars: ['I', 'E']}
    | {char: Char2 | null; chars: ['N', 'S']}
    | {char: Char3 | null; chars: ['T', 'F']}
    | {char: Char4 | null; chars: ['P', 'J']}
  )
> = ({className, char, chars}) => {
  return (
    <div
      className={clsx(className, 'flex', 'flex-col', {
        rolling: !char,
        char1: char === chars[0],
        char2: char === chars[1],
      })}
    >
      <ReelItem>{chars[0]}</ReelItem>
      <ReelItem>{chars[1]}</ReelItem>
      <ReelItem>{chars[0]}</ReelItem>
      <ReelItem>{chars[1]}</ReelItem>
      <ReelItem>{chars[0]}</ReelItem>
    </div>
  );
};

const roll = keyframes`
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(-${64 * 2}px);
  }
`;
export const Styled = styled(Reel)`
  &.rolling {
    animation: ${roll} linear;
    animation-duration: 0.1s;
    animation-iteration-count: infinite;
  }
  &.char1 {
    transform: translateY(-64px);
  }
  &.char2 {
    transform: translateY(0px);
  }
`;

export const View = styled.div`
  :after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 192px;
    background: linear-gradient(
      #00000077,
      #00000011 ${(100 / 3) * 1}%,
      transparent 50%,
      #00000011 ${(100 / 3) * 2}%,
      #00000077
    );
  }
`;

export const Button: React.VFC<{
  className?: string;
  rolling: boolean;
  onClick(): void;
}> = ({className, rolling, onClick}) => {
  const {LL} = useTranslation();
  return (
    <button
      type="button"
      className={clsx(className, 'w-[64px]')}
      onClick={onClick}
    >
      {rolling && LL.slot.stop()}
      {!rolling && LL.slot.start()}
    </button>
  );
};

export const Slot: React.VFC<{
  className?: string;
  setPersonality(value: Personality | null): void;
}> = ({className, setPersonality}) => {
  const [char1, setChar1] = useState<Char1 | null>(null);
  const [char2, setChar2] = useState<Char2 | null>(null);
  const [char3, setChar3] = useState<Char3 | null>(null);
  const [char4, setChar4] = useState<Char4 | null>(null);

  useEffect(
    () =>
      setPersonality(
        char1 && char2 && char3 && char4
          ? `${char1}${char2}${char3}${char4}`
          : null,
      ),
    [char1, char2, char3, char4, setPersonality],
  );

  return (
    <div className={clsx(className)}>
      <div
        className={clsx(
          ['relative'],
          ['w-[256px]', 'h-[192px]'],
          ['overflow-hidden'],
        )}
      >
        <View className={clsx(['absolute'], ['top-0'], 'flex')}>
          <Styled chars={['I', 'E']} char={char1} />
          <Styled chars={['N', 'S']} char={char2} />
          <Styled chars={['T', 'F']} char={char3} />
          <Styled chars={['P', 'J']} char={char4} />
        </View>
      </div>
      <div className={clsx('mt-2', 'flex')}>
        <Button
          rolling={!char1}
          onClick={() =>
            // eslint-disable-next-line no-nested-ternary
            setChar1((char) => (char ? null : Math.random() < 0.5 ? 'I' : 'E'))
          }
        />
        <Button
          rolling={!char2}
          onClick={() =>
            // eslint-disable-next-line no-nested-ternary
            setChar2((char) => (char ? null : Math.random() < 0.5 ? 'N' : 'S'))
          }
        />
        <Button
          rolling={!char3}
          onClick={() =>
            // eslint-disable-next-line no-nested-ternary
            setChar3((char) => (char ? null : Math.random() < 0.5 ? 'F' : 'T'))
          }
        />
        <Button
          rolling={!char4}
          onClick={() =>
            // eslint-disable-next-line no-nested-ternary
            setChar4((char) => (char ? null : Math.random() < 0.5 ? 'J' : 'P'))
          }
        />
      </div>
    </div>
  );
};
