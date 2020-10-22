import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabScreen from "./app/screens/MainTabScreen";
import SupportScreen from "./app/screens/SupportScreen";
import SettingScreen from "./app/screens/SettingScreen";
import BookmarkScreen from "./app/screens/BookMarkScreen";

import CustomDrawer from "./app/screens/CustomDrawer";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        {/* These navigations don't have Tab and Stack  */}
        <Drawer.Screen name="BookmarksScreen" component={BookmarkScreen} />
        <Drawer.Screen name="SettingsScreen" component={SettingScreen} />
        <Drawer.Screen name="SupportsScreen" component={SupportScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
