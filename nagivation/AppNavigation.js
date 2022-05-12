import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//import Intro from '../screens/Intro';
import Login from "../screens/Login";
import Acceuil from "../screens/Acceuil";
//import Intro from "../screens/Intro";
//import ConnexionPhone from '../screens/auth/ConnexionPhone';
//import Register from '../screens/auth/Register'

const Stack = createStackNavigator();
function AppNavigation(props) {
  return (
    <Stack.Navigator>
      {/*<Stack.Screen  name="Intro" component={Intro} options={{headerShown:false}}/>*/}
      {/* <Stack.Screen
        name="Intro"
        component={Intro}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Posez vos questions à Aboussouan"
        component={Login}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Chatbot"
        component={Acceuil}
        options={{ headerShown: true }}
      />

      {/* <Stack.Screen  name="Login" component={Login} options={{headerShown:true}}/> */}
      {/* <Stack.Screen  name="Register" component={Register} options={{headerShown:false}}/> */}
    </Stack.Navigator>
  );
}
export default AppNavigation;
