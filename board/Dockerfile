# 기본 이미지로 Node.js 사용
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json (또는 yarn.lock) 복사
COPY package*.json ./

# 의존성 설치
RUN pnpm ci

# 소스 코드 복사
COPY . .

# 환경 변수 설정
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Next.js 애플리케이션 빌드
RUN pnpm run build

# 3000번 포트 노출
EXPOSE 3000

# 애플리케이션 실행
CMD ["pnpm", "start"]