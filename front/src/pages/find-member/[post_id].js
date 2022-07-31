import { useRouter } from "next/router";

const FindMemberPost = () => {
  const router = useRouter();
  const { post_id } = router.query;
  return (
    <div>
      {post_id}
    </div>
  );
};

export default FindMemberPost;