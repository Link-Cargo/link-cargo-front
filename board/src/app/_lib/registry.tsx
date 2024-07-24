'use client';
import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // 서버스타일시트를 생성 : useState의 lazy initial state를 사용하여 한 번만 생성됩니다.
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  // useServerInsertedHTML 훅을 사용하여 서버에서 삽입된 HTML을 처리합니다.
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // 클라이언트 측 실행 시, 자식 요소(children)를 그대로 반환합니다.
  if (typeof window !== 'undefined') return <>{children}</>;

  // 서버 측 실행 시, StyleSheetManager로 감싸서 자식 요소를 반환합니다.
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
