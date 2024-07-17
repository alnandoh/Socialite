"use client";

import { useState, useEffect } from "react";
import { Share2, Facebook, Twitter } from "lucide-react";
import Link from "next/link";

interface ShareButtonProps {
  pathname: string;
  eventName: string;
}

export default function ShareButton({ pathname, eventName }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    setFullUrl(`${window.location.origin}${pathname}`);
  }, [pathname]);

  const handleShare = () => {
    if (navigator.clipboard && fullUrl) {
      navigator.clipboard.writeText(fullUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const facebookShareUrl = `http://www.facebook.com/sharer.php?u=${fullUrl}`;
  const twitterShareUrl = `https://twitter.com/share?url=${fullUrl}&text=${encodeURIComponent(
    eventName
  )}`;

  return (
    <div className="flex items-center gap-4">
      <Link href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
        <div className="flex items-center justify-center rounded-full h-12 w-12 border hover:bg-stone-200">
          <Facebook />
        </div>
      </Link>
      <Link href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
        <div className="flex items-center justify-center rounded-full h-12 w-12 border hover:bg-stone-200">
          <Twitter />
        </div>
      </Link>
      <button
        onClick={handleShare}
        className="flex items-center justify-center rounded-full h-12 w-12 border hover:bg-stone-200 relative"
      >
        <Share2 />
        {copied && (
          <span className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
