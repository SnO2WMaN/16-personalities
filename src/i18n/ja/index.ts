import type {BaseTranslation} from 'typesafe-i18n';

const ja: BaseTranslation = {
  head: {
    title: '16 Personalities | 性格診断',
    description: '非常に正確で、「ちょっぴりゾッとする」と言われています。',
  },
  title: '16 Personalities | 性格診断',
  listTextJa: '日本語版：性格タイプ一覧',
  result: 'あなたは{type:string}（{job:string}）型の人間です',
  job: {
    INTJ: '建設家',
    INTP: '論理学者',
    ENTJ: '指揮官',
    ENTP: '討論者',
    INFJ: '提唱者',
    INFP: '仲介者',
    ENFJ: '主人公',
    ENFP: '広報運動家',
    ISTJ: '管理者',
    ISFJ: '援護者',
    ESTJ: '幹部',
    ESFJ: '領事官',
    ISTP: '巨匠',
    ISFP: '冒険家',
    ESTP: '起業家',
    ESFP: 'エンターテイナー',
  },
  typeText: '{type:string}（{job:string}）型の人間の詳細',
  typeLink: `https://www.16personalities.com/ja/{type:string}型の性格`,
  tweetLinkText: 'ツイートする！',
  tweetText: '{type:string}（{job:string}）型の人間でした！',
  slot: {
    stop: 'STOP',
    start: 'START',
  },
};

export default ja;
