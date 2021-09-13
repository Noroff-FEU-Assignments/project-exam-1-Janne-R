export default function getImageUrl(version, featuredMediaId, featuredMediaList) {
  let selectedMedia = null;

  featuredMediaList.forEach(function (featuredMedia) {
    if (featuredMedia.id === featuredMediaId) {
      selectedMedia = featuredMedia;
    }
  });

  if (selectedMedia) {
    return selectedMedia.media_details.sizes[version].source_url;
  } else {
    return "";
  }
}