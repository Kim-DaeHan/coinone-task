# 기본 이미지 선택
FROM node:20.7.0

# 작업 디렉토리 설정
WORKDIR /app

# 소스 코드 복사
COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

# 애플리케이션 실행 명령어 설정
CMD ["yarn", "start"]