import { observable, computed, action } from 'mobx';
import API from 'childs/lib/API';
import { isBrowser } from 'childs/lib/common/isServer';

/** 리뷰 카테고리 */
export const REVIEW_CATEGORY_LIST = [
  ['all', '전체'],
  ['cloth', '의류'],
  ['shoe', '슈즈'],
  ['bag', '가방'],
  ['wallet', '지갑'],
  ['accessory', '액세사리'],
];

/** 리뷰 이모티콘 */
export const REVIEW_EMOJI_LIST = [
  'THUMBS_UP',
  'CLAPPING_HANDS',
  'RAISING_HANDS',
  'FOLDED_HANDS',
  'SMILING_FACE_WITH_EYES',
  'SMILING_FACE_WITH_HEART_EYES',
  'SMILING_FACE_WITH_SUNGLASSES',
  'RED_HEART',
];

/** state enum */
export const STATE = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  LOADABLE: 'LOADABLE',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
};

/**
 * JSDoc typedefs
 *
 * @typedef {{
 *  id: number
 *  reviewImageList: object
 *  bookmarkCount: number
 *  commentCount: number
 *  rating: string
 *  nickname: string
 *  contents: string
 *  dealId: number
 *  lCategoryId: number
 *  mCategoryId: number
 *  sCategoryId: number
 *  sellerId: number
 *  productId: number
 *  productImageUrl: string
 *  brandName: string
 *  myBookmarkReview: boolean
 *  season: string
 *  dealName: string
 * }} Review review object
 *
 * @typedef {{
 *  page: number
 *  unitPerPage: number
 *  categoryName: string
 * }} Params request params
 */

class ReviewStore {
  /**
   * finite state machine
   * @private singleton state
   */
  @observable _state = STATE.INITIAL;
  @computed get state() {
    return ReviewStore.instance._state;
  }

  /**
   * Updates current store's state
   * @param {STATE} state
   */
  @action updateState(state) {
    ReviewStore.instance._state = state;
  }
  @computed get isInitial() {
    return (
      this.totalElements === Infinity ||
      ReviewStore.instance._state === STATE.INITIAL
    );
  }
  @computed get isLoading() {
    return ReviewStore.instance._state === STATE.LOADING;
  }
  @computed get isLoadable() {
    return ReviewStore.instance._state === STATE.LOADABLE;
  }
  @computed get hasError() {
    return ReviewStore.instance._state === STATE.ERROR;
  }

  /** singleton instance for shared FSM state */
  static instance;
  constructor(root, initialState) {
    if (isBrowser) {
      this.root = root;

      if (initialState.review) {
        const { hashtags } = initialState.review;
        if (hashtags) {
          this.hashtags = hashtags;
          this.hashtagInitialized = true;
        }
      }
    }
    if (!ReviewStore.instance) {
      ReviewStore.instance = this;
    }
  }

  /**
   * statics
   */
  static initialParams = {
    page: 1,
    unitPerPage: 10,
    categoryName: '전체',
    hashtag: '',
  };

  /**
   * observables
   */
  ssr = false;
  // request payload
  @observable params = ReviewStore.initialParams;

  // response payload
  @observable totalPages = Infinity;
  /** @type {Review[]} */
  @observable reviews = [];
  /** @type {string[]} popular hashtags (popularityHashtagList) */
  @observable hashtags = [];
  hashtagInitialized = false;

  /**
   * computeds
   */
  /** Check if there are more resource to fetch */
  @computed get moreToLoad() {
    return this.params.page < this.totalPages;
  }

  /**
   * actions
   */
  /** resets request payload data */
  @action resetData() {
    this.totalPages = Infinity;
    this.reviews = [];
    // this.hashtags = [];
  }

  @action fetch = async () => {
    if (this.error) {
      console.error('API jammed!');
      // this.root.alert.showAlert('검색 오류! 다시 시도해주세요.');
      this.updateState(STATE.LOADABLE);
      this.error = false;
    }

    if (this.moreToLoad && this.isLoadable) {
      this.updateState(STATE.LOADING);
      try {
        if (!this.params.hashtag) {
          const {
            data: { data },
          } = await API.user.get(
            `/reviews/all?page=${this.params.page}&unitPerPage=${
              this.params.unitPerPage
            }&categoryName=${this.params.categoryName}`
          );

          this.reviews = this.reviews.concat(
            data.userProductReviewResponsePage.content // fetched reviews
          );

          if (this.params.page === 1 || this.totalPages === Infinity) {
            this.totalPages = data.userProductReviewResponsePage.totalPages;
          }
        } else {
          const {
            data: { data },
          } = await API.user.get(
            `/reviews/search/hashtag?hashtag=${this.params.hashtag}page=${
              this.params.page
            }&unitPerPage=${this.params.unitPerPage}&categoryName=${
              this.params.categoryName
            }`
          );

          this.reviews = this.reviews.concat(data.content);

          if (this.params.page === 1 || this.totalPages === Infinity) {
            this.totalPages = data.totalPages;
          }
        }

        this.params.page++;

        if (this.moreToLoad) {
          this.updateState(STATE.LOADABLE);
        } else {
          this.updateState(STATE.LOADED);
        }
      } catch (error) {
        console.error(error.message);
        this.error = true;
      }
    }
  };

  @action async fetchHashtags() {
    if (!this.hashtagInitialized) {
      try {
        const { data } = await API.user.get('/reviews/popularity/hashtag');
        this.hashtagInitialized = true;

        if (this.hashtags.length === 0) {
          const hashtags = data.data;
          this.hashtags = hashtags;
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  @action initializeFetch = (
    params = { categoryName: '전체', hashtag: '' }
  ) => {
    this.resetData();

    this.params = { ...ReviewStore.initialParams, ...params };

    this.updateState(STATE.LOADABLE);

    this.fetchHashtags();
    this.fetch();
  };

  /**
   * =============== BELOW ARE UI RELATED ACTIONS ===============
   */
  fetchReview = async (reviewId) => {
    try {
      const { data } = await API.user.get(`/reviews/${reviewId}`);
      const review = data.data;
      return review;
    } catch (error) {
      console.error(error.message);
    }
  };
}

export default ReviewStore;
