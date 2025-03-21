import Link from 'next/link';
import styles from './index.module.css';

export default function Support() {
  return (
    <div className={`${styles.space} ${styles.marginBottom} overflow-hidden bg-white`}>
      <div className="overflow-hidden mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`${styles.textLeft} mx-auto max-w-2xl text-center`}>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
            より良いサービスに
          </p>
          <p className="mt-6 text-lg/8">
            リクビジョンは、現役の大学生が実際に感じた就活の課題を解決するために、個人で開発を行っているサービスです。ご意見やご要望がございましたら、ぜひお気軽にお問い合わせください。
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/contact"
              className="border w-full justify-center inline-flex rounded-md px-3.5 py-3.5 text-xl font-semibold shadow-sm border-blue-500 text-blue-500 hover:border-blue-600 hover:text-blue-600"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
