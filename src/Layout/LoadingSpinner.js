import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
