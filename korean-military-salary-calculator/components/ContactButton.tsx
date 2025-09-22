import React from 'react';
import { ChatBubbleIcon } from './Icons';

export const ContactButton: React.FC = () => {
  return (
    <a
      href="http://pf.kakao.com/_mkkSn"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-blue-600 text-white font-bold py-3 px-5 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 z-50"
      aria-label="코드레이어로 문의하기"
    >
      <ChatBubbleIcon />
      <span className="ml-2 text-sm">코드레이어로 문의하기</span>
    </a>
  );
};
