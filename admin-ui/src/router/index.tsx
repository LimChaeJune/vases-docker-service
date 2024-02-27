import { Route, Routes } from 'react-router';
import { RootPage } from '~/pages';
import { AdminPage } from '~/pages/AdminPage';
import { RootRouterGuard } from '~/router/guards';
import { AdminRouterGuard } from '~/router/guards/admin';
import { MainTemplate } from '~/templates/MainTemplate';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRouterGuard />}>
        <Route index element={<RootPage></RootPage>}></Route>
        <Route path="admin" element={<AdminRouterGuard />}>
          <Route path={'*'} element={<MainTemplate />}>
            <Route index element={<AdminPage />}></Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
