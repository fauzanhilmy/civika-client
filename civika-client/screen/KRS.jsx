import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Button } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import CardKRS from "../components/CardKRS";
import { addKRS, fetchKRS } from "../store/action";

export default function ScreenKRS({navigation}) {
  const dispatch = useDispatch();
  const [inputKRS, setInputKRS] = useState([]);
  const classes = useSelector((state) => state.remainingClass);
  const token = useSelector((state) => state.access_token);
  
  function submitKRS() {
    dispatch(addKRS(inputKRS, token));
    navigation.navigate("Beranda-Stack");
  }
  
  useEffect(() => {
    dispatch(fetchKRS(token))
  }, [])
  
  return (
    <ScrollView>
      <View style={{ flex: 1, marginHorizontal: 9 }}>
        {classes.map((lecture) => (
          <CardKRS
            lecture={lecture}
            key={lecture.id}
            setInputKRS={setInputKRS}
          />
        ))}
        <Button
          primary
          style={{ alignSelf: "center", marginVertical: 13 }}
          onPress={submitKRS}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "200",
              color: "#dbe2ef",
              marginHorizontal: 10,
            }}
          >
            Ambil KRS
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
}
