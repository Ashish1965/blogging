export async function getServerSideProps(ctx) {
  const cookie = nookies.get(ctx);

  if (!cookie.token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  const res = await fetch(`${baseUrl}/api/task`, {
    headers: {
      Authorization: cookie.token,
    },
  });
  const res2 = await res.json();
  // console.log(res2);
  return {
    props: {
      Tasks: res2,
    },
  };
}
