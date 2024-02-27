import { registViewFlow } from 'x-view-model';

export type LoginContext = {
  user: {
    email: string;
    pwd: string;
  };
};

export type LoginFlow = {
  login_screen: {
    mounted: {};
  };
};

export const LoginVM = registViewFlow<LoginContext, LoginFlow>(
  {
    user: {
      email: '',
      pwd: '',
    },
  },
  {
    login_screen: {
      invoke: function (context: LoginContext, err?: any): void {
        console.log('check api 요청 후 user context에 user 정보 입력');
      },
      onDone: undefined,
      onError: undefined,
    },
    'login_screen.mounted': {
      invoke: function (context: LoginContext, err?: any): void {
        throw new Error('Function not implemented.');
      },
      onDone: undefined,
      onError: undefined,
    },
  },
);
