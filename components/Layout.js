import { get } from 'lodash.get'
import { Helmet } from 'react-helmet';
import { Footer, Header } from '.';

const Layout = (props) => {
  const title = get(props, 'page.label.value', get(props, 'page.title.value', null)) + ' | ' + get(props, 'data.config.title', null);
  const font = get(props, 'data.config.base_font', null) || 'nunito-sans';

  if (get(props, 'page.seo__title.value', null)) {
    title = get(props, 'page.seo__title.value', null);
  }


  return (
    <>
      <Helmet>
        <title>{title}</title>
        {/* TODO */}
      </Helmet>
      <div>
        <Header {...this.props} />
        <main>
          {this.props.children}
        </main>
        <Footer {...this.props} />
      </div>
    </>
  );

}

export default Layout;