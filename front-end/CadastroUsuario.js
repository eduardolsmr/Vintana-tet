import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput, Button, View, TouchableOpacity, Text} from 'react-native';

const CadastroUsuario = ({navigation}) => {
const [text, onChangeText] = React.useState('');
const [number, onChangeNumber] = React.useState('');

const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');

  const Cadastrar = () =>{
  var userObj = {nome:nome, email: email, senha:senha};
  var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);
    fetch('https://tet-eduardo.glitch.me/usuario', 
    {method:'POST',
      headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',},
      body: jsonBody,
      })

    .then(response => response.json())
    .then(json => {console.log(json);navigation.navigate('AtualizaUsuario');})
    .catch((err) => {console.log(err);
    })
    ;}
  
  return (
    <View style={styles.main}>
      <TextInput
        style={styles.input}
        onChangeText={(event)=>setNome(event)}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        onChangeText={(event)=>setEmail(event)}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={(event)=>setSenha(event)}
        placeholder="Senha"
      />
      <TouchableOpacity
      onPress={() => {Cadastrar()}}
      style={{...styles.botao,marginTop: 5}}
      >
      <View style={styles.botaoView}>
      <Text>cadastrar</Text>
      </View>
      </TouchableOpacity>

    </View>
  );
};

  const styles = StyleSheet.create({
  main: {
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
   }
});

export default CadastroUsuario;