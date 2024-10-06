'use client';

import React, { useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      router.push(`/dashboard#chat?chatRoomId=${id}`);
    }
  }, [id, router]);

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
