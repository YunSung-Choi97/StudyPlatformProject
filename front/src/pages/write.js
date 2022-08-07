import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Main from '../components/main';
import Seo from '../components/seo';
import useInput from '../hooks/use_input';
import useSelect from '../hooks/use_select';
import { newPost } from '../redux/actions/post';
import { loadMyInfo } from '../redux/actions/user';
import { setPage } from '../redux/reducers/page';
import wrapper from '../redux/store';
import styles from '../styles/write.module.css';

const Write = () => {
  const { newPostDone, newPostErrorMessage } = useSelector((state) => state.post);
  const { category } = useSelector((state) => state.page);
  const { myInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  // 글 작성에 필요한 입력 정보 (title, category, section, content)
  const [inputTitle, changeTitle] = useInput('');
  const [inputCategory, setCategory, changeCategory] = useSelect('커뮤니티');
  const [inputSection, setSection, changeSection] = useSelect('선택');
  const [inputContent, changeContent] = useInput('');

  // category 선택영역
  const categories = ['커뮤니티', '팀원 찾기', '후기/평점', '채용정보'];
  useEffect(() => {
    if (category) {
      if (category === 'community') { setCategory('커뮤니티'); }
      else if (category === 'find-member') { setCategory('팀원 찾기'); }
      else if (category === 'review') { setCategory('후기/평점'); }
      else if (category === 'recruitment') { setCategory('채용정보'); }
    } else {
      setCategory('커뮤니티');
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

  // 뒤로가기
  const backHandler = useCallback(() => {
    if (confirm('작성된 모든 내용은 저장되지 않습니다.\n이전 페이지로 이동하시겠습니까?')) {
      router.back();
    }
  }, []);

  // 작성한 게시글 제출
  const submitHandler = useCallback((event) => {
    event.preventDefault();
    if ((inputCategory === '커뮤니티' && inputSection === '선택') || (inputCategory === '팀원 찾기' && inputSection === '선택')) {
      return alert('게시글의 세부분류를 선택해주세요.');
    }
    const post_data = {
      id: myInfo.id,
      title: inputTitle,
      category: inputCategory,
      section: inputSection,
      content: inputContent,
    };
    dispatch(newPost(post_data));
  }, [inputTitle, inputCategory, inputSection, inputContent]);

  // 게시글 작성 성공
  useEffect(() => {
    if (newPostDone) {
      if (inputCategory === '커뮤니티') { router.replace(`/community/${newPostDone.id}`); }
      else if (inputCategory === '팀원 찾기') { router.replace(`/find-member/${newPostDone.id}`); }
      else if (inputCategory === '후기/평점') { router.replace(`/review/${newPostDone.id}`); }
      else if (inputCategory === '채용정보') { router.replace(`/recruitment/${newPostDone.id}`); }
    }
  }, [newPostDone]);

  // 게시글 작성 실패
  useEffect(() => {
    if (newPostDone) {
      alert(newPostErrorMessage);
    }
  }, [newPostErrorMessage]);

  return (
    <>
      <Seo title='DCW' />
      <Main>
        <form className={styles.container}>
          <div className={styles.title_box}>
            <p>제목</p>
            <input type='text' name='inputTitle' placeholder='글 제목을 입력해주세요' value={inputTitle} onChange={changeTitle} required />
          </div>
          <div className={styles.classification_box}>
            <p>분류</p>
            <div className={styles.category_box}>
              <select name='inputCategory' value={inputCategory} onChange={changeCategory}>
                {categories.map((category, idx) => {
                  return (<option key={idx} value={category}>{category}</option>);
                })}
              </select>
            </div>
            <div className={styles.section_box}>
              {inputCategory === '커뮤니티' || inputCategory === '팀원 찾기'
                ?
                <select name='inputSection' value={inputSection} onChange={changeSection}>
                  {sections.map((section, idx) => {
                    return (<option key={idx} value={section}>{section}</option>);
                  })}
                </select>
                :
                <select name='inputSection' value={inputSection} onChange={setSection} disabled>
                  {sections.map((section, idx) => {
                    return (<option key={idx} value={section}>{section}</option>);
                  })}
                </select>
              }
            </div>
          </div>
          <div className={styles.content_box}>
            <textarea name='inputContent' placeholder='내용을 입력해주세요' value={inputContent} onChange={changeContent} required />
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