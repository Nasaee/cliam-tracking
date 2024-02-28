import { redirect } from 'react-router-dom';

type Props = {
  children: JSX.Element;
  redirectPath?: string;
  passCondition: boolean;
};
const PrivateRoute = ({ children, redirectPath, passCondition }: Props) => {
  // TODO: handle authentication if user is admin

  if (redirectPath && !passCondition) {
    redirect(redirectPath);
  }

  return children;
};
export default PrivateRoute;
