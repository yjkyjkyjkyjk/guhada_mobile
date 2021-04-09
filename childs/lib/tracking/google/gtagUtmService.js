import sessionStorage from 'childs/lib/common/sessionStorage';

export default function gtagUtmService() {
  const search = window.location.search.substring(1);
  if (search.length) {
    const { utm_source, utm_medium } = JSON.parse(
      '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function(key, value) {
        return key === '' ? value : decodeURIComponent(value);
      }
    );

    if (utm_source || utm_medium) {
      const _utm_source = sessionStorage.get('utm_source');
      const _utm_medium = sessionStorage.get('utm_medium');

      if (!_utm_source || (_utm_source && _utm_source !== utm_source)) {
        sessionStorage.set('utm_source', utm_source);
      }
      if (!_utm_medium || (_utm_medium && _utm_medium !== utm_medium)) {
        sessionStorage.set('utm_medium', utm_medium);
      }
      return {
        utm_source,
        utm_medium,
      };
    }
  }
  return {};
}
