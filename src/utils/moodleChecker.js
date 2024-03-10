// src/utils/moodleChecker.js

function isMoodlePage(htmlContent) {
  const moodleIndicators = [
    'class="block-region"',
    'id="page-mod-workshop-view"',
    'class="modtype_forum"',
    'class="course-content"',
    'class="side-pre"',
    'class="side-post"',
    'id="page-mod-forum-view"',
    'id="page-mod-assignment-view"',
    'id="page-course-view"',
    'id="region-main"',
    'class="section main clearfix"',
    // Add more indicators as needed
  ];

  return moodleIndicators.some((indicator) => htmlContent.includes(indicator));
}

module.exports = { isMoodlePage };
