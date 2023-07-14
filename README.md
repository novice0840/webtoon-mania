# 네이버 웹툰 분석기

## 네이버 웹툰은 정보를 제공해주는 API가 없어 직접 크롤링해서 웹툰에 관한 부가적인 정보를 볼 수 있도록 만든 사이트

## Tech Stack

React(Vite), MUI, React-query, React-Router-Dom <br/>
Nestjs, Typeorm, MySQL

## 실행 방법

Backend

```
cd ./backend
npm install
npm run start:dev
```

Frontend

```
cd ./frontend
npm install
npm run dev
```

## ToDoList

- [ ] 별점순 기능 추가
- [ ] 별점 차트 숫자 잘림
- [ ] 웹툰 정렬시 grid로 더 깔끔하게 보여주기
- [ ] 챕터 정렬시 grid로 더 깔끔하게 보여주기
- [ ] 챕터 정렬 기능 추가 (총 별점 순, 평균 별점 순, 최신순, 오래된순)

<img src="./img/architecture.png">
