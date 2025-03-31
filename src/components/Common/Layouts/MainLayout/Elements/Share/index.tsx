import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  HatenaShareButton,
  HatenaIcon,
  PocketShareButton,
  PocketIcon,
} from 'react-share';
import { TITLE } from '@/constants/data';

export default function Share() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const baseTitle = TITLE;
  const title = baseTitle;
  const url = baseUrl!;

  return (
    <div className="flex justify-center flex-wrap">
      <TwitterShareButton url={url} title={title} className="m-1 hover:opacity-60">
        <TwitterIcon size={40} round={true} />
      </TwitterShareButton>

      <FacebookShareButton url={url} className="m-1 hover:opacity-60">
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>

      <LineShareButton url={url} title={title} className="m-1 hover:opacity-60">
        <LineIcon size={40} round={true} />
      </LineShareButton>

      <PocketShareButton url={url} title={title} className="m-1 hover:opacity-60">
        <PocketIcon size={40} round={true} />
      </PocketShareButton>

      <HatenaShareButton url={url} title={title} className="m-1 hover:opacity-60">
        <HatenaIcon size={40} round={true} />
      </HatenaShareButton>
    </div>
  );
}
