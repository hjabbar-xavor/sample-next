import { Divider } from '@material-ui/core';
import { Footer, Header } from '.';

function Layout(props) {
  return (
    <>
      <Header {...props} />
      <main>
        {props.children}
      </main>
      <Divider/>
      <Footer {...props} />
    </>
  );
}

export default Layout;