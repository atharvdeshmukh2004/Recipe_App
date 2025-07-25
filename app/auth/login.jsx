import { View, Text, Image, Alert } from "react-native";
import React, { useContext, useState } from "react";
import Input from "../../Components/shared/Input";
 import Button from "../../Components/shared/Button";
 import { Link, useRouter } from "expo-router";
 import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../services/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useConvex } from "convex/react";
import { UserContext } from "../../context/userContext";
import { api } from "./../../convex/_generated/api";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import Animated from "react-native-reanimated";
import { useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Login() {
   const animation = useRef(null);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const convex = useConvex();
  const { user, setUser } = useContext(UserContext);

  const onlogin = () => {
      if (!email || !password) {
        ToastAndroid.show("Invalid email and password")
        return;
      }
      signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
          // Signed in
          const user = userCredential.user;
          const userData = await convex.query(api.Users.GetUser, {
            email:email,
          })
         
          console.log(userData);
          setUser(userData);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
          
          if (errorCode == "auth/invalid-credential") {
           Alert.alert("Invalid data please enter valid data")
          }
        });
      
     
    }

  return (

      <View
        style={{
          flex: 1,
          alignItems: "center",
          padding: 20,
        }}
      >
        <Image
          source={require("../../assets/images/rm.png")}
          style={{
            marginTop: 20,
            width: 200,
            height: 150,
          }}
        />
             
        <Text
          style={{
            marginTop: 15,
            fontSize: 30,
          }}
        >
          Create New Account
        </Text>

        <View
          style={{
            width: "100%",
            marginTop: 20,
          }}
        >
          <Input placeholder={"Email"} onChangeText={setEmail} />
          <Input
            placeholder={"Password"}
            password={true}
            onChangeText={setPassword}
          />
        </View>

        <View
          style={{
            marginTop: 15,
            width: "100%",
          }}
        >
          <Button title={"Login"} onPress={() => onlogin()} />
        </View>

        <View
          style={{
            alignItems: "center",
            marginTop: 15,
            gap: 5,
          }}
        >
          <Text
            style={{
              alignItems: "center",
              fontSize: 16,
            }}
          >
            Don't Have an Account
          </Text>
          <Link href={"/auth/signIn"}>
            <Text
              style={{
                color: "blue",
                fontSize: 16,
              }}
            >
              Create an account
            </Text>
          </Link>
        </View>
      </View>
  
  );
} 
      {/* 
      

      <View
        style={{
          width: "100%",
          marginTop: 20,
        }}
      >
       
        <Input placeholder={"Email"} onChangeText={setEmail} />
        <Input
          placeholder={"Password"}
          password={true}
          onChangeText={setPassword}
        />
      </View>

      <View
        style={{
          marginTop: 15,
          width: "100%",
        }}
      >
        <Button title={"Sign In"} onPress={() => onlogin()} />
      </View>

      <View
        style={{
          alignItems: "center",
          marginTop: 15,
          gap: 5,
        }}
      >
        <Text
          style={{
            alignItems: "center",
            fontSize: 16,
          }}
        >
          Already Have an Account
        </Text>
        <Link href={"/auth/login"}>
          <Text
            style={{
              color: "blue",
              fontSize: 16,
            }}
          >
            Login to Account
          </Text>
        </Link>
      </View> */}
    
 

