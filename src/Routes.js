import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";

import AuthRoute from "./components/routes/AuthRoute";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Loading from "./components/loading/Loading";

const Header = React.lazy(() => import("./components/layouts/Header"));

const Footer = React.lazy(() => import("./components/layouts/Footer"));

const MobileNavigation = React.lazy(() =>
  import(
    /* webpackChunkName: "header" */ "./components/layouts/MobileNavigation"
  )
);

const Login = React.lazy(() =>
  import(/* webpackChunkName: "login" */ "./pages/authPages/login")
);

const Register = React.lazy(() =>
  import(/* webpackChunkName: "register" */ "./pages/authPages/register")
);

const Logout = React.lazy(() =>
  import(/* webpackChunkName: "logout" */ "./pages/authPages/logout")
);

const ChangePassword = React.lazy(() =>
  import(
    /* webpackChunkName: "change-password" */ "./pages/authPages/changePassword"
  )
);

const ResetPassword = React.lazy(() =>
  import(
    /* webpackChunkName: "reset-password" */ "./pages/authPages/resetPassword"
  )
);

const ResetPasswordConfirm = React.lazy(() =>
  import(
    /* webpackChunkName: "reset-password-confirm" */ "./pages/authPages/resetPasswordConfirm"
  )
);

const Profile = React.lazy(() =>
  import(/* webpackChunkName: "profile" */ "./pages/profilePages/profile")
);

const PersonalInfo = React.lazy(() =>
  import(
    /* webpackChunkName: "personal-info" */ "./pages/profilePages/personalInfo"
  )
);

const PersonalInfoEdit = React.lazy(() =>
  import(
    /* webpackChunkName: "personal-info-edit" */ "./pages/profilePages/personalInfoEdit"
  )
);

const Addresses = React.lazy(() =>
  import(/* webpackChunkName: "addresses" */ "./pages/profilePages/addresses")
);

const FavoriteProducts = React.lazy(() =>
  import(
    /* webpackChunkName: "favorite-products" */ "./pages/profilePages/favoriteProducts"
  )
);

const RecommendedProducts = React.lazy(() =>
  import(
    /* webpackChunkName: "recommended-products" */ "./pages/profilePages/recommendedProducts"
  )
);

const Products = React.lazy(() =>
  import(/* webpackChunkName: "products" */ "./pages/productPages/products")
);

const ProductsDetail = React.lazy(() =>
  import(
    /* webpackChunkName: "products-detail" */ "./pages/productPages/productsDetail"
  )
);

const Home = React.lazy(() =>
  import(/* webpackChunkName: "products" */ "./pages/homePages/Home")
);

const Index = () => <Redirect to="/home" />;

const Routes = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <React.Suspense fallback={<Loading />}>
      <Container maxWidth="lg">{!matches && <Header />}</Container>
      <div style={{ height: "40px" }}></div>
      <Loading inFetching />
      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/" component={Index} />
          <ProtectedRoute exact path="/logout" component={Logout} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <AuthRoute exact path="/reset-password" component={ResetPassword} />
          <AuthRoute
            exact
            path="/reset-password/:token"
            component={ResetPasswordConfirm}
          />
          <ProtectedRoute
            exact
            path="/change-password"
            component={ChangePassword}
          />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute
            exact
            path="/profile/personal-info"
            component={PersonalInfo}
          />
          <ProtectedRoute
            exact
            path="/profile/personal-info/edit"
            component={PersonalInfoEdit}
          />
          <ProtectedRoute
            exact
            path="/profile/addresses"
            component={Addresses}
          />
          <ProtectedRoute
            exact
            path="/profile/favorite-products"
            component={FavoriteProducts}
          />
          <ProtectedRoute
            exact
            path="/profile/recommended-products"
            component={RecommendedProducts}
          />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/:slug" component={ProductsDetail} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Container>
      <div style={{ height: "56px" }}></div>
      {!matches && <Footer />}
      {matches && <MobileNavigation />}
    </React.Suspense>
  );
};

export default Routes;
