import {
  EnvelopeIcon,
  HomeIcon,
  UserPlusIcon,
  ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/solid';
import {
  CalendarDaysIcon,
  ChartBarIcon,
  InformationCircleIcon,
  BuildingOffice2Icon,
  ClipboardDocumentListIcon,
  ShareIcon,
  ArrowRightStartOnRectangleIcon,
  EnvelopeIcon as EnvelopeIconOutline,
  ChartPieIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline';

export const TITLE = '就活スケジュール管理サービス リクビジョン';

export const DESCRIPTION =
  '就活における日程管理や自己分析、選考状況などを一括で管理することのできるサービスです。';

export const PROJECT_IMAGE = [
  {
    path: '/images/head/1.png',
    alt: 'タイトル',
  },
];

export const HEADER_NAVIGATION = [
  { name: 'ホーム', path: '/', icon: HomeIcon },
  { name: 'お問い合わせ', path: '/contact', icon: EnvelopeIcon },
  { name: 'アカウント登録', path: '/service/auth/signup', icon: UserPlusIcon },
  { name: 'ログイン', path: '/service/auth/login', icon: ArrowRightEndOnRectangleIcon },
];

export const FOOTER_NAVIGATION = {
  about: [
    { name: 'アカウント登録', href: '/service/auth/signup' },
    { name: 'ログイン', href: '/service/auth/login' },
  ],
  developer: [{ name: 'リアル大学生', href: 'https://realunivlog.com' }],
  policy: [
    { name: 'プライバシーポリシー', href: '/privacy' },
    { name: '免責事項', href: '/disclaimer' },
    { name: '著作権', href: '/copyright' },
    { name: 'リンク', href: '/link' },
  ],
  contact: [{ name: 'お問い合わせ', href: '/contact' }],
};

export const COPYRIGHT = 'Copyright © 2024 リクビジョン All Rights Reserved.';

export const SERVICE_NAVIGATION = [
  { name: '就活イベント', href: '/service', icon: InformationCircleIcon },
  { name: 'カレンダー', href: '/service/calendar', icon: CalendarDaysIcon },
  { name: '企業管理', href: '/service/selection', icon: BuildingOffice2Icon },
  { name: 'ESテンプレート', href: '/service/template', icon: ClipboardDocumentListIcon },
  { name: '自己分析', href: '/service/analysis', icon: ChartBarIcon },
  { name: '幸福度', href: '/service/happiness', icon: FaceSmileIcon },
];

export const SERVICE_SETTING_NAVIGATION = [
  { name: 'お問い合わせ', icon: EnvelopeIconOutline },
  { name: 'シェアする', icon: ShareIcon },
  { name: 'ログアウト', icon: ArrowRightStartOnRectangleIcon },
];

export const HOME_HEROES = [
  {
    name: '一括管理カレンダー',
    description:
      '企業ごとの選考状況を自動でカレンダーに反映し、一目で予定を把握することができます。',
    icon: CalendarDaysIcon,
  },
  {
    name: '簡単自己分析',
    description:
      '初めは戸惑う自己分析。リクビジョンを活用すれば、予め用意された質問に回答していくだけで、自己理解を深められます。',
    icon: ChartPieIcon,
  },
  {
    name: 'ESテンプレート',
    description:
      '文字数カウンターを活用して、ガクチカや自己PRなどの定型文を保存しておくことができます。',
    icon: ClipboardDocumentListIcon,
  },
  {
    name: '幸福度',
    description:
      '年齢ごとの幸福度と理由を記録し、グラフで可視化することで自分の変化を振り返ることができます。',
    icon: FaceSmileIcon,
  },
];

export const HOME_RECOMMENDS = [
  {
    path: '/images/top/recommend/1.png',
  },
  {
    path: '/images/top/recommend/2.png',
  },
  {
    path: '/images/top/recommend/3.png',
  },
  {
    path: '/images/top/recommend/4.png',
  },
];
