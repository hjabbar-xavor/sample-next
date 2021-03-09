import get from "lodash.get";
import upperFirst from "lodash.upperFirst";
import camelCase from "lodash.camelCase";
import { Layout, UnknownComponent } from "../components"
import sections from '../components/sections';

function LandingPage(props) {
  return (
    <Layout {...props}>
      { get(props, 'page.content.value[0].sections.value', []).map((section, index) => {
        const contentType = upperFirst(camelCase(get(section, 'system.type', null)));
        const Component = sections[contentType];

        if (process.env.NODE_ENV === 'development' && !Component) {
          console.error(`Unknown section component for section content type: ${contentType}`)
          return (
            <UnknownComponent key={index} {...props}>
              <pre>{JSON.stringify(section, undefined, 2)}</pre>
            </UnknownComponent>
          );
        }

        return (
          <Component key={index} {...props} section={section} site={props} />
        )
      })
      }
    </Layout>
  );
}

export default LandingPage;