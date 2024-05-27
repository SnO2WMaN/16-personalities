import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { css, keyframes } from "@emotion/css";

type Char1 = "I" | "E";
type Char2 = "N" | "S";
type Char3 = "T" | "F";
type Char4 = "P" | "J";

const job = {
  INTJ: "建設家",
  INTP: "論理学者",
  ENTJ: "指揮官",
  ENTP: "討論者",
  INFJ: "提唱者",
  INFP: "仲介者",
  ENFJ: "主人公",
  ENFP: "広報運動家",
  ISTJ: "管理者",
  ISFJ: "援護者",
  ESTJ: "幹部",
  ESFJ: "領事官",
  ISTP: "巨匠",
  ISFP: "冒険家",
  ESTP: "起業家",
  ESFP: "エンターテイナー",
} as const;

type Personality = keyof typeof job;

const roll = keyframes`
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(-${64 * 2}px);
  }
`;

export const Reel: React.FC<
  {
    className?: string;
  } & (
    | { char: Char1 | null; chars: ["I", "E"] }
    | { char: Char2 | null; chars: ["N", "S"] }
    | { char: Char3 | null; chars: ["T", "F"] }
    | { char: Char4 | null; chars: ["P", "J"] }
  )
> = ({ className, char, chars }) => {
  return (
    <div
      className={clsx(className, "flex flex-col", {
        rolling: !char,
        [css`
          animation: ${roll} linear;
          animation-duration: 0.1s;
          animation-iteration-count: infinite;
        `]: !char,
        [css`
          transform: translateY(-64px);
        `]: char === chars[0],
        [css`
          transform: translateY(0px);
        `]: char === chars[1],
      })}
    >
      <div className="w-[64px] h-[64px] text-2xl font-bold font-mono select-none flex justify-center items-center">{chars[0]}</div>
      <div className="w-[64px] h-[64px] text-2xl font-bold font-mono select-none flex justify-center items-center">{chars[1]}</div>
      <div className="w-[64px] h-[64px] text-2xl font-bold font-mono select-none flex justify-center items-center">{chars[0]}</div>
      <div className="w-[64px] h-[64px] text-2xl font-bold font-mono select-none flex justify-center items-center">{chars[1]}</div>
      <div className="w-[64px] h-[64px] text-2xl font-bold font-mono select-none flex justify-center items-center">{chars[0]}</div>
    </div>
  );
};

export const Button: React.FC<{
  className?: string;
  rolling: boolean;
  onClick: () => void;
}> = ({ className, rolling, onClick }) => {
  return (
    <button
      type="button"
      className={clsx(className, "w-[64px]")}
      onClick={onClick}
    >
      {rolling && <>STOP</>}
      {!rolling && <>START</>}
    </button>
  );
};

export function Slot({ className, setPersonality }: { className?: string;setPersonality: (personality: Personality | null) => void }) {
  const [char1, setChar1] = useState<Char1 | null>(null);
  const [char2, setChar2] = useState<Char2 | null>(null);
  const [char3, setChar3] = useState<Char3 | null>(null);
  const [char4, setChar4] = useState<Char4 | null>(null);

  useEffect(
    () => {
      setPersonality(
        char1 && char2 && char3 && char4
          ? `${char1}${char2}${char3}${char4}`
          : null,
      );
    },
    [char1, char2, char3, char4, setPersonality],
  );

  return (
    <div className={clsx(className)}>
      <div
        className={clsx(
          "relative w-[256px] h-[192px] overflow-hidden",
        )}
      >
        <div className={clsx("flex absolute top-0", css`
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
          }`)}
        >
          <Reel chars={["I", "E"]} char={char1}></Reel>
          <Reel chars={["N", "S"]} char={char2}></Reel>
          <Reel chars={["T", "F"]} char={char3}></Reel>
          <Reel chars={["P", "J"]} char={char4}></Reel>
        </div>
      </div>
      <div className={clsx("mt-2 flex")}>
        <Button
          rolling={!char1}
          onClick={() =>
            setChar1(char => (char ? null : Math.random() < 0.5 ? "I" : "E"))}
        />
        <Button
          rolling={!char2}
          onClick={() =>
            setChar2(char => (char ? null : Math.random() < 0.5 ? "N" : "S"))}
        />
        <Button
          rolling={!char3}
          onClick={() =>
            setChar3(char => (char ? null : Math.random() < 0.5 ? "F" : "T"))}
        />
        <Button
          rolling={!char4}
          onClick={() =>
            setChar4(char => (char ? null : Math.random() < 0.5 ? "J" : "P"))}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [personality, setPersonality] = useState<Personality | null>(null);
  const [me] = useState(
    (Math.random() < 0.5 ? "I" : "E") + (Math.random() < 0.5 ? "N" : "S") + (Math.random() < 0.5 ? "F" : "T") + (Math.random() < 0.5 ? "J" : "P"),
  );

  const tweetUrl = useMemo(() => {
    if (personality) {
      const appUrl = new URL("https://16-personalities.sno2wman.net/");
      appUrl.searchParams.set("type", personality);

      const tweetUrl = new URL("http://twitter.com/share");

      tweetUrl.searchParams.set(
        "text",
        `${personality}（${job[personality]}）型の人間でした！`,
      );
      tweetUrl.searchParams.set("url", appUrl.toString());
      return tweetUrl.toString();
    }
    else {
      return null;
    }
  }, [personality]);

  return (
    <div>
      <main className="min-h-[calc(100svh-48px)] flex flex-col items-center py-12">
        <h1 className={clsx("text-2xl text-slate-900")}>16 Personalities | 性格診断</h1>
        <p className="text-center text-slate-700 text-sm mt-4">
          「ついに明らかになるなんて本当に信じられません」
          <br></br>
          たった10分で、自分がどんな人間で、なぜそのような行動を取るのか、「不思議なくらい正確」な説明が手に入ります。
        </p>
        <p className="text-center text-sm mt-2">
          <a
            target="_blank"
            href="https://www.16personalities.com/ja/%E6%80%A7%E6%A0%BC%E3%82%BF%E3%82%A4%E3%83%97"
            rel="noreferrer noopener"
            className="text-blue-500 underline"
          >
            日本語版：性格タイプ一覧
          </a>
        </p>

        <Slot
          className={clsx("my-8")}
          setPersonality={p =>
            setPersonality(p)}
        >
        </Slot>

        {personality
        && (
          <p className="text-lg text-slate-900">
            あなたは
            <a
              href={`https://www.16personalities.com/ja/${personality}型の性格`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-blue-500 underline"
            >
              <span>{personality}</span>
              （
              <span>{job[personality]}</span>
              ）型
            </a>
            の人間です
          </p>
        )}
        {tweetUrl && (
          <a
            className={clsx(
              "block rounded-sm mt-4 bg-twitter-1 text-white font-bold px-4 py-2 text-lg",
            )}
            target="_blank"
            href={tweetUrl}
            rel="noreferrer"
          >
            <span>ツイートする！</span>
          </a>
        )}
      </main>
      <footer className="h-[48px] px-8">
        <p className="text-xs text-right text-slate-900">
          <a
            href="https://twitter.com/SnO2WMaN"
            target="_blank"
            rel="noreferrer noopener"
          >
            @SnO2WMaN
            <span className="text-slate-500">
              (
              {me}
              )
            </span>
          </a>
          ,&nbsp;
          <a
            href="https://github.com/SnO2WMaN/16-personalities"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
