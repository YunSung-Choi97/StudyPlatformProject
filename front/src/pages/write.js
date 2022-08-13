import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Main from '../components/main';
import Seo from '../components/seo';
import changeToEnglish from '../hooks/change_to_english';
import changeToKorean from '../hooks/change_to_korean';
import useInput from '../hooks/use_input';
import { addPost } from '../redux/actions/post';
import { loadMyInfo } from '../redux/actions/user';
import { setPage } from '../redux/reducers/page';
import wrapper from '../redux/store';
import styles from '../styles/write.module.css';

const Write = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.page);
  const { addPostDone, addPostError } = useSelector((state) => state.post);
  const { myInfo } = useSelector((state) => state.user);

  // 글 작성에 필요한 입력 정보 (title, category, section, content)
  const [inputTitle, changeInputTitle] = useInput('');
  const [inputCategory, changeInputCategory, setInputCategory] = useInput('커뮤니티');
  const [inputSection, changeInputSection, setInputSection] = useInput('선택');
  const [inputContent, changeInputContent] = useInput('');

  // category 선택영역
  const categories = ['커뮤니티', '팀원 찾기', '후기/평점', '채용정보'];
  useEffect(() => {
    if (category) {
      setInputCategory(changeToKorean(category));
    } else {
      setInputCategory('커뮤니티');
    }
  }, []);

  // section 선택영역
  const [sections, setSections] = useState(['선택']);
  useEffect(() => {
    if (inputCategory === '커뮤니티') {
      setSections(['선택', '자유 게시판', '정보 게시판', '질문 게시판']);
    } else if (inputCategory === '팀원 찾기') {
      setSections(['선택', '스터디', '프로젝트', '공모전']);
    } else setSections(['선택']);
  }, [inputCategory]);

  // 이전 페이지로 이동
  const backHandler = useCallback(() => {
    if (confirm('작성된 모든 내용은 저장되지 않습니다.\n이전 페이지로 이동하시겠습니까?')) {
      router.back();
    }
  }, []);

  // 게시글 작성하기 요청
  const submitHandler = useCallback((event) => {
    event.preventDefault();
    if ((inputCategory === '커뮤니티' && inputSection === '선택') || (inputCategory === '팀원 찾기' && inputSection === '선택')) {
      return alert('게시글의 세부분류를 선택해주세요.');
    }

    dispatch(addPost({
      id: myInfo.id,
      title: inputTitle,
      category: inputCategory,
      section: inputSection,
      content: inputContent,
    }));
  }, [inputTitle, inputCategory, inputSection, inputContent]);

  // 게시글 작성하기 요청 성공
  useEffect(() => {
    if (addPostDone) {
      router.replace(`/${changeToEnglish(inputCategory)}/${addPostDone.id}`);
    }
  }, [addPostDone, inputCategory]);

  // 게시글 작성하기 요청 실패
  useEffect(() => {
    if (addPostDone) {
      alert(addPostError);
    }
  }, [addPostError]);

  return (
    <>
      <Seo title='DCW' />
      <Main>
        <form className={styles.container}>
          <div className={styles.title_box}>
            <p>제목</p>
            <input type='text' name='inputTitle' placeholder='글 제목을 입력해주세요' value={inputTitle} onChange={changeInputTitle} required />
          </div>
          <div className={styles.classification_box}>
            <p>분류</p>
            <div className={styles.category_box}>
              <select name='inputCategory' value={inputCategory} onChange={changeInputCategory}>
                {categories.map((category, idx) => {
                  return (<option key={idx} value={category}>{category}</option>);
                })}
              </select>
            </div>
            <div className={styles.section_box}>
              {inputCategory === '커뮤니티' || inputCategory === '팀원 찾기'
                ?
                <select name='inputSection' value={inputSection} onChange={changeInputSection}>
                  {sections.map((section, idx) => {
                    return (<option key={idx} value={section}>{section}</option>);
                  })}
                </select>
                :
                <select name='inputSection' value={inputSection} onChange={setInputSection} disabled>
                  {sections.map((section, idx) => {
                    return (<option key={idx} value={section}>{section}</option>);
                  })}
                </select>
              }
            </div>
          </div>
          <div className={styles.content_box}>
            <textarea name='inputContent' placeholder='내용을 입력해주세요' value={inputContent} onChange={changeInputContent} required />
          </div>
          <div className={styles.button}>
            <button className={styles.back_button} type='button' onClick={backHandler}>뒤로가기</button>
            <button className={styles.submit_button} type='submit' onClick={submitHandler}>저장</button>
          </div>
        </form>
      </Main>
    </>
  );
};

// SSR
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 1. 로그인 상태 확인 및 내 정보 불러오기
  // 현재 브라우저에서 로그인을 하면서 생성된 쿠키가 있는지 확인
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch(loadMyInfo());

  // 2. 로그인 하지 않은 사용자인 경우 home화면으로 이동
  if (!store.getState().user.isLoggedIn) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  // 3. 페이지 상태 설정
  store.dispatch(setPage({
    name: 'write',
    category: context.query.category ? context.query.category : null,
  }));

  return {
    props: {},
  };
});

export default Write;