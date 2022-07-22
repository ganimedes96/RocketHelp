import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { VStack } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert("Register", "Preencha todos os campos.");
    }
    setIsLoading(true);

    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitacao", "Solicitacao registrada com sucesso.");
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        return Alert.alert(
          "Solicitacao",
          "Nao foi possivel registrar o pedido."
        );
      });
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitacao" />
      <Input
        placeholder="Numero do patrimonio"
        mt={4}
        onChangeText={setPatrimony}
      />
      <Input
        placeholder="Descricao do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />
      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}
