// devtools.js — creates the DevTools panel
chrome.devtools.panels.create(
  'Resp Diff',
  'icons/icon16.png',
  'panel.html',
  function (panel) {
    console.log('Resp Diff panel created');
  }
);
