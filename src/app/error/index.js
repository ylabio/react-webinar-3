import MainNav from "../../components/main-nav";
import PageLayout from "../../components/page-layout"

export default function Error({error}) {

  return (
    <PageLayout>
      <MainNav/>
      {error && <h1>{error.message}</h1>}
    </PageLayout>
    );
}

Error.defaultProps = {
  error: {},
}
