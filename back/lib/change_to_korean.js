module.exports = changeToKorean = (english = '') => {
  // categories
  if (english === 'community') {
    return '커뮤니티';
  }
  if (english === 'find-member') {
    return '팀원 찾기';
  }
  if (english === 'review') {
    return '후기/평점';
  }
  if (english === 'recruitment') {
    return '채용정보';
  }
  // sections
  if (english === 'free') {
    return '자유 게시판';
  }
  if (english === 'information') {
    return '정보 게시판';
  }
  if (english === 'question') {
    return '질문 게시판';
  }
  if (english === 'study') {
    return '스터디';
  }
  if (english === 'project') {
    return '프로젝트';
  }
  if (english === 'contest') {
    return '공모전';
  }
  return null;
};