import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { axiosInstance, useAxiosAuth } from "./services/axiosConfig";
import { FilmCreate, FilmEdit, FilmShow, FilmsList } from "./pages/film";
import { SceneCreate, SceneList, SceneShow } from "./pages/scenes";
import { CharactersList, SceneEdit } from "./pages/characters";
function App() {
  useAxiosAuth();
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider(
                  axiosInstance.defaults.baseURL as string,
                  axiosInstance
                )}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  {
                    name: "film",
                    list: "/film",
                    create: "/film/create",
                    edit: "/film/edit/:id",
                    show: "/film/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "scenes",
                    list: "/scenes",
                    create: "/scenes/create",
                    edit: "/scenes/edit/:id",
                    show: "/scenes/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "characters",
                    list: "/characters",
                    create: "/characters/create",
                    edit: "/characters/edit/:id",
                    show: "/characters/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "K4klfy-iKeLMd-0kl4nP",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={Header}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="film" />}
                    />
                    <Route path="/film">
                      <Route index element={<FilmsList />} />
                      <Route path="create" element={<FilmCreate />} />
                      <Route path="edit/:id" element={<FilmEdit />} />
                      <Route path="show/:id" element={<FilmShow />} />
                    </Route>

                    {/* <Route path="/scenes">
                      <Route index element={<SceneList />} />
                      <Route path="create" element={<SceneCreate />} />
                      <Route path="edit/:id" element={<SceneEdit />} />
                      <Route path="show/:id" element={<SceneShow />} />
                    </Route>
                    <Route path="/characters">
                      <Route index element={<CharactersList />} />
                      <Route path="create" element={<SceneCreate />} />
                      <Route path="edit/:id" element={<SceneEdit />} />
                      <Route path="show/:id" element={<SceneShow />} />
                    </Route> */}

                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
