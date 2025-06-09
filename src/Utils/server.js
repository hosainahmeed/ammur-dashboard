export const url = `http://10.0.60.52:5001/api/v1`;

export const imageUrl = (image) => {
  return image
    ? image?.startsWith('http')
      ? image
      : image?.startsWith('/')
      ? `${url}${image}`
      : `${url}/${image}`
    : 'https://placehold.co/400';
};
