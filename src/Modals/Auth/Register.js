import { useState } from "react";
import { Button } from "@mui/material";
import PasswordTextfield from "./PasswordTextfield";
import CustomTextfield from "./CustomTexfield";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Typography from "@mui/material/Typography"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";
import classes from "./Auth.module.css";
import Modal from "../Modal";
import { actionCodeSettings } from "../../firebase";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const registerHandler = (e) => {
    e.preventDefault();
    if (username.length > 20) {
      alert("Username is too long. Must be less than 20 characters"); //TODO: improve this.
      return;
    }
    console.log(email);
    console.log(password);

    createUserWithEmailAndPassword(props.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        updateProfile(user, { displayName: username });
        sendEmailVerification(user, actionCodeSettings)
          .then(() => {
            console.log("email sent");
            alert("A verification email was sent to the entered address.");
            dispatch(uiActions.closeAuth());
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);
            setErrorMessage("An error occurred. Please retry.");
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage("Email is already in use.");
        } else {
          setErrorMessage("Please enter a valid email.");
        }
      });
    console.log("finish");
  };

  return (
    <Modal onClose={() => dispatch(uiActions.closeAuth())}>
      <form onSubmit={registerHandler} className={classes.signIn}>
        <h3>Register an account</h3>

        <CustomTextfield
          label={"Username"}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage(null);
          }}
          value={username}
          adornment={<PermIdentityIcon />}
        />

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

        <Button type="submit" className={classes.signInButton}>
          Register
        </Button>
        <Button onClick={props.switchToSignIn}>Sign in</Button>
      </form>
    </Modal>
  );
};

export default Register;
