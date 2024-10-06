'use client';

import React, { useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';
import { useSearchParams, useRouter } from 'next/navigation';

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  const router = useRouter();
  useEffect(() => {
    router.push(`/dashboard#chat?chatRoomId=${params.id}`);
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <RingLoader size={60} color="#36d7b7" />
    </div>
  );
}
