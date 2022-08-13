const changeToEnglish = (korean = '') => {
  // categories
  if (korean === '커뮤니티') {
    return 'community';
  }
  if (korean === '팀원 찾기') {
    return 'find-member';
  }
  if (korean === '후기/평점') {
    return 'review';
  }
  if (korean === '채용정보') {
    return 'recruitment';
  }
  // sections
  if (korean === '자유 게시판') {
    return 'free';
  }
  if (korean === '정보 게시판') {
    return 'information';
  }
  if (korean === '질문 게시판') {
    return 'question';
  }
  if (korean === '스터디') {
    return 'study';
  }
  if (korean === '프로젝트') {
    return 'project';
  }
  if (korean === '공모전') {
    return 'contest';
  }
  return null;
};

export default changeToEnglish;