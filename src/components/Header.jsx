export default function Header() {
  return (
    <header>
      <div className="header__container">
        <div className="title">Study Finding</div>
        <div className="sub-menu">
          <div className="btn__area">
            <a href="/signin" target="_BLANK" rel="noreferrer">
              <button>로그인</button>
            </a>
            <a href="/joinin" target="_BLANK" rel="noreferrer">
              <button>회원가입</button>
            </a>
          </div>
        </div>
        <div className="main-menu">
          <ul className="item">
            <li>전체</li>
            <li>어학</li>
            <li>취업</li>
            <li>고시/공무원</li>
            <li>취미/교양</li>
            <li>프로그래밍</li>
            <li>기타</li>
          </ul>
        </div>
      </div>
    </header>
  );
}