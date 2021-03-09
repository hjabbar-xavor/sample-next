import { Footer, Header } from '.';
import { Button } from '@material-ui/core';

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