import React, { Fragment, useCallback, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ButtonAdd,
  CategorySelect,
  Profile,
  ListHeader,
  Appointment,
  ListDivider,
  Background,
  Load,
} from '../../components';

import { AppointmentProps } from '../../components/Appointment';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

import { styles } from './styles';

export function Home() {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string) {
    category === categoryId ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate('AppointmentDetails', { guildSelected });
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

    if (category) {
      setAppointments(storage.filter((item) => item.category === category));
    } else {
      setAppointments(storage);
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [category])
  );

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>
      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />
      {loading ? (
        <Load />
      ) : (
        <Fragment>
          <ListHeader
            title='Partidas agendadas'
            subtitle={`Total de ${appointments.length}`}
          />
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item }) => (
              <Appointment
                data={item}
                onPress={() => handleAppointmentDetails(item)}
              />
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.matches}
          />
        </Fragment>
      )}
    </Background>
  );
}
