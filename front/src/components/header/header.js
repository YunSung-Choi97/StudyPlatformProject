import Image from 'next/image';
import Link from 'next/link';

import logo from '../../images/temp_logo.png';
import styles from '../../styles/header.module.css';
import User from './user';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href='/'>
            <a><Image src={logo} alt='logo' width={70} height={24} /></a>
          </Link>
        </div>
        <nav className={styles.nav}>
          <div className={styles.community}>
            <div>
              <Link href='/community'>
                <a>커뮤니티</a>
              </Link>
            </div>
            <div className={styles.community_dropdown}>
              <Link href='/community/free'>
                <a>자유 게시판</a>
              </Link>
              <Link href='/community/question'>
                <a>질문 게시판</a>
              </Link>
              <Link href='/community/information'>
                <a>정보 게시판</a>
              </Link>
            </div>
          </div>
          <div className={styles.find_member}>
            <div>
              <Link href='/find-member'>
                <a>팀원 찾기</a>
              </Link>
            </div>
            <div className={styles.find_member_dropdown}>
              <Link href='/find-member/study'>
                <a>스터디</a>
              </Link>
              <Link href='/find-member/project'>
                <a>프로젝트</a>
              </Link>
              <Link href='/find-member/contest'>
                <a>공모전</a>
              </Link>
            </div>
          </div>
          <div className={styles.review}>
            <Link href='/review'>
              <a>후기/평점</a>
            </Link>
          </div>
          <div className={styles.recruitment}>
            <Link href='/recruitment'>
              <a>채용정보</a>
            </Link>
          </div>
        </nav>
        <User />
      </div>
    </header>
  );
};

export default Header;