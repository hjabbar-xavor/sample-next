import React from 'react';
import get from 'lodash.get';
import { Link } from '..';

export default class Post extends React.Component {
  render() {
    let post = get(this.props, 'item', null);
    let postUrl = '/blog/' + get(post, 'slug.value', '#');

    return (
      <article>
        <div>
          {get(post, 'image.value[0]', null) && (
            <Link href={postUrl}>
              {/* TODO use Next Image Component */}
              <img width="100%" src={get(post, 'image.value[0].url', null)} alt={get(post, 'image.value[0].description') || get(post, 'image.value[0].name', null)} />
            </Link>
          )}
          <div>
            <header>
              <h3><Link href={postUrl}>{get(post, 'title.value', null)}</Link></h3>
            </header>
            <div>
              <p>{get(post, 'excerpt.value', null)}</p>
            </div>
            <footer className="post-meta">
              <time>{get(post, 'publishing_date.value', null) && new Date(get(post, 'publishing_date.value', null)).toDateString()}</time>
              {get(post, 'author.value[0]', null) &&
                    (', by ' + get(post, 'author.value[0].first_name.value', null) + ' ' + get(post, 'author.value[0].last_name.value', null))}
            </footer>
          </div>
        </div>
      </article>
    );
  }
}
