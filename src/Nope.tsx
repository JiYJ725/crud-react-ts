import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Nope = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/crud-react-ts');
  });
  return <></>;
}

export default Nope;
