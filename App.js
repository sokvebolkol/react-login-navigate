import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MainTabScreen from "./app/screens/MainTabScreen";
import SupportScreen from "./app/screens/SupportScreen";
import SettingScreen from "./app/screens/SettingScreen";
import BookmarkScreen from "./app/screens/BookMarkScreen";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name="SupportScreen" component={SupportScreen} />
        <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
        <Drawer.Screen name="SettingsScreen" component={SettingScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
