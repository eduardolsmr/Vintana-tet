import React , {useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, View, Image} from 'react-native';

const Login = ({navigation}) => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  
 const [email, setEmail] = useState('');
 const [senha, setSenha] = useState('');

  const Login = () =>{
  var userObj = { email: email, senha:senha};
  var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);
    fetch('https://tet-eduardo.glitch.me/login', 
    {method:'POST'
    ,headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      },
      body: jsonBody,
      })
    .then(response => response.json())
    .then(json => {console.log(json);
    if(json.mensagem=='Usuário válido')
    navigation.navigate('AtualizaUsuario', {idUsuario:json.id});})
    .catch((err) => {console.log(err);
    })
  ;}

  return (
    <View style={styles.main}>
    <Image source={require('./assets/Batman-por-Marshall-Rogers.jpg')} style={styles.logo}/>

      <TextInput
        style={styles.input}
        onChangeText={(text)=>{setEmail(text)}}
        placeholder="Email"
        value={email}
      />
      <TextInput
        style={{...styles.input,marginTop: 5}}
        onChangeText={(text)=>{setSenha(text)}}
        placeholder="Senha"
        secureTextEntry
        value={senha}
      />
    
      <TouchableOpacity
      onPress={() => {navigation.navigate('CadastroUsuario', {})}}
      style={styles.botao}
      >
      <View style={styles.botaoView}>
      <Text> Registrar </Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={() => {Login()}}
      style={{...styles.botao,marginTop: 5}}
      >
      <View style={styles.botaoView}>
      <Text>Entrar</Text>
      </View>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

   botaoView: {
     flex: 1,
     backgroundColor: '#e0365d',
     borderRadius: 6,
     justifyContent: 'center',
     alignItems: 'center'
   },

   botao: {
     width: 70,
     height: 25,
     justifyContent: 'center'
   },

   logo: {
     width: 150,
     height: 150,
     marginBottom: 20,
   }
   
});


export default Login;