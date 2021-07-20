import React from 'react';
import css from './FollowListItem.module.scss';
import { inject, observer } from 'mobx-react';

@inject('mypageFollow', 'seller')
@observer
class FollowListItem extends React.Component {
  render() {
    let { mypageFollow, data, seller } = this.props;
    return (
      <div className={css.wrap}>
        {/* 프로필 이미지 */}
        {data.profileImageUrl ? (
          <div
            className={css.sellerImage}
            style={{ backgroundImage: `url(${data.profileImageUrl})` }}
            onClick={() => seller.toSearch({ nickname: data.nickname })}
          />
        ) : (
          <div
            className={css.nosellerImage}
            onClick={() => seller.toSearch({ nickname: data.nickname })}
          >
            {data.nickname ? data.nickname : ''}
          </div>
        )}

        {/* 셀러 정보 */}
        <div className={css.sellerInfoSection}>
          {/* 셀러스토어 이름 */}
          <div className={css.sellerGreeting}>
            <span className={css.sellerName}>
              {`${
                data.storeIntroduction ? data.storeIntroduction : data.nickname
              }`}
            </span>
          </div>
          {/* 팔로워, 상품수 */}
          <div className={css.sellerInfo}>
            <div>
              <span className={css.sellerFollower}>{`팔로워 ${
                data.followerCount ? data.followerCount.toLocaleString() : '0'
              }`}</span>
            </div>
          </div>
        </div>

        {/* 팔로잉 / 팔로우 버튼 */}
        <div className={css.followSection}>
          {data.status ? (
            <div
              className={css.unfollowButton}
              onClick={() => {
                mypageFollow.deleteSellerFollow(data.sellerId);
              }}
            >
              팔로잉
            </div>
          ) : (
            <div
              className={css.followButton}
              onClick={() => {
                mypageFollow.setSellerFollow(data.sellerId);
              }}
            >
              팔로우
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default FollowListItem;
