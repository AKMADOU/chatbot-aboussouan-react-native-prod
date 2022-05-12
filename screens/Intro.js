// import React from "react";

// import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
// function Intro({ navigation }) {
//   return (
//     <View
//       style={{
//         flex: 1,
//         marginTop: 30,
//         alignItems: "center",
//         paddingHorizontal: 20,
//         backgroundColor: "#009688",
//       }}
//     >
//       <Image
//         source={require("../assets/volkeno.png")}
//         style={{
//           width: 60,
//           height: 55,
//           marginTop: 55,
//           justifyContent: "center",
//         }}
//       />

//       <Text
//         style={{
//           lineHeight: 48,
//           marginTop: -12,
//           fontSize: 14,
//           color: "#FFFFFF",
//           textAlign: "center",
//         }}
//       >
//         Volkeno
//       </Text>

//       <View
//         style={{
//           width: 282,
//           height: 196,
//           marginTop: 120,
//           justifyContent: "center",
//         }}
//       >
//         <Text
//           style={{
//             textTransform: "uppercase",
//             lineHeight: 48,
//             fontSize: 36,
//             color: "#FFFFFF",
//             textAlign: "center",
//           }}
//         >
//           ABOUSSOUAN {"\n"}
//         </Text>
//       </View>

//       <View style={{ flex: 1, justifyContent: "flex-end" }}>
//         <View
//           style={{
//             padding: 10,
//             width: "100%",
//             flexDirection: "row",
//             justifyContent: "space-evenly",
//           }}
//         >
//           <TouchableOpacity
//             style={{
//               backgroundColor: "white",
//               borderRadius: 10,
//               justifyContent: "center",
//               alignItems: "center",
//               padding: 15,
//               width: "45%",
//               marginVertical: 10,
//             }}
//             onPress={() =>
//               navigation.navigate("Posez vos questions à Aboussouan")
//             }
//           >
//             <Text
//               style={{
//                 color: "black",
//                 //textTransform: "uppercase",
//                 fontSize: 12,
//                 lineHeight: 15,
//                 width: 80,
//                 textAlign: "center",
//               }}
//             >
//               Ouvrir le chatbot
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {},
// });
// export default Intro;
