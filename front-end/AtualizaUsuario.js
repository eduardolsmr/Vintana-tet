import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, View, TouchableOpacity, Text } from 'react-native';

const AtualizaUsuario = ({ navigation, route }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { idUsuario } = route.params || {}; // Garantir que idUsuario seja extraído corretamente

  const fetchItem = async () => {
    fetch(`https://tet-eduardo.glitch.me/usuario/${idUsuario}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        setNome(resJson[0].usu_nome);
        setEmail(resJson[0].usu_email);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    if (idUsuario) { // Verificar se idUsuario está definido
      fetchItem();
    } else {
      console.log('idUsuario não está definido');
    }
  }, [idUsuario]);

  const Atualizar = () => {
    var userObj = { nome: nome, email: email, senha: senha };
    var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);
    fetch(`https://tet-eduardo.glitch.me/usuario/${idUsuario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
      .then(response => response.json())
      .then(json => { console.log(json); navigation.goBack(); })
      .catch((err) => { console.log(err); });
  };

  const Deletar = () => {
    fetch(`https://tet-eduardo.glitch.me/usuario/${idUsuario}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => { console.log(json); navigation.goBack(); })
      .catch((err) => { console.log(err); });
  };

  return (
    <View style={styles.main}>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={(event) => setNome(event)}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(event) => setEmail(event)}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={(event) => setSenha(event)}
        placeholder="Senha"
      />

      <TouchableOpacity
        onPress={Atualizar}
        style={styles.botao}
      >
        <View style={styles.botaoView}>
          <Text>atualizar</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={Deletar}
        style={{ ...styles.botao, marginTop: 5 }}
      >
        <View style={styles.botaoView}>
          <Text>deletar</Text>
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

export default AtualizaUsuario;
