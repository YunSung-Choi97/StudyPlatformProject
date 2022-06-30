# Study Platform Project

- 목적 : 실제 웹사이트를 제작하며 전반적인 공부
- 목표 : 스터디 모집을 위한 웹사이트 제작

<br>

## 시작하기

두 터미널을 열어 다음의 명령어 각각 실행

1. client 디렉토리로 이동 후 필요한 module 설치 후 실행
```
cd client
npm install
npm run start
```
2. server 디렉토리로 이동 후 필요한 module 설치 후 실행
```
cd server
npm install
npm run start
```
> 개발 환경에서는 server를 nodemon을 통해 실행했고, 이를 위해 2번째 동작 중 npm run start 대신 npm run dev을 입력해주었다.

<br>

## History

### 초기 화면 제작 (22.05.11)

create-react-app을 통해 웹 앱 생성 및 임시 홈 화면 제작

<br>

### 불필요한 파일 제거 (22.05.13)

create-react-app으로 생성된 불필요한 파일, 내용, 주석 제거

<br>

### main 컴포넌트 제작, PostCss 도입 (22.05.16)

화면에서 header를 제외한 부분을 main 컴포넌트로 제작

main 컴포넌트는 검색을 위한 search 컴포넌트와 모집상태, 글쓰기를 위한 write 컴포넌트로 구성

PostCss 도입 (가장 큰 이유로는 컴포넌트별로 CSS 코드를 나눠 작성해 유지/보수가 용이하도록 하고 싶었고, 함께 작업 할 때 conflict를 줄이고자 도입)

<br>

### header 컴포넌트 제작, 코드 리팩토링, 기능파트 UI 수정 (22.05.19)

header 컴포넌트 제작

CSS reset 파트를 별도 파일로 분리, 사소한 변경 사항들 변경 및 코드 정리

모집상태를 위한 status 컴포넌트, 검색을 위한 search 컴포넌트, 글쓰기를 위한 write 컴포넌트 수정 (기능 구현 X)

<br>

### navbar, status, writing 기능 구현, 글쓰기 모드 및 기능 구현, UI 및 CSS 수정  (22.05.22)

header에서 field 선택을 하는 navbar에 대한 기능 구현, 모집상태를 보여주는 status 컴포넌트 기능 구현, 글쓰기 모드로 변경을 위한 writing 컴포넌트 기능 구현

글쓰기 모드 및 글쓰기 기능 추가

현재 상태를 알 수 있도록 active 영역 표현, hover 효과 표현, 사용자 지정 색상으로 색상들 통일

<br>

### 리액트 라우터 도입 시도 (22.05.26)

react-router-dom을 통해 url에 따라 라우팅 시도

<br>

### 서버 파트와 클라이언트 파트 분리, 라우팅 url 수정, url에 따른 state 반영 (22.05.28)

프로젝트를 기존에 제작한 client 파트와 정보를 받아올 server 파트로 분리

query string을 이용한 url에서 parameters를 이용한 url로 수정

url이 변경됨에 따라 원하는 정보가 표현될 수 있도록 state가 반영되도록 수정

<br>

### contents 정보 get & post 임시 구현 (22.05.29)

기존 state로 관리된 리스트 모드에서 보이는 모든 글 정보 contents를 서버에서 관리하도록 수정

contents를 서버에서 get 요청을 통해 불러오고 post 요청을 통해 새로운 글 추가가 가능하도록 수정

<br>

### 검색 기능 및 초기화 버튼 기능 구현, 컨텐츠 모드 추가 (22.05.30)

검색 기능과 초기화 기능 추가

작성된 글의 내용을 확인할 수 있는 컨텐츠 모드 추가

<br>

### 오류 수정 (22.05.31)

디버깅 코드 삭제 과정 중 새로운 글을 글 목록에 추가하는 코드 탈락된 오류 수정

<br>

### react-redux 도입, 중첩 라우팅 도입, 사소한 오류 개선 (22.06.02)

useState를 통해 관리하던 대부분의 state를 react-redux를 이용해 관리하도록 수정 (사유 : props가 많아짐에 따라 직관적이지 못한 코드, state 관리를 좀 더 안전하고 편리하게 하기 위해)

중첩 라우팅 방식 도입과 outlet 도입 (사유 : 앞으로 페이지가 늘어날 것을 고려해 페이지 관리가 좀 더 깔끔하게 하기 위해)

react를 run 했을 때 뜨는 에러 메시지들 개선

<br>

### URL 변경, UI 변경 (22. 06. 03)

리스트 모드의 URL 변경 (Parameter => Query String), URL에 따라 state가 변하도록 설정

컨텐츠 모드 UI 변경

<br>

### 데이터베이스 연결, FE 리팩토링 (22.06.08)

mysql 데이터베이스와 연결 및 DB로부터 contents 정보 불러오기

URL 변경 과정에서 발생한 중복 부분들 함수로 변경

<br>

### 로그인 기능 구현, BE 리팩토링 (22. 06. 10)

FE : 로그인 UI 생성, 로그인 상태를 반영하는 header UI로 개선

BE : 로그인 기능 구현 (DB의 유저 정보 인증확인, 세션을 통한 로그인 상태 관리)

BE에서 기능에 따라 모듈로 분리

<br>

### 회원가입 기능 구현 (22. 06. 28)

회원가입 기능 구현

<br>

