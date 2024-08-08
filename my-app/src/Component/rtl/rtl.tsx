import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import React from 'react';
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
function Rtl(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}
export default Rtl;