import React, { useEffect, useState } from 'react';
import styles from './main.module.css'
import Status from './list_mode/status';
import Search from './list_mode/search';
import Writing from './list_mode/writing';
import List from './list_mode/list';
import WritingMode from './writing_mode/writing_mode';

function Main(props) {
  const [contentId, setContentId] = useState(4);
  const [userId, setUserId] = useState('최윤성');
  const [contents, setContents] = useState([
    {
      id: 1,
      title: "컴활 1급 실기 독고리 스터디메이트 2분 더 구해요",
      body: "글 전에 올렸던 사람인데 \n하실분 있나요?? \n글은 아래에 자세히 써놨어요~~\n비대면 4회 대면 1회\n월화수목금 9시~3시 30분 사이 오후 6시반에서 9시 사이에 시간 조율해서 스터디 할 거에용\n지금 저 포함해서 2명 있습니다~\n방식은 Zoom 스터디+ 대면 가끔하는 스터디\n독고리 영상을 보고 따라 하는 거구 \n모르겠는거 도와주는 스터디에요\n어렵지 않아요~\n교재 찍어서 올려드리구 그 문제 읽고 따라하시면 되용 기출문제와 파일은 있던거 (시나공 이기적 영진 등 다 가져오세요)~ 톡으로 얘기하구 정해봐요\nZoom 화면공유해서 하는것도 직접 보여드려요~!!\n오늘은 저녁타임에 할거 같아요~",
      recruitment: "모집중",
      field: "프로그래밍",
      area: "인천",
      author: "최윤성",
      date: "2022. 5. 16. 11:00"
    },
    {
      id: 2,
      title: "분당 자바 알고리즘 스터디 모집",
      body: "백엔드 개발자로 일하고 있는 0년차 신입입니다!\n알고리즘을 다시 공부하고 싶은데 혼자는 잘 안하게 돼서 스터디원분들을 모집합니다.\n밑에 스터디 방식은 예전에 스터디할 때 사용했던 방식인데 얘기 나누면서 수정 가능합니다.\n\n[스터디 방식]\n1. 백준 문제 창고에 실버에서 골드 단계 문제를 선별해서 넣습니다. (+ 프로그래머스)\n2. 1주일마다 1명씩 돌아가면서 풀고싶은 3문제를 선별합니다.\n3. 금요일 ~ 화요일 동안 자유롭게 문제를 풉니다.\n4. 풀이한 문제는 PULL REQUESTS 에 정리해서 Open 합니다.\n5. 수요일, 목요일 9시 전까지 리뷰를 작성합니다.\n6. 목요일 9시에 전체 리뷰하면서 Closed 합니다.\n\n\n\n[리뷰 작성 방식]\n1. 코드관련 리뷰는 Commits 에 작성합니다.\n2. 기타 리뷰는 Conversation 에 작성합니다.\n3. 모든 문제에 리뷰를 1줄 이상 작성합니다. (매주 (인원수 * 3)개 문제에 리뷰)",
      recruitment: "모집완료",
      field: "프로그래밍",
      area: "수원",
      author: "신동현",
      date: "22-05-16 11:07"
    },
    {
      id: 3,
      title: "사이드 프로젝트 함께 진행하실 분 모집합니다",
      body: "어느정도 프로젝트는 진행중입니다 현재는 디자인 1, 프론트 1, 백 3으로 이루어졌고 프론트엔드 개발자 공석이 생겨서 구하게 되었습니다 백엔드는 spring을 사용하고 있고요 react에 대해 기초 정도만 알아도 가능해요",
      recruitment: "모집중",
      field: "취업",
      area: "인천",
      author: "이제우",
      date: "22-05-16 11:30"
    },
  ]);

  // const [contents, setContents] = useState([]);
  // useEffect(() => {
  //   fetch('contents.json')
  //   .then((result) => {
  //     return result.json();
  //   })
  //   .then((json) => {
  //     setContents(json);
  //   })
  // });
  
  let body;
  if (props.mode === 'list') {
    body =
      <>
        <section className={styles.functional_part}>
          <div className={styles.filter}>
            <Status status={props.status} onChangeStatus={(recruit) => { props.onChangeStatus(recruit) }} />
            <Search />
          </div>
          <Writing onChangeMode={(mode) => { props.onChangeMode(mode); }} />
        </section>
        <section className={styles.list}>
          <List field={props.field} status={props.status} contents={contents} />
        </section>
      </>
  } else if (props.mode === 'writing') {
    body = <WritingMode
      onChangeContents={(title, body, field, area) => {
        const newContent = { id: contentId, title: title, body: body, recruitment: '모집중', field: field, area: area, author: userId, date: new Date().toLocaleString() };
        const newContents = [...contents];
        newContents.push(newContent);
        setContents(newContents);
        setContentId(contentId + 1);
        props.onChangeMode('list');
        props.onChangeStatus('전체');
      }} />
  }

  return (
    <main>
      <section className={styles.container}>
        {body}
      </section>
    </main>
  );
}

export default Main;