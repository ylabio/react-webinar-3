function Comments({ comments }) {
  console.log(comments);
  return (
    <div>
      {comments.map((item) => (
        <div></div>
      ))}
    </div>
  );
}
export default Comments;
