import css from './SearchTab.module.scss';
import { useState, useEffect } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';
import useStores from 'stores/useStores';
import SearchMenu from './SearchMenu';
import AutocompleteSearchMenu from './AutocompleteSearchMenu';
import router from 'next/router';
import ModalPortal from 'components/templates/ModalPortal';
import qs from 'querystring';

const SearchTab = () => {
  /**
   * states
   */
  const { newMain: newMainStore, keyword: keywordStore } = useStores();
  const [isExpand, setIsExpand] = useState(0);
  const [searchInput, setSearchInput] = useState(() => {
    if (typeof window === 'object') {
      const { keyword } = qs.parse(window.location.search.substring(1));
      return keyword ? keyword : '';
    }
    return '';
  });

  /**
   * handlers
   */
  const handleChange = (e) => {
    if (e.target.value === ' ') {
      return;
    }
    if (e.target.value.slice(-2) === '  ') {
      return;
    }
    setSearchInput(e.target.value);
  };

  const handleBackClick = () => {
    if (isExpand) {
      setIsExpand(0);
    } else {
      window.history.back();
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      return handleSearch(searchInput.trim());
    }
    if (keywordStore.autoComplete) {
      if (!searchInput) {
        setIsExpand(0);
        return;
      }
      keywordStore.getAutoComplete(searchInput.trim());
      setIsExpand(2);
    }
  };

  const handleSearch = (input) => {
    setIsExpand(0);
    if (input) {
      setSearchInput(input);
      keywordStore.addItem(input);
      router.push(`/search?keyword=${input}`);
      return;
    }

    if (!searchInput) {
      setSearchInput(newMainStore.mainData.placeholder);
    }
    keywordStore.addItem(searchInput);
    router.push(`/search?keyword=${searchInput}`);
  };

  const handleDelete = () => {
    setSearchInput('');
    setIsExpand(0);
  };

  /**
   * side effects
   */
  useEffect(() => {
    if (isExpand > 0) {
      document.body.style.overflow = 'hidden';
    }
    return () => (document.body.style.overflow = 'unset');
  }, [isExpand]);

  /**
   * render
   */
  return (
    <div className={css['tab']}>
      <div className={css['tab__buttons']}>
        <div
          className={cn(css['button'], 'icon back')}
          onClick={handleBackClick}
        />
      </div>
      <input
        type="text"
        value={searchInput}
        placeholder={newMainStore.mainData.placeholder || '검색하기'}
        onKeyUp={handleKeyUp}
        onChange={handleChange}
        onFocus={() => setIsExpand(1)}
        onClick={() => setIsExpand(1)}
      />
      <div className={css['tab__buttons']}>
        {searchInput && (
          <div
            className={cn(css['button'], 'misc keyword-delete')}
            onClick={handleDelete}
          />
        )}
        <div
          className={cn(css['button'], 'icon search')}
          onClick={() => handleSearch()}
        />
      </div>
      {isExpand > 0 && (
        <ModalPortal
          handleOpen={() => setIsExpand(1)}
          handleClose={() => setIsExpand(0)}
          shade={false}
          gutter
          minHeight
        >
          <SearchMenu handleSearch={handleSearch} />
          {isExpand === 2 && (
            <AutocompleteSearchMenu
              list={keywordStore.autoCompleteList}
              handleSearch={handleSearch}
              fixed
            />
          )}
        </ModalPortal>
      )}
    </div>
  );
};

export default observer(SearchTab);
