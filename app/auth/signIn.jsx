import { View, Text, Image, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import Input from "../../Components/shared/Input"
import Button from "../../Components/shared/Button"
import { Link, useRouter } from "expo-router"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../services/FirebaseConfig"
import { api } from "./../../convex/_generated/api"
import {useMutation} from "convex/react"
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'


export default function signIn() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { user, setUser } = useContext(UserContext);
  const createNewUser = useMutation(api.Users.CreateNewUser);

   const onSignIn = () => {
          if (!name || !email || !password)
          {
              Alert.alert("Missing Fields!", "Enetr required fiels")
              return
          }
          createUserWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
              // Signed up
              const user = userCredential.user;
              console.log(user);
              if (user) {
                const result = await createNewUser({
                  name: name,
                  email:email,
                })
                console.log(result);
                setUser(result);
              }
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
              // ..
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
          }}
        >
          <Input placeholder={"Full Name"} onChangeText={setName} />
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
        <Button title={"Sign In"} onPress={() => onSignIn()} />
      </View>

      <View
        style={{
          alignItems: "center",
          marginTop: 10,
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
      </View>
    </View>
  );
}