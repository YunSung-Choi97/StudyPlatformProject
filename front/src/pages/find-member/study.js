import Main from '../../components/main';
import Seo from '../../components/seo';
import FunctionalPart from '../../components/functional_part';
import setPageState from '../../hooks/set_page_state';
// import wrapper from '../../redux/store';

const Study = () => {
  setPageState('find-member', 'study');

  return (
    <>
      <Seo title='DCW' />
      <Main>
        <FunctionalPart />
      </Main>
    </>
  );
};

// SSR
// export const getServerSideProps = wrapper.getServerSideProps((store) => (context) => {
//   console.log('스토어');
//   console.log(store);
//   console.log('콘텍스트');
//   console.log(context);

//   if (context.query.status) {
//     store.dispatch(setPageAndStatus({
//       category: 'find-member',
//       section: 'study',
//       status: context.query.status
//     }));
//   } else {
//     store.dispatch(setPageAndStatus({
//       category: 'find-member',
//       section: 'study',
//       status: '전체'
//     }));
//   }

//   return {
//     props: {},
//   };
// });

export default Study;