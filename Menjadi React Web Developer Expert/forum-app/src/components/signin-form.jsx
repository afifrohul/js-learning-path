import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SigninInput from '@/components/signin-input';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '@/states/authUser/action';
import { useNavigate } from 'react-router-dom';

export function SigninForm({ className, ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onSignin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));

    navigate('/')
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <SigninInput signin={onSignin} />
        </CardContent>
      </Card>
    </div>
  );
}
