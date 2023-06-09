export const analytics = (w, d, s, l, i) => {
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  let dl = l !== 'dataLayer' ? '&l=' + l : '';
  let scr = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;

  //* To avoid Multiple installations of google tag manager detected warning
  if (!scriptExists(scr)) {
    let f = d.getElementsByTagName(s)[0];
    let j = d.createElement('script');
    j.async = true;
    j.src = scr;
    f?.parentNode?.insertBefore(j, f);
  }
};

const scriptExists = url => {
  var scripts = document.getElementsByTagName('script');
  for (var i = scripts.length; i--; ) {
    if (scripts[i].src === url) return true;
  }
  return false;
};
