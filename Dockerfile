# 기본 이미지로 Node.js 사용
FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

# 작업 디렉토리 설정
WORKDIR /app

# 루트 디렉토리의 전체 파일을 /app/board 디렉토리로 복사
COPY . /app/board

# Next.js 프로젝트 디렉토리로 이동
WORKDIR /app/board

# 의존성 설치
RUN pnpm ci

# 환경 변수 설정
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Next.js 애플리케이션 빌드
RUN pnpm run build

# 3000번 포트 노출
EXPOSE 3000

# 애플리케이션 실행
CMD ["pnpm", "start"]
