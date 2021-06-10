import { Route, Switch } from "react-router-dom";

// Components
import SignIn from "../authentication/SignIn";
import SignUp from "../authentication/SignUp";
import ChangePassword from "../authentication/ChangePassword";
import CreateProfile from "../profile/CreateProfile";
import UpdateProfile from "../profile/UpdateProfile";
import Profiles from "../profile/Profiles";
import SingleProfile from "../profile/SingleProfile";
import Posts from "../post/Posts";
import SinglePost from "../post/SinglePost";
import AddPost from "../post/AddPost";
import Home from "../Home";
import PrivateRoute from "../routes/PrivateRoute";
import PageNotFound from "../PageNotFound";

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/SignIn" component={SignIn} />
        <PrivateRoute exact path="/ChangePassword" component={ChangePassword} />
        <PrivateRoute exact path="/CreateProfile" component={CreateProfile} />
        <PrivateRoute exact path="/UpdateProfile" component={UpdateProfile} />
        <PrivateRoute exact path="/Discover" component={Profiles} />
        <PrivateRoute
          exact
          path="/Profile/:firstName:lastName/:id"
          component={SingleProfile}
        />
        <PrivateRoute exact path="/Posts" component={Posts} />
        <PrivateRoute exact path="/Post/:fullName/:id" component={SinglePost} />
        <PrivateRoute exact path="/AddPost" component={AddPost} />
        <PrivateRoute exact path="/Home" component={Home} />
        <Route component={PageNotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
