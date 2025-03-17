import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/solid';

type Props = {
  title: string;
  path: string;
};

export default function BreadCrumb({ title, path }: Props) {
  return (
    <nav className="flex border-b border-gray-200 bg-white">
      <ol className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
        <li className="flex">
          <div className="flex items-center">
            <Link href="/" className="text-gray-500 hover:text-blue-500">
              <HomeIcon className="size-5 shrink-0" />
            </Link>
          </div>
        </li>
        <li className="flex">
          <div className="flex items-center">
            <svg
              fill="currentColor"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              className="h-full w-6 shrink-0 text-gray-200"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <Link
              href={`/${path}`}
              className="ml-4 text-sm font-medium text-gray-500 hover:text-blue-500"
            >
              {title}
            </Link>
          </div>
        </li>
      </ol>
    </nav>
  );
}
