import { cn } from '@/lib/utils';
import { FC } from 'react';
import { Button } from './ui/Button';

interface UserAuthFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button size="sm" className="w-full">
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
