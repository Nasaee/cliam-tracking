import { redirect } from 'react-router-dom';

type Props = {
  children: JSX.Element;
  redirectPath?: string;
  passCondition: boolean;
};
const PrivateRoute = ({ children, redirectPath, passCondition }: Props) => {
  if (redirectPath && passCondition) {
    redirect(redirectPath);
  }

  return children;
};
export default PrivateRoute;
