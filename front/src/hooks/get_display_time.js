const getDisplayTime = (createdDate = '') => {
  // 현재 시각
  const tempNow = new Date();
  const now = `${tempNow.getFullYear()}-${(tempNow.getMonth() + 1).toString().padStart(2, '0')}-${tempNow.getDate().toString().padStart(2, '0')} ${tempNow.getHours().toString().padStart(2, '0')}:${tempNow.getMinutes().toString().padStart(2, '0')}:${tempNow.getSeconds().toString().padStart(2, '0')}`;

  // 시간 차이
  const secDiff = Number(now.substring(17, 19)) - Number(createdDate.substring(17, 19));
  const minDiff = Number(now.substring(14, 16)) - Number(createdDate.substring(14, 16));
  const hourDiff = Number(now.substring(11, 13)) - Number(createdDate.substring(11, 13));
  const dayDiff = Number(now.substring(8, 10)) - Number(createdDate.substring(8, 10));
  const monthDiff = Number(now.substring(5, 7)) - Number(createdDate.substring(5, 7));
  const yearDiff = Number(now.substring(0, 4)) - Number(createdDate.substring(0, 4));
  const timeDiff = secDiff + minDiff * 60 + hourDiff * 3600 + dayDiff * 86400 + monthDiff * 2592000 + yearDiff * 31536000;

  // 표시할 시간
  if (timeDiff > 31536000) {
    return `${parseInt(timeDiff / 31536000)}년 전`;
  }
  if (timeDiff > 2592000) {
    return `${parseInt(timeDiff / 2592000)}달 전`;
  }
  if (timeDiff > 86400) {
    return `${parseInt(timeDiff / 86400)}일 전`;
  }
  if (timeDiff > 3600) {
    return `${parseInt(timeDiff / 3600)}시간 전`;
  }
  if (timeDiff > 60) {
    return `${parseInt(timeDiff / 60)}분 전`;
  }
  return '방금 전';
};

export default getDisplayTime;