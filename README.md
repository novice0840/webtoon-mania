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

- [ ] Swagger로 API 문서화하기
- [ ] 회원가입 기능 추가
- [ ] 로그인 기능 추가
- [ ] 로그인 시 데이터를 엑셀로 다운받을 수 있는 기능 추가
- [ ] 각 웹툰 별 댓글 기능 추가
- [ ] 각 웹툰 별 실시간 채팅방 추가
- [ ] Jest 사용하여 테스트 코드 짜기

## 완료된 기능

- [x] 웹툰작가 추가(크롤링)
- [x] 웹툰 클릭시 상세설명 추가(크롤링)
- [x] 크롤링 기능 정리 (init 함수 하나로 모든 크롤링이 되게 할 예정)
- [x] 메인페이지 별점순 정렬 기능 추가
- [x] 웹툰 정렬시 grid로 더 깔끔하게 보여주기
- [x] 챕터 정렬시 grid로 더 깔끔하게 보여주기
- [x] 챕터 정렬 기능 추가 (총 별점 순, 평균 별점 순, 최신순, 오래된순)
- [x] 태그 검색 기능 추가
- [x] 필터링 기능에 or 또는 and 선택지 추가 - 현재는 무조건 or 로 처리중
- [x] scheduler로 crawling 자동화
- [x] AWS에 배포
- [x] backend api 서버에 ssl 적용시키기
- [x] CI/CD 구축
