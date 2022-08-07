const changeQuery = (router, newStatus = router.query.status, newSearch = router.query.search, newPage = router.query.page) => {
  let newQuery = '';  // 이동할 url의 query
  // status 변경
  if (newStatus) {
    newQuery += `status=${newStatus}`;
  }
  // search 변경
  if (newSearch) {
    if (newQuery) {
      newQuery += `&search=${newSearch}`;
    } else {
      newQuery += `search=${newSearch}`;
    }
  }
  // page 변경
  if (newPage) {
    if (newQuery) {
      newQuery += `&page=${newPage}`;
    } else {
      newQuery += `page=${newPage}`;
    }
  }

  if (newQuery) {
    newQuery = '?' + newQuery;
  }

  return newQuery;
};

export default changeQuery;