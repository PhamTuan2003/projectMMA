import { AntDesign, Entypo, EvilIcons, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
// 📗 khai báo thư viện mà expo hổ trỡ để lấy giá trị chiều cao  statusBar
import Constants from "expo-constants";

import RenderHtml, { HTMLContentModel, HTMLElementModel } from 'react-native-render-html';


const NewsDetailScreen = () => {
    
      const [onlineRef] = useState(new Animated.Value(0.5));
      useEffect(() => {
        const spin = onlineRef.interpolate({
          inputRange: [0,1],
          outputRange: [0.5,1],
        });
     
        Animated.loop(
          Animated.timing(
            onlineRef,
            {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }
          )
        ).start();
      }, []);
    const router = useRouter()
    const { width } = useWindowDimensions();
    const [fontsLoaded, fontError] = useFonts({
        HelvetIns: require("../../assets/fonts/HelvetIns.ttf"),
        PlaywriteNL: require("../../assets/fonts/Playwrite_NL/Playwrite-NL.ttf"),
        Montserrat: require("../../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
        
      });
      const tagsStyles = {
        h2:{
          fontSize:15, 
          padding:0,
          margin:0,
          textTransform:'uppercase',
          
        },
       p:{
         lineHeight:28,
         color:'#000',
         fontSize:15, 
         
       },
       a:{
        color:'blue',padding:0,margin:0,
        fontWeight:500
       }
      
      }
      const customHTMLElementModels = {
        'img': HTMLElementModel.fromCustomModel({
          tagName: 'img',
          mixedUAStyles: {
            width: 'auto',
            height: 'auto',
            borderRadius: 25,
            alignSelf: 'center',
            paddingHorizontal:50,
            backgroundColor: 'blue'
          },
          contentModel: HTMLContentModel.block
        })
      };
      const renderersProps = {
        img: {
          enableExperimentalPercentWidth: true
        }
      };
  return (
    <View style={{width:'100%',height:'100%',position:'relative'}}>
            {/* background */}
                <View style={{width:'100%',height:'40%',position:'absolute',zIndex:1}}>
                    <Image source={require('../../assets/images/travel/1.jpg')} style={{width:'100%',height:'100%'}} />
                </View>
            <View style={{flex:1,width:'100%',height:'100%',paddingTop:Constants.statusBarHeight+10, position:'relative',zIndex:2}}>
                    {/* header */}
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20, alignItems:'center'}}>
                            <TouchableOpacity onPress={() => router.back()}>
                                <View style={{width:40,height:40, borderRadius:20,backgroundColor:'#ECECEC',justifyContent:'center',alignItems:'center'}}>
                                     <Ionicons name='chevron-back' size={24} color={'black'}/>
                                </View>
                            </TouchableOpacity>
                           
                            <View style={{flexDirection:'row',gap:10}}>
                           
                               <TouchableOpacity>
                                    <View style={{width:40,height:40, borderRadius:20,backgroundColor:'#ECECEC',justifyContent:'center',alignItems:'center'}}>
                                            <AntDesign name="sharealt" size={24} color="black" />
                                        </View>
                               </TouchableOpacity>
                               <TouchableOpacity>
                                    <View style={{width:40,height:40, borderRadius:20,backgroundColor:'#ECECEC',justifyContent:'center',alignItems:'center'}}>
                                    <AntDesign name="tagso" size={24} color="black" />
                                        </View>
                               </TouchableOpacity>
                            </View>
                        </View>
                    {/* content */}
                    <ScrollView style={{width:'100%',flex:1,height:'100%',paddingTop:60,paddingHorizontal:15}}>
                        <View style={{width:'100%',paddingTop:20,height:'100%',backgroundColor:'white',borderRadius:20,paddingBottom:100}}>
                            <View>
                                 <TouchableOpacity style={{margin:'auto'}}>
                                     <View style={{width:150,flexDirection:'row',alignItems:'center',gap:5, padding:5, borderRadius:100,backgroundColor:'#2078fe',justifyContent:'center'}}>
                                        <View style={{width:40,height:40,backgroundColor:'#f4f4f4',borderRadius:20, justifyContent:'center',alignItems:'center'}}>
                                            <Image source={require("../../assets/images/avatar/1.png")} style={{width:20,height:24,borderTopLeftRadius:24,borderTopRightRadius:20}} />
                                        </View>
                                        <Text style={{fontSize:13,fontWeight:500,color:'white',fontFamily:'Montserrat'}}>PhamT Dev</Text>
                                     </View>
                                 </TouchableOpacity>

                                 {/* title */}
                                 <View style={{paddingTop:15,width:'100%',paddingHorizontal:20}}>
                                    <Text style={{fontSize:20,fontWeight:600,color:'black',fontFamily:'Montserrat',lineHeight:30,textAlign:'center'}}>
                                        Get HTML color codes, Hex color codes, RGB and HSL values with our color picker,
                                    </Text>
                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:15,gap:20}}>
                                         <View style={{flexDirection:'row',gap:8,justifyContent:'center',alignItems:'center'}}>
                                            <Feather name="trending-up" size={24} color="#fc5507" />
                                            <Text style={{fontFamily:'Montserrat',fontSize:12,color:'#4f4e4e'}}>Trending No.1</Text>
                                         </View>
                                         <View style={{flexDirection:'row',gap:8,justifyContent:'center',alignItems:'center'}}>
                                            <MaterialIcons name="update" size={24} color="#bfbfbe" />
                                            <Text style={{fontFamily:'Montserrat',fontSize:12,color:'#4f4e4e'}}>Trending No.1</Text>
                                         </View>
                                    </View>
                                 </View>
                                 {/* body */}
                                 <View style={{width:'100%',paddingHorizontal:20,paddingTop:20}}>
                                    <RenderHtml
                                        contentWidth={width}
                                            source={source}
                                            tagsStyles={tagsStyles}
                                           // customHTMLElementModels={customHTMLElementModels}
                                            renderersProps={renderersProps}
                                        />
                                 </View>

                                 {/* comment */}
                                 <View>
                                     <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20, borderBottomWidth:1, borderBottomColor:'#ECECEC',paddingBottom:10}}>
                                         
                                        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                            <EvilIcons name="comment" size={24} color="black" />
                                            <Text style={{fontSize:14,fontWeight:500}}>Comments</Text>
                                         </View>
                                         <TouchableOpacity>
                                             <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                                 <Text style={{fontSize:14,fontWeight:500}}>Sort</Text>
                                                  <AntDesign name="filter" size={20} color="black" />
                                             </View>
                                         </TouchableOpacity>
                                     </View>
                                     {/* list comment */}
                                     <View style={{width:'100%',marginTop:10}}>
                                         <View>

                                           {/* comment parent 1 */}
                                              <View style={{flexDirection:'row',gap:10, paddingVertical:10,borderBottomWidth:1,borderColor:'#ECECEC',paddingHorizontal:20}}>
                                                   <View style={{width:50,height:50,borderRadius:25,justifyContent:'center',alignItems:'center',position:'relative'}}>
                                                       
                                                      
                                                      
                                                            <Animated.View style={
                                                                [{width:15,height:15, backgroundColor:'green',borderRadius:10,position:'absolute',top:2,left:0,zIndex:10,borderWidth:1,borderColor:'#fff'},
                                                                   {
                                                                    transform: [
                                                                        {
                                                                          /* scale: onlineRef.interpolate({
                                                                            inputRange: [0, 0.5, 1],
                                                                            outputRange: [0.5, 0.75, 1.25],
                                                                          }), */
                                                                          scale: onlineRef
                                                                        },
                                                                      ],
                                                                   }
                                                                ]}></Animated.View>
                                                      
                                                     

                                                       <Image source={require("../../assets/images/avatar/3.png")} style={{width:45,height:45,borderRadius:25}} />
                                                   </View>
                                                   <View style={{flex:1}}>
                                                       <View style={{width:'100%'}}>
                                                          <Text style={{fontWeight:500,fontSize:15,paddingBottom:5,color:'#474747'}}>Laravel New 2024</Text>
                                                          <Text style={{fontSize:15,lineHeight:23,width:'100%',fontFamily:'Montserrat',color:'#5a5858'}}>
                                                              Thông thường trong các dự án của chúng ta làm
                                                          </Text>
                                                           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:5,gap:10}}>
                                                              <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                                                    <TouchableOpacity>
                                                                        <MaterialIcons name="more-horiz" size={24} color="black" />
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity>
                                                                        <Entypo name="reply" size={24} color="black" />
                                                                      </TouchableOpacity>
                                                              </View>
                                                              <Text style={{fontSize:12,fontWeight:400}}>24/08/2024</Text>
                                                             
                                                           </View>
                                                       </View>
                                                       {/* reply */}
                                                      <View>
                                                          {/* comment 1 */}
                                                          <View style={{flexDirection:'row',gap:10, paddingVertical:10}}>
                                                              <View style={{width:50,height:50,borderRadius:25,justifyContent:'center',alignItems:'center',position:'relative'}}>
                                                                  <View style={{width:15,height:15, backgroundColor:'gray',borderRadius:10,position:'absolute',top:2,left:0,zIndex:10,borderWidth:1,borderColor:'#fff'}}></View>
                                                                  <Image source={require("../../assets/images/avatar/2.png")} style={{width:45,height:45,borderRadius:25}} />
                                                              </View>
                                                              <View style={{flex:1}}>
                                                                  <View style={{width:'100%'}}>
                                                                      <Text style={{fontWeight:500,fontSize:15,paddingBottom:5,color:'#474747'}}>React Native New 2024</Text>
                                                                      <Text style={{fontSize:15,lineHeight:23,width:'100%',fontFamily:'Montserrat',color:'#5a5858'}}>
                                                                          Thông thường trong các dự án của chúng ta làm
                                                                      </Text>
                                                                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:5,gap:10}}>
                                                                          <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                                                                <TouchableOpacity>
                                                                                    <MaterialIcons name="more-horiz" size={24} color="black" />
                                                                                  </TouchableOpacity>
                                                                                  <TouchableOpacity>
                                                                                    <Entypo name="reply" size={24} color="black" />
                                                                                  </TouchableOpacity>
                                                                          </View>
                                                                          <Text style={{fontSize:12,fontWeight:400}}>24/08/2024</Text>
                                                                        
                                                                      </View>
                                                                  </View>
                                                              </View>
                                                          </View>
                                                          {/* end comment 1 */}

                                                           {/* comment 2 */}
                                                           <View style={{flexDirection:'row',gap:10, paddingVertical:10}}>
                                                              <View style={{width:50,height:50,borderRadius:25,justifyContent:'center',alignItems:'center',position:'relative'}}>
                                                              <Animated.View style={
                                                                [{width:15,height:15, backgroundColor:'green',borderRadius:10,position:'absolute',top:2,left:0,zIndex:10,borderWidth:1,borderColor:'#fff'},
                                                                   {
                                                                    transform: [
                                                                        {
                                                                          /* scale: onlineRef.interpolate({
                                                                            inputRange: [0, 0.5, 1],
                                                                            outputRange: [0.5, 0.75, 1.25],
                                                                          }), */
                                                                          scale: onlineRef
                                                                        },
                                                                      ],
                                                                   }
                                                                ]}></Animated.View>
                                                                  <Image source={require("../../assets/images/avatar/5.png")} style={{width:45,height:45,borderRadius:25}} />
                                                              </View>
                                                              <View style={{flex:1}}>
                                                                  <View style={{width:'100%'}}>
                                                                      <Text style={{fontWeight:500,fontSize:15,paddingBottom:5,color:'#474747'}}>React New 2024</Text>
                                                                      <Text style={{fontSize:15,lineHeight:23,width:'100%',fontFamily:'Montserrat',color:'#5a5858'}}>
                                                                          Thông thường trong các dự án của chúng ta làm
                                                                      </Text>
                                                                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:5,gap:10}}>
                                                                          <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                                                                <TouchableOpacity>
                                                                                    <MaterialIcons name="more-horiz" size={24} color="black" />
                                                                                  </TouchableOpacity>
                                                                                  <TouchableOpacity>
                                                                                    <Entypo name="reply" size={24} color="black" />
                                                                                  </TouchableOpacity>
                                                                          </View>
                                                                          <Text style={{fontSize:12,fontWeight:400}}>24/08/2024</Text>
                                                                        
                                                                      </View>
                                                                  </View>
                                                              </View>
                                                          </View>
                                                          {/* end comment 2 */}

                                                      </View>
                                                       {/* end reply */}





                                                   </View>
                                              </View>
                                            {/* end comment parent 1 */}


                                             {/* comment parent 2 */}
                                             <View style={{flexDirection:'row',gap:10, paddingVertical:10,borderBottomWidth:1,borderColor:'#ECECEC',paddingHorizontal:20}}>
                                                   <View style={{width:50,height:50,borderRadius:25,justifyContent:'center',alignItems:'center',position:'relative'}}>
                                                       <View style={{width:15,height:15, backgroundColor:'green',borderRadius:10,position:'absolute',top:2,left:0,zIndex:10,borderWidth:1,borderColor:'#fff'}}></View>
                                                       <Image source={require("../../assets/images/avatar/6.png")} style={{width:45,height:45,borderRadius:25}} />
                                                   </View>
                                                   <View style={{flex:1}}>
                                                       <View style={{width:'100%'}}>
                                                          <Text style={{fontWeight:500,fontSize:15,paddingBottom:5,color:'#474747'}}>Next.JS New 2024</Text>
                                                          <Text style={{fontSize:15,lineHeight:23,width:'100%',fontFamily:'Montserrat',color:'#5a5858'}}>
                                                              Thông thường trong các dự án của chúng ta làm
                                                          </Text>
                                                           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:5,gap:10}}>
                                                              <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                                                    <TouchableOpacity>
                                                                        <MaterialIcons name="more-horiz" size={24} color="black" />
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity>
                                                                        <Entypo name="reply" size={24} color="black" />
                                                                      </TouchableOpacity>
                                                              </View>
                                                              <Text style={{fontSize:12,fontWeight:400}}>24/08/2024</Text>
                                                             
                                                           </View>
                                                       </View>
                                                       {/* reply */}
                                                      <View>
                                                          {/* comment 1 */} 
                                                          <View style={{flexDirection:'row',gap:10, paddingVertical:10}}>
                                                              <View style={{width:50,height:50,borderRadius:25,justifyContent:'center',alignItems:'center',position:'relative'}}>
                                                                  <View style={{width:15,height:15, backgroundColor:'gray',borderRadius:10,position:'absolute',top:2,left:0,zIndex:10,borderWidth:1,borderColor:'#fff'}}></View>
                                                                  <Image source={require("../../assets/images/avatar/7.png")} style={{width:45,height:45,borderRadius:25}} />
                                                              </View>
                                                              <View style={{flex:1}}>
                                                                  <View style={{width:'100%'}}>
                                                                      <Text style={{fontWeight:500,fontSize:15,paddingBottom:5,color:'#474747'}}>Node.JS New 2024</Text>
                                                                      <Text style={{fontSize:15,lineHeight:23,width:'100%',fontFamily:'Montserrat',color:'#5a5858'}}>
                                                                          Thông thường trong các dự án của chúng ta làm
                                                                      </Text>
                                                                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:5,gap:10}}>
                                                                          <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                                                                <TouchableOpacity>
                                                                                    <MaterialIcons name="more-horiz" size={24} color="black" />
                                                                                  </TouchableOpacity>
                                                                                  <TouchableOpacity>
                                                                                    <Entypo name="reply" size={24} color="black" />
                                                                                  </TouchableOpacity>
                                                                          </View>
                                                                          <Text style={{fontSize:12,fontWeight:400}}>24/08/2024</Text>
                                                                        
                                                                      </View>
                                                                  </View>
                                                              </View>
                                                          </View>
                                                          {/* end comment 1 */}

                                                           {/* comment 2 */}
                                                           <View style={{flexDirection:'row',gap:10, paddingVertical:10}}>
                                                              <View style={{width:50,height:50,borderRadius:25,justifyContent:'center',alignItems:'center',position:'relative'}}>
                                                                  <View style={{width:15,height:15, backgroundColor:'green',borderRadius:10,position:'absolute',top:2,left:0,zIndex:10,borderWidth:1,borderColor:'#fff'}}></View>
                                                                  <Image source={require("../../assets/images/avatar/8.png")} style={{width:45,height:45,borderRadius:25}} />
                                                              </View>
                                                              <View style={{flex:1}}>
                                                                  <View style={{width:'100%'}}>
                                                                      <Text style={{fontWeight:500,fontSize:15,paddingBottom:5,color:'#474747'}}>Vue.JS New 2024</Text>
                                                                      <Text style={{fontSize:15,lineHeight:23,width:'100%',fontFamily:'Montserrat',color:'#5a5858'}}>
                                                                          Thông thường trong các dự án của chúng ta làm3
                                                                      </Text>
                                                                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:5,gap:10}}>
                                                                          <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                                                                <TouchableOpacity>
                                                                                    <MaterialIcons name="more-horiz" size={24} color="black" />
                                                                                  </TouchableOpacity>
                                                                                  <TouchableOpacity>
                                                                                    <Entypo name="reply" size={24} color="black" />
                                                                                  </TouchableOpacity>
                                                                          </View>
                                                                          <Text style={{fontSize:12,fontWeight:400}}>24/08/2024</Text>
                                                                        
                                                                      </View>
                                                                  </View>
                                                              </View>
                                                          </View>
                                                          {/* end comment 2 */}

                                                      </View>
                                                       {/* end reply */}





                                                   </View>
                                              </View>
                                            {/* end comment parent 2 */}


                                         </View>
                                     </View>

                                 </View>
                            </View>

                        </View>
                    </ScrollView>
            </View>
    </View>
  )
}

export default NewsDetailScreen