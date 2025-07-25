import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { useEffect, useState } from "react";
import { favoritesStyles } from "../../assets/styles/favorites.styles";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import RecipeCard from "./../components/RecipeCard";
import NoFavoritesFound from "./../components/NoFavoritesFound";
import LoadingSpinner from "./../components/LoadingSpinner";
import {auth} from "./../../services/FirebaseConfig"
import { signOut } from "firebase/auth";
import { router } from "expo-router";
const FavoritesScreen = () => {
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("User signed out successfully.");
      // Redirect to login page or update UI
      router.replace('/auth/login')
    });
  }
  return (
    <View style={favoritesStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={favoritesStyles.header}>
          <Text style={favoritesStyles.title}>Favorites</Text>
          <TouchableOpacity
            style={favoritesStyles.logoutButton}
             onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={favoritesStyles.recipesSection}>
          <FlatList
            // data={favoriteRecipes}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={favoritesStyles.row}
            contentContainerStyle={favoritesStyles.recipesGrid}
            scrollEnabled={false}
            ListEmptyComponent={<NoFavoritesFound />}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default FavoritesScreen;
