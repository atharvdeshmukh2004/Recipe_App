import { Text, View, Image, Dimensions } from "react-native";
import Button from "../Components/shared/Button";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./../services/FirebaseConfig"
import { UserContext } from "./../context/userContext";
import { useContext, useEffect } from "react";
import { useConvex } from "convex/react";
import { api } from "./../convex/_generated/api";
import LottieView from "lottie-react-native";
import Animated from "react-native-reanimated";
import { useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";


export default function Index() {
  const animation = useRef(null);
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const convex = useConvex();

  useEffect(() => {
    const unsbuscribe = onAuthStateChanged(auth, async (userInfo) => {
      console.log(userInfo?.email);
      const userData = await convex.query(api.Users.GetUser, {
        email: userInfo?.email,
      });
      console.log(userData);
      setUser(userData);
      router.replace("/screens/favorites");
    });

    return () => unsbuscribe();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("./../assets/images/background.png")}
        style={{
          position: "absolute",
          width: wp(100),
          height: hp(100),
          resizeMode: "cover",
        }}
      />

      <View
        style={{
          position: "absolute",
        }}
      >
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: wp(50),
            height: hp(50),
          }}
          source={require("./../app/lottie/food-logo.json")}
        />

        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 28,
          }}
        >
          Food Cafe
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontWeight: "300",
            fontSize: 16,
          }}
        >
          Explore some delicious Food
        </Text>

        <View style={{
          marginTop: 10,
        }}>
          <Button title={" Get Started"} onPress={() => router.push('/auth/signIn')} />
        </View>
      </View>
    </View>
  );
}
