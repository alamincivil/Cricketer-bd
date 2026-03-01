import React from 'react';
import { Twitter, Facebook, Link as LinkIcon, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`,
      color: 'bg-sky-500',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      color: 'bg-blue-600',
    },
    {
      name: 'WhatsApp',
      icon: Share2,
      href: `https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`,
      color: 'bg-green-500',
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="flex items-center space-x-4 mt-8">
      <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Share Profile</span>
      <div className="flex space-x-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} p-2 rounded-full text-white hover:opacity-80 transition-opacity`}
            title={`Share on ${link.name}`}
          >
            <link.icon className="w-4 h-4" />
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="bg-gray-200 p-2 rounded-full text-gray-600 hover:bg-gray-300 transition-colors"
          title="Copy link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
