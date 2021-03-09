import { Layout } from "../components"

function LandingPage(props) {
  return (
    <Layout {...props}>
      {/* TODO */}
      {props.page.label.value}
    </Layout>
  );
}

export default LandingPage;