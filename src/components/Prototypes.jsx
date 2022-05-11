const prototypes = [
  {
    id: "pp-01",
    title: "Cpa 스터디원 구합니다",
    field: "고시/공무원",
    area: "서울"
  },
  {
    id: "pp-02",
    title: "한화 솔루션",
    field: "취업",
    area: "서울"
  },
  {
    id: "pp-03",
    title: "전시회",
    field: "취미/교양",
    area: "서울"
  },
  {
    id: "pp-04",
    title: "프로젝트 인원 구합니다",
    field: "프로그래밍",
    area: "인천"
  },
  {
    id: "pp-05",
    title: "자바스크립트 코테 스터디",
    field: "프로그래밍",
    area: "대구"
  },
  {
    id: "pp-06",
    title: "ios 앱 개발 해보실 분",
    field: "프로그래밍",
    area: "서울"
  },
  {
    id: "pp-07",
    title: "같이 카공",
    field: "자율",
    area: "대전"
  },
  {
    id: "pp-08",
    title: "JLPT 스터디",
    field: "어학",
    area: "서울"
  },
  {
    id: "pp-09",
    title: "평일 영어스피킹",
    field: "어학",
    area: "서울"
  },
  {
    id: "pp-10",
    title: "토익 990 스터디 구합니다",
    field: "어학",
    area: "부산"
  },
  {
    id: "pp-11",
    title: "포스코 생산기술직 면접 스터디",
    field: "취업",
    area: "광주"
  },
];

export default function Prototypes() {
  return (
    <main>
      <div className="prototypes">{prototypes.map(prototype => {
        const {id, title, field, area} = prototype;
        return (<div className="prototype" key={id}>
          <div className="prototype__body">
            <p className="prototype__title">{title}</p>
            <p className="prototype__field">{field}</p>
            <p className="prototype__area">{area}</p>
          </div>
        </div>);
      })}</div>
    </main>
  );
}