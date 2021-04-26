import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import {AsyncStorage}  from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import {DataFood} from "../DataFood.js";
import {Cart} from './Cart.js'



const Home = ({navigation}) => {

    function renderCategories(){
        return(
           <View style={{flexDirection:'row'}}>
               <View style={{marginBottom:30}}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>Main</Text>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>Categories</Text>
               </View>
               <View style={{marginBottom:30}}>
                 <AntDesign style={{fontSize:32, marginLeft:190}} name="shoppingcart" size={24} color="black" 
                 onPress={() => navigation.navigate('Cart', {
                    
                  }) 
                }
                  />
               </View>
           </View>
        )
    }
    
   
    function renderList (){
        return(
            <FlatList 
            data={DataFood}
            keyExtractor = {(item) => item.id}
            renderItem = {({item}) => (
        
                <TouchableOpacity
                style={{marginBottom: 30}}
                onPress={() => navigation.navigate('Cart', {
                    item
                  })
                 }
                >
                   <View > 
                   <Image
                        style={{
                            width:'100%',
                            height: 200,
                            borderRadius: 15,
                            
                           
                        }}
                        source={require('../assets/img1.jpg')}

                    /> 
                    <View style={{flexDirection: 'row', padding:10}}>
                      <Text style={{fontSize:18,marginEnd: 190,}}>{item.name}</Text>
                      <Text style={{fontSize:22, fontWeight:"bold", color:"#fd7e14" }}>{item.price}Dh</Text>
                    </View>   

                    <View>
                    <TouchableOpacity
                        onPress={()=> onClickAddCart(item)}
                        style={{
                        width:'100%',
                        backgroundColor:'#fd7e14',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:"center",
                        borderRadius:5,
                        padding:4
                        }}>
                        <Text style={{fontSize:18, color:"white", fontWeight:"bold"}}>Add Cart</Text>
                        <View style={{width:10}} />
                        <Icon name="ios-add-circle" size={30} color={"white"} />
                    </TouchableOpacity>
                    </View>
                    </View>
                </TouchableOpacity>
                    
                  )}
            />


        )
        
    }
    
   function onClickAddCart(data) {
       console.log(data)

        const itemcart = {
          food: data,
          quantity:  1,
          price: data.price
        }
     
        AsyncStorage.getItem('cart').then((dataCart)=>{
            console.log(dataCart)
            if (dataCart !== null) {
              // We have data!!
              const cart = JSON.parse(dataCart)
              cart.push(itemcart)
              AsyncStorage.setItem('cart',JSON.stringify(cart));
            }
            else{
              const cart  = []
              cart.push(itemcart)
              AsyncStorage.setItem('cart',JSON.stringify(cart));
            }
            alert("Add Cart")
          })
          .catch((err)=>{
            alert(err)
          })
      }
    return (
        <SafeAreaView style={styles.container}>
             {renderCategories()}
             {renderList()}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    container:{
        flex: 1,
        padding: 20
    },

  });
export default Home
