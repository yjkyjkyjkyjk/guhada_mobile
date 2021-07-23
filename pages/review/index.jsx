import { observer } from 'mobx-react';
import isServer from 'childs/lib/common/isServer';
import API from 'childs/lib/API';
import { getLayoutInfo } from 'stores/LayoutStore';
import HeadForSEO from 'childs/lib/components/HeadForSEO';
import Review from 'template/Review';

function ReviewPage({ initialState }) {
  /**
   * render
   */
  return (
    <>
      <HeadForSEO pageName="리뷰" />
      <Review initialReviewStore={initialState?.review} />
    </>
  );
}

ReviewPage.getInitialProps = async function({ pathname, query }) {
  const initialProps = { layout: {} };

  if (isServer) {
    const { type, headerFlags } = getLayoutInfo({ pathname, query });

    initialProps.initialState = {
      layout: { type, headerFlags },
    };

    try {
      const { data } = await API.user.get('/reviews/popularity/hashtag');

      initialProps.initialState.review = { hashtags: data.data };
    } catch (error) {
      console.error(error.message);
    }
  }

  return initialProps;
};

export default observer(ReviewPage);
