import { useState } from "react";
import { Button } from "@mui/material";
import PasswordTextfield from "./PasswordTextfield";
import CustomTextfield from "./CustomTexfield";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Typography from "@mui/material/Typography";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";
import classes from "../ModalForm.module.css";
import Modal from "../Modal";
import { actionCodeSettings } from "../../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const registerHandler = async (e) => {
    e.preventDefault();
    if (username.length > 20) {
      alert("Username is too long. Must be less than 20 characters");
      return;
    }
    try {
      if (!(await usernameAvailabile())) {
        setErrorMessage("That username is taken.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        props.auth,
        email,
        password
      ); //create user account
      const user = userCredential.user;

      await addDoc(collection(db, "Users"), {
        //register the username
        uid: user.uid,
        username: username,
        timestamp: new Date().getTime()
      });

      updateProfile(user, { displayName: username }); //set the username to the user

      await sendEmailVerification(user, actionCodeSettings); //send verification
      console.log("email sent");
      dispatch(uiActions.showNotification({status: 'success', message:'A verification email was sent to the entered address.'}))
      dispatch(uiActions.closeAuth());
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email is already in use.");
      } else {
        setErrorMessage("Please enter a valid email.");
      }
    }
    console.log("finish");
  };

  const usernameAvailabile = async () => {
    console.log("hello?");
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("username", "==", username));
    try {
      const snapShot = await getDocs(q);
      snapShot.forEach((doc) => {
        console.log(doc.data());
      });
      console.log(snapShot.empty);
      return snapShot.empty;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <Modal onClose={() => dispatch(uiActions.closeAuth())}>
      <form onSubmit={registerHandler} >
        <h3>Register an account</h3>

        <CustomTextfield
          label={"Username"}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage(null);
          }}
          value={username}
          adornment={<PermIdentityIcon />}
          maxLength={20}
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

        <Button type="submit" className={classes.formButton}>
          Register
        </Button>
        <Button onClick={props.switchToSignIn}>Sign in</Button>
      </form>
    </Modal>
  );
};

export default Register;
