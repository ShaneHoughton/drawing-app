import { useState } from "react";
import { Button } from "@mui/material";
import PasswordTextfield from "./PasswordTextfield";
import CustomTextfield from "./CustomTexfield";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";
import {
  setPersistence,
  browserLocalPersistence,
  sendEmailVerification,
} from "firebase/auth";
import { actionCodeSettings } from "../../firebase";
import classes from "./Auth.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import Modal from "../Modal";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [reverify, setReverify] = useState(false);
  const auth = props.auth;
  const dispatch = useDispatch();

  const signInHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // const user = userCredential.user;
        console.log("User signed in:", auth.currentUser.emailVerified);
        const user = auth.currentUser;
        if (!user.emailVerified) {
          setErrorMessage(
            "Account is not yet verified. Accept the verification link sent to your email."
          );
          setReverify(true);
        } else {
          console.log(user.email);
          setPersistence(auth, browserLocalPersistence);
          dispatch(uiActions.closeAuth());
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        setErrorMessage("Account information is not recognized.");
      });
  };

  const resendEmailHandler = () => {
    sendEmailVerification(props.auth.currentUser, actionCodeSettings)
      .then(() => {
        console.log("email sent");
        dispatch(uiActions.closeAuth());
      })
      .catch((error) => {
        if (error.code === "auth/too-many-requestsFirebase") {
          alert("Please wait a minute before resending another email.");
          dispatch(uiActions.closeAuth());
        }
        console.log("error happening");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
        setErrorMessage("An error occurred. Please retry.");
      });
  };

  return (
    <Modal onClose={() => dispatch(uiActions.closeAuth())}>
      <form onSubmit={signInHandler} className={classes.signIn}>
        <h3>Sign in to your account</h3>

        <CustomTextfield
          label={"Email"}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage(null);
          }}
          value={email}
          adornment={<MailOutlineIcon />}
        />

        <PasswordTextfield
          label={"Password"}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage(null);
          }}
          value={password}
        />
        {errorMessage && (
          <Typography variant="caption" color="error">
            {errorMessage}
          </Typography>
        )}
        {!reverify && (
          <>
            <Button type="submit" className={classes.signInButton}>
              Sign In
            </Button>
            <Button onClick={props.switchToRegister}>Register account</Button>
          </>
        )}
        {reverify && (
          <Button onClick={resendEmailHandler} className={classes.signInButton}>
            Resend email
          </Button>
        )}
      </form>
    </Modal>
  );
};

export default SignIn;
