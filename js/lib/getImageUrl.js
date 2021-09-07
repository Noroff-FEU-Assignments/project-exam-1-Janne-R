export default function getImageUrl(featuredMediaId, featuredMediaList) {
  let selectedMedia = null;

  featuredMediaList.forEach(function (featuredMedia) {
    if (featuredMedia.id === featuredMediaId) {
      selectedMedia = featuredMedia;
    }
  });

  if (selectedMedia) {
    return selectedMedia.media_details.sizes.full.source_url;
  } else {
    return "";
  }
}