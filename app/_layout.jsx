
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { UserContext } from "../context/userContext";
import { useState } from "react";

export default function RootLayout() {
  const CONVEX_URL = "https://accomplished-cat-37.convex.cloud";
  const convex = new ConvexReactClient(CONVEX_URL, {
    unsavedChangesWarning: false,
  });

  const [user, setUser] = useState();
  return (
    
    <ConvexProvider client={convex}>
      <UserContext.Provider value={{setUser}}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
        </Stack>
        </UserContext.Provider>
      </ConvexProvider>
  
  );
}
