import ContentLoader from 'react-content-loader';

const Skeleton = () => {
  return (
    <ContentLoader
      speed={1}
      width={300}
      height={505}
      viewBox="0 0 300 505"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="5" y="4" rx="10" ry="10" width="290" height="340" />
      <rect x="5" y="351" rx="10" ry="10" width="290" height="70" />
      <rect x="5" y="428" rx="6" ry="6" width="120" height="20" />
      <rect x="5" y="455" rx="6" ry="6" width="120" height="45" />
      <rect x="175" y="455" rx="6" ry="6" width="120" height="45" />
    </ContentLoader>
  );
};

export default Skeleton;
