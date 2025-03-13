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
  NumberedListIcon,
  ShareIcon,
  ArrowRightStartOnRectangleIcon,
  EnvelopeIcon as EnvelopeIconOutline,
} from '@heroicons/react/24/outline';

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
  { name: 'ToDoリスト', href: '/service/todo', icon: NumberedListIcon },
];

export const SERVICE_SETTING_NAVIGATION = [
  { name: 'お問い合わせ', icon: EnvelopeIconOutline },
  { name: 'シェアする', icon: ShareIcon },
  { name: 'ログアウト', icon: ArrowRightStartOnRectangleIcon },
];
