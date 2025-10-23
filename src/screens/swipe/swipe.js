// // @file SwipeLogin.tsx

// import * as React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';

// const SwipeLogin = () => {
//   const [activeSwipe, setActiveSwipe] = React.useState('left');
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [username, setUsername] = React.useState('');
//   const [password, setPassword] = React.useState('');

//   const handleSwipeLeft = () => {
//     if (shuffle([1,2])) {
//       setActiveSwipe('right')
//       const timer = setTimeout(() => {
//         alert(`Welcome ${username}!`);}
//         , 2000);
//     } else {
//       setActiveSwipe('left')
//     }
//   };

//   const handleSwipeRight = () => {
//     if(Math.random()<.5){
//       setActiveSwipe('right')
//       const timer = setTimeout(() => {
//         alert(`Welcome ${username}!`)
//         clearTimeout(timer)},100)
//  };
//  shuffle=[1,2];
//   }
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Swipe Login</Text>
//       {activeSwipe == "left"&&<TouchableOpacity onPress={handleSwipeLeft}> 
//         <View style={{
//           width:100,
//           height:100,
//           backgroundColor:'red',
//           borderRadius:10,
//           justifyContent:"space-evenly",
//           alignItems:"center"
//         }} >
//           <Text style={{ color: 'white','marginBottom':20 }}>Get Started</Text>
//           <Text >OR</Text>
//         </View> 
//       </TouchableOpacity>}
//      {activeSwipe == "right"&&<TouchableOpacity onPress={handleSwipeRight}> 
//        <View style={{
//          width:100,
//          height:150,
//          backgroundColor:'green'
//         , borderRadius:10,
//         justifyContent:"space-evenly",
//           alignItems:"center"
//     }} >
//        <Text style={{ color: 'white' }} >Start Login</Text>
//        <Text ></Text>
//    </View> 
//    </TouchableOpacity>}
//       {isLoading &&
//       <View style={{
//         width:40,
//         height:8,
//         backgroundColor:'#3490db',
//         margin: 20
//       }}
//     />}
//     {!isLoading && (
//       <View style={{alignItems:"center"}}>

//          {/* <TextInput placeholder="Username" value={username} onChangeText={(text) => setUsername(text)} style={{width:200, height:40}} />
         
//          <TextInput placeholder="Password" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} style={{ width: 250, height: 40 }} /> */}

//           <TouchableOpacity onPress={() => alert(`Login successful as ${username}`)}>
//             <View style={{
//               backgroundColor: '#e67e73',
//               paddingVertical:50,
//               paddingHorizontal:10,
//             }}>
//                 {activeSwipe == "left" ? (
//                   <Text>Log in</Text>
//                  ) :  ((activeSwipe=="right")&& ( (password.length>=0)))?(
//                     <Text> login success </Text>
//                    ) : 
//                      (<Text>Login</Text>)
//                   }
//               </View>
//           </TouchableOpacity>
  
//        </View>)}
//     </View>
//   );
// };

// export default SwipeLogin;


