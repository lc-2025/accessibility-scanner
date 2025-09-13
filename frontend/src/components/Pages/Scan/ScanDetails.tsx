import { useParams } from 'react-router';

function ScanDetails() {
  const params = useParams();
  const { id } = params;

  return <>{id}</>;
}

export default ScanDetails;
