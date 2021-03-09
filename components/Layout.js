import { Footer, Header } from '.';

function Layout(props) {
  return (
    <>
      <Header {...props} />
      <main>
        {props.children}
      </main>
      <Footer {...props} />
    </>
  );
}

export default Layout;